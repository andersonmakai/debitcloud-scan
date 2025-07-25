import { useEffect, useRef, useState } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import { Button, Card, Spinner, Alert } from "react-bootstrap";
import { createWorker } from "tesseract.js";

const Scan = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [carregando, setCarregando] = useState(false);
  const [textoOCR, setTextoOCR] = useState("");

  // Ativar a câmera ao carregar
  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { exact: 'environment' } },
          audio: false,
        });
  
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error('Erro ao acessar câmera:', err);
      }
    };
  
    startCamera();
  
    return () => {
      // Encerrar a câmera ao desmontar o componente
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);
  

  // Tirar foto e processar com OCR
  const capturarEProcessar = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const dataUrl = canvas.toDataURL("image/png");

    setCarregando(true);
    setTextoOCR("🔍 Processando...");

    const worker = await createWorker(["por"]);
    const result = await worker.recognize(dataUrl);
    await worker.terminate();

    setTextoOCR(result.data.text || "Nada encontrado.");
    setCarregando(false);
  };

  return (
    <DashboardLayout>
      <h3 className="fw-bold mb-3">📷 Scanner em tempo real</h3>

      <Card className="p-3 mb-4 shadow-sm">
      <video
  ref={videoRef}
  autoPlay
  playsInline
  style={{
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    objectFit: 'cover',
    zIndex: 9999,
  }}
/>

        <canvas ref={canvasRef} style={{ display: "none" }} />

        <Button
          className="mt-3"
          variant="primary"
          onClick={capturarEProcessar}
          disabled={carregando}
        >
          {carregando ? <><Spinner size="sm" animation="border" /> Processando</> : "📸 Escanear Agora"}
        </Button>
      </Card>

      {textoOCR && (
        <Alert variant="light" style={{ whiteSpace: "pre-wrap" }}>
          <strong>📝 Texto extraído:</strong><br />
          {textoOCR}
        </Alert>
      )}
    </DashboardLayout>
  );
};

export default Scan;
