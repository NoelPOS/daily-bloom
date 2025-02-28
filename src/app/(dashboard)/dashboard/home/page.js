"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

import Data from "@/components/Dashboard_Home/Data";
import WithoutData from "@/components/Dashboard_Home/HomeWithoutDataChart";
import { set } from "mongoose";

export default function DashboardHomePage() {
  // Habit Section
  const [upcomingHabit, setUpcomingHabit] = useState(0);
  const [totalHabit, setTotalHabit] = useState(0);
  const [failedHabit, setFailedHabit] = useState(0);
  const [completedHabit, setCompletedHabit] = useState(0);
  const [ongoingHabit, setOngoingHabit] = useState(0);
  const [completedPercentage, setCompletedPercentage] = useState(0);
  const [habits, setHabits] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const habitsPerPage = 3;
  const totalPages = Math.ceil(habits.length / habitsPerPage);

  const { data: session, status } = useSession();
  const userId = session?.user.id;

  function CustomLoader() {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#7C5CFC]"></div>
      </div>
    );
  }

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/home/${userId}`);
        console.log(res.data);
        setHabits(res.data.habits);
        setUpcomingHabit(res.data.upcomingHabits);
        setTotalHabit(res.data.totalHabits);
        setFailedHabit(res.data.failedHabits);
        setCompletedHabit(res.data.completedHabits);
        setOngoingHabit(res.data.onGoingHabits);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    if (session) {
      fetchDashboardData();
    }
  }, [session, userId]);

  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  };

  // Determine the habits to display for the current page
  const indexOfLastHabit = page * habitsPerPage;
  const indexOfFirstHabit = indexOfLastHabit - habitsPerPage;
  const currentHabits = habits.slice(indexOfFirstHabit, indexOfLastHabit);

  if (status === "loading" || loading) {
    return <CustomLoader />;
  }

  return (
    <div>
      {/* Card Section */}
      <div className="flex justify-around mb-3 r-0">
        <div className="bg-white rounded-[20px] p-6 flex justify-start items-center space-x-6 shadow-lg">
          {/* Left: Text Content */}
          <div className="flex flex-col mr-20">
            {completedPercentage === 0 || !completedPercentage ? (
              <>
                <h2 className="text-black text-xl font-semibold font-['Montserrat']">
                  Welcome, {session?.user?.username} !
                </h2>
                <p className="text-black font-['Montserrat'] mt-2">
                  Let&apos;s get started on building great habits today!
                  <br />
                  Track your habits and see your progress here.
                </p>
              </>
            ) : (
              <>
                <h2 className="text-black text-xl font-semibold font-['Montserrat']">
                  Congratulations, {session?.user?.username} !
                </h2>
                <p className="text-black font-['Montserrat'] mt-2">
                  You have done
                  <span className="font-semibold">
                    {completedPercentage} more habits
                  </span>
                  today.
                  <br />
                  Check your total habit progress in your dashboard.
                </p>
              </>
            )}
          </div>

          {/* Right: Image */}
          <div className="flex-shrink ml-20">
            <Image
              src="/assets/dashboard images/man.png"
              alt="Man"
              width={150}
              height={150}
              className="rounded-full"
            />
          </div>
        </div>

        <div className="px-10 flex justify-end">
          <div className="bg-[#b0a7f8] rounded-[20px] px-[12px] py-[22px] gap-[30px] inline-flex flex-col justify-start items-center h-[160px] mr-10">
            <div className="text-black text-xl font-medium font-['Jost'] text-center">
              Upcoming Habit
            </div>
            <div className="text-black text-[26px] font-medium font-['Jost']">
              {upcomingHabit}
            </div>
          </div>
          <div className="bg-[#b0a7f8] rounded-[20px] px-[22px] py-[22px] gap-[30px] inline-flex flex-col justify-start items-center h-[160px]">
            <div className="text-black text-xl font-medium font-['Jost'] text-center">
              Total Habit
            </div>
            <div className="text-black text-[26px] font-medium font-['Jost']">
              {totalHabit}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Habits Section */}
      <h2 className="text-xl font-bold mt-10 mb-4 font-[Jost]">
        Recent Habits
      </h2>
      <div className="bg-white mr-10">
        <table className="w-full text-center border-collapse mr-0">
          <thead>
            <tr className="bg-[#b0a7f8]">
              <th className="p-3 text-lg font-bold font-[Jost] text-black">
                No.
              </th>
              <th className="p-3 text-lg font-bold font-[Jost] text-black">
                Habit Name
              </th>
              <th className="p-3 text-lg font-bold font-[Jost] text-black">
                Start Date
              </th>
              <th className="p-3 text-lg font-bold font-[Jost] text-black">
                End Date
              </th>
              <th className="p-3 text-lg font-bold font-[Jost] text-black">
                Category
              </th>
              <th className="p-3 text-lg font-bold font-[Jost] text-black">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {currentHabits.map((habit, index) => (
              <tr key={habit.id}>
                <td className="p-3 text-black font-[Jost] font-normal">
                  {index + 1 + indexOfFirstHabit}
                </td>
                <td className="p-3 text-black font-[Jost] font-normal">
                  {habit.name}
                </td>
                <td className="p-3 text-black font-[Jost] font-normal">
                  {formatDate(habit.startDate)}
                </td>
                <td className="p-3 text-black font-[Jost] font-normal">
                  {formatDate(habit.endDate)}
                </td>
                <td className="p-3 text-black font-[Jost] font-normal">
                  {habit.category}
                </td>
                <td className="p-3 text-black font-[Jost] font-normal">
                  {habit.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination */}
        <div className="flex justify-between mt-5">
          <p className="font-[Jost] ml-5">
            Showing {currentHabits.length} of {habits.length} Habits
          </p>
          <div className="flex space-x-4 mr-5 mb-5">
            {page > 1 && (
              <button
                onClick={() => setPage(page - 1)}
                className="px-10 py-2 bg-[#6859ff] rounded-[10px] text-white"
              >
                Previous
              </button>
            )}
            {page < totalPages && (
              <button
                onClick={() => setPage(page + 1)}
                className="px-10 py-2 bg-[#6859ff] rounded-[10px] text-white"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Pie Chart Section */}
      <div className="mt-10">
        {habits && habits.length > 0 ? (
          <Data
            totalHabits={totalHabit}
            upcomingHabits={upcomingHabit}
            failedHabits={failedHabit}
            completedHabits={completedHabit}
            ongoingHabits={ongoingHabit}
          />
        ) : (
          <WithoutData />
        )}
      </div>
    </div>
  );
}
