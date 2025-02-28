"use client";

import Popup from "@/components/Challenge/Popup";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { set } from "mongoose";

const ChallengesIdeas = [
  {
    id: 1,
    name: "Yoga",
    duration: "20 mins",
    image: "/assets/challenge_images/Yoga.svg",
  },
  {
    id: 2,
    name: "Read Books",
    duration: "40 mins",
    image: "/assets/challenge_images/Reading-books.svg",
  },
  {
    id: 3,
    name: "Meditate ",
    duration: "20 mins",
    image: "/assets/challenge_images/Meditate.svg",
  },
  {
    id: 4,
    name: "Brainstorm ideas",
    duration: "15 mins",
    image: "/assets/challenge_images/Brainstorm-ideas.svg",
  },
  {
    id: 5,
    name: "Workout",
    duration: "30 mins",
    image: "/assets/challenge_images/Workout.svg",
  },
  {
    id: 6,
    name: "Cycling",
    duration: "45 mins",
    image: "/assets/challenge_images/Cycling.svg",
  },
  {
    id: 7,
    name: "Make To-do List",
    duration: "10 mins",
    image: "/assets/challenge_images/MakeTo-doList.svg",
  },
  {
    id: 8,
    name: "Devotional",
    duration: "50 mins",
    image: "/assets/challenge_images/Devotional.svg",
  },
  {
    id: 9,
    name: "Tidy Up",
    duration: "20 mins",
    image: "/assets/challenge_images/TidyUp.svg",
  },
];

export default function Challenge() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status } = useSession();
  const [challenges, setChallenges] = useState([]);
  const [newChallenge, setNewChallenge] = useState({
    name: "",
    duration: "",
    time_of_day: "",
    days: null,
    challenge_img: "",
    notification: false,
    user: session?.user?.id || "",
  });
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      if (session?.user?.id) {
        const url = "http://localhost:3000/api/challenges/" + session.user.id;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("data", data);
        setChallenges(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [session]);

  // Create a new challenge
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      try {
        const url = "http://localhost:3000/api/challenges/create";
        const body = {
          name: newChallenge.name,
          duration: Number(newChallenge.duration),
          time_of_day: "Morning",
          date_to_do: new Date(newChallenge.days),
          user: session?.user?.id || "",
          challenge_img: newChallenge.challenge_img,
        };

        console.log(body, "body in challenge");

        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });

        if (response.ok) {
          await fetchData();
          setIsOpen(false);
        }
      } catch (error) {
        console.error("Error creating challenge:", error);
      }
    },
    [newChallenge, fetchData, session]
  );

  // Fetching data
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Delete a challenge
  const deleteChallenge = useCallback(
    async (_id) => {
      if (!_id) {
        console.log("Challenge ID is missing!");
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:3000/api/challenges/delete/${_id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        await fetchData();
      } catch (error) {
        console.log("Error deleting challenge:", error);
      } finally {
        setLoading(false);
      }
    },
    [fetchData]
  );

  function CustomLoader() {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#7C5CFC]"></div>
      </div>
    );
  }

  if (status === "loading" || loading) {
    return <CustomLoader />;
  }
  return (
    <div className="flex flex-col justify-start gap-[50px]">
      <div className="flex flex-col gap-[30px]">
        {/* Title */}
        <h1 className="font-montserrat font-[600] text-[24px] opacity-80 text-[#000000] leading-[32.91px]">
          Create your own habit that you want to challenge.
        </h1>

        {/* Data */}
        {challenges.length > 0 ? (
          <div className="flex justify-start items-center flex-wrap gap-5">
            {challenges.map((challenge, index) => (
              <Link
                href={{
                  pathname: `/dashboard/challenge/${challenge.id}`,
                  query: { duration: challenge.duration, text: challenge.name },
                }}
                key={index}
                className="w-1/4 h-[240px] flex flex-col justify-center items-center bg-mainLight hover:bg-mainPrimary bg-opacity-50 hover:bg-opacity-60 transition-all ease-in-out duration-1000 cursor-pointer rounded-[10px] border border-mainSecondary p-3"
              >
                <div className="flex justify-between items-center gap-5 w-full h-[45px]">
                  <h3 className="text-[#000000] opacity-80 text-[15px] font-montserrat font-[600] tracking-wide capitalize">
                    {challenge.name}
                  </h3>
                  <button
                    className="bg-backgroundPrimary bg-opacity-80 rounded-full p-3 w-[40px] h-[40px] flex justify-center items-center"
                    onClick={() => deleteChallenge(challenge._id)}
                  >
                    <Image
                      src={"/assets/challenge_images/Delete.svg"}
                      alt="Image"
                      width={17}
                      height={17}
                    />
                  </button>
                </div>
                <Image
                  src={challenge.challenge_img}
                  alt={challenge.name}
                  width={80}
                  height={80}
                  className=" w-[90px] h-[90px] mt-2 mb-2 object-cover rounded-[10px]"
                />
                <div className="flex justify-between items-center gap-5 w-full h-[40px]">
                  <div className="flex justify-start items-center gap-2">
                    <Image
                      src={"/assets/challenge_images/Clock.svg"}
                      alt="Image"
                      width={15}
                      height={15}
                    />
                    <h3 className="text-[#636363] text-[14px] font-montserrat font-[600] tracking-wide">
                      {challenge.duration} mins
                    </h3>
                  </div>
                  <h3 className="text-[#000000] opacity-80 text-[14px] font-montserrat font-[600] tracking-wide">
                    20 points
                  </h3>
                </div>
              </Link>
            ))}
            <div
              className="bg-mainLight hover:bg-mainPrimary bg-opacity-50 hover:bg-opacity-60 transition-all ease-in-out duration-1000 p-3 rounded-full cursor-pointer"
              onClick={() => {
                setIsOpen(true);
              }}
            >
              <Image
                src={"/assets/challenge_images/Plus.svg"}
                alt="Plus"
                width={20}
                height={20}
                className="opacity-80 object-contain"
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-[30px]">
            {/* No Data */}

            <div className="flex justify-start items-center gap-9">
              {/* Left */}
              <div className="w-1/4 h-[230px] flex flex-col justify-center items-center bg-[#D8D8D8] rounded-[10px] p-2 gap-4">
                <Image
                  src={"/assets/challenge_images/ChallengeDefault.svg"}
                  alt="Image"
                  width={110}
                  height={110}
                />
                <div className="flex flex-col justify-center items-center gap-1">
                  <h3 className="text-[#333333] opacity-95 text-[16px] font-montserrat font-[600] tracking-wide text-center">
                    Start to create good habit.
                  </h3>
                  <h3 className="text-[#878787] text-[14px] font-montserrat font-[600] tracking-wide text-center">
                    Set challenges that matter to you <br /> and stay on course
                    towards.
                  </h3>
                </div>
              </div>

              {/* Right */}
              <div
                className="bg-[#D8D8D8] p-3 rounded-full cursor-pointer"
                onClick={() => {
                  setIsOpen(true);
                }}
              >
                <Image
                  src={"/assets/challenge_images/Plus.svg"}
                  alt="Plus"
                  width={20}
                  height={20}
                  className="opacity-80 object-contain"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Show Popup when isOpen is true */}
      {isOpen && (
        <Popup
          open={isOpen}
          onChange={() => setIsOpen(false)}
          handleSubmit={handleSubmit}
          newChallenge={newChallenge}
          setNewChallenge={setNewChallenge}
        />
      )}

      {/* Second Section */}
      <div className="flex flex-col justify-start gap-[50px]">
        {/* Title */}
        <h1 className="font-montserrat font-[600] text-[24px] opacity-80 text-[#000000] leading-[32.91px]">
          Challenges Ideas For you
        </h1>

        <div className="w-[90%] grid grid-cols-3 gap-5">
          {ChallengesIdeas.map((data, index) => (
            <Link
              href={{
                pathname: `/dashboard/challenge/${data.id}`,
                query: { duration: data.duration, text: data.name },
              }}
              key={index}
              className="w-[300px] h-[220px] object-cover rounded-[10px] flex flex-col justify-between p-4 cursor-pointer transition-transform duration-700 ease-in-out hover:scale-105"
              style={{
                backgroundImage: `url(${data.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div>
                <h1 className="font-montserrat font-[500] text-[18px] tracking-wide text-backgroundPrimary leading-[32.91px]">
                  {data.name}
                </h1>
                <div className="flex justify-start items-center gap-2">
                  <Image
                    src={"/assets/challenge_images/White-clock.svg"}
                    alt="Image"
                    width={15}
                    height={15}
                  />
                  <h3 className="text-backgroundPrimary text-[14px] font-montserrat font-[400] tracking-wide">
                    {data.duration}
                  </h3>
                </div>
              </div>

              <div className="flex justify-end items-end">
                <span className="text-backgroundPrimary bg-backgroundSecondary bg-opacity-50 px-3 py-2 rounded-[10px] text-[14px] font-montserrat font-[500] tracking-wide ">
                  Reward - 20 points
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
