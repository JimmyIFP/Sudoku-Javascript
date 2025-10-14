# Juego de Sudoku con JavaScript

Un juego de Sudoku interactivo y responsive construido con HTML, CSS y JavaScript puro (Vanilla), sin dependencias de librerías o frameworks externos.

## Descripción

Este proyecto es una implementación completa de un juego de Sudoku de 9x9. El tablero se genera dinámicamente y permite al usuario introducir números, validarlos en tiempo real y cambiar la dificultad. El objetivo principal era practicar la manipulación avanzada del DOM, la gestión de eventos y la lógica de algoritmos de backtracking en JavaScript.

## Características Principales

- **Generación Dinámica del Tablero**: El tablero de 9x9 y los controles se crean íntegramente con JavaScript.
- **Algoritmo de Backtracking**: Se utiliza un solucionador recursivo para generar tableros de Sudoku válidos y completos desde cero.
- **Niveles de Dificultad**: Elige entre los modos **Fácil**, **Medio** y **Difícil**, que eliminan un número creciente de celdas para aumentar el reto.
- **Selección de Celda Interactiva**:
  - Haz clic en una celda para seleccionarla.
  - La celda activa, su fila y su columna se resaltan para facilitar la colocación de números.
- **Validación en Tiempo Real**:
  - Los números introducidos se comprueban contra la solución.
  - Se colorean de **verde** si son correctos y de **rojo** si son incorrectos.
- **Controles Intuitivos**:
  - Un panel de botones numéricos permite introducir y borrar números en la celda seleccionada.
  - Un botón de **Reset** limpia el tablero para empezar de nuevo.
- **Diseño Responsive**: La interfaz se adapta a diferentes tamaños de pantalla gracias a un diseño fluido con CSS.

## ¿Cómo Jugar?

1. Abre el archivo `index.html` en tu navegador.
2. Selecciona un nivel de dificultad (por defecto es "Medio").
3. Haz clic en una celda vacía para seleccionarla.
4. Usa los botones numéricos de la parte inferior para introducir un número en la celda.
5. Si el número es correcto, se pondrá verde. Si es incorrecto, se pondrá rojo.
6. Para borrar un número, selecciónalo y pulsa el mismo botón numérico de nuevo.
7. Completa el tablero para ganar.

## Estructura del Proyecto

```plaintext
/
├── index.html
├── README.md
└── assets/
    ├── css/
    │   └── style.css
    └── js/
        ├── boardMaker.js
        └── script.js
```

## Tecnologías Utilizadas

- **HTML5**: Para la estructura semántica del contenido.
- **CSS3**: Para el diseño, el layout (Flexbox y Grid) y la apariencia visual.
- **JavaScript (ES6+)**: Para toda la lógica del juego, la manipulación del DOM y la generación del tablero.

## Resumen del Código

El proyecto está dividido en dos archivos principales de JavaScript para separar responsabilidades:

### `assets/js/boardMaker.js`

Este archivo se encarga de la lógica de "backend" del Sudoku.

- **`createSudoku()`**: Genera un tablero de Sudoku completo y resuelto. Utiliza el algoritmo `solve()` para lograrlo.
- **`solve(board)`**: Es el corazón del generador. Implementa un algoritmo de **backtracking** recursivo que encuentra una solución válida para un tablero vacío. Para asegurar que cada Sudoku sea diferente, los números del 1 al 9 se intentan en un orden aleatorio.
- **`createPlayable(board, difficulty)`**: Toma un tablero resuelto y elimina un número de celdas según la dificultad elegida para crear el tablero con el que el usuario jugará.
- **`isValid(board, num, pos)`**: Una función de ayuda que comprueba si un número puede ser colocado en una posición específica sin violar las reglas del Sudoku (fila, columna y cuadrante 3x3).

### `assets/js/script.js`

Este archivo gestiona la interfaz de usuario y la interacción del jugador.

- **`createBoard()`**: Dibuja el tablero en el DOM, asignando a cada celda sus clases, IDs y listeners de eventos.
- **`addListenersToCell(cell)`**: Añade listeners `focus` y `blur` a las celdas. Cuando una celda es seleccionada, se guarda en la variable global `selectedCell` y se resalta su fila y columna.
- **`createNumberButtons()`**: Crea los botones numéricos y les asigna listeners que permiten al usuario rellenar la celda seleccionada.
- **`checkPlay()`**: Compara el número introducido por el usuario con la solución almacenada en `boardSolution` y actualiza el color del texto en consecuencia.
- **`createModeButtons()` y `createResetButton()`**: Crean los botones de dificultad y reseteo, que permiten generar nuevos tableros o limpiar el actual.

## El Algoritmo de Backtracking

### ¿Qué es el Backtracking?

El backtracking (o vuelta atrás) es una técnica algorítmica para resolver problemas de manera recursiva probando incrementalmente todas las posibles soluciones y abandonando cada solución parcial tan pronto como se determina que no puede conducir a una solución final.

Imagina que estás en un laberinto. Llegas a una bifurcación y eliges un camino. Sigues ese camino y, si llegas a un callejón sin salida, retrocedes (haces "backtrack") hasta la última bifurcación y tomas el otro camino. Repites este proceso hasta que encuentras la salida.

Esta es exactamente la estrategia que se usa para generar el Sudoku.

### ¿Cómo se Utilizó en este Proyecto?

El algoritmo de backtracking es el motor detrás de la generación de tableros en `boardMaker.js`, específicamente en la función `solve(board)`.

El proceso es el siguiente:

1. **Encontrar un Vacío**: El algoritmo busca la primera celda vacía en el tablero. Si no hay ninguna, ¡el tablero está resuelto!
2. **Probar un Número**: Intenta colocar un número del 1 al 9 en esa celda vacía. Para asegurar que cada Sudoku sea único, los números se prueban en un orden aleatorio.
3. **Validar el Movimiento**: Antes de colocar el número, comprueba si es un movimiento válido (usando la función `isValid`):
    - ¿El número ya existe en la misma fila?
    - ¿El número ya existe en la misma columna?
    - ¿El número ya existe en el mismo cuadrante de 3x3?
4. **Llamada Recursiva**: Si el número es válido, el algoritmo se llama a sí mismo (`solve(board)`) para continuar resolviendo el resto del tablero con este nuevo número en su lugar.
5. **¡Éxito o Fracaso!**:
    - Si la llamada recursiva devuelve `true` (lo que significa que encontró una solución completa), el algoritmo sigue devolviendo `true` hasta el final.
    - Si la llamada recursiva devuelve `false` (llegó a un "callejón sin salida"), significa que el número que colocamos antes impide una solución.
6. **El "Backtrack"**: En caso de fracaso, el algoritmo deshace el último movimiento (vuelve a poner la celda a 0) y prueba con el siguiente número disponible. Si ningún número funciona en esa celda, devuelve `false` para que la llamada anterior en la pila de recursión sepa que debe retroceder.

### ¿Por Qué es la Mejor Solución Aquí?

El backtracking es ideal para problemas como el Sudoku por varias razones:

- **Búsqueda Exhaustiva Garantizada**: Explora sistemáticamente todas las combinaciones posibles, por lo que tiene la garantía de encontrar una solución si existe.
- **Eficiencia**: Aunque puede parecer un método de "fuerza bruta", es mucho más inteligente. Poda (corta) ramas enteras del árbol de búsqueda en cuanto detecta que un camino no es válido, ahorrando una cantidad masiva de cálculos.
- **Simplicidad de Implementación**: A pesar de ser un concepto potente, su implementación recursiva es relativamente elegante y concisa, como se puede ver en la función `solve`.

## Instalación y Uso

No se necesita ninguna instalación. Simplemente clona o descarga el repositorio y abre el archivo `index.html` en cualquier navegador web moderno.

```bash
git clone https://github.com/tu-usuario/Jimmy-Sudoku.git
cd Jimmy-Sudoku
# Abre index.html en tu navegador
```
