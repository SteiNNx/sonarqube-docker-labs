#!/bin/bash
# evaluate-code.sh
# Autor: Jorge Reyes

# Carga funciones de utilidad
source scripts/command/main.sh

# Valida que una variable no esté vacía
validate_var() {
    if [ -z "$1" ]; then
        critical_error "Error: $2 no puede estar vacío."
        exit 1
    fi
}

# Solicita al usuario un valor y lo asigna a una variable
prompt_for_property() {
    read -p "$1: " "$2"
}

# Recopila y valida la entrada del usuario para todas las propiedades
collect_and_validate_properties() {
    for prop in project_key project_name token project_type; do
        prompt_for_property "Ingresa $prop" "$prop"
        validate_var "${!prop}" "$prop"
    done
}

# Ejecuta el análisis de SonarQube usando el script de Node.js
start_sonarqube_analysis() {
    info "Ejecutando: node src/index.js $@"
    node src/index.js "$@"
}

# Muestra información de depuración
debug_info() {
    echo "### Configuración de Bash"
    for prop in project_key project_name token project_type; do
        echo "## $prop: ${!prop}"
    done
}

# Muestra el mensaje de ayuda usando el script de Node.js
show_help() {
    node src/index.js --help
    exit 0
}

# Inicia Checkmarx usando Docker Compose
start_checkmarx_analysis() {
    init_docker_containers "${CHECKMARX_SUITE_PROJECT_NAME}" \
        "./scripts/docker/docker-compose-checkmarx-server.yml" \
        "$1" \
        "Checkmarx iniciado." \
        "No se pudo iniciar Checkmarx. Verifica el archivo docker-compose."
}

# Función principal
main() {
    # Carga las variables de entorno
    source_env_vars ".env"

    # Muestra ayuda si se solicita
    [[ "$1" == "--help" ]] && show_help

    # Recopila, valida y muestra información de las propiedades
    collect_and_validate_properties
    debug_info

    # Inicia y ejecuta el análisis de CheckMarx
    start_checkmarx_analysis
    # Inicia y ejecuta el análisis de SonarQube
    start_sonarqube_analysis "$project_key" "$project_name" "$token" "$project_type"
}

# Ejecuta la función principal
main "$@"
