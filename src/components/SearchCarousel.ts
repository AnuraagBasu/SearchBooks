import SearchBarWithVoice from "./SearchBarWithVoice";
import Carousel from "./Carousel";

import { searchBooks } from "../utils";

const template = document.createElement("template");
template.innerHTML = `
	<style>
		:host {
			max-width: 900px;
			margin: 0 auto;
			text-align: center;
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
		}
	</style>
`;

class SearchCarousel extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(template.content.cloneNode(true));

    this.searchBar = new SearchBarWithVoice();
    shadowRoot.appendChild(this.searchBar);
    this.searchBar.value = "Sherlock Holmes";
    this.carousel = new Carousel();
    shadowRoot.appendChild(this.carousel);

    this.pagination = {
      total: 0,
      soFar: 0
    };
  }

  connectedCallback() {
    this.requestItems(this.searchBar.value);
    this.searchBar.addEventListener("onSearch", (e: any) => this.requestItems(e.detail));
    this.carousel.addEventListener("onFetchMore", (e: any) => this.fetchNextPageItems());
  }

  requestItems = (query: string) => {
    this.carousel.loadingNew = true;
    searchBooks(query).then((resp: object) => {
      this.pagination = {
        total: resp.numFound,
        soFar: 10
      };
      const allSlides = resp.docs || [];
      this.carousel.slides = allSlides;
      this.carousel.activeSlideIndex = 0;
      this.carousel.loadingNew = false;
    });
  };
  fetchNextPageItems = () => {
    const { total, soFar } = this.pagination;
    if (soFar !== total) {
      searchBooks(this.searchBar.value, soFar / 10 + 1).then((resp) => {
        this.carousel.slides = [...this.carousel.slides, ...resp.docs];
        this.pagination = {
          total: resp.numFound,
          soFar: this.carousel.slides.length
        };
      });
    }
  };
}

customElements.define("search-carousel", SearchCarousel);
export default SearchCarousel;
