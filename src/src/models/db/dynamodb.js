const loggerBECH = require("@bech/logger");
const logger = loggerBECH.getLogger({ name: "dynamodb" });
const AWS = require('aws-sdk');
const aws = new AWS.DynamoDB({ region: 'us-east-1' });

async function executeStatement(query, parameters) {
  logger.info('Ejecutando executeStatement '+ query+ 'parameters'+ parameters);
  let statement = {
    Statement: query,
    Parameters: parameters ? parameters.map((v) => AWS.DynamoDB.Converter.input(v)) : parameters,
  };
  logger.child({ statement }).info('statement');
  try {
    let executeStatementOutput = await aws.executeStatement(statement).promise();
    logger.child({ executeStatementOutput }).info('respuesta executeStatement');
    return executeStatementOutput.Items;
  } catch (error) {
    logger.error(error);
    logger.child({ Statement: query }).error('Error ejecutando executeStatement');
    logger.child({ Parameters: parameters }).error('Error en Parametros');
  }
}

module.exports = { executeStatement };
