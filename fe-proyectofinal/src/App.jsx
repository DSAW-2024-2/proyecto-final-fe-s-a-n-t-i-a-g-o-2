import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthPage from './pages/authPage';
import MainMenu from './pages/MainMenu';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/main" element={<MainMenu />} />
      </Routes>
    </Router>
  );
}

export default App;
