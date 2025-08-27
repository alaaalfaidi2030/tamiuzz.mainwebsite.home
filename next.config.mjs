import Pkg from "./next-i18next.config.js";
const { i18n } = Pkg;
/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n,
};

export default nextConfig;
