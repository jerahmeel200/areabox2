// next.config.js
const withPlugins = require('next-compose-plugins');
const withTM = require('next-transpile-modules')([
  'react-leaflet',
  '@react-leaflet/core'
]);

const allowedOrigins = [
  'https://areabox.app',
  'https://www.areabox.app',
  'https://areabox-firebase.vercel.app',
  'https://areabox-firebase-areaboi.vercel.app',
  'https://areabox-firebase-git-reverb-development-firebase9-areaboi.vercel.app'
];

module.exports = withPlugins(
  [
    [
      withTM,
      {
        env: {
          IPFS_PROJECT_ID: process.env.IPFS_PROJECT_ID,
          IPFS_PROJECT_SECRET: process.env.IPFS_PROJECT_SECRET
        },
        webpack: (config, { webpack, isServer }) => {
          if (!isServer) {
            config.resolve.fallback.fs = false;
            config.resolve.fallback.net = false;
          }
          config.module.rules.push({
            test: /\.(png|jpe?g|gif|svg)$/i,
            type: 'asset',
            generator: {
              filename: 'static/chunks/[path][name].[hash][ext]'
            }
          });

          config.plugins.push(
            new webpack.WatchIgnorePlugin({ paths: [/^electron$/] })
          );

          return config;
        },
        distDir: '../../dist/client'
      }
    ]
  ],
  {
    publicRuntimeConfig: {
      apiUrl:
        process.env.NODE_ENV === 'production'
          ? 'https://areabox.app'
          : 'http://localhost:3000'
    },
    async headers() {
      return [
        {
          source: '/api/:path*',
          headers: [
            { key: 'Access-Control-Allow-Credentials', value: 'true' },
            {
              key: 'Access-Control-Allow-Origin',
              value: allowedOrigins.join(', ')
            },
            {
              key: 'Access-Control-Allow-Methods',
              value: 'GET, POST, OPTIONS, PUT, DELETE'
            },
            {
              key: 'Access-Control-Allow-Headers',
              value:
                'X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
            }
          ]
        }
      ];
    }
  }
);
