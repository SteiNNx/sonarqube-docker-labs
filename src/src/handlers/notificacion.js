
const APIError = require('../utils/error');
const moment = require('moment-timezone');
const { validateNotificacion } = require('../schemas/validate')
const {
    LoggerAndErrorHandler,
    APP_TYPE_LOG,
} = require('../utils/loggerAndErrorHandler');
const {
    ACTION,
    DATE_CONFIG,
    HTTP_STATUS,
    INFO_RESPONSE,
    LOGGER_OPERATION_NAME_NOTIFICACION,
    LOGGER_FUNCTION_NAME_NOTIFICACION,
} = require('../constants/constants');
const { signBody } = require('../utils/jsonwebtoken');
const { sendAlianza } = require('../utils/webhook');
const {
    getNotificacion,
    insertNotificacion,
    updateNotificacion,
} = require('../models/notificacionModel');


const loggerMessagesGeneraNoticacion = {
    inicio: '-----------[ HANDLERS - Inicio generaNotificacion ]-----------',
    terminoOK: '-----------[ HANDLERS - Termina OK generaNotificacion ]-----------',
    terminoError: '-----------[ HANDLERS - Termina >>> CON ERROR <<< generaNotificacion ]-----------'
}
const loggerMessagesGuardarNotificacion = {
    inicio: '-----------[ HANDLERS - Inicio guardarNotificacion ]-----------',
    terminoOK: '-----------[ HANDLERS - Termina OK guardarNotificacion ]-----------',
    terminoError: '-----------[ HANDLERS - Termina >>> CON ERROR <<< guardarNotificacion ]-----------'
}
const loggerMessagesEnvioNotificacion = {
    inicio: '-----------[ HANDLERS - Inicio envioNotificacion ]-----------',
    terminoOK: '-----------[ HANDLERS - Termina OK envioNotificacion ]-----------',
    terminoError: '-----------[ HANDLERS - Termina >>> CON ERROR <<< envioNotificacion ]-----------'
}

const logError = new LoggerAndErrorHandler(
    LOGGER_OPERATION_NAME_NOTIFICACION,
    LOGGER_FUNCTION_NAME_NOTIFICACION
);

exports.generaNotificacion = async (body) => {
    logError.logInfo(loggerMessagesGeneraNoticacion.inicio);
    try {
        let notificacion = null;
        await validateNotificacion(body);

        if (body.funcionalidad == 'SERVANULACION' || body.funcionalidad == 'SERVULTIMOPAGO' ) {
            notificacion = await getNotificacion(body.transactionId);
            if (notificacion == null) {
                logError.logInfo(loggerMessagesGeneraNoticacion.terminoError);
                return {
                    statusCode: 500,
                    body: {
                        code: '99',
                        message: 'No existe transacción asociada.',
                    },
                };
            }
        }

        logError.logInfo(loggerMessagesGeneraNoticacion.terminoOK);
        return {
            statusCode: 200,
            body: {
                code: '00',
                message: 'Notificacion enviada',
            },
            notificacion: notificacion
        };

    } catch (e) {
        logError.logInfo(loggerMessagesGeneraNoticacion.terminoError);

        let mensaje = undefined;
        let codigo = undefined;
        if (e instanceof APIError) {
            mensaje = e.msg;
            codigo = e.code;
        } else {
            mensaje = INFO_RESPONSE.GENERIC_MSJ;
            codigo = INFO_RESPONSE.GENERIC_CODE;
        }

        logError.logError(mensaje);
        logError.logInfo(mensaje);
        return {
            statusCode: INFO_RESPONSE.ERROR_CODE,
            body: {
                code: `API.${codigo}`,
                message: mensaje
            }
        };
    }
};

exports.guardarNotificacion = async (body) => {
    logError.logInfo(loggerMessagesGuardarNotificacion.inicio);

    logError.logInfo('Insertar Notificacion');
    const bodyValidated = await validateNotificacion(body);

    let fechaProceso = moment().tz('America/Santiago').format('YYYY-MM-DD:HH:mm:ss.SSS');
    const notificacion = await insertNotificacion(bodyValidated, fechaProceso);

    logError.logInfo(loggerMessagesGuardarNotificacion.terminoOK);
    return notificacion;
};

exports.envioNotificacion = async (body, notificacion) => {
    logError.logInfo(loggerMessagesEnvioNotificacion.inicio);
    //Por defecto valor si se cae try
    let indicator = { sending: false, response: 'Weebhook not execute' };

    const firma = body.firma; // Obtiene la firma del cuerpo del mensaje
    const weebhook = body.url; //Recupero weebhook o asigno uno.
    delete body.firma; // Elimina la firma del cuerpo para que no se incluya en el mensaje enviado 

    // Firma el cuerpo del mensaje sin la firma original
    const token = await signBody(
        body,
        firma
    );

    try {
        indicator = await sendAlianza(token, weebhook);  //'http://be-ad-pos-atendedor-ms-application-service:8000/microservicio/v1/be-ad-pos-atendedor-ms/weebhook');

        // Puedes realizar acciones adicionales según el resultado de success si es necesario
        if (!indicator.sending) {
            logError.logInfo(loggerMessagesEnvioNotificacion.terminoError);

            // Si no se puede enviar después de los intentos, maneja el fallo aquí
            console.error('No se pudo enviar la notificación después de varios intentos.');
            await updateNotificacion(notificacion[0], 'ERROR', notificacion[4], indicator.response);
            return {
                statusCode: INFO_RESPONSE.ERROR_CODE,
                body: JSON.stringify('Nok'),
            };
        } else {
            logError.logInfo(loggerMessagesEnvioNotificacion.terminoOK);

            await updateNotificacion(notificacion[0], 'ENVIADO', notificacion[4], indicator.response);
            return {
                statusCode: INFO_RESPONSE.SUCCESS_CODE,
                body: JSON.stringify('ok'),
            };
        }

    } catch (e) {
        // Manejo de errores durante el envío del mensaje
        logError.logInfo(loggerMessagesEnvioNotificacion.terminoError);

        await updateNotificacion(notificacion[0], 'ERROR', notificacion[4], indicator.response);
        console.error('Error durante el envío de la notificación:', e);

        return {
            statusCode: INFO_RESPONSE.GENERIC_CODE,
            body: JSON.stringify(INFO_RESPONSE.GENERIC_MSJ),
        };
    }

}