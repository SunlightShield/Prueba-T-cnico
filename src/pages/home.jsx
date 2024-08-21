import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  useEffect(() => {
    const dataPersonajes = async () => {
      try {
        const response = await axios.get('https://api.sampleapis.com/futurama/characters');
        setCharacters(response.data.slice(0, 9));
        console.log(response);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    dataPersonajes();
  }, []);

  const handleShowModal = (character) => {
    setSelectedCharacter(character);
    const modal = new window.bootstrap.Modal(document.getElementById('modalPersonaje'));
    modal.show();
  };

  if (loading) return <p>Obteniendo datos de la Api</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container">
      <header className="my-4">
        <h1 className="text-center">Bienvenido a Mi Aplicación</h1>
      </header>
      <main>
        <div className="row">
          {characters.map((character, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="card" onClick={() => handleShowModal(character)}>
                <img src={character.image} alt={`${character.name.first} ${character.name.last}`} className="card-img-top" />
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
        <p>&copy; 2024 Mi Aplicación. Todos los derechos reservados.</p>
      </footer>

      {/* Modal */}
      <div className="modal fade" id="modalPersonaje" tabIndex="-1" aria-labelledby="modalPersonajeLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalPersonajeLabel">
                {selectedCharacter?.name.first} {selectedCharacter?.name.last}
              </h5>
                </div>
            <div className="modal-body">
              <img src={selectedCharacter?.image} alt={`${selectedCharacter?.name.first} ${selectedCharacter?.name.last}`} className="img-fluid mb-3" />
              <p><strong>Especie:</strong> {selectedCharacter?.species}</p>
              <p><strong>Trabajo:</strong> {selectedCharacter?.occupation}</p>
              <p><strong>Edad:</strong> {selectedCharacter?.age}</p>
              <p><strong>Sexo:</strong> {selectedCharacter?.gender}</p>
              <p><strong>Descripción:</strong> {selectedCharacter?.description}</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
