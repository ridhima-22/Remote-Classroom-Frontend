import React, { useState } from "react";
import MaterialList from "./MaterialList";
import UploadForm from "./UploadForm";
import AccountProfile from "./AccountProfile";
import StudentAccountProfile from "./StudentAccountProfile";
import TeacherAnalytics from "./TeacherAnalytics";
import Quiz from "./Quiz";
import DiscussionForum from "./DiscussionForum";

const Classroom = ({
  currentUser,
  onLogout,
  materials,
  onAddMaterial,
  allUsers,
  onMarkComplete,
  onDeleteMaterial, 
}) => {
  const [activeView, setActiveView] = useState(
    currentUser.type === "teacher" ? "my_uploads" : "courses"
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [quizCourse, setQuizCourse] = useState(null);

  const handleQuizComplete = (courseId, passed) => {
    if (passed) {
      onMarkComplete(courseId);
    }
    setQuizCourse(null);
  };

  // student view
  if (currentUser.type === "student") {
    
    if (quizCourse) {
      return (
        <Quiz
          courseId={quizCourse._id}
          quizData={quizCourse.quiz}
          onCompleteQuiz={handleQuizComplete}
        />
      );
    }
    
    // Normal dashboard
    return (
      <div className={`teacher-dashboard ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <nav className="sidebar-container">
          
          <div className="sidebar-header"><h2>🎓 Classroom</h2></div>
          <div className="sidebar-nav">
            <a href="#" className={`sidebar-link ${activeView === 'account' ? 'active' : ''}`} onClick={() => setActiveView('account')}>
              <i className="bi bi-person-circle"></i> My Account
            </a>
            <a href="#" className={`sidebar-link ${activeView === 'courses' ? 'active' : ''}`} onClick={() => setActiveView('courses')}>
              <i className="bi bi-book-fill"></i> Courses
            </a>
            <a href="#" className={`sidebar-link ${activeView === 'discussions' ? 'active' : ''}`} onClick={() => setActiveView('discussions')}>
              <i className="bi bi-chat-left-dots-fill"></i> Discussions
            </a>
          </div>
          <div className="sidebar-logout">
            <button className="btn btn-outline-light" onClick={onLogout}>
              <i className="bi bi-box-arrow-right me-2"></i> Logout
            </button>
          </div>
        </nav>

        <main className="content-container">
          <div className="content-header">
          
            <div className="content-header-title-group">
              <button className="hamburger-btn" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                <i className="bi bi-list"></i>
              </button>
              <h2>Welcome, {currentUser.name}!</h2>
            </div>
            <div className="header-actions">
              
              <span className="text-muted">You are logged in as a Student.</span>
            </div>
          </div>

          {activeView === 'account' && (
            <StudentAccountProfile 
              currentUser={currentUser} 
              totalCourses={materials.length} 
            />
          )}
          {activeView === 'courses' && (
            <MaterialList 
              materials={materials} 
              title="All Study Materials" 
              currentUser={currentUser} 
              onTakeTest={(material) => {
                if (material.quiz) {
                  setQuizCourse(material);
                } else {
                  alert("A quiz for this course has not been created yet.");
                }
              }}
              
              onDeleteMaterial={onDeleteMaterial} 
            />
          )}
          {activeView === 'discussions' && (
            <DiscussionForum currentUser={currentUser} />
          )}
        </main>
      </div>
    );
  }

  //  TEACHER  

  const myUploads = materials.filter(
    (material) => material.teacherId === currentUser.id
  );
  const allStudents = allUsers.filter(user => user.type === 'student');

  const handleMaterialAdded = (newMaterialData) => {
    onAddMaterial(newMaterialData);
    setActiveView("my_uploads");
  };

  return (
    <div className={`teacher-dashboard ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <nav className="sidebar-container">
        
        <div className="sidebar-header"><h2>🎓 Dashboard</h2></div>
        <div className="sidebar-nav">
          <a href="#" className={`sidebar-link ${activeView === 'account' ? 'active' : ''}`} onClick={() => setActiveView('account')}>
            <i className="bi bi-person-circle"></i> My Account
          </a>
          <a href="#" className={`sidebar-link ${activeView === 'analytics' ? 'active' : ''}`} onClick={() => setActiveView('analytics')}>
            <i className="bi bi-bar-chart-line-fill"></i> Analytics 
          </a>
          <a href="#" className={`sidebar-link ${activeView === 'my_uploads' ? 'active' : ''}`} onClick={() => setActiveView('my_uploads')}>
            <i className="bi bi-collection-fill"></i> My Uploads
          </a>
          <a href="#" className={`sidebar-link ${activeView === 'upload' ? 'active' : ''}`} onClick={() => setActiveView('upload')}>
            <i className="bi bi-upload"></i> Upload New
          </a>
        </div>
        <div className="sidebar-logout">
          <button className="btn btn-outline-light" onClick={onLogout}>
            <i className="bi bi-box-arrow-right me-2"></i> Logout
          </button>
        </div>
      </nav>

      <main className="content-container">
        
        <div className="content-header">
            <div className="content-header-title-group">
              <button className="hamburger-btn" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                <i className="bi bi-list"></i>
              </button>
              <h2>Welcome, {currentUser.name}!</h2>
            </div>
            <div className="header-actions">
              
              <span className="text-muted">You are logged in as a Teacher.</span>
            </div>
        </div>

        {activeView === 'account' && (<AccountProfile currentUser={currentUser} />)}
        {activeView === 'analytics' && (<TeacherAnalytics myUploads={myUploads} allStudents={allStudents} />)}
        
        {activeView === 'my_uploads' && (
          <MaterialList 
            materials={myUploads} 
            title="My Uploaded Materials" 
            currentUser={currentUser} 
            onDeleteMaterial={onDeleteMaterial}
          />
        )}
        
        {activeView === 'upload' && (<UploadForm onAddMaterial={handleMaterialAdded} />)}
      </main>
    </div>
  );
};

export default Classroom;