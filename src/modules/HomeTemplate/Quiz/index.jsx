import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const quizData = [
  {
    question: "Do you use protection during sex?",

    image: "/quiz/01.jpg",
    options: ["Yes", "No"],
  },
  {
    question: "Have you experienced any of the following symptoms?",

    image: "/quiz/02.jpg",
    options: ["Itching", "Unusual discharge", "No symptoms"],
  },
  {
    question: "Have you had multiple partners in the last 6 months?",

    image: "/quiz/03.jpg",
    options: ["Yes", "No"],
  },
  {
    question:
      "Have you ever shared personal items (towels, underwear, razors)?",

    image: "/quiz/04.jpg",
    options: ["Yes", "No", "I don't remember"],
  },
  {
    question: "Do you get regular STI checkups?",

    image: "/quiz/05.jpg",
    options: ["Yes – every 6 months", "Yes – but irregularly", "Never"],
  },
];

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (option) => {
    const updatedAnswers = [...answers, option];
    setAnswers(updatedAnswers);

    if (currentQuestion + 1 < quizData.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const renderResult = () => {
    const risky = answers.includes("Yes") && !answers.includes("No symptoms");

    return (
      <motion.div
        className="quiz-result"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2>Preliminary Assessment Result</h2>
        <p>
          {risky
            ? "⚠️ Your responses suggest a potential risk of sexually transmitted infections. We recommend scheduling a test as soon as possible."
            : "✅ Your current risk appears to be low. However, regular STI testing is still important to maintain your sexual health."}
        </p>
        <div className="quiz-buttons">
          <button onClick={() => alert("Redirecting to booking page...")}>
            Book a Test
          </button>
          <button onClick={() => (window.location.href = "/")}>
            Return to Homepage
          </button>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="quiz-container">
      <div className="quiz-box">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1>Quick Quiz: Check Your Sexual Health</h1>
          <p className="quiz-intro">
            It takes just 1 minute to find out if you should consider an STI
            test. 100% anonymous and private.
          </p>

          {showResult ? (
            renderResult()
          ) : (
            <div className="quiz-question">
              <img
                src={quizData[currentQuestion]?.image}
                alt="illustration"
                className="quiz-image"
              />
              <h2>
                Question {currentQuestion + 1}/{quizData.length}
              </h2>

              <p>{quizData[currentQuestion]?.question}</p>
              <div className="quiz-options">
                {quizData[currentQuestion]?.options?.map((option, idx) => (
                  <button key={idx} onClick={() => handleAnswer(option)}>
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
