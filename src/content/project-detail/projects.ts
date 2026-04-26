export type ProjectInfo = {
  key: string;
  title: string;
  tagline: string;
  description: string;
  tech: string[];
  github: string;
  live?: string;
};

export const projects: Record<string, ProjectInfo> = {
  'study-scribe': {
    key: 'study-scribe',
    title: 'Study Scribe',
    tagline: 'React Native study app, shipped to the iOS App Store with 100+ signups.',
    description:
      'A cross-platform mobile app for creating study notes and preparing for tests. I built the note-taking, organization, and review workflows end-to-end, with local data persistence so the app stays usable offline. Published to the iOS App Store.',
    tech: ['React Native', 'Expo', 'TypeScript', 'Supabase', 'OpenAI API'],
    github: 'https://github.com/HudsonPryde/ss-app',
  },
  'research-assistant': {
    key: 'research-assistant',
    title: 'Research Assistant',
    tagline: 'A focused research workspace, powered by LLMs.',
    description:
      'A research workflow tool that ingests sources, summarises them, and lets you query across a corpus. Built to keep citations attached to every claim so the AI never hallucinates a source.',
    tech: ['Python', 'FastAPI', 'React', 'Vector DB'],
    github: 'https://github.com/HudsonPryde/research-assistant',
  },
  pollyfill: {
    key: 'pollyfill',
    title: 'Pollyfill',
    tagline: 'Interactive concept-graph explorer.',
    description:
      'A Next.js app that turns any topic into an interactive knowledge graph. Type a subject, get a node, and extend it by clicking the plus on any node to surface related concepts. Click a node to see how it relates to the topic that spawned it — useful for poking around an unfamiliar field.',
    tech: ['Next.js', 'TypeScript', 'React', 'Tailwind', 'react-dag-editor'],
    github: 'https://github.com/HudsonPryde/Pollyfill',
  },
  'github-task-manager': {
    key: 'github-task-manager',
    title: 'AI GitHub Task Manager',
    tagline: 'Natural-language input, structured GitHub issues out.',
    description:
      'A tool I built to skip the friction of writing GitHub issues by hand. Describe what needs doing in plain language and the agent generates an issue with a clean title, a properly-formatted body, and metadata, then files it on the target repo via the GitHub API. The request/response pipeline is modular so the same flow can be extended to multi-step task generation.',
    tech: ['Next.js', 'TypeScript', 'Cohere LLM', 'Octokit', 'Tailwind'],
    github: 'https://github.com/HudsonPryde/agentic-issue-creation',
  },
};
