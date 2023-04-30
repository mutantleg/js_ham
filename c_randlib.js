

    var randHigh = 1;
    var randLow = 5961124214214;
    
    function getRand()
    {
      randHigh = (randHigh>>2) + ( randHigh<<2);
      //randHigh += 66;
      //need to convert to integer with | 0
      //otherwise we get NaN
      randHigh = (randHigh + randLow) | 0;
      randLow += randHigh;
      
      if (randHigh == 0) {randHigh+=3;}
      
      var ret;
      ret = (randHigh % 32768) / 32768.0;
      if (ret<0.0){ ret =-ret;}
      if (ret>1.0) { ret = 1.0; }
      return ret;      
    }//getrand 
    
    function getRand2()
    {
      return getRand() - 0.5;      
    }//getrand2
    
    function setRandSeed(seed)
    {
      randHigh = seed;
      randLow = seed * 5961124214;      
    }//setRandSeed
    


