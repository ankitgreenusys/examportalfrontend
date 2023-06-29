import React from "react";

const Index = () => {
  const [question, setQuestion] = React.useState("");
  const [options, setOptions] = React.useState([""]);

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const removeOption = (index) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

  const addques = () => {
    console.log(question, options);
  };

  const clear = () => {
    setQuestion("");
    setOptions([""]);
  };

  return (
    <div className="addques-page flex-column align-items-center d-flex justify-content-center">
      <div className="white-header">
        <h1>Add Questions</h1>
      </div>
      <div className="white-box">
        <div className="">
          <div className="addquesform">
            <h5 className="mb-2">Question:</h5>
            <textarea
              className="form-control"
              rows="3"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            ></textarea>
          </div>
        </div>
        <div className="mt-4">
          <div className="addquesform">
            <h5 className="mb-2">Add Options:</h5>
          </div>
          {options.map((option, index) => (
            <div className="addquesform my-3" key={index}>
              <div className="d-flex justify-content-between">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Option"
                  value={option}
                  onChange={(e) => {
                    const newOptions = [...options];
                    newOptions[index] = e.target.value;
                    setOptions(newOptions);
                  }}
                />
                <button
                  className="btn btn-danger mx-2 rounded-circle"
                  onClick={() => removeOption(index)}
                >
                  <i class="fa-solid fa-trash"></i>
                </button>
                <button
                  className="btn btn-success rounded-circle"
                  onClick={() => addOption()}
                >
                  <i class="fa-solid fa-plus"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="detailsbtns bottom-btns">
        <button onClick={clear} className="exambtn btn-red">
          Clear
        </button>
        <button onClick={addques} className="exambtn btn-green">
          Add Question
        </button>
      </div>
    </div>
  );
};

export default Index;
