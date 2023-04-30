

   var fog_mw = 64;
   var fog_mh = 48;
   var vecFog = [0]; //new Array(64*48);
   var vecGrayFog = [0]; //new Array(64*48);
   
   function setFogSize(aw, ah)
   { fog_mw = aw; fog_mh = ah; }
   
   function resetFog(aw, ah)
   {
     fog_mw = aw; 
     fog_mh = ah;
     vecFog = new Array(fog_mw * fog_mh);
     vecGrayFog = new Array(fog_mw * fog_mh);
     
     var i, k; var yt;
     for (i=0;i<fog_mh;i+=1)
     {
       yt = Math.floor(i * fog_mw);
       for (k=0;k<fog_mw;k+=1)
       {
         vecFog[yt+k] = 3;
         vecGrayFog[yt+k] = 4;
       }
     }
     
   }//resetfog
     
   
   
   
  
  