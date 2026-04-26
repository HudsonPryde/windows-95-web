import { DesktopData } from './types';
import { WindowData, WindowContentType } from '../window/types';

function dedupeKey(contentType: WindowContentType, data?: Record<string, any>) {
  return data ? `${contentType}:${JSON.stringify(data)}` : contentType;
}

function windowDedupeKey(w: WindowData) {
  return dedupeKey(w.contentType, w.data);
}

let nextWindowId = 1;

export function desktopReducer(state: DesktopData, action: any): DesktopData {
  switch (action.type) {
    case 'create_window': {
      const contentType: WindowContentType = action.data.contentType;
      const title: string = action.data.title;
      const data: Record<string, any> | undefined = action.data.data;

      // Dedupe: if a window with the same contentType+data is already open, bring it to front instead.
      const key = dedupeKey(contentType, data);
      const existing = state.windows.find((w) => windowDedupeKey(w) === key);
      if (existing) {
        return {
          ...state,
          front: state.front + 1,
          activeWindow: existing.id,
          windows: state.windows.map((w) =>
            w.id === existing.id
              ? { ...w, zindex: state.front + 1, visible: true }
              : w
          ),
        };
      }

      const id = nextWindowId++;
      const newWindow: WindowData = {
        title,
        zindex: state.front + 1,
        id,
        visible: true,
        showBottomBarCount: contentType === 'projects',
        contentType,
        data,
      };
      return {
        ...state,
        front: state.front + 1,
        activeWindow: id,
        windows: [...state.windows, newWindow],
      };
    }
    case 'delete_window': {
      const remainingWindows = state.windows.filter(
        (window) => window.id !== action.data.id
      );
      return {
        ...state,
        windows: remainingWindows,
        activeWindow:
          state.activeWindow === action.data.id ? null : state.activeWindow,
      };
    }
    case 'bring_to_front': {
      return {
        ...state,
        front: state.front + 1,
        activeWindow: action.data.id,
        windows: state.windows.map((w) =>
          w.id === action.data.id
            ? { ...w, zindex: state.front + 1, visible: true }
            : w
        ),
      };
    }
    case 'set_active_shortcut': {
      return {
        ...state,
        activeShortcut: action.data.title,
      };
    }
    case 'deactivate_shortcut': {
      return {
        ...state,
        activeShortcut: '',
      };
    }
    case 'hide_window': {
      return {
        ...state,
        activeWindow:
          state.activeWindow === action.data.id ? null : state.activeWindow,
        windows: state.windows.map((w) =>
          w.id === action.data.id ? { ...w, visible: false } : w
        ),
      };
    }
  }
  throw Error('Unknown action: ' + action.type);
}
