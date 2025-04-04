
// Sound Variable

var fft //stores the fast fourier transform (converts signal into frequncies)

//main blue color(20, 200, 245);
let rCol = 20
let gCol = 200
let bCol = 245

//Arc Rotation Variables//

//Set Angle
let lAngle = 0

// Outer Angle
let oAngle = 1
let oAngle2 = 1
let oAngle3 = 1

// Middle Angle
let mAngle = 1
let mAngle2 = 1
let mAngle3 = 1

// Inner Angle
let iAngle = 1
let iAngle2 = 1
let iAngle3 = 1

// Font
let font

//Rectangle Variables//////

//Rectangle for "changeMood" Vars
let rectXSize = 450
let rectYSize = 50
let rectX = 300
let rectY = 454.5454545

//Rectangle for "playP" Vars
let rectXSize2 = 350
let rectYSize2 = 50
let rectX2 = 300
let rectY2 = 60

//Arc Variable Size
let arcI = 30
let arcI2 = 30

let arcIM = 50
let arcIM2 = 50

let arcOM = 100
let arcOM2 = 100

//Song Background Colors//

//Song 3
let song3R = 246
let song3G = 166
let song3B = 192

function setup() {
  createCanvas(600, 500);
  
  fft = new p5.FFT() // will analyze the sound wave at the specific time and give variables
  

  angleMode(DEGREES);
  ellipseMode(CENTER);
  rectMode(CENTER);
  imageMode(CENTER);

}

function preload(){
  
  playP = loadImage("play-pause.png");
  eye = loadImage("eye.png");
  song = loadSound('song2.mp3');
  song2 = loadSound('Funk.mp3');
  song3 = loadSound('rosewater.mp3')
  font = loadFont('glitch.ttf');
  
}

function draw() {

  
  
  //sets how waveform is analyzed and then creates the amplitude as a variable to be used
  fft.analyze();
  amp = fft.getEnergy(20,200);
  
  backGroundChng();
  
  backGMove();
  
  changeSel();//Rect Shape is called
  
  playRect();
  
  changeCol();//change color key press
  
  songVis();//Inner Circle Visualizer
  
  songVis2();//Outer Circle Visualizer
  
  songVisLine();//Line Visualizer
  
  arcAnimate();

  songChoice();
  
}

function backGMove (){
  
  eye.resize(500, 0);
  
  
  
  push();
  translate( width/1.8, height/1.9)
  if (amp > 230){
    rotate(random(-1, 1));
  }
  
  image(eye, 0, 0);
  
  pop();
  
}

function backGroundChng(){
  
  if (amp > 230){
    background(random(255));
  }
  else{
    background("white");
  }
}

function changeCol(){
  
  if (keyIsPressed){
    if (key == 'p'){
      rCol = 0;
      gCol = 0;
      bCol = 0;
    }
  }
  
  if (keyIsPressed){
    if (key == 'z'){
      rCol = 183
      gCol = 15
      bCol = 15

    }
  }
  
  if (keyIsPressed){
    if (key == 'x'){
      rCol = 20
      gCol = 200
      bCol = 245
    }
  }
  
  if (keyIsPressed){
    if (key == 'c'){
      rCol = song3R;
      gCol = song3G;
      bCol = song3B;
    }
  }
}

function arcAnimate(){
  
  //Color of Arc Animation
  stroke(rCol, gCol, bCol);
  noFill();
  
  
  //Inner Eye Pupil
  push();
  fill(rCol,gCol,bCol);
  noStroke();
  ellipse(0, height/400, 30);
  pop();
  
  //Inner Arc Animation
  
  push();
  
  stroke("white");
  strokeWeight(2);
  arc(0, 0, arcI + amp, arcI2 + amp, 90 + iAngle, 180 + iAngle);
  
  iAngle += 20 //speed of arc
  
  
  pop();
  
  
  
  //Inner - Mid Arc Animation//
  push();
  
  
  
  push();
  strokeWeight(3);
  arc(0, 0, arcIM + amp, arcIM2 + amp, 90 + mAngle, 180 + mAngle);
  
  mAngle += 5 //speed of arc
  pop();
  
  push();
  strokeWeight(2);
  arc(0, 0, arcIM + amp, arcIM2 + amp, 30 + mAngle2 , 60 + mAngle2);
  
  mAngle2 += 2//speed of arc
  pop();
  
  push();
  strokeWeight(1);
  arc(0, 0, arcIM + amp, arcIM2 + amp, 0 + mAngle3, 40 + mAngle3);
  
  mAngle3 += 20 //speed of arc
  pop();
  
  
  pop();//Animation pop
  
  
  
  //Outer - Mid Arc Animation
  push();
  
  
  push();
  stroke('white');
  strokeWeight(2);
  arc(0, 0, arcOM + amp, arcOM2 + amp, 30 + oAngle, 60 + oAngle);
  oAngle += 20
  pop();
  
  push();
  strokeWeight(2);
  arc(0, 0, arcOM + amp, arcOM2 + amp, 120 + oAngle2, 200 + oAngle2);
  oAngle2 += 8
  pop();
  
  push();
  strokeWeight(3);
  arc(0, 0, arcOM + amp, arcOM2 + amp, 0 + oAngle3, 90 + oAngle3);
  oAngle3 += 1.5
  pop();
  
  
  pop();
  
  
  
  
}

function fontSet(){
  
  //placed in roundRect function
  
  textFont(font);
  textSize(20);
  textAlign(CENTER, CENTER);
  fill('white');
  text('P-Pause | Z-Mood 1 | X-Mood 2 | C-Mood 3', width/2, height/1.11);
  
}

function fontSet2(){
  
  //placed in roundRect function
  
  textFont(font);
  textSize(20);
  textAlign(CENTER, CENTER);
  fill('white');
  text('Click Center to Change Color', width/2, height/9);
  
}

function songVis(){
  stroke (rCol, gCol, bCol);
  noFill();
  
  translate(width/2, height/2)
  
  var wave = fft.waveform()// stores the waveform data
  
  
  //right half of inner circle
  beginShape();
  for (var i = 0; i <= 180; i++){ // starts the drawing of 2 elipses forming a "wave" circle
    var index = floor(map(i, 0, width, 0, wave.length - 1))// flooring creates an integer
    
    var r = map(wave[index], -1, 1, 25, 50);// this is the radius that is set up via 
    
    var x = r * sin(i)
    var y = r * cos(i)
    vertex(x,y); // draws the shape
  }
  endShape();
  
  
  //left half of inner circle
  
  beginShape();
  for (var i = 0; i <= 180; i++){ // starts the drawing of 2 elipses forming a "wave" circle
    var index = floor(map(i, 0, width, 0, wave.length - 1))// flooring creates an integer
    
    var r = map(wave[index], -1, 1, 25, 50);// this is the radius that is set up via 
    
    var x = r * -sin(i)
    var y = r * -cos(i)
    vertex(x,y); // draws the shape
  }
  endShape();
}

function songVis2(){
  stroke (rCol, gCol, bCol);
  noFill();
  
  
  var wave = fft.waveform()// stores the waveform data
  
  beginShape();
  for (var i = 0; i <= 180; i++){ // starts the drawing of 2 elipses forming a "wave" circle
    var index = floor(map(i, 0, width, 0, wave.length - 1))// flooring creates an integer
    
    var r = map(wave[index], -1, 1, 30, 110);// this is the radius that is set up via 
    
    var x = r * sin(i)
    var y = r * cos(i)
    vertex(x,y); // draws the shape
  }
  endShape();
  
  beginShape();
  for (var i = 0; i <= 180; i++){ // starts the drawing of 2 elipses forming a "wave" circle
    var index = floor(map(i, 0, width, 0, wave.length - 1))// flooring creates an integer
    
    var r = map(wave[index], -1, 1, 30, 110);// this is the radius that is set up via 
    
    var x = r * -sin(i)
    var y = r * -cos(i)
    vertex(x,y); // draws the shape
  }
  endShape();
}

function songVisLine(){
  
  push();
  translate(x,y);
  rotate(lAngle);
  lAngle += 1
  
  stroke (rCol, gCol, bCol);
  noFill();
  
  var wave = fft.waveform()// stores the waveform data
  
  beginShape();
  for (var i = 0; i < width/2; i++){ // starts the drawing of waveform line
    var index = floor(map(i, 0, width, 0, wave.length))// flooring creates an integer
    

    
    var x = -i
    var y = wave[index] * 100
    point(x,y); // draws the shape
  }
  endShape();
  
  beginShape();
  for (var i = 0; i < width/2; i++){ // starts the drawing of waveform line
    var index = floor(map(i, 0, width, 0, wave.length))// flooring creates an integer
    

    
    var x = i
    var y = wave[index] * 100
    point(x,y); // draws the shape
  }
  endShape();
  
  pop();
  
}

function changeSel(){
  
  //Main Rectangle (Bottom Rectangle)
  fill(rCol, gCol, bCol);
  rect(rectX, rectY, rectXSize, rectYSize, 10 );
  
  //Rectangle Detailing Border
  push();
  
  noFill();
  stroke('white');
  strokeWeight(3)
  rect(rectX, rectY, 440, 40, 5 );
  
  pop();
  
  fontSet();
  
  
  
}

function playRect(){
  
  //Main Rect
  fill(rCol, gCol, bCol);
  rect(rectX2, rectY2, rectXSize2, rectYSize2, 10 );
  
  push();
  
  noFill();
  stroke('white');
  strokeWeight(3)
  rect(rectX2, rectY2, 340, 40, 5 );
  
  pop();
  
  fontSet2();
  
}

function songChoice(){
  
  if (keyIsPressed){
    
    if (key == 'p'){
      song.stop();
      song2.stop();
      song3.stop();
    }
    
    if(key == 'z'){
      song2.stop();
      song3.stop();
      song.play();
    }
    
    if(key == 'x'){   
      song.stop();
      song3.stop();
      song2.play();
    }
    
    if(key == 'c'){
      song.stop();
      song2.stop();
      song3.play();
    }
  }
  
}

function mouseClicked( ){
  
  //only clickable in the center(pupil)
  if(mouseX <= 320 && mouseX >= 280 && mouseY <= 270 && mouseY >= 230){
      rCol = random(0, 255);
      bCol = random(0, 255);
      gCol = random(0, 255);
  }
}
