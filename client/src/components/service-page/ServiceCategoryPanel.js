import React from "react";
import { Link } from "react-router-dom";

const ServiceCategoryPanel = ({ services }) => {
  const catServices = services.map((service) => ({
    serviceName: service.serviceName,
    _id: service._id,
    servicePrice: service.servicePrice,
  }));

  return (
    <div className="flex flex-col px-8 pb-8 gap-2">
      {catServices.map((service) => (
        <div className="flex justify-between">
          <ul key={service._id} className="flex-nowrap">
            <Link to={`/service/${service._id}`}>
              <li className="hover:text-[#cc451b]">{service.serviceName} </li>
            </Link>
          </ul>
          <div className="flex-nowrap justify-end">
            <span className="badge badge-accent">${service.servicePrice}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServiceCategoryPanel;
