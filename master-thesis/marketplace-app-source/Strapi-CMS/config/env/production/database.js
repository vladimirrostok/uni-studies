module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('DATABASE_HOST', 'test-test-test-test-test-test-test.db.test.com'),
      port: env.int('DATABASE_PORT', 25060),
      database: env('DATABASE_NAME', 'testdbstrapitest'),
      user: env('DATABASE_USERNAME', 'testuser'),
      password: env('DATABASE_PASSWORD', 'testpassword'),
      ssl: {
        rejectUnauthorized: false,
      },
    },
  },
});
