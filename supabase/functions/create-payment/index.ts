import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image_url?: string;
}

interface CreatePaymentRequest {
  items: CartItem[];
  buyerInfo: {
    name: string;
    email: string;
    address: string;
  };
  success_url: string;
  failure_url: string;
  pending_url: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    );

    const { items, buyerInfo, success_url, failure_url, pending_url }: CreatePaymentRequest = await req.json();

    if (!buyerInfo || !buyerInfo.name || !buyerInfo.email || !buyerInfo.address) {
      return new Response(
        JSON.stringify({ error: 'Datos del comprador incompletos' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!items || items.length === 0) {
      return new Response(
        JSON.stringify({ error: 'No hay productos en el carrito' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const { data: order, error: orderError } = await supabaseClient
      .from('orders')
      .insert({
        buyer_name: buyerInfo.name,
        buyer_email: buyerInfo.email,
        buyer_address: buyerInfo.address,
        total,
        status: 'pending',
      })
      .select()
      .single();

    if (orderError) {
      console.error('Error creando orden:', orderError);
      return new Response(
        JSON.stringify({ error: 'Error creando orden' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const orderItems = items.map(item => ({
      order_id: order.id,
      product_id: item.id,
      quantity: item.quantity,
      unit_price: item.price,
    }));

    const { error: itemsError } = await supabaseClient
      .from('order_items')
      .insert(orderItems);

    if (itemsError) {
      console.error('Error creando items:', itemsError);
      return new Response(
        JSON.stringify({ error: 'Error creando items de orden' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const mpAccessToken = Deno.env.get('MERCADOPAGO_ACCESS_TOKEN') || "TEST-7625645848623702-071623-f3e310e35f6c0d489d73cd11499fdfa0-127516229";
    if (!mpAccessToken) {
      return new Response(
        JSON.stringify({ error: 'Token de Mercado Pago no configurado' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const preference = {
      items: items.map(item => ({
        id: item.id,
        title: item.name,
        quantity: item.quantity,
        unit_price: item.price,
        currency_id: 'ARS',
        picture_url: item.image_url,
      })),
      external_reference: order.id,
      back_urls: {
        success: success_url,
        failure: failure_url,
        pending: pending_url,
      },
      auto_return: 'approved',
      notification_url: `${Deno.env.get('SUPABASE_URL')}/functions/v1/payment-webhook`,
    };

    console.log("Preference enviada a Mercado Pago:", JSON.stringify(preference, null, 2));

    const mpResponse = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${mpAccessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(preference),
    });

    if (!mpResponse.ok) {
      const error = await mpResponse.text();
      console.error('Error en Mercado Pago:', error);
      return new Response(
        JSON.stringify({ error: 'Error creando preferencia de pago', mpError: error, preference }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const mpData = await mpResponse.json();

    return new Response(
      JSON.stringify({
        order_id: order.id,
        init_point: mpData.init_point,
        sandbox_init_point: mpData.sandbox_init_point || mpData.init_point, // <-- Agregar esto
        preference_id: mpData.id,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error general:', error);
    return new Response(
      JSON.stringify({ error: 'Error interno del servidor' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
