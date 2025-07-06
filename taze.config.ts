import { defineConfig } from 'taze'

export default defineConfig({
  // ignore packages from bumping
  exclude: [
    'webpack',
    'expo',
  ],
  force: false,
  write: false,
  install: false,
  ignorePaths: [
    '**/node_modules/**',
    '**/test/**',
  ],
  // ignore package.json that in other workspaces (with their own .git,pnpm-workspace.yaml,etc.)
  ignoreOtherWorkspaces: true,
  // override with different bumping mode for each package
  packageMode: {
  },
  // disable checking for "overrides" package.json field
  depFields: {
  },
})
