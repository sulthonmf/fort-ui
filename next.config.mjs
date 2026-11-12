import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  outputFileTracingIncludes: {
    '/api/r/pro/**': ['./server/r/pro/**/*'],
  },
};

export default withMDX(config);
