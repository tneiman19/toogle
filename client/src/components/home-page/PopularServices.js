import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_SERVICES } from "../../utils/queries";
import { Link } from "react-router-dom";

function PopularServices() {
  const { loading, data } = useQuery(QUERY_SERVICES, {
    variables: { limit: 4 },
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <span>
      {/* category grid */}
      <div className="justify-center">
        <div className=" w-full border-opacity-50 mt-20">
          <div className=" divider text-2xl font-bold">POPULAR SERVICES</div>
        </div>
        <div className="flex flex-wrap justify-center">
          {/* Map through services and create cards */}
          {data?.services.map((service) => (
            <div
              key={service._id}
              className="card shadow-xl m-2 m:w-xs md:max-w-xs border border-gray-200"
            >
              <figure>
                <img
                  src={require(`../../images/category/${service?.serviceCategory.categoryImage}`)}
                  alt={`${service?.serviceName}`}
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-[#cc451b]">
                  {service?.serviceName}
                </h2>
                <h2 className="max-h-36 text-clip overflow-hidden">
                  {service?.serviceDesc}
                </h2>
                <div className="badge badge-ghost badge-sm p-4 font-bold">
                  {service?.serviceCategory.categoryName}
                </div>
                <div className="divider "></div>

                <p>
                  {`Service Price: `}
                  <span className="p-4 ml-4 badge badge-accent">
                    ${service?.servicePrice}
                  </span>
                </p>

                <div className="text-end mt-5">
                  <Link to={`/service/${service?._id}`}>
                    <button className="btn btn-outline btn-accent">
                      Order Service
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </span>
  );
}

export default PopularServices;
