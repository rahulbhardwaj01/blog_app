interface AvatarIconProps {
  authorName: string;
  size?: string;
}

export default function AvatarIcon({ authorName, size = "small" }: AvatarIconProps) {
  return (<div className={`relative inline-flex items-center justify-center text-sm ${size === "small" ? "w-6 h-6" : "w-10 h-10"} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>
    <span className={`${size === "small" ? "text-sm" : "text-xl"} font-medium text-gray-600 dark:text-gray-300`}>{authorName[0]}</span>
  </div>
  )
}
