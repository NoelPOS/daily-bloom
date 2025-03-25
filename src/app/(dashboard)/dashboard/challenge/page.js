'use client'

import Popup from '@/components/Challenge/Popup'
import Image from 'next/image'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

const ChallengesIdeas = [
  {
    id: 1,
    name: 'Yoga',
    duration: '20 mins',
    image: '/assets/challenge_images/Yoga.svg',
  },
  {
    id: 2,
    name: 'Read Books',
    duration: '40 mins',
    image: '/assets/challenge_images/Reading-books.svg',
  },
  {
    id: 3,
    name: 'Meditate',
    duration: '20 mins',
    image: '/assets/challenge_images/Meditate.svg',
  },
  {
    id: 4,
    name: 'Brainstorm ideas',
    duration: '15 mins',
    image: '/assets/challenge_images/Brainstorm-ideas.svg',
  },
  {
    id: 5,
    name: 'Workout',
    duration: '30 mins',
    image: '/assets/challenge_images/Workout.svg',
  },
  {
    id: 6,
    name: 'Cycling',
    duration: '45 mins',
    image: '/assets/challenge_images/Cycling.svg',
  },
  {
    id: 7,
    name: 'Make To-do List',
    duration: '10 mins',
    image: '/assets/challenge_images/MakeTo-doList.svg',
  },
  {
    id: 8,
    name: 'Devotional',
    duration: '50 mins',
    image: '/assets/challenge_images/Devotional.svg',
  },
  {
    id: 9,
    name: 'Tidy Up',
    duration: '20 mins',
    image: '/assets/challenge_images/TidyUp.svg',
  },
]

export default function Challenge() {
  const { data: session, status } = useSession()
  const userId = session?.user?.id || ''

  const [isOpen, setIsOpen] = useState(false)
  const [challenges, setChallenges] = useState([])
  const [newChallenge, setNewChallenge] = useState({
    name: '',
    duration: '',
    time: '',
    time_period: '',
    date_to_do: '',
    challenge_img: '',
    notification: false,
    user: userId,
  })
  const [loading, setLoading] = useState(false)

  // Memoize static challenges ideas array
  const memoizedChallengeIdeas = useMemo(() => ChallengesIdeas, [])

  // Fetch challenges data
  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      if (userId) {
        const url = `/api/challenges/${userId}`
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }
        const data = await response.json()
        setChallenges(data)
      }
    } catch (error) {
      console.error('Error fetching challenges:', error)
    } finally {
      setLoading(false)
    }
  }, [userId])

  // Create a new challenge
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault()
      try {
        const url = '/api/challenges/create'
        const body = {
          name: newChallenge.name,
          duration: Number(newChallenge.duration),
          time: newChallenge.time,
          time_period: newChallenge.time_period,
          notification: newChallenge.notification,
          date_to_do: newChallenge.date_to_do,
          user: userId,
          challenge_img: newChallenge.challenge_img,
        }

        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        })

        if (response.ok) {
          await fetchData()
          setIsOpen(false)
        }
      } catch (error) {
        console.error('Error creating challenge:', error)
      }
    },
    [newChallenge, fetchData, userId]
  )

  // Delete a challenge
  const deleteChallenge = useCallback(
    async (_id) => {
      if (!_id) {
        console.warn('Challenge ID is missing!')
        return
      }
      try {
        setLoading(true)
        const response = await fetch(`/api/challenges/delete/${_id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }
        await fetchData()
      } catch (error) {
        console.error('Error deleting challenge:', error)
      } finally {
        setLoading(false)
      }
    },
    [fetchData]
  )

  useEffect(() => {
    fetchData()
  }, [fetchData])

  function CustomLoader() {
    return (
      <div className='flex justify-center items-center h-full'>
        <div className='animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#7C5CFC]'></div>
      </div>
    )
  }

  if (status === 'loading' || loading) {
    return <CustomLoader />
  }

  return (
    <div className='flex flex-col justify-start gap-12'>
      <div className='flex flex-col gap-8'>
        {/* Title */}
        <h1 className='font-montserrat font-semibold text-2xl opacity-80 text-black leading-[33px]'>
          Create your own habit that you want to challenge.
        </h1>

        {/* Challenges List */}
        {challenges.length > 0 ? (
          <div className='flex flex-wrap gap-5 items-center justify-start'>
            {challenges.map((challenge) => (
              <Link
                href={{
                  pathname: `/dashboard/challenge/${challenge._id}`,
                  query: { duration: challenge.duration, text: challenge.name },
                }}
                key={challenge._id}
                className='w-1/4 h-[240px] flex flex-col justify-center items-center bg-mainLight hover:bg-mainPrimary bg-opacity-50 hover:bg-opacity-60 transition-all duration-1000 cursor-pointer rounded-lg border border-mainSecondary p-3'
              >
                <div className='flex justify-between items-center gap-5 w-full h-11'>
                  <h3 className='text-black opacity-80 text-sm font-montserrat font-semibold tracking-wide capitalize'>
                    {challenge.name}
                  </h3>
                  <button
                    className='bg-backgroundPrimary bg-opacity-80 rounded-full p-3 w-10 h-10 flex justify-center items-center'
                    onClick={(e) => {
                      e.preventDefault()
                      deleteChallenge(challenge._id)
                    }}
                  >
                    <Image
                      src='/assets/challenge_images/Delete.svg'
                      alt='Delete Challenge'
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
                  className='mt-2 mb-2 w-[90px] h-[90px] object-cover rounded-lg'
                />
                <div className='flex justify-between items-center gap-5 w-full h-10'>
                  <div className='flex items-center gap-2'>
                    <Image
                      src='/assets/challenge_images/Clock.svg'
                      alt='Duration'
                      width={15}
                      height={15}
                    />
                    <h3 className='text-[#636363] text-sm font-montserrat font-semibold tracking-wide'>
                      {challenge.duration} mins
                    </h3>
                  </div>
                  <h3 className='text-black opacity-80 text-sm font-montserrat font-semibold tracking-wide'>
                    20 points
                  </h3>
                </div>
              </Link>
            ))}
            <div
              className='bg-mainLight hover:bg-mainPrimary bg-opacity-50 hover:bg-opacity-60 transition-all duration-1000 p-3 rounded-full cursor-pointer'
              onClick={() => setIsOpen(true)}
            >
              <Image
                src='/assets/challenge_images/Plus.svg'
                alt='Add Challenge'
                width={20}
                height={20}
                className='opacity-80 object-contain'
              />
            </div>
          </div>
        ) : (
          <div className='flex flex-col gap-8'>
            {/* No Data */}
            <div className='flex items-center gap-9'>
              {/* Left - Placeholder Card */}
              <div className='w-1/4 h-[230px] flex flex-col justify-center items-center bg-gray-300 rounded-lg p-2 gap-4'>
                <Image
                  src='/assets/challenge_images/ChallengeDefault.svg'
                  alt='No Challenge'
                  width={110}
                  height={110}
                />
                <div className='flex flex-col items-center gap-1'>
                  <h3 className='text-[#333333] text-base font-montserrat font-semibold text-center'>
                    Start to create good habit.
                  </h3>
                  <h3 className='text-[#878787] text-sm font-montserrat font-semibold text-center'>
                    Set challenges that matter to you and stay on course.
                  </h3>
                </div>
              </div>
              {/* Right - Add Button */}
              <div
                className='bg-gray-300 p-3 rounded-full cursor-pointer'
                onClick={() => setIsOpen(true)}
              >
                <Image
                  src='/assets/challenge_images/Plus.svg'
                  alt='Add Challenge'
                  width={20}
                  height={20}
                  className='opacity-80 object-contain'
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Popup for Creating a Challenge */}
      {isOpen && (
        <Popup
          open={isOpen}
          onChange={() => setIsOpen(false)}
          handleSubmit={handleSubmit}
          newChallenge={newChallenge}
          setNewChallenge={setNewChallenge}
        />
      )}

      {/* Second Section: Challenges Ideas */}
      <div className='flex flex-col gap-12'>
        <h1 className='font-montserrat font-semibold text-2xl opacity-80 text-black leading-[33px]'>
          Challenges Ideas For you
        </h1>
        <div className='w-[90%] grid grid-cols-3 gap-5'>
          {memoizedChallengeIdeas.map((data) => (
            <Link
              href={{
                pathname: `/dashboard/challenge/${data.id}`,
                query: { duration: data.duration, text: data.name },
              }}
              key={data.id}
              className='w-[300px] h-[220px] flex flex-col justify-between p-4 cursor-pointer rounded-lg transition-transform duration-700 ease-in-out hover:scale-105'
              style={{
                backgroundImage: `url(${data.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div>
                <h1 className='font-montserrat font-medium text-lg tracking-wide text-backgroundPrimary leading-[33px]'>
                  {data.name}
                </h1>
                <div className='flex items-center gap-2'>
                  <Image
                    src='/assets/challenge_images/White-clock.svg'
                    alt='Clock Icon'
                    width={15}
                    height={15}
                  />
                  <h3 className='text-backgroundPrimary text-sm font-montserrat font-normal tracking-wide'>
                    {data.duration}
                  </h3>
                </div>
              </div>
              <div className='flex justify-end'>
                <span className='text-backgroundPrimary bg-backgroundSecondary bg-opacity-50 px-3 py-2 rounded-lg text-sm font-montserrat font-medium tracking-wide'>
                  Reward - 20 points
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
