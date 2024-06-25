import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_URL from '../config';

const DoacaoList = () => {
  const [doacoes, setDoacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');

  useEffect(() => {
    const fetchDoacoes = async () => {
      try {
        const response = await axios.get(`${API_URL}/doacoes`, {
          params: {
            nome: searchTerm,
            data_inicio: dataInicio,
            data_fim: dataFim
          }
        });
        setDoacoes(response.data);
      } catch (error) {
        setError('Erro ao buscar doações: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDoacoes();
  }, [searchTerm, dataInicio, dataFim]);

  if (loading) {
    return <div className="text-center">Carregando...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Lista de Doações</h2>
      <div className="flex space-x-4 mb-4">
        <input
          type="text"
          placeholder="Buscar doador..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 w-full"
        />
        <input
          type="date"
          placeholder="Data Início"
          value={dataInicio}
          onChange={(e) => setDataInicio(e.target.value)}
          className="border p-2"
        />
        <input
          type="date"
          placeholder="Data Fim"
          value={dataFim}
          onChange={(e) => setDataFim(e.target.value)}
          className="border p-2"
        />
      </div>
      {doacoes.length > 0 ? (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {doacoes.map((doacao, index) => (
            <li key={index} className="p-4 border rounded shadow">
              <p><strong>Volume:</strong> {doacao.volume} ml</p>
              <p><strong>Doador:</strong> {doacao.doador}</p>
              <p><strong>Data:</strong> {doacao.data}</p>
              <p><strong>Hora:</strong> {doacao.hora}</p>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center">Nenhuma doação encontrada.</div>
      )}
    </div>
  );
};

export default DoacaoList;
