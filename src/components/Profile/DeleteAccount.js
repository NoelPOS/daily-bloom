"use client";
import React, { useState } from "react";

export function DeleteAccountDialog(prop) {
  const { isOpen_delete, setIsOpen_delete } = prop;
  const [confirmUsername, setConfirmUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsOpen_delete(false);
  };

  return (
    <div
      className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 ${
        !isOpen_delete ? "hidden" : ""
      }`}>
      <div className="bg-white rounded-lg w-full max-w-md p-6 mx-4">
        <div className="text-center space-y-4">
          <div className="mx-auto rounded-full bg-red-100 p-6 w-24 h-24 flex items-center justify-center">
            {/* Trash icon using SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-red-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round">
              <path d="M3 6h18"></path>
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold">Delete Account</h2>
          <p className="text-red-500 text-sm font-medium">
            WARNING this is permanent and cannot be undone!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          <div className="space-y-2">
            <label className="text-sm text-gray-600">Confirm Username</label>
            <input
              type="text"
              value={confirmUsername}
              onChange={(e) => setConfirmUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setIsOpen_delete(false)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              Go Back
            </button>
            <button
              type="submit"
              disabled={true}
              className="flex-1 px-4 py-2 bg-red-500  text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent">
              Start Deletion
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}