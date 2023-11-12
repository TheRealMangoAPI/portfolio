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

    return config;
  },
};

module.exports = nextConfig;
