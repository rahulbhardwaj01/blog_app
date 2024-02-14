import { Link } from "react-router-dom";
import AvatarIcon from "./AvatarIcon";

interface BlogsCardProps {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  id: string;
}

export const BlogsCard = ({ authorName, title, content, publishedDate, id }: BlogsCardProps) => {
  return <Link to={`/blog/${id}`}>
    <div className="border-b-2 border-slate-200 pb-4 p-4 w-screen max-w-screen-md cursor-pointer">
      <div className="flex">
        <div className="flex">
          <AvatarIcon authorName={authorName} />
        </div>
        <div className="text-gray-600 text-sm pl-2 flex justify-center flex-col">
          {authorName} &#x2022; {publishedDate}
        </div>
      </div>
      <div className="text-xl font-semibold">
        {title}
      </div>
      <div className="text-md font-thin">
        {content.slice(0, 100) + "..."}
      </div>
      <div className="text-slate-400 text-sm font-thin pt-4">
        {`${Math.ceil(content.length / 100)} minute(s) read`}
      </div>
    </div>
  </Link>
}
