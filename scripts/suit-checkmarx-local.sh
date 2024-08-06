#!/bin/bash
# suit-checkmarx-local.sh
# 
# Descripción: Este script inicia todo un entorno de Checkmarx utilizando Docker Compose.
# Proporciona una forma automatizada de levantar los contenedores necesarios para Checkmarx,
# asegurando que todos los servicios estén correctamente configurados y funcionando.
#
# Autor: Jorge Reyes
#
# Instrucciones:
# 1. Asegúrate de tener Docker y Docker Compose instalados en tu sistema.
# 2. Configura las variables de entorno necesarias en un archivo .env.
# 3. Ejecuta este script para iniciar entorno de Checkmarx.
#

# Incluir funciones de utilidad
source scripts/command/main.sh

# Inicializar los contenedores de Checkmarx
init_checkmarx_suite_containers() {
    init_docker_containers \
        "${CHECKMARX_SUITE_PROJECT_NAME}" \
        "./scripts/docker/docker-compose-checkmarx-server.yml" \
        "$1" \
        "Checkmarx Iniciado." \
        "No se pudo iniciar Checkmarx. Verifica el archivo docker-compose."
}

# Función principal
main() {
    validate_environment
    source_env_vars ".env"
    init_checkmarx_suite_containers "$1"
}

# Ejecutar función principal
main "$@"
