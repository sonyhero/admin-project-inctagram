import { CodegenConfig } from '@graphql-codegen/cli'

export const URL_SCHEMA = 'https://inctagram.work/api/v1/graphql'

const config: CodegenConfig = {
  documents: ['src/**/*.graphql'],
  generates: {
    'src/': {
      config: {
        withHooks: true,
      },
      plugins: ['typescript-operations', 'typescript-react-apollo'],
      preset: 'near-operation-file',
      presetConfig: {
        baseTypesPath: '../src/shared/api/generated/types.generated.ts',
        extension: '.generated.tsx',
      },
    },
    'src/shared/api/generated/types.generated.ts': { plugins: ['typescript'] },
  },
  hooks: {
    afterAllFileWrite: `node -p "const { execSync } = require('child_process'); const generatedFilePaths = process.argv.slice(1).map((generatedFilePath) => generatedFilePath.replaceAll(String.fromCharCode(92), '')); execSync('pnpm eslint --fix ' + generatedFilePaths.join(' '));"`,
  },
  ignoreNoDocuments: true, // for better experience with the watcher
  schema: URL_SCHEMA,
}

export default config
