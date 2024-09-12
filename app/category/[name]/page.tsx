// app/category/[name]/page.tsx

import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ClientSideDateDisplay } from '../../components/ClientComponents'
import { FaDollarSign, FaPlane, FaLaptop, FaCar, FaHome, FaGift, FaQuestionCircle } from 'react-icons/fa'
import Breadcrumbs from '../../components/Breadcrumbs'

// Dummy data for categories
const categories = {
  cash: { name: 'Cash', icon: FaDollarSign, color: 'bg-green-500' },
  travel: { name: 'Travel', icon: FaPlane, color: 'bg-blue-500' },
  electronics: { name: 'Electronics', icon: FaLaptop, color: 'bg-purple-500' },
  vehicles: { name: 'Vehicles', icon: FaCar, color: 'bg-red-500' },
  home: { name: 'Home', icon: FaHome, color: 'bg-yellow-500' },
  'gift-cards': { name: 'Gift Cards', icon: FaGift, color: 'bg-pink-500' },
  other: { name: 'Other', icon: FaQuestionCircle, color: 'bg-gray-500' },
}

// Dummy data for sweepstakes
const dummySweepstakes = [
  {
    id: '1',
    title: '$10,000 Cash Giveaway',
    description: 'Win $10,000 in cold, hard cash!',
    prizeValue: 10000,
    endDate: '2024-06-30T23:59:59Z',
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=500&h=300&fit=crop'
  },
  {
    id: '2',
    title: 'Dream Vacation to Bali',
    description: 'Win a 7-day all-expenses-paid trip to Bali for two!',
    prizeValue: 8000,
    endDate: '2024-07-15T23:59:59Z',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=500&h=300&fit=crop'
  },
  {
    id: '3',
    title: 'Latest iPhone Giveaway',
    description: 'Win the latest iPhone model!',
    prizeValue: 1000,
    endDate: '2023-05-31T23:59:59Z', // This one is expired
    image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=500&h=300&fit=crop'
  },
  {
    id: '4',
    title: 'Tesla Model 3 Sweepstakes',
    description: 'Drive away in a brand new Tesla Model 3!',
    prizeValue: 50000,
    endDate: '2024-08-31T23:59:59Z',
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=500&h=300&fit=crop'
  },
  {
    id: '5',
    title: 'Home Makeover Giveaway',
    description: 'Win a complete home makeover worth $25,000!',
    prizeValue: 25000,
    endDate: '2023-09-30T23:59:59Z', // This one is expired
    image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=500&h=300&fit=crop'
  },
]

// Add this new dummy active sweepstakes
const dummyActiveSweepstake = {
  id: 'active1',
  title: 'Mega Cash Bonanza',
  description: 'Enter now for a chance to win our biggest cash prize ever! $1,000,000 up for grabs!',
  prizeValue: 1000000,
  endDate: '2024-12-31T23:59:59Z',
  image: 'https://images.unsplash.com/photo-1579621970590-9d624316904b?w=800&h=400&fit=crop'
}

const SweepstakeCard = ({ sweepstake, isExpired = false }: { sweepstake: any, isExpired?: boolean }) => (
  <div className={`bg-white rounded-lg shadow-md overflow-hidden ${isExpired ? 'opacity-75' : ''}`}>
    <Image
      src={sweepstake.image}
      alt={sweepstake.title}
      width={500}
      height={300}
      className="w-full h-48 object-cover"
    />
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-2">{sweepstake.title}</h2>
      <p className="text-gray-600 mb-4">{sweepstake.description}</p>
      <p className="text-green-600 font-bold mb-2">Prize Value: ${sweepstake.prizeValue.toLocaleString()}</p>
      <p className="text-sm text-gray-500 mb-4">
        {isExpired ? 'Ended: ' : 'Ends: '}<ClientSideDateDisplay date={sweepstake.endDate} />
      </p>
      {!isExpired && (
        <Link href={`/sweepstakes/${sweepstake.id}`} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300">
          Enter Now
        </Link>
      )}
      {isExpired && (
        <span className="text-red-600 font-semibold">Expired</span>
      )}
    </div>
  </div>
)

export default function CategoryPage({ params }: { params: { name: string } }) {
  const category = categories[params.name as keyof typeof categories]

  if (!category) {
    notFound()
  }

  const CategoryIcon = category.icon

  // In a real app, you would fetch sweepstakes based on the category
  // For now, we'll just use the dummy data and split it into active and expired
  const now = new Date()
  const activeSweepstakes = [dummyActiveSweepstake, ...dummySweepstakes.filter(s => new Date(s.endDate) > now)]
  const expiredSweepstakes = dummySweepstakes.filter(s => new Date(s.endDate) <= now)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs 
        items={[
          { label: 'Home', href: '/' },
          { label: 'Categories', href: '/categories' },
          { label: category.name, href: `/category/${params.name}` },
        ]} 
      />

      <div className="text-center mb-12">
        <div className={`inline-block ${category.color} rounded-full p-3 mb-4`}>
          <CategoryIcon className="text-white" size={40} />
        </div>
        <h1 className="text-4xl font-bold text-gray-900">{category.name} Sweepstakes</h1>
        <p className="mt-2 text-xl text-gray-600">Discover amazing {category.name.toLowerCase()} prizes and opportunities!</p>
      </div>

      <h2 className="text-2xl font-semibold mb-6">Active Sweepstakes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {activeSweepstakes.map((sweepstake) => (
          <SweepstakeCard key={sweepstake.id} sweepstake={sweepstake} />
        ))}
      </div>

      {expiredSweepstakes.length > 0 && (
        <>
          <h2 className="text-2xl font-semibold mb-6">Expired Sweepstakes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {expiredSweepstakes.map((sweepstake) => (
              <SweepstakeCard key={sweepstake.id} sweepstake={sweepstake} isExpired={true} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}