import BookCover from "../BookCover";

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
	  transition: all .3s ease;
	}
	:host .slide {
		padding: 8px;
		display: inline-block;
	}
  </style>
  <div class="slider"></div>
`;

class Carousel extends HTMLElement {
  constructor() {
    super();

    this.slides = [];

    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(template.content.cloneNode(true));

    this.slider = shadowRoot.querySelector(".slider");
  }

  get slides() {
    return this.slides;
  }
  set slides(val: Array) {
    // this.slides = val;
    this.addSlides(val);
  }

  addSlides = (slides: Array) => {
    slides.forEach((book: Object) => {
      const slide = document.createElement("div");
      slide.classList.add("slide");

      const cover = new BookCover();
      cover.setAttribute("is", "book-cover");
      cover.classList.add("slide");
      cover.coverKey = book.cover_edition_key;

      slide.appendChild(cover);
      this.slider.appendChild(slide);
    });
  };
}

customElements.define("custom-carousel", Carousel);
export default Carousel;
