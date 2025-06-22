import React, { useEffect, useState } from "react";
import type { FormEvent } from "react";

type Causa = {
  id: number;
  tipo: string;
  cliente: string;
  resumen: string;
};

const BuscadorCausas: React.FC = () => {
  const [causas, setCausas] = useState<Causa[]>([]);
  const [tipo, setTipo] = useState("");
  const [cliente, setCliente] = useState("");
  const [palabra, setPalabra] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [nuevoTipo, setNuevoTipo] = useState("");
  const [nuevoCliente, setNuevoCliente] = useState("");
  const [nuevoResumen, setNuevoResumen] = useState("");

  // buscar causas
  const buscarCausas = async (e?: FormEvent) => {
    if (e) e.preventDefault();
    const params = new URLSearchParams();
    if (tipo) params.append("tipo", tipo);
    if (cliente) params.append("cliente", cliente);
    if (palabra) params.append("palabra", palabra);

    const res = await fetch(
      "http://localhost:3000/api/causas/buscar?" + params
    );
    const data = await res.json();
    setCausas(data);
  };

  // agregar causa
  const agregarCausa = async (e: FormEvent) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3000/api/causas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tipo: nuevoTipo,
        cliente: nuevoCliente,
        resumen: nuevoResumen,
      }),
    });
    if (res.ok) {
      setMensaje("Causa agregada correctamente.");
      setNuevoTipo("");
      setNuevoCliente("");
      setNuevoResumen("");
      buscarCausas();
    } else {
      setMensaje("Error al agregar causa.");
    }
    setTimeout(() => setMensaje(""), 3000);
  };

  // eliminar causa
  const eliminarCausa = async (id: number) => {
    if (!window.confirm("¿Seguro que deseas eliminar esta causa?")) return;
    const res = await fetch(`http://localhost:3000/api/causas/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setMensaje("Causa eliminada correctamente.");
      buscarCausas();
    } else {
      setMensaje("Error al eliminar causa.");
    }
    setTimeout(() => setMensaje(""), 3000);
  };

  useEffect(() => {
    buscarCausas();
  }, []);

  return (
    <div style={{ maxWidth: 600, margin: "auto" }}>
      <h2>Agregar Causa</h2>
      <form onSubmit={agregarCausa}>
        Tipo:{" "}
        <input
          type="text"
          value={nuevoTipo}
          onChange={(e) => setNuevoTipo(e.target.value)}
          required
        />
        <br />
        Cliente:{" "}
        <input
          type="text"
          value={nuevoCliente}
          onChange={(e) => setNuevoCliente(e.target.value)}
          required
        />
        <br />
        Resumen:{" "}
        <input
          type="text"
          value={nuevoResumen}
          onChange={(e) => setNuevoResumen(e.target.value)}
          required
        />
        <br />
        <button type="submit">Agregar</button>
      </form>
      <div>{mensaje}</div>
      <hr />

      <h2>Buscar Causas</h2>
      <form onSubmit={buscarCausas}>
        Tipo:{" "}
        <input
          type="text"
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
        />
        <br />
        Cliente:{" "}
        <input
          type="text"
          value={cliente}
          onChange={(e) => setCliente(e.target.value)}
        />
        <br />
        Palabra:{" "}
        <input
          type="text"
          value={palabra}
          onChange={(e) => setPalabra(e.target.value)}
        />
        <br />
        <button type="submit">Buscar</button>
      </form>
      <br />
      <table border={1} style={{ borderCollapse: "collapse", minWidth: 400 }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tipo</th>
            <th>Cliente</th>
            <th>Resumen</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {causas.length ? (
            causas.map((causa) => (
              <tr key={causa.id}>
                <td>{causa.id}</td>
                <td>{causa.tipo}</td>
                <td>{causa.cliente}</td>
                <td>{causa.resumen}</td>
                <td>
                  <button onClick={() => eliminarCausa(causa.id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} style={{ textAlign: "center" }}>
                Sin resultados
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BuscadorCausas;