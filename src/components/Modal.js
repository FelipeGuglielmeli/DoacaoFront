import React from 'react';

const Modal = ({ onClose, doacoes, doador }) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg mx-4 relative animate-fade-in">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h2 className="text-2xl font-bold mb-4 text-center">Doações de {doador.nome}</h2>
        {doacoes.length > 0 ? (
          <ul>
            {doacoes.map((doacao, index) => (
              <li key={index} className="mb-4 p-4 border rounded-lg bg-gray-50">
                <p><strong>Data:</strong> {doacao.data}</p>
                <p><strong>Hora:</strong> {doacao.hora}</p>
                <p><strong>Volume:</strong> {doacao.volume} ml</p>
                <p><strong>Situação:</strong> {doacao.situacao}</p>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center">Nenhuma doação encontrada.</div>
        )}
      </div>
    </div>
  );
};

export default Modal;
