const searchInput = document.getElementById('searchInput');
const secondSection = document.getElementById('secondSection');
const codeBlock = document.getElementById('results');

let hasSearched = false;

searchInput.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    const searchTerm = searchInput.value;
    if (searchTerm) {
      fetchResults(searchTerm);
    }
  }
});

function fetchResults(term) {
  const apiUrl = `https://osdr.nasa.gov/osdr/data/search?type=cgene&term=${term}`;

  fetch(apiUrl)
    .then((response) => {
      console.log('Status:', response.status);
      return response.text();
    })
    .then((data) => {
      console.log('Raw response data:', data);
      try {
        const jsonData = JSON.parse(data);
        console.log('Parsed JSON:', jsonData);
        displayResults(jsonData);
      } catch (error) {
        console.error('Failed to parse JSON:', error);
        codeBlock.textContent = 'Error parsing JSON. Please check the console.';
      }
    })
    .catch((error) => {
      console.error('Fetch error:', error);
      codeBlock.textContent = 'Error fetching data. Please try again.';
    });
}

function displayResults(data) {
  codeBlock.textContent = JSON.stringify(data, null, 2);
  codeBlock.style.display = 'block';
  secondSection.style.display = 'block';

  if (hasSearched) {
    secondSection.scrollIntoView({ behavior: 'smooth' });
  } else {
    hasSearched = true;
  }
}

document.addEventListener('DOMContentLoaded', function () {
  fetchResults('OSD-665');
});
