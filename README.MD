
# SonarQube Docker Labs

- [SonarQube Docker Labs](#sonarqube-docker-labs)
  - [Requisitos Previos](#requisitos-previos)
  - [Configuración de SonarQube con Docker](#configuración-de-sonarqube-con-docker)
  - [Evaluar Código](#evaluar-código)

## Requisitos Previos

Antes de comenzar, asegúrate de tener los siguientes elementos instalados:

- Docker y Docker Compose
- Node.js y npm (necesarios para el escáner de SonarQube)
- Conexión a Internet (para descargar las imágenes de Docker y los plugins necesarios)

## Configuración de SonarQube con Docker

Para configurar y ejecutar el entorno local de SonarQube, sigue los pasos a continuación:

1. **Iniciar Docker:** Asegúrate de que Docker esté en ejecución.

2. **Ejecutar el script de configuración:**

   Para la primera ejecución o cuando necesites recrear el entorno, utiliza el siguiente comando:

   ```shell
   sh scripts/suit-sonarqube-local.sh --build  # Primera vez o para recrear el entorno
   ```

   Para iniciar SonarQube en ejecuciones posteriores, simplemente usa:

   ```shell
   sh scripts/suit-sonarqube-local.sh          # Ejecuciones posteriores
   ```

3. **Esperar el inicio:** El proceso puede tardar unos minutos. Puedes verificar el progreso revisando los logs en Docker Desktop.

## Evaluar Código

Para evaluar tu código con SonarQube, sigue estos pasos:

1. **Modificar el archivo `.gitattribute`:**

   Edita el archivo [.gitattribute](.gitattribute) y elimina o ajusta las siguientes líneas para incluir la ubicación de tu carpeta de código:

   ```text
   ./code/**
   /code/**
   /.code/**
   code/**
   ```

2. **Generar el token de SonarQube:** Asegúrate de tener un token generado para la evaluación.

3. **Ejecutar el script de evaluación:**

   Usa el siguiente comando para iniciar la evaluación de tu código:

   ```bash
   sh scripts/evaluate-code.sh
   ```
