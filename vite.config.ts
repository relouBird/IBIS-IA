import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        filtering: resolve(__dirname, "filtering.html"),
        fan: resolve(__dirname, "fan.html"),
        feeder: resolve(__dirname, "feeder.html"),
      },
    },
  },
});
