let petsList = document.querySelector('.pets-list');
const btnNext = document.querySelector('.pagination-next');
const btnPrev = document.querySelector('.pagination-prev');
const currentPage = document.querySelector('.pagination-current');
const btnToStart = document.querySelector('.pagination-start');
const btnToEnd = document.querySelector('.pagination-finish');

function geterateStartDate(arr) {
  let newArr = arr.sort(() => Math.random() - 0.5);
  return newArr;
}

let petsPerPage = 8;

if (window.innerWidth < 1279 && window.innerWidth > 639) {
  petsPerPage = 6;
}

if (window.innerWidth < 639) {
  petsPerPage = 3;
}

async function initPets() {
  const petsArr = await getData();

  function createCardsTemplate() {
    petsList.innerHTML = '';
    for (let i = 0; i < petsPerPage; i++) {
      let card = document.createElement('li');
      card.classList = 'pets-item js-open-modal';
      petsList.append(card);
      let cartImg = document.createElement('img');
      cartImg.classList = 'pet-img';
      card.append(cartImg);
      let petText = document.createElement('p');
      petText.classList = 'pet-text text';
      card.append(petText);
      let cardBtn = document.createElement('button');
      cardBtn.classList = 'pet-btn btn';
      cardBtn.textContent = 'Learn more';
      card.append(cardBtn);
    }
  }
  createCardsTemplate();

  let createZoo = () => {
    let arr = [0, 1, 2, 3, 4, 5, 6, 7];

    let zoo = [];
    for (let i = 0; i < 6; i++) {
      zoo = zoo.concat(geterateStartDate(arr));
    }

    return zoo;
  };

  let zoo = createZoo();

  function createCards(cards) {
    Array.from(cards).forEach((el, i) => {
      el.setAttribute('data-modal', petsArr[zoo[i]].name);

      const img = el.querySelector('.pet-img');
      img.setAttribute('src', petsArr[zoo[i]].img);
      img.setAttribute('alt', petsArr[zoo[i]].breed + ' ' + petsArr[zoo[i]].name);

      const name = el.querySelector('.pet-text');
      name.textContent = petsArr[zoo[i]].name;
    });
  }

  const cards = document.getElementsByClassName('pets-item');

  createCards(cards, petsArr);
}

initPets();

let currentPageNum = 1;
currentPage.textContent = currentPageNum;

if (currentPageNum === 1) {
  btnPrev.setAttribute('disabled', true);
}

const pagePlusHandler = () => {
  currentPageNum++;
  currentPage.textContent = currentPageNum;
};

const pageMinusHandler = () => {
  currentPageNum--;
  currentPage.textContent = currentPageNum;
};

const nextPage = () => {
  initPets();
  pagePlusHandler();
  if (currentPageNum > 1) {
    btnPrev.removeAttribute('disabled');
    btnToStart.removeAttribute('disabled');
  }

  if (currentPageNum === 48 / petsPerPage) {
    btnNext.setAttribute('disabled', true);
    btnToEnd.setAttribute('disabled', true);
  }
};

const prevPage = () => {
  initPets();
  pageMinusHandler();
  if (currentPageNum === 1) {
    btnPrev.setAttribute('disabled', true);
    btnToStart.setAttribute('disabled', true);
  }
  if (currentPageNum < 48 / petsPerPage) {
    btnNext.removeAttribute('disabled');
    btnToEnd.removeAttribute('disabled');
  }
};

/* moveToEnd = () => {
  48 / petsPerPAge
} */

btnNext.addEventListener('click', nextPage);
btnPrev.addEventListener('click', prevPage);
//btnToEnd.addEventListener('click', moveToEnd);
