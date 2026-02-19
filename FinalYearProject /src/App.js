
import {  BrowserRouter, Route, Router, Routes } from 'react-router-dom';

import Donerreg from './Donerreg'
import Wantedreg from './Wantedreg';
import Navbar from './Navbar';
import Donertable from './Donertable';
import Wantedtable from './Wantedtable';



function App() {
  

  return (
    <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path='/' element={<Donerreg/>} />
          <Route path='/Donertable' element={<Donertable/>}/>
          <Route path='/Wantedreg' element={<Wantedreg/>} />
          <Route path='/Wantedtable' element={<Wantedtable/>} />
        </Routes>
        </BrowserRouter>  
      
    
  );
}

export default App;
