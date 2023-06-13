import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { DatePicker1Presentation } from "./Calendar";
import Auth from "../../utils/auth";
import { useQuery } from "@apollo/client";
import { GET_ME } from "../../utils/queries";
import { useMutation } from "@apollo/client";
import { ADD_ORDER } from "../../utils/mutations";

const ServiceProvidersTable = (props) => {
  const { loading, data } = useQuery(GET_ME);
  const userData = data?.me || [];

  const [
    createOrder,
    { createOrderData, createOrderLoading, createOrderError },
  ] = useMutation(ADD_ORDER);

  const handleCreateOrder = async (data) => {
    console.log(data);
    try {
      createOrder({ variables: data });
      console.log("line 23 data", data);
    } catch (error) {
      console.error("THIS IS TOTALLY NOT AN ERROR");
    }
    // Auth.logout();
    // return <Navigate replace to="/" />;
  };

  //console.log(userData);

  const [childDate, setChildDate] = useState("");
  const [selectedProvider, setSelectedProvider] = useState("");
  const [orderReady, setOrderReady] = useState(false);

  const updateDate = (data) => {
    //Function for child element to update
    setChildDate(data);
  };

  useEffect(() => {
    printOrderDetails();
  }, [selectedProvider]);

  function updateProvider(e) {
    setSelectedProvider(e.target.name);
    //console.log(selectedProvider);
  }
  const printOrderDetails = async (e) => {
    //Function that will get the details we need for the order
    const orderDetails = {
      services: props.data.service._id,
      user: userData._id,
      provider: selectedProvider,
      serviceQty: 1,
      orderPrice: props.data.service.servicePrice,
      serviceDate: childDate,
      //serviceDate: "07/11/2023",
    };
    const allValuesExist = Object.values(orderDetails).every(
      (value) => value !== undefined && value !== ""
    );
    if (!allValuesExist) {
      console.log("not placing an order", orderDetails);
      setOrderReady(false);
      return;
    }
    setOrderReady(true);
    console.log("place an order", orderDetails);
    handleCreateOrder(orderDetails);
    window.my_modal_1.showModal();
  };

  //console.log("props", props);
  const providers = props.data?.service?.serviceProviders || [];
  //console.log(providers);

  if (!Array.isArray(providers)) {
    // Handle the case where providers is not an array
    return <p>No service providers available.</p>;
  }

  return (
    <>
      <div className="divider text-2xl font-bold">SELECT DATE &amp; TIME</div>
      <div className="m-10 p-6 bg-white border border-gray-200 rounded-lg shadow-lg  flex flex-row items-center justify-center">
        <div className="flex  ">
          <DatePicker1Presentation updateDate={updateDate} />
        </div>
      </div>

      <section>
        {/* category grid */}
        <div className="justify-center my-10">
          <div className=" w-full border-opacity-50">
            <div className="divider text-2xl font-bold pb-8 pt-2">
              SELECT YOUR PROVIDER
            </div>
          </div>

          {/* Map through providers and create cards */}
          {providers.map((provider) => (
            <div className="flex flex-col md:flex-row md:justify-evenly md:p-3 gap-1 border-2 border-slate-200 rounded-2xl mb-2 mx-10">
              {/* profile */}
              <div className="avatar flex justify-center md:w-24">
                <div className="mask mask-squircle w-16 h-16">
                  <img src={require(`../../images/profile/${provider?.profileImage}`)} alt="Avatar" />
                </div>
              </div>
                <div className="font-bold flex justify-center items-center md:w-36">
                  {provider?.firstName} {provider?.lastName}
                </div>
                <div className="text-sm opacity-50 flex justify-center items-center md:w-56">
                  {provider?.email}
                </div>

              {/* button */}
              <div className="flex justify-center items-center">
                {Auth.loggedIn() ? (
                  // Render content when Auth.loggedIn is true
                  <button
                    className="btn btn-accent btn-sm focus:outline-none focus:ring focus:ring-red-300 w-36 mb-2 md:mb-0"
                    name={provider._id}
                    onClick={updateProvider}
                  >
                    Hire {provider.firstName}
                  </button>
                ) : (
                  // Render content when Auth.loggedIn is false
                  <div className="">
                    <Link to="/login" className="btn btn-sm btn-outline btn-accent mb-2 md:mb-0">
                      Login/Signup
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Open the modal using ID.showModal() method */}
      {/* <button className="btn" onClick={() => window.my_modal_1.showModal()}>open modal</button> */}
      <dialog id="my_modal_1" className="modal">
        <form method="dialog" className="modal-box ">
          <p className="font-bold text-3xl flex justify-center">
            Processing Your Order!
          </p>
          {/* <progress className="progress progress-accent  w-56 m-2"></progress> */}
          <div className="m-10">
            <ul className="steps right-15 min-w-full pb-8">
              <li className="step step-accent">Choose Service</li>
              <li className="step step-accent">Pick Date & Provider</li>
              <li className="step step-accent">Confirm Order</li>
            </ul>
          </div>
          <p className="py-1 text-center">
            Thank you for your order, and of course, thank you for choosing
            toogle! We look forward to helping you find your next toogle
            professional!
          </p>
          <div className="modal-action">
            {/* if there is a button in form, it will close the modal */}
            <Link className="btn btn-accent" to="/orders">
              View Order
            </Link>
            {/* <a className="btn btn-accent" href="/orders"> */}
              {/* View Order */}
            {/* </a> */}
          </div>
        </form>
      </dialog>
    </>
  );
};

export default ServiceProvidersTable;
