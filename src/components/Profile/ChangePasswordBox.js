"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export function ChangePasswordDialog(prop) {
  const { isOpen, setIsOpen } = prop;
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add password change logic here
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 ${
        !isOpen ? "hidden" : ""
      }`}>
      <div className="bg-white dark:bg-white rounded-lg w-full max-w-md shadow-xl transform transition-all">
        <div className="p-6">
          <h2 className="text-2xl font-bold  mb-6 text-center">
            Change Password
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="current" className="block text-sm font-medium">
                Current Password
              </label>
              <div className="relative">
                <input
                  id="current"
                  type={showCurrentPassword ? "text" : "password"}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-white pr-10"
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 dark:hover:bg-white rounded-full"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}>
                  {showCurrentPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4 " />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="new" className="block text-sm font-medium ">
                New Password
              </label>
              <div className="relative">
                <input
                  id="new"
                  type={showNewPassword ? "text" : "password"}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-10"
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 dark:hover:bg-white rounded-full"
                  onClick={() => setShowNewPassword(!showNewPassword)}>
                  {showNewPassword ? (
                    <EyeOff className="h-4 w-4 " />
                  ) : (
                    <Eye className="h-4 w-4 e" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="repeat" className="block text-sm font-medium ">
                Repeat Password
              </label>
              <div className="relative">
                <input
                  id="repeat"
                  type={showRepeatPassword ? "text" : "password"}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg  pr-10"
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 dark:hover:bg-white rounded-full"
                  onClick={() => setShowRepeatPassword(!showRepeatPassword)}>
                  {showRepeatPassword ? (
                    <EyeOff className="h-4 w-4 " />
                  ) : (
                    <Eye className="h-4 w-4 " />
                  )}
                </button>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors">
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}