import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import mapIcon from '../misc/mapIcon';
import mapMarkerImg from '../images/map-marker.svg';
import api from '../services/api';

import '../styles/pages/orphanages-map.css';

interface Orphanage {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
}

export default function OrphanagesMap() {

  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

  useEffect(() => {
    api.get('orphanages').then(response => {
      setOrphanages(response.data);
    })
  }, [])

  return (
    <div id="page-map">
      <aside>

        <header>
          <img src={mapMarkerImg} alt="Map Marker" />

          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>

        <footer>
          <strong>São Paulo</strong>
          <span>São Paulo</span>
        </footer>
      </aside>

      <Map
        center={[-23.5504723, -46.6339025]} //Marco zero (Praça da Sé)
        zoom={15}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer url="http://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Mapbox tem temas mais bonitos, porém é necessário criar conta e criar token de acesso
            Não esquecer de criar um .env e adicionar no .gitignore
            */}
        {/* <TileLayer 
        url= {`https://api.mapbox.com/styles/v1/mapbox/light-v10/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
        /> */}

        {orphanages.map(orphanage => {
          return (
            <Marker
              icon={mapIcon}
              position={[orphanage.latitude, orphanage.longitude]}
              key={orphanage.id}
            >
              <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                {orphanage.name}
              <Link to={`/orphanage/${orphanage.id}`}>
                  <FiArrowRight size={29} color="#FFF" />
                </Link>
              </Popup>
            </Marker>
          )
        })}

        {/* <Marker
          icon={mapIcon}
          position={[-23.5504723, -46.6339025]}
        >
          <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
            Nome do orfanato
            <Link to="/orphanages/1">
              <FiArrowRight size={29} color="#FFF" />
            </Link>
          </Popup>
        </Marker> */}

      </Map>

      <Link to="/orphanages/create" className="create-orphanage">
        <FiPlus size={32} color="#FFF" />
      </Link>
    </div>
  );
}