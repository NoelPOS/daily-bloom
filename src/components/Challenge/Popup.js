import { toast } from "sonner";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import Image from "next/image";
import TimeDropdown from "./TimeDropdown ";

export default function Popup({
  open,
  onChange,
  handleSubmit,
  newChallenge,
  setNewChallenge,
}) {
  const [selectedDates, setSelectedDates] = useState(null); // ✅ Always an array
  const [showCalendar, setShowCalendar] = useState(false);

  const handleSwitchChange = (checked) => {
    setNewChallenge((prevChallenge) => ({
      ...prevChallenge,
      notification: checked,
    }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setNewChallenge((prevChallenge) => ({
        ...prevChallenge,
        challenge_img: imageUrl,
      }));
    }
  };

  return (
    <div className="w-[100vw] h-[100vh] absolute top-0 left-[-333px] z-[1000]">
      {/* Popup overlay */}
      <div
        className="w-full h-full bg-[#8F8F8F80] "
        onClick={() => onChange(!open)}
      />

      {/* Popup box */}
      <form
        onSubmit={handleSubmit}
        className="w-[500px] h-auto bg-backgroundPrimary rounded-md absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-8"
      >
        {/* For content */}
        <div className="space-y-7" onClick={() => console.log("working...")}>
          <input
            type="text"
            value={newChallenge.name}
            onChange={(e) =>
              setNewChallenge({
                ...newChallenge,
                name: e.target.value,
              })
            }
            placeholder="Challenge Name"
            className="cursor-pointer font-montserrat font-[500] text-[16px] text-[#868686] border border-mainPrimary outline-none rounded-[10px] p-3 w-full tracking-wide"
            required
          />
          <div className="flex gap-3">
            <TimeDropdown />

            <input
              type="number"
              value={newChallenge.duration}
              onChange={(e) =>
                setNewChallenge({
                  ...newChallenge,
                  duration: e.target.value,
                })
              }
              placeholder="Duration"
              className="cursor-pointer font-montserrat font-[500] text-[16px] text-[#868686] border border-mainPrimary outline-none rounded-[10px] p-3 w-1/2 tracking-wide"
              required
            />
          </div>

          <div>
            <div className="w-full flex justify-between items-center ">
              <div className="relative w-full">
                {/* Button to toggle calendar */}
                <button
                  type="button"
                  onClick={() => setShowCalendar((prev) => !prev)}
                  className="cursor-pointer border border-mainPrimary font-montserrat font-[500] text-[16px] text-[#868686] outline-none rounded-[10px] p-3 w-full tracking-wide flex justify-between items-center"
                >
                  <div className="w-[70%] text-start">
                    {selectedDates
                      ? format(selectedDates, "MM/dd/yyyy")
                      : "On these days"}
                  </div>
                  <CalendarIcon className="ml-2 h-6 w-6 text-mainPrimary" />
                </button>

                {/* Calendar (conditionally rendered) */}
                {showCalendar && (
                  <div className="absolute mt-2 right-0 font-montserrat font-[500] text-[16px] text-[#868686] bg-backgroundPrimary shadow-inner rounded-[10px] p-2 border z-50">
                    <Calendar
                      mode="single"
                      selected={selectedDates}
                      onSelect={setSelectedDates}
                      required
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <h3 className="font-montserrat font-[500] text-[16px] text-[#868686] tracking-wide">
              Switch the notification
            </h3>
            <Switch
              checked={newChallenge.notification}
              onCheckedChange={handleSwitchChange}
              style={{
                backgroundColor: newChallenge.notification
                  ? "#6859FF"
                  : "#868686",
              }}
            />
          </div>

          {/* Image Upload Section */}
          <div
            className="border border-mainPrimary outline-none rounded-[10px] w-full h-auto p-5 flex flex-col justify-center items-center gap-3 cursor-pointer"
            onClick={() => document.getElementById("imageUpload").click()} // Trigger file input on div click
          >
            {newChallenge.challenge_img ? (
              <Image
                src={newChallenge.challenge_img}
                alt="Uploaded Image"
                width={30}
                height={30}
                className="rounded-[10px]"
              />
            ) : (
              <Image
                src="/assets/challenge_images/Upload.svg"
                alt="Image"
                width={30}
                height={30}
              />
            )}
            <h3 className="font-montserrat font-[500] text-[15px] text-[#868686] tracking-wide">
              Tap to select or upload image
            </h3>
            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>

          <div className="flex justify-center items-center gap-5">
            <button
              className="font-montserrat font-[600] text-[18px] text-[#000000] opacity-80 tracking-wide bg-[#E1E1E1] rounded-[10px] w-32 h-12"
              onClick={() => onChange(!open)}
              type="reset"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="font-montserrat font-[600] text-[18px] text-backgroundPrimary opacity-80 tracking-wide bg-mainPrimary rounded-[10px] w-32 h-12"
              onClick={() =>
                toast("Claimed Successfully! 🎉", {
                  duration: 1000,
                  style: {
                    backgroundColor: "#8778FB",
                    color: "#FFFFFF",
                    letterSpacing: "0.025rem",
                    borderRadius: "10px",
                    outline: "none",
                    border: "none",
                    padding: " 18px",
                    fontSize: "16px",
                    fontFamily: "Montserrat, sans-serif",
                  },
                })
              }
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
