// app/page.tsx

import Image from 'next/image'
import Link from 'next/link'
import { ClientSideCountdown, ClientSideDateDisplay } from './components/ClientComponents'
import { fakeDb } from './lib/fakeDb'
import { FaEnvelope, FaDollarSign, FaPlane, FaLaptop, FaCar, FaHome, FaGift, FaQuestionCircle } from 'react-icons/fa'
import Breadcrumbs from './components/Breadcrumbs'

const topOrganizers = [
  {
    id: 'traveldreams',
    name: 'TravelDreams Inc.',
    logo: 'https://images.unsplash.com/photo-1568997124224-b8294a7e0b22?w=100&h=100&fit=crop&crop=faces',
    activeSweepstakes: 5,
    totalPrizeValue: 100000
  },
  {
    id: 'techzone',
    name: 'TechZone Giveaways',
    logo: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=100&h=100&fit=crop',
    activeSweepstakes: 3,
    totalPrizeValue: 75000
  },
  {
    id: 'luxelife',
    name: 'LuxeLife Experiences',
    logo: 'https://images.unsplash.com/photo-1549395156-e0c1fe6fc7a5?w=100&h=100&fit=crop',
    activeSweepstakes: 4,
    totalPrizeValue: 150000
  },
  {
    id: 'ecoadventures',
    name: 'Eco Adventures',
    logo: 'https://images.unsplash.com/photo-1458966480358-a0ac42de0a7a?w=100&h=100&fit=crop',
    activeSweepstakes: 2,
    totalPrizeValue: 50000
  }
]

const categories = [
  { name: 'Cash', icon: FaDollarSign, color: 'bg-green-500' },
  { name: 'Travel', icon: FaPlane, color: 'bg-blue-500' },
  { name: 'Electronics', icon: FaLaptop, color: 'bg-purple-500' },
  { name: 'Vehicles', icon: FaCar, color: 'bg-red-500' },
  { name: 'Home', icon: FaHome, color: 'bg-yellow-500' },
  { name: 'Gift Cards', icon: FaGift, color: 'bg-pink-500' },
  { name: 'Other', icon: FaQuestionCircle, color: 'bg-gray-500' },
]

const StatisticsComponent = () => {
  const stats = fakeDb.getStatistics()
  return (
    <div className="bg-blue-600 text-white p-6 rounded-lg shadow-lg h-full">
      <h2 className="text-xl font-semibold mb-4">UberSweepstakes by the Numbers</h2>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <p className="text-2xl font-bold">{stats.activeSweepstakesCount}</p>
          <p className="text-sm">Active Sweepstakes</p>
        </div>
        <div>
          <p className="text-2xl font-bold">{stats.totalPrizesCount}</p>
          <p className="text-sm">Total Prizes</p>
        </div>
        <div>
          <p className="text-2xl font-bold">${stats.totalPrizeValue.toLocaleString()}</p>
          <p className="text-sm">Total Prize Value</p>
        </div>
      </div>
    </div>
  )
}

const NewsletterSignup = () => {
  return (
    <div className="bg-yellow-100 p-6 rounded-lg shadow-lg h-full">
      <h2 className="text-xl font-semibold mb-4 text-yellow-800">Stay Updated with UberSweepstakes</h2>
      <p className="text-yellow-700 mb-4">Subscribe to our newsletter and never miss out on exciting new sweepstakes!</p>
      <form className="flex flex-col gap-4">
        <input 
          type="email" 
          placeholder="Enter your email" 
          className="px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          required
        />
        <button 
          type="submit" 
          className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition duration-300 flex items-center justify-center"
        >
          <FaEnvelope className="mr-2" />
          Subscribe
        </button>
      </form>
    </div>
  )
}

export default function Home() {
  const featuredSweepstakes = fakeDb.getFeaturedSweepstakes(3)
  const latestSweepstakes = fakeDb.getLatestSweepstakes(10)
  const endingSoonSweepstakes = fakeDb.getSweepstakesEndingSoon(10)

  return (
    <div className="space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs 
        items={[
          { label: 'Home', href: '/' },
        ]} 
      />

      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-blue-600">Welcome to UberSweepstakes</h1>
        <p className="text-xl text-purple-700">Where Dreams Come True, One Click at a Time!</p>
        <p className="text-lg text-gray-600">Discover amazing prizes and life-changing opportunities.</p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatisticsComponent />
        <NewsletterSignup />
      </div>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-center text-blue-800">Sweepstakes Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {categories.map((category) => (
            <Link href={`/category/${category.name.toLowerCase()}`} key={category.name} className="block">
              <div className={`${category.color} rounded-lg p-4 flex flex-col items-center justify-center h-32 text-white hover:opacity-90 transition duration-300`}>
                <category.icon size={40} className="mb-2" />
                <span className="text-center font-semibold">{category.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-white shadow-xl rounded-lg p-8">
        <h2 className="text-2xl font-semibold mb-6 text-center text-blue-800">Top Sweepstakes Organizers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {topOrganizers.map((organizer) => (
            <Link href={`/organizers/${organizer.id}`} key={organizer.id} className="block">
              <div className="bg-gray-50 rounded-lg p-4 flex flex-col items-center hover:shadow-md transition duration-300">
                <Image 
                  src={organizer.logo}
                  alt={organizer.name}
                  width={80}
                  height={80}
                  className="rounded-full mb-4"
                />
                <h3 className="font-semibold text-lg mb-2 text-center">{organizer.name}</h3>
                <p className="text-sm text-gray-600">Active Sweepstakes: {organizer.activeSweepstakes}</p>
                <p className="text-sm text-gray-600">Total Prize Value: ${organizer.totalPrizeValue.toLocaleString()}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-r from-yellow-100 to-orange-100 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-6 text-center text-orange-600">Featured Sweepstakes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredSweepstakes.map((sweepstake) => (
            <div key={sweepstake.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <h3 className="text-xl font-semibold mb-3 text-blue-700">{sweepstake.title}</h3>
              <p className="text-gray-600 mb-3">{sweepstake.description}</p>
              <p className="text-green-600 font-bold mb-2">Prize: ${sweepstake.prizeValue.toLocaleString()}</p>
              <p className="text-purple-600 mb-4">Ends: <ClientSideDateDisplay date={sweepstake.endDate} /></p>
              <Link href={`/sweepstakes/${sweepstake.id}`} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300">
                Enter Now
              </Link>
            </div>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-6 text-center text-pink-600">Latest Sweepstakes</h2>
          <div className="space-y-4">
            {latestSweepstakes.map((sweepstake) => (
              <div key={sweepstake.id} className="border-b pb-4">
                <h3 className="font-semibold text-lg mb-2">{sweepstake.title}</h3>
                <p className="text-green-600 font-bold">${sweepstake.prizeValue.toLocaleString()}</p>
                <p className="text-sm text-gray-600">
                  Ends: <ClientSideDateDisplay date={sweepstake.endDate} />
                </p>
                <Link href={`/sweepstakes/${sweepstake.id}`} className="text-blue-600 hover:underline">
                  View Details
                </Link>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link href="/sweepstakes?sort=latest" className="text-blue-600 hover:underline">
              View All Latest Sweepstakes
            </Link>
          </div>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-6 text-center text-orange-600">Ending Soon</h2>
          <div className="space-y-4">
            {endingSoonSweepstakes.map((sweepstake) => (
              <div key={sweepstake.id} className="border-b pb-4">
                <h3 className="font-semibold text-lg mb-2">{sweepstake.title}</h3>
                <p className="text-green-600 font-bold">${sweepstake.prizeValue.toLocaleString()}</p>
                <p className="text-sm text-gray-600">
                  Ends: <ClientSideDateDisplay date={sweepstake.endDate} />
                </p>
                <Link href={`/sweepstakes/${sweepstake.id}`} className="text-blue-600 hover:underline">
                  View Details
                </Link>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link href="/sweepstakes?sort=ending-soon" className="text-blue-600 hover:underline">
              View All Ending Soon Sweepstakes
            </Link>
          </div>
        </section>
      </div>

      <section className="text-center bg-purple-100 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-purple-600">Ready to Win Big?</h2>
        <p className="text-lg text-gray-600 mb-6">Don't miss out on these incredible opportunities. Your dream prize could be just a click away!</p>
        <Link href="/sweepstakes/new" className="bg-yellow-400 text-blue-900 px-6 py-3 rounded-full text-lg font-semibold hover:bg-yellow-300 transition duration-300">
          Add Your Own Sweepstake
        </Link>
      </section>
    </div>
  )
}