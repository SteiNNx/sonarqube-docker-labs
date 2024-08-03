// @path src/service/ArgumentHandlerService.js
const ArgumentHandler = require('@src/model/ArgumetHandler');  // Importa la clase ArgumentHandler
const {
    ARGV_REQUIRED_ARGUMENTS,
    ARGV_INDEX_PROJECT_KEY,
    ARGV_INDEX_TOKEN,
    ARGV_INDEX_SOURCE_PATH,
    ARGV_INDEX_PROJECT_LANGUAJE,
    ARGV_INDEX_SERVER_URL,
} = require('@src/constants/Constants');  // Importa las constantes relacionadas con los argumentos
const {
    CONSOLE_HELP_MESSAGE,
} = require('@src/constants/Messages');  // Importa el mensaje de ayuda
const {
    defaults,
    PROPERTIE_PROJECT_KEY,
    PROPERTIE_TOKEN,
    PROPERTIE_SOURCE_PATH,
    PROPERTIE_PROJECT_LANGUAJE,
    PROPERTIE_SERVER_URL,
} = require('@src/constants/SonarQube');  // Importa las propiedades por defecto de SonarQube

class ArgumentHandlerService {
    constructor() {
        this.argumentHandlerInstance = new ArgumentHandler(defaults);  // Crea una instancia de ArgumentHandler con los valores por defecto
    }

    /**
     * Inicializa los argumentos de la línea de comandos.
     * @returns {Object} Los argumentos inicializados.
     */
    initArgs() {
        // Muestra la ayuda si se proporciona el argumento --help
        this.argumentHandlerInstance.showHelp(CONSOLE_HELP_MESSAGE);

        // Valida y maneja los errores en las entradas
        this.argumentHandlerInstance.validateArguments(ARGV_REQUIRED_ARGUMENTS);

        // Recoge los argumentos de la línea de comandos con valores por defecto
        const projectKey = this.argumentHandlerInstance.getArgument(ARGV_INDEX_PROJECT_KEY, PROPERTIE_PROJECT_KEY);
        const token = this.argumentHandlerInstance.getArgument(ARGV_INDEX_TOKEN, PROPERTIE_TOKEN);
        const sourcePath = this.argumentHandlerInstance.getArgument(ARGV_INDEX_SOURCE_PATH, PROPERTIE_SOURCE_PATH);
        const projectLanguaje = this.argumentHandlerInstance.getArgument(ARGV_INDEX_PROJECT_LANGUAJE, PROPERTIE_PROJECT_LANGUAJE);
        const serverUrl = this.argumentHandlerInstance.getArgument(ARGV_INDEX_SERVER_URL, PROPERTIE_SERVER_URL);

        return {
            projectKey,
            token,
            sourcePath,
            projectLanguaje,
            serverUrl,
        };
    }
}

module.exports = ArgumentHandlerService;
