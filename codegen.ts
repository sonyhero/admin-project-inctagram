import { CodegenConfig } from '@graphql-codegen/cli'

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
    afterAllFileWrite: ['prettier --write'],
  },
  ignoreNoDocuments: true, // for better experience with the watcher
  schema: 'https://inctagram.work/api/v1/graphql',
}

export default config
