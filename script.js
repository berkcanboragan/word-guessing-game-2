const words = [
  { word: "BAHAR" },
  { word: "NEHİR" },
  { word: "KARPUZ" },
  { word: "DÜĞME" },
  { word: "YORGAN" },
  { word: "KIRLANGIÇ" },
  { word: "DUMAN" },
  { word: "GÖZLÜK" },
  { word: "FIRIN" },
  { word: "ŞEHİR" },
  { word: "IZGARA" },
  { word: "KABAK" },
  { word: "PUSULA" },
  { word: "ŞEMSİYE" },
  { word: "ÇÖREK" },
  { word: "RADYO" },
  { word: "CEPHE" },
  { word: "JÜRİ" },
  { word: "LEYLEK" },
  { word: "İSTAVRİT" },
  { word: "OCAK" },
  { word: "MERAK" },
  { word: "MİNDER" },
  { word: "YELKEN" },
  { word: "ARIZA" },
  { word: "CÜZDAN" },
  { word: "JETON" },
  { word: "MÜREKKEP" },
  { word: "ZİL" },
  { word: "PATİKA" },
];

document.addEventListener("DOMContentLoaded", function () {
  let randomIndex = Math.floor(Math.random() * words.length);
  let randomWord = words[randomIndex].word.toUpperCase();
  let wordLength = randomWord.length;

  for (let i = 0; i < wordLength; i++) {
    let newdiv = document.createElement("div");
    let input = document.createElement("input");
    input.classList.add("input");
    input.setAttribute("maxlength", "1");
    input.setAttribute("autocomplete", "off");
    newdiv.classList.add("box");
    newdiv.appendChild(input);
    document.querySelector(".input-area").appendChild(newdiv);

    input.addEventListener("input", function () {
      let char = this.value;
      const turkishUpperMap = {
        i: "İ",
        ı: "I",
        ç: "Ç",
        ğ: "Ğ",
        ö: "Ö",
        ş: "Ş",
        ü: "Ü",
      };

      this.value = turkishUpperMap[char] || char.toUpperCase();
      if (this.value.length === 1 && i < wordLength - 1) {
        document.querySelectorAll(".input")[i + 1].focus();
      }
    });

    input.addEventListener("keydown", function (event) {
      if (event.key === "Backspace") {
        event.preventDefault();
        if (this.value === "" && i > 0) {
          let prevInput = document.querySelectorAll(".input")[i - 1];
          prevInput.value = "";
          prevInput.focus();
        } else {
          this.value = "";
        }
      }
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      let inputs = document.querySelectorAll(".input");
      let allFilled = true;
      let userGuess = "";

      inputs.forEach((input) => {
        if (input.value.trim() === "") allFilled = false;
        userGuess += input.value;
      });

      if (!allFilled) return;

      let letterCount = {};
      for (let char of randomWord) {
        letterCount[char] = (letterCount[char] || 0) + 1;
      }

      let box_holder = document.createElement("div");
      box_holder.classList.add("box-holder");

      let resultColors = new Array(wordLength).fill("black");

      for (let i = 0; i < wordLength; i++) {
        if (userGuess[i] === randomWord[i]) {
          resultColors[i] = "#538d4e";
          letterCount[userGuess[i]]--;
        }
      }

      for (let i = 0; i < wordLength; i++) {
        if (resultColors[i] === "black" && letterCount[userGuess[i]] > 0) {
          resultColors[i] = "#b59f3b";
          letterCount[userGuess[i]]--;
        }
      }

      for (let i = 0; i < wordLength; i++) {
        let newdiv = document.createElement("div");
        newdiv.classList.add("box");
        newdiv.textContent = userGuess[i];
        newdiv.style.backgroundColor = resultColors[i];
        box_holder.appendChild(newdiv);
      }

      if (userGuess === randomWord) {
        alert("You Won!");
        setTimeout(() => {
          location.reload();
        }, 500);
        return;
      }

      document.querySelector(".guess").appendChild(box_holder);
      if (document.querySelector(".guess").childElementCount === 6) {
        alert("You Lost");
        location.reload();
      }

      setTimeout(() => {
        inputs.forEach((input) => (input.value = ""));
        inputs[0].focus();
      }, 50);
    }
  });
});

setTimeout(() => {
  document.querySelector(".input").focus();
}, 50);

document.querySelector(".reset").addEventListener("click", function () {
  location.reload();
});
