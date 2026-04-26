import { WindowData } from '../window/types';

export interface DesktopData {
  front: number;
  windows: WindowData[];
  activeShortcut: string;
  activeWindow: number | null;
}
