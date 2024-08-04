// Importar el escáner de SonarQube
const sonarqubeScanner = require('sonarqube-scanner').default;

// Importar el módulo path de Node.js
const path = require('path');

// Importar constantes relacionadas con la configuración
const {
    ENVIRONMENT,
    SONARQUBE_URL_ENDPOINT,
    SOURCE_PATH_CODE_TO_ANALIZE
} = require('@src/constants/Constants');

/**
 * Clase para manejar el análisis de código con SonarQube.
 */
class SonarQubeService {
    /**
     * Crea una instancia de SonarQubeService.
     * @param {string} projectKey - Clave del proyecto en SonarQube.
     * @param {string} projectName - Nombre del proyecto.
     * @param {string} token - Token de autenticación de SonarQube.
     * @param {string} projectLanguaje - Tipo de lenguaje del proyecto.
     */
    constructor (projectKey, projectName, token, projectLanguaje) {
        this.projectKey = projectKey;
        this.projectName = projectName;
        this.token = token;
        this.projectLanguaje = projectLanguaje;
    }

    /**
     * Configura los parámetros necesarios para el análisis.
     */
    setupConfiguration () {
        this.sourcePath = SOURCE_PATH_CODE_TO_ANALIZE;
        this.serverUrl = SONARQUBE_URL_ENDPOINT;
        this.projectBaseDir = path.resolve(__dirname, '../../'); // Ajusta según la estructura de tu proyecto
    }

    /**
     * Ejecuta el escáner de SonarQube.
     */
    run () {
        this.screenConfig(); // Muestra la configuración del escáner

        sonarqubeScanner(
            {
                serverUrl: this.serverUrl,
                options: {
                    ...this.getInitialProjectConfig(),
                    ...this.getprojectLanguajeConfig(this.projectLanguaje),
                    ...this.getExclusionsConfig() // Añade la configuración de exclusiones
                }
            },
            () => {
                console.log('Análisis de SonarQube completado.'); // Muestra un mensaje al completar el análisis
            }
        );
    }

    /**
     * Muestra la configuración del escáner en la consola.
     */
    screenConfig () {
        console.log('\n### Configuración');
        Object.entries(this).forEach(([key, value]) => {
            console.log(`## ${key} \t\t\t\t: ${value}`); // Muestra cada clave y valor del objeto
        });
        console.log('\n');
    }

    /**
     * Obtiene la configuración inicial del proyecto.
     * @returns {Object} - Configuración inicial del proyecto.
     */
    getInitialProjectConfig () {
        return {
            'sonar.projectKey': this.projectKey,
            'sonar.token': this.token,
            'sonar.sources': this.sourcePath,
            'sonar.projectBaseDir': this.projectBaseDir,
            'sonar.log.level': ENVIRONMENT === 'development' ? 'DEBUG' : 'INFO',
            'sonar.sourceEncoding': 'UTF-8',
            'sonar.scm.exclusions.disabled': true
        };
    }

    /**
     * Obtiene la configuración específica del proyecto según su tipo.
     * @param {string} language - El tipo de proyecto.
     * @returns {Object} - Configuración específica del proyecto.
     */
    getprojectLanguajeConfig (language) {
        console.log({ language });

        switch (language) {
        case 'js':
            return {
                'sonar.language': 'js',
                'sonar.javascript.file.suffixes': '.js,.jsx',
                'sonar.test.inclusions': '**/*.spec.js,**/*.spec.jsx,**/*.spec.ts,**/*.spec.tsx'
            };
        case 'php':
            return {
                'sonar.language': 'php',
                'sonar.test.inclusions': '**/*.php'
            };
        case 'python':
            return {
                'sonar.language': 'py',
                'sonar.test.inclusions': '**/*.py'
            };
        case 'android-java':
            return {
                'sonar.language': 'java',
                'sonar.test.inclusions': '**/*.java'
            };
        case 'android-kotlin':
            return {
                'sonar.language': 'kotlin',
                'sonar.test.inclusions': '**/*.kt'
            };
        default:
            return {
                'sonar.language': 'js,php,py,java,kotlin',
                'sonar.test.inclusions': '**/*.kt,**/*.java,**/*.py,**/*.php,**/*.spec.js,**/*.spec.jsx,**/*.spec.ts,**/*.spec.tsx'
            };
        }
    }

    /**
     * Obtiene la configuración de exclusiones de archivos y carpetas.
     * @returns {Object} - Configuración de exclusiones.
     */
    getExclusionsConfig () {
        return {
            'sonar.exclusions': '**/package.json,**/node_modules/**,.gitignore' // Ajusta los patrones de exclusión según sea necesario
        };
    }
}

module.exports = SonarQubeService; // Exporta la clase SonarQubeService
