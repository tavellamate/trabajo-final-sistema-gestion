import { useEffect, useState } from 'react';
import api from '../services/api';

interface Carpeta {
  id: number;
  tipo: string;
  cliente: string;
  resumen: string;
}

const HomePage = () => {
  const [carpetas, setCarpetas] = useState<Carpeta[]>([]);
  const [form, setForm] = useState({ tipo: '', nombre: '', resumen: '' });

  const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
  const token = localStorage.getItem('token');

  useEffect(() => {
  if (!token) {
    window.location.href = '/';
    return;
  }

  api.get('/causas/buscar')
    .then(res => setCarpetas(res.data))
    .catch(err => {
      console.error('Error al cargar causas:', err);
      alert('Error al cargar las carpetas');
    });
}, []);


  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const crearCarpeta = async () => {
    try {
      const res = await api.post<Carpeta>('/causas', {
        tipo: form.tipo,
        cliente: form.nombre,
        resumen: form.resumen,
      });

      setCarpetas((prev: Carpeta[]) => [...prev, res.data]); // ✅ TIPADO CORRECTO
      setForm({ tipo: '', nombre: '', resumen: '' }); // Limpiar inputs
    } catch {
      alert('Error al crear la carpeta');
    }
  };
      const eliminarCarpeta = async (id: number) => {
        if (!window.confirm('¿Estás seguro que querés eliminar esta carpeta?')) return;

        try {
        await api.delete(`/causas/${id}`);
          setCarpetas(prev => prev.filter(c => c.id !== id));
        } catch {
        alert('Error al eliminar la carpeta');
        }
};


  const logout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <div style={{ padding: 20 }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h3>Bienvenido, {usuario?.nombre}</h3>
        <div>
          <button onClick={() => window.location.href = '/home'}>Carpetas</button>
          <button onClick={logout}>Cerrar sesión</button>
        </div>
      </nav>

      <h2>Carpetas</h2>
      <ul>
        {carpetas.map((c) => (
          <li key={c.id}>
            <a href={`/carpeta/${c.id}`}>
              📁{c.tipo} – Cliente: {c.cliente} – {c.resumen}
            </a>
            <button onClick={() => eliminarCarpeta(c.id)} style={{ marginLeft: '10px' }}>
              ❌ Eliminar
            </button>
          </li>
        ))}
      </ul>

      <hr />
      <h3>Crear nueva carpeta</h3>
      <input name="tipo" placeholder="Tipo" value={form.tipo} onChange={handleInput} />
      <input name="nombre" placeholder="Cliente" value={form.nombre} onChange={handleInput} />
      <input name="resumen" placeholder="Resumen" value={form.resumen} onChange={handleInput} />
      <button onClick={crearCarpeta}>Crear carpeta</button>
    </div>
  );
};

export default HomePage;