import { Appbar } from "./Appbar"
import { BlogsType } from "../hooks"
import AvatarIcon from "./AvatarIcon"

export const IndiBlogPage = ({ blog }: { blog: BlogsType }) => {

    return <div>
        <Appbar />
        <div className="flex justify-center">
            <div className="grid grid-cols-12 px-10 w-full max-w-screen-xl pt-12 ">
                <div className="col-span-8 ">
                    <div className="text-5xl font-extrabold">
                        {blog.title}
                    </div>
                    <div className="text-slate-500">
                        Posted on 4th april 2024
                    </div>
                    <div className="pt-2">
                        {blog.content}
                    </div>
                </div>
                <div className="col-span-4 pl-5 border-l-2">
                    <div className="text-xl text-slate-500 font-semibold">
                        Author
                    </div>
                    <div className="flex">
                        <div className="flex justify-center flex-col pl-2">
                            <AvatarIcon size="large" authorName={blog.author.name || "Anonymous"} />
                        </div>
                        <div className="pl-2 pt-2">

                            <div className="flex font-bold text-lg">
                                {blog.author.name || "Anonymous"}
                            </div>
                            <div className="text-slate-600">
                                I am a Blog Writer
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div >
}