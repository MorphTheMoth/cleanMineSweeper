class Square {
  //xy point
  //width height
  //type
  
  constructor(p, type) {
    this.p = p;
    this.width = squareDim;
    this.height = squareDim;
    this.type = type;
    this.isFound = false;
    this.couldBeBomb = false;
    textSize(30);
    textAlign(CENTER, CENTER);
  }
  
  rightClicked(){
    this.couldBeBomb = !this.couldBeBomb;
  }
  
  clicked(){
    if( this.isFound || this.couldBeBomb )
      return;
      
    if( this.type === "bomb" )
    {
      endGame();
      return;
    }
    
    this.isFound = true;
  }

  draw(){
    if( this.couldBeBomb )
      fill(maybeBomb);
    else if( !this.isFound )
      fill(empty);
    else if( this.type === "bomb" )
      fill(bomb);
    else
      fill(safe);
    
    rect(this.p.x, this.p.y, this.width-1, this.height-1);
    
    
    fill(empty);
    if(this.type != "bomb" && this.isFound )
      text(this.type, this.p.x+this.width/2, this.p.y+this.height/2);
    
  }

}