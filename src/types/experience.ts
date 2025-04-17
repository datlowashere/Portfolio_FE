export interface IExperience {
  _id: string;
  type: 'work' | 'education';
  category: string;
  title: string;
  organization: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  achievements?: string[];
  technologies?: string[];
  certificationUrl?: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
} 