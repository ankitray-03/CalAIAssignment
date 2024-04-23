import { useRef } from "react";
import axios from "../components/axios.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { userActions } from "../store/user/UserSlice";
import Oauth from "../components/Oauth";

export default function SignIn() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    await axios
      .post("/auth/signin", formData)
      .then((res) => {
        dispatch(userActions.signInSuccess(res.data));
        navigate("/buy");
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="p-3 max-w-lg mx-auto border-2 mt-8">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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

        <button className="bg-[#3b82f6] text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          Sign In
        </button>
      </form>
      <Oauth />
      <div className="flex gap-2 mt-5">
        <p>Dont have an account?</p>
        <Link to="/signup">
          <span className="text-blue-700">Sign up</span>
        </Link>
      </div>
    </div>
  );
}
