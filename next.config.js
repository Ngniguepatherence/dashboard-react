module.exports = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    api: {
      baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    },
  },
};
