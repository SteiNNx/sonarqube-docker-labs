#!/bin/bash
# suit-sonarqube-local.sh
# Autor: Jorge Reyes

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
