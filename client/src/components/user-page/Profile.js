import React from "react";

const Profile = (props) => {
    return (
        <div>
            <h1 className="card-title flex-grow justify-center">My Profile</h1>
            <div className="card-body items-center">
                <p><span className="font-bold">First Name:</span>  {props.firstName}</p>
                <p><span className="font-bold">Last Name:</span>  {props.lastName}</p>
                <p><span className="font-bold">Email:</span>  {props.email}</p>
            </div>
            {/* <div className="card-actions justify-center">
                <button className="btn btn-accent">Update Info</button>
            </div> */}
        </div>
    );
};

export default Profile;