

var showDelay = 0;


function showMsg_temp(ax, ay)
{
    drawLabel(ax,ay, 8, "message_box_line1"); ay+=8;
    drawLabel(ax,ay, 8, "message_box_line2"); ay+=8;
    drawLabel(ax,ay, 8, "message_box_line3"); ay+=8;
    drawLabel(ax,ay, 8, "message_box_line4"); ay+=8;
    drawLabel(ax,ay, 8, "message_box_line5"); ay+=8;
    drawLabel(ax,ay, 8, "message_box_line6"); ay+=8;
    drawLabel(ax,ay, 8, "message_box_line7"); ay+=8;                
    drawLabel(ax,ay, 8, "message_box_line8"); ay+=8;
    drawLabel(ax,ay, 8, "message_box_line9"); ay+=8;

}//showmsg


/*
function jellyMsgOld(ax, ay)
{

  // Jelly Doughnut
 // you know you shouldn't 
 // you know it's wrong 
 // but you must!
 // but just a little bite 
 // maybe another one
 // and another.. 
 // before you know it
 // it's all gone 
 // proceed with caution!

 var t; 
 var k; 
 t = 60; 
 k = 64;
 
    //drawLabel(ax,ay, 8, "delay ",showDelay); ay+=8; 
    if (showDelay<t) { return; }t+=k;
    drawLabel(ax,ay, 8, "You know you shouldn't.. "); ay+=8; 
 //   if (showDelay<t) { return; }t+=k;
 //   drawLabel(ax,ay, 8, "..but you must!"); ay+=8;
    if (showDelay<t) { return; }t+=k;
    drawLabel(ax,ay, 8, "..but maybe.."); ay+=8;
    if (showDelay<t) { return; }t+=k;
    drawLabel(ax,ay, 8, "just a little bite .."); ay+=8;
    if (showDelay<t) { return; }t+=k;
    drawLabel(ax,ay, 8, "won't hurt"); ay+=8;
    if (showDelay<t) { return; }t+=k;
    drawLabel(ax,ay, 8, "and another.. "); ay+=8;
    if (showDelay<t) { return; }t+=k;
    drawLabel(ax,ay, 8, "and another.. "); ay+=8;
    if (showDelay<t) { return; }t+=k;
    drawLabel(ax,ay, 8, "just a little nib "); ay+=8;
    if (showDelay<t) { return; }t+=k;
    drawLabel(ax,ay, 8, ""); ay+=8;
    drawLabel(ax,ay, 8, "before you know it.."); ay+=8;
    if (showDelay<t) { return; }t+=k;
    drawLabel(ax,ay, 8, "It's all gone! "); ay+=8;                
    if (showDelay<t) { return; }t+=k;
    drawLabel(ax,ay, 8, ""); ay+=8;
    if (showDelay<t) { return; }t+=k;
    drawLabel(ax,ay, 8, ""); ay+=8;
    drawLabel(ax,ay, 8, "Proceed with caution!"); ay+=8;
 
}//showmsg
*/

var mstime = 3; //5;



var msg1 = "You know it's not \na good idea .. \nbut you must! \n   \nJust a tiny little\nbite.. a tiny one\n maybe another \n  \nbut before \n you know it.. \n     \nIt's all gone!";
var msg2 = "Toiling away endlessly\non their little machines \nthe slaves work hard\n daydreaming about\n possible freedom \n  \nYet after taking \na closer look \nyou might find \nthat they actually \nlike it here";
var msg3 = " I have seen the Devil!\n\n   \n There was fire \n in its eyes .. \n \n and deep frying \n on its mind!";
var msg4 = "Some get so angry\nthey might explode\non a moments notice!";
var msg5 = "Questions run through\n your head:\nHow did I get here?\nWhat am i doing here?\nWho is keeping me here?\nAnd most importantly..\n\nHow do i get out?\n\n\n..\n       \nWait..    \n\nis that a giant key?";
var msg6 = "This might seem \n tricky but the solution \n is devilishly \n simple \n \n \n (They are surprisingly \n docile when \n pushed around) ";
var msg7 = "Meetings tend \n  to get ugly.. \n \n \n .. \n \n \nbut this one is \n the mother of \n all wars! ";
var msg8 = "Well done! \n Freedom awaits!";
var msg9 = "Protip: be careful!";

var vecMsg = ["zero",msg1,msg2,msg3,msg4,msg5,msg6,msg7,msg8,msg9];

function strMsg(ax, ay, str)
{
  var n;
  n = str.length;
  var t;
  t = showDelay - 10;
  if (t<0) { return; }
  t /= mstime;
  if (t > n) { t= n; }
  str = str.substr(0, t);
  
 drawLabel(ax,ay, 8, str); ay+=8;
  
 return n *mstime + 10;  
  
}//strmsg 


 
function noMsg(ax, ay)
{
  
  
   drawLabel(ax,ay, 8, "Message not found  "); ay+=8; 
  
}//nomsg

function drawMsg()
{
  var sd; 
  var ax, ay;
    ax = 64; ay = 64;
    
  var fx; var fy;
  fx = 200+16;
  fy = 160;  
  
  var t;
  t = showDelay > 10 ? 10 : showDelay;
  t /= 10;
  t = 1 - t;
  fx *= t;
  fy *= t;
    
    ctx.fillStyle = "#000000";
//    ctx.fillRect(ax-16,ay-8,200+16,160);
    ctx.fillRect(ax-16+fx/2,ay-8+fy/2,200+16-fx,160-fy);

    sd = 32;
    
    if (showMsg  > 0) { sd = strMsg(ax,ay, vecMsg[showMsg]); }
    
    /*
    if (showMsg == 1) { sd = jellyMsg(ax,ay) ; }
    else if (showMsg == 2) { sd = nerdMsg(ax,ay) ; }
    else { noMsg(ax,ay); }
    */
    
    ay = (64+160) - 24;
    
    
    //actual press delay is 32
    if (showDelay>sd)
    {
      if (showDelay < 130000) { showDelay = 130001; }
      if ( (showDelay&16) == 0)
      { drawLabel(ax,ay, 8, "press a key "); ay+=8; }
    }
  
}//drawmsg


