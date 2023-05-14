# umi3 集成 unocss

> umi4 提供了内置的 [UnoCSS 插件](https://umijs.org/docs/guides/styling#使用-unocss)
>
> 但是项目使用的是 [umi3](https://v3.umijs.org/zh-CN/docs) 没有找到对应的插件



## 使用 unocss/webpack

1. 安装 UnoCSS 文档安装 [UnoCSS Webpack 插件](https://unocss.dev/integrations/webpack)

2. 在 umi 的配置文件中使用 unocss

```ts
import { defineConfig } from 'umi';
import UnoCSS from 'unocss/webpack'

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
  ],
  fastRefresh: {},
  chainWebpack(config) {
    // 导入 unocss
    config.plugin('unocss').use(UnoCSS())
  }
});

```

3. 效果

```ts
export default function IndexPage() {
  return (
    <div className='flex flex-col items-center text-xl space-y-4'>
      <div className='c-red text-xl font-bold'>unocss</div>
      <div className="i-ph-anchor-simple-thin" />
      <div className="i-mdi-alarm text-orange-400" />
      <div className="i-logos-vue text-3xl" />
      <button className="i-carbon-sun dark:i-carbon-moon" />
      <div className="i-twemoji-grinning-face-with-smiling-eyes hover:i-twemoji-face-with-tears-of-joy" />
    </div>
  );
}
```



![image-20230514201318171](.\assets\image-20230514201318171.png)

---

### 存在问题

运行 build 命令，出现错误

![image-20230514201441737](.\assets\image-20230514201441737.png)

貌似是因为 [presetIcons](https://unocss.dev/presets/icons) 的问题，在 unocss.config.ts 中将 presetIcons 删除，可以正常打包

尝试使用 [@unocss/postcss](https://unocss.dev/integrations/postcss)，还是存在打包错误



---

## 使用 unocss/cli

> 找了一圈 没有找到解决上述问题的办法
>
> 尝试使用 unocss/cli 生成 css

1. 在 `package.json` 中添加 `unocss/cli` 命令

```json
"scripts": {
    "unocss:dev": "unocss src/pages/**/*.tsx --watch -o src/uno.css",
    "unocss:build": "unocss src/pages/**/*.tsx  -o  src/uno.css"
},
```

2. 同时运行 `unocss:dev` 和 `start` 命令

   1. 安装 concurrently

   ```
    ni -D concurrently
   ```

   2. 开发时同时运行 unocss 和 umi

   ```json
   "dev": "concurrently \"npm run unocss:dev\" \"npm run start\"",
   "start": "umi dev",
   "unocss:dev": "unocss src/pages/**/*.tsx --watch -o src/uno.css",
   ```

   3. 打包先运行 unocss ，再执行打包

   ```json
   "build": "yarn run unocss:build && umi build",
   "unocss:build": "unocss src/pages/**/*.tsx -o src/uno.css"
   ```

3. 在入口导入生成的 uno.css

```js
import 'uno.css'
```



> presetIcons 打包错误问题消失
>
> [github demo 地址](https://github.com/MellowCo/unocss-umi3)
