/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe('pk_test_51JI7iBEUyO9zZ5KuMzy8hkmIT9qvFZ3cUz8kM75Hvp8O0S5VIhph10Kx5edLTwYV3Tf5yyPSyQtao3GXFCbB5tvf00fE31iLRR');

export const bookTour = async tourId => {
  try {
    // 1) Get checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
    // console.log(session);

    // 2) Create checkout form + chanre credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
