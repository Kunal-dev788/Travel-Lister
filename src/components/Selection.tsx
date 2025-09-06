interface SelectionProps {
  value: string;
  options: string[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

function Selection({ value, options, onChange }: SelectionProps) {
  return (
    <select value={value} onChange={onChange}>
      {options.map((val, i) => (
        <option key={i} value={val}>
          {val}
        </option>
      ))}
    </select>
  );
}

export default Selection;
