const Ajv = require('ajv');
const { LoggerAndErrorHandler, APP_TYPE_LOG } = require('../utils/loggerAndErrorHandler');
const {
    getAnulacionBodyNotificacionSchema,
    getPagoBodyNotificacionSchema,
    getUltimoPagoBodyNotificacionSchema,
} = require('./bodyAPI/notificacionSchema');

const operationName = '[validateNotificacionSchemas]';
const functionName = 'VAT';
const logError = new LoggerAndErrorHandler(operationName, functionName);

const mensaje = {
    inicio: '-----------[ VALIDATION - Inicio validación de la notificacion ]-----------',
    termino: '-----------[ VALIDATION - Termina validación de la notificacion ]-----------'
}

const validacion = {
    cuerpoVacio(body) {

        if (!body ||
            typeof body !== 'object' ||
            Object
                .keys(body)
                .length === 0) {
            logError.handleError(APP_TYPE_LOG.ERROR_BODY_EMPTY);
        }
    },

    esquemaValido(schema, body) {
        const ajv = new Ajv();
        if (!ajv.validate(schema, body)) {
            logError.logError('Data is INVALID!. Schema no valido. getBodySchema|validation.js' + JSON.stringify(ajv.errors));
            logError.handleError(APP_TYPE_LOG.ERROR_SCHEMA);
        }
    },

};

const validateNotificacion = async (body) => {
    logError.logInfo(mensaje.inicio);
    try {
        validacion.cuerpoVacio(body);

        const bodySchema = await checkingType(body);
        validacion.esquemaValido(bodySchema, body);

        logError.logInfo(mensaje.termino);

        return body;
    } catch (error) {
        logError.logError(JSON.stringify(error));
        throw error;
    }
}

const checkingType = async (body) => {
    const funcionalidad = body.funcionalidad;

    if (funcionalidad == 'SERVANULACION') {
        return await getAnulacionBodyNotificacionSchema();
    } else if (funcionalidad == 'SERVPAGO') {
        return await getPagoBodyNotificacionSchema();
    } else if (funcionalidad == 'SERVULTIMOPAGO') {
        return await getUltimoPagoBodyNotificacionSchema();
    } else {
        logError.handleError(APP_TYPE_LOG.ERROR_SCHEMA);
    }
}

module.exports = {
    validateNotificacion,
};