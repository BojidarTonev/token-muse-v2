import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

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
    
    // Fetch the user from the database
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('public_key', publicKey)
      .single();
    
    if (error) {
      console.error('Error fetching user:', error);
      return NextResponse.json(
        { error: 'Error fetching user' },
        { status: 500 }
      );
    }
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    // Return the user
    return NextResponse.json({ user });
  } catch (error) {
    console.error('Error in users/me:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 