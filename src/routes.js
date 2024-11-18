import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './components/pages/Home';
import Formulario from './components/pages/Login';
import Teste from './components/pages/LoginCOpy';
import Cards from './components/pages/somarCard';
function RoutesApp(){
    return(
        <BrowserRouter>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Teste/>}/>
            <Route path='/cards' element={<Cards/>}/>
        </Routes>
        </BrowserRouter>
    )
};

export default RoutesApp;



