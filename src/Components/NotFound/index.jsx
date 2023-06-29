import React from "react";
import "./Styles.css";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="notfound" >
      <p>
        HTTP: <span>404</span>
      </p>
      <code>
        <span>this_page</span>.<em>not_found</em> = true;
      </code>
      <center>
        <Link to="/">Go To Home</Link>
      </center>
    </div>
  );
};

export default Index;
