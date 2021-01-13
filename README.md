Intro

  Langston's ant is an automaton that functions in a 2D grid where the cells of the grid can 
  be either black or white. The ant is arbitrarily assigned a cell and then moves based
  on a simple set of rules:

    o- If the ant is in a white cell, the ant turns right, the cell's color is flipped,
       and the ant moves forward one cell. 
    o- If the ant is in a black cell, the ant turns left, the cell's color is flipped
       and the ant moves forward one cell. 

  This program draws graphics to simulate the behavior of Turk and Propp's ant,
  an extension to Langton's ant. Instead of using just two colors, this extension uses
  multiple colors. This program will use these colors in this order: black, red, yellow, blue, and green.
  When a cell's color is changed, it will increment to the next color on the list.
  For instance, when the ant is in a black cell, the cell's color will increment to red.
  Additionally, if the cell's color is green, incrementing its color will loop back to black.
  The ant will turn left in black, yellow, and green cells and turn right in red and blue cells.
  
  This program uses HTML, JavaScript, and the p5.js library.

Setup and Installaltion 

  1. Extract the .zip file

  2. Open tp_ant.html, with a web browser.
     The program should start immediately.

Credits

  Starter code provided by Charles Siska.
