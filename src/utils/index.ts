import { RECOGNISER_TEXT } from "./constants";

export const searchBooks = (query: string = "") => {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.onload = () => {
      resolve(JSON.parse(request.response));
    };
    request.open("GET", `https://openlibrary.org/search.json?q=${query}&limit=10`);
    request.send();
  });
};

export const initialiseSpeechRecognition = () => {
  window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
  if ("SpeechRecognition" in window) {
    // speech recognition API supported
    return true;
  }
  return false;
};

export const listenToSpeech = () => {
  const recogniserText = RECOGNISER_TEXT.toLowerCase();
  return new Promise((resolve, reject) => {
    const recognition = new window.SpeechRecognition();

    recognition.onresult = (event: any) => {
      const speech = event.results[0][0].transcript;
      if (speech.toLowerCase().indexOf("search for") != -1) {
        resolve(speech.substring(recogniserText.length, speech.length - 1));
      }
    };
    recognition.start();
  });
};
