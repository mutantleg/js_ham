

    var fxRandHigh = 1;
    var fxRandLow = 5961124214214;
    
    function fxRand()
    {
      fxRandHigh = (fxRandHigh>>2) + ( fxRandHigh<<2);
      //fxRandHigh += 66;
      //need to convert to integer with | 0
      //otherwise we get NaN
      fxRandHigh = (fxRandHigh + fxRandLow) | 0;
      fxRandLow += fxRandHigh;
      
      if (fxRandHigh == 0) {fxRandHigh+=3;}
      
      var ret;
      ret = (fxRandHigh % 32768) / 32768.0;
      if (ret<0.0){ ret =-ret;}
      if (ret>1.0) { ret = 1.0; }
      return ret;      
    }//getfxRand 
    
    function fxRand2()
    {
      return fxRand() - 0.5;      
    }//getfxRand2
    
    function setFxRandSeed(seed)
    {
      fxRandHigh = seed;
      fxRandLow = seed * 5961124214;      
    }//setfxRandSeed
    


