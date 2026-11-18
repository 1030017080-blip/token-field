const pages = ['catalog', 'benefits', 'playbook', 'automation', 'reset', 'skills', 'plan', 'feedback', 'about', 'opensource'];

function showPage() {
  const hash = location.hash.slice(1);
  const page = pages.includes(hash) ? hash : 'catalog';
  if (hash === 'products' || hash === 'support') {
    history.replaceState(history.state, '', '#catalog');
  }
  document.querySelectorAll('main > section').forEach(section => {
    section.hidden = section.id !== page;
  });
  document.querySelectorAll('.sidebar nav a').forEach(link => {
    link.classList.toggle('selected', link.getAttribute('href') === '#' + page);
  });
  window.scrollTo(0, 0);
}

window.addEventListener('hashchange', showPage);
showPage();
