import BookCover from "../BookCover";

const template = document.createElement("template");
template.innerHTML = `
  <style>
		:host {
      width: 100%;
      margin-top: 40px;
    }
    :host .carousel {
      width: 100%;
      margin: 0 auto;
      overflow: hidden;
    }
    :host .slider {
      width: 100%;
      white-space: nowrap;
      transition: all .3s ease;
      position: relative;
    }
    :host .slider.loading {
      filter: blur(3px);
    }
    :host .slide {
      padding: 8px;
      display: inline-block;
    }
  </style>
  <div class="carousel">
    <div class="slider"></div>
  </div>
`;

class Carousel extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(template.content.cloneNode(true));

    this.slider = shadowRoot.querySelector(".slider");
    this.items = [];
    this.activeSlideIndex = 0;
  }

  connectedCallback() {
    window.addEventListener("focus", this.startAutoLooping);
    window.addEventListener("blur", this.stopAutoLooping);
  }

  get slides() {
    return this.items;
  }
  set slides(slides: Array) {
    this.addSlides(slides);
    this.items = slides;
  }
  get activeSlideIndex() {
    return this.activeIndex;
  }
  set activeSlideIndex(index: number) {
    this.activeIndex = index;
    const slides = this.slider.children[0];
    if (this.slider && slides) {
      const slideWidth = slides.offsetWidth;
      this.slider.setAttribute("style", `transform: translateX(${-slideWidth * (index - 1)}px);`);
    }
  }
  set loadingNew(loading: bool) {
    if (loading) {
      this.stopAutoLooping();
      this.slider.classList.add("loading");
    } else {
      this.slider.classList.remove("loading");
      this.startAutoLooping();
    }
  }

  addSlides = (slides: Array) => {
    this.slider.innerHTML = "";
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

  renderSlides = (slides: Array) => {
    const existingSlideElements = this.slider.children || [];
    if (existingSlideElements.length > slides.length) {
      const toBeRemoved = existingSlideElements.splice(slides.length - 1, existingSlideElements.length - slides.length);
      toBeRemoved.forEach((elem: object) => {
        elem.remove();
      });
    }
    const existingSlideHolders = slides.splice(0, existingSlideElements.length);
    existingSlideHolders.forEach((book: object, index: number) => {
      existingSlideElements[index].coverKey = book.cover_edition_key;
    });
    slides.forEach((book: object) => {
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

  startAutoLooping = () => {
    this.autoLoopInterval = setInterval(() => {
      if (this.slides.length) {
        let nextSlideIndex = this.activeSlideIndex + 1;
        this.activeSlideIndex = nextSlideIndex === this.slides.length ? 0 : nextSlideIndex;
        const slides = this.slider.children;
        if (nextSlideIndex > slides.length - 3) {
          this.dispatchEvent(new CustomEvent("onFetchMore"));
        }
      }
    }, 1500);
  };
  stopAutoLooping = () => {
    this.autoLoopInterval && clearInterval(this.autoLoopInterval);
  };
}

customElements.define("custom-carousel", Carousel);
export default Carousel;
