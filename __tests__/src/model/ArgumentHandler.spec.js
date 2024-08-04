// __tests__/src/ArgumentHandler.spec.js
const ArgumentHandler = require('@src/model/ArgumetHandler');
const { CONSOLE_HELP_MESSAGE } = require('@src/constants/Constants');

describe('ArgumentHandler', () => {
    beforeEach(() => {
        // Limpia los mocks antes de cada prueba
        jest.clearAllMocks();
    });

    test('debería analizar los argumentos de la línea de comandos correctamente', () => {
        // Simular los argumentos de la línea de comandos
        process.argv = ['node', 'script.js', 'arg1', 'arg2', '--help'];

        // Crear una instancia de ArgumentHandler
        const handler = new ArgumentHandler();

        // Verificar los argumentos analizados
        expect(handler.args.parsedArgs).toEqual(['arg1', 'arg2']);
        expect(handler.args.helpFlag).toBe(true);
    });

    test('debería recuperar el argumento en una posición específica', () => {
        // Simular los argumentos de la línea de comandos
        process.argv = ['node', 'script.js', 'arg1', 'arg2'];

        // Crear una instancia de ArgumentHandler
        const handler = new ArgumentHandler();

        // Verificar la recuperación de los argumentos
        expect(handler.getArgument(0)).toBe('arg1');
        expect(handler.getArgument(1)).toBe('arg2');
        expect(handler.getArgument(2)).toBeUndefined(); // Argumento no definido
    });

    test('debería mostrar el mensaje de ayuda y salir si se incluye el flag de ayuda', () => {
        // Simular los argumentos de la línea de comandos
        process.argv = ['node', 'script.js', '--help'];

        // Crear una instancia de ArgumentHandler
        const handler = new ArgumentHandler();

        // Espiar console.info y process.exit
        const consoleInfoSpy = jest.spyOn(console, 'info').mockImplementation(() => {});
        const processExitSpy = jest.spyOn(process, 'exit').mockImplementation(() => {});

        // Llamar a showHelp
        handler.showHelp();

        // Verificar que console.info se haya llamado con el mensaje de ayuda
        expect(consoleInfoSpy).toHaveBeenCalledWith(CONSOLE_HELP_MESSAGE);
        // Verificar que process.exit se haya llamado con código 0
        expect(processExitSpy).toHaveBeenCalledWith(0);

        // Restaurar los mocks
        consoleInfoSpy.mockRestore();
        processExitSpy.mockRestore();
    });

    test('debería mostrar un mensaje de error y salir si no se proporcionan suficientes argumentos', () => {
        // Simular los argumentos de la línea de comandos
        process.argv = ['node', 'script.js'];

        // Crear una instancia de ArgumentHandler
        const handler = new ArgumentHandler();

        // Espiar console.error y process.exit
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
        const processExitSpy = jest.spyOn(process, 'exit').mockImplementation(() => {});

        // Llamar a validateArguments con un número requerido de argumentos
        handler.validateArguments(2);

        // Verificar que console.error se haya llamado con el mensaje de error
        expect(consoleErrorSpy).toHaveBeenCalledWith('Error: Missing required arguments.');
        // Verificar que console.log se haya llamado con el mensaje de ayuda
        expect(consoleLogSpy).toHaveBeenCalledWith('Use --help para ver las instrucciones.');
        // Verificar que process.exit se haya llamado con código 1
        expect(processExitSpy).toHaveBeenCalledWith(1);

        // Restaurar los mocks
        consoleErrorSpy.mockRestore();
        consoleLogSpy.mockRestore();
        processExitSpy.mockRestore();
    });
});
