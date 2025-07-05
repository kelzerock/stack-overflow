import type { Configuration } from 'lint-staged';

const lintStagedConfig: Configuration = {
  '**/*.json': (stagedFiles) => `prettier --write ${stagedFiles.join(' ')}`,
  '**/*.{ts,tsx}': (stagedFiles) => [
    `prettier --write ${stagedFiles.join(' ')}`,
    `eslint ${stagedFiles.join(' ')}`,
  ],
};

export default lintStagedConfig;
