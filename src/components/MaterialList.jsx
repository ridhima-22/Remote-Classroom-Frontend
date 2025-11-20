import React, { useState } from 'react';

const MaterialList = ({ 
  materials, 
  title = "Study Materials", 
  currentUser, 
  onTakeTest,
  onDeleteMaterial,
  onMarkComplete 
}) => {
  
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All');
  
  const isStudent = currentUser && currentUser.type === 'student';
  const isTeacher = currentUser && currentUser.type === 'teacher';

  
  const allSubjects = [...new Set(materials.map(mat => mat.subject))];

  const filteredMaterials = materials
    .filter(material => {
      
      return selectedSubject === 'All' || material.subject === selectedSubject;
    })
    .filter(material => {
      
      return material.title.toLowerCase().includes(searchTerm.toLowerCase());
    });
  

  
  
  if (materials.length === 0 && title === "My Uploaded Materials") {
    return (
      <div className="text-center card p-5">
        <h3>{title}</h3>
        <p className="text-muted">You have not uploaded any materials yet.</p>
      </div>
    );
  }

  return (
    <div>
      
      <div className="card p-3 mb-4 filter-controls">
        <div className="row g-2">
          
          <div className="col-md-8">
            <input 
              type="text"
              className="form-control"
              placeholder="Search by course title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
         
          <div className="col-md-4">
            <select 
              className="form-select"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
            >
              <option value="All">All Subjects</option>
              {allSubjects.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      <div className="row">
        <h2 className="mb-4">{title}</h2>
        
        
        {filteredMaterials.length === 0 && (
          <div className="col-12">
            <p className="text-center text-muted">No courses found matching your search.</p>
          </div>
        )}

        
        {filteredMaterials.map(material => {
          
          let isCompleted = false;
          if (isStudent) {
            isCompleted = currentUser.completedCourses.includes(material._id);
          }
          const hasQuiz = material.quiz && material.quiz.questions && material.quiz.questions.length > 0;

          return (
            <div key={material._id} className="col-md-6 mb-4">
              <div className={`card ${isCompleted ? 'card-completed' : ''}`}>
                <div className="card-body">
                  
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="badge bg-primary-subtle text-primary-emphasis">
                      {material.subject}
                    </span>
                    {isStudent && isCompleted && (
                      <span className="badge-completed">
                        <i className="bi bi-check-circle-fill me-1"></i> Completed
                      </span>
                    )}
                  </div>

                  <h5 className="card-title">{material.title}</h5>
                  <p className="text-muted small">
                    Uploaded on: {new Date(material.date).toLocaleDateString()}
                  </p>
                  
                  
                  <a href={material.videoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary me-2">
                    <i className="bi bi-play-circle-fill me-1"></i> Watch Video
                  </a>
                  
                  {material.notesUrl && (
                    <a href={material.notesUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline-secondary me-2">
                      <i className="bi bi-file-earmark-text-fill me-1"></i> Read Notes
                    </a>
                  )}

                 
                  {isStudent && hasQuiz && !isCompleted && (
                    <button className="btn btn-warning" onClick={() => onTakeTest(material)}>
                      <i className="bi bi-pencil-square me-1"></i> Take Test
                    </button>
                  )}
                  
                  {isStudent && isCompleted && (
                    <button className="btn btn-success" disabled style={{cursor: 'not-allowed', opacity: 0.7}}>
                      <i className="bi bi-check-all me-1"></i> Test Passed
                    </button>
                  )}
                  
                  {isStudent && !hasQuiz && !isCompleted && (
                    <button className="btn btn-info" onClick={() => onMarkComplete(material._id)}>
                      <i className="bi bi-check-lg me-1"></i> Mark as Complete
                    </button>
                  )}

                 
                  {isTeacher && (
                    <button 
                      className="btn btn-outline-danger ms-2"
                      onClick={() => onDeleteMaterial(material._id)}
                    >
                      <i className="bi bi-trash-fill"></i>
                    </button>
                  )}
                 

                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MaterialList;