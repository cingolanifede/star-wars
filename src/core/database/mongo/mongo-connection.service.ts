import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { DBConnectionService } from '../../abstracts/db-connection.service';

@Injectable()
export class MongoConnectionService implements DBConnectionService {
  constructor(@InjectConnection() private readonly dbConnection: Connection) {}

  onConnected(callback?: () => void): void {
    this.dbConnection.on('connected', () => {
      if (callback) callback();
    });
  }

  onDisconnected(callback?: () => void): void {
    this.dbConnection.on('disconnected', () => {
      if (callback) callback();
    });
  }

  onError(callback?: (error) => void): void {
    this.dbConnection.on('error', (err) => {
      if (callback) callback(err);
    });
  }

  isConnected(): boolean {
    return this.dbConnection.readyState === 1;
  }
}
