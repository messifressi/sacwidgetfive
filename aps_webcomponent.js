(function() {
	let template = document.createElement("template");
	template.innerHTML = `
		<form id="form">
			<fieldset>
				<legend>Tile Header</legend>
				<table>
					<tr>
						<td>Text</td>
						<td><input id="aps_text" type="string"></td>
					</tr>
				</table>
			</fieldset>
		</form>	
	`;

	class TileAps extends HTMLElement {
		constructor() {
			super();
			this._shadowRoot = this.attachShadow({mode: "open"});
			this._shadowRoot.appendChild(template.content.cloneNode(true));
			this._shadowRoot.getElementById("form").addEventListener("submit", this._submit.bind(this));
		}

		_submit(e) {
			e.preventDefault();
			this.dispatchEvent(new CustomEvent("propertiesChanged", {
					detail: {
						properties: {
							tileHeaderText: this.tileHeaderText
						}
					}
			}));
		}

		set tileHeaderText(newText) {
			this._shadowRoot.getElementById("aps_text").value = newText;
		}

		get tileHeaderText() {
			return this._shadowRoot.getElementById("aps_text").value;
		}
	}

customElements.define("com-sap-sample-tile-aps", TileAps);
})();
