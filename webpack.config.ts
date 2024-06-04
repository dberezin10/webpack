
import {buildWebpack} from "./config/build/buildWebpack";
import {BuildPaths, EnvVariables} from "./config/build/types/types";
import path from "path";



export default (env: EnvVariables) => {
    console.log('env', env)

    const isDev = env.mode === "development";
    const isProd = env.mode === "production";


    const paths: BuildPaths = {
        output: path.resolve(__dirname, 'build'),
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        html: path.resolve(__dirname, 'public', 'index.html'),
        src: path.resolve(__dirname, 'src'),
    }


    return buildWebpack({
        port: env.port ?? 5000,
        mode: env.mode ?? "production",
        paths,
        analyzer: env.analyzer,
    })
}