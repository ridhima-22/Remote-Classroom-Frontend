import React, { useState } from "react";
import LoginScreen from "./components/LoginScreen";
import Classroom from "./components/Classroom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const MOCK_USERS_DATA = [
  // Teachers data
  {
    id: "t1",
    username: "priya@sharma",
    password: "priya123",
    type: "teacher",
    name: "Priya Sharma",
    joiningDate: "01-08-2022",
    subject: "Mathematics",
    contact: "+91-9876543210",
    profilePicUrl: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: "t2",
    username: "aman@gupta",
    password: "aman123",
    type: "teacher",
    name: "Aman Gupta",
    joiningDate: "15-07-2021",
    subject: "Physics",
    contact: "+91-9876543211",
    profilePicUrl: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: "t3",
    username: "dipika@verma",
    password: "dipika123",
    type: "teacher",
    name: "Dipika Verma",
    joiningDate: "10-02-2023",
    subject: "Biology",
    contact: "+91-9876543212",
    profilePicUrl: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: "t4",
    username: "anil@agarwal",
    password: "anil123",
    type: "teacher",
    name: "Anil Agarwal",
    joiningDate: "20-05-2020",
    subject: "Chemistry",
    contact: "+91-9876543213",
    profilePicUrl: "https://i.pravatar.cc/150?img=7",
  },
  {
    id: "t5",
    username: "sonam@sahu",
    password: "sonam123",
    type: "teacher",
    name: "Sonam Sahu",
    joiningDate: "30-11-2022",
    subject: "English",
    contact: "+91-9876543214",
    profilePicUrl: "https://i.pravatar.cc/150?img=9",
  },
  {
    id: "t6",
    username: "raj@singh",
    password: "raj123",
    type: "teacher",
    name: "Raj Singh",
    joiningDate: "12-01-2022",
    subject: "History",
    contact: "+91-9876543215",
    profilePicUrl: "https://i.pravatar.cc/150?img=11",
  },
  {
    id: "t7",
    username: "neha@jain",
    password: "neha123",
    type: "teacher",
    name: "Neha Jain",
    joiningDate: "05-03-2023",
    subject: "Computer Science",
    contact: "+91-9876543216",
    profilePicUrl: "https://i.pravatar.cc/150?img=13",
  },
  {
    id: "t8",
    username: "vikas@yadav",
    password: "vikas123",
    type: "teacher",
    name: "Vikas Yadav",
    joiningDate: "22-09-2021",
    subject: "Geography",
    contact: "+91-9876543217",
    profilePicUrl: "https://i.pravatar.cc/150?img=15",
  },
  {
    id: "t9",
    username: "pooja@mehra",
    password: "pooja123",
    type: "teacher",
    name: "Pooja Mehra",
    joiningDate: "19-11-2022",
    subject: "Economics",
    contact: "+91-9876543218",
    profilePicUrl: "https://i.pravatar.cc/150?img=17",
  },
  {
    id: "t10",
    username: "karan@sharma",
    password: "karan123",
    type: "teacher",
    name: "Karan Sharma",
    joiningDate: "02-06-2020",
    subject: "Political Science",
    contact: "+91-9876543219",
    profilePicUrl: "https://i.pravatar.cc/150?img=19",
  },

  // 10 student
  {
    id: "s1",
    username: "Rohan@Kumar",
    password: "Rohan123",
    type: "student",
    name: "Rohan Kumar",
    year: "1st Year",
    contact: "+91-8888888801",
    profilePicUrl: "https://i.pravatar.cc/150?img=12",
    completedCourses: ["1", "3", "4"],
  },
  {
    id: "s2",
    username: "Sneha@Jain",
    password: "Sneha123",
    type: "student",
    name: "Sneha Jain",
    year: "2nd Year",
    contact: "+91-8888888802",
    profilePicUrl: "https://i.pravatar.cc/150?img=14",
    completedCourses: ["1", "2", "3"],
  },
  {
    id: "s3",
    username: "Vikram@Rathore",
    password: "Vikram123",
    type: "student",
    name: "Vikram Rathore",
    year: "1st Year",
    contact: "+91-8888888803",
    profilePicUrl: "https://i.pravatar.cc/150?img=16",
    completedCourses: ["1"],
  },
  {
    id: "s4",
    username: "Anjali@Mehta",
    password: "Anjali123",
    type: "student",
    name: "Anjali Mehta",
    year: "3rd Year",
    contact: "+91-8888888804",
    profilePicUrl: "https://i.pravatar.cc/150?img=18",
    completedCourses: ["2", "4"],
  },
  {
    id: "s5",
    username: "Mohit@Dev",
    password: "Mohit123",
    type: "student",
    name: "Mohit Dev",
    year: "2nd Year",
    contact: "+91-8888888805",
    profilePicUrl: "https://i.pravatar.cc/150?img=20",
    completedCourses: ["3"],
  },
  {
    id: "s6",
    username: "Aditi@Singh",
    password: "Aditi123",
    type: "student",
    name: "Aditi Singh",
    year: "3rd Year",
    contact: "+91-8888888806",
    profilePicUrl: "https://i.pravatar.cc/150?img=22",
    completedCourses: ["1"],
  },
  {
    id: "s7",
    username: "Yash@Gupta",
    password: "Yash123",
    type: "student",
    name: "Yash Gupta",
    year: "1st Year",
    contact: "+91-8888888807",
    profilePicUrl: "https://i.pravatar.cc/150?img=24",
    completedCourses: ["2"],
  },
  {
    id: "s8",
    username: "Muskan@Verma",
    password: "Muskan123",
    type: "student",
    name: "Muskan Verma",
    year: "2nd Year",
    contact: "+91-8888888808",
    profilePicUrl: "https://i.pravatar.cc/150?img=26",
    completedCourses: ["4"],
  },
  {
    id: "s9",
    username: "Arjun@Reddy",
    password: "Arjun123",
    type: "student",
    name: "Arjun Reddy",
    year: "3rd Year",
    contact: "+91-8888888809",
    profilePicUrl: "https://i.pravatar.cc/150?img=28",
    completedCourses: ["1", "2", "3", "4"],
  },
  {
    id: "s10",
    username: "Diya@Mathur",
    password: "Diya123",
    type: "student",
    name: "Diya Mathur",
    year: "1st Year",
    contact: "+91-8888888810",
    profilePicUrl: "https://i.pravatar.cc/150?img=30",
    completedCourses: [],
  },
];

const INITIAL_MATERIALS = [
  {
    _id: "1",
    title: "Introduction to Algebra",
    subject: "Mathematics",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    notesUrl: "https://example.com/notes.pdf",
    date: new Date("2025-11-10T09:00:00Z"),
    teacherId: "t1",
    quiz: { 
      title: "Introduction to Algebra Quiz",
      passScore: 2,
      questions: [
        { q: "What is 2 + 2?", options: ["3", "4", "5", "6"], correct: 1 },
        { q: "What is 5 x 5?", options: ["20", "25", "30", "15"], correct: 1 },
        { q: "What is 10 - 7?", options: ["3", "4", "2", "1"], correct: 0 },
      ]
    }
  },
  {
    _id: "2",
    title: "Basics of Photosynthesis",
    subject: "Biology",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    notesUrl: "",
    date: new Date("2025-11-12T11:00:00Z"),
    teacherId: "t3", 
    quiz: {
      title: "Photosynthesis Quiz",
      passScore: 1,
      questions: [
        { q: "What do plants absorb from the air?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide"], correct: 2 },
        { q: "What is the green pigment in plants?", options: ["Chlorophyll", "Melanin", "Stomata"], correct: 0 },
      ]
    }
  },
  {
    _id: "3",
    title: "Advanced Algebra",
    subject: "Mathematics",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    notesUrl: "",
    date: new Date("2025-11-13T11:00:00Z"),
    teacherId: "t1",
    quiz: null,
  },
  {
    _id: "4", 
    title: "Intro to Physics",
    subject: "Physics",
    teacherId: "t2", 
    date: new Date("2025-11-14T11:00:00Z"),
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    notesUrl: "",
    quiz: { 
      title: "Physics Quiz", passScore: 1,
      questions: [{ q: "What is F=?", options: ["ma", "mc^2"], correct: 0 }]
    }
  }
];


function App() {
  const [allUsers, setAllUsers] = useState(MOCK_USERS_DATA);
  const [currentUser, setCurrentUser] = useState(null);
  const [materials, setMaterials] = useState(INITIAL_MATERIALS);

  const handleLogin = (user) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const handleAddMaterial = (newMaterialData) => {
    const newMaterial = {
      ...newMaterialData,
      _id: Math.random().toString(),
      date: new Date(),
      teacherId: currentUser.id,
    };
    setMaterials((prevMaterials) => [newMaterial, ...prevMaterials]);
  };

  const handleMarkAsComplete = (courseId) => {
    if (currentUser.completedCourses.includes(courseId)) {
      return; 
    }
    const updatedUser = {
      ...currentUser,
      completedCourses: [...currentUser.completedCourses, courseId],
    };
    setCurrentUser(updatedUser);
    setAllUsers(prevAllUsers => {
      return prevAllUsers.map(user => 
        user.id === currentUser.id ? updatedUser : user
      );
    });
  };

  const handleDeleteMaterial = (courseId) => {
    if (window.confirm("Are you sure you want to delete this course permanently?")) {
      setMaterials(prevMaterials => 
        prevMaterials.filter(material => material._id !== courseId)
      );
    }
  };

  return (
    <div className="App">
      {!currentUser ? (
        <LoginScreen onLogin={handleLogin} allUsers={allUsers} />
      ) : (
        <Classroom
          currentUser={currentUser}
          onLogout={handleLogout}
          materials={materials}
          onAddMaterial={handleAddMaterial}
          allUsers={allUsers}
          onMarkComplete={handleMarkAsComplete}
          onDeleteMaterial={handleDeleteMaterial} 
        />
      )}
    </div>
  );
}

export default App;