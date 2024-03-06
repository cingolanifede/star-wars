import { DBConnectionService } from '../../core/abstracts/db-connection.service';

export class DBConnectionMockService implements DBConnectionService {
  onConnected(callback?: () => void): void {}
  onDisconnected(callback?: () => void): void {}
  onError(callback?: (error: any) => void): void {}
  isConnected(): boolean {
    return;
  }
  //   onConnected(callback?: () => void): void;
  //   onDisconnected(callback?: () => void): void;
  //   onError(callback?: (error: any) => void): void;
  //   isConnected(): boolean;
  //   validateValue<TValue>(
  //     value: TValue,
  //     validator: AnySchema,
  //     label: string,
  //   ): void {
  //     return;
  //   }
}
