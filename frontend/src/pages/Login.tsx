import { useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const res = await api.post('/auth/login', { email, password }); // ⬅️ CORREGIDO
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('usuario', JSON.stringify(res.data.usuario));
    window.location.href = '/home';
  } catch (err) {
    setError('Credenciales inválidas');
  }
};

  return (
    <div style={{ padding: 20 }}>
      <h2>Iniciar sesión</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} /><br />
        <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} /><br />
        <button type="submit">Entrar</button>
      </form>
      <p>¿No tenés cuenta? <Link to="/register">Registrarse</Link></p>
    </div>
  );
};

export default Login;