
/*
  // ang     -- angle in radians  (to deg: 45*(3.1415/180.0) )
  // scx scy -- scale  e.g. scx -1 for mirror horizontally
  function drawSprAdv(spname, ax, ay, ang, scx, scy)
  */
  
  function drawAct(vec)
  {
    var ax, ay;
    var sx, sy;
    var i; var num; var a;
    num = vec.length | 0; 
    for (i=0; i < num;i+=1)
    {
      a = vec[i];
      
  
   
      a.cx = a.tx * tilew + 8;
      a.cy = a.ty * tileh + 8;


      ax = a.cx - camx;
      ay = a.cy - camy;
      
          //continue spot 
      if (a.spec == 17)
      {
         if ((gt&16)==0) { drawFont(ax-36,ay-16, 8,8, "CHECKPOINT"); }
        continue;
      }//endif 
      
         if (a.visible == false) { continue; }
      
      
      //see if in screen (all chars are 16x16)
      if (ax<-16){ continue;} 
      if (ax>340){ continue;}
      if (ay<-16){ continue;}      
      if (ay>260){ continue;}
      
      a.lastSee = gt;
      

      if (a.xmir || a.ymir)
      {
        
        sx=1; sy=1;
        if (a.xmir) { sx*=-1; }
        if (a.ymir) { sy*=-1; }
         drawSprAdv(a.sprName, ax, ay, 0, sx,sy); 
        continue;        
      }//endif

        drawSpr(a.sprName, ax, ay);       
    }//nexti   
  }//drawact
 