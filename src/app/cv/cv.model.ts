export interface Cv {
  personalInfo: PersonalInfo;
  profileHighlights?: string[];
  featuredSkills?: string[];
  displaySections?: DisplaySections;
  professionalSummary: string;
  workExperience: WorkExperience[];
  education: Education[];
  technicalSkills: TechnicalSkills;
  languages: Language[];
}

export interface PersonalInfo {
  name: string;
  title: string;
  subtitle?: string;
  location?: string | null;
  email?: string | null;
  phone?: string | null;
  links?: CvLink[];
}

export interface CvLink {
  label: string;
  url: string;
  icon?: string;
}

export interface DisplaySections {
  showContact?: boolean;
  showProfileHighlights?: boolean;
  showFeaturedSkills?: boolean;
  showTechnicalSkills?: boolean;
  showLanguages?: boolean;
  showEducation?: boolean;
  showExperienceTags?: boolean;
}

export interface WorkExperience {
  id: string;
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string | null;
  periodLabel: string;
  current: boolean;
  highlights: string[];
  tags: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  graduationYear: number;
}

export interface TechnicalSkills {
  languages: string[];
  frameworksAndPlatforms: string[];
  ai: string[];
  practices: string[];
}

export interface Language {
  name: string;
  level: string;
}
