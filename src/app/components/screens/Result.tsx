import { ImageWithFallback } from "../figma/ImageWithFallback";
import {
  ArrowLeft,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Leaf,
  Share2,
  BookmarkCheck,
  Camera,
} from "lucide-react";
import { ScanRecord, Screen } from "../../types";

interface Props {
  record: ScanRecord | null;
  isSaved: boolean;
  onNavigate: (s: Screen) => void;
  onSave: () => void;
}

const SEVERITY_CONFIG = {
  Sano: {
    label: "Planta sana",
    barW: "30%",
    barColor: "#4CAF50",
    textColor: "#2E7D32",
    bgColor: "#E8F5E9",
    Icon: CheckCircle2,
  },
  Moderado: {
    label: "Afección moderada",
    barW: "60%",
    barColor: "#FFB300",
    textColor: "#E65100",
    bgColor: "#FFF3E0",
    Icon: AlertTriangle,
  },
  Severo: {
    label: "Afección severa",
    barW: "95%",
    barColor: "#E53935",
    textColor: "#C62828",
    bgColor: "#FFEBEE",
    Icon: XCircle,
  },
} as const;

export function ResultScreen({ record, isSaved, onNavigate, onSave }: Props) {
  if (!record) {
    return (
      <div className="flex-1 flex items-center justify-center bg-white">
        <p className="text-neutral-400">Sin diagnóstico disponible</p>
      </div>
    );
  }

  const cfg = SEVERITY_CONFIG[record.severity];
  const SevIcon = cfg.Icon;

  return (
    <div className="flex-1 flex flex-col bg-[#FAFAFA] overflow-hidden">
      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto">
        {/* Image header */}
        <div className="relative h-52 flex-shrink-0">
          <ImageWithFallback
            src={record.img}
            alt="Hoja analizada"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent" />
          <button
            onClick={() => onNavigate("history")}
            className="absolute top-12 left-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow active:scale-95 transition"
          >
            <ArrowLeft className="w-5 h-5 text-[#1B5E20]" />
          </button>
          <button className="absolute top-12 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow active:scale-95 transition">
            <Share2 className="w-4.5 h-4.5 text-[#1B5E20]" />
          </button>

          {/* IA badge */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-[#2E7D32] px-3 py-1 rounded-full flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span className="text-[11px] text-white font-semibold">Analizado por IA</span>
          </div>
        </div>

        {/* Diagnosis card */}
        <div className="px-5 -mt-5 relative z-10">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-neutral-100">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-[11px] text-neutral-400 uppercase tracking-wide font-semibold">
                  Diagnóstico · {record.date}
                </p>
                <h3 className="text-[20px] font-bold text-neutral-900 mt-1">{record.diagnosis}</h3>
                {record.scientificName && (
                  <p className="text-[13px] text-neutral-400 italic mt-0.5">{record.scientificName}</p>
                )}
                <p className="text-[13px] text-neutral-500 mt-1">
                  Cultivo: <span className="font-semibold text-neutral-700">{record.crop}</span>
                </p>
              </div>
              <div
                className="px-3 py-1.5 rounded-xl flex items-center gap-1.5 flex-shrink-0"
                style={{ backgroundColor: cfg.bgColor }}
              >
                <SevIcon className="w-4 h-4" style={{ color: cfg.textColor }} />
                <span className="text-[12px] font-bold" style={{ color: cfg.textColor }}>
                  {record.severity}
                </span>
              </div>
            </div>

            {/* Severity bar */}
            <div className="mt-4">
              <div className="flex justify-between mb-1.5">
                <span className="text-[11px] text-neutral-400">Nivel de afección</span>
                <span className="text-[11px] font-semibold" style={{ color: cfg.textColor }}>
                  {cfg.label}
                </span>
              </div>
              <div className="h-2 rounded-full bg-neutral-100 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: cfg.barW, background: cfg.barColor }}
                />
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-[10px] text-neutral-300">Sano</span>
                <span className="text-[10px] text-neutral-300">Moderado</span>
                <span className="text-[10px] text-neutral-300">Severo</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="px-5 mt-5 pb-5">
          <h4 className="text-[16px] font-semibold text-neutral-900 mb-3">
            Recomendaciones
          </h4>
          <div className="space-y-2.5">
            {record.recommendations.map((rec, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-3.5 border border-neutral-100 flex items-start gap-3"
              >
                <div className="w-9 h-9 rounded-lg bg-[#E8F5E9] flex items-center justify-center flex-shrink-0">
                  <Leaf className="w-4 h-4 text-[#2E7D32]" />
                </div>
                <p className="text-[14px] text-neutral-700 leading-snug pt-1">{rec}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action bar */}
      <div className="px-5 py-4 bg-white border-t border-neutral-100 flex gap-3 flex-shrink-0">
        <button
          onClick={() => onNavigate("camera")}
          className="flex items-center justify-center gap-2 flex-1 py-3.5 rounded-2xl border-2 border-[#2E7D32] text-[#2E7D32] text-[15px] font-semibold active:scale-[0.98] transition"
        >
          <Camera className="w-4 h-4" />
          Nuevo
        </button>
        <button
          onClick={isSaved ? () => onNavigate("history") : onSave}
          className={`flex items-center justify-center gap-2 flex-1 py-3.5 rounded-2xl text-[15px] font-semibold shadow-md active:scale-[0.98] transition ${
            isSaved
              ? "bg-[#E8F5E9] text-[#2E7D32] shadow-none"
              : "bg-[#2E7D32] text-white"
          }`}
        >
          <BookmarkCheck className="w-4 h-4" />
          {isSaved ? "Ver historial" : "Guardar"}
        </button>
      </div>
    </div>
  );
}
