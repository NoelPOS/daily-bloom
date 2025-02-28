"use client";

import { useState, useEffect } from "react";
import { CalendarIcon, ArrowUpDown, Search } from "lucide-react";
import { Calendar } from "@/components/Habits_Management/Calendar";
import { HabitConfirmation } from "@/components/Habits_Management/HabitComfimration";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import { Toaster } from "react-hot-toast";

export function calculateDateRange(startDate, endDate) {
  const dates = [];
  const current = new Date(startDate);
  const end = new Date(endDate);

  while (current <= end) {
    dates.push(current.toISOString().split("T")[0]);
    current.setDate(current.getDate() + 1);
  }

  return dates;
}

export function calculateProgress(habit) {
  const dateRange = calculateDateRange(habit.startDate, habit.endDate);
  const totalDays = dateRange.length;
  const completedDays = habit.completedDates.length;
  const percentage = Math.round((completedDays / totalDays) * 100);

  return {
    totalDays,
    completedDays,
    percentage,
  };
}

export function calculateStatus(habit) {
  const startDate = new Date(habit.startDate);
  const endDate = new Date(habit.endDate);
  const today = new Date();
  const completedDates = habit.completedDates.length;
  const totalDays = habit.totalDays;

  if (today < startDate) {
    return "Pending";
  } else if (today.getDate() - endDate.getDate() == 1) {
    return "Failed";
  } else if (completedDates === totalDays) {
    return "Completed";
  } else {
    return "Ongoing";
  }
}

export default function TrackingPage() {
  const { data: session, status } = useSession();
  const [habits, setHabits] = useState([]);
  const [selectedHabit, setSelectedHabit] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [activeView, setActiveView] = useState("current");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Custom loading state
  const [isLoading, setIsLoading] = useState(true);

  // Custom loader component
  function CustomLoader() {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#7C5CFC]"></div>
      </div>
    );
  }

  const fetchHabitsByPeriod = async (period) => {
    setIsLoading(true);
    try {
      setActiveView(period);
      let response;
      if (period === "current") {
        response = await fetch(`/api/habits/${session.user.id}`);
      } else if (period === "month") {
        response = await fetch(`/api/habits/month/${session.user.id}`);
      } else if (period === "year") {
        response = await fetch(`/api/habits/year/${session.user.id}`);
      }
      const data = await response.json();
      console.log("data", data);
      setHabits(data);
      setCurrentPage(1); // Reset pagination when switching views
    } catch (error) {
      console.error("Error fetching habits:", error);
      toast.error("Failed to load habits");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchHabits = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/habits/${session.user.id}`);
      const data = await response.json();
      setHabits(data);
    } catch (error) {
      console.error("Failed to fetch habits:", error);
      toast.error("Failed to load habits");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchHabits();
    }
  }, [session, status]);

  const handleDateSelect = (habit, date) => {
    setSelectedHabit(habit);
    setSelectedDate(date);
    setShowConfirmation(true);
  };

  const handleHabitComplete = async () => {
    setIsLoading(true);
    if (!selectedHabit || !selectedDate) return;
    setShowCalendar(false);
    try {
      const response = await fetch(`/api/habits/track/${selectedHabit._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          completedDates: [...selectedHabit.completedDates, selectedDate],
          userId: session.user.id,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        await fetchHabits();
        setShowConfirmation(false);
        toast.success("Habit completed successfully");
        if (data.pointsAwarded) {
          toast.success(
            `Congratulations! You completed the habit and earned ${data.pointsAwarded} points!`
          );
        }
      }
    } catch (error) {
      console.error("Failed to update habit:", error);
      toast.error("Failed to update habit");
    } finally {
      setIsLoading(false);
    }
  };

  const getFilteredHabits = () => {
    return habits;
  };

  // Pagination calculations
  const totalPages = Math.ceil(getFilteredHabits().length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentHabits = getFilteredHabits().slice(startIndex, endIndex);

  if (status === "unauthenticated") {
    return <div>Access Denied</div>;
  }

  if (status === "loading" || isLoading) {
    return <CustomLoader />;
  }

  return (
    <div className="font-jost pr-8">
      <Toaster position="top-center" />
      <div className="flex items-center justify-between mb-6">
        <div className="flex space-x-8">
          <button className="px-4 py-2 bg-white rounded-lg border flex items-center space-x-2">
            <Image
              src="/assets/tracking/habit.png"
              alt="habit"
              width={20}
              height={20}
            />
            <span>Habits</span>
          </button>
          <button className="px-4 py-2 bg-white rounded-lg border flex items-center space-x-2">
            <Image
              src="/assets/tracking/fire.png"
              alt="fire"
              width={20}
              height={20}
            />
            <span>Streak</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-3">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4 mb-6">
            <button
              className={`px-4 py-2 ${
                activeView === "current"
                  ? "text-[#7C5CFC] border-b-2 border-[#7C5CFC]"
                  : "text-black"
              }`}
              onClick={() => fetchHabitsByPeriod("current")}
            >
              <div className="flex items-center space-x-2">
                <CalendarIcon
                  className={`w-5 h-5 ${
                    activeView === "current" ? "text-[#7C5CFC]" : "text-black"
                  }`}
                />
                <span>Current</span>
              </div>
            </button>
            <button
              className={`px-4 py-2 ${
                activeView === "month"
                  ? "text-[#7C5CFC] border-b-2 border-[#7C5CFC]"
                  : "text-black"
              }`}
              onClick={() => fetchHabitsByPeriod("month")}
            >
              <div className="flex items-center space-x-2">
                <CalendarIcon
                  className={`w-5 h-5 ${
                    activeView === "month" ? "text-[#7C5CFC]" : "text-black"
                  }`}
                />
                <span>This Month</span>
              </div>
            </button>
            <button
              className={`px-4 py-2 ${
                activeView === "year"
                  ? "text-[#7C5CFC] border-b-2 border-[#7C5CFC]"
                  : "text-black"
              }`}
              onClick={() => fetchHabitsByPeriod("year")}
            >
              <div className="flex items-center space-x-2">
                <CalendarIcon
                  className={`w-5 h-5 ${
                    activeView === "year" ? "text-[#7C5CFC]" : "text-black"
                  }`}
                />
                <span>This Year</span>
              </div>
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <ArrowUpDown className="w-5 h-5 text-black" />
            <Search className="w-5 h-5 text-black" />
          </div>
        </div>

        <div>
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                  <div className="flex items-center space-x-2">
                    <Image
                      src="/assets/tracking/progress.png"
                      alt="progress"
                      width={16}
                      height={16}
                    />
                    <span>Progress</span>
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                  <div className="flex items-center space-x-2">
                    <Image
                      src="/assets/tracking/calendar.png"
                      alt="calendar"
                      width={16}
                      height={16}
                    />
                    <span>Date Range</span>
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                  <div className="flex items-center space-x-2">
                    <Image
                      src="/assets/tracking/meditation.png"
                      alt="meditation"
                      width={16}
                      height={16}
                    />
                    <span>Habit Name</span>
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                  <div className="flex items-center space-x-2">
                    <Image
                      src="/assets/tracking/menu.png"
                      alt="menu"
                      width={16}
                      height={16}
                    />
                    <span>Category</span>
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                  <div className="flex items-center space-x-2">
                    <Image
                      src="/assets/tracking/shield.png"
                      alt="shield"
                      width={16}
                      height={16}
                    />
                    <span>Status</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {currentHabits.map((habit, index) => {
                const progress = calculateProgress(habit);
                return (
                  <tr key={index} className="border-b ">
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <span>{progress.percentage}%</span>
                        <div className="w-3 h-3  rounded-full border border-black"></div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => {
                          setSelectedHabit(habit);
                          setShowCalendar(true);
                        }}
                        className="flex items-center space-x-2  text-black"
                      >
                        <span>
                          {new Date(habit.startDate).toLocaleDateString()} -{" "}
                          {new Date(habit.endDate).toLocaleDateString()}
                        </span>
                        <CalendarIcon className="w-4 h-4" />
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300"
                        />
                        <span>{habit.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300"
                        />
                        <span>{habit.category}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span>{calculateStatus(habit)}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Pagination controls */}
          {habits.length > 0 && (
            <div className="px-6 py-4 flex justify-between items-center border-t border-gray-200">
              <p className="text-sm text-gray">
                Showing {habits.length > 0 ? startIndex + 1 : 0}-
                {Math.min(endIndex, habits.length)} of {habits.length} habits
              </p>
              <div className="flex space-x-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
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
                  disabled={currentPage === totalPages || habits.length === 0}
                  className="bg-[#7C5CFC] text-white px-4 py-2 rounded-lg hover:bg-[#6a4ee3] disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {selectedHabit && showCalendar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-4">
            <Calendar
              setShowCalendar={setShowCalendar}
              startDate={selectedHabit.startDate}
              endDate={selectedHabit.endDate}
              completedDates={selectedHabit.completedDates}
              onDateSelect={(date) => handleDateSelect(selectedHabit, date)}
            />
          </div>
        </div>
      )}

      {selectedHabit && selectedDate && (
        <HabitConfirmation
          isOpen={showConfirmation}
          onClose={() => setShowConfirmation(false)}
          onConfirm={handleHabitComplete}
          habitName={selectedHabit.name}
          date={selectedDate}
        />
      )}
    </div>
  );
}
