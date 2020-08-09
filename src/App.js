import React from 'react';

import {  BrowserRouter as Router } from "react-router-dom";

import Main from "./main";

function App() {
    
    return(
        
       <div className="col-sm-8 col-sm-offset-2">
          <Router>
            <Main/>
          </Router>       
       </div> 
    );

  
}

export default App;
