import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET /api/outputs/[outputId] - Get a specific output
export async function GET(
  request: NextRequest,
  { params }: { params: { outputId: string } }
) {
  try {
    const { outputId } = params;
    const publicKey = request.headers.get('x-public-key');
    
    if (!publicKey) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    // Fetch the output from the database
    const { data: output, error } = await supabase
      .from('outputs')
      .select(`
        *,
        agents:agent_id (*),
        narratives:narrative_id (*)
      `)
      .eq('id', outputId)
      .single();
    
    if (error) {
      console.error('Error fetching output:', error);
      return NextResponse.json(
        { error: 'Error fetching output' },
        { status: 500 }
      );
    }
    
    if (!output) {
      return NextResponse.json(
        { error: 'Output not found' },
        { status: 404 }
      );
    }
    
    // Check if the output belongs to the user
    if (output.narratives && output.narratives.owner_key !== publicKey) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }
    
    // Return the output
    return NextResponse.json({ output });
  } catch (error) {
    console.error('Error in GET /api/outputs/[outputId]:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT /api/outputs/[outputId] - Update a specific output
export async function PUT(
  request: NextRequest,
  { params }: { params: { outputId: string } }
) {
  try {
    const { outputId } = params;
    const publicKey = request.headers.get('x-public-key');
    
    if (!publicKey) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    // Fetch the output to check ownership
    const { data: existingOutput, error: fetchError } = await supabase
      .from('outputs')
      .select(`
        *,
        agents:agent_id (*),
        narratives:narrative_id (*)
      `)
      .eq('id', outputId)
      .single();
    
    if (fetchError) {
      console.error('Error fetching output:', fetchError);
      return NextResponse.json(
        { error: 'Error fetching output' },
        { status: 500 }
      );
    }
    
    if (!existingOutput) {
      return NextResponse.json(
        { error: 'Output not found' },
        { status: 404 }
      );
    }
    
    // Check if the output belongs to the user
    if (existingOutput.narratives && existingOutput.narratives.owner_key !== publicKey) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }
    
    // Parse the request body
    const body = await request.json();
    const { content_url, content_type, content_metadata, token_id } = body;
    
    // Prepare the update data
    const updateData: any = {};
    
    if (content_url !== undefined) updateData.content_url = content_url;
    if (content_type !== undefined) updateData.content_type = content_type;
    if (content_metadata !== undefined) updateData.content_metadata = content_metadata;
    if (token_id !== undefined) updateData.token_id = token_id;
    
    // Update the output in the database
    const { data: updatedOutput, error: updateError } = await supabase
      .from('outputs')
      .update(updateData)
      .eq('id', outputId)
      .select()
      .single();
    
    if (updateError) {
      console.error('Error updating output:', updateError);
      return NextResponse.json(
        { error: 'Error updating output' },
        { status: 500 }
      );
    }
    
    // Return the updated output
    return NextResponse.json({ output: updatedOutput });
  } catch (error) {
    console.error('Error in PUT /api/outputs/[outputId]:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/outputs/[outputId] - Delete a specific output
export async function DELETE(
  request: NextRequest,
  { params }: { params: { outputId: string } }
) {
  try {
    const { outputId } = params;
    const publicKey = request.headers.get('x-public-key');
    
    if (!publicKey) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    // Fetch the output to check ownership
    const { data: existingOutput, error: fetchError } = await supabase
      .from('outputs')
      .select(`
        *,
        agents:agent_id (*),
        narratives:narrative_id (*)
      `)
      .eq('id', outputId)
      .single();
    
    if (fetchError) {
      console.error('Error fetching output:', fetchError);
      return NextResponse.json(
        { error: 'Error fetching output' },
        { status: 500 }
      );
    }
    
    if (!existingOutput) {
      return NextResponse.json(
        { error: 'Output not found' },
        { status: 404 }
      );
    }
    
    // Check if the output belongs to the user
    if (existingOutput.narratives && existingOutput.narratives.owner_key !== publicKey) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }
    
    // Delete the output from the database
    const { error: deleteError } = await supabase
      .from('outputs')
      .delete()
      .eq('id', outputId);
    
    if (deleteError) {
      console.error('Error deleting output:', deleteError);
      return NextResponse.json(
        { error: 'Error deleting output' },
        { status: 500 }
      );
    }
    
    // Return success
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in DELETE /api/outputs/[outputId]:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 