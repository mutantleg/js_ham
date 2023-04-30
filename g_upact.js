


function playOnScreen(tx, ty, sndName, vol)
{
  var ax, ay;
  
  ax = tx * tilew + 8;
  ay = ty * tileh + 8;
  ax -= camx;
  ay -= camy;

  if (ax<-16){ return;} 
  if (ax>340){ return;}
  if (ay<-16){ return;}      
  if (ay>260){ return;}

  playSnd(sndName, vol);
  
}//playonscr

  // vecFlood is in ctilemap
  var curFlood = 1;
   function floodTile(tx, ty, bslow)
   {
     var vecx = [];
     var vecy = [];
     var it;
     var i;
     var ax, ay;
     var k;
     var addx = [1,-1, 0,0];
     var addy = [0,0, 1,-1];
     var dx, dy;
     var ft; //first tile 
     
     curFlood += 1;
     
     it = 1;
     vecx[0] = Math.floor(tx);
     vecy[0] = Math.floor(ty);
     
     //dont fill in first tile 
     //setTile(vecFlood,vecx[0],vecy[0],curFlood);
     
     console.log(gt," FLOODTILE ", vecx[0], vecy[0] );
     ft = getTile(vecMid, vecx[0], vecy[0]);
     if (ft < 1) { return; }
     
     setTile(vecMid, vecx[0], vecy[0], 0);
     
     for (i=0;i<8192;i+=1)
     {
       it -= 1;
       if (it < 0) { break; }
       ax = vecx[it];
       ay = vecy[it];
       
       for (k=0;k<4;k+=1)
       {
         dx = ax+addx[k]; 
         dy = ay+addy[k];   
         
         if (getTile(vecFlood,dx,dy) == curFlood)  { continue; } //already filled 
//         if (getTile(vecMid,dx,dy)<0) { continue; } //out of map 
//        if (getTile(vecMid,dx,dy)<1) { continue; } //not wall
         if (getTile(vecMid,dx,dy)!=ft) { continue; } //not first tile 
         
            setTile(vecFlood,dx,dy, curFlood);
            if (bslow)
            {
              var a;
              a = addAct();
              a.tx = dx;
              a.ty = dy;
              a.wait = 1 + (Math.abs(tx-dx)+Math.abs(ty-dy))  * 10;
              a.sprName = "magichit";
              a.spec = 105;
              a.visible = false;
              a.lastSee = 1; //force active
            }
            else
            { setTile(vecMid, dx,dy, 0); }
            
        // console.log(gt," Flood add ", dx,dy);
            vecx[it] = dx;
            vecy[it] = dy;
            it += 1;

       }//nextk           
     }//nexti   
     console.log(gt," Flood end ", i, it);
     
     
       if (bslow)
            {
              var a;
              a = addAct();
              a.tx = tx;
              a.ty = ty;
              a.sprName = "magichit";
              a.spec = 100;
              a.lastSee = 1; //force active
            }
            
   }//floodtile

   
   
   
   
   function isWallTile2(tx,ty)
   {
     var t;
      t = getTile(vecMid,tx,ty); 
      if (t!=0) { return true; }
      t = getTile(vecId, tx,ty);
      if (t!=0) { return true; }
     return false;
   }//iswall2
   
   function blastTile(tx, ty, notid, nt)
   {
     
    var t; var a;
      t = getTile(vecMid,tx,ty); 
      if (t!=0) 
      { 
        if (t>=144){return true;}
        
        //if hit donut turn it into devil
        if (t == nt)
        {
          setTile(vecMid,tx,ty,0);
          a = addAct();
           a.tx = tx;
           a.ty = ty;
           a.sprName = "devil";
           a.spec = 300;
          return true;
        }//endif3
        
        setTile(vecMid,tx,ty,nt);
        return true; 
      }
      t = getTile(vecId, tx,ty);
      if (t==notid) {return false; }
      if (t<=0) { return false; }
      a = getAct(t);
      if (a!=0)
      { 
        a.dead=true; 
        setTile(vecId,tx,ty,0);
         setTile(vecMid,tx,ty,nt); 
        return true;
      }
    
      return false;
   }//blasttile

   function eatHardWall(tx,ty)
   {
     var t;
     t = getTile(vecMid,tx,ty);     
     if (t == 160 ) { return false; } //hole
     if (t==1||t>140) { setTile(vecMid,tx,ty,0); return true; }
     return false;
   }//eattileat
   
   
   function eatTileAt(tx,ty, et, nt)
   {
     var t;
     t = getTile(vecMid,tx,ty);     
     if (t==et) { setTile(vecMid,tx,ty,nt); return true; }
     return false;
   }//eattileat

   
   //find tile nearby 
   //change tile if et  to nt 
   var lastEatx = 0;
   var lastEaty = 0;
   var eatx = [1,-1,0,0];
   var eaty = [0,0, 1,-1];
   
   function eatTile(tx,ty, et, nt)
   {
     var t;   var i;
     for (i=0;i<4;i+=1)
     {
       t = getTile(vecMid, tx+eatx[i], ty+eaty[i]);
       //console.log("eattile ",tx+eatx[i], ty+eaty[i],i,t );
       if (t == et)
       {
         lastEatx = tx+eatx[i];
         lastEaty = ty+eaty[i];
         setTile(vecMid, tx+eatx[i], ty+eaty[i], nt);
         return true;
       }//endif 
     }//nexti 
     
     return false;
   }//eattile


   function eraseActAt(ax, ay)
  {
    var i; var a;
     i =  getTile(vecId,ax,ay);
     if (i<=0) { return; }
     a = getAct(i);
     if (a == 0) { return; }
     console.log(gt," erase act  ",i, a.id, ax,ay, a.tx,a.ty);
     setTile(vecId, ax,ay,0);
     a.dead=true;
  }//erase

  function exploArea(ax, ay)
  {
    var a; var i, k;
    
    playSnd("snd1", 1);
    
    for (i=-3;i<4;i+=1)
    { 
      for (k=-3;k<4;k+=1)
      {
        eraseActAt(ax+k,ay+i);    
        setTile(vecMid,ax+k,ay+i, 0);
        a = addAct();
         a.tx = ax+k;
         a.ty = ay+i;
         a.sprName = "fire";
         a.spec = 100;
         a.lastSee = 1; //update hack
      }//nextk 
    }//nexti
    
  }//exploarea
     
   
function moveTileAct(a, dx, dy)
{
  
       setTile(vecId, a.tx, a.ty, 0);                   

              if (isWallTile2(a.tx+dx,a.ty+dy) )
              { 
                if (isWallTile2(a.tx+dx,a.ty) ) { dx = 0; }
                else { dy = 0; }
              }
              
              if (isWallTile2(a.tx+dx,a.ty) ) { dx = 0; }
              if (isWallTile2(a.tx,a.ty+dy) ) { dy = 0; }
     
              
        a.tx += dx;
        a.ty += dy;

      setTile(vecId, a.tx, a.ty, a.id);
  
}//movetileact
   
  
  //continue text 
  //spec 17 
function moveCont(a)
{
  a.hp -= 1;
  if (a.hp <= 0) {a.dead=true; }
  
}//movecont 
  
  
   
function moveNerd(a)
{
  
  var dx, dy;
  a.wait += 1;


  
  if (a.wait < 24) { return; }
  a.wait = 0;
  a.xmir = !a.xmir;
   
   if (a.reload == 0)
   {
     //think -- but not every frame 
 //   if ( (gt+a.id)%24 != 0) { return; }
      var t;
      t =  0;
      //search for computer tile (9) nearby
      if (getTile(vecMid,a.tx,a.ty-1) == 9) { t += 1;}
      if (getTile(vecMid,a.tx,a.ty+1) == 9) { t += 1;}
      if (getTile(vecMid,a.tx-1,a.ty) == 9) { t += 1;}
      if (getTile(vecMid,a.tx+1,a.ty) == 9) { t += 1;}
      if (t ==0 ) { a.reload = 1; } //be free!

        moveTileAct(a,0,0); //be pushable 
     return;
   }//endif
   
   
  


  
       dx=0;dy=0;

  if (a.reload == 1)
  {  
    a.reload = 2;
    //move after hamster 
     if (tmanx < a.tx-1) { dx = -1; }
     else if (tmanx > a.tx+1) { dx = 1; }
     if (tmany < a.ty-1) { dy = -1; }
     else if (tmany > a.ty+1) { dy = 1; }
  }
  else  
  {
    a.reload = 1;
      t = Math.floor(getRand() * 4);
      if (t==0) { dx = 1;  }
      if (t==1) { dx = -1; }
      if (t==2) { dy = 1;  }
      if (t==3) { dy = -1; }
  }//endif
   
    moveTileAct(a,dx,dy);
   
}//movenerd 

function moveMark(a)
{
   moveTileAct(a,0,0);
   
   if (a.wait<0)
   {
     a.wait = 0;
     playSnd("snd9", 1);
     //set message mode 
     showMsg = a.spec - 1000 ;
     showDelay = 0;
    console.log(gt," mark pushed ", showMsg);
    return;
   }//endif
   
   a.wait += 1;
   if (a.wait<10) {return;}
   a.wait = 0;
   a.reload += 1;
   if (a.reload > 7) { a.reload = 0; }
   a.sprName = "qmark"+a.reload;
   
   
  
}//movemark 

function moveExplo(a)
{
    a.wait += 1;
    if (a.wait%4==0) { a.xmir = !a.xmir; }
    if (a.wait%8==0) { a.ymir = !a.ymir; }
    if (a.wait >= 24) 
    { a.dead=true; return; }
    
}//moveexplo 

//flood 
function moveTileExplo(a)
{
    a.wait -= 1;
    if (a.wait%4==0) { a.xmir = !a.xmir; }
    if (a.wait%8==0) { a.ymir = !a.ymir; }
    if (a.wait <= 0) 
    {
      setTile(vecMid, a.tx,a.ty, 0);      
//      a.dead=true;
    playSnd("snd8", 1);
      
        a.wait = 0;
       a.spec = 100;
       a.visible = true;
      return; 
    }
    
}//movetileexplo 



//spec 5 
//beast 
function moveBomb(a)
{
  var t;   var dx, dy;
  
  if (a.wait < 0) 
  { 
    a.dead = true; 
    exploArea(a.tx, a.ty);
    setTile(vecId, a.tx, a.ty, 0);     
    return;
  }//endif
  
  a.wait += 1;
  if (a.wait < 32) { return; }
  a.wait = 0;
  
   dx=0;dy=0;
      
     if (tmanx < a.tx) { dx = -1; }
     else if (tmanx > a.tx) { dx = 1; }
     if (tmany < a.ty) { dy = -1; }
     else if (tmany > a.ty) { dy = 1; }
 
 if (dx!=0 && dy != 0)
 { if (getRand()<0.5) { dx=0; } else {dy=0; } }
 
  if (a.tx+dx == tmanx && a.ty+dy == tmany)
  { a.wait = -1; return; }

//console.log(gt, " bomb ",a.id,a.tx+dx,a.ty+dy, tmanx,tmany);
 
  moveTileAct(a,dx,dy);

    

           
  
}//movebomb

//movebull
//update bull
function moveMagic(a)
{
  var t;   var dx, dy;  
  a.wait += 1;
  if (a.wait < 5) { return; }
  a.wait = 0;  
  
  a.hp -= 1;
  if (a.hp<=0) {a.dead=true;return; }
  
  
  if (blastTile(a.tx,a.ty, a.ownerid, 6)) 
  { 
    playOnScreen(a.tx,a.ty,"snd8", 1);
//      a.dead=true; 
    a.sprName = "magichit";
    a.spec = 100;
    return; 
  }
  
  a.tx += a.vx;
  a.ty += a.vy;
  
}//movemagic

   
   //spec 300 
function moveDevil(a)
{
  var t;   var dx, dy;  
  a.wait += 1;
  if (a.wait < 24) { return; }
  if (a.reload > 80) { a.reload=0; return;}
  
    a.sprName = "devil";

  a.wait = 0;  
  dx=0;dy=0;
  
      t = Math.floor(getRand() * 4);
      if (t==0) { dx = 1;  }
      if (t==1) { dx = -1; }
      if (t==2) { dy = 1;  }
      if (t==3) { dy = -1; }

  if (a.reload < 20)
  {    
    moveTileAct(a,dx,dy);
  }
  
  //wait 1 frame after shoot     
  if (a.reload > 20)
  {
     playOnScreen(a.tx,a.ty,"snd7", 1);
     a.sprName = "devilfire";
     a.reload = 100;
     var b;
      b = addAct();
       b.ownerid = a.id;
       b.vx = dx;
       b.vy = dy;
       b.tx = a.tx+b.vx;
       b.ty = a.ty+b.vy;
       b.spec = 301;
       b.sprName = "magic";
       b.lastSee = 1; //hack to update
    return;
  }//endif 
  
  a.reload += getRand()*10;  
  if (a.reload < 20) { return; }
  
  a.sprName = "devilfire";
//  a.reload = 0;
    

             
}//moveDevil  


function moveCat(a)
{
  var t;   var dx, dy;  
  a.wait += 1;
  if (a.wait < 24) { return; }
  a.wait = 0;  
  
  //eat donuts
  if (eatTile(a.tx,a.ty, 6, 0)) { return; }
  
  dx=0;dy=0;
      t = Math.floor(getRand() * 4);
      if (t==0) { dx = 1;  }
      if (t==1) { dx = -1; }
      if (t==2) { dy = 1;  }
      if (t==3) { dy = -1; }
      
    moveTileAct(a,dx,dy);
    
    
}//movecat
    


function moveChomp(a)
{
  var t;   var dx, dy;  

  if (a.wait%8==0)
  {
    a.walkFrame += 1;
    if (a.walkFrame >= 4) { a.walkFrame = 0; }
    a.sprName = "chomp"+a.walkFrame;
  }
  
  a.wait += 1;
  if (a.wait < 24) { return; }
  a.wait = 0;  
  
  
  
  dx=0;dy=0;
      t = Math.floor(getRand() * 4);
      if (t==0) { dx = 1;  }
      if (t==1) { dx = -1; }
      if (t==2) { dy = 1;  }
      if (t==3) { dy = -1; }

   if (dx!=0 && dy != 0)
   { if (getRand()<0.5) { dx=0; } else {dy=0; } }

  //eat walls
//    if (eatTileAt(a.tx+dx,a.ty+dy, 1, 0))
    if (eatHardWall(a.tx+dx,a.ty+dy))
    { 
      setTile(vecId, a.tx, a.ty, 0);   
      a.tx += dx; a.ty += dy;
      setTile(vecId, a.tx, a.ty, a.id);   
    return;
    }//eatat 
   
    moveTileAct(a,dx,dy);
    
    
}//movechomp

    
function moveAct(a)
{
    var t;
    var dx, dy;
  
  a.wait += 1;
  if (a.wait < 24) { return; }
  a.wait = 0;
  
       dx=0;dy=0;
      
     /*
     if (tmanx < a.tx-1) { dx = -1; }
     else if (tmanx > a.tx+1) { dx = 1; }
     if (tmany < a.ty-1) { dy = -1; }
     else if (tmany > a.ty+1) { dy = 1; }
     */
      
      t = Math.floor(getRand() * 4);

      
      if (t==0) { dx = 1;  }
      if (t==1) { dx = -1; }
      if (t==2) { dy = 1;  }
      if (t==3) { dy = -1; }
  
 // dx=0;dy=0;
    moveTileAct(a,dx,dy);
                          
  
}//moveact



function checkSpecTile(t, ax, ay)
{
  //donut 
  if (t == 6) 
  {
    playSnd("snd10", 1);
     setTile(vecMid,ax,ay, 0);              
     showFat += 17;         
      fatShake = gt + 15;     
    return 1;
  }//endif 
  
  //dynamite 
  if (t == 10)
  {
    exploArea(ax, ay); 
     var a;
     a = getAct(playerId);
     if (a!=0) {a.dead=true; } 
    return 1;
  }//endif 
    
  
  //blue key 
  if (t == 12)
  {
    if (eatTile(ax,ay, 161, 162))
    {
      playSnd("snd11", 1);
      floodTile(lastEatx, lastEaty, true);
      setTile(vecMid,ax,ay, 0);                   
      return 1;      
    }//endif
    
    return 0;
  }//endif
  
  /*
  //question block 
  if (t == 21) 
  {
    anyHold = 3;
    showMsg = 1;
    showDelay = 0;
//      keyTime = 0;  //keytime hack
    setTile(vecMid,ax,ay, 0);                   
    return 1;
  }
  */
  
  return 0;
}//checkspectile 

function movePlayer(m)
{


//endgame
//leave map on bottom
  if (m.ty > 104) { if (gameEnd<=0) {gameEnd = 1;  return; } }

  m.wait += 1;
  if (m.wait <= 6) { return; }


         
  var ms;
   ms = 1;
   var dx, dy;
   dx=0;dy=0;
   
    setTile(vecId, m.tx, m.ty, 0);        
   
    if (keyUp)    { dy -= ms; m.wait= 0; }     
    if (keyDown)  { dy += ms; m.wait= 0; }     
    if (keyLeft)  { dx -= ms; m.wait= 0; }     
    if (keyRight) { dx += ms; m.wait= 0; }      
    
    //todo -- move this to a function .. ?
    //nah cant we dont have references in js                
    if ( (dx != 0 && dy == 0) || (dx==0 && dy!=0 ) )
    {
      if (isWallTile(m.tx+dx, m.ty+dy))
      {
        var t; var st;
         t = getTile(vecMid, m.tx+dx, m.ty+dy);
            console.log(gt,"tile touched ", t);
         
         st = checkSpecTile(t, m.tx+dx,m.ty+dy); 
         if (st != 0)
         {
           //0 not spec tile 
           //1 handled in spectile
           //2 stop 
           if (st == 2) { dx = 0; dy = 0; }
           
         }
         else 
         if (t < 144) //not allowed to push above these tiles 
         {
            var dt;
            dt = getTile(vecMid, m.tx+dx+dx, m.ty+dy+dy);
            if (dt == 160) //hole
            {
               playSnd("snd14", 1);
             setTile(vecMid,m.tx+dx+dx, m.ty+dy+dy, 0);
             setTile(vecMid,m.tx+dx, m.ty+dy, 0);
            }
            else 
            {
                  if ( isWallTile2(m.tx+dx+dx, m.ty+dy+dy) == false)
                  {     
                    //push tile                            
                    setTile(vecMid,m.tx+dx+dx, m.ty+dy+dy, t);
                    setTile(vecMid,m.tx+dx, m.ty+dy, 0);
                    playSnd("snd4", 1);
               //   console.log("tile pushed ", t);
                  }                       
                 else  if (arrowHold == 1)
                 {
                   arrowHold = 3;
                   //swap place with tile
                    playSnd("snd6", 1);
                  setTile(vecMid,m.tx+dx, m.ty+dy, 0);
                  setTile(vecMid,m.tx, m.ty, t);
                  m.tx = m.tx+dx;
                  m.ty = m.ty+dy;
                  dx=0; dy=0;
                   
                 }//endif7
            }//endif6
         }//endif5
      }             
      else 
      {
        //push actor 
        if (getTile(vecId, m.tx+dx, m.ty+dy) > 0)
        {
          var a; var t;   var dt;
          t = getTile(vecId, m.tx+dx, m.ty+dy);
          a = getAct(t);
          if (a!=0)
          {
            dt = getTile(vecMid, m.tx+dx+dx, m.ty+dy+dy);
            
          
            if (a.spec >  1000)   //question block 
            { 
                a.wait = -24;
                
            }            
            else if (dt == 160) //hole
            {
              //pushed into hole 
              a.dead=true;
              setTile(vecId,m.tx+dx, m.ty+dy, 0);
               playSnd("snd5", 1);
            }  
            else 
            {
               if ( isWallTile2(m.tx+dx+dx, m.ty+dy+dy) == false)
               {
                  a.tx = m.tx+dx+dx;
                  a.ty = m.ty+dy+dy;
                  //freeze actor if pushed
                  a.wait = -24;
       
                setTile(vecId,m.tx+dx+dx, m.ty+dy+dy, t);
                setTile(vecId,m.tx+dx, m.ty+dy, 0);
                    playSnd("snd4", 1);
               }
               else  if (arrowHold == 1)
               {  
                   arrowHold = 3;
                //swap places 
                    playSnd("snd6", 1);
                  a.tx = m.tx;
                  a.ty = m.ty;
                  a.wait = -24;
                  setTile(vecId,m.tx+dx, m.ty+dy, 0);
                  setTile(vecId,m.tx, m.ty, t);
                  m.tx = m.tx+dx;
                  m.ty = m.ty+dy;
                  dx=0; dy=0;
               }//endif9
            }//endif8
          }//endif7         
        }//endif5
      }//endif3
    }//endif
    
    if (dx!=0 || dy!=0)
    {
      m.xmir = !m.xmir; 
      if (showFat > 0) { showFat -= 1; }
    }//endif
    
    
  

  var whit = 0;

    if (isWallTile2(m.tx+dx,m.ty+dy) )
    { 
      if (isWallTile2(m.tx+dx,m.ty) ) { dx = 0; whit=1;}
      else { dy = 0; whit=1;}
    }
    
    if (isWallTile2(m.tx+dx,m.ty) ) { dx = 0; whit=1;}
    if (isWallTile2(m.tx,m.ty+dy) ) { dy = 0; whit=1;}
    
  if (whit==1) { playSnd("snd15", 1); }
  
    m.tx += dx;
    m.ty += dy; 
    
    setTile(vecId, m.tx, m.ty, m.id);  

  tmanx = m.tx; 
  tmany = m.ty;    

  //checkpoint 
  //continue spot 
  if (getTile(vecBack, tmanx, tmany) == 49)
  {
    if (startx != tmanx || starty != tmany)
    {
     a = addAct();
       a.visible= false;
       a.hp = 80;
       a.tx = tmanx;
       a.ty = tmany;
       a.spec = 17;
       a.lastSee = 1;

       playSnd("snd2", 1);

    }//endif3 
    
    startx = tmanx;
    starty = tmany;
    
  }//endif 
  
  
    if (m.wait >= 6 && showFat > 100)
    { 
     // showFat += 1;
      if (showFat >= 110)
      {
        exploArea(m.tx,m.ty); 
      }
    }

}//moveplayer






function actFromMap(tmap)
  {
    var k, i; var t;
    for (i=0;i<mapmh;i+=1)
    {
      for (k=0;k<mapmw;k+=1)
      {
        t = getTile(tmap, k,i);
         if (t > 0)
         {


            var a;
            a = addAct();
             a.tx = k;
             a.ty = i;
             a.cx = k*tilew;
             a.cy = i*tileh;
            
            
            //hamster
            if (t == 18) 
            { a.sprName = "man"; 
              a.spec = 1; 
              playerId = a.id; 
              tmanx = k; 
              tmany = i;
              a.lastSee = 1; //important
              continue;    
            }//endif3 

            
            if (t == 19) { a.sprName = "nerd";   a.spec = 3; continue;     }
            if (t == 20) { a.sprName = "beast";  a.spec = 5; continue;     }
            
            
            if (t >= 21 && t < 30) { a.sprName = "qmark0"; a.spec = 1000 + t-20; continue;   }
            
//            if (t == 21) { a.sprName = "qmark0"; a.spec = 1001; continue;  }
   //         if (t == 22) { a.sprName = "qmark0"; a.spec = 1002; continue;  }

            if (t == 35) { a.sprName = "cat";    a.spec=500; continue;     }
            if (t == 36) { a.sprName = "devil";  a.spec = 300;  continue;     }
            if (t == 37) { a.sprName = "chomp0";  a.spec = 350;  continue;     }
            
             
         }//endif
      }//nextk 
    }//nexti       
    
  }//actfrommap
  
  
  function updateAct(vec)
  {
    var i; var num; var a;
    var bclean = false;
    num = vec.length | 0; 
    
   
    for (i=0; i < num;i+=1)
    {
      a = vec[i];
      if (a.dead){ bclean=true; continue;}
      
      //only update actor if it appeared on screen 
      if (a.lastSee <= 0) { continue; }
      
      if (a.spec == 3)            { moveNerd(a); }
      else if (a.spec == 5)       { moveBomb(a); }
      else if (a.spec == 100)     { moveExplo(a); }
      else if (a.spec == 105)     { moveTileExplo(a); }
      else if (a.spec == 300)     { moveDevil(a); }
      else if (a.spec == 301)     { moveMagic(a); }
      else if (a.spec == 350)     { moveChomp(a); }
      else if (a.spec == 500)     { moveCat(a); }
      else if (a.spec >= 1000)    { moveMark(a); }
      else if (a.spec == 17)      { moveCont(a);  }
      else if (a.spec == 1)       { movePlayer(a); }
      else   { moveAct(a); }
      
      /*
      if (a.spec == 1) { upPlayer(a); continue; }
      if (a.spec == 3) { upMonst(a); continue; }
      if (a.spec == 99) { upBlock(a); continue; }
      */
    }//nexti 
    if (bclean) { cleanAct(vec); }
  }//updateact
  