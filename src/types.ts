export type ProjectCategory = 'game' | 'script' | 'model' | 'gui' | 'gfx' | 'other';

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  description: string;
  coverImage: string;
  url?: string;
  codeSnippet?: string;
  status: 'public' | 'private' | 'draft';
  visits: number;
  likesRate: number;
  createdAt: string;
  lastUpdated: string;
  version: string;
  tags: string[];
}

export interface DevLog {
  id: string;
  date: string;
  title: string;
  description: string;
  type: 'update' | 'bugfix' | 'release' | 'milestone';
  projectId?: string;
}

export interface AvatarConfig {
  headColor: string;
  torsoColor: string;
  leftArmColor: string;
  rightArmColor: string;
  leftLegColor: string;
  rightLegColor: string;
  faceExpression: 'smile' | 'cool' | 'wink' | 'focused' | 'classic';
  hatType: 'none' | 'fedora' | 'cap' | 'hair' | 'headphones';
  accessory: 'none' | 'glasses' | 'sword' | 'cape';
}

export interface UserProfile {
  username: string;
  displayName: string;
  bio: string;
  statusText: string;
  robux: number;
  devPoints: number;
  avatar: AvatarConfig;
}
