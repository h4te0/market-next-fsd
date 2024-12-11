import { HomePage } from '@/pages/home';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Главная',
  description: 'Next.js Market pet-project.',
};

const Home = async () => {
  return <HomePage />;
};

export default Home;
