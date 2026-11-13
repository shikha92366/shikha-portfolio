interface TechTagProps {
  label: string;
}

export function TechTag({ label }: TechTagProps) {
  return (
    <span className="text-[11px] font-mono uppercase tracking-wider text-[#9ba7b8] hover:text-[#83b4ff] transition-colors">
      {label}
    </span>
  );
}

export default TechTag;
