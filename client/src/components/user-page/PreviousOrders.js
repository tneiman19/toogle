import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ORDERS } from "../../utils/queries";
import PreviousOrdersRow from "./PreviousOrdersRow";

const PreviousOrders = () => {
  const { loading, data } = useQuery(QUERY_ORDERS);
  const orderData = data?.orders || [];
  // console.log("orderData", orderData);
  //   console.log(orderData);

  if (loading) {
    return <div>Loading ...</div>;
  }
  function userOrders() {
    if (orderData.length === 0) {
      return (
        <div className="card w-full bg-base-100">
          <div className="card-body">
            <h2 className="card-title">You haven't ordered anything yet!</h2>
          </div>
        </div>
      );
    } else {
      const orderMapped = orderData.map((order) => {
        return {
          key: order._id,
          services: order.services[0].serviceName,
          name: `${order.provider.firstName} ${order.provider.lastName}`,
          price: order.orderPrice,
          serviceDate: order.serviceDate,
        };
      });
      // console.log(orderMapped);

      return (
        <div name="table-container" className="flex flex-col">
          {orderMapped.map((order) => (
            <PreviousOrdersRow
              key={order.key}
              services={order.services}
              name={order.name}
              price={order.price}
              serviceDate={order.serviceDate}
            />
          ))}
        </div>
      );
    }
  }
  return (
    <div>
      <h1 className="card-title justify-center mb-4">Order History</h1>
      <div>{userOrders()}</div>
    </div>
  );
};

export default PreviousOrders;
