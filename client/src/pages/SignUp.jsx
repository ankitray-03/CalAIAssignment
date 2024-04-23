import { useRef } from "react";
import axios from "../components/axios.jsx";
import { Link, useNavigate } from "react-router-dom";
import Oauth from "../components/Oauth";

export default function SignUp() {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      email: emailRef.current.value,
      username: nameRef.current.value,
      password: passwordRef.current.value,
    };

    await axios
      .post(`/auth/signup`, formData)
      .then((res) => {
        navigate("/signin");
        console.log(res);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="p-3 max-w-lg mx-auto border-2 mt-8">
      <h1 className="text-3xl text-center font-semibold my-7 underline">
        Sign Up
      </h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="username"
          className="border p-3 rounded-lg"
          name="username"
          ref={nameRef}
        />
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg"
          name="email"
          ref={emailRef}
        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          name="password"
          ref={passwordRef}
        />

        <button
          className="bg-[#3b82f6] text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          type="submit"
        >
          Sign Up
        </button>
      </form>
      <Oauth />
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to="/signin">
          <span className="text-blue-700">Sign in</span>
        </Link>
      </div>
    </div>
  );
}
