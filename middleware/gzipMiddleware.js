import compression from "compression";
export const gzipCompression = compression({
  filter: (req, res) => {
    if (req.headers["x-no-compression"]) {
      return false;
    }
    return compression.filter(req, res);
  },
  threshold: 1024, // 1kb o mas comprime
  zlib: {
    level: 3,
  },
});