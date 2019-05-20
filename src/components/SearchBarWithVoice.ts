import VoiceInput from "./VoiceInput";
import SearchBar from "./SearchBar";

const template = document.createElement("template");
template.innerHTML = `
	<style>
		:host {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100%;
		}
		:host > input {
			width: 500px;
			border: none;
			border-bottom: 4px solid rgba(165, 127, 96, 0.4);
			outline: none !important;
			padding: 8px 52px 8px 12px;
			font-size: 32px;
			font-weight: bold;
			color: #A57F60;
			transition: all .3s ease;
			background-color: transparent;
		}
		:host > input:focus {
			border-bottom: 4px solid rgba(165, 127, 96, 0.8);
		}
	</style>
`;

class SearchBarWithVoice extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(template.content.cloneNode(true));

    this.searchBar = new SearchBar();
    shadowRoot.appendChild(this.searchBar);
    this.voiceInput = new VoiceInput();
    shadowRoot.appendChild(this.voiceInput);
  }

  connectedCallback() {
    this.searchBar.addEventListener("onSearch", (e: any) => {
      this.dispatchEvent(new CustomEvent("onSearch", { detail: e.detail }));
    });

    this.voiceInput.addEventListener("onSpeechEnd", (e: any) => {
      this.searchBar.value = e.detail;
      this.dispatchEvent(new CustomEvent("onSearch", { detail: e.detail }));
    });
  }
}

customElements.define("search-bar-voice", SearchBarWithVoice);
export default SearchBarWithVoice;
