const path = require('path');

module.exports = [
    {
        entry: './src/mapEditor/boot.ts',
        devtool: 'source-map',
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
        entry: './src/resourceEditor/boot.ts',
        devtool: 'source-map',
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
    },
    {
        entry: './src/game/boot.ts',
        devtool: 'source-map',
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
            path: path.resolve(__dirname, './client/game/js/')
        },
        watch: true
    },
    {
        entry: './src/spriteEditor/boot.ts',
        devtool: 'source-map',
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
            path: path.resolve(__dirname, './client/spriteEditor/js/')
        },
        watch: true
    }
]