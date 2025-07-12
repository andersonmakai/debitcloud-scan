import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';

const comandos: { [key: string]: string | (() => void) } = {
  // Funções simuladas
  "criar fatura": () => alert("Abrindo criação de fatura..."),
  "adicionar despesa": () => alert("Abrindo adição de despesa..."),
  "ver relatórios": () => alert("Mostrando relatórios..."),
  "abrir clientes": () => alert("Abrindo clientes..."),

  // Saudações e interações comuns
  "olá": "Olá! Como posso te ajudar hoje?",
  "bom dia": "Bom dia! Pronto para começar?",
  "boa tarde": "Boa tarde! No que posso ajudar?",
  "boa noite": "Boa noite! Deseja fechar o dia com algum relatório?",
  "tudo bem": "Tudo ótimo! E contigo?",
  "quem és tu": "Sou seu assistente virtual aqui no DebitCloud.",
  "ajuda": "Você pode dizer coisas como: criar fatura, adicionar despesa, abrir clientes..."
};


export default function Chatbot() {
  const [aberto, setAberto] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [resposta, setResposta] = useState<string[]>([]);

  const toggleChat = () => setAberto(!aberto);

  const tratarMensagem = (msg: string) => {
    const mensagemLower = msg.toLowerCase();
  
    const chaveEncontrada = Object.keys(comandos).find(key =>
      mensagemLower.includes(key)
    );
  
    if (chaveEncontrada) {
      const acao = comandos[chaveEncontrada];
      if (typeof acao === "function") {
        acao();
        setResposta(prev => [...prev, `🤖 Executando: ${chaveEncontrada}`]);
      } else {
        setResposta(prev => [...prev, `🤖 ${acao}`]);
      }
    } else {
      setResposta(prev => [
        ...prev,
        "🤖 Desculpa, não entendi esse comando. Tente dizer algo como 'criar fatura' ou 'ver relatórios'."
      ]);
    }
  };
  
      

  const handleEnviar = () => {
    if (!mensagem.trim()) return;
    setResposta(prev => [...prev, `🧑‍💻 ${mensagem}`]);
    tratarMensagem(mensagem);
    setMensagem("");
  };

  // 🎙️ Voz (API Web Speech)
  useEffect(() => {
    const recognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!recognition) return;

    const rec = new recognition();
    rec.lang = "pt-PT";
    rec.continuous = false;
    rec.interimResults = false;

    rec.onresult = (event: any) => {
      const texto = event.results[0][0].transcript;
      setMensagem(texto);
      setResposta(prev => [...prev, `🎙️ ${texto}`]);
      tratarMensagem(texto);
    };

    const btn = document.getElementById("microfone");
    if (btn) {
      btn.onclick = () => rec.start();
    }
  }, []);

  return (
    <>
      {/* Botão flutuante */}
      <Button
        onClick={toggleChat}
        variant="primary"
        className="rounded-circle"
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          width: "56px",
          height: "56px",
          zIndex: 1000
        }}
      >
        💬
      </Button>

      {/* Janela do chatbot */}
      {aberto && (
        <div
          className="card shadow"
          style={{
            position: "fixed",
            bottom: "90px",
            right: "20px",
            width: "320px",
            zIndex: 999
          }}
        >
          <div className="card-header bg-primary text-white">Assistente IA</div>
          <div className="card-body" style={{ maxHeight: "300px", overflowY: "auto" }}>
            {resposta.map((msg, i) => (
              <div key={i} className="mb-2">{msg}</div>
            ))}
          </div>
          <div className="card-footer d-flex gap-2">
            <Form.Control
              type="text"
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
              placeholder="Digite um comando..."
            />
            <Button variant="success" onClick={handleEnviar}>Enviar</Button>
            <Button variant="secondary" id="microfone">🎤</Button>
          </div>
        </div>
      )}
    </>
  );
}
