const bgcolor = '#63A18F';
const safe = '#263938';
const empty = '#FDEED2';
const bomb = '#ed2846';
const maybeBomb = '#FB9E55';



class Point{
  constructor(x, y){
    this.x = x;
    this.y = y;
  }
}

const CENTERED = true;

const totX = 20;
const totY = 10;
const squareDim = 80; //ciao
const totBomb = 40;
const offset = new Point(100, 100); //if CENTERED===true the value will be overwritten
let squares = [];
let clickedX, clickedY;

//-------------------------------------------------------//setup

function setup()
{
  console.log('ciao');
  textSize(squareDim);
  createCanvas(1920, 1080);
  noStroke();
  frameRate(30);

  if( CENTERED )
  {
    offset.x = (width  - squareDim*totX)/2;
    offset.y = (height - squareDim*totY)/2;
  }

  squares.length = totY;

  for( let i=0; i<squares.length; i++ )
  {
    squares[i] = [];
    squares[i].length = totX;
    for( let j=0; j<squares[i].length; j++ )
      squares[i][j] = new Square(new Point(offset.x+squareDim*j, offset.y+squareDim*i), 0);
  }

  calcType();

  selectOneZeroToStart();
}

//-------------------------------------------------------//draw

function draw()
{

  background(bgcolor);
  for( let i=0; i<totY; i++ )
    for( let j=0; j<totX; j++ )
      squares[i][j].draw();
}

//-------------------------------------------------------//mouse pressed

function mousePressed()
{


  clickedX = floor((mouseX - offset.x)/squareDim);
  clickedY = floor((mouseY - offset.y)/squareDim);

  if( clickedY<0 || clickedY>=totY  ||  clickedX<0 || clickedX>=totX )
    return;

  if( mouseButton === LEFT )
  {
    squares[clickedY][clickedX].clicked();
    if( squares[clickedY][clickedX].type === 0 )
      selectAllSqaresAround(clickedY, clickedX);
  }
  else if ( mouseButton === RIGHT )
  {
    if( squares[clickedY][clickedX].isFound === false )
      squares[clickedY][clickedX].rightClicked();
    else
      selectAllSqaresAround(clickedY, clickedX);
  }

}


function keyPressed(k){
  clickedX = floor((mouseX - offset.x)/squareDim);
  clickedY = floor((mouseY - offset.y)/squareDim);
  console.log(k);
  if( clickedY<0 || clickedY>=totY  ||  clickedX<0 || clickedX>=totX )
    return;

  if( k.key === 'a' )
  {
    squares[clickedY][clickedX].clicked();
    if( squares[clickedY][clickedX].type === 0 )
      selectAllSqaresAround(clickedY, clickedX);
  }
  else if ( k.key === 'd' || k.key === ' ' )
  {
    if( squares[clickedY][clickedX].isFound === false )
      squares[clickedY][clickedX].rightClicked();
    else
      selectAllSqaresAround(clickedY, clickedX);
  }

}
//-------------------------------------------------------//select one zero to start the game without useless randomness

function selectOneZeroToStart()
{
  let rx, ry;
  while(true){
    rx = floor(random(totX));
    ry = floor(random(totY));

    if( squares[ry][rx].type === 0 )
    {
      squares[ry][rx].clicked();
      selectAllSqaresAround(ry, rx);
      return;
    }
  }
}

//-------------------------------------------------------//click all square around and expand if '0'

function selectAllSqaresAround(y, x)
{
  let buff = [];

  for( let i=-1; i<=1; i++ )
        for( let j=-1; j<=1; j++ )
    {
      if(i===0 && j===0)
        continue;
      if( y+i<0 || y+i>=totY  ||  x+j<0 || x+j>=totX )
        continue;


      if( squares[y+i][x+j].type === 0 && squares[y+i][x+j].isFound === false )
        buff.push(new Point(x+j, y+i));

      squares[y+i][x+j].clicked();
    }


  for( let i=0; i<buff.length; i++ )
  {
    selectAllSqaresAround(buff[i].y, buff[i].x);
  }

}

//-------------------------------------------------------//change the type of all the squares

function calcType()
{
  for(let i=0; i<totBomb; i++)
  {
    let rx = floor(random(totX));
    let ry = floor(random(totY));
    if(squares[ry][rx].type === "bomb")
    {
      i--;
      continue;
    }
    squares[ry][rx].type = "bomb";
  }


  for( let i=0; i<totY; i++ )
    for( let j=0; j<totX; j++ )
    {
      if(squares[i][j].type != "bomb")
        squares[i][j].type = countBomb(i, j);
    }
}

//-------------------------------------------------------//count how many bomb are on the 8 square around

function countBomb(y, x)
{
  let n = 0;
  for( let i=-1; i<=1; i++ )
    for( let j=-1; j<=1; j++ )
    {
      if(i===0 && j===0)
        continue;

      if( y+i<0 || y+i>=totY  ||  x+j<0 || x+j>=totX )
        continue;

      if(squares[y+i][x+j].type === "bomb")
        n++;
    }
  return n;
}

//-------------------------------------------------------//finish the game

function endGame()
{
  for( let i=0; i<totY; i++ )
    for( let j=0; j<totX; j++ )
    {
      if( squares[i][j].type === "bomb" )
        squares[i][j].isFound = true;
    }
  let i;
}
