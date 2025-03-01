import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET /api/agents - Get all agents for the authenticated user
export async function GET(request: NextRequest) {
  try {
    // Get the public key from the request headers
    const publicKey = request.headers.get('x-public-key');
    
    // If no public key is provided, return an empty array instead of an error
    if (!publicKey) {
      return NextResponse.json({ agents: [] });
    }
    
    // Fetch the agents from the database
    const { data: agents, error } = await supabase
      .from('agents')
      .select('*')
      .eq('owner_key', publicKey);
    
    if (error) {
      console.error('Error fetching agents:', error);
      return NextResponse.json(
        { error: 'Error fetching agents' },
        { status: 500 }
      );
    }
    
    // Return the agents
    return NextResponse.json({ agents });
  } catch (error) {
    console.error('Error in GET /api/agents:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/agents - Create a new agent
export async function POST(request: NextRequest) {
  try {
    // Get the public key from the request headers
    const publicKey = request.headers.get('x-public-key');
    
    // If no public key is provided, return a user-friendly error message
    if (!publicKey) {
      return NextResponse.json(
        { error: 'Please connect your wallet to create an agent' },
        { status: 400 }
      );
    }
    
    // Parse the request body
    const body = await request.json();
    const { name, description, type, capabilities, parameters, image_url, token_id } = body;
    
    // Validate the request
    if (!name || !type) {
      return NextResponse.json(
        { error: 'Name and type are required' },
        { status: 400 }
      );
    }
    
    // Create the agent in the database
    const { data: agent, error } = await supabase
      .from('agents')
      .insert([{
        name,
        description,
        type,
        capabilities: capabilities || [],
        parameters: parameters || {},
        image_url,
        owner_key: publicKey,
        token_id
      }])
      .select()
      .single();
    
    if (error) {
      console.error('Error creating agent:', error);
      return NextResponse.json(
        { error: 'Error creating agent' },
        { status: 500 }
      );
    }
    
    // Return the created agent
    return NextResponse.json({ agent }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/agents:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 