import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development')
    .valid('staging')
    .valid('production')
    .default('development'),
  APP_PORT: Joi.number().default(3000),
  APP_NAME: Joi.string().required(),
  BODY_LIMIT: Joi.string().default('100kb'),
  CORS_HEADERS: Joi.string().default(''),
  CORS_METHODS: Joi.string().default('GET POST PUT DELETE OPTIONS'),

  //  DATABASE SETTINGS
  MONGO_DB_NAME: Joi.string().when('MONGO_DB_CONNECTION_STRING_URL', {
    is: Joi.exist(),
    then: Joi.optional(),
    otherwise: Joi.required(),
  }),
  MONGO_DB_HOST: Joi.string()
    .hostname()
    .when('MONGO_DB_CONNECTION_STRING_URL', {
      is: Joi.exist(),
      then: Joi.optional(),
      otherwise: Joi.required(),
    })
    .required(),
  MONGO_DB_PORT: Joi.number().when('MONGO_DB_CONNECTION_STRING_URL', {
    is: Joi.exist(),
    then: Joi.optional(),
    otherwise: Joi.required(),
  }),
  MONGO_DB_PASSWORD: Joi.when('MONGO_DB_CONNECTION_STRING_URL', {
    is: Joi.string().allow(null, ''),
    then: Joi.optional(),
    otherwise: Joi.required(),
  }),
  MONGO_DB_CONNECTION_STRING_URL: Joi.string().allow(null, ''),
  MONGO_DB_CONNECTION_TIME_OUT: Joi.number().default(15000),
  MONGO_DB_ACQUIRE_TIME_OUT: Joi.number().default(15000),
  MONGO_DB_CONNECTION_LIMIT: Joi.number().default(10),

  REDIS_DB_HOST: Joi.string()
    .hostname()
    .when('MONGO_DB_CONNECTION_STRING_URL', {
      is: Joi.exist(),
      then: Joi.optional(),
      otherwise: Joi.required(),
    })
    .required(),
  REDIS_DB_PORT: Joi.number().default(6379),
  REDIS_DB_TTL: Joi.number().default(10),
});
