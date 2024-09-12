// app/lib/fakeDb.ts

import { v4 as uuidv4 } from 'uuid';

export type PrizeType = 'CASH' | 'TRAVEL' | 'ELECTRONICS' | 'VEHICLE' | 'HOME' | 'GIFT_CARD' | 'OTHER';

export interface Organizer {
  id: string;
  name: string;
  logo: string; // URL to logo image
}

export interface Sweepstake {
  id: string;
  title: string;
  description: string;
  prizeType: PrizeType;
  prizeValue: number;
  endDate: string;
  url: string;
  createdAt: string;
  featured: boolean;
  organizerId: string;
}

class FakeDb {
  private sweepstakes: Sweepstake[] = [
    {
      id: uuidv4(),
      title: "Win a Trip to Hawaii",
      description: "Enter for a chance to win a luxurious vacation in Hawaii!",
      prizeType: "TRAVEL",
      prizeValue: 5000,
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      url: "https://example.com/hawaii-sweepstakes",
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      featured: true,
      organizerId: '2'
    },
    {
      id: uuidv4(),
      title: "$10,000 Cash Giveaway",
      description: "You could be the lucky winner of $10,000 in cash!",
      prizeType: "CASH",
      prizeValue: 10000,
      endDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
      url: "https://example.com/cash-giveaway",
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      featured: true,
      organizerId: '1'
    },
    {
      id: uuidv4(),
      title: "New Car Sweepstakes",
      description: "Win a brand new electric car and drive in style!",
      prizeType: "VEHICLE",
      prizeValue: 45000,
      endDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
      url: "https://example.com/car-sweepstakes",
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      featured: true,
      organizerId: '4'
    },
    {
      id: uuidv4(),
      title: "Luxury Watch Giveaway",
      description: "Enter to win a premium luxury watch worth $5,000!",
      prizeType: "OTHER",
      prizeValue: 5000,
      endDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
      url: "https://example.com/watch-giveaway",
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      featured: false,
      organizerId: '3'
    },
    {
      id: uuidv4(),
      title: "Home Makeover Contest",
      description: "Win a complete home makeover worth $50,000!",
      prizeType: "HOME",
      prizeValue: 50000,
      endDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(),
      url: "https://example.com/home-makeover",
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      featured: false,
      organizerId: '5'
    },
  ];

  private organizers: Organizer[] = [
    { id: '1', name: 'TechGiant', logo: '/logos/techgiant.png' },
    { id: '2', name: 'TravelDreams', logo: '/logos/traveldreams.png' },
    { id: '3', name: 'LuxuryLifestyle', logo: '/logos/luxurylifestyle.png' },
    { id: '4', name: 'GreenEnergy', logo: '/logos/greenenergy.png' },
    { id: '5', name: 'FashionForward', logo: '/logos/fashionforward.png' },
    { id: '6', name: 'FoodieParadise', logo: '/logos/foodieparadise.png' },
  ];

  constructor() {
    // Add more sweepstakes with random organizers
    for (let i = 0; i < 20; i++) {
      this.sweepstakes.push({
        id: uuidv4(),
        title: `Sweepstake #${i + 1}`,
        description: `This is a description for Sweepstake #${i + 1}. Enter now for a chance to win!`,
        prizeType: ['CASH', 'TRAVEL', 'ELECTRONICS', 'VEHICLE', 'HOME', 'GIFT_CARD', 'OTHER'][Math.floor(Math.random() * 7)] as PrizeType,
        prizeValue: Math.floor(Math.random() * 10000) + 1000,
        endDate: new Date(Date.now() + (Math.floor(Math.random() * 90) + 1) * 24 * 60 * 60 * 1000).toISOString(),
        url: `https://example.com/sweepstake-${i + 1}`,
        createdAt: new Date(Date.now() - (Math.floor(Math.random() * 30) + 1) * 24 * 60 * 60 * 1000).toISOString(),
        featured: false,
        organizerId: this.organizers[Math.floor(Math.random() * this.organizers.length)].id
      });
    }
  }

  getSweepstakes(): Sweepstake[] {
    return this.sweepstakes;
  }

  getFeaturedSweepstakes(limit: number): Sweepstake[] {
    return this.sweepstakes
      .filter(s => s.featured)
      .slice(0, limit);
  }

  getLatestSweepstakes(limit: number): Sweepstake[] {
    return this.sweepstakes
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit);
  }

  getSweepstakesEndingSoon(limit: number): Sweepstake[] {
    const now = new Date();
    return this.sweepstakes
      .filter(s => new Date(s.endDate) > now)
      .sort((a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime())
      .slice(0, limit);
  }

  getSweepstakeById(id: string): Sweepstake | undefined {
    return this.sweepstakes.find(s => s.id === id);
  }

  addSweepstake(sweepstake: Omit<Sweepstake, 'id' | 'createdAt' | 'featured' | 'organizerId'>): Sweepstake {
    const newSweepstake: Sweepstake = {
      id: uuidv4(),
      ...sweepstake,
      createdAt: new Date().toISOString(),
      featured: false,
      organizerId: this.organizers[Math.floor(Math.random() * this.organizers.length)].id
    };
    this.sweepstakes.push(newSweepstake);
    return newSweepstake;
  }

  getStatistics() {
    const now = new Date();
    const activeSweepstakes = this.sweepstakes.filter(s => new Date(s.endDate) > now);
    const totalPrizeValue = activeSweepstakes.reduce((sum, s) => sum + s.prizeValue, 0);

    return {
      activeSweepstakesCount: activeSweepstakes.length,
      totalPrizesCount: activeSweepstakes.length, // Assuming one prize per sweepstake
      totalPrizeValue: totalPrizeValue
    };
  }

  getSweepstakesByCategory(category: PrizeType, limit?: number): Sweepstake[] {
    const filteredSweepstakes = this.sweepstakes.filter(s => s.prizeType === category);
    return limit ? filteredSweepstakes.slice(0, limit) : filteredSweepstakes;
  }

  getAllCategories(): PrizeType[] {
    return ['CASH', 'TRAVEL', 'ELECTRONICS', 'VEHICLE', 'HOME', 'GIFT_CARD', 'OTHER'];
  }

  getTopOrganizers(limit: number = 6): Organizer[] {
    const organizerCounts = this.sweepstakes.reduce((acc, sweepstake) => {
      acc[sweepstake.organizerId] = (acc[sweepstake.organizerId] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const sortedOrganizers = this.organizers
      .sort((a, b) => (organizerCounts[b.id] || 0) - (organizerCounts[a.id] || 0))
      .slice(0, limit);

    return sortedOrganizers;
  }

  getOrganizerById(id: string): Organizer | undefined {
    return this.organizers.find(o => o.id === id);
  }
}

export const fakeDb = new FakeDb();
