"use client";

import { toast } from "sonner";
import Image from "next/image";
import { useState } from "react";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Show success toast notification
    toast.success("Message Sent Successfully! 🎉", {
      duration: 2000,
      style: {
        backgroundColor: "#8778FB",
        color: "#FFFFFF",
        letterSpacing: "0.025rem",
        borderRadius: "10px",
        border: "none",
        padding: "18px",
        fontSize: "16px",
        fontFamily: "Montserrat, sans-serif",
      },
    });

    // Clear form after submission
    setFormData({ firstName: "", lastName: "", email: "", message: "" });
  };

  return (
    <div className="bg-backgroundPrimary w-[85%] mx-auto my-8 flex justify-center items-center gap-5">
      {/* Left Section */}
      <div className="bg-[#8174FF] p-7 rounded-[10px] w-[50%] h-[95vh]">
        <div className="flex flex-col justify-start items-start gap-4 mb-5">
          <p className="font-[600] text-[20px] font-montserrat text-backgroundPrimary tracking-wide">
            Get in Touch
          </p>
          <h2 className="tracking-wide text-[30px] text-backgroundPrimary font-montserrat font-[600] leading-[39.01px]">
            How Can I Help? Reach Out
            <br />
            Feedback To Us.
          </h2>
          <p className="tracking-wide text-[18px] text-backgroundPrimary font-montserrat font-[500] leading-[20px]">
            Have questions or feedback? We’re here to help. Send us a message,
            and we’ll be here for you.
          </p>
        </div>
        <hr />

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="mt-5">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {/* First Name */}
            <div>
              <label className="block text-[20px] font-montserrat font-[500] text-backgroundPrimary tracking-wide">
                First name
              </label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                className="block w-full rounded-[10px] bg-backgroundPrimary opacity-80 px-5 py-3 outline-none"
                required
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-[20px] font-montserrat font-[500] text-backgroundPrimary tracking-wide">
                Last name
              </label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                className="block w-full rounded-[10px] bg-backgroundPrimary opacity-80 px-5 py-3 outline-none"
                required
              />
            </div>

            {/* Email */}
            <div className="sm:col-span-2">
              <label className="block text-[20px] font-montserrat font-[500] text-backgroundPrimary tracking-wide">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="block w-full rounded-[10px] bg-backgroundPrimary opacity-80 px-5 py-3 outline-none"
                required
              />
            </div>

            {/* Message */}
            <div className="sm:col-span-2">
              <label className="block text-[20px] font-montserrat font-[500] text-backgroundPrimary tracking-wide">
                Message
              </label>
              <textarea
                rows={4}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="block w-full rounded-[10px] bg-backgroundPrimary opacity-80 px-5 py-3 outline-none"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="justify-end items-center inline-flex sm:col-span-2">
              <button
                type="submit"
                className="block py-2 px-10 rounded-[10px] bg-backgroundSecondary bg-opacity-80 text-center text-[20px] font-montserrat font-[600] tracking-wide text-mainPrimary hover:bg-opacity-100 shadow-inner duration-700 transition-all"
              >
                Send
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Right Section */}
      <div className="rounded-[10px] border border-[#8174ff] flex justify-center items-center p-7 w-[30%] h-[95vh]">
        <Image
          src="/assets/contact_images/contact.png"
          alt="Contact Image"
          width={360}
          height={620}
        />
      </div>
    </div>
  );
}
