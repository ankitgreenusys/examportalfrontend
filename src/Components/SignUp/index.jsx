import React from "react";
import "./Styles.css";

import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContext } from "../../Context";

import Student_URL from "../../Common/Student.url";
import ititrade from "../../Common/ItiTrade.array";

const Index = () => {
  const navigate = useNavigate();
  const { isLoading, error, user } = React.useContext(AppContext);

  React.useEffect(() => {
    toast.info("Note Email and password are case sensitive", {
      toastId: "custom-id-yes",
    });
  }, []);

  React.useEffect(() => {
    if (user && user.name) {
      toast.success(`Welcome ${user.name}`, {
        toastId: "custom-id-yes",
      });
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
    if (error) {
      console.log(error);
      toast.error(error);
    }
  }, [isLoading]);

  const passingyear = [
    "Last Year",
    "2022",
    "2021",
    "2020",
    "2019",
    "2018",
    "2017",
    "2016",
    "2015",
    "2014",
    "2013",
  ];

  const [formdata, setformdata] = React.useState({
    name: "",
    aadharno: "",
    email: "",
    phone: "",
    passingyear: "",
    ititrade: "",
    password: "",
  });

  const [loading, setloading] = React.useState(false);
  const [otp, setotp] = React.useState("");
  const [newid, setnewid] = React.useState("");

  const handlechange = (e) => {
    const { name, value } = e.target;
    setformdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const sndta = {
      name: formdata.name,
      addharNumber: formdata.aadharno,
      email: formdata.email,
      phoneNumber: formdata.phone,
      yearOfPassing: passingyear[formdata.passingyear],
      itiTrade: ititrade[formdata.ititrade],
      password: formdata.password,
    };
    if (sndta.password.length < 6) {
      toast.error("Password must be of atleast 6 characters", {
        toastId: "custom-id-yes",
      });
      return;
    }

    if (sndta.phoneNumber.length !== 10) {
      toast.error("Phone Number must be of 10 digits", {
        toastId: "custom-id-yes",
      });
      return;
    }

    if (sndta.addharNumber.length !== 12) {
      toast.error("Aadhar Number must be of 12 digits", {
        toastId: "custom-id-yes",
      });
      return;
    }

    if (sndta.itiTrade === "") {
      toast.error("Please select ITI Trade", {
        toastId: "custom-id-yes",
      });
      return;
    }
    if (sndta.yearOfPassing === "") {
      toast.error("Please select Year of Passing", {
        toastId: "custom-id-yes",
      });
      return;
    }
    // console.log(sndta);
    setloading(true);
    fetch(Student_URL + "signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sndta),
    })
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
          setnewid(data.userId);
          document.getElementById("otpModalBtn").click();
        }
        setloading(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message, {
          toastId: "custom-id-yes",
        });
        setloading(false);
      });
  };

  const handleotp = (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast.error("OTP must be of 6 digits", {
        toastId: "custom-id-yes",
      });
      return;
    }

    const sndta = {
      otp,
      email: formdata.email,
    };

    fetch(Student_URL + "verifyotp/" + newid, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sndta),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error)
          toast.error(data.error, {
            toastId: "custom-id-yes",
          });
        else {
          document.getElementById("otpModalBtnclose").click();
          toast.success(data.success, {
            toastId: "custom-id-yes",
          });
          navigate("/payment", {
            state: {
              newid,
              name: formdata.name,
              aadharno: formdata.aadharno,
              ititrade: ititrade[formdata.ititrade],
            },
          });
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message, {
          toastId: "custom-id-yes",
        });
      });
  };

  return (
    <div className="signup-body">
      <div className="row">
        <div className="form-holder">
          <div className="form-content">
            <div className="form-items">
              <h3>Register Today</h3>
              <p>Fill in the data below.</p>
              <form onSubmit={handleSubmit} className="">
                <div className="col-md-12">
                  <input
                    className="form-control"
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formdata.name}
                    onChange={handlechange}
                    required
                  />
                </div>
                <div className="col-md-12">
                  <input
                    className="form-control"
                    type="text"
                    name="aadharno"
                    placeholder="Aadhar Card Number"
                    value={formdata.aadharno}
                    onChange={handlechange}
                    required
                  />
                </div>
                <div className="col-md-12">
                  <input
                    className="form-control"
                    type="email"
                    name="email"
                    placeholder="E-mail Address"
                    value={formdata.email}
                    onChange={handlechange}
                    required
                  />
                </div>
                <div className="col-md-12">
                  <input
                    className="form-control"
                    type="number"
                    name="phone"
                    placeholder="Phone Number"
                    value={formdata.phone}
                    onChange={handlechange}
                    required
                  />
                </div>
                <div className="col-md-12">
                  <select
                    onChange={handlechange}
                    name="passingyear"
                    className="form-select mt-3"
                    required
                  >
                    <option defaultValue hidden>
                      Year of Passing
                    </option>
                    {passingyear.map((year, idx) => (
                      <option key={idx} value={idx}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-12">
                  <select
                    onChange={handlechange}
                    name="ititrade"
                    className="form-select mt-3"
                    required
                  >
                    <option defaultValue hidden>
                      ITI Trade
                    </option>
                    {ititrade.map((trade, idx) => (
                      <option key={idx} value={idx}>
                        {trade}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-12">
                  <input
                    className="form-control"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formdata.password}
                    onChange={handlechange}
                    required
                  />
                  <div className="valid-feedback">Password field is valid!</div>
                  <div className="invalid-feedback">
                    Password field cannot be blank!
                  </div>
                </div>
                <div className="form-check my-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="invalidCheck"
                    required
                  />
                  <label className="form-check-label">
                    I confirm that all data are correct
                  </label>
                </div>
                <div className="form-button mt-3 d-flex justify-content-between">
                  <button id="submit" type="submit" className="btn btn-success">
                    {loading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm mx-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Loading...
                      </>
                    ) : (
                      "Register"
                    )}
                  </button>
                  <div className="">
                    <Link to="/" className="btn mx-2 btn-primary">
                      Go Back home
                    </Link>
                    <Link to="/login" className="btn btn-primary">
                      Login
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <button
        id="otpModalBtn"
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
        Launch static backdrop modal
      </button>
      <div
        className=" otpmodal modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Enter OTP sent to your email
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <h5>Otp has been sent to your email id : {formdata.email} </h5>
              <input
                className="form-control mt-3"
                type="number"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setotp(e.target.value)}
              />
            </div>
            <div className="modal-footer">
              <button
                id="otpModalBtnclose"
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                onClick={handleotp}
                type="button"
                className="btn btn-success"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
