import React from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import { useQuery } from "@apollo/client";
import { GET_ME } from "../utils/queries";

// https://daisyui.com/components/navbar/

const Navbar = () => {
  const { loading, data } = useQuery(GET_ME);
  const userData = data?.me || {};
  const profilePic = userData.profileImage || "profileplaceholder.png";

  const userLogout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  // Verify whether or not user is signed in and display appropriate nav items
  function userNavigation() {
    if (Auth.loggedIn()) {
      return (
        <div className="dropdown dropdown-end dropdown-hover">
          <label tabIndex={0} className="btn  btn-circle avatar">
            <div className="w-10 rounded-full ring ring-error ">
              <img
                src={require(`../images/profile/${profilePic}`)}
                alt="profile placeholer"
              />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to="/user" className="justify-between">
                Account Settings
              </Link>
            </li>
            <li>
              <Link to="/orders">Previous Orders</Link>
            </li>
            <li>
              <Link onClick={userLogout}>Logout</Link>
            </li>
          </ul>
        </div>
      );
    } else {
      return (
        <Link to="/login" className="btn btn-sm ">
          Login/Signup
        </Link>
      );
    }
  }

  return (
    <>
      <link
        href="https://cdn.jsdelivr.net/npm/daisyui@3.0.19/dist/full.css"
        rel="stylesheet"
        type="text/css"
      />
      <script src="https://cdn.tailwindcss.com"></script>
      <div className="navbar mh-10!">
        {/* nav bar for the collapsed hamburger menu */}
        <div className="navbar-start ">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 sm:hidden"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 md:hidden"
            >
              <li>
                <Link to="/">Home</Link>
                <Link to="/services">Services</Link>
              </li>
              <li>
                {/* <summary>Services</summary>
              <ul className="p-2">
                <li>
                  <Link to="/service">Plumbing</Link>
                </li>
                <li>
                  <Link to="/service">Electrical</Link>
                </li>
                <li>
                  <Link to="/service">Landscaping</Link>
                </li>
                <li>
                  <Link to="/services">Browse All Services</Link>
                </li>
              </ul> */}
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
            </ul>
          </div>
          <div className="flex">
            <div></div>
            <Link to="/">
              <img
                className="max-h-10"
                src={require("../images/logo.png")}
                alt="toogle logo"
              ></img>
            </Link>
            <Link to="/">
              <h1 className=" ml-2 text-orange-600 text-2xl font-semibold">
                toogle
              </h1>
            </Link>
          </div>
        </div>

        {/* nave bar for full page desktop */}
        <div className="navbar-center  hidden sm:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/services">Services</Link>
            </li>
            {/* <li tabIndex={0}>
            <div className="dropdown dropdown-bottom dropdown-hover menu-dropdown-toggle">
              <label tabIndex={0}>
                <div>
                  <p>Services</p>
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link to="/service">Plumbing</Link>
                </li>
                <li>
                  <Link to="/service">Electrical</Link>
                </li>
                <li>
                  <Link to="/service">Landscaping</Link>
                </li>
                <li>
                  <Link to="/services">Browse All Services</Link>
                </li>
              </ul>
            </div>
          </li> */}
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </div>

        <div className="navbar-end pr-5">{userNavigation()}</div>
      </div>
    </>
  );
};

export default Navbar;
