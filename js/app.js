const fromText = document.querySelector(".from-text"),
  toText = document.querySelector(".trasnlate-text"),
  selectTag = document.querySelectorAll("select"),
  exchangeIcon = document.querySelector(".exchange"),
  translateBtn = document.querySelector(".btn"),
  icons = document.querySelectorAll(".row i");

selectTag.forEach((tag, id) => {
  for (const country_code in countries) {
    let selected;
    if (id == 0 && country_code == "en-GB") {
      selected = "selected";
    } else if (id == 1 && country_code == "hi-IN") {
      selected = "selected";
    }
    let option = `<option value="${country_code}" ${selected}>${countries[country_code]}</option>`;
    tag.insertAdjacentHTML("beforeend", option);
  }
});

// exchage icon click -> change [value] check
exchangeIcon.addEventListener("click", () => {
  let tempText = fromText.value;
  tempLang = selectTag[0].value;
  fromText.value = toText.value;
  selectTag[0].value = selectTag[1].value;
  toText.value = tempText;
  selectTag[1].value = tempLang;
});

translateBtn.addEventListener("click", () => {
  let text = fromText.value,
    translateFrom = selectTag[0].value,
    translateTo = selectTag[1].value;
  let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
  fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => {
      toText.value = data.responseData.translatedText;
    });
});

// navigator.clipboard.writeText(fromText.value); error - 수정하기
async function copyPageUrl() {
    try {
        await navigator.clipboard.writeText(fromText.value);
    } catch (err) {
        console.log('erro 입니다,,,');
    }
}

async function copyPageUrl2() {
    try {
        await navigator.clipboard.writeText(toText.value);
    } catch (err) {
        console.log('erro 입니다,,,');
    }
}


icons.forEach((icon) => {
  icon.addEventListener("click", ({ target }) => {
    if (target.classList.contains("fa-copy")) {
      if (target.id == "i-from") {
        copyPageUrl();
      } else {
        copyPageUrl2();
      }
    } else {
      let utterance;
      if (target.id == "i-from") {
        utterance = new SpeechSynthesisUtterance(fromText.value);
        utterance.lang = selectTag[0].value;
      } else {
        utterance = new SpeechSynthesisUtterance(toText.value);
        utterance.lang = selectTag[1].value;
      }
      speechSynthesis.speak(utterance);
    }
  });
});
