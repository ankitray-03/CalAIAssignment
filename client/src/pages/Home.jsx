import axios from "../components/axios.jsx";
import { useDispatch } from "react-redux";

import { userActions } from "../store/user/UserSlice";

function Home() {
  const dispatch = useDispatch();

  const handlePayment = async (e) => {
    e.preventDefault();

    await axios
      .post("/paypal/pay")
      .then((res) => {
        window.open(res.data, "_blank");
      })
      .catch((error) => console.log(error));
  };

  const handleSignOut = async () => {
    try {
      await axios
        .post("/auth/logout")
        .then(() => {
          dispatch(userActions.signOutUserSuccess());
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button
        className="bg-black rounded w-[100px] mt-[20px] text-white p-2 ml-[80%]"
        onClick={handleSignOut}
      >
        Logout
      </button>
      <div className="w-[20%] mx-[10%] my-[5%] border-2 border-[#f2f2f2] rounded">
        <img
          src="https://tse4.mm.bing.net/th?id=OIP.-iO4ZGl93D67RiJuR-WvJQHaE-&pid=Api&P=0&h=180"
          width="100%"
        ></img>
        <h1 className="text-center text-3xl mt-[30px]"> Bag </h1>
        <h2 className="text-center my-4 text-1xl">Price : $1</h2>
        <form onSubmit={handlePayment}>
          <button
            type="submit"
            className="w-[90%] bg-[#3b82f6] mx-4 h-[35px] text-white rounded"
          >
            Buy
          </button>
        </form>
      </div>
    </>
  );
}

export default Home;
