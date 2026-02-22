export function Footer() {
  const footer = document.createElement('footer');
  footer.innerHTML = `
    <div class='footer-link-container'>
      <ul class='footer-links'>
        <li>
          <a href='#/home'>Home</a>
        </li>
        <li>
          <p>Categories</p>
        </li>
        <li>
          <p>Devices</p>
        </li>
        <li>
          <p>Pricing</p>
        </li>
        <li>
          <p>FAQ</p>
        </li>
      </ul>
      <ul class='footer-links'>
        <li>
          <a href='#/movies&shows'>Movies</a>
        </li>
        <li>
          <p>Gernes</p>
        </li>
        <li>
          <p>Trending</p>
        </li>
        <li>
          <p>New Release</p>
        </li>
        <li>
          <p>Popular</p>
        </li>
      </ul>
      <ul class='footer-links'>
        <li>
          <a href='#/movies&shows'>Shows</a>
        </li>
        <li>
          <p>Gernes</p>
        </li>
        <li>
          <p>Trending</p>
        </li>
        <li>
          <p>New Release</p>
        </li>
        <li>
          <p>Popular</p>
        </li>
      </ul>
      <ul class='footer-links'>
        <li>
          <a href='#/support'>Support</a>
        </li>
        <li>
          <p>Contact Us</p>
        </li>
      </ul>
      <ul class='footer-links'>
        <li>
          <a href='#/subscription'>Subscription</a>
        </li>
        <li>
          <p>Plans</p>
        </li>
        <li>
          <p>Features</p>
        </li>
      </ul>
      <ul class='footer-links'>
        <li>
          <a href='#/home'>Connect With Us</a>
        </li>
        <li class='footer-social'>
          <div>
            <img src='./assets/icons/FBIcon.svg' a;t='Facebook icon' /> 
          </div>
          <div>
            <img src='./assets/icons/XIcon.svg' a;t='Facebook icon' /> 
          </div>
          <div>
            <img src='./assets/icons/LNIcon.svg' a;t='Facebook icon' /> 
          </div>
        </li>
      </ul>
    </div>
    <div class='footer-privacy'>
      <p>&copy; 2026 Movie Discovery Platform</p>
      <div class='footer-privacy-links'>
        <p>Terms of Use</p>
        <p>Privacy Policy</p>
        <p>Cookie Policy</p>
      </div>
  `;

  return footer;
}