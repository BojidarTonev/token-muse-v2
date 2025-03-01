import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// DELETE /api/networks/[networkId]/agents/[agentId] - Remove an agent from a network
export async function DELETE(
  request: NextRequest,
  { params }: { params: { networkId: string; agentId: string } }
) {
  try {
    const { networkId, agentId } = params;
    const publicKey = request.headers.get('x-public-key');
    
    if (!publicKey) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    // Check if the network exists and belongs to the user
    const { data: existingNetwork, error: networkError } = await supabase
      .from('networks')
      .select('*')
      .eq('id', networkId)
      .eq('owner_key', publicKey)
      .single();
    
    if (networkError) {
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
    
    // Check if the agent is in the network
    const { data: existingNetworkAgent, error: checkError } = await supabase
      .from('network_agents')
      .select('*')
      .eq('network_id', networkId)
      .eq('agent_id', agentId)
      .single();
    
    if (checkError) {
      console.error('Error checking network agent:', checkError);
      return NextResponse.json(
        { error: 'Error checking network agent' },
        { status: 500 }
      );
    }
    
    if (!existingNetworkAgent) {
      return NextResponse.json(
        { error: 'Agent is not in the network' },
        { status: 404 }
      );
    }
    
    // Remove the agent from the network
    const { error: deleteError } = await supabase
      .from('network_agents')
      .delete()
      .eq('network_id', networkId)
      .eq('agent_id', agentId);
    
    if (deleteError) {
      console.error('Error removing agent from network:', deleteError);
      return NextResponse.json(
        { error: 'Error removing agent from network' },
        { status: 500 }
      );
    }
    
    // Return success
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in DELETE /api/networks/[networkId]/agents/[agentId]:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 