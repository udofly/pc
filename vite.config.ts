import vue from '@vitejs/plugin-vue'
// import viteSentry from 'vite-plugin-sentry'
import mkcert from 'vite-plugin-mkcert'
// 获取 package 的版本号
import pkgJson from './package.json';
// 如果编辑器提示 path 模块找不到，则可以安装一下 @types/node -> npm i @types/node -D
import { resolve } from 'path'
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    // 读取环境变量放置到代码中
    const fs = require('fs')
    const dotenv = require('dotenv')
    const envFiles = [
        `./config/.env`, // default file
        `./config/.env.${mode}` // mode file
    ]
    const buildPath = '/'
    for (const file of envFiles) {
        const envConfig = dotenv.parse(fs.readFileSync(file))
        for (const k in envConfig) {
            process.env[k] = envConfig[k]
        }
    }

    let project = `kejinshou-pc-${mode}`;
    if (mode.indexOf('hwm') != -1) {
        project = `haowanme-pc-${mode}`.replace('-hwm', '');
    }

    return {
        envDir: './config/',
        plugins: [
            vue(),
            // https : 用于浏览器通知
            mkcert(),
            // 使用 NODE_ENV, production 时候才会执行错误搜集
//             viteSentry({
//                 debug: true,
//                 url: process.env.VITE_SENTRY_URL,
//                 authToken: String(process.env.VITE_SENTRY_TOKEN),
//                 org: 'dadi',
//                 project: 'kejinshou-pc',
//                 release: `${mode}-${pkgJson.version}`,
//                 deploy: {
//                     env: `${mode}`
//                 },
//                 setCommits: {
//                     auto: false
//                 },
//                 sourceMaps: {
//                     include: [
//                         `build/${project}/assets`
//                     ],
//                     ignore: ['node_modules'],
//                     urlPrefix: '~/assets'
//                 }
//             })
        ],
        resolve: {
            alias: {
                '@': resolve(__dirname, 'src/') // 设置 `@` 指向 `src` 目录
            }
        },
        base: buildPath,
        define: {
            'import.meta.env.DEF_APP_VERSION': JSON.stringify(pkgJson.version),
            'import.meta.env.DEF_APP_PATH': JSON.stringify(buildPath),
        },
        build: {
            target: 'es2015',
            outDir: `build/${project}`,
            sourcemap: true,
            minify: 'terser',
            terserOptions: {
                compress: {
                    drop_console: true
                }
            },
            rollupOptions: {
                input: {
                    index: resolve(__dirname, 'index.html'),
                    haowanme: resolve(__dirname, 'haowanme.html'),
                },
                output: {
                    manualChunks: {
                        vendor: ['lodash-es', 'crypto-js']
                    }
                }
            }
        },
        server: {
            // https: true,
            port: 9241, // 设置服务启动端口号
            cors: true, // 允许跨域
            host: '0.0.0.0'
        }
    }
});
