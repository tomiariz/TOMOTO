import { supabase } from '../supabaseClient';

export async function createPayment(items, buyerInfo) {
  const response = await fetch('https://dzyzfgxulplzsdpdivju.supabase.co/functions/v1/create-payment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify({
      items,
      buyerInfo,
      success_url: "https://tomoto1.netlify.app/success",
      failure_url: "https://tomoto1.netlify.app/failure",
      pending_url: "https://tomoto1.netlify.app/pending"
    }),
  });
  return response.json();
}