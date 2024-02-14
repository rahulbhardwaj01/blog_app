import { useParams } from "react-router-dom";
import { useBlog } from "../hooks"
import { IndiBlogPage } from "../components/IndiBlogPage";

export default function Blog() {

  const { id } = useParams();

  const { loading, blog } = useBlog({
    id: id || ""
  });

  if (loading || !blog) {
    return <div>
      loading ...
    </div>
  }

  return <div>
    <IndiBlogPage blog={blog} />
  </div>
}
