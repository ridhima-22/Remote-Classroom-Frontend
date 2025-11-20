import React, { useState } from 'react';

// Mock posts
const MOCK_POSTS = [
  { 
    id: 1, 
    author: "Rohan Kumar", 
    type: "student",
    text: "Sir, algebra ke last video mein 'x' ki value samajh nahi aayi.",
    replies: [
      { author: "Priya Sharma", type: "teacher", text: "Rohan, 'x' ek variable hai. Question 5 ko dobara dekho, maine explain kiya hai." }
    ]
  },
  { 
    id: 2, 
    author: "Anjali Mehta", 
    type: "student",
    text: "Biology test ke liye kaun se diagrams important hain?",
    replies: []
  },
];

const DiscussionForum = ({ currentUser }) => {
  const [posts, setPosts] = useState(MOCK_POSTS);
  const [newPostText, setNewPostText] = useState("");

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (newPostText.trim() === "") return;

    const newPost = {
      id: Math.random(),
      author: currentUser.name,
      type: currentUser.type,
      text: newPostText,
      replies: []
    };

    setPosts([newPost, ...posts]); 
    setNewPostText(""); 
  };

  return (
    <div className="discussion-forum">
      <h2 className="mb-4">Discussion Forum</h2>
      
      
      <div className="card post-form mb-4">
        <div className="card-body">
          <form onSubmit={handlePostSubmit}>
            <div className="mb-3">
              <label htmlFor="newPost" className="form-label">
                <strong>Have a question?</strong> Ask the community.
              </label>
              <textarea 
                className="form-control" 
                id="newPost" 
                rows="3"
                value={newPostText}
                onChange={(e) => setNewPostText(e.target.value)}
                placeholder="Type your question here..."
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Post Question</button>
          </form>
        </div>
      </div>
      
      
      <div className="posts-list">
        {posts.map(post => (
          <div key={post.id} className="card post mb-3">
            <div className="card-body">
              <p>
                <strong 
                  className={post.type === 'teacher' ? 'text-success' : 'text-primary'}
                >
                  {post.author}
                </strong>
                <span className="text-muted small ms-2">({post.type})</span>
              </p>
              <p className="card-text">{post.text}</p>
              
              {post.replies.map((reply, index) => (
                <div key={index} className="post-reply">
                  <p className="mb-0">
                    <strong 
                      className={reply.type === 'teacher' ? 'text-success' : 'text-primary'}
                    >
                      {reply.author}
                    </strong>
                    <span className="text-muted small ms-2">({reply.type})</span>
                  </p>
                  <p className="mb-0">{reply.text}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiscussionForum;