import React from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_SINGLE_SERVICE } from "../utils/queries";
import ServiceProvidersTable from "../components/service-page/ServiceProvidersTable";

const Service = () => {
  const { serviceId } = useParams();

  const { loading, error, data } = useQuery(QUERY_SINGLE_SERVICE, {
    variables: { serviceId },
  });

  if (loading) {
    return <span className="loading loading-ring loading-lg"></span>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const service = data?.service;
  //console.log(data);
  return (
    <div className="page-container">

      <div className="hero">
        <img
          src={require("../images/service-banner.jpg")}
          alt="man using power drill"
          className="object-cover"
        ></img>
      </div>
      <div className="text-sm breadcrumbs pl-10">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/services">All Services</Link>
          </li>
          <li>
            <Link to="#">{service.serviceName}</Link>
          </li>
        </ul>
      </div>

      <div className="m-10">
        {/* <p className="text-center mb-5 text-5xl font-bold p-10">
          {" "}
          Choose Your Provider
        </p> */}

        <ul className="steps right-15 min-w-full pb-8">
          <li className="step step-accent">Choose Service</li>
          <li className="step step-accent">Pick Date & Provider</li>
          <li className="step">Confirm Order</li>
        </ul>
      </div>
      <div className="m-10">
        <div className="border border-gray-200 w-full flex flex-col rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]  md:flex-row">
          <img
            className="h-96 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
            src={require(`../images/category/${service.serviceCategory.categoryImage}`)}
            alt=""
          />
          <div className="flex flex-col justify-start p-6">
            <h5 className="mb-2 text-xl font-medium  text-[#cc451b] ">
              {service.serviceName}
            </h5>
            <p className="mb-4 text-base text-neutral-600 ">
              {service.serviceDesc}
            </p>
            <div>
              <span className="badge badge-ghost badge-sm p-4 px-8 ">
                {service.serviceCategory.categoryName}
              </span>
              <span className="p-4 ml-4 badge badge-accent">
                ${service.servicePrice}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="card lg:card-side bg-base-100 -z-50 m-20 shadow-xl dark:bg-gray-800 dark:border-gray-700  ">
        <figure>
          <img
            className="max-w-md max-h-80 "
            src={require(`../images/category/${service.serviceCategory.categoryImage}`)}
            alt="Album"
          />
        </figure>

        <div className="card-header">
          <p className="mb-5 text-5xl font-bold ">
            {service.serviceName} <br />
          </p>
        </div>
        <div>
          <span className="badge badge-ghost badge-sm p-4 px-8">
            {service.serviceCategory.categoryName}
          </span>
          <span className="p-4 ml-4 badge badge-accent">
            ${service.servicePrice}
          </span>
        </div>
        <div className="card-body">
          <p className="">
            <span className="text-sm">
              {"  "}
              {service.serviceDesc}
            </span>
          </p>
        </div>
      </div> */}

      <ServiceProvidersTable data={data} />
    </div>
  );
};

export default Service;
