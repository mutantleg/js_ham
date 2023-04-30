
  var vecKey = []; 
  
  var key_left =  37;    
  var key_up =    38;    
  var key_right = 39;    
  var key_down =  40;
  var key_w = 87;
  var key_a = 65;
  var key_s = 83;
  var key_d = 68;
  var key_m = 77;
  var key_n = 78;
  var key_x = 88; 
  var key_y = 89;
  var key_z = 90;
  var key_q = 81;
  var key_r = 82;
  var key_f = 70;
  
  
  var keyUp =    false;  
  var keyDown =  false;  
  var keyLeft =  false; 
  var keyRight = false;
  var keyFire =  false; 
  var keyFire2 = false;
  var keyStrafeLeft = false;
  var keyStrafeRight = false;
  var fireHold =  0;
  var fire2Hold = 0;
  var arrowHold = 0;

  var lastKey = 0;
  var keyTime = 0;
  var lastKeyId = 0;
  
  function isKdown(k) { return vecKey[k] == 1; }
  function isKeyDown(k) { return vecKey[k] == 1; }
  
  function onKeyDown(event)
  { event.preventDefault(); 
    vecKey[event.keyCode] = 1;
  }//onkdown
  
  function onKeyUp(event)
   {
     event.preventDefault(); 
     vecKey[event.keyCode] =  0; 
     lastKey = keyTime; 
     lastKeyId = event.keyCode;
     //console.log("lastkey ", lastKey, lastKeyId);
   }//onkup 
  
  document.addEventListener('keydown', onKeyDown , true);
  document.addEventListener('keyup',   onKeyUp, true);
  
  
  function clearKey()
  {
    var i;
    for (i=0;i<256;i+=1)
    { vecKey[i] = 0; }
  }//clearkey 
  
  function isAnyKeyDown()
  {
    var i;
    for (i=0;i<256;i+=1)
    {
      if (vecKey[i] == 1) { return true; }
    }
    return false;
  }//anydown
  
  
  var k_kup = key_w; 
  var k_kup_alt = key_up;
  
  var k_kdown = key_s; 
  var k_kdown_alt = key_down;
  
  var k_kleft= key_a; 
  var k_kleft_alt = key_left;
  
  var k_kright= key_d; 
  var k_kright_alt = key_right;
  
  function resetKeys()
  {
    k_kup = key_w; 
    k_kup_alt = key_up;
  
    k_kdown = key_s; 
    k_kdown_alt = key_down;
  
    k_kleft= key_a; 
    k_kleft_alt = key_left;
  
    k_kright= key_d; 
    k_kright_alt = key_right;
        
  }//reset 
   
   
   
   var knames = {};
    knames[37] = "Left";
    knames[38] = "Up";
    knames[39] = "Right";
    knames[40] = "Down";
    
    function getKname(k)
    { 
      var ret;
      ret= knames[k];
      if (ret != undefined){return ret; }

      ret = String.fromCharCode(k);
     // console.log("ret ", ret);
     return ret;
    }//getkname
    
    function isKeyAllowed(k)
    {
      if (k > 250) { return false;}
      if (k == 80) { return false; } //P
      if (k == 27) { return false; } //ESC
      
      if (k > 222) { return false; }
      
      
      return true;
    }//iskallowed
     
   
  function keyCheck()
  {      

     keyStrafeLeft = isKdown(key_a);
     keyStrafeRight = isKdown(key_d);
     
     keyUp =    (isKdown(k_kup) || isKdown(k_kup_alt));
     keyDown =  (isKdown(k_kdown) || isKdown(k_kdown_alt));
     keyLeft =  (isKdown(k_kleft) || isKdown(k_kleft_alt));
     keyRight = (isKdown(k_kright) || isKdown(k_kright_alt));
     
     keyFire =  (isKdown(key_n) || isKdown(key_z)||isKdown(key_y) ||isKdown(key_q));
     keyFire2 = (isKdown(key_m) || isKdown(key_x) );
     
     if (keyUp||keyDown||keyLeft||keyRight) { arrowHold += 1; }
     else { arrowHold = 0; }
     
     if (keyFire) { fireHold += 1; }
     else { fireHold = 0; }
     
     if (keyFire2) { fire2Hold += 1; }
     else { fire2Hold = 0; }
     
     
       
  }//keycheck

  