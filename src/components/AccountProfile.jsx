import React from "react";

const AccountProfile = ({ currentUser }) => {
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
          <p>{currentUser.subject} Teacher</p>
        </div>
      </div>

      <div className="profile-details">
        <hr />
        <h4 className="mb-4">Personal Information</h4>

        <div className="row">
          <div className="col-md-3">Email ID</div>
          <div className="col-md-9">{currentUser.username}</div>
        </div>
        <hr />

        <div className="row">
          <div className="col-md-3">Subject</div>
          <div className="col-md-9">{currentUser.subject}</div>
        </div>
        <hr />

        <div className="row">
          <div className="col-md-3">Contact No.</div>
          <div className="col-md-9">{currentUser.contact}</div>
        </div>
        <hr />

        <div className="row">
          <div className="col-md-3">Date of Joining</div>
          <div className="col-md-9">{currentUser.joiningDate}</div>
        </div>

        <hr />
        <h4 className="mb-4 mt-5">Security</h4>

        <form>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="newPass" className="form-label">
                New Password
              </label>
              <input type="password" id="newPass" className="form-control" />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="confirmPass" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPass"
                className="form-control"
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default AccountProfile;
