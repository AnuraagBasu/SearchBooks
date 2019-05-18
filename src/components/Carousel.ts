import BookCover from "./BookCover";

const template = document.createElement("template");
template.innerHTML = `
  <style>
		:host {
			width: 100%;
    }
    :host .slider {
      width: 100%;
      white-space: nowrap;
      max-width: 600px;
      margin: 0 auto;
      overflow: scroll;
    }
  </style>
  <div class="slider"></div>
`;

class Carousel extends HTMLElement {
  constructor() {
    super();

    this.items = [];

    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(template.content.cloneNode(true));

    this.slider = shadowRoot.querySelector(".slider");
  }

  get items() {
    return this.items;
  }
  set items(val: Array) {
    // this.items = val;
    this.addSlides(val);
  }

  attributeChangedCallback(name: string, oldVal: Array, newVal: Array) {
    switch (name) {
      case "items":
        this.addSlides(newVal);
        return;
      default:
        return;
    }
  }

  addSlides = (slides: Array = []) => {
    slides.forEach((book: Object) => {
      const cover = new BookCover();
      cover.setAttribute("is", "book-cover");
      cover.coverKey = book.cover_edition_key;
      this.slider.appendChild(cover);
    });
  };
}

customElements.define("custom-carousel", Carousel);
export default Carousel;
