import { useState } from 'react';
import api from '../services/api';

const Register = () => {
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    password: '',
    rol: 'ABOGADO'
  });

  const [error, setError] = useState('');

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/register', form); 
      alert('Registrado correctamente');
      window.location.href = '/';
    } catch (err) {
      setError('Error al registrar usuario');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Registrar usuario</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleRegister}>
        <input name="nombre" placeholder="Nombre" onChange={handleInput} required /><br />
        <input name="email" type="email" placeholder="Email" onChange={handleInput} required /><br />
        <input name="password" type="password" placeholder="Contraseña" onChange={handleInput} required /><br />
        <select name="rol" onChange={handleInput}>
          <option value="ABOGADO">ABOGADO</option>
          <option value="SECRETARIO">SECRETARIO</option>
        </select><br />
        <button type="submit">Registrarse</button>
      </form>
      <p>
        ¿Ya tenés cuenta? <a href="/">Iniciar sesión</a>
      </p>
    </div>
  );
};

export default Register;