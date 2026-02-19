export function Footer() {
  const footer = document.createElement('footer');
  footer.innerHTML = `
    <ul class='footer-links'>
      <li>
        <a href='#/home'>Home</a>
      </li>
    </ul>
    <p>&copy; 2026 Movie Discovery Platform</p>
  `;

  return footer;
}