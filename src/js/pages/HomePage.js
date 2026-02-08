export function HomePage() {
  const container = document.createElement('div');
  container.id = 'main-page';
  container.innerHTML = `
    <section class='hero'>
      <div class='hero-logo-container'>
        <img src='./assets/icons/heroLogo.svg' class='hero-logo' alt='Hero Logo' />
        <img src='./assets/icons/heroLogobtn.svg' alt='Hero Logo Button' class='hero-logo-btn' />
      </div>
      <h1>The Best Streaming Experience</h1>
      <p>StreamVibe is the best streaming experience for watching your favorite movies and shows on demand, anytime, anywhere. With StreamVibe, you can enjoy a wide variety of content, including the latest blockbusters, classic movies, popular TV shows, and more. You can also create your own watchlists, so you can easily find the content you want to watch.</p>
      <a href="#/search" class='hero-btn'>
        <img src='./assets/icons/HeroIcon.svg' alt='Play button' class='hero-btn-icon' />
        Start Watching
      </a>
     </section>
  `;



  return container;
}