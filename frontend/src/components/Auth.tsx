import { SignUpSchema } from "@dev.salman010/medium-common";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "./InputField";
import axios from "axios";
function Auth({ type }: { type: "signup" | "signin" }) {
  const [signupIntputs, setSignupInputs] = useState<SignUpSchema>({
    email: "",
    password: "",
    name: "",
  });
  const navigate = useNavigate();

  const BACKEND_ULR = import.meta.env.VITE_BACKEND_URL;
  console.log(BACKEND_ULR);

  async function handleRequest() {
    const { email, password } = signupIntputs;
    if (!email || !password) return;

    try {
      const res = await axios.post(
        `${BACKEND_ULR}/user/${type}`,
        signupIntputs,
      );
      const jwt = res.data.jwt;
      localStorage.setItem("token", jwt);
      navigate("/blogs");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="text-3xl font-bold">
        {type === "signup" ? "Create an account" : "Login to your account"}
      </div>
      <div className="mb-2 text-slate-500">
        {type === "signup"
          ? "Already have an account? "
          : "Don't have an account? "}
        <Link
          to={type === "signup" ? "/signin" : "/signup"}
          className="underline"
        >
          {type === "signup" ? "LogIn" : "Sign Up"}
        </Link>
      </div>
      {type === "signup" && (
        <InputField
          labelText="Name"
          placeholder="Enter your name"
          onChange={(e) =>
            setSignupInputs((input) => ({ ...input, name: e.target.value }))
          }
        />
      )}
      <InputField
        labelText="Email"
        placeholder="abc@example.com"
        onChange={(e) =>
          setSignupInputs((input) => ({ ...input, email: e.target.value }))
        }
      />
      <InputField
        labelText="Password"
        placeholder="*****"
        onChange={(e) =>
          setSignupInputs((input) => ({ ...input, password: e.target.value }))
        }
      />
      <button
        onClick={handleRequest}
        className="mt-4 w-72 rounded-md bg-black p-2 text-slate-100"
      >
        {type === "signup" ? "Sign Up" : "Sign In"}
      </button>
    </div>
  );
}

export default Auth;
