import { tmdbAPI, getMoviespages } from '../api/api.js';

export async function HomePage() {
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

  const genresData = await tmdbAPI.getGenreMovies();
  const movies = await getMoviespages(5);

  const genreSection = createGenreSection(genresData.genres, movies);
  container.append(genreSection);

  function renderPosters(containerEl, movies, limit) {
    containerEl.innerHTML = '';

    const posters = movies 
      .filter(e => e.poster_path)
      .slice(0, limit);

    posters.forEach(movies => {
      const img = document.createElement('img');
      img.src = `https://image.tmdb.org/t/p/w500${movies.poster_path}`;
      img.alt = 'Poster image';
      containerEl.append(img);
    });
  };

  function createGenreSection(genres, movies) {
    const genreSection = document.createElement('section');
    genreSection.className = 'genre-section';
    genreSection.innerHTML = `
      <div class='genre-header'>
        <div class='genre-info'>
          <h2>Explore our wide variety of categories</h2>
          <p>Whether you're looking for a comedy to make you laugh, a drama to make you think, or a documentary to learn something new</p>
        </div>
        <div class='genre-btns'>
          <button class='genre-prev genre-btn-bgc'><img src='./assets/icons/prevArrow.svg' /></button>
          <button class='genre-next genre-btn-bgc'><img src='./assets/icons/nextArrow.svg' /></button>
        </div>
      </div>

      <div class='genre-list'></div>
    `;
    
    const listEl = genreSection.querySelector('.genre-list');
    const prevBtn = genreSection.querySelector('.genre-prev');
    const nextBtn = genreSection.querySelector('.genre-next');

    let startIndex = 0;
    const pageSize = 4;
    const step = 4;

    function renderGenres() {
      listEl.innerHTML = genres
        .slice(startIndex, startIndex + pageSize)
        .map(g => `
          <a href="#/search?genre=${g.id}" class='genre-item'>
            <div class='genre-img-list' data-genre-id='${g.id}'></div>
            <div class='genre-footer'>
              <span>${g.name}</span>
              <img src='./assets/icons/arrowRight.svg' />
            </div>
          </a>
        `)
        .join('');
    }
  

    function hydratePosters() {
      const containers = genreSection.querySelectorAll('.genre-img-list');
      containers.forEach(containerEl => {
        const genreid = Number(containerEl.dataset.genreId);

        const moviesForGenres = movies.filter(m => 
          Array.isArray(m.genre_ids) && m.genre_ids.includes(genreid)
        )

        renderPosters(containerEl, moviesForGenres, 4);
      })
    }

    function render() {
      renderGenres();
      hydratePosters();

      const maxStart = Math.max(0, genres.length - pageSize);
      prevBtn.disabled = startIndex === 0;
      nextBtn.disabled = startIndex === maxStart;
    }

    prevBtn.addEventListener('click', () => {
      startIndex = Math.max(0, startIndex - step);
      render();
    });

    nextBtn.addEventListener('click', () => {
      const maxStart = Math.max(0, genres.length - pageSize);
      startIndex = Math.min(maxStart, startIndex + step);
      render();
    });

    render();

    return genreSection;
  }

  const deviceCompatibilitySection = document.createElement('section');
  deviceCompatibilitySection.className = 'deviceCompatibilitySection';
  deviceCompatibilitySection.innerHTML = `
    <div class='device-compatibility-header'>
      <h2>We Provide you streaming experience across various devices.</h2>
      <p>With StreamVibe, you can enjoy your favorite movies and TV shows anytime, anywhere.</p>
    </div>

    <div class='device-compatibility-info'>
      <div class='device-compatibility-info___card'>
        <div class='card-name'>
          <div class='card-img'>
            <img src='./assets/icons/cardPhone.svg' />
          </div>
          <h3>Smartphones</h3>
        </div>
        <p>StreamVibe is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store</p>
      </div>
      <div class='device-compatibility-info___card'>
        <div class='card-name'>
          <div class='card-img'>
            <img src='./assets/icons/cardTablet.svg' />
          </div>
          <h3>Smartphones</h3>
        </div>
        <p>StreamVibe is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store</p>
      </div>
      <div class='device-compatibility-info___card'>
        <div class='card-name'>
          <div class='card-img'>
            <img src='./assets/icons/cardTv.svg' />
          </div>
          <h3>Smartphones</h3>
        </div>
        <p>StreamVibe is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store</p>
      </div>
      <div class='device-compatibility-info___card'>
        <div class='card-name'>
          <div class='card-img'>
            <img src='./assets/icons/cardLaptop.svg' />
          </div>
          <h3>Smartphones</h3>
        </div>
        <p>StreamVibe is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store</p>
      </div>
      <div class='device-compatibility-info___card'>
        <div class='card-name'>
          <div class='card-img'>
            <img src='./assets/icons/cardGaming.svg' />
          </div>
          <h3>Smartphones</h3>
        </div>
        <p>StreamVibe is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store</p>
      </div>
      <div class='device-compatibility-info___card'>
        <div class='card-name'>
          <div class='card-img'>
            <img src='./assets/icons/cardVr.svg' />
          </div>
          <h3>Smartphones</h3>
        </div>
        <p>StreamVibe is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store</p>
      </div>
    </div>
  `
  container.append(deviceCompatibilitySection);

  const faqSection = document.createElement('section');
  faqSection.className = 'faqSection';
  faqSection.innerHTML = `
    <div class='faq-header'>
      <div class='faq-header-info'>
        <h2>Frequently Asked Questions</h2>
        <p>Got questions? We've got answers! Check out our FAQ section to find answers to the most common questions about StreamVibe.</p>
      </div>
      <div class='faq-header-info-btn'>
        <button>Ask a Question</button>
      </div>  
    </div>

    <div class='faq-questions'>
      <div class='faq-question'>
        <div class='faq-question-info'>
          <p>0 1</p>
          <h3>What is StreamVibe?</h3>
          <div class='faq-question-btn'>
            <span></span>
            <span></span>
          </div>
        </div>
        <p class='faq-description'>StreamVibe is a streaming service that allows you to watch movies and shows on demand.</p>
      </div>

      <div class='faq-question'>
        <div class='faq-question-info'>
          <p>02</p>
          <h3>How much does StreamVibe cost?</h3>
          <div class='faq-question-btn'>
            <span></span>
            <span></span>
          </div>
        </div>
        <p class='faq-description'>StreamVibe is a streaming service that allows you to watch movies and shows on demand.</p>
      </div>

      <div class='faq-question'>
        <div class='faq-question-info'>
          <p>03</p>
          <h3>What content is available on StreamVibe?</h3>
          <div class='faq-question-btn'>
            <span></span>
            <span></span>
          </div>
        </div>
        <p class='faq-description'>StreamVibe is a streaming service that allows you to watch movies and shows on demand.</p>
      </div>

      <div class='faq-question'>
        <div class='faq-question-info'>
          <p>04</p>
          <h3>How can I watch StreamVibe?</h3>
          <div class='faq-question-btn'>
            <span></span>
            <span></span>
          </div>
        </div>
        <p class='faq-description'>StreamVibe is a streaming service that allows you to watch movies and shows on demand.</p>
      </div>

      <div class='faq-question'>
        <div class='faq-question-info'>
          <p>05</p>
          <h3>How do I sign up for StreamVibe?</h3>
          <div class='faq-question-btn'>
            <span></span>
            <span></span>
          </div>
        </div>
        <p class='faq-description'>StreamVibe is a streaming service that allows you to watch movies and shows on demand.</p>
      </div>

      <div class='faq-question'>
        <div class='faq-question-info'>
          <p>06</p>
          <h3>What is the StreamVibe free trial?</h3>
          <div class='faq-question-btn'>
            <span></span>
            <span></span>
          </div>
        </div>
        <p class='faq-description'>StreamVibe is a streaming service that allows you to watch movies and shows on demand.</p>
      </div>

      <div class='faq-question'>
        <div class='faq-question-info'>
          <p>07</p>
          <h3>How do I contact StreamVibe customer support?</h3>
          <div class='faq-question-btn'>
            <span></span>
            <span></span>
          </div>
        </div>
        <p class='faq-description'>StreamVibe is a streaming service that allows you to watch movies and shows on demand.</p>
      </div>

      <div class='faq-question'>
        <div class='faq-question-info'>
          <p>08</p>
          <h3>What are the StreamVibe payment methods?</h3>
          <div class='faq-question-btn'>
            <span></span>
            <span></span>
          </div>
        </div>
        <p class='faq-description'>StreamVibe is a streaming service that allows you to watch movies and shows on demand.</p>
      </div>
    </div>
  `;

  container.append(faqSection);

  const listQuestions = faqSection.querySelector('.faq-questions');

  listQuestions.addEventListener('click', (e) => {
    const item = e.target.closest('.faq-question');
    console.log('target', e.target);
    console.log('btn', item);
    if(!item) return;
    
    const desc = item.querySelector('.faq-description'); 
    const btn = item.querySelector('.faq-question-btn');
    const secondSpan = btn.children[1];

    desc.classList.toggle('visiable')
    secondSpan.classList.toggle('is-closed')
  })

  const subscriptionSection = document.createElement('section');
  subscriptionSection.className = 'subscription';

  subscriptionSection.innerHTML = `
    <div class='subscription-header'>
      <div class='subscription-header-info'>
        <h2>Choose the plan that's right for you</h2>
        <p>Join StreamVibe and select from our flexible subscription options tailored to suit your viewing preferences. Get ready for non-stop entertainment!</p>
      </div>
      <div class='subscription-header-btns'>
        <button class='subscription-btn subscription-hover'>Monthly</button>
        <button class='subscription-btn'>Yearly</button>
      </div>
    </div>

    <div class='subscription-plans'>
      <div class='subscriprion-plan'>
        <h3>Basic Plan</h3>
        <p>Enjoy an extensive library of movies and shows, featuring a range of content, including recently released titles.</p>
        <div class='subscription-price'>
          <span>$9.99</span>
          <span>/month</span>
        </div>
        <div class='subscription-plan-btns'>
          <button>Start free trial</button>
          <button>Choose plan</button>
        </div>
      </div>
      <div class='subscriprion-plan'>
        <h3>Standard Plan</h3>
        <p>Access to a wider selection of movies and shows, including most new releases and exclusive content</p>
        <div class='subscription-price'>
          <span>$12.99</span>
          <span>/month</span>
        </div>
        <div class='subscription-plan-btns'>
          <button>Start free trial</button>
          <button>Choose plan</button>
        </div>
      </div>
      <div class='subscriprion-plan'>
        <h3>Premium Plan</h3>
        <p>Access to a widest selection of movies and shows, including all new releases and Offline Viewing</p>
        <div class='subscription-price'>
          <span>$14.99</span>
          <span>/month</span>
        </div>
        <div class='subscription-plan-btns'>
          <button>Start free trial</button>
          <button>Choose plan</button>
        </div>
      </div>
    </div>
  `;

  container.append(subscriptionSection);

  const buttons = subscriptionSection.querySelectorAll('.subscription-btn');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('subscription-hover'));
      btn.classList.add('subscription-hover');
      
    })
  })

  return container;
}