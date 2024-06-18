import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CreateDoador from './components/CreateDoador';
import CreateDoacao from './components/CreateDoacao';
import DoadorList from './components/DoadorList';
import DoacaoList from './components/DoacaoList';

function App() {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <nav className="mb-4 bg-gray-800 p-4 rounded-lg shadow-md">
          <ul className="flex space-x-4 justify-center">
            <li>
              <Link to="/" className="text-white hover:text-gray-300">Lista de Doadores</Link>
            </li>
            <li>
              <Link to="/doadores" className="text-white hover:text-gray-300">Criar Doador</Link>
            </li>
            <li>
              <Link to="/doacoes" className="text-white hover:text-gray-300">Criar Doação</Link>
            </li>
            <li>
              <Link to="/doacoes/list" className="text-white hover:text-gray-300">Lista de Doações</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<DoadorList />} />
          <Route path="/doadores" element={<CreateDoador />} />
          <Route path="/doacoes" element={<CreateDoacao />} />
          <Route path="/doacoes/list" element={<DoacaoList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
