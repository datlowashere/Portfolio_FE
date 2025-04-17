export interface Project {
  _id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  category: 'Android App' | 'iOS App' | 'Cross-platform App' | 'Web development' | 'UX/UI';
  createdAt: string;
  updatedAt: string;
} 