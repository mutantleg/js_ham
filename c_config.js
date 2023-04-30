


var frameSkip = 0;

function loadConfig()
{
  
  console.log("loadconfig ", keyTime);
  
 if ( localStorage.mastVol != undefined)    { mastVol = localStorage.mastVol;       }
 if ( localStorage.sndVol != undefined)     { sndVol = localStorage.sndVol;         }
 if ( localStorage.musVol != undefined)     { musVol = localStorage.musVol;         } 
 if ( localStorage.muteVol != undefined)    { muteVol = localStorage.muteVol;       }
 if ( localStorage.mouseSpeed != undefined) { mouseSpeed = localStorage.mouseSpeed; }
 if ( localStorage.frameSkip != undefined)  { frameSkip = localStorage.frameSkip;   }
  


 if ( localStorage.k_kup != undefined)      { k_kup = localStorage.k_kup;   }
 if ( localStorage.k_kup_alt != undefined)  { k_kup_alt = localStorage.k_kup_alt;   }
  
 if ( localStorage.k_kdown != undefined)      { k_kdown = localStorage.k_kdown;   }
 if ( localStorage.k_kdown_alt != undefined)  { k_kdown_alt = localStorage.k_kdown_alt;   }
 
 if ( localStorage.k_kleft != undefined)      { k_kleft = localStorage.k_kleft;   }
 if ( localStorage.k_kleft_alt != undefined)  { k_kleft_alt = localStorage.k_kleft_alt;   }
 
 if ( localStorage.k_kright != undefined)      { k_kright = localStorage.k_kright;   }
 if ( localStorage.k_kright_alt != undefined)  { k_kright_alt = localStorage.k_kright_alt;   }
 

}//loadconfig

function saveConfig()
{
  console.log("saveconfig ", keyTime);
  
 localStorage.mastVol = mastVol;
 localStorage.sndVol = sndVol;
 localStorage.musVol = musVol;
 localStorage.muteVol = muteVol;
 localStorage.mouseSpeed = mouseSpeed;
 localStorage.frameSkip = frameSkip;
 
   localStorage.k_kup = k_kup;
   localStorage.k_kup_alt = k_kup_alt;
   
   localStorage.k_kdown = k_kdown;
   localStorage.k_kdown_alt = k_kdown_alt;
   
   localStorage.k_kleft = k_kleft;
   localStorage.k_kleft_alt = k_kleft_alt;
   
   localStorage.k_kright = k_kright;
   localStorage.k_kright_alt = k_kright_alt;
   

  
}//saveconfig 
