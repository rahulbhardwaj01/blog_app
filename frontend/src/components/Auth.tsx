import { signInData } from "@saurav1509/medium-common";
import Button from "../components/Button";
import FieldHeader from "../components/FieldHeader";
import InputField from "../components/InputField";
import LoginHeader from "../components/LoginHeader";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {

  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<signInData>({
    name: "",
    username: "",
    password: ""
  })

  async function sendRequest() {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs);
      const jwt = response.data;
      localStorage.setItem("token", "Bearer " + jwt.jwt);
      navigate("/blogs")

    } catch (e) {
      alert("error while Logging in! Please check with Administrator")
    }
  }

  return (

    < div className="flex justify-center items-center h-screen rounded overflow-hidden shadow-lg" >
      <div className="px-6 py-4">
        <div className=" px-6 py-4 w-full text-center">
          <LoginHeader label={type === "signup" ? "Create Your Account" : "Sign In to your Account"} />
        </div>
        <div className="text-gray-500 dark:text-gray-400 text-center pt-4">
          {type === "signup" ? "Already have an account?" : "Don't have an account?"}
          <Link className="pl-2 underline" to={type === "signup" ? "/signin" : "/signup"}>{type === "signup" ? "Sign In" : "Sign Up"}</Link>
        </div>
        {type === "signup" ? <><div className="py-2 px-2">
          <FieldHeader label={"Name"} />
        </div>
          <div className="py-2 px-2">
            <InputField label={"Name"} onChange={(e) => {
              setPostInputs({
                ...postInputs,
                name: e.target.value
              })
            }} />
          </div></> : null}
        <div className="py-2 px-2">
          <FieldHeader label={"Email ID"} />
        </div>
        <div className="py-2 px-2">
          <InputField label={"example@email.com"} onChange={(e) => {
            setPostInputs({
              ...postInputs,
              username: e.target.value
            })
          }} />
        </div>
        <div className="py-2 px-2">
          <FieldHeader label={"Password"} />
        </div>
        <div className="py-2 px-2">
          <InputField label={"Password"} onChange={(e) => {
            setPostInputs({
              ...postInputs,
              password: e.target.value
            })
          }} type={"password"} />
        </div>
        <div className="flex justify-center py-5">
          <Button label={type === "signup" ? "Sign Up" : "Sign In"} onClick={sendRequest} />
        </div>
      </div>
    </div >
  )
}

