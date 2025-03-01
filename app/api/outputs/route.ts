import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET /api/outputs - Get all outputs for the authenticated user
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
    
    // Get query parameters
    const url = new URL(request.url);
    const agentId = url.searchParams.get('agent_id');
    const narrativeId = url.searchParams.get('narrative_id');
    
    // Build the query
    let query = supabase
      .from('outputs')
      .select(`
        *,
        agents:agent_id (*),
        narratives:narrative_id (*)
      `);
    
    // If agent_id is provided, filter by agent
    if (agentId) {
      query = query.eq('agent_id', agentId);
    }
    
    // If narrative_id is provided, filter by narrative
    if (narrativeId) {
      query = query.eq('narrative_id', narrativeId);
    }
    
    // Execute the query
    const { data: outputs, error } = await query;
    
    if (error) {
      console.error('Error fetching outputs:', error);
      return NextResponse.json(
        { error: 'Error fetching outputs' },
        { status: 500 }
      );
    }
    
    // Return the outputs
    return NextResponse.json({ outputs });
  } catch (error) {
    console.error('Error in GET /api/outputs:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/outputs - Create a new output
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
    const { content_url, content_type, content_metadata, agent_id, narrative_id, token_id } = body;
    
    // Validate the request
    if (!content_url || !content_type) {
      return NextResponse.json(
        { error: 'Content URL and content type are required' },
        { status: 400 }
      );
    }
    
    // If an agent ID is provided, check if it exists and belongs to the user
    if (agent_id) {
      const { data: existingAgent, error: agentError } = await supabase
        .from('agents')
        .select('*')
        .eq('id', agent_id)
        .eq('owner_key', publicKey)
        .single();
      
      if (agentError && agentError.code !== 'PGRST116') {
        console.error('Error fetching agent:', agentError);
        return NextResponse.json(
          { error: 'Error fetching agent' },
          { status: 500 }
        );
      }
      
      if (!existingAgent) {
        return NextResponse.json(
          { error: 'Agent not found' },
          { status: 404 }
        );
      }
    }
    
    // If a narrative ID is provided, check if it exists and belongs to the user
    if (narrative_id) {
      const { data: existingNarrative, error: narrativeError } = await supabase
        .from('narratives')
        .select('*')
        .eq('id', narrative_id)
        .eq('owner_key', publicKey)
        .single();
      
      if (narrativeError && narrativeError.code !== 'PGRST116') {
        console.error('Error fetching narrative:', narrativeError);
        return NextResponse.json(
          { error: 'Error fetching narrative' },
          { status: 500 }
        );
      }
      
      if (!existingNarrative) {
        return NextResponse.json(
          { error: 'Narrative not found' },
          { status: 404 }
        );
      }
    }
    
    // Create the output in the database
    const { data: output, error } = await supabase
      .from('outputs')
      .insert([{
        content_url,
        content_type,
        content_metadata: content_metadata || {},
        agent_id,
        narrative_id,
        token_id
      }])
      .select()
      .single();
    
    if (error) {
      console.error('Error creating output:', error);
      return NextResponse.json(
        { error: 'Error creating output' },
        { status: 500 }
      );
    }
    
    // Return the created output
    return NextResponse.json({ output }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/outputs:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 