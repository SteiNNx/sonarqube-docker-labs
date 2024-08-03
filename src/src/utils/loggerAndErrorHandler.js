const loggerBECH = require('@bech/logger');
const logger = loggerBECH.getLogger({ name: 'notificacion' });
const { monitoreo } = require('@bech/monitoreo');
const APIError = require('./error');

const APP_TYPE_LOG = Object.freeze({
    GENERIC: 'GENERIC',
    SUCCESS: 'SUCCESS',
    ERROR_BODY_EMPTY: 'ERROR_BODY_EMPTY',
    ERROR_BODY_NO_VALID: 'ERROR_BODY_NO_VALID',
    ERROR_SCHEMA: 'ERROR_SCHEMA',
    ERROR_DB: 'ERROR_DB',
    ERROR_JWT: 'ERROR_JWT',
    ERROR_WEBHOOK: 'ERROR_WEBHOOK',
});

class TypeError {
    constructor(name, code, desc, log, statusCode) {
        this.name = name;
        this.code = code;
        this.desc = desc;
        this.log = log;
        this.statusCode = statusCode;
    }
}

class LoggerAndErrorHandler {
    constructor(operacion, funcion) {
        this.CODE_API_POS = 'CQN';

        this.operation = operacion.trim().toUpperCase();
        this.functionName = funcion.trim().toUpperCase();

        this.ErrorType = Object.freeze({
            GENERIC: new TypeError(APP_TYPE_LOG.GENERIC, '9999', 'ERROR DESCONOCIDO', 'ERROR', 500),
            SUCCESS: new TypeError(APP_TYPE_LOG.SUCCESS, '0000', 'SUCCESS', 'EXITO', 200),
            ERROR_BODY_EMPTY: new TypeError(APP_TYPE_LOG.ERROR_BODY_EMPTY, '0001', 'Cuerpo de la solicitud vacío', 'CATCH', 500),
            ERROR_BODY_NO_VALID: new TypeError(APP_TYPE_LOG.ERROR_BODY_NO_VALID, '0002', 'Cuerpo de la solicitud no es valido', 'CATCH', 500),
            ERROR_SCHEMA: new TypeError(APP_TYPE_LOG.ERROR_SCHEMA, '0003', 'El Schema de la solicitud no es válido', 'ERROR', 500),
            ERROR_DB: new TypeError(APP_TYPE_LOG.ERROR_DB, '0004', 'Problema al operar con los datos', 'ERROR', 500),
            ERROR_JWT: new TypeError(APP_TYPE_LOG.ERROR_JWT, '0005', 'Error en la verificación o decodificación del token JWT', 'ERROR', 500),
            ERROR_WEBHOOK: new TypeError(APP_TYPE_LOG.ERROR_WEBHOOK, '0006', 'Error en la configuración o procesamiento del webhook', 'ERROR', 500),
        });

    }

    getErrorType(name) {
        const listError = Object.entries(this.ErrorType);
        for (const [typeError, infoType] of listError) {
            if (infoType.name === name) {
                return infoType;
            }
        }
        return this.ErrorType.GENERIC;
    }

    logInfo(message) {
        logger.info(message);
    }

    logInfoChild(message, params) {
        logger.child(params).info(message);
    }

    logError(message) {
        logger.error(message);
    }

    track(tipo) {
        const errorType = this.getErrorType(tipo);
        this.logInfo(`${errorType.msg_log}: ${errorType.desc}`);

        const code = `${this.CODE_API_POS}.${this.functionName}.${errorType.code}`;
        monitoreo(code, {
            custom: `${this.operation}: ${errorType.desc}`,
        });
    }

    handleError(typeError, message) {
        const errorType = this.getErrorType(typeError);
        this.track(errorType.name);

        if (message) {
            this.logInfo(message);
        }

        const msgError = message ? `Error: ${errorType.desc} - ${message}` : `Error: ${errorType.desc}`;
        throw new APIError(msgError, errorType.code, errorType.statusCode);
    }
};

module.exports = {
    APP_TYPE_LOG,
    TypeError,
    LoggerAndErrorHandler
};