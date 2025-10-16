# Sudoku con JavaScript Vanilla

Un juego de Sudoku interactivo y dinámico construido con JavaScript moderno (ES6+), HTML y CSS, sin necesidad de librerías o frameworks externos.

## Descripción

Este proyecto implementa un juego de Sudoku de 9x9 completamente funcional. El objetivo era construir una aplicación web modular y bien estructurada, separando la lógica del juego, el manejo de datos y la interfaz de usuario.

La aplicación carga puzles de forma asíncrona y genera el tablero y los controles dinámicamente. El usuario puede cambiar la dificultad, recibir validación instantánea de sus respuestas y reiniciar el tablero en cualquier momento.

## Características

* **Tablero Dinámico:** El tablero de 9x9 y todos los controles se generan completamente con JavaScript.
* **Niveles de Dificultad:** Elige entre los modos "Fácil", "Medio" y "Difícil" para cargar un nuevo puzle.
* **Validación en Tiempo Real:** Los números introducidos se validan contra la solución al instante (verde si es correcto, rojo si es incorrecto).
* **Selección de Celda Avanzada:** Al seleccionar una celda, toda su fila y columna se resaltan para ayudar a resolver el puzle.
* **Controles Numéricos:** Un panel de botones permite introducir y borrar números en la celda seleccionada.
* **Botón de Reinicio:** Un botón "Reset" permite limpiar el tablero y volver a empezar el puzle actual.
* **Arquitectura Modular (ES6):** El código está organizado en módulos para una mejor separación de responsabilidades y mantenibilidad.

## Estructura del Proyecto

```plaintext
.
├── index.html
├── README.md
├── public/
│   └── assets/
│       ├── css/
│       │   └── style.css
│       └── js/
│           ├── game.js       # Script principal que inicializa el juego
│           └── script.js
└── src/
    ├── controllers/
    │   └── puzzleController.js # Lógica para obtener los puzles
    ├── data/
    │   └── puzzle.json         # Almacén de los puzles y soluciones
    ├── services/
    │   └── dataService.js      # Servicio para cargar datos del JSON
    └── ui/
        ├── board.js          # Módulo para crear y gestionar el tablero
        └── controlls.js      # Módulo para crear y gestionar los controles
```

## Tecnologías Utilizadas

* **HTML5:** Para la estructura semántica del contenido.
* **CSS3:** Para el diseño y la apariencia visual.
* **JavaScript (ES6+):** Para toda la lógica del juego, utilizando módulos (`import`/`export`) y funciones asíncronas (`async`/`await`).

## Cómo Jugar

Simplemente abre el archivo `index.html` en tu navegador web.

## 💡 Aprendizajes Clave

Durante el desarrollo de este proyecto, se reforzaron y aprendieron varios conceptos importantes:

* **Arquitectura Modular:** La refactorización del código a un sistema de módulos (UI, controladores, servicios) fue clave para desacoplar la aplicación. Esto demuestra la importancia de la **Separación de Responsabilidades**, donde cada archivo tiene un único propósito, haciendo el código más limpio, mantenible y escalable.
* **Gestión Compleja de Eventos:**
  * Los elementos no interactivos como `<div>` no reciben eventos `focus` o `blur` a menos que se les añada el atributo `tabindex`.
  * Cómo el evento `mousedown` y `event.preventDefault()` son cruciales para evitar que un elemento (como un botón) "robe" el foco de otro (la celda seleccionada).
* **Manejo de Estado:** La importancia de usar una variable (`selectedCell`) para mantener el estado de la celda activa, simplificando la lógica en los listeners.
* **Manipulación Asíncrona del DOM:** Cargar datos de un JSON de forma asíncrona y luego generar dinámicamente el tablero y los controles una vez que los datos están disponibles.
