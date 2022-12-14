s=8
cx=0
cy=0
mapa=0
colors=90


function reset_board() {
  for (var i = 0; i < cx; i++) {
    for (var j = 0; j < cy; j++) {
      //sm(i,j,0)
      mapa[i][j]=0
      r=int(random(colors))
      mapa[i][j]=(360*r)/colors
   }
  }
}
function setup() {
  colorMode(HSB)
  
  //slider.style('width', '80px');

  createCanvas(400, 400);
  createP("lower bound")
  createP("randomness point")
  createP("upper bound")
  createP("color tolerance")
  createP("number of colors --------------------------- resets board")
  leftt=120
  lb = createSlider(1, 25, 10);
  lb.position(leftt, 15+height);
  randomness_point = createSlider(1, 25, 13);
  randomness_point.position(leftt, 50+height);
  // randomness slider
  hb = createSlider(1, 25, 24);
  hb.position(leftt, 85+height);
  tolerance = createSlider(0, 30, 5);
  tolerance.position(leftt, 120+height);
  ncolors = createSlider(1, 360, 90);
  ncolors.position(leftt, 155+height);
  button = createButton('RESET_BOARD');
  button.position(width-115, height);
  button.mousePressed(reset_board);
  let col = color(0, 100, 100);
  button2 = createButton('FULL RESET');
  button2.position(296, height+25);
  button2.style('background-color', col);
  button2.mousePressed(full_reset);
  cx=width/s
  cy=height/s
  mapa= new Array(cx);
  //frameRate(120);
  noStroke()

  for (var i = 0; i < cx; i++) {
      mapa[i] = new Array(cy);
  }
  
  reset_board()
}

function defaults() {
  tolerance.value(5)
  ncolors.value(90)
  lb.value(5)
  randomness_point.value(13)
  hb.value(24)
  
}
function full_reset(){
  defaults()
  reset_board()
}


function gm(x,y) {
  return mapa[(x+cx)%cx][(y+cy)%cy]
}

function sm(x, y, value) {
  mapa[(x+cx)%cx][(y+cy)%cy]=value
}

function diff(a,b) {
  if (a<b) {
    a,b=b,a
  }
  return min(b-a,(a+360)-b)
}
function deduce(i,j) {
  // returns new color based on neighbours
  sames=0
  di=2
  t=tolerance.value()
  for(x=-di; x <=di;++x){
    for(y=-di; y<=di;++y) {
      c=gm(i+x,j+y)
      if(diff(c,gm(i,j))<t){//abs(c-gm(i,j)<tolerance.value())){
        ++sames
      }
    }
  }
  if(sames > hb.value()) {
    mapa[i][j]=(mapa[i][j]+(360/colors))%360
  }
  if(sames == 13 && random(1)<0.7) {
    mapa[i][j]=(360*int(random(colors)))/colors
  }
  
  if(sames < lb.value()) {
    mapa[i][j]=((mapa[i][j]+360)-(360/colors))%360
    //mapa[i][j]=(360*int(random(colors)))/colors
  }
}
let ii=0;
function draw() {
  ii++;
  background(0,0,0);
  if(ncolors.value()!=colors & ii%60==0) {
    colors=ncolors.value()
    reset_board()
  }
  ////////////////////////////////
  // IMPORTANT CONSOLE LOG
  ////////////////////////////////////
  //console.log(tolerance.value(),lb.value(), hb.value())
  for (let x=0; x<width; x+=s) {
    for (let y=0; y<width; y+=s) {
      i=x/s
      j=y/s
      deduce(i,j)
      fill(mapa[i][j],100,101)
      circle(x+s/2,y+s/2, s-1)
    }
  }
}