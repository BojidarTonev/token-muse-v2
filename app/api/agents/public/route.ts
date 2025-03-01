import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET /api/agents/public - Get all public agents
export async function GET(request: NextRequest) {
  try {
    // Fetch all agents from the database
    const { data: agents, error } = await supabase
      .from('agents')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching public agents:', error);
      return NextResponse.json(
        { error: 'Error fetching public agents' },
        { status: 500 }
      );
    }
    
    // Return the agents
    return NextResponse.json({ agents });
  } catch (error) {
    console.error('Error in GET /api/agents/public:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 