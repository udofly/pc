import { createApp } from 'vue'
import 'element-plus/dist/index.css'
import 'ant-design-vue/dist/antd.css'
// route
import router from '@/router/index'
import { key, store } from '@/store'
import App from './App.vue'
import useAntUi from '@/utils/ant-ui';
import useVantUi from '@/utils/vant-ui';
import * as Sentry from '@sentry/vue';
import { Integrations } from '@sentry/tracing';
import { appIsProd, appMode, appVersion, sentryDsnUrl } from '@/utils/conf';
import ElementPlus from 'element-plus'
import '@/assets/style/index.less';
import '@/assets/style/style.less';
import '@/assets/style/_element.less';

// vant basic
import 'vant/es/style/base.less'

const app = createApp(App)

app.use(ElementPlus);

// Sentry.init({
//     app,
//     dsn: sentryDsnUrl,
//     release: `${appMode}-${appVersion}`,
//     environment: appMode,
//     beforeSend: (event: any) => {
//         if (!appIsProd) {
//             return null;
//         }
//         return event
//     },
//     integrations: [
//         new Integrations.BrowserTracing({
//             routingInstrumentation: Sentry.vueRouterInstrumentation(router),
//             tracingOrigins: ['kejinshou.com', 'dev.kejinshou.iliexiang.com', 't.kejinshou.iliexiang.com', /^\//]
//         })
//     ],
//     // 开发环境下不抛出错误
//     sampleRate: appIsProd ? 1 : 0,
//
//     // 线上环境捕捉 1%, 开发环境捕捉完整
//     // https://docs.sentry.io/platforms/javascript/guides/vue/configuration/sampling/#setting-a-sampling-function
//     tracesSampler: () => 0
// });

useVantUi(app)
useAntUi(app)
    .use(router)
    .use(store, key)
    .mount('#app');
