import { Metadata } from 'next';
import { PlayerCardsView } from '@/components/cards/PlayerCardsView';

export const metadata: Metadata = {
  title: 'Ultimate Player Cards & Ratings | Coach FC vs Blue Lock FC',
  description: 'Official FIFA-style Ultimate player cards with 0-99 stats for Pace, Shooting, Passing, Dribbling, Defending, and Physical. Access Coach FC & Blue Lock FC portals via access codes.'
};

export default function PlayerCardsPage() {
  return <PlayerCardsView />;
}
