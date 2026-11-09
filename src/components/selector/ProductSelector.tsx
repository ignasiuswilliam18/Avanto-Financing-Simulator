import SearchableSelect from "./SearchableSelect";

interface ProductOption {
  label: string;
  value: string;
}

interface ProductSelectorProps {
  value: string;
  onChange: (value: string) => void;
  options: ProductOption[];
}

export default function ProductSelector({
  value,
  onChange,
  options,
}: ProductSelectorProps) {
  return (
    <div className="relative">
      <SearchableSelect
        label="Produk HP" // Label ini yang akan muncul sebagai judul
        placeholder="Cari produk OPPO..."
        options={options}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}