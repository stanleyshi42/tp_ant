// Stanley Shi; 9/15/2020

// Make global g_canvas JS 'object': a key-value 'dictionary'.
var g_canvas = { cell_size:20, wid:41, hgt:41 }; // JS Global var, w canvas size info.
var g_frame_cnt = 0; // Setup a P5 display-frame counter, to do anim
var g_frame_mod = 1; // Update every 'mod' frames.

function setup() // P5 Setup Function
{
    let sz = g_canvas.cell_size;
    let width = sz * g_canvas.wid;  // Our 'canvas' uses cells of given size, not 1x1 pixels.
    let height = sz * g_canvas.hgt;
    createCanvas( width, height );  // Make a P5 canvas.
    draw_grid( 20, 0, 'white', 'red' );
}

var g_bot = { dir:0, x:20, y:20, color:"black" }; // Dir is 0..3 clockwise, 0 is up.
var g_box = { t:1, hgt:41, l:1, wid:41 }; // Cells in which the bot can occupy.

function move_bot( )
{
	let sz = g_canvas.cell_size;
    let color = get(g_bot.x * sz + sz / 2, g_bot.y * sz + sz / 2); // Get cell's interior pixel color [RGBA] array.
    // Determine color from RGB values
    if (color[0] == 0   && color[1] == 0   && color [2] == 0) {color = "black";} else
    if (color[0] == 255 && color[1] == 0   && color [2] == 0) {color = "red";} else
    if (color[0] == 255 && color[1] == 255 && color [2] == 0) {color = "yellow";} else
    if (color[0] == 0   && color[1] == 0   && color [2] == 255) {color = "blue";}
    else {color = "green";}

    let dir = g_bot.dir;
    let dx = 0;
    let dy = 0;
    switch (color) { // Turn bot's direction based on current color: turn counter-clockwise for Black, Yellow, or Green, else turn clockwise
      case "black" :  { dir--; break; }
      case "red" :    { dir++; break; }
      case "yellow" : { dir--; break; }
      case "blue" :   { dir++; break; }
      case "green" :  { dir--; break; }
    }
    // Adjust dir value if it overflows or underflows our direction values: 0=Up, 1=Right, 2=Down, 3=Left
    if(dir > 3) {dir = 0;}
    else if(dir < 0) {dir = 3;}

    switch (color) { // "Increment" current color: Black -> Red -> Yellow -> Blue -> Green -> Black (loop back)
      case "black" :  { color = "red"; break; } 
      case "red" :    { color = "yellow"; break; } 
      case "yellow" : { color = "blue"; break; } 
      case "blue" :   { color = "green"; break; } 
      case "green" :  { color = "black"; break; } 
    }
    
    switch (dir) { // Convert dir to x,y deltas: dir = 0=Up, 1=Right, 2=Down, 3=Left.
      case 0 : {          dy = -1; break; }
      case 1 : { dx = 1;           break; }
      case 2 : {          dy = 1;  break; }
      case 3 : { dx = -1;          break; }
    }

    g_bot.color = color;
    g_bot.dir = dir;
    draw_cell(); //Draw current cell before updating coordinates

    let x = (dx + g_bot.x + g_box.wid) % g_box.wid; // Move-x.  Ensure positive b4 mod.
    let y = (dy + g_bot.y + g_box.hgt) % g_box.hgt; // Ditto y.
    g_bot.x = x; // Update bot's x.
    g_bot.y = y;
    //console.log( "bot x,y,dir,clr = " + x + "," + y + "," + dir + "," +  color );
}

function draw_cell() // Convert bot pos to grid pos & draw cell.
{
    let sz = g_canvas.cell_size;
    let x = 1 + g_bot.x*sz; // Set x one pixel inside the sz-by-sz cell.
    let y = 1 + g_bot.y*sz;
    let big = sz - 1; // Stay inside cell walls.
    fill( g_bot.color ); // Fill 'color': its a keystring, or a hexstring like "#5F", etc.  See P5 docs.
    //console.log( "x,y,big = " + x + "," + y + "," + big );
    rect( x, y, big, big ); // Paint the cell.
}

function draw_update()  // Update our display.
{
    //console.log( "g_frame_cnt = " + g_frame_cnt );
    move_bot();
}

function draw()  // P5 Frame Re-draw Fcn, Called for Every Frame.
{
    ++g_frame_cnt;
    if (0 == g_frame_cnt % g_frame_mod)
    {
        draw_update();
   	 }	
}