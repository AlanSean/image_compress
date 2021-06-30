import { ProtocolAction } from '../actions';

export class ProtocolLoader {
  public static load(): void {
    new ProtocolAction().handle();
  }
}
