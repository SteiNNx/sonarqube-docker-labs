// __tests__/src/ArgumentHandlerService.spec.js
const ArgumentHandlerService = require('@src/services/ArgumentHandlerService');
const ArgumentHandler = require('@src/model/ArgumetHandler');

// Mockear la clase ArgumentHandler
jest.mock('@src/model/ArgumetHandler', () => {
    return jest.fn().mockImplementation(() => ({
        showHelp: jest.fn(),
        validateArguments: jest.fn(),
        getArgument: jest.fn()
    }));
});

const {
    ARGV_REQUIRED_ARGUMENTS,
    ARGV_INDEX_PROJECT_KEY,
    ARGV_INDEX_PROJECT_NAME,
    ARGV_INDEX_PROJECT_LANGUAJE,
    ARGV_INDEX_TOKEN,
} = require('@src/constants/Constants');

describe('ArgumentHandlerService', () => {
    let argumentHandlerService;
    let argumentHandlerInstance;

    beforeEach(() => {
        // Crear una instancia de ArgumentHandlerService
        argumentHandlerService = new ArgumentHandlerService();
        // Obtener la instancia mockeada de ArgumentHandler
        argumentHandlerInstance = argumentHandlerService.argumentHandlerInstance;
    });

    test('debería inicializar correctamente los argumentos', () => {
        // Configurar los valores de retorno esperados para getArgument
        argumentHandlerInstance.getArgument
            .mockImplementationOnce(() => 'testKey') // ARGV_INDEX_PROJECT_KEY
            .mockImplementationOnce(() => 'testProject') // ARGV_INDEX_PROJECT_NAME
            .mockImplementationOnce(() => 'testToken') // ARGV_INDEX_TOKEN
            .mockImplementationOnce(() => 'js'); // ARGV_INDEX_PROJECT_LANGUAJE

        // Llamar al método initArgs
        const args = argumentHandlerService.initArgs();

        // Verificar que showHelp se haya llamado
        expect(argumentHandlerInstance.showHelp).toHaveBeenCalled();

        // Verificar que validateArguments se haya llamado con el argumento correcto
        expect(argumentHandlerInstance.validateArguments).toHaveBeenCalledWith(ARGV_REQUIRED_ARGUMENTS);

        // Verificar los valores retornados
        expect(args).toEqual({
            projectKey: 'testKey',
            projectName: 'testProject',
            token: 'testToken',
            projectLanguaje: 'js'
        });

        // Verificar que getArgument se haya llamado con los índices correctos
        expect(argumentHandlerInstance.getArgument).toHaveBeenCalledWith(ARGV_INDEX_PROJECT_KEY);
        expect(argumentHandlerInstance.getArgument).toHaveBeenCalledWith(ARGV_INDEX_PROJECT_NAME);
        expect(argumentHandlerInstance.getArgument).toHaveBeenCalledWith(ARGV_INDEX_TOKEN);
        expect(argumentHandlerInstance.getArgument).toHaveBeenCalledWith(ARGV_INDEX_PROJECT_LANGUAJE);
    });
});
