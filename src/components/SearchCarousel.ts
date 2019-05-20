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
		}
		:host > input{
			display: block;
			width: 200px;
			padding: 8px 12px;
			border: 1px solid #000;
			outline: none;
			font-size: 20px;
			margin: 0 auto 20px;
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
    this.searchBar.value = "Watson";
    this.carousel = new Carousel();
    shadowRoot.appendChild(this.carousel);

    this.pagination = {
      count: 0,
      next: null
    };
  }

  connectedCallback() {
    this.requestItems(this.searchBar.value);
    this.searchBar.addEventListener("onSearch", (e: any) => this.requestItems(e.detail));
    this.carousel.addEventListener("onFetchMore", (e: any) => this.fetchNextPageItems());
  }

  requestItems = (query: string) => {
    searchBooks(query).then((resp) => {
      const allSlides = resp.docs || [];
      this.carousel.slides = allSlides;
      this.carousel.activeSlideIndex = 0;
    });
  };
  fetchNextPageItems = () => {
    searchBooks(this.searchBar.value).then((resp) => {
      this.carousel.slides = [...this.carousel.slides, ...resp.docs];
    });
  };
}

customElements.define("search-carousel", SearchCarousel);
export default SearchCarousel;
