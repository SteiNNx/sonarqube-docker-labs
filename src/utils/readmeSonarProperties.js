// Propiedades de configuración para SonarQube

// Clave única del proyecto en SonarQube
//'sonar.projectKey': 'ProjectRunScriptSonarScanner', 
// Ruta al código fuente que será analizado
//'sonar.sources': 'src', 

// Ruta a los archivos de prueba
//'sonar.tests': 'src', 

// Archivos que deben ser incluidos en el análisis
//'sonar.inclusions': 'src/**/*.java', 

// Archivos de prueba incluidos en el análisis
//'sonar.test.inclusions': 'src/**/*.spec.ts, src/**/*.spec.jsx, src/**/*.test.js, src/**/*.test.jsx', 

// Lenguaje de programación principal
//'sonar.language': 'java', 

// Codificación del archivo fuente
//'sonar.sourceEncoding': 'UTF-8', 

// Nombre del proyecto en SonarQube
//'sonar.projectName': 'Mi Proyecto Android', 

// Versión del proyecto
//'sonar.projectVersion': '1.0', 

// Descripción del proyecto
//'sonar.projectDescription': 'Descripción del proyecto', 

// URL de la página principal del proyecto
//'sonar.links.homepage': 'http://mi-proyecto.com', 

// URL de la integración continua
//'sonar.links.ci': 'http://ci.mi-proyecto.com', 

// URL de la gestión de incidencias
//'sonar.links.issue': 'http://issues.mi-proyecto.com', 

// URL del control de versiones
//'sonar.links.scm': 'http://scm.mi-proyecto.com', 

// Archivos que deben ser excluidos del análisis
//'sonar.exclusions': 'src/**/*.xml,**/*.gradle', 

// Archivos de prueba excluidos del análisis de cobertura
//'sonar.coverage.exclusions': 'src/**/*.spec.ts,src/**/*.test.js', 

// Ruta a los archivos binarios compilados
//'sonar.java.binaries': 'build/classes', 

// Propiedades adicionales para las librerías Java utilizadas en el proyecto
//'sonar.java.libraries': 'lib/*.jar', 

// Configuración de análisis de calidad para archivos de código fuente
//'sonar.cpd.exclusions': 'src/test/**', // Archivos excluidos del análisis de duplicación de código

// Configuración de análisis de complejidad
//'sonar.java.source': '1.8', // Versión de Java para el análisis

// Configuración de análisis de cobertura
//'sonar.coverage.jacoco.xmlReportPaths': 'build/reports/jacoco/test/jacocoTestReport.xml', // Ruta a los informes de cobertura JaCoCo

// Configuración de análisis para test de integración
//'sonar.testExecutionReportPaths': 'build/test-results/test', // Ruta a los informes de ejecución de tests

// Configuración para el análisis de duplicación de código
//'sonar.cpd.exclusions': '**/generated-sources/**,**/generated-test-sources/**', // Exclusiones para el análisis de duplicación de código

// Configuración de análisis para el reporte de bugs
//'sonar.issue.ignore.allfile.since': '2024-01-01', // Ignorar archivos modificados desde esta fecha para el reporte de bugs

// Configuración de análisis para el reporte de seguridad
//'sonar.security.hotspots.reportPaths': 'build/reports/security/hotspots.json', // Ruta al informe de hotspots de seguridad

// Configuración de análisis para el análisis de calidad del código
//'sonar.qualitygate.wait': 'true', // Esperar a que el Quality Gate se complete antes de terminar el análisis

// Configuración para análisis de SonarLint
//'sonar.lint.config': 'sonar-lint.json', // Ruta al archivo de configuración de SonarLint

// Configuración de reportes
//'sonar.report.export.path': 'sonar-report.json', // Ruta para exportar el reporte de análisis

// Configuración de análisis de código estático
//'sonar.javascript.file.suffixes': '.js,.jsx,.ts,.tsx', // Sufijos de archivo para JavaScript y TypeScript

// Configuración de análisis para PHP
//'sonar.php.exclusions': '**/*.spec.php', // Exclusiones para archivos PHP

// Configuración de análisis para Python
//'sonar.python.coverage.reportPaths': 'coverage.xml', // Ruta al informe de cobertura de Python

// Configuración de análisis para Ruby
//'sonar.ruby.coverage.reportPaths': 'coverage/.resultset.json', // Ruta al informe de cobertura de Ruby

// Configuración de análisis para otros lenguajes
//'sonar.groovy.coverage.reportPaths': 'build/reports/groovyCoverage.xml', // Ruta al informe de cobertura de Groovy

// Configuración del límite de complejidad
//'sonar.cpd.minLines': 10, // Límite mínimo de líneas para la duplicación de código

// Configuración del límite de archivos
//'sonar.cpd.minimumTokenCount': 100, // Número mínimo de tokens para considerar duplicación de código

// Configuración de análisis de JavaScript
//'sonar.javascript.lcov.reportPaths': 'coverage/lcov-report/index.html', // Ruta al informe de cobertura LCOV para JavaScript

// Configuración de análisis para TypeScript
//'sonar.typescript.tsconfigPath': 'tsconfig.json', // Ruta al archivo de configuración de TypeScript

// Configuración de análisis para el manejo de errores
//'sonar.log.level': 'DEBUG', // Nivel de logging para la salida de análisis

// Configuración de análisis para la integración continua
//'sonar.buildbreaker.enable': 'true', // Habilitar el "Build Breaker" para análisis de integración continua

// Configuración de análisis para archivos generados
//'sonar.issues.report.path': 'build/reports/sonar/issues-report.json', // Ruta al informe de problemas detectados en el análisis

// Configuración para análisis de calidad
//'sonar.qualitygate.timeout': '300', // Tiempo de espera para el Quality Gate

// Configuración para análisis de seguridad
//'sonar.security.exclusions': '**/*.test.js,**/*.spec.js', // Archivos excluidos del análisis de seguridad

// Configuración para archivos de resultados
//'sonar.resultfiles.path': 'build/sonar-results', // Ruta a los archivos de resultados del análisis

// Configuración de análisis para librerías
//'sonar.libraries': 'lib/*.jar', // Ruta a las librerías utilizadas en el proyecto

// Configuración de análisis de cobertura de código
//'sonar.coverage.exclusions': 'src/**/*.test.js,src/**/*.spec.js', // Archivos excluidos del análisis de cobertura

// Configuración del análisis de calidad del código
//'sonar.qualitygate.timeout': '300', // Tiempo máximo de espera para el Quality Gate

// Configuración del análisis de duplicación de código
//'sonar.cpd.exclusions': 'src/generated/**', // Archivos generados excluidos del análisis de duplicación de código

// Configuración de análisis para proyectos multinúcleo
//'sonar.project.nocov.exclusions': 'src/**/*Test.java', // Archivos de test excluidos del análisis de cobertura

// Configuración para el análisis de la base de datos
//'sonar.sql.exclusions': '**/*.sql', // Archivos SQL excluidos del análisis

// Configuración para análisis en entornos locales
//'sonar.local': 'true', // Habilitar el análisis en un entorno local

// Configuración del análisis en la nube
//'sonar.cloud': 'true', // Habilitar el análisis en la nube

// Configuración para el análisis de XML
//'sonar.xml.exclusions': '**/*.xml', // Archivos XML excluidos del análisis

// Configuración para análisis de archivos binarios
//'sonar.binary.exclusions': '**/*.bin', // Archivos binarios excluidos del análisis

// Configuración de análisis para pruebas de rendimiento
//'sonar.performance.reportPaths': 'build/reports/performance-report.xml', // Ruta al informe de pruebas de rendimiento

// Configuración de análisis para integraciones
//'sonar.integration.url': 'http://integration-server.com', // URL del servidor de integración

// Configuración del análisis de código de Android
// 'sonar.android.lint.reportPaths': 'build/reports/lint-results.xml', // Ruta al informe de análisis de Lint de Android

// 'sonar.projectName': 'Mi Proyecto Android', // Nombre del proyecto en SonarQube (obsoleto)
// 'sonar.projectVersion': '1.0', // Versión del proyecto (obsoleto)
// 'sonar.projectDescription': 'Descripción del proyecto', // Descripción del proyecto (obsoleto)

// Enlaces de proyecto
// 'sonar.links.homepage': 'http://mi-proyecto.com', // URL de la página principal del proyecto (obsoleto)
// 'sonar.links.ci': 'http://ci.mi-proyecto.com', // URL de la integración continua (obsoleto)
// 'sonar.links.issue': 'http://issues.mi-proyecto.com', // URL de la gestión de incidencias (obsoleto)
// 'sonar.links.scm': 'http://scm.mi-proyecto.com', // URL del control de versiones (obsoleto)

// Exclusiones
// 'sonar.exclusions': 'src/**/*.xml,**/*.gradle', // Archivos que deben ser excluidos del análisis (obsoleto)
// 'sonar.coverage.exclusions': 'src/**/*.spec.ts,src/**/*.test.js', // Archivos de prueba excluidos del análisis de cobertura (obsoleto)

// Java
// 'sonar.java.binaries': 'build/classes
