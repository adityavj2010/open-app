import { WinstonModule } from 'nest-winston';
import { format, transports } from 'winston';

export const logger = WinstonModule.createLogger({
  level: 'info',
  format: format.simple(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new transports.File({ filename: 'logs/info.log' }),
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
  ],
});
