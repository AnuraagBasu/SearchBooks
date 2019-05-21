import SearchCarousel from "./components/SearchCarousel";

import "./css/index.css";

const [firstSection, secondSection] = document.querySelectorAll(".section");
const searchCarousel = new SearchCarousel();
secondSection && secondSection.appendChild(searchCarousel);

const codeHolder = document.createElement("code");
codeHolder.innerHTML = `
	const addN = (firstNumber: number) => {<br />
	  	return (secondNumber: number) => {<br />
			return firstNumber + secondNumber;<br />
		};<br />
	};<br />
	<br />
	<br />
	const addEight = addN(8);<br />
	console.log(addEight(100));<br />
`;
firstSection.appendChild(codeHolder);
