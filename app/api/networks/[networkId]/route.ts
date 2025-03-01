import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET /api/networks/[networkId] - Get a specific network
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ networkId: string }> }
) {
  try {
    const params = await context.params;
    const { networkId } = params;
    const publicKey = request.headers.get('x-public-key');
    
    if (!publicKey) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    // Fetch the network from the database
    const { data: network, error } = await supabase
      .from('networks')
      .select('*')
      .eq('id', networkId)
      .eq('owner_key', publicKey)
      .single();
    
    if (error) {
      console.error('Error fetching network:', error);
      return NextResponse.json(
        { error: 'Error fetching network' },
        { status: 500 }
      );
    }
    
    if (!network) {
      return NextResponse.json(
        { error: 'Network not found' },
        { status: 404 }
      );
    }
    
    // Fetch the agents in this network
    const { data: networkAgents, error: agentsError } = await supabase
      .from('network_agents')
      .select(`
        agent_id,
        role,
        agents:agent_id (*)
      `)
      .eq('network_id', networkId);
    
    if (agentsError) {
      console.error('Error fetching network agents:', agentsError);
      return NextResponse.json(
        { error: 'Error fetching network agents' },
        { status: 500 }
      );
    }
    
    // Return the network with its agents
    return NextResponse.json({
      network,
      agents: networkAgents
    });
  } catch (error) {
    console.error('Error in GET /api/networks/[networkId]:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT /api/networks/[networkId] - Update a specific network
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ networkId: string }> }
) {
  try {
    const params = await context.params;
    const { networkId } = params;
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
    
    // Check if the network exists and belongs to the user
    const { data: existingNetwork, error: fetchError } = await supabase
      .from('networks')
      .select('*')
      .eq('id', networkId)
      .eq('owner_key', publicKey)
      .single();
    
    if (fetchError) {
      console.error('Error fetching network:', fetchError);
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
    
    // Update the network in the database
    const { data: updatedNetwork, error: updateError } = await supabase
      .from('networks')
      .update({
        name,
        description,
        purpose,
        image_url,
        token_id,
        updated_at: new Date().toISOString()
      })
      .eq('id', networkId)
      .eq('owner_key', publicKey)
      .select()
      .single();
    
    if (updateError) {
      console.error('Error updating network:', updateError);
      return NextResponse.json(
        { error: 'Error updating network' },
        { status: 500 }
      );
    }
    
    // Return the updated network
    return NextResponse.json({ network: updatedNetwork });
  } catch (error) {
    console.error('Error in PUT /api/networks/[networkId]:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/networks/[networkId] - Delete a specific network
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ networkId: string }> }
) {
  try {
    const params = await context.params;
    const { networkId } = params;
    const publicKey = request.headers.get('x-public-key');
    
    if (!publicKey) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    // Check if the network exists and belongs to the user
    const { data: existingNetwork, error: fetchError } = await supabase
      .from('networks')
      .select('*')
      .eq('id', networkId)
      .eq('owner_key', publicKey)
      .single();
    
    if (fetchError) {
      console.error('Error fetching network:', fetchError);
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
    
    // Delete the network from the database
    // Note: network_agents will be automatically deleted due to CASCADE
    const { error: deleteError } = await supabase
      .from('networks')
      .delete()
      .eq('id', networkId)
      .eq('owner_key', publicKey);
    
    if (deleteError) {
      console.error('Error deleting network:', deleteError);
      return NextResponse.json(
        { error: 'Error deleting network' },
        { status: 500 }
      );
    }
    
    // Return success
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in DELETE /api/networks/[networkId]:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 