// @path src/contants/Constants.js
/** Arguments required for run script */
// Número de argumentos requeridos para ejecutar el script
const ARGV_REQUIRED_ARGUMENTS = 2;

// Índices de los argumentos en la línea de comandos
const ARGV_INDEX_PROJECT_KEY = 0;  // Índice del projectKey
const ARGV_INDEX_TOKEN = 1;  // Índice del token
const ARGV_INDEX_SOURCE_PATH = 2;  // Índice de la ruta de origen
const ARGV_INDEX_PROJECT_LANGUAJE = 3;  // Índice del tipo de proyecto
const ARGV_INDEX_SERVER_URL = 4;  // Índice de la URL del servidor

module.exports = {
    ARGV_REQUIRED_ARGUMENTS,
    ARGV_INDEX_PROJECT_KEY,
    ARGV_INDEX_TOKEN,
    ARGV_INDEX_SOURCE_PATH,
    ARGV_INDEX_PROJECT_LANGUAJE,
    ARGV_INDEX_SERVER_URL,
};
