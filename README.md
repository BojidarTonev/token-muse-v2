# agentmint

![agentmint Logo](https://placeholder-for-agentmint-logo.com)

## Overview

Agentmint is a cutting-edge platform that fuses decentralized AI, blockchain tokenization, and intuitive UI/UX to revolutionize creative collaboration. The platform enables users to create multimodal AI agents, build interconnected agent networks, and engage in narrative-driven collaboration to solve complex problems or creative challenges.

## Core Features

### 🤖 Create AI Agents

Deploy individual multimodal AI agents capable of generating diverse creative outputs (art, music, text, code) based on user prompts. Each agent is minted as a unique digital asset on the blockchain.

### 🔄 Build Agent Networks

Connect multiple specialized agents into cohesive networks that can collaborate on complex tasks. Networks share contextual data and metadata to ensure outputs align on style, tone, and thematic elements.

### 📝 Narrative-Driven Collaboration

Define master narratives or problem scenarios that are distributed across all agents in a network. Each agent contributes its specialized output toward a unified solution or creative product.

## Technology Stack

- **Frontend & Backend**: Next.js for unified development
- **UI/UX**: shadcn component library for modern, responsive design
- **Authentication**: Phantom wallet integration for Web3 authentication
- **Database**: PostgreSQL (via Supabase) for structured data storage
- **Storage**: Public agent-mint bucket for content hosting
- **State Management**: Redux with RTK for frontend state
- **Notifications**: Sonner for toast notifications

## Pages

- **/agents** - Browse and manage AI agents
- **/network** - View and interact with agent networks
- **/create-narrative** - Define master narratives for agent networks
- **/tokenomics** - Explore $MINT token economics
- **/roadmap** - View project milestones and progress
- **/create-agent** - Create and customize new AI agents
- **/create-network** - Assemble networks from existing agents

## API Endpoints

### Authentication

- `POST /api/auth/connect` - Connect Phantom wallet
- `GET /api/users/me` - Get authenticated user details

### Agents

- `POST /api/agents` - Create a new agent
- `GET /api/agents` - List user's agents
- `GET /api/agents/[agentId]` - Get specific agent details
- `PUT /api/agents/[agentId]` - Update agent
- `DELETE /api/agents/[agentId]` - Delete agent

### Networks

- `POST /api/networks` - Create a new network
- `GET /api/networks` - List user's networks
- `PUT /api/networks/[networkId]` - Update network
- `DELETE /api/networks/[networkId]` - Delete network
- `POST /api/networks/[networkId]/agents` - Add agent to network
- `DELETE /api/networks/[networkId]/agents/[agentId]` - Remove agent from network

### Narratives

- `POST /api/narratives` - Create a narrative
- `GET /api/narratives` - List user's narratives
- `GET /api/narratives/[narrativeId]` - Get specific narrative
- `PUT /api/narratives/[narrativeId]` - Update narrative
- `DELETE /api/narratives/[narrativeId]` - Delete narrative

### Outputs

- `POST /api/outputs` - Record new output
- `GET /api/outputs` - List outputs
- `GET /api/outputs/[outputId]` - Get specific output

## Data Models

### Users

```sql
CREATE TABLE users (
  public_key VARCHAR(255) PRIMARY KEY,
  display_name VARCHAR(255),
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### Agents

```sql
CREATE TABLE agents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  type VARCHAR(50) NOT NULL,
  capabilities TEXT[],
  parameters JSONB,
  image_url TEXT,
  owner_key VARCHAR(255) NOT NULL REFERENCES users(public_key) ON DELETE CASCADE,
  token_id VARCHAR(255),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### Networks

```sql
CREATE TABLE networks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  purpose VARCHAR(255),
  image_url TEXT,
  owner_key VARCHAR(255) NOT NULL REFERENCES users(public_key) ON DELETE CASCADE,
  token_id VARCHAR(255),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### Network_Agents

```sql
CREATE TABLE network_agents (
  network_id UUID REFERENCES networks(id) ON DELETE CASCADE,
  agent_id UUID REFERENCES agents(id) ON DELETE CASCADE,
  role VARCHAR(100),
  PRIMARY KEY (network_id, agent_id)
);
```

### Narratives

```sql
CREATE TABLE narratives (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  type VARCHAR(50) NOT NULL,
  master_prompt TEXT NOT NULL,
  additional_context TEXT,
  network_id UUID REFERENCES networks(id) ON DELETE SET NULL,
  status VARCHAR(50) DEFAULT 'draft',
  owner_key VARCHAR(255) NOT NULL REFERENCES users(public_key) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### Outputs

```sql
CREATE TABLE outputs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  content_url TEXT NOT NULL,
  content_type VARCHAR(50) NOT NULL,
  content_metadata JSONB,
  agent_id UUID REFERENCES agents(id) ON DELETE SET NULL,
  narrative_id UUID REFERENCES narratives(id) ON DELETE CASCADE,
  token_id VARCHAR(255),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

## Use Case Example

Imagine a digital marketing agency tasked with launching a multimedia campaign:

1. **Agent Creation**: The agency creates three specialized AI agents:

   - A graphic design agent for visuals
   - A music composition agent for background scores
   - A copywriting agent for campaign slogans

2. **Building the Network**: These agents are grouped into a campaign network where they share thematic guidelines and contextual data.

3. **Narrative Assignment**: The agency inputs a master narrative describing the campaign's goals—capturing a futuristic, innovative brand image.

4. **Distributed Prompts & Collaboration**: Each agent receives a tailored prompt: the design agent creates futuristic logos and visuals, the music agent composes an avant-garde soundtrack, and the copywriting agent crafts compelling taglines.

5. **Output Aggregation**: The platform aggregates these outputs into a cohesive campaign presentation that can be further refined based on stakeholder feedback.

## Getting Started

### Prerequisites

- Node.js (v16+)
- Phantom Wallet browser extension
- PostgreSQL database (or Supabase account)

### Installation

1. Clone the repository

   ```
   git clone https://github.com/yourusername/agent-mint.git
   cd agent-mint
   ```

2. Install dependencies

   ```
   npm install
   ```

3. Set up environment variables

   ```
   cp .env.example .env.local
   ```

   Edit `.env.local` with your Supabase credentials and other configuration

4. Run the development server

   ```
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For questions or support, please reach out to [contact@agentmint.io](mailto:contact@agentmint.io).
