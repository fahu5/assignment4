const startBtn = document.getElementById('startBtn');
const referenceText = document.getElementById('referenceText');
const typedText = document.getElementById('typedText');
const timerDisplay = document.getElementById('timer');
const totalWordsDisplay = document.getElementById('totalWords');
const correctWordsDisplay = document.getElementById('correctWords');
const wpmDisplay = document.getElementById('wpm');
const accuracyDisplay = document.getElementById('accuracy');

// Check if elements are found
console.log('Elements found:', {
  startBtn: !!startBtn,
  referenceText: !!referenceText,
  typedText: !!typedText,
  timerDisplay: !!timerDisplay,
  totalWordsDisplay: !!totalWordsDisplay,
  correctWordsDisplay: !!correctWordsDisplay,
  wpmDisplay: !!wpmDisplay,
  accuracyDisplay: !!accuracyDisplay
});

const TEXT = "The quick brown fox jumps over the lazy dog.";
let timeLeft = 60;
let timer;

const updateTimerDisplay = () => {
  timerDisplay.textContent = `Time: ${timeLeft}s`;
};

const resetResults = () => {
  totalWordsDisplay.textContent = '0';
  correctWordsDisplay.textContent = '0';
  wpmDisplay.textContent = '0';
  accuracyDisplay.textContent = '0%';
};

const calculateLiveStats = () => {
  const typed = typedText.value.trim();
  const typedWords = typed.split(/\s+/);
  const referenceWords = TEXT.split(' ');
  const totalWords = typedWords.filter(word => word !== '').length;
  const correctWords = typedWords.filter((word, i) => word === referenceWords[i]).length;

  const secondsElapsed = 60 - timeLeft;
  const minutesElapsed = secondsElapsed > 0 ? secondsElapsed / 60 : 1 / 60;
  const wpm = Math.round(correctWords / minutesElapsed);
  const accuracy = totalWords > 0 ? Math.round((correctWords / totalWords) * 100) : 0;

  // Update display values
  totalWordsDisplay.textContent = totalWords;
  correctWordsDisplay.textContent = correctWords;
  wpmDisplay.textContent = wpm;
  accuracyDisplay.textContent = `${accuracy}%`;
  
  // Debug logging
  console.log('Live Stats:', { 
    typed: typedWords, 
    totalWords, 
    correctWords, 
    wpm, 
    accuracy, 
    timeLeft 
  });
};

const highlightTypedText = () => {
  const typedWords = typedText.value.trim().split(/\s+/);
  const referenceWords = TEXT.split(' ');
  let html = '';
  referenceWords.forEach((word, index) => {
    if (typedWords[index] === undefined) {
      html += `<span>${word}</span> `;
    } else if (typedWords[index] === word) {
      html += `<span style="color:green">${word}</span> `;
    } else {
      html += `<span style="color:red">${word}</span> `;
    }
  });
  referenceText.innerHTML = html.trim();
};

const endTest = () => {
  typedText.disabled = true;
  
  // Calculate final results
  const typed = typedText.value.trim();
  const typedWords = typed.split(/\s+/);
  const referenceWords = TEXT.split(' ');
  const totalWords = typedWords.filter(word => word !== '').length;
  const correctWords = typedWords.filter((word, i) => word === referenceWords[i]).length;

  // Calculate final WPM (based on full 60 seconds)
  const wpm = Math.round(correctWords / 1); // 60 seconds = 1 minute
  const accuracy = totalWords > 0 ? Math.round((correctWords / totalWords) * 100) : 0;

  // Display final results
  totalWordsDisplay.textContent = totalWords;
  correctWordsDisplay.textContent = correctWords;
  wpmDisplay.textContent = wpm;
  accuracyDisplay.textContent = `${accuracy}%`;
  
  startBtn.textContent = "Restart";
  
  console.log('Final Results:', { totalWords, correctWords, wpm, accuracy });
};

const startTest = () => {
  typedText.value = '';
  typedText.disabled = false;
  typedText.focus();
  timeLeft = 60;
  updateTimerDisplay();
  resetResults();
  startBtn.textContent = "Restart";

  highlightTypedText();
  clearInterval(timer);
  timer = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();
    calculateLiveStats();
    highlightTypedText();
    if (timeLeft <= 0) {
      clearInterval(timer);
      endTest();
    }
  }, 1000);
};

startBtn.addEventListener('click', () => {
  console.log('Start button clicked');
  startTest();
});

typedText.addEventListener('input', () => {
  console.log('Typing detected');
  calculateLiveStats();
  highlightTypedText();
});

// Test function to manually update results
const testResults = () => {
  totalWordsDisplay.textContent = '5';
  correctWordsDisplay.textContent = '4';
  wpmDisplay.textContent = '8';
  accuracyDisplay.textContent = '80%';
  console.log('Test results updated');
};

// Test results after page loads
document.addEventListener('DOMContentLoaded', () => {
  console.log('Page loaded');
  setTimeout(testResults, 1000);
});