import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, ChevronRight } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { BottomNav } from "../BottomNav";
import { ScanRecord, Screen } from "../../types";

type Filter = "Todos" | "Sano" | "Moderado" | "Severo";

interface Props {
  records: ScanRecord[];
  onNavigate: (s: Screen) => void;
  onViewRecord: (r: ScanRecord) => void;
}

export function HistoryScreen({ records, onNavigate, onViewRecord }: Props) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Filter>("Todos");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return records.filter((r) => {
      const matchSearch =
        search.trim() === "" ||
        r.crop.toLowerCase().includes(search.toLowerCase()) ||
        r.diagnosis.toLowerCase().includes(search.toLowerCase()) ||
        r.date.toLowerCase().includes(search.toLowerCase());
      const matchFilter = filter === "Todos" || r.severity === filter;
      return matchSearch && matchFilter;
    });
  }, [records, search, filter]);

  const filters: Filter[] = ["Todos", "Sano", "Moderado", "Severo"];
  const filterColors: Record<Filter, string> = {
    Todos: "#2E7D32",
    Sano: "#4CAF50",
    Moderado: "#FFB300",
    Severo: "#E53935",
  };

  return (
    <div className="flex-1 flex flex-col bg-[#FAFAFA] overflow-hidden">
      {/* Header */}
      <div className="px-5 pt-12 pb-3 bg-white flex-shrink-0 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[22px] font-bold text-[#1B5E20]">Mi Historial</h2>
            <p className="text-[13px] text-neutral-500 mt-0.5">
              {records.length} escaneos en total
            </p>
          </div>
        </div>

        {/* Search bar */}
        <div className="mt-4 flex items-center gap-2">
          <div className="flex-1 h-12 bg-[#F1F8F2] rounded-2xl flex items-center px-4 gap-2">
            <Search className="w-4 h-4 text-neutral-400 flex-shrink-0" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar cultivo o diagnóstico..."
              className="flex-1 bg-transparent outline-none text-[14px] placeholder:text-neutral-400"
            />
          </div>
          <button
            onClick={() => setShowFilters((v) => !v)}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition ${
              showFilters ? "bg-[#1B5E20]" : "bg-[#2E7D32]"
            }`}
          >
            <SlidersHorizontal className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="mt-3 flex gap-2 flex-wrap">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="px-3 py-1.5 rounded-full text-[12px] font-semibold transition"
                style={
                  filter === f
                    ? { background: filterColors[f], color: "white" }
                    : { background: "#F1F8F2", color: "#555" }
                }
              >
                {f}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 gap-3">
            <span className="text-[40px]">🌿</span>
            <p className="text-[15px] text-neutral-400 text-center">
              No se encontraron escaneos
            </p>
          </div>
        ) : (
          filtered.map((item) => (
            <button
              key={item.id}
              onClick={() => onViewRecord(item)}
              className="w-full bg-white rounded-2xl p-3 flex gap-3 border border-neutral-100 relative overflow-hidden active:scale-[0.99] transition text-left"
            >
              {/* Severity accent line */}
              <div
                className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
                style={{ background: item.color }}
              />
              <ImageWithFallback
                src={item.img}
                alt={item.crop}
                className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[15px] font-semibold text-neutral-900">
                    {item.crop}
                  </span>
                  <span
                    className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full flex-shrink-0"
                    style={{ background: item.bg, color: item.color }}
                  >
                    {item.severity}
                  </span>
                </div>
                <p className="text-[13px] text-neutral-600 truncate mt-0.5">
                  {item.diagnosis}
                </p>
                <p className="text-[12px] text-neutral-400 mt-1">{item.date}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-neutral-300 self-center flex-shrink-0" />
            </button>
          ))
        )}
      </div>

      <BottomNav active="history" onNavigate={onNavigate} />
    </div>
  );
}
