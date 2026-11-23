/* ==========================================================================
   DELVIN ANTONY CABRAL — PORTFOLIO INTERACTIONS & UTILITIES
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Automatic Copyright Year
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Mobile Navigation Drawer
  const menuToggle = document.getElementById('menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');

  if (menuToggle && mobileDrawer) {
    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!isExpanded));
      mobileDrawer.setAttribute('aria-hidden', String(isExpanded));
      mobileDrawer.classList.toggle('open', !isExpanded);
      document.body.style.overflow = !isExpanded ? 'hidden' : '';
    });

    mobileDrawer.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        menuToggle.setAttribute('aria-expanded', 'false');
        mobileDrawer.setAttribute('aria-hidden', 'true');
        mobileDrawer.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // 3. Copy Email Interaction
  const copyButtons = document.querySelectorAll('.copy-email-btn');
  copyButtons.forEach((btn) => {
    btn.addEventListener('click', async () => {
      const email = btn.getAttribute('data-email') || 'delvinantonycabral@gmail.com';
      const originalText = btn.textContent.trim();

      try {
        await navigator.clipboard.writeText(email);
        btn.textContent = 'Copied to Clipboard ✓';
      } catch {
        const tempInput = document.createElement('input');
        tempInput.value = email;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        btn.textContent = 'Copied to Clipboard ✓';
      }

      setTimeout(() => {
        btn.textContent = originalText;
      }, 2400);
    });
  });

  // 4. Client-Side Mailto Composer (Contact Page)
  const mailtoForm = document.getElementById('mailto-form');
  if (mailtoForm) {
    mailtoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('sender-name').value.trim();
      const subject = document.getElementById('message-subject').value.trim();
      const body = document.getElementById('message-body').value.trim();

      const fullSubject = encodeURIComponent(`${subject} — from ${name}`);
      const fullBody = encodeURIComponent(`Hi Delvin,

${body}

Best regards,
${name}`);
      window.location.href = `mailto:delvinantonycabral@gmail.com?subject=${fullSubject}&body=${fullBody}`;
    });
  }

  // 5. Scroll-Triggered Reveal Animations (Respects Reduced Motion)
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealElements = document.querySelectorAll('.reveal');

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealElements.forEach((el) => el.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    );

    revealElements.forEach((el) => observer.observe(el));
  }
});
