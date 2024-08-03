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

# Función para validar el token
validate_var() {
    local token="$1"
    if [ -z "$token" ]; then
        critical_error "Error: El token no puede estar vacío."
    fi
}

# Función para ejecutar el comando `node index.js`
execute_command() {
    local project_key="$1"
    local token="$2"
    local source_path="$3"
    local project_type="$4"

    info "Ejecutando: node index.js \"$project_key\" \"$token\" \"$source_path\" \"$project_type\""
    node index.js "$project_key" "$token" "$source_path" "$project_type"
}

# Función principal
main() {
    source_env_vars ".env"

    # Solicitar al usuario properties
    read -p "Introduce el project_key: " project_key
    read -p "Introduce el token: " token
    read -p "Introduce el source_path: " source_path
    read -p "Introduce el project_type: " project_type

    # Validar el token
    validate_var "$project_key"
    validate_var "$token"
    validate_var "$source_path"
    validate_var "$project_type"

    # Ejecutar el comando con los parámetros obtenidos
    execute_command "$project_key" "$token" "$source_path" "$project_type"
}

# Ejecutar función principal
main "$@"
