const {
    sign,
    verify,
} = require('jsonwebtoken');

const {
    LoggerAndErrorHandler,
    APP_TYPE_LOG,
} = require('../utils/loggerAndErrorHandler');

// Documentación: @link https://www.npmjs.com/package/jsonwebtoken
// Pagina Oficial: @link https://jwt.io/

const configJwt = {
    algorithm: 'HS256',
};

const operationName = '[validateNotificacionSchemas]';
const functionName = 'VAT';
const loggerMessagesSignBody = {
    inicio: '-----------[ UTILS - Inicio Webhook signBody ]-----------',
    terminoOk: '-----------[ UTILS - TerminoOk Webhook signBody ]-----------',
    terminoError: '-----------[ UTILS - TerminoError Webhook signBody ]-----------',
};
const loggerMessagesVerifyBody = {
    inicio: '-----------[ UTILS - Inicio Webhook verifyBody ]-----------',
    terminoOk: '-----------[ UTILS - TerminoOk Webhook verifyBody ]-----------',
    terminoError: '-----------[ UTILS - TerminoError Webhook verifyBody ]-----------',
};
const logError = new LoggerAndErrorHandler(operationName, functionName);

const signBody = async (body, secret) => {
    try {
        logError.logInfo(loggerMessagesSignBody.inicio);

        const bodySigned = sign(
            body,
            secret,
            {
                noTimestamp: true
            }
        );
        logError.logInfo(loggerMessagesSignBody.terminoOk);

        return bodySigned;
    } catch (error) {
        logError.logInfo(loggerMessagesSignBody.terminoError);

        logError.logError(error.message);
        logError.handleError(APP_TYPE_LOG.ERROR_JWT);
    }
}

const verifyBody = async (body, secret) => {
    try {
        logError.logInfo(loggerMessagesVerifyBody.inicio);

        const bodyVerify = verify(
            body,
            secret,
            {
                algorithms: [configJwt.algorithm],
            }
        );
        logError.logInfo(loggerMessagesVerifyBody.terminoOk);

        return bodyVerify;
    } catch (error) {
        logError.logInfo(loggerMessagesVerifyBody.terminoError);

        logError.logError(error.message);
        logError.handleError(APP_TYPE_LOG.ERROR_JWT);
    }

}

module.exports = {
    signBody,
    verifyBody
}