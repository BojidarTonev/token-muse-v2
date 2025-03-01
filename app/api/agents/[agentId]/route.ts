import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET /api/agents/[agentId] - Get a specific agent
export async function GET(
  request: NextRequest,
  { params }: { params: { agentId: string } }
) {
  try {
    const { agentId } = params;
    const publicKey = request.headers.get('x-public-key');
    
    // If no public key is provided, try to fetch the agent as a public resource
    if (!publicKey) {
      // Fetch the agent from the database without owner check
      const { data: agent, error } = await supabase
        .from('agents')
        .select('*')
        .eq('id', agentId)
        .single();
      
      if (error || !agent) {
        return NextResponse.json(
          { error: 'Agent not found' },
          { status: 404 }
        );
      }
      
      return NextResponse.json({ agent });
    }
    
    // Fetch the agent from the database
    const { data: agent, error } = await supabase
      .from('agents')
      .select('*')
      .eq('id', agentId)
      .single();
    
    if (error) {
      console.error('Error fetching agent:', error);
      return NextResponse.json(
        { error: 'Error fetching agent' },
        { status: 500 }
      );
    }
    
    if (!agent) {
      return NextResponse.json(
        { error: 'Agent not found' },
        { status: 404 }
      );
    }
    
    // Return the agent
    return NextResponse.json({ agent });
  } catch (error) {
    console.error('Error in GET /api/agents/[agentId]:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT /api/agents/[agentId] - Update a specific agent
export async function PUT(
  request: NextRequest,
  { params }: { params: { agentId: string } }
) {
  try {
    const { agentId } = params;
    const publicKey = request.headers.get('x-public-key');
    
    // If no public key is provided, return a user-friendly error message
    if (!publicKey) {
      return NextResponse.json(
        { error: 'Please connect your wallet to update this agent' },
        { status: 400 }
      );
    }
    
    // Parse the request body
    const body = await request.json();
    const { name, description, type, capabilities, parameters, image_url } = body;
    
    // Validate the request
    if (!name || !type) {
      return NextResponse.json(
        { error: 'Name and type are required' },
        { status: 400 }
      );
    }
    
    // Check if the agent exists and belongs to the user
    const { data: existingAgent, error: fetchError } = await supabase
      .from('agents')
      .select('*')
      .eq('id', agentId)
      .eq('owner_key', publicKey)
      .single();
    
    if (fetchError || !existingAgent) {
      return NextResponse.json(
        { error: 'Agent not found or you do not have permission to update it' },
        { status: 404 }
      );
    }
    
    // Update the agent in the database
    const { data: agent, error } = await supabase
      .from('agents')
      .update({
        name,
        description,
        type,
        capabilities: capabilities || [],
        parameters: parameters || {},
        image_url
      })
      .eq('id', agentId)
      .eq('owner_key', publicKey)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating agent:', error);
      return NextResponse.json(
        { error: 'Error updating agent' },
        { status: 500 }
      );
    }
    
    // Return the updated agent
    return NextResponse.json({ agent });
  } catch (error) {
    console.error('Error in PUT /api/agents/[agentId]:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/agents/[agentId] - Delete a specific agent
export async function DELETE(
  request: NextRequest,
  { params }: { params: { agentId: string } }
) {
  try {
    const { agentId } = params;
    const publicKey = request.headers.get('x-public-key');
    
    // If no public key is provided, return a user-friendly error message
    if (!publicKey) {
      return NextResponse.json(
        { error: 'Please connect your wallet to delete this agent' },
        { status: 400 }
      );
    }
    
    // Check if the agent exists and belongs to the user
    const { data: existingAgent, error: fetchError } = await supabase
      .from('agents')
      .select('*')
      .eq('id', agentId)
      .eq('owner_key', publicKey)
      .single();
    
    if (fetchError || !existingAgent) {
      return NextResponse.json(
        { error: 'Agent not found or you do not have permission to delete it' },
        { status: 404 }
      );
    }
    
    // Delete the agent from the database
    const { error } = await supabase
      .from('agents')
      .delete()
      .eq('id', agentId)
      .eq('owner_key', publicKey);
    
    if (error) {
      console.error('Error deleting agent:', error);
      return NextResponse.json(
        { error: 'Error deleting agent' },
        { status: 500 }
      );
    }
    
    // Return success
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in DELETE /api/agents/[agentId]:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 