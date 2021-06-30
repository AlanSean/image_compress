import { menuAction } from '../actions';

export class MenuLoader {
  public static load(): void {
    menuAction.setMenu();
  }
}
