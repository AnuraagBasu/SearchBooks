import { initialiseSpeechRecognition, listenToSpeech } from "../utils";

const template = document.createElement("template");
template.innerHTML = `
	<style>
		:host > .voiceInputBtn{
			width: 40px;
			height: 40px;
			border-radius: 50%;
			background-color: #eee;
			padding: 4px;
			display: flex;
			align-items: center;
			justify-content: center;
			cursor: pointer;
			transition: all .3s ease;
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
		<img src="https://banner2.kisspng.com/20180516/eke/kisspng-computer-icons-microphone-icon-design-5afc336bb79b23.8411474615264776757521.jpg" />
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
