const smallCups = document.querySelectorAll(".cup-small");
const liters = document.getElementById("liters");
const percentage = document.getElementById("percentage");
const remained = document.getElementById("remained");
const instructionText = document.createElement("div"); // For displaying instructions
instructionText.style.color = "#fff";
instructionText.style.fontSize = "16px";
instructionText.style.marginBottom = "10px";
document.body.appendChild(instructionText);

let lastFilledCupIndex = -1; // Track the last filled cup index

const updateBigCup = () => {
  const fullCups = document.querySelectorAll(".cup-small.full").length;
  const totalCups = smallCups.length;
  if (fullCups === 0) {
    percentage.style.visibility = "hidden";
    percentage.style.height = 0;
  } else {
    percentage.style.visibility = "visible";
    percentage.style.height = ${(fullCups / totalCups) * 330}px;
    percentage.innerText = ${(fullCups / totalCups) * 100}%;
  }
  if (fullCups === totalCups) {
    remained.style.visibility = "hidden";
    remained.style.height = 0;
  } else {
    percentage.style.visibility = "visible";
    liters.innerText = ${2 - (250 * fullCups) / 1000}L;
  }
};

const highlightCups = (targetIndex) => {
  if (targetIndex === 0) {
    // If the first cup, fill it
    smallCups[targetIndex].classList.add("full");
    lastFilledCupIndex = targetIndex;
    updateBigCup();
    instructionText.innerText = "";
  } else if (targetIndex === lastFilledCupIndex + 1) {
    // If the next in sequence, fill it
    smallCups[targetIndex].classList.add("full");
    lastFilledCupIndex = targetIndex;
    updateBigCup();
    instructionText.innerText = "";
  } else if (targetIndex < lastFilledCupIndex) {
    // If filling a previous cup, reset to it
    resetCups(targetIndex);
  } else {
    // Out of sequence, display instruction
    instructionText.innerText = `Please fill cup ${
      lastFilledCupIndex + 1
    } first.`;
  }
};

const resetCups = (newIndex) => {
  smallCups.forEach((cup, index) => {
    if (index <= newIndex) cup.classList.add("full");
    else cup.classList.remove("full");
  });
  lastFilledCupIndex = newIndex;
  updateBigCup();
};

smallCups.forEach((cup, index) =>
  cup.addEventListener("click", () => highlightCups(index))
);

updateBigCup(); // Initial update
