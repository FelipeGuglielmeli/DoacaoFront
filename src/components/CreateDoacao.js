import React, { useState } from 'react';
import axios from 'axios';
import API_URL from '../config';

const CreateDoacao = () => {
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');
  const [volume, setVolume] = useState('');
  const [idDoador, setIdDoador] = useState('');
  const [situacao, setSituacao] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/doacoes`, {
        data,
        hora,
        volume,
        id_doador: idDoador,
        situacao,
      });
      setMensagem(response.data.message);
      setData('');
      setHora('');
      setVolume('');
      setIdDoador('');
      setSituacao('');
    } catch (error) {
      setMensagem('Erro ao criar doação: ' + error.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Criar Doação</h2>
      {mensagem && <p className="text-center text-red-500 mb-4">{mensagem}</p>}
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <div className="mb-6">
          <label className="block text-gray-700">Data</label>
          <input
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
            className="border p-3 w-full rounded"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700">Hora</label>
          <input
            type="time"
            value={hora}
            onChange={(e) => setHora(e.target.value)}
            className="border p-3 w-full rounded"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700">Volume</label>
          <input
            type="number"
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
            className="border p-3 w-full rounded"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700">ID do Doador</label>
          <input
            type="number"
            value={idDoador}
            onChange={(e) => setIdDoador(e.target.value)}
            className="border p-3 w-full rounded"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700">Situação</label>
          <select
            value={situacao}
            onChange={(e) => setSituacao(e.target.value)}
            className="border p-3 w-full rounded"
            required
          >
            <option value="">Selecione</option>
            <option value="ativo">Ativo</option>
            <option value="inativo">Inativo</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-3 rounded w-full"
        >
          Criar
        </button>
      </form>
    </div>
  );
};

export default CreateDoacao;
