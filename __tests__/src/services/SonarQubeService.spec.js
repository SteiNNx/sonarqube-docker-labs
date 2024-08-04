// __tests__/src/SonarQubeService.spec.js
const path = require('path');
const SonarQubeService = require('@src/services/SonarQubeService');
const { ENVIRONMENT, SONARQUBE_URL_ENDPOINT, SOURCE_PATH_CODE_TO_ANALIZE } = require('@src/constants/Constants');

// Mock para sonarqube-scanner
jest.mock('sonarqube-scanner', () => ({
    default: jest.fn(), // No necesitamos definir un comportamiento para el mock en este caso
}));

describe('SonarQubeService', () => {
    let sonarQubeService;

    beforeEach(() => {
        // Crear una instancia de SonarQubeService antes de cada prueba
        sonarQubeService = new SonarQubeService('projectKey', 'projectName', 'token', 'js');
        sonarQubeService.setupConfiguration();
    });

    test('debería configurar los parámetros correctamente', () => {
        expect(sonarQubeService.sourcePath).toBe(SOURCE_PATH_CODE_TO_ANALIZE);
        expect(sonarQubeService.serverUrl).toBe(SONARQUBE_URL_ENDPOINT);
        expect(sonarQubeService.projectBaseDir).toBe(path.resolve(__dirname, '../../../'));
    });

    test('debería devolver la configuración inicial del proyecto', () => {
        const initialConfig = sonarQubeService.getInitialProjectConfig();
        
        expect(initialConfig).toEqual({
            'sonar.projectKey': 'projectKey',
            'sonar.token': 'token',
            'sonar.sources': SOURCE_PATH_CODE_TO_ANALIZE,
            'sonar.projectBaseDir': path.resolve(__dirname, '../../../'),
            'sonar.log.level': ENVIRONMENT === 'development' ? 'DEBUG' : 'INFO',
            'sonar.sourceEncoding': 'UTF-8',
        });
    });

    test('debería devolver la configuración del lenguaje de programación correcta', () => {
        const jsConfig = sonarQubeService.getprojectLanguajeConfig('js');
        expect(jsConfig).toEqual({
            'sonar.language': 'js',
            'sonar.javascript.file.suffixes': '.js,.jsx',
            'sonar.test.inclusions': '**/*.spec.js,**/*.spec.jsx,**/*.spec.ts,**/*.spec.tsx',
        });

        const phpConfig = sonarQubeService.getprojectLanguajeConfig('php');
        expect(phpConfig).toEqual({
            'sonar.language': 'php',
            'sonar.test.inclusions': '**/*.php',
        });

        const pythonConfig = sonarQubeService.getprojectLanguajeConfig('python');
        expect(pythonConfig).toEqual({
            'sonar.language': 'py',
            'sonar.test.inclusions': '**/*.py',
        });

        const defaultConfig = sonarQubeService.getprojectLanguajeConfig('unknown');
        expect(defaultConfig).toEqual({
            'sonar.language': 'js,php,py,java,kotlin',
            'sonar.test.inclusions': '**/*.kt,**/*.java,**/*.py,**/*.php,**/*.spec.js,**/*.spec.jsx,**/*.spec.ts,**/*.spec.tsx',
        });
    });

    test('debería devolver la configuración de exclusiones', () => {
        const exclusionsConfig = sonarQubeService.getExclusionsConfig();
        expect(exclusionsConfig).toEqual({
            'sonar.exclusions': '**/package.json,**/node_modules/**,.gitignore',
        });
    });

    test('debería mostrar la configuración en la consola', () => {
        // Espiar console.log
        const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

        sonarQubeService.screenConfig();

        expect(consoleLogSpy).toHaveBeenCalledWith('\n### Configuración');
        expect(consoleLogSpy).toHaveBeenCalledWith('## projectKey \t\t\t\t: projectKey');
        expect(consoleLogSpy).toHaveBeenCalledWith('## projectName \t\t\t\t: projectName');
        expect(consoleLogSpy).toHaveBeenCalledWith('## token \t\t\t\t: token');
        expect(consoleLogSpy).toHaveBeenCalledWith('## projectLanguaje \t\t\t\t: js');
        expect(consoleLogSpy).toHaveBeenCalledWith('\n');

        // Restaurar el espía
        consoleLogSpy.mockRestore();
    });
});
