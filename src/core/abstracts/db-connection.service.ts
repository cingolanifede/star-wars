export abstract class DBConnectionService {
  abstract onConnected(callback?: () => void): void;

  abstract onDisconnected(callback?: () => void): void;

  abstract onError(callback?: (error: any) => void): void;

  abstract isConnected(): boolean;
}
