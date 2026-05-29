import { Leaf } from "lucide-react";
import { Screen } from "../../types";

interface Props {
  onNavigate: (s: Screen) => void;
}

export function SplashScreen({ onNavigate }: Props) {
  return (
    <div className="flex-1 flex flex-col items-center justify-between px-8 py-14 bg-gradient-to-b from-[#E8F5E9] via-white to-white">
      <div className="flex-1 flex flex-col items-center justify-center gap-5">
        <div className="w-28 h-28 rounded-3xl bg-[#2E7D32] flex items-center justify-center shadow-lg shadow-green-200">
          <Leaf className="w-14 h-14 text-white" strokeWidth={2.2} />
        </div>
        <h1 className="text-[26px] font-bold text-[#1B5E20] tracking-tight">Smart Agro IA</h1>
        <p className="text-[16px] text-neutral-500 text-center max-w-[220px] leading-snug">
          Protege tus cultivos con inteligencia artificial
        </p>

        <div className="mt-2 flex flex-col items-center gap-2">
          {["Detecta plagas al instante", "Recomendaciones precisas", "Fácil de usar en el campo"].map(
            (f, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#4CAF50]" />
                <span className="text-[14px] text-neutral-500">{f}</span>
              </div>
            )
          )}
        </div>
      </div>

      <div className="w-full flex flex-col gap-3">
        <button
          onClick={() => onNavigate("home")}
          className="w-full h-14 rounded-2xl bg-[#2E7D32] hover:bg-[#1B5E20] active:scale-[0.98] text-white text-[17px] font-semibold shadow-md transition"
        >
          Comenzar
        </button>
        <p className="text-center text-[12px] text-neutral-400">
          Versión 1.0 · Colombia 🇨🇴
        </p>
      </div>
    </div>
  );
}
