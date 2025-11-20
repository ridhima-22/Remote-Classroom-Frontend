import React, { useState } from 'react';

const UploadForm = ({ onAddMaterial }) => { 
 
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [notesUrl, setNotesUrl] = useState('');
  const [message, setMessage] = useState('');
  
  
  const [passScore, setPassScore] = useState(1);
  const [questions, setQuestions] = useState([
    
    { q: '', options: ['', ''], correct: 0 } 
  ]);

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].q = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[oIndex] = value;
    setQuestions(newQuestions);
  };

  const handleCorrectAnswerChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].correct = Number(value);
    setQuestions(newQuestions);
  };

  
  const handleAddOption = (qIndex) => {
    const newQuestions = [...questions];
    if (newQuestions[qIndex].options.length < 4) {
      newQuestions[qIndex].options.push('');
      setQuestions(newQuestions);
    }
  };

  
  const handleAddNewQuestion = () => {
    setQuestions([
      ...questions,
      { q: '', options: ['', ''], correct: 0 } 
    ]);
  };

  
  const handleRemoveQuestion = (index) => {
    if (questions.length <= 1) return; 

    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  };
  

  const handleSubmit = (e) => {
    e.preventDefault(); 
    setMessage('');

    if (!title || !subject || !videoUrl) {
      setMessage('Title, Subject, and Video URL are required.');
      return;
    }

    
    let newQuizData = null;
    
    
    const validQuestions = questions
      .map(q => ({
        ...q,
        options: q.options.filter(opt => opt && opt.trim() !== "") // Khaali options ko hatao
      }))
      .filter(q => q.q.trim() !== "" && q.options.length >= 2); 
    
    if (validQuestions.length > 0) {
      newQuizData = {
        title: `Quiz for ${title}`,
        passScore: Number(passScore),
        questions: validQuestions 
      };
    }
    

    onAddMaterial({ title, subject, videoUrl, notesUrl, quiz: newQuizData });
    
    setMessage('Material uploaded successfully!');
    
    
    setTitle(''); setSubject(''); setVideoUrl(''); setNotesUrl('');
    setPassScore(1);
    setQuestions([{ q: '', options: ['', ''], correct: 0 }]); 

    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="card p-4 p-md-5" style={{ maxWidth: '900px', margin: 'auto' }}>
      <h2 className="mb-4 text-center">Upload New Material</h2>
      
      {message && (
        <div className="alert alert-success">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        
        <fieldset className="mb-4">
          <legend className="h5 mb-3">1. Course Details</legend>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label htmlFor="subject" className="form-label">Subject</label>
            <input type="text" className="form-control" id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label htmlFor="videoUrl" className="form-label">Video URL (YouTube Link)</label>
            <input type="text" className="form-control" id="videoUrl" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label htmlFor="notesUrl" className="form-label">Notes URL (Optional)</label>
            <input type="text" className="form-control" id="notesUrl" value={notesUrl} onChange={(e) => setNotesUrl(e.target.value)} />
          </div>
        </fieldset>

        
        <fieldset className="mb-4">
          <legend className="h5 mb-3">2. Create Test (Optional)</legend>
          <div className="mb-3" style={{maxWidth: '200px'}}>
             <label htmlFor="passScore" className="form-label">Passing Score</label>
             <input type="number" className="form-control" id="passScore" value={passScore} onChange={(e) => setPassScore(e.target.value)} min="1" />
          </div>
          <hr />
          
          
          {questions.map((question, qIndex) => (
            <div key={qIndex} className="quiz-question-builder card card-body mb-3">
             
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h6 className="mb-0">Question {qIndex + 1}</h6>
                {questions.length > 1 && (
                  <button 
                    type="button" 
                    className="btn btn-sm btn-outline-danger" 
                    onClick={() => handleRemoveQuestion(qIndex)}
                  >
                    <i className="bi bi-trash-fill"></i> Remove
                  </button>
                )}
              </div>
              
              
              <div className="mb-3">
                <label htmlFor={`q_text_${qIndex}`} className="form-label">Question Text</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id={`q_text_${qIndex}`}
                  value={question.q} 
                  onChange={(e) => handleQuestionChange(qIndex, e.target.value)} 
                />
              </div>
              
              
              <label className="form-label">Options</label>
              <div className="row">
                {question.options.map((option, oIndex) => (
                  <div key={oIndex} className="col-md-6 mb-2">
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder={`Option ${oIndex + 1}`}
                      value={option} 
                      onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                    />
                  </div>
                ))}
              </div>

              
              {question.options.length < 4 && (
                <button 
                  type="button" 
                  className="btn btn-sm btn-outline-secondary mt-2" 
                  style={{maxWidth: '150px'}}
                  onClick={() => handleAddOption(qIndex)}
                >
                  + Add Option
                </button>
              )}
              
              
              <div className="mt-3">
                <label htmlFor={`q_correct_${qIndex}`} className="form-label">Correct Answer</label>
                <select 
                  id={`q_correct_${qIndex}`} 
                  className="form-select" 
                  style={{maxWidth: '200px'}}
                  value={question.correct} 
                  onChange={(e) => handleCorrectAnswerChange(qIndex, e.target.value)}
                >
                  {question.options.map((opt, index) => (
                    
                    opt.trim() !== "" &&
                    <option key={index} value={index}>
                      Option {index + 1}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
          
          
          <button 
            type="button" 
            className="btn btn-outline-primary" 
            onClick={handleAddNewQuestion}
          >
            + Add Another Question
          </button>
        </fieldset>
        
        <button type="submit" className="btn btn-success w-100 btn-lg mt-3">
          <i className="bi bi-cloud-arrow-up-fill me-1"></i> Upload Material & Test
        </button>
      </form>
    </div>
  );
};

export default UploadForm;