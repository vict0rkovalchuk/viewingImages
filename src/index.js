import _ from 'lodash';
import './css/styles.css';
import imageTemplate from './templates/image.hbs';

class Images {
  constructor() {
    this.input = document.querySelector('input');
    this.list = document.querySelector('.gallery');
    this.button = document.querySelector('button');
    this.inputValue = '';
    this.counter = 1;
    this.API_KEY = '21939718-02d1437e0363cb6092a2b7e21';
    this.url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&page=${this.counter}&per_page=12&key=${this.API_KEY}&q=`;
  }

  fetchNews() {
    let url = this.url + this.inputValue;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        let markup = imageTemplate(data.hits);
        this.list.innerHTML = markup;
      })
      .catch(alert);
  }

  inputChange = event => {
    let inputValue = event.target.value;
    this.inputValue = inputValue;

    if (!inputValue) {
      return;
    }

    this.fetchNews();
    this.button.style.display = 'block';
  };

  loadMoreImgs = () => {
    this.counter++;
    this.url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&page=${this.counter}&per_page=12&key=${this.API_KEY}&q=`;
    let url = this.url + this.inputValue;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        let markup = imageTemplate(data.hits);
        this.list.innerHTML += markup;
      })
      .catch(alert);
  };

  addListeners() {
    this.input.addEventListener('input', _.debounce(this.inputChange, 500));
    this.button.addEventListener('click', this.loadMoreImgs);
  }

  init() {
    this.addListeners();
  }
}

new Images().init();
