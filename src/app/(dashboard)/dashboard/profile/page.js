"use client";
import Image from "next/image";
import axios from "axios";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { ChangePasswordDialog } from "@/components/Profile/ChangePasswordBox";
import { DeleteAccountDialog } from "@/components/Profile/DeleteAccount";

import {
  Pencil,
  Flame,
  Droplets,
  Dumbbell,
  X,
  Check,
  Camera,
} from "lucide-react";

const convertToBase64Client = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export default function UserProfile() {
  const { data: session, update: updateSession } = useSession();
  const userId = session?.user.id;
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen_delete, setIsOpen_delete] = useState(false);
  const [isOpen_notification, setIsOpen_notification] = useState(true);
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [isEditingHeader, setIsEditingHeader] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    gender: "",
    points: 0,
  });
  const [headerData, setHeaderData] = useState({
    username: "",
    profileImage: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isHeaderLoading, setIsHeaderLoading] = useState(false);

  // Success/error message state
  const [statusMessage, setStatusMessage] = useState({ type: "", message: "" });
  const [previewImage, setPreviewImage] = useState(null);

  function CustomLoader() {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#7C5CFC]"></div>
      </div>
    );
  }

  // Update form data when user session changes
  useEffect(() => {
    setIsLoading(true);
    if (session?.user?.id) {
      const fetchUser = async () => {
        try {
          const response = await axios.get(
            `/api/users/profile/${session.user.id}`
          );
          setFormData({
            username: response.data.username,
            email: response.data.email,
            gender: response.data.gender,
            points: response.data.points,
          });
          console.log(response.data);
          setHeaderData({
            username: response.data.username,
            profileImage: response.data.profilePicture,
          });
        } catch (error) {
          console.error("Error fetching user:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchUser();
    }
  }, [session]);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleOpen_delete = () => {
    setIsOpen_delete(true);
  };

  // Handle input changes for personal info
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle input changes for header info
  const handleHeaderChange = (e) => {
    const { name, value } = e.target;
    setHeaderData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle file input change for profile image
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setHeaderData((prev) => ({
        ...prev,
        profileImage: file,
      }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // Toggle edit mode for personal info
  const toggleEditPersonal = () => {
    if (isEditingPersonal) {
      // If we're currently editing and want to cancel, reset the form data
      setFormData({
        username: "",
        email: "",
        gender: "",
        points: 0,
      });
    }
    setIsEditingPersonal(!isEditingPersonal);
  };

  // Toggle edit mode for header
  const toggleEditHeader = () => {
    if (isEditingHeader) {
      // If we're cancelling, reset the preview and header data
      setPreviewImage(null);
      setSelectedImage(null);
      setHeaderData({
        username: "",
        profileImage: null,
      });
    }
    setIsEditingHeader(!isEditingHeader);
  };

  // Save personal information changes
  const savePersonalChanges = async () => {
    setIsLoading(true);
    setStatusMessage({ type: "", message: "" });

    try {
      const response = await axios.put("/api/users/profile", {
        username: formData.username,
        email: formData.email,
        gender: formData.gender,
        userId: userId,
      });

      if (response.status === 200) {
        setFormData({
          username: response.data.username,
          email: response.data.email,
          gender: response.data.gender,
        });
        setIsEditingPersonal(false);
        setStatusMessage({
          type: "success",
          message: "Profile updated successfully!",
        });
        setTimeout(() => {
          setStatusMessage({ message: "", type: "" });
        }, 3000);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setStatusMessage({
        type: "error",
        message: error.response?.data?.message || "Failed to update profile.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Save header changes (username and profile picture)
  const saveHeaderChanges = async () => {
    setIsHeaderLoading(true);
    setStatusMessage({ type: "", message: "" });

    try {
      const headerFormData = new FormData();
      headerFormData.append("username", headerData.username);
      if (headerData.profileImage) {
        const base64Image = await convertToBase64Client(
          headerData.profileImage
        );
        headerFormData.append("profileImage", base64Image);
      }
      headerFormData.append("userId", userId);
      await axios.put("/api/users/profile-header", headerFormData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setIsEditingHeader(false);
      setStatusMessage({
        type: "success",
        message: "Profile header updated successfully!",
      });
    } catch (error) {
      console.error("Error updating profile header:", error);
      setStatusMessage({
        type: "error",
        message:
          error.response?.data?.message || "Failed to update profile header.",
      });
    } finally {
      setIsHeaderLoading(false);
      setHeaderData({ username: "", profileImage: null });
      setPreviewImage(null);
    }
  };

  if (isLoading || !session) {
    return <CustomLoader />;
  }

  return (
    <div className="min-h-screen bg-gray-50 pr-8">
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Status message */}
        {statusMessage.message && (
          <div
            className={`p-4 rounded-lg ${
              statusMessage.type === "error"
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {statusMessage.message}
          </div>
        )}

        {/* Header Section */}
        <div className="p-6 border-2 border-purple-200 rounded-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Image
                  src={previewImage || headerData.profileImage}
                  alt="User avatar"
                  width={80}
                  height={80}
                  className="rounded-full object-cover"
                />
                {isEditingHeader && (
                  <label
                    htmlFor="profile-upload"
                    className="absolute bottom-0 right-0 rounded-full bg-white p-1.5 shadow-lg cursor-pointer"
                  >
                    <Camera className="h-4 w-4 text-gray-600" />
                    <input
                      id="profile-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </label>
                )}
                {!isEditingHeader && (
                  <button className="absolute bottom-0 right-0 rounded-full bg-white p-1.5 shadow-lg">
                    <Camera className="h-4 w-4 text-gray-600" />
                  </button>
                )}
              </div>
              <div className="space-y-1">
                {isEditingHeader ? (
                  <input
                    type="text"
                    name="username"
                    value={headerData.username}
                    onChange={handleHeaderChange}
                    className="text-xl font-semibold w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Your name"
                  />
                ) : (
                  <h2 className="text-xl font-semibold">{formData.username}</h2>
                )}
                <div className="flex items-center gap-2 rounded-lg bg-purple-100 px-4 py-2">
                  <Flame className="h-4 w-4 text-orange-500" />
                  <span className="text-sm text-purple-600">0 Points</span>
                </div>
              </div>
            </div>

            {isEditingHeader ? (
              <div className="flex gap-2">
                <button
                  onClick={toggleEditHeader}
                  className="flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200 ease-in-out shadow-sm active:scale-95"
                >
                  <X className="mr-1 h-4 w-4" />
                  Cancel
                </button>
                <button
                  onClick={saveHeaderChanges}
                  disabled={isHeaderLoading}
                  className="flex items-center px-3 py-1.5 text-sm font-medium text-white bg-[#8678FB] rounded-lg hover:bg-[#7569ec] transition-all duration-200 ease-in-out shadow-sm hover:shadow active:scale-95 disabled:opacity-70"
                >
                  <Check className="mr-1 h-4 w-4" />
                  {isHeaderLoading ? "Saving..." : "Save"}
                </button>
              </div>
            ) : (
              <button
                onClick={toggleEditHeader}
                className="hidden sm:flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-purple-300 rounded-lg hover:bg-purple-50 hover:text-purple-700 hover:border-purple-400 transition-all duration-200 ease-in-out shadow-sm hover:shadow active:scale-90"
              >
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </button>
            )}
          </div>
        </div>

        {/* Personal Information */}
        <div className="p-6 border-2 border-purple-200 rounded-xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Personal Information</h3>
            {isEditingPersonal ? (
              <div className="flex gap-2">
                <button
                  onClick={toggleEditPersonal}
                  className="flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200 ease-in-out shadow-sm active:scale-95"
                >
                  <X className="mr-1 h-4 w-4" />
                  Cancel
                </button>
                <button
                  onClick={savePersonalChanges}
                  disabled={isLoading}
                  className="flex items-center px-3 py-1.5 text-sm font-medium text-white bg-[#8678FB] rounded-lg hover:bg-[#7569ec] transition-all duration-200 ease-in-out shadow-sm hover:shadow active:scale-95 disabled:opacity-70"
                >
                  <Check className="mr-1 h-4 w-4" />
                  {isLoading ? "Saving..." : "Save"}
                </button>
              </div>
            ) : (
              <button
                onClick={toggleEditPersonal}
                className="hidden sm:flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-purple-300 rounded-lg hover:bg-purple-50 hover:text-purple-700 hover:border-purple-400 transition-all duration-200 ease-in-out shadow-sm hover:shadow active:scale-90"
              >
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </button>
            )}
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-1">
              <label className="text-sm text-gray-500">Full Name</label>
              {isEditingPersonal ? (
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              ) : (
                <p className="font-medium">{formData.username}</p>
              )}
            </div>
            <div className="space-y-1">
              <label className="text-sm text-gray-500">Password</label>
              <p className="font-medium">********</p>
            </div>
            <div className="space-y-1">
              <label className="text-sm text-gray-500">Email</label>
              {isEditingPersonal ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              ) : (
                <p className="font-medium">{formData.email}</p>
              )}
            </div>
            <div className="space-y-1">
              <label className="text-sm text-gray-500">Gender</label>
              {isEditingPersonal ? (
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              ) : (
                <p className="font-medium">{formData.gender}</p>
              )}
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
            <button
              className="sm:order-2 px-4 py-2 text-sm font-medium text-red-600 hover:text-white hover:bg-red-600 rounded-lg transition-all duration-200 ease-in-out shadow-sm hover:shadow-md active:scale-95 border border-red-600"
              onClick={handleOpen_delete}
            >
              Delete Account
            </button>
            <button
              className="px-4 py-2 text-sm font-medium text-white bg-[#8678FB] hover:bg-[#8678FB]-1000 rounded-xl transition-all duration-200 ease-in-out shadow-sm hover:shadow-md active:scale-95"
              onClick={handleOpen}
            >
              Change Password
            </button>
          </div>
        </div>

        {/* Achievements */}
        <div className="p-6 space-y-4">
          <h3 className="text-lg font-semibold">Achievements</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="bg-gradient-to-t to-purple-40 from-purple-200 p-4 rounded-xl border border-purple-100 shadow-md">
              <div className="mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-medium tracking-tight">
                    Achievement Unlocked
                  </span>
                  <span role="img" aria-label="party popper">
                    🎉
                  </span>
                </div>
                <p className="text-sm text-gray-500 font-light mt-5">
                  Habit Formation Complete
                </p>
              </div>
              <div className="flex items-center justify-between mt-5">
                <div className="flex items-center gap-3">
                  <Droplets className="h-5 w-5 text-blue-500" />
                  <span className="font-medium text-gray-800">Drink Water</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Flame className="h-4 w-4 text-orange-500" />
                  <span className="font-medium text-gray-700">x 30 Days</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-t to-purple-40 from-purple-200 p-4 rounded-xl border border-purple-100 shadow-md">
              <div className="mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-medium tracking-tight">
                    Achievement Unlocked
                  </span>
                  <span role="img" aria-label="party popper">
                    🎉
                  </span>
                </div>
                <p className="text-sm text-gray-500 font-light mt-5">
                  Habit Formation Complete
                </p>
              </div>
              <div className="flex items-center justify-between mt-5">
                <div className="flex items-center gap-3">
                  <Dumbbell className="h-5 w-5 text-blue-500" />
                  <span className="font-medium text-gray-800">Drink Water</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Flame className="h-4 w-4 text-orange-500" />
                  <span className="font-medium text-gray-700">x 30 Days</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ChangePasswordDialog isOpen={isOpen} setIsOpen={setIsOpen} />
      <DeleteAccountDialog
        isOpen_delete={isOpen_delete}
        setIsOpen_delete={setIsOpen_delete}
      />
    </div>
  );
}
