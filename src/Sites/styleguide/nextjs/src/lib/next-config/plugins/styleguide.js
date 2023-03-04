/**
 * @param {import('next').NextConfig} nextConfig
 */
const styleguidePlugin = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    i18n: {
      ...nextConfig.i18n,
      locales: ['en', 'es-ES'],
    },
  });
};

module.exports = styleguidePlugin;
