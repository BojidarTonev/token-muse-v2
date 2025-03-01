import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET /api/narratives - Get all narratives for the authenticated user
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
    
    // Fetch the narratives from the database
    const { data: narratives, error } = await supabase
      .from('narratives')
      .select(`
        *,
        networks:network_id (
          id,
          name,
          description,
          purpose,
          image_url
        )
      `)
      .eq('owner_key', publicKey);
    
    if (error) {
      console.error('Error fetching narratives:', error);
      return NextResponse.json(
        { error: 'Error fetching narratives' },
        { status: 500 }
      );
    }
    
    // Return the narratives
    return NextResponse.json({ narratives });
  } catch (error) {
    console.error('Error in GET /api/narratives:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/narratives - Create a new narrative
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
    const { title, description, type, master_prompt, additional_context, network_id } = body;
    
    // Validate the request
    if (!title || !type || !master_prompt) {
      return NextResponse.json(
        { error: 'Title, type, and master prompt are required' },
        { status: 400 }
      );
    }
    
    // If a network ID is provided, check if it exists and belongs to the user
    if (network_id) {
      const { data: existingNetwork, error: networkError } = await supabase
        .from('networks')
        .select('*')
        .eq('id', network_id)
        .eq('owner_key', publicKey)
        .single();
      
      if (networkError && networkError.code !== 'PGRST116') {
        console.error('Error fetching network:', networkError);
        return NextResponse.json(
          { error: 'Error fetching network' },
          { status: 500 }
        );
      }
      
      if (!existingNetwork) {
        return NextResponse.json(
          { error: 'Network not found' },
          { status: 404 }
        );
      }
    }
    
    // Create the narrative in the database
    const { data: narrative, error } = await supabase
      .from('narratives')
      .insert([{
        title,
        description,
        type,
        master_prompt,
        additional_context,
        network_id,
        status: 'draft',
        owner_key: publicKey
      }])
      .select()
      .single();
    
    if (error) {
      console.error('Error creating narrative:', error);
      return NextResponse.json(
        { error: 'Error creating narrative' },
        { status: 500 }
      );
    }
    
    // Return the created narrative
    return NextResponse.json({ narrative }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/narratives:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 