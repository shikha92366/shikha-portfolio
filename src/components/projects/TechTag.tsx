interface TechTagProps {
  label: string;
}

export function TechTag({ label }: TechTagProps) {
  return (
    <span className="text-[11px] font-mono uppercase tracking-wider text-[#8892b0] hover:text-[#64ffda] transition-colors">
      {label}
    </span>
  );
}

export default TechTag;
