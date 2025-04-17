export interface ISkill {
  _id: string;
  name: string;
  type: 'technical' | 'soft' | 'tool';
  category: string;
  proficiency: number;
  yearsOfExperience: number;
  description?: string;
  icon?: string;
  createdAt: string;
  updatedAt: string;
} 