/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  distDir: "build",
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    config.module.rules.push({
      test: /\.(glsl|frag|vert)$/,
      use: [
        'raw-loader',
        'glslify-loader',
      ]
    })


    return config;
  }
};

module.exports = nextConfig;
