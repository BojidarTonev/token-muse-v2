import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET /api/networks - Get all networks for the authenticated user
export async function GET(request: NextRequest) {
  try {
    // Get the public key from the request headers
    const publicKey = request.headers.get('x-public-key');
    
    if (!publicKey) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    // Fetch the networks from the database
    const { data: networks, error } = await supabase
      .from('networks')
      .select('*')
      .eq('owner_key', publicKey);
    
    if (error) {
      console.error('Error fetching networks:', error);
      return NextResponse.json(
        { error: 'Error fetching networks' },
        { status: 500 }
      );
    }
    
    // Return the networks
    return NextResponse.json({ networks });
  } catch (error) {
    console.error('Error in GET /api/networks:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/networks - Create a new network
export async function POST(request: NextRequest) {
  try {
    // Get the public key from the request headers
    const publicKey = request.headers.get('x-public-key');
    
    if (!publicKey) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    // Parse the request body
    const body = await request.json();
    const { name, description, purpose, image_url, token_id } = body;
    
    // Validate the request
    if (!name) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }
    
    // Create the network in the database
    const { data: network, error } = await supabase
      .from('networks')
      .insert([{
        name,
        description,
        purpose,
        image_url,
        owner_key: publicKey,
        token_id
      }])
      .select()
      .single();
    
    if (error) {
      console.error('Error creating network:', error);
      return NextResponse.json(
        { error: 'Error creating network' },
        { status: 500 }
      );
    }
    
    // Return the created network
    return NextResponse.json({ network }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/networks:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 