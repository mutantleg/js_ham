

  var vecAct = [];
  var mapAct = {};
  var curId = 1;
  var playerId = -1;
  
  var vecBull = [];
  

  function clearAct()
  {
    playerId = -1;
    curId = 1; //tman is 1 start at 3 //update tman is now actor
    vecAct = [];
    vecBull = [];
    mapAct = {};
    //todo -- clear array
  }//resetact
  
  function getAct(id)
  {
    a = mapAct[id];
    if (a==undefined){ a = 0; }
    if (a.id !=id) {return 0; }
    return a;
  }//getact 
  
  
  function getEmptAct()
  {
    var a;
        a = { 
          cx:0, cy:0, cz:0, 
          vx:0, vy:0, vz:0,
          tx:0, ty:0,
          ang:0,
          pitch:0,
          id:-1,
          hp:10,
          team:0,
          spec:0,  
          crad:8,  
          size:16,
          dmg:5,
          reload:0,
          wait:0,
          yoff:0,
          walkFrame:0,
          sprName:"beast",
          lastSee:0,
          ownerid:-1,
          visible:true,
          xmir:false,
          ymir:false,
          dead:false 
        };
     return a;
  }//getemptact
  
  
  function addAct()
  {
    var a;
    a = getEmptAct();
    a.id = curId;
    curId +=1;
    mapAct[a.id] = a;    
    vecAct.push(a);    
    return a;
  }//addact
  
  
  function addBull()
  {    
    var a;
     a = getEmptAct();
     a.id = curId;
     curId +=1;
     vecBull.push(a);    
    return a;
  }//addbull
  
  
  function cleanAct(vec)
  {
   // return;
    var i; var num; var a; var k; var nk;
    num = vec.length | 0; 
    for (i=0;i<num;i+=1)
    {
      a = vec[i];
      if (a.dead)
      {
        for (k=i;k<num;k+=1)
        { vec[k] = vec[k+1]; }
        vec.pop();
        i -= 1; num -=1;   
        delete mapAct[a.id];
        continue;        
      }
    }//nexti    
   // console.log("cleanact ",gt," vec" ,vec);
   //console.log("cleanact ",gt," map " ,mapAct);
  }//cleanact 
  
  /*
  function updateAct(vec)
  {
    var i; var num; var a;
    var bclean = false;
    num = vec.length | 0; 
    
    for (i=0; i < num;i+=1)
    {
      a = vec[i];
      if (a.dead){ bclean=true; continue;}
     
     // if (a.spec == 1) { upPlayer(a); continue; }
    //  if (a.spec == 3) { upMonst(a); continue; }
     // if (a.spec == 99) { upBlock(a); continue; }
    
    }//nexti 
    if (bclean) { cleanAct(vec); }
  }//updateact
  */

  /*
  function drawAct(vec)
  {
    var i; var num; var a;
    num = vec.length | 0; 
    for (i=0; i < num;i+=1)
    {
      a = vec[i];
     
    
    }//nexti   
  }//drawact
 */
 
 /*
  function getMagx(ax,ay)
  {  if(ax<0){ax=-ax;} if (ay<0){ay=-ay;}  if (ax>ay){return ax; } return ay;  }
 
  function getMag3(ax, ay, az)
  { return Math.sqrt(ax*ax + ay*ay + az*az);  }
  */

 