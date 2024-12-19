import { DesktopData } from './types';

export function desktopReducer(state: DesktopData, action: any): any {
  switch (action.type) {
    case 'create_window': {
      return {
        ...state,
        windows: [
          ...state.windows,
          {
            title: action.data.title,
            zindex: state.front + 1,
            id: state.windows.length + 1,
          },
        ],
      };
    }
    case 'bring_to_front': {
      return {
        ...state,
        front: state.front + 1,
        windows: state.windows.map((w) => {
          if (w.id === action.data.id) {
            w.zindex = state.front + 1;
          }
          return w;
        }),
      };
    }
  }
  throw Error('Unknown action: ' + action.type);
}