// @path src/service/SonarQubeService.js
const sonarqubeScanner = require('sonarqube-scanner').default; // Importa el escáner de SonarQube
const path = require('path'); // Importa el módulo path de Node.js

class SonarQubeService {
    constructor(projectKey, token, sourcePath, projectLanguage, serverUrl) {
        this.projectKey = projectKey;
        this.token = token;
        this.sourcePath = sourcePath;
        this.projectLanguage = projectLanguage;
        this.serverUrl = serverUrl;
        this.projectBaseDir = path.resolve(__dirname, '../../'); // Ajusta según la estructura de tu proyecto
    }

    /**
     * Ejecuta el escáner de SonarQube
     */
    run() {
        this.screenConfig(); // Muestra la configuración del escáner
        sonarqubeScanner(
            {
                serverUrl: this.serverUrl,
                options: {
                    ...this.getInitialProjectConfig(),
                    ...this.getProjectLanguageConfig(this.projectLanguage),
                    ...this.getProjectShitsConfig(),
                    ...this.getExclusionsConfig(), // Añade la configuración de exclusiones
                },
            },
            () => {
                console.log('Análisis de SonarQube completado.'); // Muestra un mensaje al completar el análisis
            },
        );
    }

    /**
     * Muestra la configuración del escáner en la consola
     */
    screenConfig() {
        console.log('\n');
        console.log('### Configuración');
        Object.entries(this).forEach(([key, value]) => {
            console.log(`## ${key} \t\t\t\t: ${value}`); // Muestra cada clave y valor del objeto
        });
        console.log('\n');
    }

    /**
     * Obtiene la configuración inicial del proyecto
     * @returns {Object} - Configuración inicial del proyecto
     */
    getInitialProjectConfig() {       
        return {
            'sonar.projectKey': this.projectKey,
            'sonar.token': this.token,
            'sonar.sources': path.join(this.projectBaseDir, 'code/src'),  // Ruta a evaluar
            'sonar.projectBaseDir': this.projectBaseDir,
            'sonar.log.level': 'DEBUG',
        };
    }
    
    
    /**
     * Obtiene la configuración específica del proyecto según su tipo
     * @param {string} language - El tipo de proyecto
     * @returns {Object} - Configuración específica del proyecto
     */
    getProjectLanguageConfig(language) {
        switch (language) {
            case 'js':
                return {
                    'sonar.language': 'js',
                    'sonar.javascript.file.suffixes': '.js,.jsx',
                    'sonar.test.inclusions': '**/*.spec.js,**/*.spec.jsx,**/*.spec.ts,**/*.spec.tsx',
                };
            case 'php':
                return {
                    'sonar.language': 'php',
                    'sonar.test.inclusions': '**/*.php',
                };
            case 'python':
                return {
                    'sonar.language': 'py',
                    'sonar.test.inclusions': '**/*.py',
                };
            case 'android-java':
                return {
                    'sonar.language': 'java',
                    'sonar.test.inclusions': '**/*.java',
                };
            case 'android-kotlin':
                return {
                    'sonar.language': 'kotlin',
                    'sonar.test.inclusions': '**/*.kt',
                };
            default:
                return {
                    'sonar.language': 'js,php,py,java,kotlin',
                    'sonar.test.inclusions': '**/*.kt,**/*.java,**/*.py,**/*.php,**/*.spec.js,**/*.spec.jsx,**/*.spec.ts,**/*.spec.tsx',
                };
        }
    }

    /**
     * Obtiene la configuración del proyecto con rutas de informes LCOV
     * @returns {Object} - Configuración del proyecto con informes LCOV
     */
    getProjectShitsConfig() {
        return {
            'sonar.javascript.lcov.reportPaths': path.join(this.sourcePath, 'coverage/lcov.info'),
        };
    }

    /**
     * Obtiene la configuración de exclusiones de archivos y carpetas
     * @returns {Object} - Configuración de exclusiones
     */
    getExclusionsConfig() {
        return {
            'sonar.exclusions': '**/package.json,**/node_modules/**,.gitignore', // Ajusta los patrones de exclusión según sea necesario
        };
    }
}

module.exports = SonarQubeService; // Exporta la clase SonarQubeService
