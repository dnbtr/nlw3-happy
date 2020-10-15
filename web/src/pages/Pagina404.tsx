import React from 'react';
import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';

import Sidebar from '../components/Sidebar';

import '../styles/pages/pagina-404.css';

export default function Pagina404() {

  return (
    <div id="pagina-404">
      <Sidebar />

      <h1 className="text">Página não encontrada :(</h1>

      <Link to="/orphanages/create" className="create-orphanage">
        <FiPlus size={32} color="#FFF" />
      </Link>
    </div>
  );
}