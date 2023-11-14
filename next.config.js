/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Add a loader for GLB files
    config.module.rules.push({
      test: /\.glb$/,
      use: [
        {
          loader: "file-loader",
          options: {
            publicPath: "/_next/static/files",
            outputPath: `${isServer ? "../" : ""}static/files`,
            name: "[name]-[hash].[ext]",
          },
        },
      ],
    });

    // Add a loader for MP3 files
    config.module.rules.push({
      test: /\.(ogg|mp3|wav|mpe?g)$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
            publicPath: '/_next/static/sounds',
            outputPath: 'static/sounds',
          },
        },
      ],
    });

    return config;
  },
};

module.exports = nextConfig;
