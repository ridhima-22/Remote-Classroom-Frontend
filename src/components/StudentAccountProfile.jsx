import React from 'react';

const StudentAccountProfile = ({ currentUser, totalCourses }) => {
  
  
  const completed = currentUser.completedCourses.length;
  const progressPercent = totalCourses > 0 ? (completed / totalCourses) * 100 : 0;
  

  return (
    <div className="card p-4 p-md-5 profile-card">
      <div className="profile-header">
        <img 
          src={currentUser.profilePicUrl} 
          alt="Profile" 
          className="profile-pic"
        />
        <div className="profile-header-info">
          <h2>{currentUser.name}</h2>
          <p>{currentUser.year} Student</p>
        </div>
      </div>

     
      <div className="course-progress mb-4">
        <hr />
        <h4 className="mb-3">My Learning Progress</h4>
        <p className="text-muted">You have completed {completed} out of {totalCourses} courses.</p>
        <div className="progress" style={{height: '25px'}}>
          <div 
            className="progress-bar" 
            role="progressbar" 
            style={{width: `${progressPercent}%`}}
            aria-valuenow={progressPercent} 
            aria-valuemin="0" 
            aria-valuemax="100"
          >
            {Math.round(progressPercent)}%
          </div>
        </div>
      </div>
      
      <div className="profile-details">
        <hr />
        <h4 className="mb-4">Personal Information</h4>
        
        <div className="row"><div className="col-md-3">Email ID</div><div className="col-md-9">{currentUser.username}</div></div><hr />
        <div className="row"><div className="col-md-3">Year</div><div className="col-md-9">{currentUser.year}</div></div><hr />
        <div className="row"><div className="col-md-3">Contact No.</div><div className="col-md-9">{currentUser.contact}</div></div><hr />
        
        <h4 className="mb-4 mt-5">Security</h4>
        
        <form>
          <div className="row">
            <div className="col-md-6 mb-3"><label htmlFor="newPass" className="form-label">New Password</label><input type="password" id="newPass" className="form-control" /></div>
            <div className="col-md-6 mb-3"><label htmlFor="confirmPass" className="form-label">Confirm Password</label><input type="password" id="confirmPass" className="form-control" /></div>
          </div>
          <button type="submit" className="btn btn-primary">Change Password</button>
        </form>
      </div>
    </div>
  );
};

export default StudentAccountProfile;