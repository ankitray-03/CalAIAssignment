import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userActions } from "../store/user/UserSlice";
import axios from "./axios.jsx";

import { FaGoogle } from "react-icons/fa";

function Oauth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      await axios
        .post("/auth/google", {
          username: result.user.displayName,
          email: result.user.email,
        })
        .then((res) => {
          dispatch(userActions.signInSuccess(res.data));
          navigate("/buy");
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.log("Could not sign in with Google", error);
    }
  };

  return (
    <button
      onClick={handleGoogleClick}
      type="button"
      className="bg-red-500 text-white p-3 rounded-lg uppercase hover:opacity-95 w-[100%] mt-3"
    >
      <div className="flex gap-4 items-center mx-[120px]">
        <div>
          <FaGoogle />
        </div>
        <div>Continue with google</div>
      </div>
    </button>
  );
}

export default Oauth;
