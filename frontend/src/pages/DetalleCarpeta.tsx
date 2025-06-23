import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

const DetalleCarpeta = () => {
  const { id } = useParams();
  const [escritos, setEscritos] = useState([]);
  const [form, setForm] = useState({
    titulo: '',
    descripcion: '',
    archivo: null as File | null
  });

  useEffect(() => {
    cargarEscritos();
  }, []);

  const cargarEscritos = async () => {
    try {
      const res = await api.get(`/expedientes/${id}/escritos`);
      setEscritos(res.data);
    } catch (error) {
      alert('Error al obtener escritos');
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleArchivo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const archivo = e.target.files?.[0] || null;
    setForm({ ...form, archivo });
  };

  const subirEscrito = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('titulo', form.titulo);
    formData.append('descripcion', form.descripcion);
    if (form.archivo) {
      formData.append('archivo', form.archivo);
    }

    try {
      await api.post(`/expedientes/${id}/escritos`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setForm({ titulo: '', descripcion: '', archivo: null });
      cargarEscritos();
    } catch (error) {
      alert('Error al subir el escrito');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Movimientos de la carpeta #{id}</h2>

      <ul>
        {escritos.map((e: any) => (
          <li key={e.id}>
            📄 {e.titulo} — {e.descripcion} — <b>{e.creadoPor?.nombre}</b> ({e.creadoPor?.rol})
            {e.archivoUrl && (
              <>
                {' '}
                — <a href={`http://localhost:3000/${e.archivoUrl}`} target="_blank">Ver PDF</a>
              </>
            )}
          </li>
        ))}
      </ul>

      <hr />
      <h3>Nuevo escrito</h3>
      <form onSubmit={subirEscrito}>
        <input
          name="titulo"
          placeholder="Título"
          value={form.titulo}
          onChange={handleInput}
          required
        /><br />
        <textarea
          name="descripcion"
          placeholder="Descripción"
          value={form.descripcion}
          onChange={handleInput}
          required
        /><br />
        <input type="file" accept="application/pdf" onChange={handleArchivo} /><br />
        <button type="submit">Subir escrito</button>
      </form>
    </div>
  );
};

export default DetalleCarpeta;