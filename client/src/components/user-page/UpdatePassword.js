import React from "react";
import { useState } from "react";

import { useMutation } from "@apollo/client";
import { UPDATE_PW } from "../../utils/mutations";

const UpdatePassword = (props) => {
    // console.log(props.userId);
    const [updatePassword, { data, loading, error }] = useMutation(UPDATE_PW);

    const [formState, setFormState] = useState({
        password: "",
        newPassword: "",
        newPasswordConfirm: "",
    });

    // Set error messages
    const [errorState, setErrorState] = useState({
        errPassword: "",
        errNewPassword: "",
        errNewPasswordConfirm: "",
    });
    const [errorMessage, setErrorMessage] = useState("");

    const [successState, setSuccessState] = useState({
        success: false,
        error: false,
    })

    // On blur fields validation
    const handleBlur = (e) => {

        // Check to see if the two newly entered passwords match
        if (formState.newPassword !== formState.newPasswordConfirm) {
            setErrorState({ ...errorState, errNewPasswordConfirm: "* Passwords must match" });
        } else {
            setErrorState({ ...errorState, errNewPasswordConfirm: "" });
        }

    };

    // On change form handling
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormState({ ...formState, [name]: value });
    };
    
    const handleUpdatePassword = async (event) => {
        event.preventDefault();
    
        // Check to see if two new passwords are the same
        if (formState.newPassword !== formState.newPasswordConfirm) {
            setErrorMessage("Passwords must match");
            document.getElementById("newPasswordConfirm").focus();
            return;
        }

        try {
            const userId = props.userId;
            await updatePassword({ 
                variables: { 
                    id: userId,
                    password: formState.password,
                    newPassword: formState.newPassword
                } 
            });
            setSuccessState({
                success: true,
                error: false,
            });
        } catch (error) {
            console.error(error);
            setSuccessState({
                success: false,
                error: true,
            })
        }

      // Reset input fields
        setFormState({
            password: "",
            newPassword: "",
            newPasswordConfirm: "",
        });
    };

    return (
        <div>
            <h1 className="card-title flex-grow justify-center">Change Password</h1>
            <div className="flex flex-col p-2 md:p-8 gap-2 items-center">
                <input 
                    className="input input-bordered input-accent w-full max-w-xs" 
                    type="password" 
                    placeholder="Previous Password" 
                    name="password"
                    id="password"
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    value={formState.password}
                />
                <input 
                    className="input input-bordered input-accent w-full max-w-xs" 
                    type="password" 
                    placeholder="New Password" 
                    name="newPassword"
                    id="newPassword"
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    value={formState.newPassword}
                />
                <input 
                    className="input input-bordered input-accent w-full max-w-xs" 
                    type="password" 
                    placeholder="Confirm Password" 
                    name="newPasswordConfirm"
                    id="newPasswordConfirm"
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    value={formState.newPasswordConfirm}
                />
                {/* check for non-matching password */}
                <div className="md:flex md:items-center py-1">
                    <div>
                    <p className="text-red-600 text-sm">{errorState.errNewPasswordConfirm}</p>
                    </div>
                </div>
            </div>
            <div className="card-actions justify-center">
                <button className="btn btn-accent" onClick={handleUpdatePassword}>Update Password</button>
                {/* success/failure alerts */}
                <div className={`${successState.success ? "flex" : "hidden"} flex flex-row alert-success mt-2 w-full content-start align-middle gap-4 p-4 bg-emerald-400`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>Your password has been successfully updated!</span>
                </div>
                <div className={`${!successState.success && successState.error ? "flex" : "hidden"} flex flex-row alert-error mt-2 w-full content-start align-middle gap-4 p-4 bg-rose-400 `}>
                    <span>Something went wrong!</span>
                </div>
            </div>
        </div>
    );
};

export default UpdatePassword;