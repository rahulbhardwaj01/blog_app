import { Link, useNavigate } from "react-router-dom"
import AvatarIcon from "./AvatarIcon"

export const Appbar = () => {

  const navigate = useNavigate();

  return <div className="flex justify-between px-16 py-4 border-b">
    <Link to={"/blogs"} className="flex justify-center flex-col cursor-pointer">
      <div >
        Blog-app
      </div>
    </Link>

    <div>
      <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full mx-2" onClick={() => {
        navigate("/publish")
      }}>
        New Post
      </button>
      <AvatarIcon authorName="Saurav" size="large" />
    </div>
  </div>
}
