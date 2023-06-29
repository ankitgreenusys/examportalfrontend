import React from "react";
import "./Styles.css";

import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContext } from "../../Context";

const Index = () => {
  const navigate = useNavigate();
  const { login, isLoading, error, user } = React.useContext(AppContext);

  React.useEffect(() => {
    if (user && user.name) {
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
      } else {
        toast.success(`Welcome ${user.name}`, {
          toastId: "custom-id-yes",
        });
        navigate("/");
      }
    }
    if (error) {
      console.log(error);
      toast.error(error, {
        toastId: "custom-id-yes",
      });
    }
  }, [isLoading, user, error]);

  const [formdata, setformdata] = React.useState({
    email: "",
    password: "",
  });

  const handlechange = (e) => {
    const { name, value } = e.target;
    setformdata((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formdata);
    login(formdata, "student");
  };

  return (
    <div className="signup-body">
      <div className="row">
        <div className="form-holder">
          <div className="form-content">
            <div className="form-items">
              <h3>Hey there! Welcome back.</h3>
              <p>Open the door to great learning opportunities.</p>
              <form onSubmit={handleSubmit} className="">
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
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formdata.password}
                    onChange={handlechange}
                    required
                  />
                </div>
                <div className="form-button mt-3 d-flex justify-content-between">
                  <button id="submit" type="submit" className="btn btn-success">
                    Login
                  </button>
                  <div className="">
                    <Link to="/" className="btn mx-2 btn-primary">
                      Go Back home
                    </Link>
                    <Link to="/signup" className="btn btn-primary">
                      Sign Up
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
