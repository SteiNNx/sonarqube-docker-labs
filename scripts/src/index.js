const ArgumentHandlerService = require('@src/service/ArgumentHandlerService');
const SonarQubeService = require('@src/service/SonarQube');

// Crear una instancia de ArgumentHandlerService para manejar los argumentos del proyecto
const argumentHandlerService = new ArgumentHandlerService();

// Inicializar los argumentos del proyecto utilizando la instancia de ArgumentHandlerService
const {
    projectKey,    // Clave única del proyecto en SonarQube
    token,         // Token de autenticación generado en SonarQube
    sourcePath,    // Ruta al código fuente que será analizado
    projectType,   // Tipo de proyecto (por ejemplo, 'js' para JavaScript)
    serverUrl,     // URL del servidor SonarQube
} = argumentHandlerService.initArgs();

// Crear una instancia de SonarQubeService con los argumentos del proyecto
const sonarQubeService = new SonarQubeService(
    projectKey,
    token,
    sourcePath,
    projectType,
    serverUrl,
);

// Ejecutar el análisis en SonarQube utilizando la instancia de SonarQubeService
sonarQubeService.run();
