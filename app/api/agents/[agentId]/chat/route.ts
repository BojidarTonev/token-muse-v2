import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources';

// Initialize OpenAI client
const openaiApiKey = process.env.NEXT_PUBLIC_OPEN_AI_KEY || process.env.OPENAI_API_KEY;
const openai = new OpenAI({
  apiKey: openaiApiKey,
});

// POST /api/agents/[agentId]/chat - Chat with a specific agent
export async function POST(
  request: NextRequest,
  context: { params: Promise<{ agentId: string }> }
) {
  try {
    // Check if OpenAI API key is available
    if (!openaiApiKey) {
      console.error('OpenAI API key is not configured');
      return NextResponse.json(
        { error: 'OpenAI API key is not configured' },
        { status: 500 }
      );
    }

    // Get the public key from the request headers
    const publicKey = request.headers.get('x-public-key');
    
    // If no public key is provided, return authentication error
    if (!publicKey) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const params = await context.params;
    const { agentId } = params;
    
    // Parse the request body
    const body = await request.json();
    const { message, messageHistory = [] } = body;
    
    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }
    
    // Fetch the agent from the database
    const { data: agent, error } = await supabase
      .from('agents')
      .select('*')
      .eq('id', agentId)
      .single();
    
    if (error || !agent) {
      console.error('Error fetching agent:', error);
      return NextResponse.json(
        { error: 'Agent not found' },
        { status: 404 }
      );
    }
    
    // Create a system message based on the agent's description and type
    const agentDescription = agent.description || `A ${agent.type} AI assistant`;
    const systemMessage = `You are ${agent.name}, ${agentDescription}. 
    Your capabilities include: ${agent.capabilities.join(', ')}. 
    Respond in a manner consistent with your role as a ${agent.type} agent.
    Keep your responses concise and helpful.`;
    
    // Format the conversation history for OpenAI
    const formattedHistory = messageHistory.map((msg: { content: string; sender: string }) => ({
      role: msg.sender === 'user' ? 'user' as const : 'assistant' as const,
      content: msg.content
    }));
    
    // Prepare the messages for the OpenAI API
    const messages: ChatCompletionMessageParam[] = [
      { role: 'system', content: systemMessage },
      ...formattedHistory,
      { role: 'user', content: message }
    ];
    
    try {
      // Call the OpenAI API
      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages,
        temperature: 0.7,
        max_tokens: 500,
      });
      
      // Extract the response
      const response = completion.choices[0]?.message?.content || 'I apologize, but I am unable to respond at the moment.';
      
      // Return the response
      return NextResponse.json({ 
        response,
        agent: {
          id: agent.id,
          name: agent.name,
          type: agent.type
        }
      });
    } catch (apiError: unknown) {
      console.error('OpenAI API error:', apiError);
      
      // Check for authentication errors
      const error = apiError as { status?: number; message?: string };
      if (error.status === 401 || error.message?.includes('authentication')) {
        return NextResponse.json(
          { error: 'Authentication failed with OpenAI API. Please check your API key.' },
          { status: 401 }
        );
      }
      
      return NextResponse.json(
        { error: 'Error communicating with OpenAI: ' + (error.message || 'Unknown error') },
        { status: 500 }
      );
    }
    
  } catch (error: unknown) {
    console.error('Error in POST /api/agents/[agentId]/chat:', error);
    const err = error as { message?: string };
    return NextResponse.json(
      { error: 'Internal server error: ' + (err.message || 'Unknown error') },
      { status: 500 }
    );
  }
} 