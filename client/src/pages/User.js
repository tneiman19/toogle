import React, { useState, useEffect } from "react";
// import Orders from "./Orders";
import Profile from "../components/user-page/Profile";
import UpdatePassword from "../components/user-page/UpdatePassword";
import PreviousOrders from "../components/user-page/PreviousOrders";
import DeleteAccount from "../components/user-page/DeleteAccount";
import ProviderSetup from "../components/user-page/ProviderSetUp";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ME } from "../utils/queries";
import { UPDATE_PROVIDER } from "../utils/mutations";

const User = () => {
  const { loading, data } = useQuery(GET_ME);
  const userData = data?.me || {};

  // provider toggle button
  // const [providerToggle, setProviderToggle] = useState(userData?.isProvider || false);

  // const [updateProvider, { mutate, isLoading: isMutating }] = useMutation(UPDATE_PROVIDER);

  // useEffect(() => {
  //   setProviderToggle(data?.me?.isProvider)
  // },[data])

  // async function providerMongo(newProviderState) {
  //   try {
  //     await updateProvider({
  //       variables: { isProvider: newProviderState },
  //     });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  // function that updates state for provider toggle
  // const updateProviderToggle = async (e) => {
  //   setProviderToggle(prevProviderToggle => {
  //     providerMongo(!prevProviderToggle);
  //     return !prevProviderToggle;
  // });
  // }

  const [menuTab, setMenuTab] = useState({
    profile: true,
    provider: false,
    password: false,
    orders: false,
    delete: false,
  });

  const changeMenuTab = (e) => {
    const { target } = e;
    const inputValue = target.value;
    if (inputValue === "profile") {
      setMenuTab({
        profile: true,
        provider: false,
        password: false,
        orders: false,
        delete: false,
      });
    }
    if (inputValue === "provider") {
      setMenuTab({
        profile: false,
        provider: true,
        password: false,
        orders: false,
        delete: false,
      });
    }
    if (inputValue === "password") {
      setMenuTab({
        profile: false,
        provider: false,
        password: true,
        orders: false,
        delete: false,
      });
    }
    if (inputValue === "orders") {
      setMenuTab({
        profile: false,
        provider: false,
        password: false,
        orders: true,
        delete: false,
      });
    }
    if (inputValue === "delete") {
      setMenuTab({
        profile: false,
        provider: false,
        password: false,
        orders: false,
        delete: true,
      });
    }
  };

  if (loading) {
    return <div>Loading ...</div>;
  }

  return (
    <>
      <section
        style={{
          "--userImage-url": `url(${require("../images/userpagetools.jpg")})`,
        }}
        className="py-16 bg-[image:var(--userImage-url)] bg-cover bg-center"
      >
        {/* <div className="form-control w-52"> */}
        {/* <div className="collapse bg-base-200"> */}
        {/* <label className="cursor-pointer label">
          <span className="label-text">Provider Status</span>
          <input
            type="checkbox"
            className="toggle toggle-accent"
            checked={providerToggle}
            onChange={updateProviderToggle}
          />
        </label>
      </div> */}

        <div className="card mx-8 sm:mx-16 bg-base-100 shadow-xl mt-16 mb-16">
          <div className="flex flex-wrap sm:flex-nowrap flex-row p-8 gap-2">
            {/* left side card */}
            <div className="flex flex-col w-full sm:max-w-fit sm:mr-6">
              <div className="avatar justify-center pb-4">
                <div className="w-24 rounded-full">
                  <img
                    src={require(`../images/profile/${userData?.profileImage}`)}
                    alt="profile placeholder"
                  />
                </div>
              </div>
              <div className="join join-vertical">
                <button
                  onClick={changeMenuTab}
                  value="profile"
                  className="btn join-item"
                >
                  My Profile
                </button>
                {/* show this button only if user is has a provider toggled enabled */}
                {/* // className={"btn join-item " + (providerToggle ? "" : "hidden")} */}
                <button
                  onClick={changeMenuTab}
                  value="provider"
                  className="btn join-item"
                >
                  My Services
                </button>
                <button
                  onClick={changeMenuTab}
                  value="password"
                  className="btn join-item"
                >
                  Change Password
                </button>
                <button
                  onClick={changeMenuTab}
                  value="orders"
                  className="btn join-item"
                >
                  Order History
                </button>
                <button
                  onClick={changeMenuTab}
                  value="delete"
                  className="btn join-item"
                >
                  Delete Account
                </button>
              </div>
            </div>

            {/* right side card */}
            <div className="card-body border-double border-4 border-orange-600">
              <div
                id="profile"
                className={`${menuTab.profile ? "" : "hidden"}`}
              >
                <Profile
                  firstName={`${userData.firstName}`}
                  lastName={`${userData.lastName}`}
                  email={`${userData.email}`}
                />
              </div>
              {/* Provider Setup */}
              <div
                id="provider"
                className={`${menuTab.provider ? "" : "hidden"}`}
              >
                {/* <ProviderSetup props={`${userData}`} /> */}
                {/* <ProviderSetup userData={userData} /> */}
                <ProviderSetup data={data} />
              </div>
              <div
                id="password"
                className={`${menuTab.password ? "" : "hidden"}`}
              >
                <UpdatePassword userId={`${userData._id}`} />
              </div>
              <div id="orders" className={`${menuTab.orders ? "" : "hidden"}`}>
                <PreviousOrders />
              </div>
              <div id="delete" className={`${menuTab.delete ? "" : "hidden"}`}>
                <DeleteAccount userId={`${userData._id}`} />
              </div>
            </div>
          </div>
        </div>

        {/* <div className="flex flex-col w-full border-opacity-50 mt-20 mb-5">
      <div className="divider text-2xl font-bold">PREVIOUS ORDERS</div>
    </div>

    <Orders /> */}
      </section>
    </>
  );
};

export default User;
