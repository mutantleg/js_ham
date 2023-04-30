


   
   var tileImage = loadImage(tileset3png);
   var shadImage = loadImage(tileset3shadpng);
  
  //turn these into objects .. ?
  
  
   var mapmw = 3; 
   var mapmh = 3;
  // var vecMap = [0,0,0,  0,0,0,  0,0,0];
   var tilew = 16;
   var tileh = 16;

 //quick copy 
//var newArray = oldArray.slice();


   var vecBack = []; 
   var vecMid = [];
   // vecact is already exist and not tile 
   var vecId = [];   
      
   var vecFlood = [];
   function makeEmptVec(w, h)
   {
    var i; var num;   var vec;
      vec = []; num=w*h;
      for (i=0;i<num;i+=1)
      { vec[i] = 0; }
    return vec;
   }//makeemptvec
   
   function setMap(w, h, mid, back)
   {
     mapmw = w;
     mapmh = h;
     vecMid = mid.slice();
     vecBack = back.slice();
     vecId = makeEmptVec(w, h); 
     vecFlood = makeEmptVec(w, h); 
   }//setmap 
   

   /*
   function copyTmap(tmw, tmh, tvec)
   {
      var rvec = [];
      var i;
      var num; 
      num = tmw*tmh;
      for (i=0;i<num;i+=1)
      { rvec[i] = tvec[i]; }
      var ret = 
      { 
        mw:tmw,
        mh:tmh,
        vec:rvec 
      };
      return ret;
   }//copytmat
   */


   function setMapSize(aw, ah)
   { mapmw = aw; mapmh = ah; }
   
 //  function clearMap()
 //  { mapmw=1;mapmh=1; vecMap = [0]; }
   
   //remember to set vecmap before use 
   function getTile(vec, ax, ay)
   { 
    ax = Math.floor(ax); ay = Math.floor(ay);
    if (ax<0||ax>=mapmw||ay<0||ay>=mapmh) { return -1; } return vec[Math.floor(ax+(ay*mapmw))]; 
   }
  
   function setTile(vec, ax, ay, t)
   { 
     ax = Math.floor(ax); ay = Math.floor(ay);
     if (ax<0||ax>=mapmw||ay<0||ay>=mapmh) { } else { vec[Math.floor(ax+(ay*mapmw))] = t; } 
   }
  
   function setTileHoriz(vec, ax, ay, aw, t)
   { var i; for (i=0;i<aw;i+=1) { setTile(vec,ax+i,ay, t); } }

   function setTileVert(vec, ax, ay, ah, t)
   { var i; for (i=0;i<ah;i+=1) { setTile(vec,ax,ay+i, t); } }

   function setTileRect(vec, ax, ay, aw, ah, t)
   { 
     ax = Math.floor(ax); ay = Math.floor(ay);
     aw = Math.floor(aw); ah = Math.floor(ah);
    setTileHoriz(vec,ax,ay,aw, t);
    setTileHoriz(vec,ax,ay+ah-1,aw, t);
    setTileVert(vec,ax,ay, ah, t);
    setTileVert(vec,ax+aw-1,ay, ah, t);
   }//tilevert
   
   function fillTileRect(vec, ax, ay, aw, ah, t)
   {
     ax = Math.floor(ax); ay = Math.floor(ay);
     aw = Math.floor(aw); ah = Math.floor(ah);
     for (i=0;i<ah;i+=1)
     {
      setTileHoriz(vec, ax,ay+i,aw, t);       
     }
   }//tilefill

   function isWallTile(tx,ty)
   { var t; t = getTile(vecMid,tx,ty); return t > 0; }

   /*
   function isWall(vec,ax,ay)
   { var t; t = getTile(vec,Math.floor(ax/tilew), Math.floor(ay/tileh)); return t > 0; }

   function getWall(vec, ax,ay)
   { return  getTile(vec, Math.floor(ax/tilew), Math.floor(ay/tileh)); }
   */
   //for now each tileset is 256x256 image  16x16 tiles 
   
   function drawTileMapAdv(img, vec, stx, sty, ox, oy)
   {
    var k; var i; var t;
    var ax, ay; var yt;
    var tx, ty;
    var kw, kh;
    kw = 20+1;
    kh = 15+1;
    if (kw>mapmw){kw=mapmw;}
    if (kh>mapmh){kh=mapmh;}
    
    stx = Math.floor(stx);
    sty = Math.floor(sty);
    
      for (i=0;i<kh;i+=1)
      {  
        ty = (i+sty);
        if (ty<0) { continue; }
        if (ty>=mapmh) { break; }
        yt = Math.floor(ty*mapmw);
        
        ay = i * tileh + oy;    
        
        for (k=0;k<kw;k+=1)
        {
          tx = (k+stx);
          if (tx<0){continue;}
          if (tx>=mapmw){break;}
          t = vec[ Math.floor(tx+yt) ];
          if (t <1) { continue;  }
          
          ax = k * tilew + ox ;

         // tx=0;ty=0;
          tx = Math.floor(t % tilew)*tilew;
          ty = Math.floor(t / tileh)*tileh;
          
           ctx.drawImage(img, tx,ty,tilew,tileh, 
                                  ax,ay,tilew,tileh);
        }//nextk         
      }//nexti   
       
   }//drawtilemap 
   
   function drawTileMap(vec, stx, sty, ox, oy)
   { drawTileMapAdv(tileImage, vec, stx, sty, ox, oy); }
   
   
   
   
   
   
   
   
   
   
   
   
   
   