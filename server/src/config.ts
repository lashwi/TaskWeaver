import dotenv from 'dotenv';

dotenv.config();

const config = {
  DATABASE_URL: process.env.DATABASE_URL,
  PORT: process.env.PORT || '3000',
};

type Config = Required<typeof config>;

// Validate config
const validateConfig = (config: Config) => {
  for (const key of Object.keys(config) as Array<keyof Config>) {
    if (!config[key]) {
      throw new Error(`Missing ${key}`);
    }
  }
};

validateConfig(config);

export default config as Config;
