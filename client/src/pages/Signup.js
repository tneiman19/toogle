import { useState } from "react";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { ADD_USER } from "../utils/mutations";
import validateEmail from "../utils/helpers";
import Auth from "../utils/auth";

export default function Signup() {
  // setting queries
  const [addUser, { error, data }] = useMutation(ADD_USER);

  // toggle button
  const [providerToggle, setProviderToggle] = useState(false);

  // setting variables for form fields and errors, setting initial values to an empty string
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    isProvider: providerToggle,
  });

  // Set error messages
  const [errorState, setErrorState] = useState({
    errFirstName: "",
    errLastName: "",
    errEmail: "",
    errPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  // Alert state
  const [showAlert, setShowAlert] = useState(false);
  // Alert component
  const Alert = ({ message }) => {
    const handleDismiss = () => {
      setShowAlert(false);
    };

    return (
      showAlert && (
        <div className="bg-error flex justify-center p-4">
          <div className="max-w-xl flex flex-wrap gap-6 w-full justify-between">
            <span>{message}</span>
            <button onClick={handleDismiss}>Dismiss</button>
          </div>
        </div>
      )
    );
  };

  // Function that manages toggle button position
  const updateProviderToggle = (e) => {
    console.log(e.target.checked);
    setProviderToggle(!providerToggle);
    return providerToggle ? setProviderToggle(false) : setProviderToggle(true);
  };

  // On blur fields validation
  const handleBlur = (e) => {
    const { name, value } = e.target;

    // check to see if user provided required information
    // First name validation
    if (name === "firstName") {
      if (!value) {
        setErrorState({ ...errorState, errFirstName: "* Required field" });
      } else {
        setErrorState({ ...errorState, errFirstName: "" });
      }
    }

    // Last name validation
    if (name === "lastName") {
      if (!value) {
        setErrorState({ ...errorState, errLastName: "* Required field" });
      } else {
        setErrorState({ ...errorState, errLastName: "" });
      }
    }

    // Email validation
    if (name === "email") {
      if (!value) {
        setErrorState({ ...errorState, errEmail: "* Required field" });
      } else {
        setErrorState({ ...errorState, errEmail: "" });
      }
    }

    // check to see if user entered valid e-mail
    if (name === "email") {
      if (value) {
        if (!validateEmail(formState.email)) {
          setErrorState({
            ...errorState,
            errEmail: "* Invalid e-mail address",
          });
        }
      }
    }

    // Password validation
    if (name === "password") {
      if (!value) {
        setErrorState({ ...errorState, errPassword: "* Required field" });
      } else {
        setErrorState({ ...errorState, errPassword: "" });
      }
    }
  };

  // On change form handling
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  // Form submit
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Check to see if user entered First Name
    if (!formState.firstName) {
      setErrorMessage("First Name field cannot be empty");
      document.getElementById("firstName").focus();
      return;
    }

    // Check to see if user entered Last Name
    if (!formState.lastName) {
      setErrorMessage("Last Name field cannot be empty");
      document.getElementById("lastName").focus();
      return;
    }

    // Check to see if user entered password
    if (!formState.password) {
      setErrorMessage("Password field cannot be empty");
      document.getElementById("password").focus();
      return;
    }

    // Check to see if user entered valid e-mail address
    if (!validateEmail(formState.email)) {
      setErrorMessage("Please enter valid e-mail address");
      document.getElementById("email").focus();
      return;
    }

    // Check to see if user entered Password
    if (!formState.password) {
      setErrorMessage("Password field cannot be empty");
      document.getElementById("password").focus();
      return;
    }

    // try to log the user in
    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (error) {
      console.error(error);
      setShowAlert(true);
    }

    // Reset input fields
    setFormState({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });
  };

  return (
    <>
      {/* Alert */}
      <Alert message="An account with this email already exists" />

      <section
        style={{ "--signupImage-url": `url(${require("../images/signup.jpg")})` }}
        className="py-16 bg-[image:var(--signupImage-url)] bg-cover bg-center"
      >
        <form className="max-w-xl mx-auto py-8 px-8 bg-white rounded-lg">
        <h3 className="text-5xl font-bold text-center mb-5">Sign Up</h3>
          {/* First Name */}
          <div className="flex flex-col">
            <label className="block font-bold mb-1 pr-4" htmlFor="firstName">
              First Name
            </label>
            <input
              className="input input-bordered w-full max-w-lg"
              name="firstName"
              id="firstName"
              onChange={handleInputChange}
              onBlur={handleBlur}
              value={formState.firstName}
              type="text"
              placeholder="First Name"
            />
          </div>
          {/* check for missing firstName */}
          <div className="md:flex md:items-center py-1">
            <div>
              <p className="text-red-600 text-sm">{errorState.errFirstName}</p>
            </div>
          </div>
          {/* Last Name */}
          <div className="flex flex-col">
            <label className="block font-bold mb-1 pr-4" htmlFor="lastName">
              Last Name
            </label>
            <input
              className="input input-bordered w-full max-w-lg"
              name="lastName"
              id="lastName"
              onChange={handleInputChange}
              onBlur={handleBlur}
              value={formState.lastName}
              type="text"
              placeholder="Last Name"
            />
          </div>
          {/* check for missing lastName */}
          <div className="md:flex md:items-center py-1">
            <div>
              <p className="text-red-600 text-sm">{errorState.errLastName}</p>
            </div>
          </div>
          {/* e-mail input and validation */}
          <div className="flex flex-col">
            <label className="block font-bold mb-1 pr-4" htmlFor="email">
              Email Address
            </label>
            <input
              className="input input-bordered w-full max-w-lg"
              name="email"
              id="email"
              onChange={handleInputChange}
              onBlur={handleBlur}
              value={formState.email}
              type="text"
              placeholder="Email Address"
            />
          </div>
          {/* check for missing email */}
          <div className="md:flex md:items-center py-1">
            <div>
              <p className="text-red-600 text-sm">{errorState.errEmail}</p>
            </div>
          </div>
          {/* password input */}
          <div className="flex flex-col">
            <label className="block font-bold mb-1 pr-4" htmlFor="password">
              Password
            </label>
            <input
              className="input input-bordered  w-full max-w-lg"
              name="password"
              id="password"
              onChange={handleInputChange}
              onBlur={handleBlur}
              value={formState.password}
              type="password"
              placeholder="Password"
            />
          </div>
          {/* check for missing password */}
          <div className="md:flex md:items-center py-1">
            <div>
              <p className="text-red-600 text-sm">{errorState.errPassword}</p>
            </div>
          </div>
          {/* form submit */}
          <button
            // className="shadow btn hover:opacity-90 transition-all duration-300 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            className="btn btn-accent w-full my-4"
            type="submit"
            onClick={handleFormSubmit}
          >
            Create Account
          </button>
          {errorMessage && (
            <div className="md:flex md:items-center">
              <div>
                <p className="text-red-600 mt-3">{errorMessage}</p>
              </div>
            </div>
          )}
          <hr className="my-4"></hr>
          <p className="text-center block font-bold mb-1 pr-4">
            Already a member?
          </p>
          <Link to="/login" className="btn btn-outline btn-accent w-full my-4">
            Log in
          </Link>
        </form>
      </section>
    </>
  );
}
