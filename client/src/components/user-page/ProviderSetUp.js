import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_MY_SERVICES } from "../../utils/queries";
import { UPDATE_PROVIDER_LIST } from "../../utils/mutations";

// export default function ProviderSetup(props) {
export default function ProviderSetup(props) {
  // console.log("props: ", props)
  // Get information about user
  let userData = { ...props.data.me };
  // let userData = { ...props.data };
  // console.log("toggle switched, userData: ", userData)

  // Mutation to remove user from list service providers
  const [updateProviderList] = useMutation(UPDATE_PROVIDER_LIST);

  // Query services and categories
  const { loading, data, refetch } = useQuery(QUERY_MY_SERVICES);
  const myServices = data?.getMyServices || [];

  const [selectedService, setSelectedService] = useState({
    stateId: "",
    stateName: "",
  });

  if (loading) {
    return <div>Loading...</div>;
  }
  // Store additional information about buttons
  const buttonData = {};

  // remove currenlty selected element
  const stopService = async (e) => {
    try {
      await updateProviderList({
        variables: { serviceId: selectedService.stateId },
      });
      // updata services data
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  // update state for selected Service
  // show confirmation modal
  const showModal = (e) => {
    const selectedButton = e.target.name;
    setSelectedService((prevState) => ({
      ...prevState,
      stateId: buttonData[selectedButton].serviceId,
      stateName: buttonData[selectedButton].serviceName,
    }));
    window.my_modal_2.showModal();
  };

  // update button data
  function updateButtonData(myService, index) {
    buttonData[`button${index + 1}`] = {
      serviceId: myService._id,
      serviceName: myService.serviceName,
    };

    return (
      <div className="flex flex-col lg:flex-row lg:mb-2 justify-evenly" key={index}>
        {/* <div>{index + 1}</div> */}
        <div className="flex justify-center lg:justify-normal lg:w-96">{index + 1}. {myService.serviceName}</div>
        <div className="text-sm opacity-50 flex justify-center lg:justify-normal lg:w-48">{myService.serviceCategory.categoryName}</div>
        <div className="flex justify-center mb-3 lg:w-24">
          <button
            className="btn btn-outline btn-error btn-xs"
            name={`button${index + 1}`}
            onClick={showModal}
          >
            Remove
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <h1 className="card-title flex-grow justify-center">My Services</h1>
      {/* <button className="btn btn-accent">Add Service</button> */}
      {/* <h2 className="font-bold py-12">
        Provider Status:{" "}
        <span
          className={`p-2 rounded-lg bg-accent ${
            userData?.isProvider ? "bg-accent" : "bg-warning"
          }`}
        >
          {userData?.isProvider ? "Active" : "Suspended"}
        </span>
      </h2> */}

      {/* Currently offered */}
      {/* <h2 className="font-bold">Current services:</h2> */}
      <div className="overflow-x-auto">
        <div name="table-container" className="flex flex-col">
          {/* head */}
          <div className="justify-evenly mb-4 mt-4 hidden lg:flex">
            <div className="flex w-96">Service</div>
            <div className="flex w-48">Category</div>
            <div className="flex w-24"></div>
          </div>
          <div>
            {/* create a row for each service a user is set up to provide */}
            {myServices &&
              myServices.map((myService, index) =>
                updateButtonData(myService, index)
              )}
          </div>
        </div>
      </div>

      {/* Modal */}
      <dialog id="my_modal_2" className="modal">
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-lg text-error">Please confirm</h3>
          <p className="py-4 text-center">
            Are you sure you want to stop providing service for{" "}
          </p>
          <p className="font-semibold text-center">
            {selectedService.stateName}?
          </p>

          <div className="modal-action">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn hover:btn-error" onClick={stopService}>
              Confirm
            </button>
            <button className="btn">Cancel</button>
          </div>
        </form>
      </dialog>
    </>
  );
}
