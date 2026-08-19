window.addEventListener("load", () => {
    document.body.style.display = "block";
});
// const COLS = 10, ROWS = 5;
// const COLORS = ['#3C61F5', '#BB6EF6', '#F6B254'];
// const PATTERNS = {
//   '#3C61F5': 'url("/svg/bluePaternFull.svg")',
//   '#BB6EF6': 'url("/svg/purplePaternFull.svg")',
//   '#F6B254': 'url("/svg/orangePaternFull.svg")',
// };
// let ci = parseInt(sessionStorage.getItem('loopColorIndex') || '0');
// let cells = [];
// const logo = document.getElementById('pt-logo');

// function buildGrid() {
//   const grid = document.getElementById('pt-grid');
//   grid.style.gridTemplateColumns = `repeat(${COLS}, 1fr)`;
//   grid.style.gridTemplateRows = `repeat(${ROWS}, 1fr)`;
//   for (let r = 0; r < ROWS; r++) {
//     for (let c = 0; c < COLS; c++) {
//       const d = document.createElement('div');
//       d.className = 'pt-cell';
//       grid.appendChild(d);
//       cells.push({ el: d, r, c });
//     }
//   }
// }

// function applyPattern(el, color) {
//   el.style.backgroundColor = color;
//   el.style.backgroundImage = PATTERNS[color] || '';
//   el.style.backgroundSize = 'cover';
//   el.style.backgroundRepeat = 'no-repeat';
// }

// function fillGrid(color, duration) {
//   return new Promise(resolve => {
//     cells.forEach(({ el, r }) => {
//       const d = (ROWS - 1 - r) / (ROWS - 1);
//       const delay = d * duration * 0.8;
//       applyPattern(el, color);
//       el.style.transition = `transform 280ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`;
//       el.style.transform = 'scale(1.41)';
//     });
//     setTimeout(() => logo.classList.add('visible'), duration * 0.4);
//     setTimeout(resolve, duration * 0.8 + 300);
//   });
// }

// function emptyGrid(duration) {
//   return new Promise(resolve => {
//     cells.forEach(({ el, r }) => {
//       const d = r / (ROWS - 1);
//       const delay = d * duration * 0.8;
//       el.style.transition = `transform 220ms cubic-bezier(0.76,0,0.24,1) ${delay}ms`;
//       el.style.transform = 'scale(0)';
//     });
//     setTimeout(() => logo.classList.remove('visible'), 80);
//     setTimeout(resolve, duration * 0.8 + 300);
//   });
// }

// const saved = sessionStorage.getItem('loopColor');
// const grid = document.getElementById('pt-grid');

// if (saved) {
//   grid.style.gridTemplateColumns = `repeat(${COLS}, 1fr)`;
//   grid.style.gridTemplateRows = `repeat(${ROWS}, 1fr)`;
//   for (let r = 0; r < ROWS; r++) {
//     for (let c = 0; c < COLS; c++) {
//       const d = document.createElement('div');
//       d.className = 'pt-cell';
//       applyPattern(d, saved);
//       d.style.transform = 'scale(1.41)';
//       d.style.transition = 'none';
//       grid.appendChild(d);
//       cells.push({ el: d, r, c });
//     }
//   }
//   requestAnimationFrame(() => {
//     const cover = document.getElementById('pt-flash-cover');
//     if (cover) cover.remove();
//     emptyGrid(480);
//   });
// } else {
//   buildGrid();
// }

// document.addEventListener('click', async (e) => {
//   const link = e.target.closest('a');
//   if (!link) return;
//   const href = link.getAttribute('href');
//   if (!href) return;
//   if (
//     (link.hostname && link.hostname !== location.hostname) ||
//     href.startsWith('#') ||
//     href.startsWith('tel:') ||
//     href.startsWith('mailto:') ||
//     link.target === '_blank'
//   ) return;

//   e.preventDefault();
//   const color = COLORS[ci % COLORS.length];
//   ci++;
//   sessionStorage.setItem('loopColor', color);
//   sessionStorage.setItem('loopColorIndex', ci);
//   await fillGrid(color, 580);
//   window.location.href = href;
// });
