import { useState, useCallback } from "react";
import { SplashScreen } from "./components/screens/Splash";
import { HomeScreen } from "./components/screens/Home";
import { CameraScreen } from "./components/screens/Camera";
import { AnalyzingScreen } from "./components/screens/Analyzing";
import { ResultScreen } from "./components/screens/Result";
import { HistoryScreen } from "./components/screens/History";
import { ProfileScreen } from "./components/screens/Profile";
import { Screen, ScanRecord } from "./types";

const MOCK_DIAGNOSES: Omit<ScanRecord, "id" | "date">[] = [
  {
    crop: "Café",
    diagnosis: "Roya del café",
    scientificName: "Hemileia vastatrix",
    severity: "Moderado",
    color: "#FFB300",
    bg: "#FFF8E1",
    img: "https://images.unsplash.com/photo-1771510523730-fb4eb23fb54f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80",
    recommendations: [
      "Retira y quema las hojas más afectadas",
      "Aplica fungicida a base de cobre cada 15 días",
      "Mejora la ventilación entre plantas",
      "Vuelve a escanear en 7 días para verificar",
    ],
  },
  {
    crop: "Tomate",
    diagnosis: "Tizón tardío",
    scientificName: "Phytophthora infestans",
    severity: "Severo",
    color: "#E53935",
    bg: "#FFEBEE",
    img: "https://images.unsplash.com/photo-1591857177593-aec16c2d8f60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80",
    recommendations: [
      "Elimina las plantas fuertemente afectadas",
      "Aplica fungicida sistémico de inmediato",
      "Evita el riego por aspersión",
      "Rota los cultivos la próxima temporada",
    ],
  },
  {
    crop: "Maíz",
    diagnosis: "Planta sana",
    scientificName: "",
    severity: "Sano",
    color: "#4CAF50",
    bg: "#E8F5E9",
    img: "https://images.unsplash.com/photo-1631134942435-448dbf07a42a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80",
    recommendations: [
      "Continúa con el riego regular",
      "Aplica fertilizante en la próxima semana",
      "Monitorea el cultivo cada 3 días",
      "Mantén el área libre de malezas",
    ],
  },
  {
    crop: "Café",
    diagnosis: "Broca del café",
    scientificName: "Hypothenemus hampei",
    severity: "Severo",
    color: "#E53935",
    bg: "#FFEBEE",
    img: "https://images.unsplash.com/photo-1705704589320-2bf1a53bdab6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80",
    recommendations: [
      "Recolecta y destruye los frutos caídos",
      "Instala trampas con metanol y etanol",
      "Aplica control biológico con Beauveria bassiana",
      "Realiza re-pase exhaustivo del cultivo",
    ],
  },
  {
    crop: "Frijol",
    diagnosis: "Antracnosis",
    scientificName: "Colletotrichum lindemuthianum",
    severity: "Moderado",
    color: "#FFB300",
    bg: "#FFF8E1",
    img: "https://images.unsplash.com/photo-1612257999756-1e6b75584e24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80",
    recommendations: [
      "Elimina el material vegetal infectado",
      "Aplica fungicida preventivo en hojas sanas",
      "Usa semillas certificadas en la siguiente siembra",
      "Escanea de nuevo en 10 días",
    ],
  },
];

const INITIAL_RECORDS: ScanRecord[] = [
  {
    id: "r-1",
    crop: "Café",
    diagnosis: "Roya del café",
    scientificName: "Hemileia vastatrix",
    date: "Hoy, 9:42 AM",
    severity: "Moderado",
    color: "#FFB300",
    bg: "#FFF8E1",
    img: "https://images.unsplash.com/photo-1771510523730-fb4eb23fb54f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80",
    recommendations: [
      "Retira y quema las hojas más afectadas",
      "Aplica fungicida a base de cobre cada 15 días",
      "Mejora la ventilación entre plantas",
      "Vuelve a escanear en 7 días para verificar",
    ],
  },
  {
    id: "r-2",
    crop: "Tomate",
    diagnosis: "Planta sana",
    scientificName: "",
    date: "Ayer",
    severity: "Sano",
    color: "#4CAF50",
    bg: "#E8F5E9",
    img: "https://images.unsplash.com/photo-1591857177593-aec16c2d8f60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80",
    recommendations: [
      "Continúa con el riego regular",
      "Monitorea cada 3 días",
      "Mantén el área libre de malezas",
    ],
  },
  {
    id: "r-3",
    crop: "Maíz",
    diagnosis: "Gusano cogollero",
    scientificName: "Spodoptera frugiperda",
    date: "20 May 2026",
    severity: "Severo",
    color: "#E53935",
    bg: "#FFEBEE",
    img: "https://images.unsplash.com/photo-1631134942435-448dbf07a42a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80",
    recommendations: [
      "Aplica insecticida al cogollo de inmediato",
      "Monitorea diariamente las plantas",
      "Coloca trampas de feromona",
      "Escanea nuevamente en 5 días",
    ],
  },
  {
    id: "r-4",
    crop: "Café",
    diagnosis: "Planta sana",
    scientificName: "",
    date: "18 May 2026",
    severity: "Sano",
    color: "#4CAF50",
    bg: "#E8F5E9",
    img: "https://images.unsplash.com/photo-1705704589320-2bf1a53bdab6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80",
    recommendations: [
      "Continúa con el manejo actual",
      "Aplica abono cada 15 días",
      "Monitorea el cultivo semanalmente",
    ],
  },
];

function formatDate(): string {
  const now = new Date();
  const h = now.getHours();
  const m = now.getMinutes().toString().padStart(2, "0");
  const period = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 || 12;
  return `Hoy, ${h12}:${m} ${period}`;
}

export default function App() {
  const [screen, setScreen] = useState<Screen>("splash");
  const [records, setRecords] = useState<ScanRecord[]>(INITIAL_RECORDS);
  const [currentResult, setCurrentResult] = useState<ScanRecord | null>(null);
  const [pendingResult, setPendingResult] = useState<ScanRecord | null>(null);
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set(INITIAL_RECORDS.map(r => r.id)));

  const navigate = useCallback((s: Screen) => setScreen(s), []);

  const handleCapture = useCallback((img: string | null) => {
    const diag = MOCK_DIAGNOSES[Math.floor(Math.random() * MOCK_DIAGNOSES.length)];
    const newRecord: ScanRecord = {
      id: `scan-${Date.now()}`,
      ...diag,
      img: img || diag.img,
      date: formatDate(),
    };
    setPendingResult(newRecord);
    setScreen("analyzing");
  }, []);

  const handleAnalysisComplete = useCallback(() => {
    setCurrentResult(pendingResult);
    setScreen("result");
  }, [pendingResult]);

  const handleSaveResult = useCallback(() => {
    if (currentResult && !savedIds.has(currentResult.id)) {
      setRecords(prev => [currentResult, ...prev]);
      setSavedIds(prev => new Set([...prev, currentResult.id]));
    }
    setScreen("history");
  }, [currentResult, savedIds]);

  const handleViewRecord = useCallback((record: ScanRecord) => {
    setCurrentResult(record);
    setScreen("result");
  }, []);

  const isSaved = currentResult ? savedIds.has(currentResult.id) : false;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8F5E9] to-[#A5D6A7] flex items-start justify-center sm:items-center sm:py-6">
      <div
        className="
          w-full max-w-sm
          h-[100dvh] sm:h-[812px]
          sm:rounded-[44px] sm:shadow-2xl sm:overflow-hidden
          bg-white flex flex-col relative overflow-hidden
          sm:border sm:border-black/10
        "
      >
        {screen === "splash" && <SplashScreen onNavigate={navigate} />}
        {screen === "home" && (
          <HomeScreen onNavigate={navigate} scanCount={records.length} />
        )}
        {screen === "camera" && (
          <CameraScreen onNavigate={navigate} onCapture={handleCapture} />
        )}
        {screen === "analyzing" && (
          <AnalyzingScreen
            capturedImage={pendingResult?.img ?? null}
            onComplete={handleAnalysisComplete}
          />
        )}
        {screen === "result" && (
          <ResultScreen
            record={currentResult}
            isSaved={isSaved}
            onNavigate={navigate}
            onSave={handleSaveResult}
          />
        )}
        {screen === "history" && (
          <HistoryScreen
            records={records}
            onNavigate={navigate}
            onViewRecord={handleViewRecord}
          />
        )}
        {screen === "profile" && (
          <ProfileScreen
            onNavigate={navigate}
            scanCount={records.length}
            healthyCount={records.filter(r => r.severity === "Sano").length}
          />
        )}
      </div>
    </div>
  );
}
