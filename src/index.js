/**
 * @fileoverview
 * @author Jorge Reyes (@steinnx en GitHub)
 * @description
 * Este módulo es el punto de entrada para una aplicación Node.js que realiza
 * el análisis de código utilizando un servidor SonarQube local (localhost:9000).
 * Asegúrate de que el servidor SonarQube esté en funcionamiento antes de
 * ejecutar esta aplicación, utilizando un archivo docker-compose.yml para su
 * configuración.
 * @version 1.0.0
 * @module index
 */

// Registrar los alias de módulos definidos en package.json
require('module-alias/register');

// Importar los módulos necesarios para el funcionamiento de la aplicación
const ArgumentHandlerService = require('@src/services/ArgumentHandlerService');
const SonarQubeService = require('@src/services/SonarQubeService');

/**
 * @typedef {Object} ProjectArgs
 * @property {string} projectKey - Clave única del proyecto en SonarQube, utilizada para identificar el proyecto.
 * @property {string} projectName - Nombre del proyecto que se analizará en SonarQube.
 * @property {string} token - Token de autenticación necesario para conectar con el servidor SonarQube.
 * @property {string} projectLanguage - Lenguaje de programación utilizado en el proyecto que se analizará.
 */

// Crear una instancia del servicio que maneja los argumentos del proyecto
const argumentHandlerService = new ArgumentHandlerService();

// Obtener los argumentos del proyecto
const args = argumentHandlerService.initArgs();
console.log({ args });

/**
 * Desestructurar los argumentos obtenidos para extraer las propiedades necesarias.
 * @type {ProjectArgs}
 */
const {
    projectKey,
    projectName,
    token,
    projectLanguaje
} = args;

// Validar que todos los argumentos necesarios estén presentes
if (!projectKey || !projectName || !token || !projectLanguaje) {
    console.error('Error de inicialización: faltan argumentos requeridos.');
    process.exit(1); // Salir del proceso con código de error
}

// Crear una instancia del servicio para interactuar con SonarQube
const sonarQubeService = new SonarQubeService(
    projectKey,
    projectName,
    token,
    projectLanguaje
);

// Configurar el servicio de SonarQube con la configuración necesaria
sonarQubeService.setupConfiguration();

// Ejecutar el análisis del código en SonarQube
sonarQubeService.run();
