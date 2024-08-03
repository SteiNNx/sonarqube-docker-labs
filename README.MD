# SonarQube Integration for Android Studio

## Overview

SonarQube es una herramienta de código abierto que inspecciona la calidad del código mediante análisis estático, ayudando a identificar errores, vulnerabilidades y a mejorar la calidad general del código.

Este documento proporciona instrucciones detalladas sobre cómo configurar SonarQube en Docker y cómo integrarlo con un proyecto Android en Android Studio, además de cómo utilizar `sonarqube-scanner` para un análisis más profundo.

## Tabla de Contenidos

- [SonarQube Integration for Android Studio](#sonarqube-integration-for-android-studio)
  - [Overview](#overview)
  - [Tabla de Contenidos](#tabla-de-contenidos)
  - [Requisitos Previos](#requisitos-previos)
  - [Configuración de SonarQube con Docker](#configuración-de-sonarqube-con-docker)
    - [SonarQube con Android Studio](#sonarqube-con-android-studio)
    - [SonarQube con Node.js](#sonarqube-con-nodejs)

## Requisitos Previos

- Docker y Docker Compose instalados.
- Android Studio instalado con tu proyecto Android configurado.
- Node.js y npm instalados para el escáner de SonarQube.
- Conexión a Internet para descargar las imágenes de Docker y los plugins necesarios.

## Configuración de SonarQube con Docker

1. Clona o descarga este repositorio.
2. Navega al directorio que contiene el archivo `docker-compose.yml`.
3. Ejecuta el siguiente comando para iniciar SonarQube:

    ```bash
    docker-compose up -d
    ```

4. Abre tu navegador web y ve a [http://localhost:9000](http://localhost:9000).
5. Inicia sesión con las credenciales predeterminadas:
    - **Username**: `admin`
    - **Password**: `admin`
6. Cambia la contraseña en el primer inicio de sesión. Asegúrate de recordar la nueva contraseña.
7. Ve a [http://localhost:9000](http://localhost:9000) e inicia sesión.
8. Navega a **My Account > Security** y genera un nuevo token.
9. Guarda el token en un lugar seguro, lo necesitarás para la configuración.

### SonarQube con Android Studio

1. Abre el archivo `build.gradle` del módulo (`app`) en Android Studio.
2. Añade el plugin de SonarQube y configura las propiedades necesarias:

    ```groovy
    plugins {
        id "org.sonarqube" version "4.4.1.3373"
    }

    sonarqube {
        properties {
            property "sonar.projectKey", "projectKey"
            property "sonar.host.url", "http://localhost:9000"
            property "sonar.login", "<sqp_tu_token_aqui>" // Reemplaza con tu token
            property "sonar.sourceEncoding", "UTF-8"
            property "sonar.java.binaries", "build/intermediates/javac/debug/classes"
            property "sonar.sources", "src/main/java"
        }
    }
    ```

    Reemplaza `"projectKey"` con la clave de tu proyecto y `"<sqp_tu_token_aqui>"` con el token generado.

### SonarQube con Node.js

1. Instalar las dependencias.
    ```bash
    npm install
    ```
2. Instalar las dependencias.
    ```bash
    node scripts/index.js [projectKey] [token] [sourcePath] [projectType] [serverUrl]
    ```

> [!CAUTION]
> Importante: solo se puede analizar codigo de ./code/src, los test indicar ./code/coverage.

---

Este README proporciona una guía completa para configurar e integrar SonarQube con un proyecto Android en Android Studio, incluyendo el uso del escáner de SonarQube con Node.js y Docker para un análisis profundo. Asegúrate de ajustar los nombres de proyecto, URL
