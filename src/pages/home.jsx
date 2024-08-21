import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Modal from './modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

const Home = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams(); 

  // obtencion de data mediante un axios
  useEffect(() => {
    const dataCharacter = async () => {
      try {
        const response = await axios.get('https://api.sampleapis.com/futurama/characters');
        setCharacters(response.data.slice(0, 9));
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    dataCharacter();
  }, []);

  // buscamos el id para pasar al modal
  useEffect(() => {
    if (id) {
      const character = characters.find((char) => char.id === parseInt(id, 10));
      setSelectedCharacter(character || null); 
    } else {
      setSelectedCharacter(null);
    }
  }, [id, characters]);

  //le paso el id al modal para que cambie la URL
  const handleShowModal = (character) => {
    navigate(`/character/${character.id}`);
  };

  const handleCloseModal = () => {
    navigate('/');
  };

  // en caso de que la api se caiga o falle
  if (loading) return <p>Obteniendo datos de la Api</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container">
      <header className="my-4">
        <h1 className="text-center">Prueba Técnica Sebastián Espinoza</h1>
      </header>
      <main>
        <div className="row">
          {/* se hace un map para renderizar las cards */}
          {characters.map((character) => (
            <div key={character.id} className="col-md-4 mb-4">
              <div
                className="card h-100"
                style={{ backgroundImage: `url(${character.images.main})` }}
                onClick={() => handleShowModal(character)}
              >
                {/* se renderiza la informacion principal */}
                <div className="card-body">
                  <h5 className="card-title">{character.name.first} {character.name.last}</h5>
                  <p className="card-text">Especie: {character.species}</p>
                  <p className="card-text">Trabajo: {character.occupation}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <footer className="text-center mt-4">
        <p>Por Sebastián Espinoza</p>
      </footer>

      {/* solo se muestra el modal si se encontró el ID */}
      {selectedCharacter && (
        <Modal character={selectedCharacter} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default Home;
