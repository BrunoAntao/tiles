const path = require('path');

module.exports = [
    {
        entry: './dist/mapEditor/boot.js',
        devtool: 'inline-source-map',
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/
                }
            ]
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js']
        },
        output: {
            filename: 'main.js',
            path: path.resolve(__dirname, './client/mapEditor/js/')
        },
        watch: true
    },
    {
        entry: './dist/resourceEditor/boot.js',
        devtool: 'inline-source-map',
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/
                }
            ]
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js']
        },
        output: {
            filename: 'main.js',
            path: path.resolve(__dirname, './client/resourceEditor/js/')
        },
        watch: true
    }
]