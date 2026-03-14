import { getMoviesPage } from "../api/api.js";

export async function SupportPage() {
  const moviePage = await getMoviesPage(3);
  const movieData = moviePage.results;
  const supportpage = document.createElement("div");
  supportpage.id = "support-page";

  const supportHeader = document.createElement("section");
  supportHeader.className = "support-header";
  supportHeader.innerHTML = `
    <div class='support-headings'>
      <h2>Welcome to our support page!</h2>
      <p>We're here to help you with any problems you may be having with our product.</p>
    </div>
    <div class='support-posters-frame'>
      <div class='support-posters-list'></div>
    </div>
  `;
  function renderPosters() {
    const container = supportHeader.querySelector(".support-posters-list");
    container.innerHTML = movieData
      .slice(0, 16)
      .map(
        (p) => `
          <div class='support-posters-list__container'>
            <img src='https://image.tmdb.org/t/p/original${p.poster_path}' />
          </div>        
        `,
      )
      .join("");
  }

  const supportForm = document.createElement("section");
  supportForm.className = "support-form";
  supportForm.innerHTML = `
    <form class='support-form-info'>
      <div class='username'>
        <label for='username'>First Name</label>
        <input id='username' type='text' placeholder='Enter First Name' required />
      </div>
      <div class='usersurname'>
        <label for='usersurname'>Last Name</label>
        <input id='usersurname' type='text' placeholder='Enter Last Name' required />
      </div>
      <div class='useremail'>
        <label for='useremail'>Email</label>
        <input id='useremail' type='email' placeholder='Enter Your Email' required />
      </div>
      <div class='phone'>
        <label for='phone'>Phone Number</label>
        <input id='phone' type='tel' placeholder='Enter Phone Number' required />
      </div>
      <div class='message'>
        <label for='message'>Message</label>
        <textarea id='message' type='textarea' placeholder='Enter Your Message' rows='4' required></textarea>
      </div>
      <div class='policy'>
        <input type='checkbox' id='checkbox' />
        <label for='checkbox'>I agree with Terms of Use and Privacy Policy</label>
      </div>
      <div class='submit-button'>
        <button>Send Message</button>
      </div>
    </form>
  `;

  const faqSection = document.createElement("section");
  faqSection.className = "faqSection";
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

  renderPosters();

  supportpage.append(supportHeader);
  supportpage.append(supportForm);
  supportpage.append(faqSection);

  const listQuestions = faqSection.querySelector(".faq-questions");

  listQuestions.addEventListener("click", (e) => {
    const item = e.target.closest(".faq-question");
    if (!item) return;

    const desc = item.querySelector(".faq-description");
    const btn = item.querySelector(".faq-question-btn");
    const secondSpan = btn.children[1];

    desc.classList.toggle("visiable");
    secondSpan.classList.toggle("is-closed");
    item.classList.toggle("is-reveal");

  });
  return supportpage;
}
