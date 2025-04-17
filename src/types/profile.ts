export interface IProfile {
  _id: string;
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  birthday: string;
  bio: string;
  avatar: string;
  image: string;
  skills: string[];
  resumeLink: string;
  socialLinks: {
    github?: string;
    linkedin?: string;
    x?: string;
    facebook?: string;
    instagram?: string;
    youtube?: string;
    telegram?: string;
    whatsapp?: string;
  };
  createdAt: string;
  updatedAt: string;
} 