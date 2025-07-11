import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import CriarEmpresaForm from './CriarEmpresaForm';

type Empresa = {
  nome: string;
  nif: string;
  sector: string;
  pais: string;
  moeda: string;
  data: string;
};

type Props = {
  show: boolean;
  onHide: () => void;
  onAdicionar: (nova: Empresa) => void;
};

export default function AdicionarModal({ show, onHide, onAdicionar }: Props) {
  const [showForm, setShowForm] = useState(false);

  function abrirFormularioManual() {
    setShowForm(true);
  }

  function handleFecharTudo() {
    setShowForm(false);
    onHide();
  }

  return (
    <>
      <Modal show={show} onHide={onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>Adicionar Empresa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-grid gap-3">
            <Button variant="outline-primary" onClick={abrirFormularioManual}>Criar manualmente</Button>
            <Button variant="outline-secondary" onClick={() => alert('Importar arquivo')}>Importar</Button>
            <Button variant="outline-success" onClick={() => alert('Modo automático com IA')}>Automático (com IA)</Button>
          </div>
        </Modal.Body>
      </Modal>

      <CriarEmpresaForm
        show={showForm}
        onHide={handleFecharTudo}
        onSalvar={onAdicionar}
      />
    </>
  );
}
