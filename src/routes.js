import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './components/pages/Home';
import Formulario from './components/pages/Login';
import Teste from './components/pages/LoginCOpy';
import Cards from './components/pages/somarCard';
import Hooks from './components/pages/hooks';
import Name from './components/pages/names';
import Reduce from './components/pages/reduce';
function RoutesApp(){
    return(
        <BrowserRouter>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Teste/>}/>
            <Route path='/cards' element={<Cards/>}/>
            <Route path='/hooks' element={<Hooks/>}/>
            <Route path='/names' element={<Name/>}/>
            <Route path='/reduce' element={<Reduce/>}/>


        </Routes>
        </BrowserRouter>
    )
};

export default RoutesApp;



