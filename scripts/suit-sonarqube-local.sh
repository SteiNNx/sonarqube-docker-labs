#!/bin/bash
# suit-sonarqube-local.sh
# 
# Descripción: Este script inicia todo un entorno de SonarQube utilizando Docker Compose. 
# Proporciona una forma automatizada de levantar los contenedores necesarios para SonarQube,
# asegurando que todos los servicios estén correctamente configurados y funcionando.
#
# Autor: Jorge Reyes
#
# Instrucciones:
# 1. Asegúrate de tener Docker y Docker Compose instalados en tu sistema.
# 2. Configura las variables de entorno necesarias en un archivo .env.
# 3. Ejecuta este script para iniciar el entorno SonarQube.
#

# Incluir funciones de utilidad
source scripts/command/main.sh

# Inicializar los contenedores de SonarQube
init_sonar_suite_containers() {
    init_docker_containers \
        "${SONAR_SUITE_PROJECT_NAME}" \
        "./scripts/docker/docker-compose-sonar-server.yml" \
        "$1" \
        "SonarQube Iniciado." \
        "No se pudo iniciar SonarQube. Verifica el archivo docker-compose."
}

# Función principal
main() {
    validate_environment
    source_env_vars ".env"
    init_sonar_suite_containers "$1"
}

# Ejecutar función principal
main "$@"
