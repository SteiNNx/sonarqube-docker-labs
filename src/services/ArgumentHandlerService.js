// @path src/services/ArgumentHandlerService.js
const ArgumentHandler = require('@src/model/ArgumetHandler');  // Importa la clase ArgumentHandler
const {
    ARGV_REQUIRED_ARGUMENTS,
    ARGV_INDEX_PROJECT_KEY,
    ARGV_INDEX_PROJECT_NAME,
    ARGV_INDEX_PROJECT_LANGUAJE,
    ARGV_INDEX_TOKEN,
} = require('@src/constants/Constants'); 

class ArgumentHandlerService {
    constructor() {
        this.argumentHandlerInstance = new ArgumentHandler();  // Crea una instancia de ArgumentHandler con los valores por defecto
    }

    /**
     * Inicializa los argumentos de la línea de comandos.
     * @returns {Object} Los argumentos inicializados.
     */
    initArgs() {
        // Muestra la ayuda si se proporciona el argumento --help
        this.argumentHandlerInstance.showHelp();

        // Valida y maneja los errores en las entradas
        this.argumentHandlerInstance.validateArguments(ARGV_REQUIRED_ARGUMENTS);

        // Recoge los argumentos de la línea de comandos con valores por defecto
        const projectKey = this.argumentHandlerInstance.getArgument(ARGV_INDEX_PROJECT_KEY);
        const projectName = this.argumentHandlerInstance.getArgument(ARGV_INDEX_PROJECT_NAME);
        const token = this.argumentHandlerInstance.getArgument(ARGV_INDEX_TOKEN);
        const projectLanguaje = this.argumentHandlerInstance.getArgument(ARGV_INDEX_PROJECT_LANGUAJE);

        return {
            projectKey,
            projectName,
            token,
            projectLanguaje,
        };
    }
}

module.exports = ArgumentHandlerService;
