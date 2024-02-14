interface LoginHeaderProps {
  label: string;
}

export default function LoginHeader({ label }: LoginHeaderProps) {
  return (
    <div className="font-bold text-3xl pt-6 ">
      {label}
    </div>
  )
}
