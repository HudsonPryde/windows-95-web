import { JSX } from 'react';

export type WindowContentType =
  | 'profile'
  | 'resume'
  | 'projects'
  | 'project-detail'
  | 'contact'
  | 'skills'
  | 'about';

export type WindowData = {
  children?: JSX.Element;
  id: number;
  title: string;
  zindex: number;
  visible: boolean;
  icon?: string;
  showBottomBarCount?: boolean;
  contentType: WindowContentType;
  data?: Record<string, any>;
};
