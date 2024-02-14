import { useState } from "react"
import { Appbar } from "../components/Appbar"
import EnterContent from "../components/EnterContent"
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";


export const Publish = () => {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("")

    const navigate = useNavigate()

    return <div>
        <Appbar />
        <div className="flex justify-center w-full">
            <div className="mb-6 pt-5 max-w-screen-lg w-full">
                <div>
                    <input onChange={(e) => {
                        setTitle(e.target.value);
                    }} type="text" className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:outline-none" placeholder="Title" />
                </div>

                <EnterContent onChange={(e) => {
                    setContent(e.target.value)
                }} />

                <div className=" pt-3">
                    <button onClick={async () => {
                        const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
                            title,
                            content
                        }, {
                            headers: {
                                Authorization: localStorage.getItem("token")
                            }
                        })
                        navigate(`/blog/${response.data.id}`)
                    }} type="button" className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Publish</button>
                </div>
            </div>
        </div>
    </div>
}