import { Appbar } from "../components/Appbar"
import { BlogsCard } from "../components/BlogsCard"
import { useBlogs } from "../hooks/index"

export const Blogs = () => {

  const { loading, blogs } = useBlogs();

  if (loading) {
    return <div>loading...</div>
  }

  return (
    <>
      <Appbar />
      <div className="flex justify-center">
        <div>
          {blogs.map(blog => <BlogsCard
            authorName={blog.author.name || "Anonymous"}
            title={blog.title}
            content={blog.content}
            publishedDate={"4th April 2024"}
            id={blog.id}
          />)}
        </div>

      </div>
    </>
  )
}
