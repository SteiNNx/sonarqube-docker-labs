const ArgumentHandlerService = require('@src/services/ArgumentHandlerService');
const SonarQubeService = require('@src/services/SonarQubeService');

// Crear una instancia de ArgumentHandlerService para manejar los argumentos del proyecto
const argumentHandlerService = new ArgumentHandlerService();

// Inicializar los argumentos del proyecto utilizando la instancia de ArgumentHandlerService
const {
    projectKey,
    projectName,
    token,
    projectLanguaje,
} = argumentHandlerService.initArgs();

// Crear una instancia de SonarQubeService con los argumentos del proyecto
const sonarQubeService = new SonarQubeService(
    projectKey,
    projectName,
    token,
    projectLanguaje,
);

// Configuracion
sonarQubeService.setupConfiguration();

// Ejecutar el análisis en SonarQube utilizando la instancia de SonarQubeService
sonarQubeService.run();
