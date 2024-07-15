# Taro 小程序 Monorepo 仓库

## 技术桟

Taro3+React+Typescript+Pnpm+Eslint+Less

## 为什么选择 Monorepo

随着需要开发的小程序逐渐增多，创建项目变的逐渐频繁，仓库也越来越多，增加了维护成本；另外，假如某个小程序的功能比较简单，单独为此创建一个项目就变得似乎并不是很有必要，此时，就可以考虑使用 Monorepo 来管理多个小程序的代码。

使用 Monorepo 可以方便地共享组件、代码和工具库，减少重复的代码量，避免产生相似但有细微不同的代码，提高代码的可维护性和可重用性。此外，Monorepo 还可以使得项目的开发流程更加流畅，因为所有的小程序都可以同时进行构建和部署，同时减少不同仓库之间的协调和沟通成本。

## 项目目录

```
super-miniapp
├─ .editorconfig
├─ .eslintrc
├─ .gitignore
├─ .prettierrc
├─ .vscode
│  └─ settings.json
├─ babel.config.js
├─ package.json
├─ packages
│  └─ demo
│     ├─ config
│     │  ├─ dev.js
│     │  ├─ index.js
│     │  └─ prod.js
│     ├─ package.json
│     ├─ project.config.json
│     ├─ project.private.config.json
│     ├─ project.tt.json
│     ├─ src
│     │  ├─ api
│     │  │  └─ index.ts
│     │  ├─ app.config.ts
│     │  ├─ app.module.less
│     │  ├─ app.ts
│     │  ├─ index.html
│     │  └─ pages
│     │     └─ index
│     │        ├─ index.config.ts
│     │        ├─ index.module.less
│     │        └─ index.tsx
│     └─ tsconfig.json
├─ pnpm-lock.yaml
├─ pnpm-workspace.yaml
├─ README.md
├─ tsconfig.json
├─ types
│  └─ global.d.ts
└─ utils
   ├─ env.ts
   └─ request.ts

```

## 快速开始

> 项目示例为微信小程序，编译更多小程序请修改脚本

拉取代码后在根目录执行

```shell
  pnpm i
```

> 所有项目启动和打包均为 pnpm dev:weapp:子项目名，以下的 demo 便是 packages 下的项目文件夹名；需要注意的是，在开发调试中，这个目录(packges/demo)需要用微信开发者工具打开进来调试

### 启动

```shell
  pnpm dev:weapp:demo
```

### 打包

```shell
  pnpm build:weapp:demo
```

打包后的产物会生成 dist 目录在 packages/项目名 下

### 开发指南

> packages 下的 demo 文件夹作为新项目的模版，因此不建议删除

从模版创建

```shell
  pnpm generate projectName
```

### 注意点

#### 引用路径

packages/demo 下的项目 @/映射为 packages/demo/src，如在 demo 项目里

```js
import { xxx } from '@/api/index';
```

@root 则映射为 本 monorepo 项目的根目录， 以便于子项目引用根目录下的资源

#### 设计稿尺寸问题

由于设计师提供的设计稿基本均为 375 尺寸，故默认模版修改为 375，相关配置在`packages/demo/config/index` 中

```js
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
    375: 2 / 1,
  }
```
