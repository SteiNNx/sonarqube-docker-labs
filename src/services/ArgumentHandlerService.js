// Importar la clase ArgumentHandler
const ArgumentHandler = require('@src/model/ArgumetHandler');

// Importar constantes relacionadas con los argumentos de la línea de comandos
const {
    ARGV_REQUIRED_ARGUMENTS,
    ARGV_INDEX_PROJECT_KEY,
    ARGV_INDEX_PROJECT_NAME,
    ARGV_INDEX_PROJECT_LANGUAJE,
    ARGV_INDEX_TOKEN,
} = require('@src/constants/Constants');

/**
 * Clase para manejar los argumentos de la línea de comandos del proyecto.
 */
class ArgumentHandlerService {
    /**
     * Crea una instancia de ArgumentHandlerService.
     */
    constructor() {
        // Crear una instancia de ArgumentHandler con los valores por defecto
        this.argumentHandlerInstance = new ArgumentHandler();
    }

    /**
     * Inicializa los argumentos de la línea de comandos.
     * 
     * @returns {Object} - Los argumentos inicializados.
     */
    initArgs() {
        // Mostrar la ayuda si se proporciona el argumento --help
        this.argumentHandlerInstance.showHelp();

        // Validar y manejar los errores en las entradas
        this.argumentHandlerInstance.validateArguments(ARGV_REQUIRED_ARGUMENTS);

        // Recoger los argumentos de la línea de comandos con valores por defecto
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
