const btn = document.querySelector('.get-jokes'),
  jokeInput = document.querySelector('#number'),
  jokeList = document.querySelector('.jokes');

btn.addEventListener('click', getJokes);

function getJokes(e) {

  const number = jokeInput.value;
  const xhr = new XMLHttpRequest();

  xhr.open('GET', `http://api.icndb.com/jokes/random/${number}`, true);

  xhr.onload = function () {
    if (this.status === 200) {

      const response = JSON.parse(this.responseText);
      const jokes = response.value;

      let output = '';

      if (response.type === 'success') {

        jokes.forEach(function (joke) {
          output += `
          <li>${joke.id}</li>
          <li>${joke.joke}</li>
          `

          jokeList.innerHTML = output;
        });

      } else {
        output += '<li>Something went wrong :(</li>'
      }

    }
  }

  xhr.send();

  e.preventDefault();
}