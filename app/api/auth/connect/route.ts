import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    const { publicKey } = body;
    
    // Validate the request
    if (!publicKey) {
      return NextResponse.json(
        { error: 'Public key is required' },
        { status: 400 }
      );
    }
    
    // In a real implementation, you would verify the signature here
    // For now, we'll just check if the public key exists
    
    // Check if the user exists in the database
    const { data: existingUser, error: fetchError } = await supabase
      .from('users')
      .select('*')
      .eq('public_key', publicKey)
      .single();
    
    if (fetchError && fetchError.code !== 'PGRST116') {
      // PGRST116 is the error code for "no rows returned"
      console.error('Error fetching user:', fetchError);
      return NextResponse.json(
        { error: 'Error fetching user' },
        { status: 500 }
      );
    }
    
    let user = existingUser;
    
    // If the user doesn't exist, create a new user
    if (!existingUser) {
      const { data: newUser, error: insertError } = await supabase
        .from('users')
        .insert([{ public_key: publicKey }])
        .select()
        .single();
      
      if (insertError) {
        console.error('Error creating user:', insertError);
        return NextResponse.json(
          { error: 'Error creating user' },
          { status: 500 }
        );
      }
      
      user = newUser;
    }
    
    // Generate a simple token (in a real app, use a proper JWT)
    // This is just for demonstration purposes
    const token = Buffer.from(`${publicKey}-${Date.now()}`).toString('base64');
    
    // Return the user and token
    return NextResponse.json({
      user,
      token,
    });
  } catch (error) {
    console.error('Error in auth/connect:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 