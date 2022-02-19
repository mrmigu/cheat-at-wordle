import { NavLink, Route, Routes } from 'react-router-dom';
import Statistics from './Statistics';
import Cheat from './Cheat';
import BestStartingWords from './BestStartingWords';
import './App.css';

function App() {
 
  return (
    <div className="App">
      <div className='header'>
        <div className='page_title'>CHEAT AT WORDLE</div>
        <div className='links'>
          <NavLink 
            className="nav_link" 
            to="/" 
            style={({ isActive }) => {
              return {
                fontWeight: isActive ? "900" : "normal"
              };
            }}
          >
            Cheat
          </NavLink>
          <NavLink 
            className="nav_link" 
            to="/bestwords" 
            style={({ isActive }) => {
              return {
                fontWeight: isActive ? "900" : "normal"
              };
            }}
          >
            Best Starging Words
          </NavLink>
          <NavLink 
            className="nav_link" 
            to="/stats" 
            style={({ isActive }) => {
              return {
                fontWeight: isActive ? "900" : "normal"
              };
            }}
          >
            Letter Statistics
          </NavLink>
        </div>
      </div>
      <div>
        <Routes>
          <Route path="/cheat-at-wordle/" element={<Cheat />} />
          <Route path="/cheat-at-wordle/stats" element={<Statistics />} />
          <Route path="/cheat-at-wordle/bestwords" element={<BestStartingWords />} />
        </Routes>
    </div>
    </div>
  );
}

export default App;
