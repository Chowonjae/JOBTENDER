import React, { useState, useEffect } from "react";

import "../../styles/WordList.css";

const words = [
  "apple",
  "banana",
  "cat",
  "dog",
  "elephant",
  "forest",
  "giraffe",
  "house",
  "ice",
  "juice",
  "kangaroo",
  "lion",
  "mountain",
  "night",
  "ocean",
  "penguin",
  "queen",
  "rain",
  "snow",
  "tiger",
  "umbrella",
  "violin",
  "whale",
  "xylophone",
  "yarn",
  "zebra",
  "airplane",
  "bear",
  "crocodile",
  "dolphin",
  "eagle",
  "flower",
  "goat",
  "hedgehog",
  "island",
  "jacket",
  "koala",
  "lamp",
  "monkey",
  "nest",
  "orange",
  "piano",
  "quail",
  "river",
  "star",
  "turtle",
  "unicorn",
  "volcano",
  "window",
  "x-ray",
  "yak",
  "zipper",
  "ant",
  "butterfly",
  "camel",
  "dragonfly",
  "elephant",
  "fox",
];

const WordList = () => {
  const [wordScores, setWordScores] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScoreChange = (word, score) => {
    setWordScores({ ...wordScores, [word]: score });
    setTimeout(() => {
      handleNextWord();
    }, 100);
  };

  const handleNextWord = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < words.length) {
      setCurrentIndex(nextIndex);
    }
  };

  const handlePrevWord = () => {
    const prevIndex = currentIndex - 1;
    if (prevIndex >= 0) {
      const prevWordScore = wordScores[words[prevIndex]];
      if (prevWordScore !== undefined) {
        setCurrentIndex(prevIndex);
      }
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentIndex]);

  useEffect(() => {
    const handleScroll = (e) => {
      if (e.deltaY > 0) {
        handleNextWord();
      } else {
        handlePrevWord();
      }
    };

    window.addEventListener("wheel", handleScroll);

    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, [currentIndex]);

  const currentWord = words[currentIndex];

  return (
    <div className="App">
      <div className="slot-container">
        <div className="slot-word previous-word">{words[currentIndex - 1]}</div>
        <div
          className={`slot-word current-word ${
            currentIndex === 0 && "animated"
          }`}
        >
          {currentWord}
          <div className="score-container">
            <select
              value={wordScores[currentWord] || ""}
              onChange={(e) => handleScoreChange(currentWord, e.target.value)}
            >
              <option value="" disabled>
                점수 선택
              </option>
              {[1, 2, 3, 4, 5, 6, 7].map((score) => (
                <option key={score} value={score}>
                  {score}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="slot-word next-word">{words[currentIndex + 1]}</div>
      </div>
      <div className="navigation-buttons">
        <button disabled={currentIndex === 0} onClick={handlePrevWord}>
          &lt;
        </button>
        <button
          disabled={
            currentIndex === words.length - 1 ||
            !wordScores[words[currentIndex]]
          }
          onClick={handleNextWord}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};
export default WordList;
