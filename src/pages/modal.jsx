import React from 'react';
import { Modal as BootstrapModal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


const Modal = ({ character, onClose }) => {
  if (!character) return null;
  console.log(!character)

  return (
    <BootstrapModal show={true} onHide={onClose} size="lg" aria-labelledby={`modalPersonajeLabel-${character.id}`}>
      <BootstrapModal.Header>
        <BootstrapModal.Title id={`modalPersonajeLabel-${character.id}`}>
          {character.name.first} {character.name.last}
        </BootstrapModal.Title>
      </BootstrapModal.Header>
      <BootstrapModal.Body>
        <img src={character.images.main} alt={`${character.name.first} ${character.name.last}`} className="img-fluid mb-3" />
        <p><strong>Especie:</strong> {character.species}</p>
        <p><strong>Trabajo:</strong> {character.occupation}</p>
        <p><strong>Edad:</strong> {character.age}</p>
        <p><strong>Sexo:</strong> {character.gender}</p>
        <p><strong>Planeta natal:</strong> {character.homePlanet}</p>
        <p><strong>Frases:</strong></p>
        <ul>
          {character.sayings.map((saying, index) => (
            <li key={index}>{saying}</li>
          ))}
        </ul>
      </BootstrapModal.Body>
      <BootstrapModal.Footer>
        <Button variant="secondary" onClick={onClose}>Cerrar</Button>
      </BootstrapModal.Footer>
    </BootstrapModal>
  );
};

export default Modal;
