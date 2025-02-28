"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Popup from "../Rewards/Popup";
import { Toaster } from "sonner";

import axios from "axios";
import Link from "next/link";

const pageTitles = {
  "/dashboard": "Overview",
  "/dashboard/challenge": "Challenges",
  "/dashboard/progress": "Progress",
  "/dashboard/habitmanagement": "Habit Management",
  "/dashboard/tracking": "Tracking",
  "/dashboard/rewards": "Rewards",
  "/dashboard/profile": "Profile Setting",
};

export default function Navbar() {
  const { data: session } = useSession();
  const userId = session?.user.id;

  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (session) {
        const response = await axios.get(
          `/api/users/profile/${session.user.id}`
        );
        setUser(response.data);
        console.log(response.data);
      }
    };
    const fetchNotifications = async () => {
      if (session) {
        try {
          const res = await axios.get(`/api/notifications/${userId}`);
          console.log(res.data);
          setMessages(res.data.notifications);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchUser();
    fetchNotifications();
  }, [session, userId]);

  const [showNotifications, setShowNotifications] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const pathname = usePathname();
  const title = pageTitles[pathname] || "Dashboard";

  const getTime = (date) => {
    const d = new Date(date);
    return `${d.getHours()}:${d.getMinutes()}`;
  };

  return (
    <div className="w-[calc(100vw-333px)] max-w-full h-[96px] flex justify-between items-center bg-backgroundPrimary px-10 absolute left-0 top-0 z-[100] shadow-sm ">
      {/* Title Section */}
      <h3 className="font-jost font-[600] text-[32px] text-[#000000] leading-[46.24px]">
        {title}
      </h3>

      {/* Show "About Rewards" button only on Rewards page */}
      {pathname === "/dashboard/rewards" && (
        <li
          className="border border-mainLight text-mainLight font-montserrat text-[20px] font-[600] leading-[24.38px] py-4 px-8 rounded-2xl list-none hover:text-backgroundPrimary hover:bg-mainLight transition-all duration-700 cursor-pointer"
          onClick={() => setIsPopupOpen(true)}
        >
          About rewards
        </li>
      )}

      {/* Popup */}
      <Popup open={isPopupOpen} onChange={setIsPopupOpen} />

      {pathname !== "/dashboard/rewards" && (
        <div className="flex justify-end items-center gap-6 ">
          <div className="w-auto h-[67px] flex justify-between items-center gap-6">
            <Link href="/dashboard/profile">
              <Image
                src={user?.profilePicture || "/assets/rewards/user.svg"}
                alt="Profile_Image"
                width={30}
                height={30}
                className="object-contain cursor-pointer rounded-full"
              />
            </Link>

            <div className="w-auto h-[67px] flex flex-col justify-center items-start">
              <h3 className="font-jost font-[500] text-[18px] tracking-wide text-black leading-[21.68px]">
                {user?.username}
              </h3>
              {/* <h3 className="font-jost font-[400] text-[14px] text-black opacity-40 leading-[18.79px]">
                User Account
              </h3> */}
            </div>
          </div>

          {/* Notification */}
          <div
            className="cursor-pointer flex justify-center items-center "
            onClick={() => setShowNotifications(true)}
          >
            <div className="flex justify-center">
              <Image
                src="/assets/dashboard_home/Notification.png"
                alt="Notification"
                width={25}
                height={25}
                className="object-cover"
              />
            </div>
          </div>

          {/* Notification Popup */}
          <div
            className={`absolute top-0 right-0 max-h-[100vh] bg-backgroundPrimary z-50 w-[40%] h-auto transition-all duration-200 ease-linear ${
              showNotifications ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="bg-backgroundPrimary flex justify-between items-center w-[100%] h-[96px] px-10 border-b border-b-black border-opacity-50">
              <span className="text-[#000000] opacity-80 text-[22px] tracking-wide font-jost font-[500]">
                Notifications
              </span>

              <button onClick={() => setShowNotifications(false)}>
                <Image
                  src={"/assets/rewards/rewards-icon.svg"}
                  alt="Image"
                  width={10}
                  height={10}
                  className="bg-mainLight rounded-full w-7 h-7 p-2 hover:bg-mainSecondary transition-all duration-700"
                />
              </button>
            </div>
            <div className="overflow-y-auto scrollbar-hide w-full h-[calc(100vh-96px)]">
              {messages.map((message, index) => {
                return (
                  message.read === false && (
                    <div
                      key={index}
                      className={`flex justify-start items-start gap-3 border-b border-b-black border-opacity-10 px-10 py-5 
                       "bg-white"
                    }`}
                    >
                      <div className=" bg-mainLight rounded-full w-[6.5px] h-[6.5px] mt-2"></div>
                      <div className="flex flex-col justify-start items-start w-10/12 gap-1">
                        <p className="font-jost font-[400] text-[16px] text-black opacity-80 tracking-wide">
                          {message.message}
                        </p>
                        <div className="flex justify-between items-center w-full">
                          <p className="font-jost font-[400] text-[14px] text-black opacity-50 tracking-wide ">
                            {getTime(message.createdAt)}
                          </p>
                          {/* mark as read button */}
                          <button
                            className="font-jost font-[400] text-[14px] text-black opacity-50 tracking-wide hover:text-mainPrimary transition-all duration-700"
                            onClick={async () => {
                              try {
                                const res = await axios.put(
                                  `/api/notifications/update/${message._id}`
                                );
                                if (res.status === 200) {
                                  setMessages((prev) => {
                                    const newMessages = prev.map((msg) => {
                                      if (msg._id === message._id) {
                                        return { ...msg, read: true };
                                      }
                                      return msg;
                                    });
                                    return newMessages;
                                  });
                                  Toaster.success(
                                    "Notification marked as read"
                                  );
                                }
                                console.log(res.data);
                              } catch (error) {
                                console.log(error);
                              }
                            }}
                          >
                            <div className="flex justify-between items-center">
                              <p>Mark as read</p>
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
