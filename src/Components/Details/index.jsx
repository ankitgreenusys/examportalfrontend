import React from "react";
import "./Styles.css";

import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../Context";

const Index = () => {
  const navigate = useNavigate();
  const { isLoading, user, logout } = React.useContext(AppContext);

  React.useEffect(() => {
    // console.log(user);
    if (!isLoading) {
      if (!user) {
        navigate("/login");
        return;
      }
      if (!user.isPaid) {
        toast.error("Please pay the fee first", {
          toastId: "custom-id-yes",
        });
        navigate("/payment", {
          state: {
            newid: user._id,
            name: user.name,
            aadharno: user.addharNumber,
            ititrade: user.itiTrade,
          },
        });
      }
    }
  }, [isLoading, user]);

  const lgo = () => {
    navigate("/");
    logout();
  };

  return (
    <div className="details-page flex-column align-items-center d-flex justify-content-center">
      <div className="white-header">
        <h1>Details</h1>
      </div>
      <div className="white-box row">
        <div className="col-lg-6">
          <div className="detailsinfo">
            Name : <span className="detailsdta">{user?.name}</span>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="detailsinfo">
            Email : <span className="detailsdta">{user?.email}</span>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="detailsinfo">
            Phone : <span className="detailsdta">{user?.phoneNumber}</span>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="detailsinfo">
            ITI Trade : <span className="detailsdta">{user?.itiTrade}</span>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="detailsinfo">
            Aadhar Card No. :{" "}
            <span className="detailsdta">{user?.addharNumber}</span>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="detailsinfo">
            Available Exam :{" "}
            <span className="detailsdta">
              {user?.isExamGiven ? "NIL" : "NCVT"}
            </span>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="detailsinfo">
            Exam History :{" "}
            <span className="detailsdta">
              {user?.isExamGiven ? "NCVT" : "NIL"}
            </span>
          </div>
        </div>
      </div>
      <div className="detailsbtns bottom-btns">
        <button onClick={lgo} className="exambtn btn-red">
          Logout
        </button>
        {!user?.isExamGiven && (
          <Link to="/instructions" className="exambtn btn-green">
            Start Test
          </Link>
        )}
      </div>
    </div>
  );
};

export default Index;
