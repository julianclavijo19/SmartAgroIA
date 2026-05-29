import { useEffect, useState } from "react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

const DEFAULT_IMG =
  "https://images.unsplash.com/photo-1681570299226-764d535d5e38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80";

const STEPS = [
  "Detectando bordes y color...",
  "Identificando patrones de plaga...",
  "Consultando base de datos IA...",
  "Generando diagnóstico...",
];

interface Props {
  capturedImage: string | null;
  onComplete: () => void;
}

export function AnalyzingScreen({ capturedImage, onComplete }: Props) {
  const [stepIndex, setStepIndex] = useState(0);
  const DURATION = 3500;

  useEffect(() => {
    const interval = setInterval(() => {
      setStepIndex((i) => (i < STEPS.length - 1 ? i + 1 : i));
    }, DURATION / STEPS.length);

    const timer = setTimeout(onComplete, DURATION);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden">
      {/* Captured image with scan effect */}
      <div className="h-[45%] relative overflow-hidden flex-shrink-0">
        <ImageWithFallback
          src={capturedImage || DEFAULT_IMG}
          alt="Cultivo capturado"
          className="w-full h-full object-cover"
        />
        {/* Green overlay */}
        <div className="absolute inset-0 bg-[#2E7D32]/10" />
        {/* Scanning line */}
        <motion.div
          className="absolute inset-x-0 h-[3px] bg-gradient-to-r from-transparent via-[#66BB6A] to-transparent shadow-[0_0_20px_#66BB6A]"
          initial={{ top: "0%" }}
          animate={{ top: ["0%", "100%", "0%"] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(#4CAF50 1px, transparent 1px), linear-gradient(90deg, #4CAF50 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
      </div>

      {/* Analysis panel */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 gap-6">
        {/* Spinning loader */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="w-20 h-20 rounded-full border-4 border-[#E8F5E9] border-t-[#2E7D32] flex items-center justify-center"
        >
          <Sparkles className="w-7 h-7 text-[#2E7D32]" />
        </motion.div>

        <div className="text-center">
          <h3 className="text-[18px] font-semibold text-[#1B5E20]">Analizando tu cultivo...</h3>
          <motion.p
            key={stepIndex}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[14px] text-neutral-500 mt-1"
          >
            {STEPS[stepIndex]}
          </motion.p>
        </div>

        {/* Progress bar */}
        <div className="w-full h-2 bg-[#E8F5E9] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-[#2E7D32] rounded-full"
            initial={{ width: "5%" }}
            animate={{ width: "95%" }}
            transition={{ duration: DURATION / 1000 - 0.2, ease: "easeOut" }}
          />
        </div>

        {/* Step dots */}
        <div className="flex gap-2">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i <= stepIndex ? "bg-[#2E7D32] w-5" : "bg-neutral-200 w-1.5"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
