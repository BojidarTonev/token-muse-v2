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
    
    if (!publicKey) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    // Fetch the agent from the database
    const { data: agent, error } = await supabase
      .from('agents')
      .select('*')
      .eq('id', agentId)
      .eq('owner_key', publicKey)
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
    
    if (!publicKey) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
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
    
    // Check if the agent exists and belongs to the user
    const { data: existingAgent, error: fetchError } = await supabase
      .from('agents')
      .select('*')
      .eq('id', agentId)
      .eq('owner_key', publicKey)
      .single();
    
    if (fetchError) {
      console.error('Error fetching agent:', fetchError);
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
    
    // Update the agent in the database
    const { data: updatedAgent, error: updateError } = await supabase
      .from('agents')
      .update({
        name,
        description,
        type,
        capabilities: capabilities || existingAgent.capabilities,
        parameters: parameters || existingAgent.parameters,
        image_url,
        token_id,
        updated_at: new Date().toISOString()
      })
      .eq('id', agentId)
      .eq('owner_key', publicKey)
      .select()
      .single();
    
    if (updateError) {
      console.error('Error updating agent:', updateError);
      return NextResponse.json(
        { error: 'Error updating agent' },
        { status: 500 }
      );
    }
    
    // Return the updated agent
    return NextResponse.json({ agent: updatedAgent });
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
    
    if (!publicKey) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    // Check if the agent exists and belongs to the user
    const { data: existingAgent, error: fetchError } = await supabase
      .from('agents')
      .select('*')
      .eq('id', agentId)
      .eq('owner_key', publicKey)
      .single();
    
    if (fetchError) {
      console.error('Error fetching agent:', fetchError);
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
    
    // Delete the agent from the database
    const { error: deleteError } = await supabase
      .from('agents')
      .delete()
      .eq('id', agentId)
      .eq('owner_key', publicKey);
    
    if (deleteError) {
      console.error('Error deleting agent:', deleteError);
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