#!/bin/bash

# Autor: Jorge Reyes
# Descripción: Script para ejecutar `node src/index.js` con parámetros obtenidos del archivo `code/sonar-project.properties`.

# Incluir funciones de utilidad
source scripts/command/main.sh

# Función para leer un valor de una línea en el archivo de propiedades
get_property_value() {
    local property_file="$1"
    local property_name="$2"
    grep "^$property_name=" "$property_file" | cut -d'=' -f2
}

# Función para validar una variable no vacía
validate_var() {
    local var="$1"
    local var_name="$2"
    if [ -z "$var" ]; then
        critical_error "Error: El valor de $var_name no puede estar vacío."
        exit 1
    fi
}

# Función para solicitar una propiedad al usuario
prompt_for_property() {
    local prompt_message="$1"
    local property_var_name="$2"

    read -p "$prompt_message" "$property_var_name"
}

# Función para solicitar todas las propiedades del usuario
prompt_for_properties() {
    prompt_for_property "Introduce el project_key: " project_key
    prompt_for_property "Introduce el projectName: " project_name
    prompt_for_property "Introduce el token: " token
    prompt_for_property "Introduce el project_type: " project_type
}

# Función para validar todas las propiedades
validate_properties() {
    validate_var "$project_key" "project_key"
    validate_var "$project_name" "projectName"
    validate_var "$token" "token"
    validate_var "$project_type" "project_type"
}

# Función para ejecutar el comando `node src/index.js`
execute_command() {
    local project_key="$1"
    local project_name="$2"
    local token="$3"
    local project_type="$4"

    info "Ejecutando: node index.js \"$project_key\" \"$project_name\" \"$token\" \"$project_type\""
    node index.js "$project_key" "$project_name" "$token" "$project_type"
}

# Función para mostrar información de depuración
debug_info() {
    echo "### Configuración bash"
    echo "## projectKey        : $project_key"
    echo "## projectName       : $project_name"
    echo "## token             : $token"
    echo "## projectLanguaje   : $project_type"
}

# Función para mostrar el mensaje de ayuda
show_help() {
    node index.js --help
    exit 0
}


# Función principal
main() {
    # Carga variables de entorno
    source_env_vars ".env"

    # Si se pasa el argumento --help, mostrar el mensaje de ayuda
    if [[ "$1" == "--help" ]]; then
        show_help
    fi

    # Solicitar y validar propiedades
    prompt_for_properties
    validate_properties

    # Mostrar información de depuración
    debug_info

    # Ejecutar el comando con los parámetros obtenidos
    execute_command "$project_key" "$project_name" "$token" "$project_type"
}

# Ejecutar función principal
main "$@"
