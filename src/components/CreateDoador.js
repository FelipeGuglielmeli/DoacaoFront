import React, { useState } from 'react';
import axios from 'axios';

const CreateDoador = () => {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [contato, setContato] = useState('');
  const [tipoSanguineo, setTipoSanguineo] = useState('');
  const [rh, setRh] = useState('');
  const [tipoRhCorretos, setTipoRhCorretos] = useState(false);
  const [situacao, setSituacao] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/doadores', {
        nome,
        cpf,
        contato,
        tipo_sanguineo: tipoSanguineo,
        rh,
        tipo_e_rh_corretos: tipoRhCorretos,
        situacao,
      });
      setMensagem(response.data.message);
      setNome('');
      setCpf('');
      setContato('');
      setTipoSanguineo('');
      setRh('');
      setTipoRhCorretos(false);
      setSituacao('');
    } catch (error) {
      setMensagem('Erro ao criar doador: ' + error.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Criar Doador</h2>
      {mensagem && <p className="text-center text-red-500 mb-4">{mensagem}</p>}
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <div className="mb-6">
          <label className="block text-gray-700">Nome</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="border p-3 w-full rounded"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700">CPF</label>
          <input
            type="text"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            className="border p-3 w-full rounded"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700">Contato</label>
          <input
            type="text"
            value={contato}
            onChange={(e) => setContato(e.target.value)}
            className="border p-3 w-full rounded"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700">Tipo Sanguíneo</label>
          <select
            value={tipoSanguineo}
            onChange={(e) => setTipoSanguineo(e.target.value)}
            className="border p-3 w-full rounded"
            required
          >
            <option value="">Selecione</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="AB">AB</option>
            <option value="O">O</option>
          </select>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700">RH</label>
          <select
            value={rh}
            onChange={(e) => setRh(e.target.value)}
            className="border p-3 w-full rounded"
            required
          >
            <option value="">Selecione</option>
            <option value="positivo">Positivo</option>
            <option value="negativo">Negativo</option>
          </select>
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
        <div className="mb-6">
          <label className="block text-gray-700">
            <input
              type="checkbox"
              checked={tipoRhCorretos}
              onChange={(e) => setTipoRhCorretos(e.target.checked)}
              className="mr-2"
            />
            Tipo e RH corretos
          </label>
        </div>
        <button
          type="submit"
          className={`bg-blue-500 text-white p-3 rounded w-full ${!tipoRhCorretos && 'opacity-50 cursor-not-allowed'}`}
          disabled={!tipoRhCorretos}
        >
          Criar
        </button>
      </form>
    </div>
  );
};

export default CreateDoador;
