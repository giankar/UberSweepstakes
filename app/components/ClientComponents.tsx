'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { PrizeType, Sweepstake, Organizer } from '../lib/fakeDb'
import { FaDollarSign, FaPlane, FaLaptop, FaCar, FaHome, FaGift, FaQuestionCircle } from 'react-icons/fa'
import { formatDate } from '../utils/dateUtils'

export const SweepstakeCard = ({ sweepstake }: { sweepstake: Sweepstake }) => (
  <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300">
    <h3 className="text-lg font-semibold mb-2 text-blue-600">{sweepstake.title}</h3>
    <p className="text-sm text-gray-600 mb-2">{sweepstake.description.substring(0, 100)}...</p>
    <p className="mb-2 text-green-600 font-semibold">Prize: ${sweepstake.prizeValue.toLocaleString()}</p>
    <p className="mb-2 text-purple-600 text-sm">Ends: <ClientSideDateDisplay date={sweepstake.endDate} /></p>
    <Link href={`/sweepstakes/${sweepstake.id}`} className="text-pink-500 hover:text-pink-700 text-sm font-medium">
      View Details →
    </Link>
  </div>
)

export const NewsletterOptIn = () => {
  return (
    <div className="bg-yellow-100 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-2 text-yellow-800">Never Miss a Chance to Win!</h2>
      <p className="mb-4 text-yellow-700">Subscribe to our newsletter and get the latest sweepstakes delivered straight to your inbox. Be the first to know about new opportunities to win big!</p>
      <form className="flex flex-col sm:flex-row gap-2">
        <input 
          type="email" 
          placeholder="Enter your email" 
          className="flex-grow px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
        <button 
          type="submit" 
          className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition duration-300"
        >
          Subscribe
        </button>
      </form>
    </div>
  )
}

export const CategoryFilter = ({ onCategorySelect }: { onCategorySelect: (category: PrizeType | null) => void }) => {
  const categories: PrizeType[] = ['CASH', 'TRAVEL', 'ELECTRONICS', 'VEHICLE', 'HOME', 'GIFT_CARD', 'OTHER'];
  const [selectedCategory, setSelectedCategory] = useState<PrizeType | null>(null);

  const getCategoryIcon = (category: PrizeType) => {
    switch (category) {
      case 'CASH': return <FaDollarSign />;
      case 'TRAVEL': return <FaPlane />;
      case 'ELECTRONICS': return <FaLaptop />;
      case 'VEHICLE': return <FaCar />;
      case 'HOME': return <FaHome />;
      case 'GIFT_CARD': return <FaGift />;
      case 'OTHER': return <FaQuestionCircle />;
    }
  };

  const handleCategoryClick = (category: PrizeType) => {
    const newCategory = category === selectedCategory ? null : category;
    setSelectedCategory(newCategory);
    onCategorySelect(newCategory);
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4 text-center">Filter by Prize Category</h2>
      <div className="flex flex-wrap justify-center gap-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
              selectedCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            {getCategoryIcon(category)}
            <span>{category}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export const LogoCloud = ({ organizers }: { organizers: Organizer[] }) => {
  return (
    <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-8">Top Sweepstakes Organizers</h2>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
          {organizers.map((organizer) => (
            <div key={organizer.id} className="col-span-1 flex justify-center items-center">
              <Image
                src={organizer.logo}
                alt={organizer.name}
                width={100}
                height={100}
                className="max-h-12 object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export const ClientSweepstakesWrapper = ({ 
  initialFeaturedSweepstakes,
  initialLatestSweepstakes,
  initialEndingSoonSweepstakes
}: { 
  initialFeaturedSweepstakes: Sweepstake[],
  initialLatestSweepstakes: Sweepstake[],
  initialEndingSoonSweepstakes: Sweepstake[]
}) => {
  const [selectedCategory, setSelectedCategory] = useState<PrizeType | null>(null);
  const [latestSweepstakes, setLatestSweepstakes] = useState(initialLatestSweepstakes);
  const [endingSoonSweepstakes, setEndingSoonSweepstakes] = useState(initialEndingSoonSweepstakes);

  const handleCategorySelect = (category: PrizeType | null) => {
    setSelectedCategory(category);
    if (category) {
      setLatestSweepstakes(initialLatestSweepstakes.filter(s => s.prizeType === category).slice(0, 5));
      setEndingSoonSweepstakes(initialEndingSoonSweepstakes.filter(s => s.prizeType === category).slice(0, 5));
    } else {
      setLatestSweepstakes(initialLatestSweepstakes);
      setEndingSoonSweepstakes(initialEndingSoonSweepstakes);
    }
  };

  return (
    <>
      <CategoryFilter onCategorySelect={handleCategorySelect} />

      <section className="bg-gradient-to-r from-yellow-100 to-orange-100 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-6 text-center text-orange-600">Featured Sweepstakes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {initialFeaturedSweepstakes.map((sweepstake) => (
            <SweepstakeCard key={sweepstake.id} sweepstake={sweepstake} />
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
        <section className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-6 text-center text-pink-600">
            {selectedCategory ? `${selectedCategory} Sweepstakes` : 'Latest Sweepstakes'}
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {latestSweepstakes.map((sweepstake) => (
              <SweepstakeCard key={sweepstake.id} sweepstake={sweepstake} />
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link href="/sweepstakes?sort=latest" className="text-blue-600 hover:underline">
              View All {selectedCategory ? `${selectedCategory} ` : 'Latest '}Sweepstakes
            </Link>
          </div>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-6 text-center text-orange-600">
            {selectedCategory ? `${selectedCategory} Sweepstakes Ending Soon` : 'Ending Soon'}
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {endingSoonSweepstakes.map((sweepstake) => (
              <SweepstakeCard key={sweepstake.id} sweepstake={sweepstake} />
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link href="/sweepstakes?sort=ending-soon" className="text-blue-600 hover:underline">
              View All {selectedCategory ? `${selectedCategory} ` : ''}Ending Soon Sweepstakes
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export const ClientSideCountdown = ({ endDate }: { endDate: string }) => {
  const [timeLeft, setTimeLeft] = useState('')

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(endDate) - +new Date()
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
        const minutes = Math.floor((difference / 1000 / 60) % 60)
        const seconds = Math.floor((difference / 1000) % 60)
        return `${days}d ${hours}h ${minutes}m ${seconds}s`
      }
      return "Time's up!"
    }

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [endDate])

  return <div>{timeLeft}</div>
}

export const ClientSideDateDisplay = ({ date }: { date: string }) => {
  return <>{formatDate(date)}</>
}