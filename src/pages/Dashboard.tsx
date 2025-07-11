import { Container, Row, Col, Card } from 'react-bootstrap';

export default function Dashboard() {
  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      {/* Menu lateral */}
      <aside className="bg-dark text-white p-3" style={{ width: '240px' }}>
        <h5 className="mb-4 fw-bold">MakInvest ERP</h5>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <a className="nav-link text-white" href="#">📊 Dashboard</a>
          </li>
          <li className="nav-item mb-2">
            <a className="nav-link text-white" href="#">👥 Clientes</a>
          </li>
          <li className="nav-item mb-2">
            <a className="nav-link text-white" href="#">📦 Produtos</a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white" href="#">📈 Relatórios</a>
          </li>
        </ul>
      </aside>

      {/* Conteúdo principal */}
      <div className="flex-grow-1">
        {/* Menu superior */}
        <nav className="d-flex justify-content-between align-items-center p-3 border-bottom bg-white">
          <div className="d-flex align-items-center gap-4">
            <span>🤖 IA</span>
            <a href="#" className="nav-link fw-bold text-primary">Faturação</a>
            <a href="#" className="nav-link text-dark">Fiscal</a>
            <a href="#" className="nav-link text-dark">Inventário</a>
            <a href="#" className="nav-link text-dark">Contabilidade</a>
          </div>
          <span>👤</span>
        </nav>

        {/* Cards de resumo */}
        <Container className="py-4">
          <Row className="g-4">
            <Col md={6} lg={3}>
              <Card className="shadow-sm">
                <Card.Body>
                  <Card.Title>Documentos</Card.Title>
                  <h3>12</h3>
                  <p className="text-muted mb-0">Este mês</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={3}>
              <Card className="shadow-sm">
                <Card.Body>
                  <Card.Title>Receita</Card.Title>
                  <h3>40.000 Kz</h3>
                  <p className="text-muted mb-0">Este mês</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={3}>
              <Card className="shadow-sm">
                <Card.Body>
                  <Card.Title>Despesas</Card.Title>
                  <h3>18.000 Kz</h3>
                  <p className="text-muted mb-0">Este mês</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={3}>
              <Card className="shadow-sm">
                <Card.Body>
                  <Card.Title>Valor em stock</Card.Title>
                  <h3>95.000 Kz</h3>
                  <p className="text-muted mb-0">Total disponível</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
