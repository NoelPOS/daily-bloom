"use client";

import * as React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import axios from "axios";
import { Card, CardContent } from "@/components/Rewards/Card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function CarouselSize({ rewards, loading, setLoading }) {
  console.log("rewards", rewards);
  const [chunkedRewards, setChunkedRewards] = useState([]);

  useEffect(() => {
    const chunkSize = 4;
    const newChunks = [];
    if (rewards) {
      for (let i = 0; i < rewards.length; i += chunkSize) {
        newChunks.push(rewards.slice(i, i + chunkSize));
      }
    }
    setChunkedRewards(newChunks);
  }, [rewards]);

  const handleRewardClaim = async (rewardId) => {
    setLoading(true);
    try {
      const response = await axios.put(`/api/rewards/claim/${rewardId}`);
      const updatedRewards = rewards.filter(
        (reward) => reward._id !== response.data.challenge._id
      );
      setChunkedRewards(updatedRewards);
      toast.success("Reward claimed successfully");
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Carousel
      opts={{
        align: "start",
        loop: false,
      }}
      className="w-[90%] h-auto mx-auto"
    >
      <CarouselContent>
        {chunkedRewards &&
          chunkedRewards.map((chunk, chunkIndex) => (
            <CarouselItem
              key={chunkIndex}
              className="flex justify-start items-center gap-4"
            >
              {chunk.map((reward, index) => (
                <Card key={index}>
                  <CardContent className="">
                    <div className="flex flex-col justify-center items-center space-y-4 ">
                      <div className="flex flex-col gap-1">
                        <h3 className="font-montserrat font-[600] text-[22px] text-[#000000] text-center tracking-wide opacity-80">
                          {reward.name}
                        </h3>
                        <h3 className="font-montserrat font-[600] text-[18px] text-[#FBE452] text-center tracking-wide">
                          {reward.duration}
                          <span className=" text-[#000000]"> mins</span>
                        </h3>
                      </div>
                      <Image
                        src={reward.challenge_img}
                        alt={reward.name}
                        width={200}
                        height={200}
                        className="rounded-[10px] px-1"
                      />
                      <button
                        onClick={() => handleRewardClaim(reward._id)}
                        className="bg-[#FBE452] font-montserrat font-[600] text-[16px] text-[#000000] rounded-[10px] tracking-wide px-7 py-1 cursor-pointer hover:text-[#FBE452] hover:bg-[#000000] duration-700 transition-all "
                      >
                        Claim
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CarouselItem>
          ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
