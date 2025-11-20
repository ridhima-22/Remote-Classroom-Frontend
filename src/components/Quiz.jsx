import React, { useState } from 'react';


const MOCK_QUIZZES = {
  "1": {
    title: "Introduction to Algebra Quiz",
    questions: [
      { q: "What is 2 + 2?", options: ["3", "4", "5", "6"], correct: 1 },
      { q: "What is 5 x 5?", options: ["20", "25", "30", "15"], correct: 1 },
      { q: "What is 10 - 7?", options: ["3", "4", "2", "1"], correct: 0 },
    ],
    passScore: 2 
  },
  "2": { 
    title: "Photosynthesis Quiz",
    questions: [
      { q: "What do plants absorb from the air?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide"], correct: 2 },
      { q: "What is the green pigment in plants?", options: ["Chlorophyll", "Melanin", "Stomata"], correct: 0 },
    ],
    passScore: 1
  },
  "3": {
    title: "Advanced Algebra Quiz",
    questions: [
      { q: "What is x in: 2x = 10?", options: ["3", "4", "5", "6"], correct: 2 },
    ],
    passScore: 1
  }
};


const Quiz = ({ courseId, quizData, onCompleteQuiz }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [isPassed, setIsPassed] = useState(false);
  
  
  const [userAnswers, setUserAnswers] = useState([]); 

  if (!quizData || !quizData.questions || quizData.questions.length === 0) {
    
    return (
        <div className="quiz-container card">
          <h2>Quiz Not Available</h2>
          <p className="text-muted">A quiz for this course has not been created yet.</p>
          <button className="btn btn-primary" onClick={() => onCompleteQuiz(courseId, false)}>
            Back to Courses
          </button>
        </div>
      );
  }

  const handleAnswerClick = (selectedOptionIndex) => {
    
    setUserAnswers([...userAnswers, selectedOptionIndex]);

    
    let newScore = score;
    if (selectedOptionIndex === quizData.questions[currentQuestion].correct) {
      newScore = score + 1;
      setScore(newScore);
    }
    
    
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizData.questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
      if (newScore >= quizData.passScore) {
        setIsPassed(true);
      }
    }
  };

  return (
    <div className="quiz-container card">
      {showScore ? (
       
        <div className="quiz-score-section">
          {isPassed ? (
            <h2 className="text-success">Congratulations! You Passed!</h2>
          ) : (
            <h2 className="text-danger">Better Luck Next Time!</h2>
          )}
          
          <p>You scored {score} out of {quizData.questions.length}</p>
          <p className="text-muted">
            (Passing score was {quizData.passScore})
          </p>

          
          <div className="answer-review mt-5">
            <h4 className="text-start mb-3">Answer Review</h4>
            <ul className="list-group list-group-flush text-start">
              {quizData.questions.map((question, index) => {
                const userAnswerIndex = userAnswers[index];
                const correctAnswerIndex = question.correct;
                const isCorrect = userAnswerIndex === correctAnswerIndex;

                return (
                  <li key={index} className="list-group-item review-item">
                    <strong className="review-question">Q: {question.q}</strong>
                    
                    
                    <p className={`mb-1 ${isCorrect ? 'text-success' : 'text-danger'}`}>
                      <strong>Your Answer:</strong> {question.options[userAnswerIndex]}
                      {isCorrect ? <i className="bi bi-check-lg ms-2"></i> : <i className="bi bi-x-lg ms-2"></i>}
                    </p>
                    
                    
                    {!isCorrect && (
                      <p className="mb-0 text-success review-correct-answer">
                        <strong>Correct Answer:</strong> {question.options[correctAnswerIndex]}
                      </p>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          <button 
            className="btn btn-primary mt-4" 
            onClick={() => onCompleteQuiz(courseId, isPassed)}
          >
            Back to Courses
          </button>
        </div>
      ) : (
        
        <div className="quiz-question-section">
          <h2 className="mb-3">{quizData.title}</h2>
          <div className="quiz-question-count mb-3">
            <span>Question {currentQuestion + 1}</span>/{quizData.questions.length}
          </div>
          <h4 className="quiz-question-text mb-4">
            {quizData.questions[currentQuestion].q}
          </h4>
          <div className="quiz-options">
            {quizData.questions[currentQuestion].options.map((option, index) => (
              <button 
                key={index} 
                className="btn btn-outline-primary" 
                onClick={() => handleAnswerClick(index)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;