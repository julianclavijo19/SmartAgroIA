import { useState } from "react";
import { Globe, Bell, Info, ChevronRight, LogOut, MapPin, Shield, HelpCircle } from "lucide-react";
import { BottomNav } from "../BottomNav";
import { Screen } from "../../types";

interface Props {
  onNavigate: (s: Screen) => void;
  scanCount: number;
  healthyCount: number;
}

export function ProfileScreen({ onNavigate, scanCount, healthyCount }: Props) {
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState("Español");
  const [showAbout, setShowAbout] = useState(false);

  const handleLogout = () => {
    onNavigate("splash");
  };

  return (
    <div className="flex-1 flex flex-col bg-[#FAFAFA] overflow-hidden">
      {/* Profile header */}
      <div className="px-5 pt-12 pb-5 bg-white flex-shrink-0 shadow-sm">
        <h2 className="text-[15px] font-semibold text-neutral-500">Mi Perfil</h2>
        <div className="mt-4 flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#2E7D32] to-[#1B5E20] flex items-center justify-center text-white text-[24px] font-bold flex-shrink-0">
            C
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-[19px] font-bold text-neutral-900">Don Carlos Ramírez</h3>
            <div className="flex items-center gap-1 mt-1">
              <MapPin className="w-3.5 h-3.5 text-[#2E7D32] flex-shrink-0" />
              <span className="text-[13px] text-neutral-500">Quindío, Colombia</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-5 grid grid-cols-3 gap-2">
          {[
            { n: String(scanCount), l: "Escaneos" },
            { n: "4", l: "Cultivos" },
            { n: String(healthyCount), l: "Sanos" },
          ].map((s, i) => (
            <div key={i} className="bg-[#F1F8F2] rounded-xl py-3 text-center">
              <p className="text-[18px] font-bold text-[#1B5E20]">{s.n}</p>
              <p className="text-[11px] text-neutral-500 mt-0.5">{s.l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Settings */}
      <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5">
        {/* Config section */}
        <div>
          <p className="text-[12px] uppercase tracking-wide text-neutral-400 font-semibold mb-2 px-1">
            Configuración
          </p>
          <div className="bg-white rounded-2xl border border-neutral-100 overflow-hidden">
            {/* Notifications toggle */}
            <div className="flex items-center gap-3 px-4 py-4 border-b border-neutral-100">
              <div className="w-10 h-10 rounded-xl bg-[#E8F5E9] flex items-center justify-center flex-shrink-0">
                <Bell className="w-5 h-5 text-[#2E7D32]" />
              </div>
              <span className="flex-1 text-[15px] text-neutral-800">Notificaciones</span>
              <button
                onClick={() => setNotifications((n) => !n)}
                className={`w-12 h-6 rounded-full transition-colors duration-200 relative ${
                  notifications ? "bg-[#2E7D32]" : "bg-neutral-200"
                }`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all duration-200 ${
                    notifications ? "left-7" : "left-1"
                  }`}
                />
              </button>
            </div>

            {/* Language */}
            <button
              className="w-full flex items-center gap-3 px-4 py-4 border-b border-neutral-100 active:bg-neutral-50 transition"
              onClick={() => setLanguage(language === "Español" ? "English" : "Español")}
            >
              <div className="w-10 h-10 rounded-xl bg-[#E8F5E9] flex items-center justify-center">
                <Globe className="w-5 h-5 text-[#2E7D32]" />
              </div>
              <span className="flex-1 text-left text-[15px] text-neutral-800">Idioma</span>
              <span className="text-[13px] text-neutral-400">{language}</span>
              <ChevronRight className="w-4 h-4 text-neutral-300" />
            </button>

            {/* About */}
            <button
              className="w-full flex items-center gap-3 px-4 py-4 active:bg-neutral-50 transition"
              onClick={() => setShowAbout((v) => !v)}
            >
              <div className="w-10 h-10 rounded-xl bg-[#E8F5E9] flex items-center justify-center">
                <Info className="w-5 h-5 text-[#2E7D32]" />
              </div>
              <span className="flex-1 text-left text-[15px] text-neutral-800">Acerca de la app</span>
              <ChevronRight className="w-4 h-4 text-neutral-300" />
            </button>

            {showAbout && (
              <div className="px-4 pb-4 pt-0 bg-[#F9FFF9] border-t border-neutral-100">
                <p className="text-[13px] text-neutral-500 leading-relaxed">
                  <span className="font-semibold text-[#2E7D32]">Smart Agro IA v1.0</span>
                  {"\n"}Aplicación de detección de plagas y enfermedades para agricultores de Colombia.
                  Desarrollada con inteligencia artificial para ayudar al campo.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* More section */}
        <div>
          <p className="text-[12px] uppercase tracking-wide text-neutral-400 font-semibold mb-2 px-1">
            Más
          </p>
          <div className="bg-white rounded-2xl border border-neutral-100 overflow-hidden">
            <button className="w-full flex items-center gap-3 px-4 py-4 border-b border-neutral-100 active:bg-neutral-50 transition">
              <div className="w-10 h-10 rounded-xl bg-[#E8F5E9] flex items-center justify-center">
                <Shield className="w-5 h-5 text-[#2E7D32]" />
              </div>
              <span className="flex-1 text-left text-[15px] text-neutral-800">Privacidad</span>
              <ChevronRight className="w-4 h-4 text-neutral-300" />
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-4 active:bg-neutral-50 transition">
              <div className="w-10 h-10 rounded-xl bg-[#E8F5E9] flex items-center justify-center">
                <HelpCircle className="w-5 h-5 text-[#2E7D32]" />
              </div>
              <span className="flex-1 text-left text-[15px] text-neutral-800">Ayuda</span>
              <ChevronRight className="w-4 h-4 text-neutral-300" />
            </button>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full py-3.5 rounded-2xl bg-white border border-red-100 text-red-600 font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition"
        >
          <LogOut className="w-4 h-4" />
          Cerrar sesión
        </button>
      </div>

      <BottomNav active="profile" onNavigate={onNavigate} />
    </div>
  );
}
