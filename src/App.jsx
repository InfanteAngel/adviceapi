import { useEffect, useState } from "react";
import "./App.css";
import React from "react";

const diceIcon = (
  <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M20 0H4a4.005 4.005 0 0 0-4 4v16a4.005 4.005 0 0 0 4 4h16a4.005 4.005 0 0 0 4-4V4a4.005 4.005 0 0 0-4-4ZM7.5 18a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm0-9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm4.5 4.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm4.5 4.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm0-9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z"
      fill="#202733"
    />
  </svg>
);

const patternDividerDesktop = (
  <svg width="444" height="16" xmlns="http://www.w3.org/2000/svg">
    <g fill="none" fillRule="evenodd">
      <path fill="#4F5D74" d="M0 8h196v1H0zM248 8h196v1H248z" />
      <g transform="translate(212)" fill="#CEE3E9">
        <rect width="6" height="16" rx="3" />
        <rect x="14" width="6" height="16" rx="3" />
      </g>
    </g>
  </svg>
);

const patternDividerMb = (
  <svg width="295" height="16" xmlns="http://www.w3.org/2000/svg">
    <g fill="none" fill-rule="evenodd">
      <path fill="#4F5D74" d="M0 8h122v1H0zM173 8h122v1H173z" />
      <g transform="translate(138)" fill="#CEE3E9">
        <rect width="6" height="16" rx="3" />
        <rect x="14" width="6" height="16" rx="3" />
      </g>
    </g>
  </svg>
);

const url = "https://api.adviceslip.com/advice";
const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);
  const [text, setText] = useState([]);

  const generateAdvice = () => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        const textAdvice = await response.json();
        const finalOutput = textAdvice.slip;
        setText(finalOutput);
        console.log(textAdvice);
      } catch (error) {
        setError(true);
        console.log(error);
      }
    };
    setLoading(false);
    fetchData();
  };

  useEffect(() => {
    generateAdvice();
  }, []);

  if (isLoading) {
    return <h1 className="computerMessage">Loading...</h1>;
  }
  if (isError) {
    return <h1 className="computerMessage">There was an error...</h1>;
  }
  const { advice, id } = text;
  return (
    <div>
      <div className="myBox container">
        <div key={id} className="container">
          <div className="adviceNumber">
            <h1 className="adviceTextNum">Advice # {id}</h1>
          </div>
          <div className="textContainer">
            <h1 className="adviceText">"{advice}"</h1>
          </div>
        </div>
        <div className="myPattern">{patternDividerDesktop}</div>
        <div className="myPatternMb">{patternDividerMb}</div>
      </div>
      <div className="buttonContain">
        <button className="diceButton" type="button" onClick={generateAdvice}>
          {diceIcon}
        </button>
      </div>
    </div>
  );
};

export default App;
