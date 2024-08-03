const axios = require('axios');
const { HTTP_STATUS } = require('../constants/constants');
const { LoggerAndErrorHandler, APP_TYPE_LOG } = require('../utils/loggerAndErrorHandler');

const operationName = '[validateNotificacionSchemas]';
const functionName = 'VAT';
const loggerMessagesSendMessage = {
    inicio: '-----------[ UTILS - Inicio Webhook sendMessage ]-----------',
    terminoOk: '-----------[ UTILS - TerminoOk Webhook sendMessage ]-----------',
    terminoError: '-----------[ UTILS - TerminoError Webhook sendMessage ]-----------',
};
const loggerMessagesSendAlianza = {
    inicio: '-----------[ UTILS - Inicio Webhook sendAlianza ]-----------',
    terminoOk: '-----------[ UTILS - TerminoOk Webhook sendAlianza ]-----------',
    terminoError: '-----------[ UTILS - TerminoError Webhook sendAlianza ]-----------',
};

const logError = new LoggerAndErrorHandler(operationName, functionName);

// Configuración de la URL del WebHook
const config = {
    // URL de ejemplo para el proveedor del webhook
    //## @link provider https://webhook-test.com/payload/8a9686da-4c64-41fe-929e-27fdc3d246b2
    // URL real del WebHook
    //## WEBHOOK_URL='https://webhook-test.com/09ceb7e091c0fb21beb197ef88a34891'
    webhookUrl: 'https://webhook-test.com/d3e79f58e279298ce7c987bdc82e1494',
}

// Función para enviar un mensaje al WebHook
//## En Node.js 22, la versión TLS predeterminada es TLS 1.3
//## Más detalles sobre TLS: https://nodejs.org/api/tls.html#tlsdefault_max_version
const sendMessage = async (message, webhookUrl) => {
    logError.logInfo(loggerMessagesSendMessage.inicio);

    const payload = { "message": message }; // El cuerpo de la solicitud que se enviará

    return axios.post(webhookUrl, payload, {
        headers: {
            'Content-Type': 'application/json',
            timeout: 10000 // Especifica el tipo de contenido como JSON
        }
    })
        .then(response => {
            // Verifica si la solicitud fue exitosa
            if (response.status === HTTP_STATUS.OK) {
                logError.logInfo(loggerMessagesSendMessage.terminoOk);
                console.log('Mensaje enviado con éxito'); // Mensaje de éxito en la consola
                return {
                    sending: true,
                    response: {
                        status: response.status,
                        statusText: response.statusText,
                        data: response.data
                    }
                };
            } else {
                logError.logInfo(loggerMessagesSendMessage.terminoError);
                console.error('Error al enviar el mensaje:', response.status); // Mensaje de error en la consola con el estado de la respuesta
                return {
                    sending: false,
                    response: {
                        status: response.status,
                        statusText: response.statusText,
                        data: response.data
                    }
                };
            }
        })
        .catch(error => {
            logError.logInfo(loggerMessagesSendMessage.terminoError);

            return {
                sending: false,
                response: {
                    status: error.response?.status ?? error.message,
                    statusText: error.response?.statusText ?? error.message,
                    data: error.response?.data ?? error.message
                }
            };
        });
}

// Función para enviar un mensaje, reintentando en caso de fallo
const sendAlianza = async (message, webhookUrl) => {
    logError.logInfo(loggerMessagesSendAlianza.inicio);

    const maxIntentos = 3; // Número máximo de intentos
    let intentos = 0; // Contador de intentos
    let indicator = { sending: false }; // Indicador de éxito

    // Intenta enviar el mensaje hasta que tenga éxito o alcance el límite de intentos
    while (intentos < maxIntentos && !indicator.sending) {
        intentos++; // Incrementa el contador de intentos
        indicator = await sendMessage(message, webhookUrl); // Llama a la función sendMessage

        if (indicator.sending) {
            logError.logInfo(loggerMessagesSendAlianza.terminoOk);

            console.info(`Mensaje enviado con éxito en el intento ${intentos}`); // Mensaje de éxito con el número de intento
        } else {
            logError.logInfo(loggerMessagesSendAlianza.terminoError);

            console.warn(`Intento ${intentos} fallido`); // Mensaje de advertencia con el número de intento fallido
            if (intentos === maxIntentos) {
                console.error('Límite de intentos alcanzado. No se pudo enviar el mensaje.'); // Mensaje de error cuando se alcanzan los intentos máximos
            } else {
                // Espera 1 segundo antes de reintentar si no es el último intento
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }
    }

    return indicator; // Devuelve el resultado del envío
}

module.exports = {
    sendMessage, // Exporta la función sendMessage
    sendAlianza, // Exporta la función sendAlianza
}