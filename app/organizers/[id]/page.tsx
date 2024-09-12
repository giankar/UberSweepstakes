// app/organizers/[id]/page.tsx

import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ClientSideDateDisplay } from '../../components/ClientComponents'
import { FaCheckCircle, FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa'

// Dummy data for the organizer (in a real app, this would come from your database)
const dummyOrganizer = {
  id: 'traveldreams',
  name: 'TravelDreams Inc.',
  logo: 'https://images.unsplash.com/photo-1568997120160-76efcc84e135?w=200&h=100&fit=crop&crop=entropy',
  description: `TravelDreams Inc. is a leading travel company specializing in creating unforgettable experiences for adventure seekers and luxury travelers alike. With over 20 years of experience in the industry, we've been helping people turn their dream vacations into reality.`,
  verified: true,
  socialLinks: {
    facebook: 'https://facebook.com/traveldreams',
    twitter: 'https://twitter.com/traveldreams',
    instagram: 'https://instagram.com/traveldreams',
  },
  activeCompetitions: [
    {
      id: '1',
      title: 'Win a Dream Vacation to Bali',
      prizeValue: 10000,
      endDate: '2024-03-01T00:00:00Z',
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=300&h=200&fit=crop'
    },
    {
      id: '2',
      title: 'Luxury Safari in Kenya',
      prizeValue: 12000,
      endDate: '2024-04-15T00:00:00Z',
      image: 'https://images.unsplash.com/photo-1532083968517-c58a64d2c511?w=300&h=200&fit=crop'
    },
  ],
  pastCompetitions: [
    {
      id: '3',
      title: 'Paris Getaway for Two',
      prizeValue: 8000,
      endDate: '2023-06-30T00:00:00Z',
      image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=300&h=200&fit=crop'
    },
    {
      id: '4',
      title: 'Caribbean Cruise Adventure',
      prizeValue: 6000,
      endDate: '2023-05-15T00:00:00Z',
      image: 'https://images.unsplash.com/photo-1559103839-6b2127da8e4f?w=300&h=200&fit=crop'
    },
  ],
  statistics: {
    totalSweepstakes: 50,
    totalPrizes: 52,
    totalPrizeValue: 500000,
  },
  reviews: [
    { id: 1, user: 'John D.', rating: 5, comment: 'Amazing prizes and smooth process!' },
    { id: 2, user: 'Sarah M.', rating: 4, comment: 'Great competitions, would love to see more variety.' },
  ]
}

export default function OrganizerProfilePage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the organizer data based on the id
  const organizer = dummyOrganizer

  if (!organizer) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link href="/" className="text-blue-600 hover:underline mb-8 inline-block">&larr; Back to all sweepstakes</Link>

      <div className="bg-white shadow-2xl rounded-lg overflow-hidden mb-12">
        <div className="p-8">
          <div className="flex items-center justify-center mb-6">
            <Image 
              src={organizer.logo}
              alt={organizer.name}
              width={200}
              height={100}
              className="object-contain"
            />
          </div>
          <div className="flex items-center justify-center mb-4">
            <h1 className="text-4xl font-bold text-center text-blue-800">{organizer.name}</h1>
            {organizer.verified && (
              <FaCheckCircle className="text-blue-500 ml-2" title="Verified Organizer" />
            )}
          </div>
          <p className="text-xl text-gray-600 mb-8 text-center">{organizer.description}</p>

          <div className="flex justify-center space-x-4 mb-8">
            <a href={organizer.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
              <FaFacebookF size={24} />
            </a>
            <a href={organizer.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600">
              <FaTwitter size={24} />
            </a>
            <a href={organizer.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-800">
              <FaInstagram size={24} />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-center">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Total Sweepstakes</h2>
              <p className="text-4xl font-bold text-blue-600">{organizer.statistics.totalSweepstakes}</p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-2">Total Prizes</h2>
              <p className="text-4xl font-bold text-green-600">{organizer.statistics.totalPrizes}</p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-2">Total Prize Value</h2>
              <p className="text-4xl font-bold text-purple-600">${organizer.statistics.totalPrizeValue.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-center">Active Competitions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {organizer.activeCompetitions.map((competition) => (
            <Link href={`/sweepstakes/${competition.id}`} key={competition.id} className="block">
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300">
                <Image 
                  src={competition.image}
                  alt={competition.title}
                  width={300}
                  height={200}
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

      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-center">Past Competitions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {organizer.pastCompetitions.map((competition) => (
            <div key={competition.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <Image 
                src={competition.image}
                alt={competition.title}
                width={300}
                height={200}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{competition.title}</h3>
                <p className="text-green-600 font-bold">${competition.prizeValue.toLocaleString()}</p>
                <p className="text-sm text-gray-600">
                  Ended: <ClientSideDateDisplay date={competition.endDate} />
                </p>
              </div>
            </div>
          ))}
        </div>
        {organizer.pastCompetitions.length > 4 && (
          <div className="text-center mt-6">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
              Load More Past Competitions
            </button>
          </div>
        )}
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-center">User Reviews</h2>
        <div className="space-y-4">
          {organizer.reviews.map((review) => (
            <div key={review.id} className="bg-white rounded-lg shadow-md p-4">
              <div className="flex justify-between items-center mb-2">
                <p className="font-semibold">{review.user}</p>
                <p className="text-yellow-500">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</p>
              </div>
              <p className="text-gray-600">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}