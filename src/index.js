/** 
 * @fileoverview
 * @author Jorge Reyes (@steinnx en GitHub)
 * @description
 * Aplicación Node.js que analiza el código en un servidor SonarQube local (localhost:9000),
 * el cual debe estar previamente levantado utilizando un archivo docker-compose.yml.
 * 
 * Este archivo es el punto de entrada de la aplicación, donde se configuran y ejecutan
 * los servicios necesarios para realizar el análisis del código con SonarQube.
 * 
 * @version 1.0.0
 * @module index
 */

// Registrar los alias de módulos definidos en package.json
require('module-alias/register');

// Importar los módulos necesarios para el funcionamiento de la aplicación
const ArgumentHandlerService = require('@src/services/ArgumentHandlerService');
const SonarQubeService = require('@src/services/SonarQubeService');

/**
 * Crear una instancia de ArgumentHandlerService para manejar los argumentos del proyecto.
 * 
 * @type {ArgumentHandlerService}
 */
const argumentHandlerService = new ArgumentHandlerService();

/**
 * Inicializar los argumentos del proyecto utilizando la instancia de ArgumentHandlerService.
 * 
 * @typedef {Object} ProjectArgs
 * @property {string} projectKey - Clave única del proyecto en SonarQube.
 * @property {string} projectName - Nombre del proyecto.
 * @property {string} token - Token de autenticación para SonarQube.
 * @property {string} projectLanguaje - Tipo de lenguaje del proyecto.
 * 
 * @type {ProjectArgs}
 */
const {
    projectKey,
    projectName,
    token,
    projectLanguaje,
} = argumentHandlerService.initArgs();

/**
 * Crear una instancia de SonarQubeService con los argumentos del proyecto.
 * 
 * @type {SonarQubeService}
 */
const sonarQubeService = new SonarQubeService(
    projectKey,
    projectName,
    token,
    projectLanguaje,
);

// Configurar SonarQubeService con la configuración necesaria
sonarQubeService.setupConfiguration();

// Ejecutar el análisis en SonarQube utilizando la instancia de SonarQubeService
sonarQubeService.run();
