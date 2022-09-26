import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

import Main from './pages/main';
import NotFound from './pages/NotFound';
import About from './pages/About';
import NavBar from './components/NavBar';
function App() {
  return (
    <div className="App">
        <NavBar />
       
      <div style={{
        height: '100%',
        overflow: 'hidden',
        }}>
          <Router>
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/about" element={<About />} />
              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </div>
    </div>
  );
}

export default App;
