interface FieldHeaderProps {
  label: string;
}

export default function FieldHeader({ label }: FieldHeaderProps) {
  return (
    <div className="font-bold text-xl pt-6">
      {label}
    </div>
  )
}
