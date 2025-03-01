import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// POST /api/networks/[networkId]/agents - Add an agent to a network
export async function POST(
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
    // Support both agent_id and agentId formats
    const agentId = body.agentId || body.agent_id;
    const { role } = body;
    
    // Validate the request
    if (!agentId) {
      return NextResponse.json(
        { error: 'Agent ID is required' },
        { status: 400 }
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
    
    // Check if the agent exists (without checking owner_key to allow public agents)
    const { data: existingAgent, error: agentError } = await supabase
      .from('agents')
      .select('*')
      .eq('id', agentId)
      .single();
    
    if (agentError) {
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
    
    // Check if the agent is already in the network
    const { data: existingNetworkAgent } = await supabase
      .from('network_agents')
      .select('*')
      .eq('network_id', networkId)
      .eq('agent_id', agentId)
      .single();
    
    if (existingNetworkAgent) {
      return NextResponse.json(
        { error: 'Agent is already in the network' },
        { status: 400 }
      );
    }
    
    // Add the agent to the network
    const { data: networkAgent, error: insertError } = await supabase
      .from('network_agents')
      .insert([{
        network_id: networkId,
        agent_id: agentId,
        role
      }])
      .select()
      .single();
    
    if (insertError) {
      console.error('Error adding agent to network:', insertError);
      return NextResponse.json(
        { error: 'Error adding agent to network' },
        { status: 500 }
      );
    }
    
    // Return the network agent
    return NextResponse.json({ networkAgent }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/networks/[networkId]/agents:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET /api/networks/[networkId]/agents - Get all agents in a network
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
    
    // Get all agents in the network
    const { data: networkAgents, error: agentsError } = await supabase
      .from('network_agents')
      .select(`
        *,
        agent:agents(*)
      `)
      .eq('network_id', networkId);
    
    if (agentsError) {
      console.error('Error fetching network agents:', agentsError);
      return NextResponse.json(
        { error: 'Error fetching network agents' },
        { status: 500 }
      );
    }
    
    // Return the network agents
    return NextResponse.json({ networkAgents });
  } catch (error) {
    console.error('Error in GET /api/networks/[networkId]/agents:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 