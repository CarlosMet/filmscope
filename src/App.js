import {Route, Routes} from 'react-router-dom'
import './App.css';
import ThemeSwitch from './features/ThemeSwitch';
import Login from './components/Login';
import { List } from './components/List';
import Header from './components/Header';
import Footer from './components/Footer';
import Detail from './components/Detail';
import Favorites from './components/Favorites';

function App() {
  function addRevoveFav() {
    console.log('added')
  }

  return (
    <div className="App dark:bg-[#0f0f0f] dark:text-slate-300">        
      <Routes>
        <Route path='/filmscope' element={<Login />} />
        <Route path='/filmscope/list' element={<List />} />
        <Route path='/filmscope/detail' element={<Detail />} />  
        <Route path='/filmscope/favs' element={<Favorites />} /> 
      </Routes>      
      <Footer />
    </div>
  );
}

export default App;
