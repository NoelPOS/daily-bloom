"use client";

import {
  Search,
  Pencil,
  Trash2,
  Plus,
  ChevronDown,
  ClipboardX,
} from "lucide-react";
import { useState, useEffect } from "react";
import AssignHabitModal from "@/components/Habits_Management/AssignHabitModal";
import Modal from "@/components/Habits_Management/Modal";
import { useSession } from "next-auth/react";
import Image from "next/image";

const defaultCategories = [
  "Education",
  "Meditation",
  "Hydration",
  "Exercises",
  "Personal Development",
  "Relax",
  "Productivity",
  "Financial Habit",
  "Long-term goals",
  "Short-term goals",
  "Creativity",
  "Time Management",
  "Focus",
];

export default function HabitsPage() {
  const { data: session, status } = useSession();
  const [habits, setHabits] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [habitToDelete, setHabitToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [categories, setCategories] = useState(defaultCategories);
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [formData, setFormData] = useState({
    _id: "",
    name: "",
    startDate: "",
    endDate: "",
    totalDays: "",
    category: "",
    image: null,
    userId: "",
  });

  // Custom loading state
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (session?.user?.id) {
      fetchHabits();
      setFormData((prev) => ({
        ...prev,
        userId: session.user.id.toString(),
      }));
    }
  }, [session]);

  const fetchHabits = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/habits/${session.user.id}`);
      if (response.ok) {
        const data = await response.json();
        setHabits(data);
        console.log(data);
      }
    } catch (error) {
      console.error("Failed to fetch habits:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const formDataToSend = new FormData();

    Object.keys(formData).forEach((key) => {
      if (key !== "image") {
        formDataToSend.append(key, formData[key]);
      }
    });

    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    if (isEditing) {
      try {
        await fetch(`/api/habits/update/${formData._id}`, {
          method: "PUT",
          body: formDataToSend,
        });
      } catch (error) {
        console.error("Failed to update habit:", error);
      } finally {
        setIsLoading(false);
        await fetchHabits();
        closeModal();
      }
    } else {
      try {
        const response = await fetch("/api/habits/create", {
          method: "POST",
          body: formDataToSend,
        });

        if (response.ok) {
          await fetchHabits();
          closeModal();
        }
        console.log(formData);
      } catch (error) {
        console.error("Failed to save habit:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleEdit = (habit) => {
    setFormData({
      ...habit,
      userId: session?.user?.id,
      startDate: new Date(habit.startDate).toISOString().split("T")[0],
      endDate: new Date(habit.endDate).toISOString().split("T")[0],
    });
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (habit) => {
    setHabitToDelete(habit);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await fetch(`/api/habits/delete/${habitToDelete._id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        await fetchHabits();
        setIsDeleteModalOpen(false);
        setHabitToDelete(null);
      }
    } catch (error) {
      console.error("Failed to delete habit:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setFormData({ name: "", startDate: "", endDate: "", category: "" });
  };

  const itemsPerPage = 10;
  const totalPages = Math.ceil(habits.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;

  const filteredHabits = habits.filter((habit) =>
    habit.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const currentHabits = filteredHabits.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const calculateStatus = (habit) => {
    const startDate = new Date(habit.startDate);
    const endDate = new Date(habit.endDate);
    const currentDate = new Date();

    if (currentDate < startDate) {
      return "Pending";
    } else if (currentDate > endDate) {
      return "Failed";
    } else {
      return "Ongoing";
    }
  };

  // Custom full-page loader component
  function CustomLoader() {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#7C5CFC]"></div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return <div>Access Denied</div>;
  }

  // Instead of relying on session.loading, use our own loading state
  if (isLoading) {
    return <CustomLoader />;
  }

  return (
    <div className="font-jost pr-8">
      <div className="mb-6 flex justify-between items-center">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-[#7C5CFC] focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="w-5 h-5 text-black/80 absolute right-3 top-2.5" />
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#7C5CFC] text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-[#6a4ee3]"
        >
          <Plus className="w-5 h-5" />
          <span>Assign Habit</span>
        </button>
      </div>

      {/* Habits Table */}
      <div className="bg-white rounded-lg shadow">
        <table className="w-full">
          <thead>
            <tr className="bg-[#7C5CFC]/70">
              <th className="px-6 py-3 text-left text-sm font-semibold">No.</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Habit Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Start Date
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                End Date
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Category
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Status
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredHabits.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-8">
                  <div className="flex flex-col items-center justify-center">
                    <div className="mb-4">
                      <ClipboardX className="w-12 h-12 text-gray-400" />
                    </div>
                    <p className="text-lg font-medium text-gray-600 mb-2">
                      No habits created yet
                    </p>
                    <p className="text-sm text-gray-500 mb-4">
                      Get started by creating your first habit using the 'Assign
                      Habit' button above
                    </p>
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="bg-[#7C5CFC] text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-[#6a4ee3]"
                    >
                      <Plus className="w-5 h-5" />
                      <span>Assign Habit</span>
                    </button>
                  </div>
                </td>
              </tr>
            ) : (
              currentHabits.map((habit, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="px-6 py-4 ">{startIndex + index + 1}</td>
                  <td className="px-6 py-4 ">{habit.name}</td>
                  <td className="px-6 py-4 ">{formatDate(habit.startDate)}</td>
                  <td className="px-6 py-4 ">{formatDate(habit.endDate)}</td>
                  <td className="px-6 py-4 ">{habit.category}</td>
                  <td className="px-6 py-4 ">
                    <span className={`px-2 py-1 rounded-full`}>
                      {calculateStatus(habit)}
                    </span>
                  </td>
                  <td className="px-6 py-4 ">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(habit)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <Pencil className="w-4 h-4 text-yellow-500" />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(habit)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {filteredHabits.length > 0 && (
          <div className="px-6 py-4 flex justify-between items-center border-t border-gray-200">
            <p className="text-sm text-gray">
              Showing {filteredHabits.length > 0 ? startIndex + 1 : 0} -{" "}
              {Math.min(startIndex + itemsPerPage, filteredHabits.length)} of{" "}
              {filteredHabits.length} habits
            </p>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="bg-[#7C5CFC] text-white px-4 py-2 rounded-lg hover:bg-[#6a4ee3] disabled:opacity-50"
              >
                Previous
              </button>
              <span className="flex items-center px-4">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={
                  currentPage === totalPages || filteredHabits.length === 0
                }
                className="bg-[#7C5CFC] text-white px-4 py-2 rounded-lg hover:bg-[#6a4ee3] disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Assign Habit Modal */}
      <AssignHabitModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <h2 className="text-2xl font-bold mb-6">Assign Habit</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Habit Name
              </label>
              <input
                type="text"
                placeholder="Enter Habit Name"
                className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#7C5CFC]"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Start Date
              </label>
              <input
                type="date"
                className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#7C5CFC]"
                value={formData.startDate}
                onChange={(e) =>
                  setFormData({ ...formData, startDate: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">End Date</label>
              <input
                type="date"
                className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#7C5CFC]"
                value={formData.endDate}
                onChange={(e) =>
                  setFormData({ ...formData, endDate: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                  className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 flex justify-between items-center"
                >
                  {formData.category || "Choose Category"}
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </button>
                {showCategoryDropdown && (
                  <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                    <div className="p-2">
                      <div className="flex flex-wrap gap-1">
                        {categories.map((category) => (
                          <button
                            key={category}
                            type="button"
                            onClick={() => {
                              setFormData({ ...formData, category });
                              setShowCategoryDropdown(false);
                            }}
                            className={`px-3 py-1 rounded-full text-sm ${
                              formData.category === category
                                ? "bg-[#7C5CFC] text-white"
                                : "border border-gray-200 hover:border-[#7C5CFC]"
                            }`}
                          >
                            {category}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Habit Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setFormData({ ...formData, image: file });
                }}
                className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#7C5CFC]"
              />
              {formData.image && (
                <div className="mt-2">
                  <Image
                    src={
                      typeof formData.image === "string"
                        ? formData.image
                        : URL.createObjectURL(formData.image)
                    }
                    alt="Habit preview"
                    width={100}
                    height={100}
                    className="rounded-lg"
                  />
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-4 mt-8">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2 border border-[#7C5CFC] text-[#7C5CFC] rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-[#7C5CFC] text-white rounded-lg hover:bg-[#6a4ee3]"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </AssignHabitModal>

      {/* Delete Habit Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      >
        <h2 className="text-2xl font-bold mb-6">Delete Habit</h2>
        <p className="mb-6">Are you sure you want to delete this habit?</p>
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => setIsDeleteModalOpen(false)}
            className="px-6 py-2 border border-[#7C5CFC] text-[#7C5CFC] rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDeleteConfirm}
            className="px-6 py-2 bg-[#7C5CFC] text-white rounded-lg hover:bg-[#6a4ee3]"
          >
            Delete
          </button>
        </div>
      </Modal>
    </div>
  );
}
