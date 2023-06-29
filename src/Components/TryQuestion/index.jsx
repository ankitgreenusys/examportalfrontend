import React from "react";
import "./Styles.css";

const index = () => {
  return (
    <div className="tryques-page">
      <input id="rotated" type="checkbox" name="rotated" defaultChecked />
      <label for="rotated">Rotate the form</label>
      <form>
        <h3 data-text="Choose Your Language">Choose Your Language</h3>
        <label data-text="JavaScript">
          <input type="radio" name="language" value="js" /> JavaScript
          <span className="dot"></span>
          <span className="dot-shadow"></span>
        </label>
        <label data-text="PHP">
          <input type="radio" name="language" value="php" /> PHP
          <span className="dot"></span>
          <span className="dot-shadow"></span>
        </label>
        <label data-text="Python">
          <input type="radio" name="language" value="py" /> Python
          <span className="dot"></span>
          <span className="dot-shadow"></span>
        </label>
        <label data-text="Swift">
          <input type="radio" name="language" value="swift" /> Swift
          <span className="dot"></span>
          <span className="dot-shadow"></span>
        </label>
      </form>
    </div>
  );
};

export default index;
