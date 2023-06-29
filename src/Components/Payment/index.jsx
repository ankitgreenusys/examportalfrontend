import React from "react";
import "./Styles.css";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContext } from "../../Context";

import Student_URL from "../../Api/Student.url";

const Index = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { logout } = React.useContext(AppContext);

  const [userdta, setUserdta] = React.useState({});
  const [islinksent, setIslinksent] = React.useState(false);

  React.useEffect(() => {
    console.log(state);

    if (!state) {
      toast.error("Please login first");
      navigate("/login");
    } else {
      const { newid, name, aadharno, ititrade } = state;
      setUserdta({ newid, name, aadharno, ititrade });
    }
  }, []);

  const lgo = () => {
    navigate("/");
    logout();
  };

  const payfee = () => {
    fetch(Student_URL + "sendpaymentlink/" + userdta.newid)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          toast.error(data.error, {
            toastId: "custom-id-yes",
          });
        } else {
          setIslinksent(true);
          toast.success(data.success, {
            toastId: "custom-id-yes",
          });
          setTimeout(() => {
            fetch(Student_URL + "checkpayment/" + userdta.newid)
              .then((res) => res.json())
              .then((data) => {
                if (data.error)
                  toast.error(data.error, {
                    toastId: "custom-id-yes",
                  });
                else {
                  toast.success(data.success, {
                    toastId: "custom-id-yes",
                  });
                  logout();
                  navigate("/login");
                }
              });
          }, 2000);
        }
      });
  };

  return (
    <div className="details-page flex-column align-items-center d-flex justify-content-center">
      <div className="white-header">
        <h1>Payment Details</h1>
      </div>
      <div className="white-box row">
        <div className="col-lg-4">
          <div className="detailsinfo">
            Name : <span className="detailsdta">{userdta.name}</span>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="detailsinfo">
            ITI Trade : <span className="detailsdta">{userdta.ititrade}</span>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="detailsinfo">
            Aadhar No. : <span className="detailsdta">{userdta.aadharno}</span>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="detailsinfo">
            <button onClick={payfee} className=" nav-link text-center w-100">
              Pay Now
            </button>
          </div>
        </div>
        <div className="col-lg-4"></div>
        <div className="col-lg-4">
          <div className="detailsinfo bg-danger">
            Payment Status : <span className="detailsdta"> Unpaid </span>
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
