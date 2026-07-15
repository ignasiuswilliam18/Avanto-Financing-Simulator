import { useMemo, useState, useEffect, useRef } from "react";

export interface SearchOption {
  label: string;
  value: string;
}

interface SearchableSelectProps {
  label: string;
  placeholder?: string;
  options: SearchOption[];
  value: string;
  onChange: (value: string) => void;
}

export default function SearchableSelect({
  label,
  placeholder = "Cari...",
  options,
  value,
  onChange,
}: SearchableSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  // Cari label dari value yang terpilih untuk ditampilkan di input
  const selectedLabel = useMemo(() => {
    return options.find((opt) => opt.value === value)?.label || "";
  }, [value, options]);

  // Menutup dropdown jika klik di luar komponen
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filtered = useMemo(() => {
    return options.filter((item) =>
      item.label.toLowerCase().includes(keyword.toLowerCase())
    );
  }, [keyword, options]);

  return (
    <div className="relative space-y-2" ref={containerRef}>
      <label className="block text-sm font-semibold text-slate-700">{label}</label>

      <div className="relative">
        <input
          type="text"
          placeholder={isOpen ? "Cari..." : selectedLabel || placeholder}
          value={isOpen ? keyword : ""}
          onClick={() => setIsOpen(true)}
          onChange={(e) => {
            setKeyword(e.target.value);
            setIsOpen(true);
          }}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
        />
        {/* Ikon Panah Klik untuk Toggle */}
        <button 
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="absolute inset-y-0 right-0 flex items-center pr-4"
        >
          <svg className={`h-5 w-5 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-1 max-h-60 w-full overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-lg">
          {filtered.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => {
                onChange(item.value);
                setKeyword(""); // Reset keyword
                setIsOpen(false); // Tutup otomatis
              }}
              className={`w-full px-4 py-3 text-left text-sm transition ${
                value === item.value ? "bg-emerald-600 text-white" : "hover:bg-emerald-50"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}