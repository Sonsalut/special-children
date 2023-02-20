module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          '@src/assets': './src/assets',
          '@src/common': './src/common',
          '@src/components': './src/components',
          '@src/hooks': './src/hooks',
          '@src/mocks': './src/mocks',
          '@src/network': './src/network',
          '@src/redux': './src/redux',
          '@src/res': './src/res',
          '@src/routers': './src/routers',
          '@src/screens': './src/screens',
          '@src/types': './src/types',
          '@src/utils': './src/utils',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
