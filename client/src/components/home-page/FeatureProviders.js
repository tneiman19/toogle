import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_PROVIDERS } from "../../utils/queries";
import { Link } from "react-router-dom";

function FeatureProviders() {
  const { loading, data } = useQuery(QUERY_PROVIDERS, {
    variables: { limit: 4 },
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {/* category grid */}
      <div className="justify-center my-10 mt-20">
        <div className=" w-full border-opacity-50">
          <div className="divider text-2xl font-bold">FEATURED PROVIDERS</div>
        </div>
        <div className="flex flex-wrap justify-center mt-10 ">
          {/* Map through providers and create cards */}
          {data?.providers.map((provider) => (
            <div
              key={provider._id}
              className="card w-full sm:w-80 md:w-80 m-2 p-6 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-orange-100 via-stone-100 to-orange-100"
            >
              <figure className="p-5">
                <img
                  className="w-60 rounded-full ring ring-error ring-offset-base-50 ring-offset-8"
                  src={require(`../../images/profile/${provider?.profileImage}`)}
                  alt={`${provider?.firstName}`}
                />
              </figure>

              <div className="card-body">
                <h2 className="card-title">
                  {provider?.firstName} {provider?.lastName}{" "}
                </h2>
                <p>
                  {`Provider Email: `}
                  <span className="font-bold">{provider?.email}</span>
                </p>
                {/* <div className="text-end mt-5">
                  <Link to={"/services"}>
                    <button className="btn btn-outline btn-accent">
                      More Info
                    </button>
                  </Link>
                </div> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
export default FeatureProviders;
