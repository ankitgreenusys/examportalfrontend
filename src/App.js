import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Home from "./Components/Home";
import SignUp from "./Components/SignUp";
import Payment from "./Components/Payment";
import Login from "./Components/Login";
// import TryQuestion from "./Components/TryQuestion";
import Questions from "./Components/Questions";
import Details from "./Components/Details";
import Instructions from "./Components/Instructions";
import EndExam from "./Components/EndExam";
import AddQuestion from "./Components/AddQuestion";
import NotFound from "./Components/NotFound";

import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        // newestOnTop={true}
        closeOnClick
        theme="dark"
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/payment" element={<Payment />} />
        {/* <Route path="/tryquestion" element={<TryQuestion />} /> */}
        <Route path="/questions" element={<Questions />} />
        <Route path="/addquestion" element={<AddQuestion />} />
        <Route path="/details" element={<Details />} />
        <Route path="/instructions" element={<Instructions />} />
        <Route path="/endexam" element={<EndExam />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
