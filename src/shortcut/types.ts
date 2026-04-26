import { WindowContentType } from '../window/types';

export type ShortcutProps = {
  title: string;
  image: string;
  isLink?: boolean;
  link?: string;
  contentType?: WindowContentType;
};
