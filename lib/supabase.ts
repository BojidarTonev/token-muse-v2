import { createClient } from '@supabase/supabase-js';

// Check if the environment variables are defined
if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('Missing environment variable: NEXT_PUBLIC_SUPABASE_URL');
}

if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Missing environment variable: NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

// Create a Supabase client
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Define database types based on our schema
export type User = {
  public_key: string;
  display_name?: string;
  avatar_url?: string;
  created_at: string;
};

export type Agent = {
  id: string;
  name: string;
  description?: string;
  type: string;
  capabilities: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  parameters: Record<string, any>;
  image_url?: string;
  owner_key: string;
  token_id?: string;
  created_at: string;
  updated_at: string;
};

export type Network = {
  id: string;
  name: string;
  description?: string;
  purpose?: string;
  image_url?: string;
  owner_key: string;
  token_id?: string;
  created_at: string;
  updated_at: string;
};

export type NetworkAgent = {
  network_id: string;
  agent_id: string;
  role?: string;
};

export type Narrative = {
  id: string;
  title: string;
  description?: string;
  type: string;
  master_prompt: string;
  additional_context?: string;
  network_id?: string;
  status: 'draft' | 'in_progress' | 'completed';
  owner_key: string;
  created_at: string;
  updated_at: string;
};

export type Output = {
  id: string;
  content_url: string;
  content_type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content_metadata?: Record<string, any>;
  agent_id?: string;
  narrative_id?: string;
  token_id?: string;
  created_at: string;
}; 