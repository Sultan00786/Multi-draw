// import { config } from "dotenv";
// import path from "path";
// import { fileURLToPath } from "url";

// // get current file path
// const __filename = fileURLToPath(import.meta.url);
// // get directory name from file path
// const __dirname = path.dirname(__filename);

// const envPath = path.resolve(__dirname, "../.env"); // adjust if needed
// config({ path: envPath });

// // config({ path: path.resolve(process.cwd(), ".env") });

// export const JWT_TOKEN = process.env.JWT_TOKEN || "JWT_TOKEN";
// export const DATABASE_URL = process.env.DATABASE_URL || null;

import { config } from "dotenv";
import path from "path";
import fs from "fs";

// Walk up from process.cwd() to find our package
function findPackageRoot() {
  let currentDir = process.cwd();

  // First, try to find any package.json with our package name
  while (currentDir !== path.parse(currentDir).root) {
    const packageJsonPath = path.join(currentDir, "package.json");
    if (fs.existsSync(packageJsonPath)) {
      try {
        const pkg = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
        if (pkg.name === "@repo/backend-common") {
          return currentDir;
        }
      } catch (e) {
        // Continue searching
      }
    }
    currentDir = path.dirname(currentDir);
  }

  // Fallback: look in common locations
  const commonPaths = [
    path.resolve(process.cwd(), "packages/backend-common"),
    path.resolve(process.cwd(), "../backend-common"),
    path.resolve(process.cwd(), "../../packages/backend-common"),
  ];

  for (const testPath of commonPaths) {
    if (fs.existsSync(path.join(testPath, "package.json"))) {
      return testPath;
    }
  }

  throw new Error("Could not find @repo/backend-common package directory");
}

const packageRoot = findPackageRoot();
const envPath = path.resolve(packageRoot, ".env");

console.log("Found package root:", packageRoot);
console.log("Looking for .env at:", envPath);

config({ path: envPath });

export const JWT_TOKEN = process.env.JWT_TOKEN || "JWT_TOKEN";
export const DATABASE_URL = process.env.DATABASE_URL || null;
