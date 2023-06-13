import React from "react";
import PopularServices from "../components/home-page/PopularServices";
import FeatureProviders from "../components/home-page/FeatureProviders";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      {/* banner */}
      <div className="hero min-h-screen">
        <img
          src={require("../images/mainbanner.jpeg")}
          alt="man installing lightbulb"
          className="hero min-h-screen object-cover"
        ></img>
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content pr-[45vw]">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Welcome to toogle.</h1>
            <p>We help you get things done.</p>
            <p className="mb-5">By letting you let someone else do it.</p>
            <Link to="/signup">
              <button className="btn btn-accent">Get Started</button>
            </Link>
          </div>
        </div>
      </div>

      {/* stats section */}
      <div className="sm:flex shadow w-full rounded-none hidden">
        <div className="stat">
          <div className="stat-figure text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-8 h-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
          <div className="stat-title">Services</div>
          <div className="stat-value">45</div>
          <div className="stat-desc">Jan 1 - June 12</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-8 h-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
              ></path>
            </svg>
          </div>
          <div className="stat-title">New Users</div>
          <div className="stat-value">24</div>
          <div className="stat-desc">↗ 24 (100%)</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-8 h-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
              ></path>
            </svg>
          </div>
          <div className="stat-title">Providers</div>
          <div className="stat-value">2</div>
          <div className="stat-desc">↗ 2 (100%)</div>
        </div>
      </div>
      {/* Popular Services */}
      <PopularServices />
      {/* second banner/hero */}
      <div className="card lg:card-side bg-base-100 shadow mt-20 rounded-none">
        <figure className=" object-cover lg:w-1/2">
          <img src={require("../images/painting.jpg")} alt="painting" />
        </figure>
        <div className="card-body my-auto">
          <h2 className="card-title justify-center lg:justify-normal lg:pl-8">
            Turn your to-do list into a to-done list.
          </h2>
          <div className="card-body items-center lg:items-start">
            <p>
              Find service providers for every inch of your house, all in one
              place.
            </p>
            <li>Search by what's important to you.</li>
            <li>View availability and schedule an appointment.</li>
            <li>Leave reviews and view your previous orders.</li>

          </div>
        </div>
      </div>

      {/* reviews section */}
      <div className="flex flex-col w-full border-opacity-50 mt-20">
        <div className="divider text-2xl font-bold">WHAT OTHERS ARE SAYING</div>
      </div>

      <div name="reviews-container" className="flex m-8">
      <div className=" flex flex-col md:flex-row bg-base-100 shadow-xl">
        <div className="flex flex-col px-8 py-2 md:py-8 gap-2">
          <h2 className="card-title justify-center">Maria Feldman</h2>
          <p className="justify-center text-sm opacity-50 flex">05/23/2023</p>
          <p className="card-title justify-center">&#9733;&#9733;&#9733;&#9733;&#9733;</p>
          <p>This is the best service ever!  Finally found someone who was able to fix my leaky faucet.</p>
          <div className="badge badge-accent badge-outline">Plumbing Services</div>
        </div>
        <div className="flex flex-col px-8 py-2 md:py-8 gap-2 min-w-[265px]">
          <h2 className="card-title justify-center">Sammy Krem</h2>
          <p className="justify-center text-sm opacity-50 flex">05/23/2023</p>
          <p className="card-title justify-center">&#9733;&#9733;&#9733;&#9733;&#9733;</p>
          <p>Got my new deck built in plenty of time for summer - and for a great price!</p>
          <div className="badge badge-accent badge-outline">Carpentry and Woodworking</div>
        </div>
        <div className="flex flex-col px-8 py-4 md:py-8 gap-2 min-w-[210px]">
          <h2 className="card-title justify-center">Lena Ramirez</h2>
          <p className="justify-center text-sm opacity-50 flex">05/23/2023</p>
          <p className="card-title justify-center">&#9733;&#9733;&#9733;&#9733;&#9733;</p>
          <p>Tile work was top notch; will definitely book services from here again.</p>
          <div className="badge badge-accent badge-outline">Flooring Installation</div>
        </div>
        </div>


      </div>

      {/* featured providers cards */}
      <FeatureProviders />

      {/* get started section */}
      <div className="flex flex-col w-full border-opacity-50 mt-20">
        <div className="divider text-2xl font-bold">GET STARTED</div>
      </div>
      <div className="card mt-5 mx-20 mb-20">
        <div className="flex flex-col lg:flex-row">
          <div className="flex flex-col card-body items-center">
            <img
              className="mask mask-hexagon mb-5"
              src={require("../images/signup.jpeg")}
              alt="moving"
            />
            <Link to="/signup">
              <button className="btn btn-outline btn-accent">Sign Up</button>
            </Link>
          </div>
          {/* <div className="divider divider-vertical"></div>
          <div className="divider divider-horizontal"></div> */}
          <div className="flex flex-col card-body items-center">
            <img
              className="mask mask-hexagon mb-5"
              src={require("../images/tools.jpeg")}
              alt="painting"
            />
            <Link to="/signup">
              <button className="btn btn-outline btn-accent">
                Become a Provider
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
