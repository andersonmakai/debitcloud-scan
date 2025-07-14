import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Header from '../components/Header';
import EmpresaCard from '../components/EmpresaCard';
import AdicionarModal from '../components/AdicionarModal';

export type Documento = {
  empresa: File[];
  funcionarios: File[];
  clientes: File[];
};

export type Empresa = {
  nome: string;
  nif: string;
  sector: string;
  pais: string;
  moeda: string;
  data: string;
  email?: string;
  telefone?: string;
  endereco?: string;
  documento?: Documento;
  _id?: string;
};

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [empresas, setEmpresas] = useState<Empresa[]>([{
    nome: "MakInvest",
    nif: "500000000",
    sector: "Construção",
    pais: "Angola",
    moeda: "Kz",
    data: "2025-06-29",
    email: "makinvest@email.com",
    telefone: "999999999",
    endereco: "Rua Principal, Luanda",
    documento: {
      empresa: [],
      funcionarios: [],
      clientes: []
    }
  }]);

  const navigate = useNavigate();

  const handleAbrir = (empresa: Empresa) => {
    localStorage.setItem("empresaSelecionada", JSON.stringify(empresa));
    navigate("/dashboard");
  };

  function adicionarEmpresa(novaEmpresa: Empresa) {
    setEmpresas(prev => [...prev, novaEmpresa]);
  }

  return (
    <div>
      <Header />

      <main className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="mb-0">Empresas</h2>
          <div className="d-flex gap-2">
            <button className="btn btn-danger btn-sm">Remover empresa</button>
            <button className="btn btn-primary btn-sm" onClick={() => navigate("/cadastro")}>
                Adicionar empresa
            </button>
          </div>
        </div>

        <div className="input-group mb-4">
          <input type="text" className="form-control" placeholder="Pesquisar empresa..." disabled />
          <span className="input-group-text bg-light">🔍</span>
        </div>

        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {empresas.map((empresa, index) => (
            <EmpresaCard
              key={index}
              nome={empresa.nome}
              atividade={empresa.sector}
              nif={empresa.nif}
              index={index}
              onAbrir={() => handleAbrir(empresa)}
            />
          ))}
        </div>
      </main>

      <AdicionarModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onAdicionar={adicionarEmpresa}
      />
    </div>
  );
}
