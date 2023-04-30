

//https://developer.mozilla.org/en-US/docs/Web/API/ImageData
//imagedata is     width   height     data   (data is Uint8ClampedArray )

  // https://stackoverflow.com/questions/10754661/javascript-getting-imagedata-without-canvas
  //thanks to chrome we cannot do this

  var sprImage;

   //loading the image itself is blocked .. 
  function loadImageToSpr(imgName)
  {
    var img= new Image();    
    img.src = imgName;
    img.crossOrigin = "Anonymous"; //doesnt work
    img.onload = function()  
    {
      console.log("image loaded ", sprImage);
    }
    sprImage = img;
  }//loadimagetoskin
  
  function loadImage(imgName)
  {
    var img= new Image();    
    img.src = imgName;
    img.crossOrigin = "Anonymous"; //doesnt work
    img.onload = function()  
    {
      console.log("image loaded ", this);
    }
    return img;
  }//loadimage 
  
  
  function drawSpr(spname, ax, ay)
  {
    a = vecSpr[spname];
    if ( a == undefined) { return; }
    
    ctx.drawImage(sprImage,  a.x,a.y,a.sw,a.sh, 
    ax-a.sw*0.5, ay-a.sh*0.5,  a.sw, a.sh);
  }//drawspr 
  
  // ang     -- angle in radians  (to deg: 45*(3.1415/180.0) )
  // scx scy -- scale  e.g. scx -1 for mirror horizontally
  function drawSprAdv(spname, ax, ay, ang, scx, scy)
  {
    a = vecSpr[spname];
    if ( a == undefined) { return; }
    ctx.save();
    ctx.translate(ax|0, ay|0);
    ctx.rotate(ang);
    ctx.scale(scx, scy);
    ctx.drawImage(sprImage,  a.x, a.y,a.sw,a.sh, 
    -a.sw*0.5, -a.sh*0.5,  a.sw, a.sh);
    ctx.restore();
  }//drawspradv
  

  
  function drawSprRect(spname, ax, ay, aw, ah)
  {
    a = vecSpr[spname];
    if ( a == undefined) { return; }
    
    ctx.drawImage(sprImage,  a.x,a.y,a.sw,a.sh, 
    ax, ay,  aw, ah);
  }//drawsprrect
  
  

    
    