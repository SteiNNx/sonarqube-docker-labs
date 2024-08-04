// @path src/contants/Constants.js
const dotenv = require('dotenv');

dotenv.config();

const ENVIRONMENT = process.env.ENVIRONMENT;
const SONARQUBE_URL_ENDPOINT = process.env.SONARQUBE_URL_ENDPOINT;

const SOURCE_PATH_CODE_TO_ANALIZE = 'code';

// Mensaje de ayuda para la consola
const CONSOLE_HELP_MESSAGE = `
Uso: node index.js [projectKey] [projectName] [token] [projectType]

Defecto:
  projectKey        : 'back-end-node-api'  // Clave única del proyecto en SonarQube
  projectName       : 'default-project'  // Nombre del proyecto
  token             : '<sonar_token_aqui>'  // Token de autenticación generado en SonarQube
  projectType       : '<tipo_projecto_aqui>'  // Tipo de proyecto (js, WIP -> kt,android)

Ejemplos:
  node index.js myProject myProjectName myToken js
  node index.js anotherProject anotherProjectName anotherToken java
`;

const ARGV_REQUIRED_ARGUMENTS = 4;
const ARGV_INDEX_PROJECT_KEY = 0;
const ARGV_INDEX_PROJECT_NAME = 1;
const ARGV_INDEX_TOKEN = 2;
const ARGV_INDEX_PROJECT_LANGUAJE = 3;

module.exports = {
    ARGV_REQUIRED_ARGUMENTS,
    ARGV_INDEX_PROJECT_KEY,
    ARGV_INDEX_PROJECT_NAME,
    ARGV_INDEX_PROJECT_LANGUAJE,
    ARGV_INDEX_TOKEN,
    CONSOLE_HELP_MESSAGE,
    ENVIRONMENT,
    SONARQUBE_URL_ENDPOINT,
    SOURCE_PATH_CODE_TO_ANALIZE,
};
