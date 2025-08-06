import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { buffer } from 'micro';
import { supabase } from '../../utils/supabase/client';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16', // Use the latest API version available in your Stripe dashboard
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const buf = await buffer(req);
    const sig = req.headers['stripe-signature']!;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(buf.toString(), sig, process.env.STRIPE_WEBHOOK_SECRET!);
    } catch (err: any) {
      console.error(`Webhook Error: ${err.message}`);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        const subscription = event.data.object as Stripe.Subscription;
        // Handle subscription creation/update in your database
        console.log('Subscription created/updated:', subscription.id);
        // Example: Update user's plan in Supabase
        await supabase
          .from('profiles') // Assuming you have a 'profiles' table linked to auth.users
          .update({ stripe_customer_id: subscription.customer as string, stripe_subscription_id: subscription.id, plan: subscription.items.data[0].price.id })
          .eq('id', subscription.metadata?.userId); // Assuming you pass userId in metadata
        break;
      case 'customer.subscription.deleted':
        const deletedSubscription = event.data.object as Stripe.Subscription;
        // Handle subscription deletion
        console.log('Subscription deleted:', deletedSubscription.id);
        // Example: Downgrade user's plan in Supabase
        await supabase
          .from('profiles')
          .update({ stripe_subscription_id: null, plan: 'free' })
          .eq('id', deletedSubscription.metadata?.userId);
        break;
      case 'checkout.session.completed':
        const checkoutSession = event.data.object as Stripe.Checkout.Session;
        // Handle successful checkout session
        console.log('Checkout session completed:', checkoutSession.id);
        // You might want to fulfill the order or update user's status here
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
};

export default handler;