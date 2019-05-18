class SearchBar extends HTMLInputElement {
  connectedCallback() {
    this.addEventListener("keydown", (e) => {
      if (e.keyCode === 13) {
        this.dispatchEvent(new CustomEvent("onSearch", { detail: this.value }));
      }
    });
  }
}

customElements.define("search-bar", SearchBar, { extends: "input" });

export default SearchBar;
