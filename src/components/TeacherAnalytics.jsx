import React from 'react';

const TeacherAnalytics = ({ myUploads, allStudents }) => {

  
  const totalUploads = myUploads.length;
  const totalStudents = allStudents.length;

  
  const myCourseIds = myUploads.map(course => course._id);
  
  
  const completionCounts = myUploads.reduce((acc, course) => {
    acc[course._id] = { name: course.title, count: 0 };
    return acc;
  }, {});

 
  allStudents.forEach(student => {
    student.completedCourses.forEach(completedCourseId => {
      
      if (completionCounts[completedCourseId]) {
        completionCounts[completedCourseId].count++;
      }
    });
  });

  
  const popularCourses = Object.values(completionCounts).sort((a, b) => b.count - a.count);

  return (
    <div>
      <h2 className="mb-4">My Analytics</h2>
      
      
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="analytics-widget card">
            <div className="card-body">
              <h5 className="widget-title">Total Uploads</h5>
              <p className="widget-value">{totalUploads}</p>
              <i className="widget-icon bi bi-file-earmark-arrow-up"></i>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="analytics-widget card">
            <div className="card-body">
              <h5 className="widget-title">Total Students</h5>
              <p className="widget-value">{totalStudents}</p>
              <i className="widget-icon bi bi-people-fill"></i>
            </div>
          </div>
        </div>
      </div>
      
      
      <div className="card p-4">
        <h4 className="mb-3">Course Completions</h4>
        <p className="text-muted">Completions by students for your uploaded courses.</p>
        <ul className="list-group list-group-flush">
          {popularCourses.map(course => (
            <li key={course.name} className="list-group-item d-flex justify-content-between align-items-center">
              {course.name}
              <span className="badge bg-primary rounded-pill">{course.count} Completions</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TeacherAnalytics;