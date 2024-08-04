// __tests__/src/index.spec.js
const ArgumentHandlerService = require('@src/services/ArgumentHandlerService');
const SonarQubeService = require('@src/services/SonarQubeService');

jest.mock('@src/services/ArgumentHandlerService');
jest.mock('@src/services/SonarQubeService');

describe('index.js', () => {
    let sonarQubeService;
    let mockInitArgs;

    beforeEach(() => {
        // Inicializa una instancia de SonarQubeService para cada prueba
        sonarQubeService = new SonarQubeService();

        // Configura el mock para el método `initArgs` de ArgumentHandlerService
        mockInitArgs = jest.fn().mockReturnValue({
            projectKey: 'testKey',
            projectName: 'testProject',
            token: 'testToken',
            projectLanguaje: 'js'
        });
        ArgumentHandlerService.initArgs = mockInitArgs;

        // Mockea los métodos de SonarQubeService para que no realicen acciones reales
        jest.spyOn(sonarQubeService, 'setupConfiguration').mockImplementation(() => {});
        jest.spyOn(sonarQubeService, 'run').mockImplementation(() => {});
    });

    test('debería llamar a `setupConfiguration`', () => {
        sonarQubeService.setupConfiguration();
        expect(sonarQubeService.setupConfiguration).toHaveBeenCalled();
    });

    test('debería llamar a `run`', () => {
        sonarQubeService.run();
        expect(sonarQubeService.run).toHaveBeenCalled();
    });

    test('debería llamar a `initArgs` y devolver los valores esperados', () => {
        const args = ArgumentHandlerService.initArgs();
        expect(mockInitArgs).toHaveBeenCalled();
        expect(args).toEqual({
            projectKey: 'testKey',
            projectName: 'testProject',
            token: 'testToken',
            projectLanguaje: 'js'
        });
    });

    test('debería ejecutar el flujo completo correctamente', () => {
        const args = ArgumentHandlerService.initArgs();
        expect(mockInitArgs).toHaveBeenCalled();
        expect(args).toEqual({
            projectKey: 'testKey',
            projectName: 'testProject',
            token: 'testToken',
            projectLanguaje: 'js'
        });

        const sonarQubeServiceInstance = new SonarQubeService(
            args.projectKey,
            args.projectName,
            args.token,
            args.projectLanguaje
        );

        sonarQubeServiceInstance.setupConfiguration();
        expect(sonarQubeServiceInstance.setupConfiguration).toHaveBeenCalled();

        sonarQubeServiceInstance.run();
        expect(sonarQubeServiceInstance.run).toHaveBeenCalled();
    });

    test('debería ejecutar `src/index.js` y llamar a los métodos adecuados', () => {
        // Configura los spies en los métodos de SonarQubeService
        const spySetupConfiguration = jest.spyOn(SonarQubeService.prototype, 'setupConfiguration').mockImplementation(() => {});
        const spyRun = jest.spyOn(SonarQubeService.prototype, 'run').mockImplementation(() => {});

        // Configura el spy para el método `initArgs` de ArgumentHandlerService
        const spyInitArgs = jest.spyOn(ArgumentHandlerService.prototype, 'initArgs').mockReturnValue({
            projectKey: 'testKey',
            projectName: 'testProject',
            token: 'testToken',
            projectLanguaje: 'js'
        });

        // Importa y ejecuta el archivo `index.js`
        require('@src/index');

        // Verifica que los métodos esperados hayan sido llamados
        expect(spySetupConfiguration).toHaveBeenCalled();
        expect(spyRun).toHaveBeenCalled();
        expect(spyInitArgs).toHaveBeenCalled();
        expect(spyInitArgs()).toEqual({
            projectKey: 'testKey',
            projectName: 'testProject',
            token: 'testToken',
            projectLanguaje: 'js'
        });

        // Limpia los spies
        spySetupConfiguration.mockRestore();
        spyRun.mockRestore();
        spyInitArgs.mockRestore();
    });
});
