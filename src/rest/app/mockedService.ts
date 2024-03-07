import { DBConnectionService } from '../../core/abstracts/db-connection.service';

export class DBConnectionMockService implements DBConnectionService {
  onConnected(callback?: () => void): void {}
  onDisconnected(callback?: () => void): void {}
  onError(callback?: (error: any) => void): void {}
  isConnected(): boolean {
    return;
  }
}
