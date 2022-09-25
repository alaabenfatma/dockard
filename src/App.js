import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

import Main from './pages/main';
import NotFound from './pages/NotFound';
import NavBar from './components/NavBar';
function App() {
  return (
    <div className="App">
        <NavBar />
       
      <div style={{
        height: '100%',
        overflow: 'hidden',
        top: "128px",
        }}>
          <Router>
            <Routes>
              <Route path="/" element={<Main />} />

              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </div>
    </div>
  );
}

export default App;
