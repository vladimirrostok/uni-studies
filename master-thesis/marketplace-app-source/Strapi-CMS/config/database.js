module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('DATABASE_HOST', 'localhost'),
      port: env.int('DATABASE_PORT', 6500),
      database: env('DATABASE_NAME', 'strapitest'),
      user: env('DATABASE_USERNAME', 'username'),
      password: env('DATABASE_PASSWORD', 'password'),
      ssl: {
        rejectUnauthorized: false, // For self-signed certificates
      },
    },
  },
});
