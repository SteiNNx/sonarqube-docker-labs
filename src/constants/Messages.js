// @path src/service/Messages.js
const {
  PROPERTIE_PROJECT_KEY,
  PROPERTIE_TOKEN,
  PROPERTIE_SOURCE_PATH,
  PROPERTIE_PROJECT_LANGUAJE,
  PROPERTIE_SERVER_URL,
} = require('@src/constants/SonarQube');

/** Console help messages */
// Mensaje de ayuda para la consola
const CONSOLE_HELP_MESSAGE = `
Uso: node scripts/index.js [projectKey] [token] [sourcePath] [projectType] [serverUrl]
Defecto:
  projectKey        : '${PROPERTIE_PROJECT_KEY}'  // Clave única del proyecto en SonarQube
  token             : '${PROPERTIE_TOKEN}'  // Token de autenticación generado en SonarQube
  sourcePath        : '${PROPERTIE_SOURCE_PATH}'  // Ruta al código fuente que será analizado
  projectLanguaje   : '${PROPERTIE_PROJECT_LANGUAJE}'  // Tipo de proyecto
  serverUrl         : '${PROPERTIE_SERVER_URL}'  // URL del servidor SonarQube

Ejemplos:
  node scripts/index.js myProject myToken ./code/node_app/src js http://localhost:9000
  node scripts/index.js myProject myToken ./code/java_app/src java http://localhost:9000
`;

module.exports = {
  CONSOLE_HELP_MESSAGE
};