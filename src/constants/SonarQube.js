// @path src/constans/SonarQube.js
/** Default Values */
/** Modificar aqui */
/** -------------- */
// Valores por defecto para la configuración del proyecto SonarQube
const PROPERTIE_PROJECT_KEY = 'code-example-labs';  // Clave única del proyecto en SonarQube
const PROPERTIE_TOKEN = 'squ_81b44c150127daa643cbf591660e1578b9af559f';  // Token de autenticación generado en SonarQube
//const PROPERTIE_SOURCE_PATH = './code/android_app';  // Ruta al código fuente que será analizado
const PROPERTIE_SOURCE_PATH = './code/node_app/src'; // Ruta al código fuente que será analizado
//const PROPERTIE_SOURCE_PATH = './code/php_app'; // Ruta al código fuente que será analizado
const PROPERTIE_PROJECT_LANGUAJE = 'js';  // Tipo de proyecto (por ejemplo, 'js', 'android-java', 'python', etc.)
const PROPERTIE_SERVER_URL = 'http://localhost:9000';  // URL del servidor SonarQube

/** Object Default */
// Objeto con las configuraciones por defecto
const defaults = {
    projectKey: PROPERTIE_PROJECT_KEY,
    token: PROPERTIE_TOKEN,
    sourcePath: PROPERTIE_SOURCE_PATH,
    projectType: PROPERTIE_PROJECT_LANGUAJE,
    serverUrl: PROPERTIE_SERVER_URL
};

module.exports = {
    defaults,
    PROPERTIE_PROJECT_KEY,
    PROPERTIE_TOKEN,
    PROPERTIE_SOURCE_PATH,
    PROPERTIE_PROJECT_LANGUAJE,
    PROPERTIE_SERVER_URL,
};
