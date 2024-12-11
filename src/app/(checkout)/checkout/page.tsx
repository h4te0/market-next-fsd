import { getCurrentUser } from '@/entities/user';

import { Checkout } from '@/pages/checkout';

const CheckoutPage = async () => {
  const user = await getCurrentUser();

  return <Checkout user={user} />;
};

export default CheckoutPage;
