export type PageId =
  | 'home'
  | 'about'
  | 'solutions'
  | 'courses'
  | 'who-we-serve'
  | 'contact'
  | 'login'
  | 'signup'
  | 'forgot-password';

export interface SolutionItem {
  id: string;
  number?: string;
  title: string;
  tagline: string;
  summary: string;
  description: string;
  whoItIsFor: string[];
  subServices: string[];
  icon: string;
  accentColor: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  organization?: string;
  avatarText?: string;
  quote: string;
  rating?: number;
  featured?: boolean;
  date?: string;
  category?: string;
}

export interface CourseItem {
  id: string;
  title: string;
  category: 'Digital Skills' | 'Instructional Design' | 'AI & Technology' | 'Online Teaching' | 'LMS' | 'Course Creation';
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  duration: string;
  format: string;
  price?: string;
  description: string;
  secondaryDescription?: string;
  whoIsItFor?: string[];
  whatYouLearn: string[];
  featured?: boolean;
}

export interface AudienceItem {
  id: string;
  title: string;
  shortDesc: string;
  icon: string;
  needs: string[];
  howWeHelp: string;
  recommendedSolutions: string[];
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  role: string;
  serviceInterest: string;
  message: string;
}
