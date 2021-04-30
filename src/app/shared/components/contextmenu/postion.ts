import { ConnectedPosition } from '@angular/cdk/overlay';
interface connectedPosition {
  [key: string]: ConnectedPosition;
}
export const connectedPosition: connectedPosition = {
  contextmenu: {
    originX: 'end',
    originY: 'center',
    overlayX: 'start',
    overlayY: 'center'
  },
  hover: {
    originX: 'center',
    originY: 'bottom',
    overlayX: 'center',
    overlayY: 'top'
  }
};
