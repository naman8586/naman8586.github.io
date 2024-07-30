import React, { useState, useRef, useEffect } from 'react';
import './Quiz.css';
import { data } from '../assets/data.js';

function Quiz() {
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(data[0]);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);

  const option1 = useRef(null);
  const option2 = useRef(null);
  const option3 = useRef(null);
  const option4 = useRef(null);

  const option_array = [option1, option2, option3, option4];

  useEffect(() => {
    setQuestion(data[index]);
    setLock(false);
    option_array.forEach(option => {
      option.current.classList.remove("correct", "incorrect");
    });
  }, [index]);

  const checkAns = (e, ans) => {
    if (!lock) {
      if (question.ans === ans) {
        e.target.classList.add("correct");
        setScore(score + 1);
      } else {
        e.target.classList.add("incorrect");
        option_array[question.ans - 1].current.classList.add("correct");
      }
      setLock(true);
    }
  };

  const handleNextQuestion = () => {
    if (index < data.length - 1) {
      setIndex(index + 1);
    }
  };

  return (
    <div className='container'>
      <h1>Quiz App</h1>
      <hr />
      {index < data.length ? (
        <>
          <h2>{index + 1}. {question.question}</h2>
          <ul>
            <li ref={option1} onClick={(e) => checkAns(e, 1)}>{question.option1}</li>
            <li ref={option2} onClick={(e) => checkAns(e, 2)}>{question.option2}</li>
            <li ref={option3} onClick={(e) => checkAns(e, 3)}>{question.option3}</li>
            <li ref={option4} onClick={(e) => checkAns(e, 4)}>{question.option4}</li>
          </ul>
          <button onClick={handleNextQuestion} disabled={index >= data.length - 1}>Next</button>
          <div className='index'>{index + 1} of {data.length} Questions</div>
        </>
      ) : (
        <div className='score'>
          <h2>Your Score: {score} out of {data.length}</h2>
        </div>
      )}
    </div>
  );
}

export default Quiz;
