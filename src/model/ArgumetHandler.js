// Importar constantes relacionadas con los mensajes de ayuda
const { CONSOLE_HELP_MESSAGE } = require('@src/constants/Constants');

/**
 * Clase para manejar los argumentos de la línea de comandos.
 */
class ArgumentHandler {
    /**
     * Crea una instancia de ArgumentHandler y analiza los argumentos.
     */
    constructor() {
        this.args = this.parseArgs();  // Argumentos analizados
    }

    /**
     * Analiza los argumentos de la línea de comandos.
     * 
     * @returns {Object} - Los argumentos analizados y si se incluyó el flag de ayuda.
     */
    parseArgs() {
        const args = process.argv.slice(2);  // Obtiene los argumentos de la línea de comandos
        const helpFlag = args.includes('--help');  // Verifica si se incluyó el flag de ayuda
        const parsedArgs = args.filter(arg => !arg.startsWith('--'));  // Filtra los argumentos que no comienzan con '--'
        return { parsedArgs, helpFlag };
    }

    /**
     * Obtiene un argumento en una posición específica.
     * 
     * @param {number} index - La posición del argumento.
     * @returns {any} - El valor del argumento o el valor por defecto.
     */
    getArgument(index) {
        return this.args.parsedArgs[index];
    }

    /**
     * Muestra el texto de ayuda si se incluyó el flag correspondiente.
     */
    showHelp() {
        if (this.args.helpFlag) {
            console.info(CONSOLE_HELP_MESSAGE);  // Muestra el texto de ayuda en la consola
            process.exit(0);  // Sale del proceso con código 0
        }
    }

    /**
     * Valida que se hayan proporcionado el número correcto de argumentos.
     * 
     * @param {number} requiredCount - El número de argumentos requeridos.
     */
    validateArguments(requiredCount) {
        if (this.args.parsedArgs.length < requiredCount) {  // Si no se proporcionaron suficientes argumentos
            console.error('Error: Missing required arguments.');  // Muestra un mensaje de error
            console.log('Use --help para ver las instrucciones.');  // Muestra un mensaje de ayuda
            process.exit(1);  // Sale del proceso con código 1 (indicando un error)
        }
    }
}

module.exports = ArgumentHandler;  // Exporta la clase ArgumentHandler
