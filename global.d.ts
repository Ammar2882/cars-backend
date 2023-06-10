namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string;
    PORT: string;
    MONGO_URI: string;
    DB_NAME: string;
    EMAIL_SERVICE_ACCOUNT: string
    EMAIL_SERVICE_ACCOUNT_PASSWORD: string
    SECRET_KEY: string
    EMAIL_KEY:string
  }
}