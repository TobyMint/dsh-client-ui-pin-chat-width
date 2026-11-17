# dsh-client-ui-pin-chat-width

DSH Web GUI 的一个极小插件：**把对话列宽度钉住**。

对话列的两侧有两条不可见的拖拽把手（`[data-width-handle]`），拖动它们会改列宽，
输入框的最大宽度也跟着变（content width + 32px）。这个插件只注入一条 CSS 把它们隐藏掉，
让误触拖拽成为不可能；它**不改任何宽度数值**，`localStorage["dsh.conversation.contentWidth"]`
里已保存的宽度原样保留。

## 实现

- `lib/index.js`：host 半，一个空的 `apply`，只为 Loader 里占一行。
- `lib/client.js`：浏览器半，插入一条
  `[data-width-handle]{display:none!important}` 的 `<style>`，并挂到插件 fiber 上
  （`ctx.effect`），插件卸载时样式自动移除。

两条规则加起来 42 行，没有配置项、没有持久化、不碰任何 DSH 内部状态。

## 安装

这个包不是 bundle（没有 `dsh.bundle` 声明），装法是两步：

```bash
# 1) 装上依赖（或本地开发时用 link:/path/to/checkout）
dsh plugin --profile web add github:TobyMint/dsh-client-ui-pin-chat-width#v0.1.0
```

在 profile 的 `cordis.patch.yml` 里插入插件行：

```yaml
- insert:
    - id: pin-chat-width
      name: "dsh-client-ui-pin-chat-width"
```

然后重启 `dsh web`。卸载反过来：删掉这段 insert、再
`dsh plugin --profile web remove dsh-client-ui-pin-chat-width`。

## License

Apache-2.0，见 [LICENSE](./LICENSE)。
