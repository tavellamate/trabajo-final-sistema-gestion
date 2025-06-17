import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import HomePage from './pages/HomePage';
import Register from './pages/Register';
import DetalleCarpeta from './pages/DetalleCarpeta';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/carpeta/:id" element={<DetalleCarpeta />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;