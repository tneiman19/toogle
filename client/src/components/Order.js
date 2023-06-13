import React from "react";
// import { useQuery } from "@apollo/client";
// import { QUERY_ORDERS } from "../utils/queries";
import NumberToDate from "../utils/NumberToDate";

const Order = (props) => {
  //   console.log(props);
  //     const { loading, data } = useQuery(QUERY_ORDERS);
  //     const orderData = data?.orders || [];
  //     console.log("orderData", orderData);
  //     const orderMapped = orderData.map((order) => {
  //         return {
  //         key: order._id,
  //         services: order.services[0].serviceName,
  //         src: order.provider.profileImage,
  //         name: `${order.provider.firstName} ${order.provider.lastName}`,
  //         price: order.orderPrice,
  //         orderDate: order.orderDate,
  //         serviceDate: order.serviceDate
  //         }
  //     });

  //   console.log("orderMapped", orderMapped);

  //   if (loading) {
  //     return <div>Loading ...</div>;
  //   }
  console.log(props);
  return (
    <>
      {/* row content */}
      <div
        name={props.orderId}
        className="flex flex-col md:flex-row  md:justify-evenly p-6 md:pt-0 gap-1 border-2 border-slate-200 rounded-2xl mx-8 mb-4"
      >
        {/* provider row  */}
        <div name="provider" className="flex flex-col md:w-30">
          <h2 className="text-[#cc451b] card-title justify-center md:invisible">
            Provider Details
          </h2>
          <div className="avatar flex justify-center">
            <div className="mask mask-squircle w-12 h-12">
              <img src={props.src} alt="Avatar" />
            </div>
          </div>
          <div>
            <div className="font-bold flex justify-center">{props.name}</div>
            <div className="text-sm opacity-50 flex justify-center">
              {props.email}
            </div>
          </div>
        </div>
        {/* service row  */}
        <div name="service" className="flex flex-col md:w-96 pt-3">
          <div className="flex-nowrap justify-center">
            <h2 className="text-[#cc451b] card-title flex justify-center  md:invisible">
              Service Details
            </h2>
            <div className="flex justify-center">
              <div className="mr-1"> Scheduled for:</div>
              <NumberToDate number={props.serviceDate} />
            </div>
            <div className="flex justify-center mt-4">
              <span className=" badge badge-ghost  p-4">{props.services}</span>
            </div>
          </div>
        </div>
        {/* order row  */}
        <div name="order" className="flex flex-col md:w-44 pt-3">
          <div className="flex-nowrap justify-center">
            <h2 className="text-[#cc451b] card-title flex justify-center md:invisible">
              Order Details
            </h2>

            <div className="flex justify-center">
              <div className="mr-1">Ordered on:</div>
              <NumberToDate number={props.orderDate} />
            </div>
            <div className="flex justify-center mt-4">
              <span className="badge badge-accent p-4">${props.price}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Order;
