//import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Routes, Route} from 'react-router-dom';

import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import IndexPage from './components/IndexPage';
import ShowCountries from './components/ShowCountries';





function App() {
  return (
    <div className="App">
      <h1>Lil LoL</h1>

      <BrowserRouter>
        <Routes>
          
          
          <Route path='/' element={ <LoginForm/>} />
          <Route path='/register' element={ <RegisterForm/>} />
          <Route path='/index' element={ <IndexPage/>} />
          <Route path='/showCountries' element={ <ShowCountries/>} />
          
          
        </Routes>
      </BrowserRouter>




    </div>
  );
}

export default App;
