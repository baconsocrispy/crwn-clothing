import { loadStripe } from '@stripe/stripe-js';

// publishable key located in .env file
export const stripePromise = loadStripe(
  process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
);

