import SearchCarousel from "./components/SearchCarousel";

import "./css/index.css";

const root = document.getElementById("root");
const searchCarousel = new SearchCarousel();
root && root.appendChild(searchCarousel);
