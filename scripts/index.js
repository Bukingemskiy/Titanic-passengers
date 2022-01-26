const searchForm = document.querySelector('.search__form');
const elementItemTemplate = document.querySelector('.element-item-template').content;
const elements = document.getElementsByClassName('element');
const footer = document.querySelector('.footer__copyright');
let numberOfCards = 2;

function addElement(element) {
    const elementItem = createElementItem(element);
    document.querySelector('.elements').append(elementItem);
}

function createElementItem(item) {
    const elementItem = elementItemTemplate.cloneNode(true);
    elementItem.getElementById('name').textContent = `Name: ${item.name ? item.name : "there is no data"}`;
    elementItem.getElementById('gender').textContent = `Gender: ${item.gender ? item.gender : "there is no data"}`;
    elementItem.getElementById('age').textContent = `Age: ${item.age ? Math.floor(item.age) : "there is no data"}`;
    elementItem.getElementById('survived').textContent = `Survived: ${item.survived ? "yes" : "not"}`;
    elementItem.getElementById('home').textContent = `Home: ${item.home ? item.home : "there is no data"}`;
    return elementItem;
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
    foundPassengers.forEach(addElement);
    heightChange();
    visibleCards();
}

 function heightChange() {
    const screenHeight = window.innerHeight;
    if ((screenHeight <= 1024) & (screenHeight > 768)) {
      return numberOfCards = 2;
    } else if (screenHeight <= 768) {
      return  numberOfCards = 1;
    } else if (screenHeight > 1024) {
      return numberOfCards = 3;
    }
  };

function visibleCards() {
      if (numberOfCards <= elements.length) {
        for (let i = numberOfCards; i < elements.length; i++) {
          for (let j = 0; j < numberOfCards; j++) {
            elements[j].style.display = "grid";
            elements[i].style.display = "none";
          }
        }
      } else {
        for (let i = 0; i < elements.length; i++) {
          elements[i].style.display = "grid";
        }
      }
}

function lazyLoad() {
  if (numberOfCards <= elements.length) {
    for (let i = 0; i < numberOfCards; i++) {
      elements[i].style.display = "grid";
    }
  } else {
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.display = "grid";
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
footer.textContent = `${footer.textContent + new Date().getFullYear() + " Altcraft"}`}

data();

searchForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  heightChange();
  for (i = 0; i < elements.length; i+1) {
      elements[i].remove();
  }
  passengerSearch();
  window.addEventListener("scroll", checkPosition)
});

window.addEventListener("resize", checkPosition)