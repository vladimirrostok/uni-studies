module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '721c00bcaae9825569f69143d0bd8acc'),
  },
});
