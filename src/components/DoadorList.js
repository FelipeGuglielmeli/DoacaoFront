import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from './Modal';

const DoadorList = () => {
  const [doadores, setDoadores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDoador, setSelectedDoador] = useState(null);
  const [doacoes, setDoacoes] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchDoadores = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/doadores');
        setDoadores(response.data);
      } catch (error) {
        setError('Erro ao buscar doadores: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDoadores();
  }, []);

  const handleDoadorClick = async (doador) => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/doacoes/doador/${doador.id}`);
      setDoacoes(response.data);
      setSelectedDoador(doador);
      setModalOpen(true);
    } catch (error) {
      setError('Erro ao buscar doações do doador: ' + error.message);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedDoador(null);
    setDoacoes([]);
  };

  const filteredDoadores = doadores.filter(doador =>
    doador.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="text-center">Carregando...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Lista de Doadores</h2>
      <input
        type="text"
        placeholder="Buscar doador..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 mb-4 w-full"
      />
      {filteredDoadores.length > 0 ? (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDoadores.map((doador) => (
            <li key={doador.id} className="p-4 border rounded shadow cursor-pointer hover:bg-gray-100" onClick={() => handleDoadorClick(doador)}>
              {doador.nome}
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center">Nenhum doador encontrado.</div>
      )}
      {modalOpen && selectedDoador && (
        <Modal onClose={closeModal} doacoes={doacoes} doador={selectedDoador} />
      )}
    </div>
  );
};

export default DoadorList;
