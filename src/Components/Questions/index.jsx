import React from "react";
import "./Styles.css";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context";

import Student_URL from "../../Api/Student.url";

const Index = () => {
  const navigate = useNavigate();
  const { userJwt, user } = React.useContext(AppContext);

  const [question, setQuestion] = React.useState({});
  const [answer, setAnswer] = React.useState("");
  const [timer, setTimer] = React.useState(1200);

  const setTimer2 = (time) => {
    fetch(Student_URL + "changeTimer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userJwt,
      },
      body: JSON.stringify({
        currentTimer: time,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          toast.error(data.error, {
            toastId: "custom-id-yes",
          });
        } else {
          console.log(data);
        }
      });
  };

  const nextquestion = async () => {
    try {
      const res = await fetch(Student_URL + "getquestion", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + userJwt,
        },
      });

      const data = await res.json();

      if (data.error) {
        toast.error(data.error, {
          toastId: "custom-id-yes",
        });

        if (data.error == "Test completed") navigate("/endexam");
      } else {
        console.log(data);
        setQuestion(data);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong", {
        toastId: "custom-id-yes",
      });
    }
  };

  const submitAnswer = async () => {
    try {
      const res = await fetch(Student_URL + "submitanswer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + userJwt,
        },
        body: JSON.stringify({
          answer: answer,
        }),
      });

      const data = await res.json();

      if (data.error) {
        toast.error(data.error, {
          toastId: "custom-id-yes",
        });
      } else {
        console.log(data);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong", {
        toastId: "custom-id-yes",
      });
    }
  };

  const SkipQuestion = async () => {
    try {
      const res = await fetch(Student_URL + "submitanswer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + userJwt,
        },
        body: JSON.stringify({
          answer: "skip",
        }),
      });

      const data = await res.json();

      if (data.error) {
        toast.error(data.error, {
          toastId: "custom-id-yes",
        });
      } else {
        console.log(data);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong", {
        toastId: "custom-id-yes",
      });
    }
  };

  React.useEffect(() => {
    if (!userJwt || !user) {
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

    nextquestion();

    fetch(Student_URL + "gettimer", {
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
          setTimer(data.currentTimer);
        }
      });
  }, []);

  React.useEffect(() => {
    let tim = timer;
    const interval = setInterval(() => {
      if (timer >= 0) {
        setTimer((prev) => prev - 1);
        if (tim % 15 === 0) {
          setTimer2(tim);
        }
      } else {
        toast.error("Time is up", {
          toastId: "custom-id-yes",
        });
        navigate("/endexam");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  // React.useEffect(() => {
  //   let tim = timer;

  //   const interval2 = setInterval(() => {
  //     tim = tim - 15;
  //     fetch(Student_URL + "changeTimer", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: "Bearer " + userJwt,
  //       },
  //       body: JSON.stringify({
  //         currentTimer: tim,
  //       }),
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         if (data.error) {
  //           toast.error(data.error, {
  //             toastId: "custom-id-yes",
  //           });
  //           clearInterval(interval2);
  //         } else {
  //           console.log(data);
  //         }
  //       });
  //   }, 15000);

  //   return () => clearInterval(interval2);
  // }, []);

  const handleAnswer = (e) => {
    setAnswer(e.target.value);
  };

  const handleSkip = async () => {
    await SkipQuestion();
    await nextquestion();
    setAnswer("");
  };

  const handleNext = async () => {
    if (answer === "") {
      toast.error("Please select an answer", {
        toastId: "custom-id-yes",
      });
      return;
    }
    await submitAnswer();
    await nextquestion();
    setAnswer("");
    console.log(answer);
  };

  return (
    <div className="question-page">
      <div className="white-box quesheading mb-3 d-flex justify-content-between flex-wrap">
        <div className="headitem">Name : {user?.name}</div>
        <div className="headitem">Questions: {question?.questionno}/20</div>
        <div className="headitem">
          Time Left : {Math.floor(timer / 60)}:{timer % 60}{" "}
        </div>
      </div>
      <div className="question-page-inner white-box">
        <h2 id="question-page-label">{question?.question}</h2>
        <label>
          <input
            type="radio"
            name="options"
            value={question?.option1}
            checked={answer === question?.option1}
            onChange={handleAnswer}
          />
          <span className="radio"></span>
          <span className="label">{question?.option1}</span>
        </label>
        <label>
          <input
            type="radio"
            name="options"
            value={question?.option2}
            checked={answer === question?.option2}
            onChange={handleAnswer}
          />
          <span className="radio"></span>
          <span className="label">{question?.option2}</span>
        </label>
        <label>
          <input
            type="radio"
            name="options"
            value={question?.option3}
            checked={answer === question?.option3}
            onChange={handleAnswer}
          />
          <span className="radio"></span>
          <span className="label">{question?.option3}</span>
        </label>
        <label>
          <input
            type="radio"
            name="options"
            value={question?.option4}
            checked={answer === question?.option4}
            onChange={handleAnswer}
          />
          <span className="radio"></span>
          <span className="label">{question?.option4}</span>
        </label>
      </div>
      <div className="bottom-btns">
        <button onClick={handleSkip} className="exambtn btn-red">
          Skip
        </button>
        <button className="exambtn btn-green" onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Index;
