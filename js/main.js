// Load button definitions and render interactive cards.
fetch('data/buttons.json')
  .then(res => res.json())
  .then(buttons => {
    const container = document.getElementById('buttons-container');
    container.innerHTML = '';
    buttons.forEach(btn => {
      // use anchor for semantic navigation, with role=button for clarity
      const a = document.createElement('a');
      a.className = 'button-card';
      a.href = btn.link;
      a.setAttribute('role', 'button');
      a.setAttribute('aria-label', btn.title);

      // visual content
      const title = document.createElement('span');
      title.className = 'btn-title';
      title.textContent = btn.title;
      a.appendChild(title);

      // apply custom color if provided
      if (btn.color) a.style.background = btn.color;

      // click: play ripple then navigate (small delay so user sees feedback)
      a.addEventListener('click', (e) => {
        e.preventDefault();
        const rect = a.getBoundingClientRect();
        const ripple = document.createElement('span');
        ripple.className = 'bubble';
        const size = Math.max(rect.width, rect.height) * 1.2;
        ripple.style.width = ripple.style.height = size + 'px';
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        a.appendChild(ripple);
        setTimeout(() => { ripple.remove(); window.location.href = a.href; }, 220);
      });

      // keyboard support (Enter / Space)
      a.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          a.click();
        }
      });

      container.appendChild(a);
    });
  })
  .catch(err => console.error('Failed to load buttons.json', err));
