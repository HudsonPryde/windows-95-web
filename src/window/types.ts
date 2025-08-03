import { JSX } from 'react';

export type WindowData = {
  children?: JSX.Element;
  id: number;
  title: string;
  zindex: number;
  visible: boolean;
  icon?: string;
  showBottomBarCount?: boolean;
};
