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
			width: 250px;
			border: none;
			border-bottom: 2px solid rgba(0, 0, 0, 0.4);
			outline: none;
			padding: 4px 8px;
			font-size: 20px;
			color: #4a4a4a;
			transition: all .3s ease;
		}
		:host > input:focus {
			border-bottom: 2px solid rgba(0, 0 ,0, 0.7);
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
