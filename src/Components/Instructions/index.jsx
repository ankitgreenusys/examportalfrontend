import React from "react";
import "./Styles.css";
import { Link, useNavigate } from "react-router-dom";

const Index = () => {
  return (
    <div className="details-page flex-column align-items-center d-flex justify-content-center">
      <div className="white-header">
        <h1>Instructions</h1>
      </div>
      <div className="white-box">
        <div className="attempting">
          You are attempting for <span> NCVT </span> exam
        </div>
        <div className="instruclist">
          <div className="instruc my-4">
            <h2>Instructions</h2>
          </div>
          <main>
            <ol className="gradient-list mt-5">
              <li>
                Read the questions carefully and understand what is being asked.
                If you are not sure, ask the examiner to explain it to you.
              </li>
              <li>
                Read the questions carefully and understand what is being asked.
                If you are not sure, ask the examiner to explain it to you.
              </li>
              <li>
                Read the questions carefully and understand what is being asked.
                If you are not sure, ask the examiner to explain it to you.
              </li>
              <li>
                Read the questions carefully and understand what is being asked.
                If you are not sure, ask the examiner to explain it to you.
              </li>
            </ol>
          </main>
        </div>
      </div>
      <div className="detailsbtns bottom-btns">
        <Link to="/details" className="exambtn btn-red">Back</Link>
        <Link to="/questions" className="exambtn btn-green">Start Test</Link>
      </div>
    </div>
  );
};

export default Index;
