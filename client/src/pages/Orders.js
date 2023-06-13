import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_ORDERS } from "../utils/queries";
import Order from "../components/Order";

const Orders = () => {
  const { loading, data } = useQuery(QUERY_ORDERS, {
    fetchPolicy: "no-cache"
  });
  const orderData = data?.orders || [];
  // console.log("orderData", orderData);


  if (loading) {
    return <div>Loading ...</div>;
  }

  function userOrders() {
    if (orderData.length === 0) {
      return (
        <div className="card w-full bg-base-100">
          <div className="card-body">
            <h2 className="card-title">You haven't ordered anything!</h2>
            <p>Don't try to do it all yourself.</p>
            <p>Click here to get help for whatever you need from one of our trusted service providers.</p>
            <div className="card-actions">
              <button className="btn btn-accent">
              <Link to="/services">Browse Services</Link>
                </button>
            </div>
          </div>
        </div>
      );
    } else {
      const orderMapped = orderData.map((order) => {
        return {
          key: order._id,
          services: order.services[0].serviceName,
          src: order.provider.profileImage,
          name: `${order.provider.firstName} ${order.provider.lastName}`,
          email: order.provider.email,
          price: order.orderPrice,
          orderDate: order.orderDate,
          serviceDate: order.serviceDate,
        };
      });
    
      // console.log("orderMapped", orderMapped);

      return (
        <div name="table-container" className="flex">
        <div name="row-container" className="card bg-base-100 w-full">
          {/* header row for horizontal cards */}
          <div
            name="header-row"
            className="flex-row justify-evenly px-6 pt-8 gap-1 hidden md:flex mx-8 mb-4"
          >
            <h2 className="text-[#cc451b] card-title justify-center sm:w-44">
              Provider Details
            </h2>
            <h2 className="text-[#cc451b] card-title justify-center sm:w-96">
              Service Details
            </h2>
            <h2 className="text-[#cc451b] card-title justify-center sm:w-44">
              Order Details
            </h2>
          </div>

          {orderMapped.map((order) => (
            <Order
              key={order.key}
              services={order.services}
              src={require(`../images/profile/${order.src}`)}
              name={order.name}
              email={order.email}
              price={order.price}
              orderDate={order.orderDate}
              serviceDate={order.serviceDate}
            />
          ))}
        </div>
      </div>
      )

    }
  }

  // console.log(orderMapped);
  return (
    <div className="page-container">
      {/* banner */}
      <div className="hero">
        <img
          src={require("../images/orders-banner-2.jpeg")}
          alt="man using power drill"
          className="hero object-cover"
        ></img>
        {/* <div className="hero-overlay "></div> */}
        <div className="text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="xs:text-2xl md:text-4xl lg:text-5xl font-bold md:mb-20 xs:mb-15">
              You did it!
            </h1>
          </div>
        </div>
      </div>

      <div>{userOrders()}</div>
      
    </div>
  );
};

export default Orders;
