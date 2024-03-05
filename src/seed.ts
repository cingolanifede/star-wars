import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SeederModule } from './core/database/seeders/seeder.module';
import { Seeder } from './core/database/seeders/seeder';

async function boostrap() {
  const context = await NestFactory.createApplicationContext(SeederModule);
  const logger = context.get(Logger);
  const seeder = context.get(Seeder);
  try {
    await seeder.seed();
    logger.log('Seeding complete!');
  } catch (err) {
    logger.error('Seeding failed!');
    throw err;
  } finally {
    context.close();
  }
}

boostrap();
