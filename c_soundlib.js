

 //there doesnt seem to be default panning .. making 3D sounds tricky 
 //(it seems every browser has a different way to do it .. nice)

 var vecSnd = {};
 
 var curMus;
 var mastVol = 1.0;
 var sndVol = 1.0;
 var musVol = 0.25;
 var muteVol = 1.0; // 0.0 to mute 
 
 //listener pos 
 var listx = 0.0;
 var listy = 0.0;
 var listz = 0.0;
 var listDist = 512.0;
 
// 26*5 + 3  //133
 var volTab = [
   0.00,    0.001,   0.002,   0.003,   0.004,
   0.005,   0.01,    0.011,   0.012,   0.013,
   0.014,   0.015,   0.016,   0.02,    0.021,
   0.022,   0.023,   0.024,   0.025,   0.03,
   0.031,   0.032,   0.033,   0.034,   0.04,
   0.041,   0.042,   0.043,   0.044,   0.05,
   0.051,   0.052,   0.053,   0.054,   0.06,
   0.061,   0.062,   0.063,   0.064,   0.07,
   0.071,   0.072,   0.073,   0.08,    0.081,
   0.082,   0.083,   0.084,   0.09,    0.091,
   0.092,   0.093,   0.094,   0.10,    0.101,
   0.102,   0.103,   0.11,    0.111,   0.112,
   0.113,   0.12,    0.121,   0.122,   0.123,
   0.124,   0.13,    0.131,   0.132,   0.14,
   0.141,   0.142,   0.143,   0.15,    0.151,
   0.152,   0.16,    0.161,   0.162,   0.17,
   0.171,   0.172,   0.18,    0.181,   0.19,
   0.191,   0.192,   0.20,    0.201,   0.21,
   0.211,   0.22,    0.221,   0.23,    0.231,
   0.24,    0.25,    0.251,   0.26,    0.27,
   0.271,   0.28,    0.29,    0.30,    0.301,
   0.31,    0.32,    0.33,    0.34,    0.35,
   0.36,    0.37,    0.38,    0.39,    0.40,
   0.41,    0.43,    0.50,    0.60,    0.65,
   0.70,    0.75,    0.80,    0.85,    0.90,
   0.95,    0.97,    0.99
   ];//voltab 

function getLinearVol(val)
{
   //so its not logged volume 
   //but not linear either .. ??
   return val; 
 
   if(val <= 0.0) { return 0.0; }
   if(val >= 1.0) { return 1.0; } 
   var v;
   v = volTab[Math.floor(132 * val)];
   console.log("linearvol ",val,"ret ", v);
   return v;
   
}//getlinearvol 


   
 
 function setListen(ax,ay,az)
 { listx=ax;listy=ay;listz=az; }
 
 function resetVol()
 {
   mastVol = 1.0;
   sndVol = 1.0;
   musVol = 0.25;

 }//resetvol
 
 
 function pauseAllSnd()
 {
  // console.log("vecsnd ", vecSnd); 
   var a;
   for (var i in vecSnd) {
    //console.log("vecsnd i ", i, vecSnd[i]);
    a = vecSnd[i];
    a.pause();
   }//nexti 
 }//pauseall 
 
 function resumeAllSnd()
 {
   /*
   for (var i in vecSnd) {
    a = vecSnd[i];
    if (a.paused) //not a good indicator 
    { a.play(); }
   }//nexti */
   if (curMus != undefined)
   { curMus.play(); }
   
 }//resumeallsnd 
 
 function loadSound(srcName, sndName, npool)
 {
  var aud =  new Audio(srcName);
   aud.autoplay = false; 
   vecSnd[sndName] = aud;   
   
   var i; var num;
   num = npool
   if (num == undefined) { return; }
   if (num < 1) { num = 1; }
   if (num > 8) { num = 8;}
   for (i=0;i<num;i+=1)
   {
    var a; a = new Audio(srcName);
    vecSnd[sndName+"_alt"+i] = a;
   }//nexti 
 }//loadsound 
 
 
 function getSnd(sndName)
 {
   var a;    var i; 
   a = vecSnd[sndName];
   if (a==undefined) { return undefined; }
   if (a.currentTime <= 0 || a.paused) { return a; }
   for (i=0;i<3;i+=1)
   {
    a = vecSnd[sndName+"_alt"+i];
      if (a == undefined) { continue; }    
     if (a.currentTime <= 0 || a.paused) { return a; }     
   }//nexti 
   a = vecSnd[sndName];
   return a;
 }//getsnd  
 
 
 function playSnd(sndName, vol)
 {
   var a;
   //a = vecSnd[sndName];
   a = getSnd(sndName);
   if (a==undefined) { return; }
   if (muteVol < 1) { return; }
      
   a.currentTime = 0;
   a.loop = false;
   a.volume = getLinearVol( vol * mastVol * sndVol * muteVol );
   a.play();
  // console.log("playsnd a ",gt, a);
 }//playsound
 
 function sndMag3(ax,ay,az)
 { return Math.sqrt(ax*ax+ay*ay+az*az); }
 
 function playSnd3(sndName, vol, ax, ay, az)
 {
   var a;
  // a = vecSnd[sndName];
   a = getSnd(sndName);
   if (a==undefined) { return; }
   if (muteVol < 1) { return; }
   
   var d;
   d = sndMag3(listx-ax, listy-ay, listz-az);
   d = 1.0 - ( d / listDist);
    if (d < 0.0) { d = 0.0; }
    if (d > 1.0) { d = 1.0; }
    if (d <= 0.0) { return; }
   
   vol *= d;   
   
   a.loop = false;
   a.volume = getLinearVol( vol * mastVol * sndVol * muteVol );
   if (a.paused) { a.play(); }
   else { a.currentTime = 0; }
 }//playsnd3
 
 
 function recalMusVol()
 {
   if (curMus == undefined) { return; }
   curMus.volume = getLinearVol( 1.0 * mastVol * musVol * muteVol );
    
 }//recalmus 
 
 function playMus(sndName)
 {
   var a;
   a = vecSnd[sndName];
   if (a==undefined) { return; }
   
   if (curMus != undefined)
   { curMus.stop(); }
   curMus = a; 
   
   a.loop = true;
   a.volume = getLinearVol( 1.0 * mastVol * musVol * muteVol );
   a.play();
 }//playmus 









 

