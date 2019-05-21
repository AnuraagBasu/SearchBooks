const template = document.createElement("template");
template.innerHTML = `
	<style>
		:host {
			display: inline-block;
			width: 200px;
			height: 200px;
			background-size: contain;
			background-position: center;
			background-repeat: no-repeat;
			background-color: #eee;
			-webkit-box-shadow: 0px 0px 5px 1px rgba(165,127,96,0.3);
			-moz-box-shadow: 0px 0px 5px 1px rgba(165,127,96,0.3);
			box-shadow: 0px 0px 5px 1px rgba(165,127,96,0.3);
			border-radius: 4px;
		}
	</style>
`;

class BookCover extends HTMLDivElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(template.content.cloneNode(true));
  }

  get coverKey() {
    return this.coverKey;
  }
  set coverKey(coverKey: number) {
    let url = `http://covers.openlibrary.org/b/olid/${coverKey}-M.jpg`;
    if (!coverKey) {
      url = "https://genderstudies.indiana.edu/images/publications/book-cover-placeholder.jpg";
    }
    this.setAttribute("style", `background-image: url(${url})`);
  }
}

customElements.define("book-cover", BookCover, { extends: "div" });

export default BookCover;
