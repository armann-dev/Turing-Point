// Turing Point — shared site behaviour

(function () {
  // Mobile nav toggle
  var burger = document.querySelector('.hamburger');
  var mobileNav = document.querySelector('.mobile-nav');
  if (burger && mobileNav) {
    burger.addEventListener('click', function () {
      var isOpen = burger.getAttribute('aria-expanded') === 'true';
      burger.setAttribute('aria-expanded', String(!isOpen));
      mobileNav.classList.toggle('open', !isOpen);
      document.body.classList.toggle('nav-open', !isOpen);
    });
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        burger.setAttribute('aria-expanded', 'false');
        mobileNav.classList.remove('open');
        document.body.classList.remove('nav-open');
      });
    });
  }

  // Scroll reveal
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }
})();

// Project links: until a real project URL is filled in (href="#"), clicking
// the thumbnail or "View Site" button should do nothing instead of jumping
// to the top of the page.
(function () {
  document.querySelectorAll('[data-project-link]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var href = link.getAttribute('href');
      if (!href || href === '#') {
        e.preventDefault();
      }
    });
  });
})();

// Contact form: client-side validation only.
// NOTE: No backend is configured yet. Replace the TODO block below with a
// real endpoint (e.g. Formspree, Web3Forms, or a custom backend) before
// relying on this form to receive enquiries.
(function () {
  var form = document.getElementById('enquiry-form');
  if (!form) return;

  var status = document.getElementById('form-status');

  function setFieldState(field) {
    var wrapper = field.closest('.field');
    if (!wrapper) return;
    field.setAttribute('data-touched', 'true');
    if (field.checkValidity()) {
      wrapper.classList.remove('invalid');
    } else {
      wrapper.classList.add('invalid');
    }
  }

  form.querySelectorAll('input, textarea, select').forEach(function (field) {
    field.addEventListener('blur', function () { setFieldState(field); });
    field.addEventListener('input', function () {
      if (field.getAttribute('data-touched') === 'true') setFieldState(field);
    });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var valid = form.checkValidity();

    if (!valid) {
      form.querySelectorAll('input, textarea, select').forEach(setFieldState);
      status.textContent = 'Please fill in the required fields before sending.';
      status.className = 'form-status show error';
      var firstInvalid = form.querySelector(':invalid');
      if (firstInvalid) firstInvalid.focus();
      return;
    }
    var formData = {
      name: form.querySelector('[name="name"]').value.trim(),
      company: form.querySelector('[name="company"]').value.trim(),
      email: form.querySelector('[name="email"]').value.trim(),
      phone: form.querySelector('[name="phone"]').value.trim(),
      need: form.querySelector('[name="need"]:checked')?.value || "",
      budget: form.querySelector('[name="budget"]:checked')?.value || "",
      details: form.querySelector('[name="details"]').value.trim()
    };

    status.textContent = 'Sending your enquiry...';
    status.className = 'form-status show info';

    fetch('https://script.google.com/macros/s/AKfycbxoU-zVZR5AmIwKw3CBTbYvZ-1TiZ5txoH00IsN7gGB2V2FQrUb8AtFbuow2-9-eGhkCA/exec', {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      },
      body: JSON.stringify(formData)
    })
    .then(function () {
      status.textContent = 'Thank you! Your enquiry has been sent successfully. We’ll get back to you soon.';
      status.className = 'form-status show success';
      form.reset();
    })
    .catch(function (error) {
      console.error(error);
      status.textContent = 'Something went wrong. Please contact us on WhatsApp or email.';
      status.className = 'form-status show error';
    });
  });
})();

function toggleContactMenu(menuId) {
  const selectedMenu = document.getElementById(menuId);
  if (!selectedMenu) return;

  document.querySelectorAll(".floating-menu").forEach(menu => {
    if (menu !== selectedMenu) {
      menu.classList.remove("show");
    }
  });

  selectedMenu.classList.toggle("show");
}

document.addEventListener("click", function (event) {
  if (!event.target.closest(".floating-contact")) {
    document.querySelectorAll(".floating-menu").forEach(menu => {
      menu.classList.remove("show");
    });
  }
});



