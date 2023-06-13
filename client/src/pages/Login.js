import { useState } from "react";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { LOGIN } from "../utils/mutations";
import validateEmail from "../utils/helpers";
import Auth from "../utils/auth";

export default function Login() {
  // setting variables for form fields and errors, setting initial values to an empty string
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  // setting queries
  const [login, { error, data }] = useMutation(LOGIN);
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

  // On blur fields validation
  const handleBlur = (e) => {
    const { target } = e;
    const inputType = target.name;
    const inputValue = target.value;

    if (inputType === "email") {
      if (!inputValue) {
        setEmailError("* Required field");
      } else if (!validateEmail(formState.email)) {
        setEmailError("* Invalid e-mail address");
      } else {
        setEmailError("");
      }
    }

    if (inputType === "password") {
      if (!inputValue) {
        setPasswordError("* Required field");
      } else {
        setPasswordError("");
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

    // Check to see if user entered valid e-mail address
    if (!validateEmail(formState.email)) {
      setErrorMessage("Please enter valid e-mail address");
      document.getElementById("email").focus();
      return;
    }

    // Check to see if user entered password
    if (!formState.password) {
      setErrorMessage("Password field cannot be empty");
      document.getElementById("password").focus();
      return;
    }

    // try to log the user in
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (error) {
      console.error(error);
      setShowAlert(true);
    }

    // Reset input fields
    setFormState({ email: "", password: "" });
  };

  return (
    <>
      {/* Alert */}
      <Alert message="Invalid username or password" />

      {/* Section */}
      <section
        style={{ "--loginImage-url": `url(${require("../images/login.jpg")})` }}
        className="py-16 bg-[image:var(--loginImage-url)] bg-cover bg-center"
      >
        <form className="max-w-xl mx-auto py-8 px-8 bg-white rounded-lg">
          <h3 className="text-5xl font-bold text-center mb-5">Log in</h3>
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
              <p className="text-red-600 text-sm">{emailError}</p>
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
              <p className="text-red-600 text-sm">{passwordError}</p>
            </div>
          </div>
          {/* form submit */}
          <button
            // className="shadow btn hover:opacity-90 transition-all duration-300 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            className="btn btn-accent w-full my-4"
            type="submit"
            onClick={handleFormSubmit}
          >
            Log in
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
            Not a member yet?
          </p>
          <Link to="/signup" className="btn btn-outline btn-accent w-full my-4">
            Create Account
          </Link>
        </form>        
      </section>
    </>
  );
}
