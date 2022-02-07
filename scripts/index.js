const searchForm = document.querySelector('.search__form');
const formInput = document.querySelector('.search__input');
const formError = document.querySelector('.search__input-error');
const formButton = document.querySelector('.search__button');
const elementItemTemplate = document.querySelector('.element-item-template').content;
const elements = document.getElementsByClassName('element');
const footer = document.querySelector('.footer__copyright');
let initialElements = [];
let passengers = [];
let numberOfCards = 0;
let nowCards = 0;

fetch('https://raw.githubusercontent.com/altkraft/for-applicants/master/frontend/titanic/passengers.json')
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    initialElements = JSON.parse(JSON.stringify(data).replaceAll('"home.dest"', '"home"'));
  })
  .catch(() => {
    console.log('Ошибка. Запрос не выполнен');
  });

const showInputError = (element) => {
  element.classList.add('search__input_error');
  formError.classList.add('search__input-error_active');
  formButton.setAttribute('disabled', 'disabled');
};

const hideInputError = (element) => {
  element.classList.remove('search__input_error');
  formError.classList.remove('search__input-error_active');
  formButton.removeAttribute('disabled', 'disabled');
};

const isValid = () => {
  if (!formInput.validity.valid) {
    showInputError(formInput);
  } else {
    hideInputError(formInput);
  }
};

function createElementItem(item) {
  const elementItem = elementItemTemplate.cloneNode(true);
  elementItem.getElementById('name').textContent = `Name: ${item.name ? item.name : "there is no data"}`;
  elementItem.getElementById('gender').textContent = `Gender: ${item.gender ? item.gender : "there is no data"}`;
  elementItem.getElementById('age').textContent = `Age: ${item.age ? Math.floor(item.age) : "there is no data"}`;
  elementItem.getElementById('survived').textContent = `Survived: ${item.survived ? "yes" : "not"}`;
  elementItem.getElementById('home').textContent = `Home: ${item.home ? item.home : "there is no data"}`;
  return elementItem;
}

function addElement(element) {
  const elementItem = createElementItem(element);
  document.querySelector('.elements').append(elementItem);
}

function heightChange() {
  const screenHeight = window.innerHeight;
  if ((screenHeight <= 1024) & (screenHeight > 768)) {
    return numberOfCards = 2;
  } else if (screenHeight <= 768) {
    return numberOfCards = 1;
  } else if (screenHeight > 1024) {
    return numberOfCards = 3;
  }
}

function visibleCards() {
  if (numberOfCards <= passengers.length) {
    for (let i = 0; i < numberOfCards; i++) {
      addElement(passengers[i]);
    }
  } else {
    for (let i = 0; i < passengers.length; i++) {
      addElement(passengers[i]);
    }
  }
}

function checkString(string) {
  const searchInput = document.querySelector('.search__input').value;
  const searchValue = searchInput.toLowerCase().trim();
  return string ? string.includes(searchValue) : false;
}

function passengerSearch() {
  const foundPassengers = initialElements.filter((item) => {
    const string1 = checkString(item.name.toLowerCase().trim());
    const string2 = checkString(item.home.toLowerCase().trim());
    return string1 || string2;
  });
  passengers = foundPassengers;
  heightChange();
  visibleCards();
}

function lazyLoad() {
  if (numberOfCards <= passengers.length) {
    for (let i = nowCards; i < numberOfCards; i++) {
      addElement(passengers[i]);
    }
  } else {
    for (let i = nowCards; i < passengers.length; i++) {
      addElement(passengers[i]);
      window.removeEventListener("scroll", checkPosition)
    }
  }
}

function checkPosition() {
  const height = document.body.offsetHeight;
  const screenHeight = window.innerHeight;
  const scrolled = window.scrollY;
  const position = scrolled + screenHeight;
  let threshold = height - screenHeight / 5;
  nowCards = numberOfCards;
  if (position >= threshold) {
    if (screenHeight > 768) {
      numberOfCards = numberOfCards + 2;
      threshold = threshold + 420;
    } else {
      numberOfCards = numberOfCards + 1;
      threshold = threshold + 140;
    }
    lazyLoad();
    return numberOfCards;
  };
}

function data() {
  footer.textContent = `${footer.textContent + new Date().getFullYear() + " Altcraft"}`
}

data();

searchForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  heightChange();
  for (i = 0; i < elements.length; i + 1) {
    elements[i].remove();
  }
  passengerSearch();
  window.addEventListener("scroll", checkPosition)
});

formInput.addEventListener('input', isValid);

window.addEventListener("resize", checkPosition)