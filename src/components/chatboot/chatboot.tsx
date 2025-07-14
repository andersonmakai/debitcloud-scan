import { useState, useRef, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';

const comandos: { [key: string]: string | (() => void) } = {
  "criar fatura": () => alert("Abrindo criação de fatura..."),
  "adicionar despesa": () => alert("Abrindo adição de despesa..."),
  "ver relatórios": () => alert("Mostrando relatórios..."),
  "abrir clientes": () => alert("Abrindo clientes..."),
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
  const [gravando, setGravando] = useState(false);
  const [tempo, setTempo] = useState(0);
  const recognitionRef = useRef<any>(null);
  /*const intervaloRef = 77useRef<NodeJS.Timeout | null>(null);*/
  const intervaloRef = useRef<ReturnType<typeof setInterval> | null>(null);


  const toggleChat = () => setAberto(prev => !prev);

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

  const iniciarGravacao = () => {
    if (typeof window === "undefined") return;

    const recognitionConstructor =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!recognitionConstructor) {
      alert("Seu navegador não suporta reconhecimento de voz.");
      return;
    }

    const rec = new recognitionConstructor();
    recognitionRef.current = rec;

    rec.lang = "pt-PT";
    rec.continuous = false;
    rec.interimResults = false;

    rec.onresult = (event: any) => {
      const texto = event.results[0][0].transcript;
      setMensagem(texto);
      setResposta(prev => [...prev, `🎙️ ${texto}`]);
      tratarMensagem(texto);
      pararGravacao();
    };

    rec.onerror = (e: any) => {
      console.error("Erro no microfone:", e);
      pararGravacao();
    };

    rec.start();
    setGravando(true);
    setTempo(0);
    intervaloRef.current = setInterval(() => setTempo(prev => prev + 1), 1000);
  };

  const pararGravacao = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setGravando(false);
    if (intervaloRef.current) {
      clearInterval(intervaloRef.current);
      intervaloRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (intervaloRef.current) {
        clearInterval(intervaloRef.current);
      }
    };
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
            {gravando && <div className="text-danger">🎤 Gravando... {tempo}s</div>}
          </div>
          <div className="card-footer d-flex gap-2">
            <Form.Control
              type="text"
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
              placeholder="Digite um comando..."
            />
            <Button variant="success" onClick={handleEnviar}>Enviar</Button>
            <Button
              variant={gravando ? "danger" : "secondary"}
              onClick={gravando ? pararGravacao : iniciarGravacao}
            >
              {gravando ? "⏹️" : "🎤"}
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
