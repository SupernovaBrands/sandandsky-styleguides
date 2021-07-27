module.exports = {
	presets: [
		['@babel/preset-env', { targets: 'defaults' }],
		'@babel/preset-react'
	],
	plugins: [
		'@babel/plugin-transform-runtime',
		['@babel/plugin-proposal-class-properties', { loose: true }],
		'@babel/plugin-syntax-dynamic-import',
		[
			'module-resolver',
			{
				cwd: 'babelrc',
				extensions: [
					'.js',
					'.jsx',
					'.js.liquid',
				],
				alias: {
					'~vendor': './src/js/vendor',
					'~mod': './src/js/modules',
					'~comp': './src/js/components',
					'~rt': './src/js/templates',
					'~svg': './fonts/svgs',
					'testHelpers': './__tests__/testHelpers'
				}
			}
		],
	]
};
