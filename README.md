# dsh-client-ui-pin-chat-width

DSH Web GUI 的一个极小组合包：**把对话列宽度钉住**。

对话列的两侧有两条不可见的拖拽把手（`[data-width-handle]`），拖动它们会改列宽，
输入框的最大宽度也跟着变（content width + 32px）。这个插件只注入一条 CSS 把它们隐藏掉，
让误触拖拽成为不可能；它**不改任何宽度数值**，`localStorage["dsh.conversation.contentWidth"]`
里已保存的宽度原样保留。

## 实现

- `lib/index.js`：host 半，导出 `name` 和一个空的 `apply`，只为 Loader 里占一行。
- `lib/client.js`：浏览器半，插入一条
  `[data-width-handle]{display:none!important}` 的 `<style>`，并挂到插件 fiber 上
  （`ctx.effect`），插件卸载时样式自动移除。
- `cordis.patch.yml`：bundle 层，插入 `pin-chat-width` 这一行。

没有配置项、没有持久化、不碰任何 DSH 内部状态。

## 安装

这是一个标准 DSH 组合包（`package.json` 里声明了 `dsh.bundle.patch`），因此可以像官方
插件一样，在 Web 侧边栏的**插件**页直接安装、启用或卸载。

手动安装则是两步：

```bash
# 1) 装依赖（固定 tag；本地开发时改用 link:/path/to/checkout）
dsh plugin --profile web add github:TobyMint/dsh-client-ui-pin-chat-width#v0.2.0
```

2) 把 `dsh-client-ui-pin-chat-width` 加进 profile `package.json` 的
`dsh.profile.bundles`，然后重启 `dsh web`。注意：这个包自己会插入
`pin-chat-width` 这一行，所以**不要**再在 `cordis.patch.yml` 里手写同名 insert，
否则会重复定义同一个 id。

## License

Apache-2.0，见 [LICENSE](./LICENSE)。
