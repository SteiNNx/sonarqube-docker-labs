const AWS = require('aws-sdk');
const dynamoDB = require('./db/dynamodb');
const moment = require('moment-timezone');
const documentClient = new AWS.DynamoDB.DocumentClient({ region: 'us-east-1' });
const tableName = 'be-ad-api-pos-notificacion';
const { LoggerAndErrorHandler, APP_TYPE_LOG } = require('../utils/loggerAndErrorHandler');
const operationName = '[notificacionModel]';
const functionName = 'ATM';
const logError = new LoggerAndErrorHandler(operationName, functionName);
const { v4: uuidv4 } = require('uuid');

const LOG_MESSAGE = {
    GET: 'Consulta notificacion',
    INSERT: 'Insercion de la notificacion',
    UPDATE: 'Actualizacion de la notificacion'
};

//TODO: AQUIIIII AGREGAR FUNCIONALIDAD / UPDATE TAMBN // cambiar url en weebhook
const insertNotificacion = async (body, fechaProceso) => {
    logError.logInfoChild(LOG_MESSAGE.INSERT, { body });
    const uid = uuidv4();
    const query = `
        INSERT INTO "${tableName}"
        value {'idNotificacion':?,'idAlianza': ?, 'codigoRespuesta': ?, 'resultado': ?, 'fecha': ?,'fechaProceso': ?,  'monto': ?, 'montoPropina': ?, 'medioDePago': ?, 'transactionId': ?, 'marca': ?, 'ultimosDigitosTarjeta': ?, 'tipoTarjeta': ?, 'cuotas': ?, 'nSerie': ?, 'ocAlianza': ?, 'rrn': ?, 'estatus': ?, 'funcionalidad': ?, 'responseWeebhook': ?}
    `;

    const parameters = [
        uid,
        body.idAlianza,
        body.codigoRespuesta,
        body.resultado,
        body.fecha,
        fechaProceso,
        body.monto,
        body.montoPropina,
        body.medioDePago,
        body.transactionId,
        body.marca,
        body.ultimosDigitosTarjeta,
        body.tipoTarjeta,
        body.cuotas,
        body.nSerie,
        body.ocAlianza,
        body.rrn,
        'PENDIENTE',
        body.funcionalidad,
        'PENDIENTE'
    ];

    await dynamoDB.executeStatement(query, parameters);
    return parameters;
};

const getNotificacion = async (transactionId) => {
    logError.logInfoChild(LOG_MESSAGE.GET, { transactionId });

    const params = {
        TableName: tableName,
        IndexName: 'transactionId-index',
        KeyConditionExpression: 'transactionId =:transactionId',
        ExpressionAttributeValues: {
            ':transactionId': transactionId,
        },
        ProjectionExpression: 'idNotificacion, rrn, idAlianza, codigoRespuesta, fecha, monto, montoPropina',
    };

    try {
        const result = await documentClient.query(params).promise();

        let notificacion;
        if (result.Items.length > 0) {
            notificacion = result.Items[0];
        } else {
            notificacion = null;
        }
        return notificacion;

    } catch (error) {
        console.error({ error });
        logError.logError(JSON.stringify(error));
        logError.track(APP_TYPE_LOG.ERROR_DB);
        return null;
    }
}


const updateNotificacion = async (idNotificacion, newStatus, fecha, responseWeebhook) => {
    logError.logInfoChild(LOG_MESSAGE.UPDATE, { idNotificacion, newStatus });

    let fechaProceso = moment().tz('America/Santiago').format('YYYY-MM-DD:HH:mm:ss.SSS');

    const query = `
      UPDATE "${tableName}"
      SET responseWeebhook = ?, estatus = ? , fechaProceso = ? 
      WHERE idNotificacion = ? and fecha = ?
      `;
    // list_append(log, ?)
    let notificacionUpdated = null;

    const parameters = [responseWeebhook, newStatus, fechaProceso, idNotificacion, fecha];
    try {
        notificacionUpdated = await dynamoDB.executeStatement(query, parameters);
    } catch (error) {
        console.log(error);
    }
    return notificacionUpdated;
}

module.exports = {
    getNotificacion,
    insertNotificacion,
    updateNotificacion
};
