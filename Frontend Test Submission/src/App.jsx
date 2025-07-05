import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css'
import Header from '../component/Header';
import Hero from '../component/Hero';
import Landingpage from '../component/Landingpage';
import Contact from '../component/contact';
import About from '../component/About';
import Services from '../component/services';
function App() {

  return (
    <>
        <BrowserRouter>
    <Routes>
       <Route path='/' element={<Landingpage/>}/>
      <Route path='/hero' element={<Hero/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/services' element={<Services/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
