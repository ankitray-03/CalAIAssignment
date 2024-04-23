import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

import PrivateRoute from "./components/PrivateRoute";
import Success from "./pages/Success";
import CancelOrder from "./pages/CancelOrder";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancelled" element={<CancelOrder />} />

        <Route element={<PrivateRoute />}>
          <Route path="/buy" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
