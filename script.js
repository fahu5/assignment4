// script.js
const startBtn = document.getElementById('startBtn');
const referenceText = document.getElementById('referenceText');
const typedText = document.getElementById('typedText');
const timerDisplay = document.getElementById('timer');
const totalWordsDisplay = document.getElementById('totalWords');
const correctWordsDisplay = document.getElementById('correctWords');
const wpmDisplay = document.getElementById('wpm');
const accuracyDisplay = document.getElementById('accuracy');

const TEXT = "The quick brown fox jumps over the lazy dog. This is a typing speed test that measures your words per minute and accuracy. Practice regularly to improve your typing skills and become more efficient at data entry and communication.";
let timeLeft = 60;
let timer;

const startTest = () => {
  referenceText.textContent = TEXT;
  typedText.value = '';
  typedText.disabled = false;
  typedText.focus();
  timeLeft = 60;
  updateTimerDisplay();
  resetResults();

  // Remove any existing event listener and add new one for real-time updates
  typedText.removeEventListener('input', updateResults);
  typedText.addEventListener('input', updateResults);

  clearInterval(timer);
  timer = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();
    if (timeLeft <= 0) {
      clearInterval(timer);
      endTest();
    }
  }, 1000);
};

const updateTimerDisplay = () => {
  timerDisplay.textContent = `Time: ${timeLeft}s`;
};

const resetResults = () => {
  totalWordsDisplay.textContent = '0';
  correctWordsDisplay.textContent = '0';
  wpmDisplay.textContent = '0';
  accuracyDisplay.textContent = '0%';
};

const updateResults = () => {
  const typed = typedText.value.trim();
  const typedWords = typed.split(/\s+/).filter(word => word.length > 0);
  const referenceWords = TEXT.split(' ');
  const totalWords = typedWords.length;
  const correctWords = typedWords.filter((word, index) => word === referenceWords[index]).length;
  
  // Calculate WPM: (correct words / time in minutes)
  const timeElapsed = 60 - timeLeft;
  const wpm = timeElapsed > 0 ? Math.round((correctWords / timeElapsed) * 60) : 0;
  const accuracy = totalWords > 0 ? Math.round((correctWords / totalWords) * 100) : 0;

  totalWordsDisplay.textContent = totalWords;
  correctWordsDisplay.textContent = correctWords;
  wpmDisplay.textContent = wpm;
  accuracyDisplay.textContent = `${accuracy}%`;
};

const endTest = () => {
  typedText.disabled = true;
  typedText.removeEventListener('input', updateResults);
  updateResults();
};

startBtn.addEventListener('click', startTest);