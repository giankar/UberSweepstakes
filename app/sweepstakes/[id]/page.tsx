// app/sweepstakes/[id]/page.tsx

import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ClientSideCountdown, ClientSideDateDisplay } from '../../components/ClientComponents'
import Breadcrumbs from '../../components/Breadcrumbs'
import { FaCheck, FaClock, FaTrophy } from 'react-icons/fa'

// Dummy data for a single sweepstake (now including an isExpired field)
const dummySweepstake = {
  id: '1',
  title: 'Dream Vacation to Bali',
  description: 'Win a luxurious 7-day trip to Bali, including flights, 5-star accommodation, and exciting excursions!',
  prizeType: 'TRAVEL',
  prizeValue: 10000,
  endDate: '2023-06-30T23:59:59Z', // Set this to a past date to test expired state
  url: 'https://example.com/bali-sweepstakes',
  image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&h=630&fit=crop',
  organizer: {
    name: 'TravelDreams Inc.',
  },
  isExpired: true, // Set this to true to test expired state
  winner: 'Jane Doe', // Include winner information for expired sweepstakes
  fullPrizeDetails: [
    'Round-trip airfare for two to Bali, Indonesia',
    '7 nights accommodation at a 5-star resort in Ubud',
    'Daily breakfast and dinner at the resort',
    'Private villa with a pool',
    'Guided tour of Ubud\'s cultural sites',
    'Balinese cooking class experience',
    'Spa treatment for two',
    'Sunrise trek to Mount Batur',
    'Snorkeling trip to Nusa Penida',
    '$1,000 spending money'
  ],
  keyRules: [
    'Must be 18+ and a US resident',
    'One entry per person',
    'Winner selected by random drawing',
    'Prize is non-transferable'
  ],
  similarCompetitions: [
    {
      id: '2',
      title: 'European City Hop Adventure',
      prizeValue: 12000,
      endDate: '2025-03-15T23:59:59Z',
      image: 'https://images.unsplash.com/photo-1491557345352-5929e343eb89?w=500&h=300&fit=crop'
    },
    {
      id: '3',
      title: 'African Safari Experience',
      prizeValue: 15000,
      endDate: '2025-02-28T23:59:59Z',
      image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=500&h=300&fit=crop'
    },
    {
      id: '4',
      title: 'Caribbean Cruise Getaway',
      prizeValue: 8000,
      endDate: '2025-04-30T23:59:59Z',
      image: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=500&h=300&fit=crop'
    }
  ]
}

export default function SweepstakePage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the sweepstake data based on the id
  // For now, we'll just use our dummy data
  const sweepstake = dummySweepstake

  if (!sweepstake) {
    notFound()
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs 
        items={[
          { label: 'Home', href: '/' },
          { label: 'Sweepstakes', href: '/sweepstakes' },
          { label: sweepstake.title, href: `/sweepstakes/${sweepstake.id}` },
        ]} 
      />

      <div className="bg-white shadow-2xl rounded-lg overflow-hidden mb-12">
        <div className="relative h-64 sm:h-80 md:h-96">
          <Image 
            src={sweepstake.image}
            alt={sweepstake.title}
            layout="fill"
            objectFit="cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-white text-center px-4">{sweepstake.title}</h1>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          {sweepstake.isExpired && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
              <p className="font-bold">This sweepstake has expired</p>
              <p>The entry period for this sweepstake has ended. Check out our active sweepstakes for more chances to win!</p>
            </div>
          )}

          <p className="text-xl text-gray-600 mb-8">{sweepstake.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Grand Prize</h2>
              <p className="text-4xl font-bold text-green-600">${sweepstake.prizeValue.toLocaleString()}</p>
              <p className="text-xl text-gray-600">{sweepstake.prizeType}</p>
            </div>
            <div>
              {sweepstake.isExpired ? (
                <div>
                  <h2 className="text-2xl font-semibold mb-2">Winner</h2>
                  <p className="text-3xl font-bold text-purple-600">{sweepstake.winner}</p>
                  <p className="text-xl text-gray-600">Congratulations!</p>
                </div>
              ) : (
                <div>
                  <h2 className="text-2xl font-semibold mb-2">Time Left to Enter</h2>
                  <div className="text-3xl font-bold text-red-600">
                    <ClientSideCountdown endDate={sweepstake.endDate} />
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Ends on: <ClientSideDateDisplay date={sweepstake.endDate} />
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="text-center mb-8">
            {sweepstake.isExpired ? (
              <Link 
                href="/sweepstakes"
                className="bg-blue-500 text-white px-8 py-4 rounded-full text-xl font-bold hover:bg-blue-600 transition duration-300 inline-block shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                View Active Sweepstakes
              </Link>
            ) : (
              <a 
                href={sweepstake.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-green-500 text-white px-8 py-4 rounded-full text-xl font-bold hover:bg-green-600 transition duration-300 inline-block shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Enter Now for FREE!
              </a>
            )}
          </div>

          <p className="text-center text-gray-600 mb-8">
            Organized by {sweepstake.organizer.name}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Full Prize Details</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {sweepstake.fullPrizeDetails.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-4">Key Official Rules</h2>
              <ul className="space-y-2">
                {sweepstake.keyRules.map((rule, index) => (
                  <li key={index} className="flex items-start">
                    <FaCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
              <Link href="#" className="text-blue-600 hover:underline mt-4 inline-block">
                View Full Official Rules
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-center">Similar Active Competitions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sweepstake.similarCompetitions.map((competition) => (
            <Link href={`/sweepstakes/${competition.id}`} key={competition.id} className="block">
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300">
                <Image 
                  src={competition.image}
                  alt={competition.title}
                  width={500}
                  height={300}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{competition.title}</h3>
                  <p className="text-green-600 font-bold">${competition.prizeValue.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">
                    Ends: <ClientSideDateDisplay date={competition.endDate} />
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}