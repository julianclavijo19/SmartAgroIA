import { useRef, useEffect, useState, useCallback } from "react";
import { Image as ImageIcon, X, Zap, ZapOff, RotateCcw } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Screen } from "../../types";

const MOCK_IMG =
  "https://images.unsplash.com/photo-1705704589320-2bf1a53bdab6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80";

interface Props {
  onNavigate: (s: Screen) => void;
  onCapture: (img: string | null) => void;
}

export function CameraScreen({ onNavigate, onCapture }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [cameraState, setCameraState] = useState<"loading" | "active" | "denied">("loading");
  const [flashOn, setFlashOn] = useState(false);
  const [facingMode, setFacingMode] = useState<"environment" | "user">("environment");

  const startCamera = useCallback(async (mode: "environment" | "user") => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    setCameraState("loading");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: mode, width: { ideal: 1280 }, height: { ideal: 720 } },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setCameraState("active");
    } catch {
      setCameraState("denied");
    }
  }, []);

  useEffect(() => {
    if (navigator.mediaDevices?.getUserMedia) {
      startCamera(facingMode);
    } else {
      setCameraState("denied");
    }
    return () => {
      streamRef.current?.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    };
  }, []);

  const handleFlipCamera = useCallback(() => {
    const next = facingMode === "environment" ? "user" : "environment";
    setFacingMode(next);
    startCamera(next);
  }, [facingMode, startCamera]);

  const stopAndGo = useCallback(
    (dest: Screen) => {
      streamRef.current?.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
      onNavigate(dest);
    },
    [onNavigate]
  );

  const handleCapture = useCallback(() => {
    if (cameraState === "active" && videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext("2d")?.drawImage(video, 0, 0);
      const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
      streamRef.current?.getTracks().forEach((t) => t.stop());
      onCapture(dataUrl);
    } else {
      streamRef.current?.getTracks().forEach((t) => t.stop());
      onCapture(null);
    }
  }, [cameraState, onCapture]);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        streamRef.current?.getTracks().forEach((t) => t.stop());
        onCapture(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    },
    [onCapture]
  );

  return (
    <div className="flex-1 relative bg-black overflow-hidden">
      {/* Camera preview or mock */}
      {cameraState === "loading" && (
        <div className="absolute inset-0 flex items-center justify-center bg-black">
          <div className="w-10 h-10 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        </div>
      )}

      {cameraState === "active" && (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {cameraState === "denied" && (
        <ImageWithFallback
          src={MOCK_IMG}
          alt="Vista previa de cultivo"
          className="absolute inset-0 w-full h-full object-cover opacity-90"
        />
      )}

      <canvas ref={canvasRef} className="hidden" />
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-5 pt-12 bg-gradient-to-b from-black/60 to-transparent z-10">
        <button
          onClick={() => stopAndGo("home")}
          className="w-10 h-10 rounded-full bg-black/40 backdrop-blur flex items-center justify-center active:scale-95 transition"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        <div className="flex gap-3">
          {cameraState === "active" && (
            <button
              onClick={handleFlipCamera}
              className="w-10 h-10 rounded-full bg-black/40 backdrop-blur flex items-center justify-center active:scale-95 transition"
            >
              <RotateCcw className="w-5 h-5 text-white" />
            </button>
          )}
          <button
            onClick={() => setFlashOn((f) => !f)}
            className="w-10 h-10 rounded-full bg-black/40 backdrop-blur flex items-center justify-center active:scale-95 transition"
          >
            {flashOn ? (
              <Zap className="w-5 h-5 text-yellow-300" />
            ) : (
              <ZapOff className="w-5 h-5 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Instruction */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 bg-black/55 backdrop-blur px-4 py-2 rounded-full z-10 whitespace-nowrap">
        <p className="text-[13px] text-white text-center">
          {cameraState === "active"
            ? "Apunta a la hoja o zona afectada"
            : "Sube una foto de tu cultivo"}
        </p>
      </div>

      {/* Frame guide */}
      <div className="absolute inset-x-12 top-1/2 -translate-y-1/2 aspect-square border-2 border-white/80 rounded-3xl z-10">
        {/* Corner accents */}
        <div className="absolute -top-0.5 -left-0.5 w-6 h-6 border-t-4 border-l-4 border-[#4CAF50] rounded-tl-2xl" />
        <div className="absolute -top-0.5 -right-0.5 w-6 h-6 border-t-4 border-r-4 border-[#4CAF50] rounded-tr-2xl" />
        <div className="absolute -bottom-0.5 -left-0.5 w-6 h-6 border-b-4 border-l-4 border-[#4CAF50] rounded-bl-2xl" />
        <div className="absolute -bottom-0.5 -right-0.5 w-6 h-6 border-b-4 border-r-4 border-[#4CAF50] rounded-br-2xl" />
      </div>

      {/* Bottom controls */}
      <div className="absolute bottom-0 left-0 right-0 px-8 pb-10 pt-8 bg-gradient-to-t from-black/70 to-transparent z-10">
        <div className="flex items-center justify-between">
          {/* Gallery / Upload */}
          <button
            onClick={() => fileRef.current?.click()}
            className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur flex items-center justify-center active:scale-95 transition"
          >
            <ImageIcon className="w-6 h-6 text-white" />
          </button>

          {/* Shutter */}
          <button
            onClick={handleCapture}
            className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-2xl active:scale-95 transition"
          >
            <div className="w-16 h-16 rounded-full border-[3px] border-[#2E7D32] bg-white" />
          </button>

          <div className="w-12 h-12" />
        </div>
        <p className="text-center text-white/70 text-[12px] mt-3">
          {cameraState === "active" ? "Toca para capturar" : "Captura de demostración"}
        </p>
      </div>
    </div>
  );
}
