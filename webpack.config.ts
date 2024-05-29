import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import webpack from "webpack";
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import type { Configuration } from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

type Mode = "development" | "production";

interface EnvVariables {
    mode: Mode
    port: number
}

export default (env: EnvVariables) => {
    console.log('env', env)

    const isDev = env.mode === "development";
    const isProd = env.mode === "production";

    // const devServer: DevServerConfiguration = isDev ? {
    //     port: env.port ?? 6000,
    //     open: true,
    // } : undefined


    const config: Configuration = {
        mode: env.mode ?? 'development',
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        module: {
            rules: [
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        // Creates `style` nodes from JS strings
                        isDev ? 'style-loader' :MiniCssExtractPlugin.loader,
                        // Translates CSS into CommonJS
                        "css-loader",
                        // Compiles Sass to CSS
                        "sass-loader",
                    ],
                },
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: '[name].[contenthash].js',
            clean: true
        },
        plugins: [
            new HtmlWebpackPlugin({template: path.resolve(__dirname, 'public', 'index.html')}),
            isProd && new MiniCssExtractPlugin({
                filename: "css/[name].[contenthash:8].css",
                chunkFilename: "css/[name].[contenthash:8].css",
            })],
        optimization: {
            runtimeChunk: 'single',
        },
        devtool: isDev ? "inline-source-map" : false,
        devServer: isDev ? {
            port: env.port ?? 6000,
            open: true,
        } : undefined,
    };
    return config
}