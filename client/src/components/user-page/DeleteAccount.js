import React from "react";
import { Navigate } from "react-router-dom";
import Auth from "../../utils/auth";

import { useMutation } from "@apollo/client";
import { DELETE_USER } from "../../utils/mutations";


const DeleteAccount = (props) => {
    // console.log(props.userId);
    const [deleteUser, { data, loading, error }] = useMutation(DELETE_USER);
    
    const handleDeleteUser = async (event) => {
        event.preventDefault();
        try {
        const userId = props.userId;
        // console.log("userId", userId);
        await deleteUser({ variables: { id: userId} });
      } catch (error) {
        console.error(error);
      }
      Auth.logout();
      return <Navigate replace to="/" />
    };

    return (
        <div>
            <h1 className="card-title flex-grow justify-center">Delete Account</h1>
            <div className="card-body items-center">
                <p>Are you sure you want to delete your account?</p>
                <div className="card-actions justify-center pt-4">
                    {/* Open the modal using ID.showModal() method */}
                    <button className="btn btn-accent" onClick={()=>window.my_modal_1.showModal()}>Delete Account</button>
                </div>
            </div>
            <dialog id="my_modal_1" className="modal">
            <form method="dialog" className="modal-box">
                <h3 className="font-bold text-lg text-error">Please confirm</h3>
                <p className="py-4">All your information, including previous orders, will be permanently deleted.</p>
                <div className="modal-action">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn hover:btn-error" onClick={handleDeleteUser}>Confirm</button>
                <button className="btn">Cancel</button>
                </div>
            </form>
            </dialog>
        </div>
    );
};

export default DeleteAccount;