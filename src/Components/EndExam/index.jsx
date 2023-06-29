import React from "react";
import "./Styles.css";

import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../Context";

import Student_URL from "../../Api/Student.url";

const Index = () => {
  const navigate = useNavigate();
  const { user, userJwt, logout } = React.useContext(AppContext);

  const [result, setResult] = React.useState({});

  React.useEffect(() => {
    if (!user) {
      navigate("/login");
    }

    fetch(Student_URL + "getEndExam", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userJwt,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          toast.error(data.error, {
            toastId: "custom-id-yes",
          });
        } else {
          console.log(data);
          setResult(data.dta);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const lgo = () => {
    navigate("/");
    logout();
  };

  return (
    <div className="details-page flex-column align-items-center d-flex justify-content-center">
      <div className="white-header">
        <h1>End Of Exam</h1>
      </div>
      <div className="white-box row">
        <div className="col-lg-4">
          <div className="detailsinfo">
            Name : <span className="detailsdta">{user?.name}</span>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="detailsinfo">
            ITI Trade : <span className="detailsdta">{user?.itiTrade}</span>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="detailsinfo">
            Aadhar No. : <span className="detailsdta">{user?.addharNumber}</span>
          </div>
        </div>
        <div className="col-lg-8 offset-lg-2">
          <div className="endexamsg">
            <h2 className="head">Exam response submitted successfully</h2>
            <div className="detailsques mt-4">
              <h3>Total Questions : 20</h3>
              <h3>Questions Attempted : {result?.answered}</h3>
              <h3>Questions Unattempted : {result?.unanswered}</h3>
            </div>
          </div>
        </div>
      </div>
      <div className="detailsbtns bottom-btns">
        <button onClick={lgo} className="exambtn btn-red">
          Logout
        </button>
        <Link to="/" className="exambtn btn-green">
          Go to home
        </Link>
      </div>
    </div>
  );
};

export default Index;
