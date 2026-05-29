import { Home, History, User } from "lucide-react";
import { Screen } from "../types";

type Tab = "home" | "history" | "profile";

const items: { id: Tab; label: string; Icon: typeof Home }[] = [
  { id: "home", label: "Inicio", Icon: Home },
  { id: "history", label: "Historial", Icon: History },
  { id: "profile", label: "Perfil", Icon: User },
];

interface Props {
  active: Tab;
  onNavigate: (s: Screen) => void;
}

export function BottomNav({ active, onNavigate }: Props) {
  return (
    <div className="border-t border-neutral-100 bg-white px-4 pt-2 pb-5 flex-shrink-0">
      <div className="flex items-center justify-around">
        {items.map(({ id, label, Icon }) => {
          const isActive = id === active;
          return (
            <button
              key={id}
              onClick={() => onNavigate(id)}
              className="flex flex-col items-center gap-1 py-1 px-5 rounded-xl active:bg-[#E8F5E9] transition"
            >
              <Icon
                className={`w-6 h-6 ${isActive ? "text-[#2E7D32]" : "text-neutral-400"}`}
                strokeWidth={isActive ? 2.4 : 2}
              />
              <span
                className={`text-[11px] ${
                  isActive ? "text-[#2E7D32] font-semibold" : "text-neutral-400"
                }`}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
