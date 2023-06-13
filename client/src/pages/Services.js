import React from "react";
import { QUERY_CATEGORIES_WITH_SERVICES } from "../utils/queries";
import { useQuery } from "@apollo/client";
import ServiceCategoryPanel from "../components/service-page/ServiceCategoryPanel";
import FeatureProviders from "../components/home-page/FeatureProviders";

const Services = () => {
  const { data } = useQuery(QUERY_CATEGORIES_WITH_SERVICES);
  const categories = data?.getAllCategoriesWithServices;

  return (
    <div className="page-container">
      {/* banner */}
      <div className="hero">
        <img
          src={require("../images/categories-banner.jpeg")}
          alt="man using power drill"
          className="hero object-cover"
        ></img>
        {/* <div className="hero-overlay "></div> */}
        <div className="text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="xs:text-2xl md:text-4xl lg:text-5xl font-bold md:mb-20 xs:mb-15">
              Help us help you.
            </h1>
          </div>
        </div>
      </div>

      <div className="m-10">
        {/* <p className="text-center mb-5 text-5xl font-bold p-10">
          {" "}
          Choose Your Provider
        </p> */}
        <ul className="steps right-15 min-w-full pb-8">
          <li className="step step-accent">Choose Service</li>
          <li className="step">Pick Date & Provider</li>
          <li className="step">Confirm Order</li>
        </ul>
      </div>

      <div className="flex flex-col w-full border-opacity-50 mt-10 mb-5">
        <div className="divider text-2xl font-bold">WHAT WE OFFER</div>
      </div>

      {/* categories */}
      <div className="category-container flex flex-wrap w-full justify-center px-5">
        {categories &&
          categories.map((category) => (
            <div
              key={category._id}
              className="card w-[22rem] bg-base-100 shadow-xl m-4 border border-gray-200"
            >
              <figure>
                <img
                  src={require(`../images/category/${category.categoryImage}`)}
                  alt={category.categoryName}
                />
              </figure>
              <div className="card px-8">
                <h2 className="card-title mt-5 text-[#cc451b]">
                  {category.categoryName}
                </h2>
              </div>
              <div className="card items-center">
                <p className="card-desc mt-2 px-8">{category.categoryDesc}</p>
                <div className="divider m-8"></div>
              </div>
              <div className="flex flex-col w-full border-opacity-50"></div>
              <div>
                <ServiceCategoryPanel services={category.services} />
              </div>
            </div>
          ))}
      </div>
      {/* render FeatureProviders component */}
      <FeatureProviders />
    </div>
  );
};

export default Services;
