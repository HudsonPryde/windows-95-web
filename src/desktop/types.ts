import { WindowData } from '../window/types';

export interface DesktopData {
  front: number; // keeps track of the zindex required to pull window to front
  windows: WindowData[];
  shortcuts: Object[];
}
