// ============ JS – interações do usuário ============

// Ano atual no footer
document.getElementById('year').textContent = new Date().getFullYear();

// Nav ativo por scroll
const links = document.querySelectorAll('.nav-link');
const sections = ['inicio','arduino','sensores','programacao','sobre'].map(id => document.getElementById(id));
window.addEventListener('scroll', () => {
  let current = 'inicio';
  const y = window.scrollY + 120;
  sections.forEach(sec => { if (sec && sec.offsetTop <= y) current = sec.id; });
  links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + current));
});

// Expand/collapse detalhes do sensor
document.querySelectorAll('.btn-detail').forEach(btn => {
  btn.addEventListener('click', () => {
    const details = btn.nextElementSibling;
    const open = !details.hidden;
    details.hidden = open;
    btn.setAttribute('aria-expanded', String(!open));
    btn.textContent = open ? 'Ver detalhes ▾' : 'Ocultar detalhes ▴';
  });
});

// Filtro por texto + categoria
const q = document.getElementById('q');
const cat = document.getElementById('cat');
const cards = document.querySelectorAll('.sensor-card');
const empty = document.getElementById('empty');
function filtrar() {
  const txt = q.value.trim().toLowerCase();
  const c = cat.value;
  let visiveis = 0;
  cards.forEach(card => {
    const okTxt = !txt || card.dataset.search.includes(txt);
    const okCat = !c || card.dataset.cat === c;
    const show = okTxt && okCat;
    card.style.display = show ? '' : 'none';
    if (show) visiveis++;
  });
  empty.style.display = visiveis === 0 ? 'block' : 'none';
}
q.addEventListener('input', filtrar);
cat.addEventListener('change', filtrar);
