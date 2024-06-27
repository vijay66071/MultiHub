document.addEventListener('DOMContentLoaded', () => {
    // Function to handle navigation
    window.navigate = (page) => {
      document.querySelectorAll('.content').forEach((content) => {
        content.style.display = 'none';
      });
      document.getElementById(page).style.display = 'block';
  
      if (page === 'joke') {
        fetchJoke();
      } else if (page === 'news') {
        fetchNews();
      }
    };
  
    // Function to fetch a random joke
    const fetchJoke = async () => {
      const response = await fetch('https://official-joke-api.appspot.com/random_joke');
      const joke = await response.json();
      document.getElementById('joke').innerHTML = `
        <h2>Random Joke</h2>
        <p><strong>Setup:</strong> ${joke.setup}</p>
        <p><strong>Punchline:</strong> ${joke.punchline}</p>
      `;
    };
  
    // Function to fetch today's news
    const fetchNews = async () => {
      const response = await fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=YOUR_API_KEY');
      const newsData = await response.json();
      const articles = newsData.articles.map(article => `
        <div class="article">
          <h3>${article.title}</h3>
          <p>${article.description}</p>
          <a href="${article.url}" target="_blank">Read more</a>
        </div>
      `).join('');
      document.getElementById('news').innerHTML = `
        <h2>Today's News</h2>
        ${articles}
      `;
    };
  
    // Navigate to the initial page (Home)
    navigate('home');
  });
  