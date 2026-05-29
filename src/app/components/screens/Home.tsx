import { Camera, History, Sprout, Sun, TrendingUp } from "lucide-react";
import { BottomNav } from "../BottomNav";
import { Screen } from "../../types";

interface Props {
  onNavigate: (s: Screen) => void;
  scanCount: number;
}

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Buenos días";
  if (h < 18) return "Buenas tardes";
  return "Buenas noches";
}

export function HomeScreen({ onNavigate, scanCount }: Props) {
  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden">
      {/* Header */}
      <div className="px-6 pt-12 pb-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[14px] text-neutral-500">{getGreeting()},</p>
            <h2 className="text-[22px] font-bold text-[#1B5E20]">Don Carlos</h2>
          </div>
          <div className="w-11 h-11 rounded-full bg-[#E8F5E9] flex items-center justify-center">
            <Sun className="w-5 h-5 text-[#2E7D32]" />
          </div>
        </div>

        {/* Stats strip */}
        <div className="mt-4 bg-[#F1F8F2] rounded-2xl p-3 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#2E7D32] flex items-center justify-center flex-shrink-0">
            <TrendingUp className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[12px] text-neutral-500">Total de escaneos</p>
            <p className="text-[15px] font-bold text-[#1B5E20]">{scanCount} análisis realizados</p>
          </div>
        </div>
      </div>

      {/* Main actions */}
      <div className="flex-1 px-6 flex flex-col justify-center gap-4 overflow-y-auto pb-4">
        {/* Scan button */}
        <button
          onClick={() => onNavigate("camera")}
          className="w-full rounded-3xl bg-gradient-to-br from-[#2E7D32] to-[#1B5E20] text-white flex flex-col items-center justify-center gap-3 shadow-xl shadow-green-200 active:scale-[0.98] transition py-8"
        >
          <div className="w-16 h-16 rounded-2xl bg-white/15 flex items-center justify-center">
            <Camera className="w-9 h-9" strokeWidth={2.2} />
          </div>
          <div className="text-center">
            <span className="block text-[19px] font-semibold">Escanear Cultivo</span>
            <span className="block text-[13px] text-white/80 mt-0.5">Detecta plagas al instante con IA</span>
          </div>
        </button>

        {/* Quick actions */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => onNavigate("history")}
            className="rounded-2xl bg-[#F1F8F2] border border-[#E8F5E9] p-4 flex flex-col items-start gap-2 active:scale-[0.98] transition text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center">
              <History className="w-5 h-5 text-[#2E7D32]" />
            </div>
            <span className="text-[15px] font-semibold text-[#1B5E20]">Mi Historial</span>
            <span className="text-[12px] text-neutral-500">{scanCount} escaneos</span>
          </button>

          <button
            onClick={() => onNavigate("profile")}
            className="rounded-2xl bg-[#F1F8F2] border border-[#E8F5E9] p-4 flex flex-col items-start gap-2 active:scale-[0.98] transition text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center">
              <Sprout className="w-5 h-5 text-[#2E7D32]" />
            </div>
            <span className="text-[15px] font-semibold text-[#1B5E20]">Mi Perfil</span>
            <span className="text-[12px] text-neutral-500">Don Carlos R.</span>
          </button>
        </div>

        {/* Tip card */}
        <div className="rounded-2xl bg-white border border-[#C8E6C9] p-4 flex gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#E8F5E9] flex items-center justify-center flex-shrink-0">
            <span className="text-[18px]">💡</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-semibold text-[#1B5E20]">Consejo del día</p>
            <p className="text-[12px] text-neutral-500 mt-0.5 leading-snug">
              Escanea tus plantas en las mañanas con buena luz para mejores resultados.
            </p>
          </div>
        </div>
      </div>

      <BottomNav active="home" onNavigate={onNavigate} />
    </div>
  );
}
