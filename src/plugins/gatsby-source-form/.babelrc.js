module.exports = function (api) {
  api.cache(true);

  const presets = [[
    '@babel/preset-env',
    {
      // Allow importing core-js in entrypoint and use browserlist to select polyfills
      // V3 change, make this entry
      useBuiltIns: 'usage',
      corejs: 3,
      modules: false,
      // debug: true,
      targets: [
        "> 0.5%",
        "last 2 versions",
        "Firefox ESR",
        "not dead"
      ],
      exclude: [
        // Exclude transforms that make all code slower (https://github.com/facebook/create-react-app/pull/5278)
        'transform-typeof-symbol',
      ],
    }
  ],
  "@babel/preset-typescript"
];
  const plugins = [
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: false,
        helpers: true,
        regenerator: true,
        // https://babeljs.io/docs/en/babel-plugin-transform-runtime#useesmodules
        // We should turn this on once the lowest version of Node LTS
        // supports ES Modules.
        useESModules: true,
      }
    ],
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-nullish-coalescing-operator",
    "@babel/plugin-proposal-optional-chaining",
    "@babel/plugin-syntax-dynamic-import",
    [
      "@babel/plugin-proposal-private-property-in-object",
      {
        loose: false
      }
    ]
  ];

  return {
    presets,
    plugins
  };
}
