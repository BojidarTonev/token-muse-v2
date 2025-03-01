import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET /api/narratives/[narrativeId] - Get a specific narrative
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ narrativeId: string }> }
) {
  try {
    const params = await context.params;
    const { narrativeId } = params;
    const publicKey = request.headers.get('x-public-key');
    
    if (!publicKey) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    // Fetch the narrative from the database
    const { data: narrative, error } = await supabase
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
      .eq('id', narrativeId)
      .eq('owner_key', publicKey)
      .single();
    
    if (error) {
      console.error('Error fetching narrative:', error);
      return NextResponse.json(
        { error: 'Error fetching narrative' },
        { status: 500 }
      );
    }
    
    if (!narrative) {
      return NextResponse.json(
        { error: 'Narrative not found' },
        { status: 404 }
      );
    }
    
    // Fetch the outputs for this narrative
    const { data: outputs, error: outputsError } = await supabase
      .from('outputs')
      .select(`
        *,
        agents:agent_id (
          id,
          name,
          type,
          image_url
        )
      `)
      .eq('narrative_id', narrativeId);
    
    if (outputsError) {
      console.error('Error fetching outputs:', outputsError);
      return NextResponse.json(
        { error: 'Error fetching outputs' },
        { status: 500 }
      );
    }
    
    // Return the narrative with its outputs
    return NextResponse.json({
      narrative,
      outputs: outputs || []
    });
  } catch (error) {
    console.error('Error in GET /api/narratives/[narrativeId]:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT /api/narratives/[narrativeId] - Update a specific narrative
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ narrativeId: string }> }
) {
  try {
    const params = await context.params;
    const { narrativeId } = params;
    const publicKey = request.headers.get('x-public-key');
    
    if (!publicKey) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    // Parse the request body
    const body = await request.json();
    const { title, description, type, master_prompt, additional_context, network_id, status } = body;
    
    // Validate the request
    if (!title || !type || !master_prompt) {
      return NextResponse.json(
        { error: 'Title, type, and master prompt are required' },
        { status: 400 }
      );
    }
    
    // Check if the narrative exists and belongs to the user
    const { data: existingNarrative, error: fetchError } = await supabase
      .from('narratives')
      .select('*')
      .eq('id', narrativeId)
      .eq('owner_key', publicKey)
      .single();
    
    if (fetchError) {
      console.error('Error fetching narrative:', fetchError);
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
    
    // If a network ID is provided, check if it exists and belongs to the user
    if (network_id && network_id !== existingNarrative.network_id) {
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
    
    // Update the narrative in the database
    const { data: updatedNarrative, error: updateError } = await supabase
      .from('narratives')
      .update({
        title,
        description,
        type,
        master_prompt,
        additional_context,
        network_id,
        status: status || existingNarrative.status,
        updated_at: new Date().toISOString()
      })
      .eq('id', narrativeId)
      .eq('owner_key', publicKey)
      .select()
      .single();
    
    if (updateError) {
      console.error('Error updating narrative:', updateError);
      return NextResponse.json(
        { error: 'Error updating narrative' },
        { status: 500 }
      );
    }
    
    // Return the updated narrative
    return NextResponse.json({ narrative: updatedNarrative });
  } catch (error) {
    console.error('Error in PUT /api/narratives/[narrativeId]:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/narratives/[narrativeId] - Delete a specific narrative
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ narrativeId: string }> }
) {
  try {
    const params = await context.params;
    const { narrativeId } = params;
    const publicKey = request.headers.get('x-public-key');
    
    if (!publicKey) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    // Check if the narrative exists and belongs to the user
    const { data: existingNarrative, error: fetchError } = await supabase
      .from('narratives')
      .select('*')
      .eq('id', narrativeId)
      .eq('owner_key', publicKey)
      .single();
    
    if (fetchError) {
      console.error('Error fetching narrative:', fetchError);
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
    
    // Delete the narrative from the database
    // Note: outputs will be automatically deleted due to CASCADE
    const { error: deleteError } = await supabase
      .from('narratives')
      .delete()
      .eq('id', narrativeId)
      .eq('owner_key', publicKey);
    
    if (deleteError) {
      console.error('Error deleting narrative:', deleteError);
      return NextResponse.json(
        { error: 'Error deleting narrative' },
        { status: 500 }
      );
    }
    
    // Return success
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in DELETE /api/narratives/[narrativeId]:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 