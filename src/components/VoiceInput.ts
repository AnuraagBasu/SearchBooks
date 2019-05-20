import { initialiseSpeechRecognition, listenToSpeech } from "../utils";

const template = document.createElement("template");
template.innerHTML = `
	<style>
		:host > .voiceInputBtn{
			width: 40px;
			height: 40px;
			border-radius: 50%;
			padding: 4px;
			align-items: center;
			justify-content: center;
			cursor: pointer;
			transition: all .3s ease;
			display: flex;
			transform: translateX(-40px);
		}
		:host > .voiceInputBtn.listening{
			background-color: #ef9a9a;
		}
		:host > .voiceInputBtn img {
			width: 100%;
			height: auto;
			background-color: transparent;
		}
	</style>
	<div class="voiceInputBtn">
		<img src="https://images.vexels.com/media/users/3/132136/isolated/preview/96a71143337a3ad5576f9d0d2aa9787e-singing-microphone-icon-by-vexels.png" />
	</div>
`;

class VoiceInput extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(template.content.cloneNode(true));

    this.voiceInputBtn = shadowRoot.querySelector(".voiceInputBtn");
    this.voiceInputAvailable = initialiseSpeechRecognition();
    if (!this.voiceInputAvailable) {
      this.voiceInputBtn.addClass("disabled");
    }
  }

  connectedCallback() {
    this.voiceInputBtn.addEventListener("click", this.startVoiceCapturing);
  }

  startVoiceCapturing = (e: any) => {
    if (this.voiceInputAvailable) {
      this.voiceInputBtn.classList.add("listening");
      listenToSpeech().then((speech) => {
        this.dispatchEvent(new CustomEvent("onSpeechEnd", { detail: speech }));
        this.voiceInputBtn.classList.remove("listening");
      });
    }
  };
}

customElements.define("voice-input", VoiceInput);
export default VoiceInput;
