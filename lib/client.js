window.__ModuleLoader__.load({
	id: "dsh-client-ui-pin-chat-width",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		//#region lib/client.js
		/** Package id; also the owning style tag's `data-plugin` value. */
		const PLUGIN_ID = "dsh-client-ui-pin-chat-width";
		/**
		* The two invisible drag handles that resize the transcript column (and with
		* it the composer, whose max width is the content width + 32px). Hiding them
		* keeps the stored width in localStorage["dsh.conversation.contentWidth"]
		* untouched and makes an accidental drag impossible.
		*/
		const STYLE_TEXT = "[data-width-handle]{display:none!important}";
		/**
		* Inject the pin rule once per page and tie its tag to this plugin's fiber.
		* @param ctx - client Cordis context.
		*/
		function apply(ctx) {
			const tag = document.createElement("style");
			tag.dataset.plugin = PLUGIN_ID;
			tag.dataset.pluginCss = `${PLUGIN_ID}/pin-chat-width.css`;
			tag.textContent = STYLE_TEXT;
			document.head.appendChild(tag);
			ctx.effect(() => () => tag.remove(), "pin-chat-width: width handle style");
		}
		//#endregion
		exports.apply = apply;
		return module.exports;
	}
});
