    var mousex=0; var mousey=0;   //mouse coordinates
    var mbutton = 0;  //mouse left is down (1) or up (0)
    var mhold = 0;
    var mpress = 0;
    var mdelay = 0;
    var vmx = 0; var vmy = 0; //virtual mouse coordinates 
    var pmx = 0; var pmy = 0; //previous mouse coord 
    var mvx = 0; var mvy = 0;
    var mouseLook = false;
    var mouseSpeed = 1.0;
    
    
    function mouseUpdate()
    {
      if (mdelay > 0)
      {
        mdelay -= 1;
        mhold =0; mpress=0; mbutton = 0;        
        return;
      }//endif 
      
      mpress = 0; 
      if (mbutton > 0) { mhold += 1; }
      else { if (mhold>0){mpress=1;} mhold = 0; }
      
    }//mouseupdate 
          
    //EVENT LISTENERS
     var c = document.getElementById("myCanvas");
       c.addEventListener('mousemove', onMouseMove );          
       c.addEventListener('mouseup', function(e){ mbutton = 0; onMup(); } );
       c.addEventListener('mousedown', function(e){ mbutton = 1; onMdown(); } ); 
       c.addEventListener('mouseleave', function(e){ mbutton = 0; onMup(); } );

       document.addEventListener('mousemove', onLockMove );          

      function onMdown()
      {           
        if (mouseLook==false){mbutton=0;}
      }//onmdown
      
      function onMup()              
      {

      }//onmup
              
      function onMouseMove(e)
      {                
       //get the mouse coordinates inside the canvas
       var c = document.getElementById("myCanvas");
       var r = c.getBoundingClientRect();
        mousex = Math.round((e.clientX-r.left)/(r.right-r.left)*c.width );
        mousey = Math.round((e.clientY-r.top)/(r.bottom-r.top)*c.height );

        //vmx = mousex;        vmy = mousey;
      }//onMouseMove
      
      function onLockMove(e)
      {
        //console.log(" document mousemove  ",gt, " xy  ", e.movementX, e.movementY)

       if (mouseLook)
       {    
        vmx += e.movementX;
        vmy += e.movementY;
       }//endif 
      }//onlockmove
      
      function wrapMouse()
      {
        
        mvx = pmx - vmx;
        mvy = pmy - vmy;
        
        mvx *= mouseSpeed;
        mvy *= mouseSpeed;
        
        
         if (vmx < 0)    { vmx += 320;    }
         if (vmx > 320)  { vmx -= 320;    }
         if (vmy < 0)    { vmy += 240;    }
         if (vmy > 240)  { vmy -= 240;    }
        
        pmx = vmx;
        pmy = vmy;
           
      }//wrapmouse
      
      function limitMouse()
      {
        mvx = pmx - vmx;
        mvy = pmy - vmy;
        
        mvx *= mouseSpeed;
        mvy *= mouseSpeed;
        
        
         if (vmx < 0)    { vmx = 0;    }
         if (vmx > 320)  { vmx = 320;  }
         if (vmy < 0)    { vmy = 0;    }
         if (vmy > 240)  { vmy = 240;  }
        
        pmx = vmx;
        pmy = vmy;
        
        
      }//limitmouse 
      
      
          
      var canvas=document.getElementById("myCanvas");    
      canvas.requestPointerLock = canvas.requestPointerLock ||
                                  canvas.mozRequestPointerLock;

      document.exitPointerLock = document.exitPointerLock ||
                                 document.mozExitPointerLock;

      canvas.onclick = function() { canvas.requestPointerLock(); };
      
      
      document.addEventListener('pointerlockchange', onLockChange, false);
      document.addEventListener('mozpointerlockchange', onLockChange, false);

      function onLockChange()
      { 
        if (document.pointerLockElement === canvas || document.mozPointerLockElement === canvas) 
        { console.log("lock is on ", gt);
         if (mouseLook == false) { mdelay=6;  }
          mouseLook = true;
        }
        else 
        { console.log("lock is off ", gt); mouseLook = false;  mdelay=6;  }
              
      }//onlockchange
      

      
      
      