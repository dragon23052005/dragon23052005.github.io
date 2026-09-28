/**
 * NGUYEN THANH LONG - PORTFOLIO SCRIPTS
 * script.js
 *
 * Contents:
 *  1. Preloader
 *  2. Navigation (sticky + active link + hamburger)
 *  3. Smooth Scrolling (nav links)
 *  4. Typing Effect (hero)
 *  5. Scroll Reveal Animation
 *  6. Skill Bar Animation
 *  7. Stats Counter Animation
 *  8. Back to Top Button
 *  9. Contact Form Validation
 */

'use strict';

/* ==============================================
   HELPER: Run after DOM is ready
============================================== */
document.addEventListener('DOMContentLoaded', function () {

  /* ============================================
     1. PRELOADER
  ============================================ */
  const preloader = document.getElementById('preloader');
  if (preloader) {
    // Hide preloader after load (min 1.8s for animation)
    window.addEventListener('load', function () {
      setTimeout(function () {
        preloader.classList.add('hidden');
        // Remove from DOM after transition
        preloader.addEventListener('transitionend', function () {
          preloader.remove();
        }, { once: true });
      }, 1800);
    });
  }

  /* ============================================
     2. NAVIGATION
  ============================================ */
  const header     = document.getElementById('header');
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const navLinks   = document.querySelectorAll('.nav-link');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  // Sticky header on scroll
  function handleHeaderScroll() {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleHeaderScroll);
  handleHeaderScroll(); // run once on load

  // Hamburger toggle
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      const isOpen = mobileMenu.classList.contains('open');
      mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('active');
      hamburger.setAttribute('aria-expanded', !isOpen);
      mobileMenu.setAttribute('aria-hidden', isOpen);
    });

    // Close mobile menu when a link is clicked
    mobileLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
      });
    });

    // Close mobile menu on outside click
    document.addEventListener('click', function (e) {
      if (!header.contains(e.target) && mobileMenu.classList.contains('open')) {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
      }
    });
  }

  // Active nav link on scroll (Intersection Observer)
  const sections = document.querySelectorAll('section[id]');
  function updateActiveNav() {
    var scrollY = window.scrollY + 100;
    sections.forEach(function (section) {
      var sectionTop    = section.offsetTop;
      var sectionHeight = section.offsetHeight;
      var sectionId     = section.getAttribute('id');
      var link = document.querySelector('.nav-link[href="#' + sectionId + '"]');
      if (link) {
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          navLinks.forEach(function (l) { l.classList.remove('active'); });
          link.classList.add('active');
        }
      }
    });
  }
  window.addEventListener('scroll', updateActiveNav);
  updateActiveNav();

  /* ============================================
     3. SMOOTH SCROLLING
  ============================================ */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        var offset = target.getBoundingClientRect().top + window.scrollY - 70;
        window.scrollTo({ top: offset, behavior: 'smooth' });
      }
    });
  });

  /* ============================================
     4. TYPING EFFECT (Hero Subtitle)
  ============================================ */
  var typedEl = document.getElementById('typed');
  if (typedEl) {
    var texts = [
      'Software Developer',
      'Software Engineering Student',
      'Java & Spring Boot Dev',
      'Backend Developer',
      'Intern @ FPT Software Academia'
    ];
    var textIndex  = 0;
    var charIndex  = 0;
    var isDeleting = false;
    var typingSpeed = 80;

    function type() {
      var currentText = texts[textIndex];
      if (isDeleting) {
        typedEl.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 40;
      } else {
        typedEl.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 80;
      }

      if (!isDeleting && charIndex === currentText.length) {
        // Pause at end of word
        typingSpeed = 1800;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typingSpeed = 400;
      }
      setTimeout(type, typingSpeed);
    }
    setTimeout(type, 800);
  }

  /* ============================================
     5. SCROLL REVEAL ANIMATION
  ============================================ */
  var revealEls = document.querySelectorAll('.reveal, .reveal-right');

  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        // Stagger children if multiple reveals in same parent
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -60px 0px'
  });

  revealEls.forEach(function (el, index) {
    // Add staggered delay for sibling elements
    var parent = el.parentElement;
    var siblings = parent ? Array.from(parent.querySelectorAll(':scope > .reveal, :scope > .reveal-right')) : [];
    var siblingIndex = siblings.indexOf(el);
    if (siblingIndex > 0) {
      el.style.transitionDelay = (siblingIndex * 0.1) + 's';
    }
    revealObserver.observe(el);
  });

  /* ============================================
     6. SKILL BAR ANIMATION
  ============================================ */
  var skillFills = document.querySelectorAll('.skill-fill');

  var skillObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var fill = entry.target;
        var width = fill.getAttribute('data-width');
        fill.style.width = width + '%';
        skillObserver.unobserve(fill);
      }
    });
  }, { threshold: 0.3 });

  skillFills.forEach(function (fill) { skillObserver.observe(fill); });

  /* ============================================
     7. STATS COUNTER ANIMATION
  ============================================ */
  var statNumbers = document.querySelectorAll('.stat-number');

  function animateCounter(el, target, duration) {
    var start     = 0;
    var startTime = null;
    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      // Easing out
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target;
      }
    }
    requestAnimationFrame(step);
  }

  var counterObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var el     = entry.target;
        var target = parseInt(el.getAttribute('data-target'), 10);
        animateCounter(el, target, 1500);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(function (el) { counterObserver.observe(el); });

  /* ============================================
     8. BACK TO TOP BUTTON
  ============================================ */
  var backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 400) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ============================================
     9. CONTACT FORM VALIDATION
  ============================================ */
  var contactForm    = document.getElementById('contact-form');
  var formFeedback   = document.getElementById('form-feedback');
  var formSubmitBtn  = document.getElementById('form-submit-btn');
  var formBtnText    = formSubmitBtn ? formSubmitBtn.querySelector('.btn-text') : null;

  function getField(id)  { return document.getElementById(id); }
  function getError(id)  { return document.getElementById(id + '-error'); }

  function setError(fieldId, message) {
    var field = getField('contact-' + fieldId);
    var error = getError('contact-' + fieldId);
    if (field)  { field.classList.add('error'); }
    if (error)  { error.textContent = message; }
    return false;
  }
  function clearError(fieldId) {
    var field = getField('contact-' + fieldId);
    var error = getError('contact-' + fieldId);
    if (field)  { field.classList.remove('error'); }
    if (error)  { error.textContent = ''; }
  }
  function clearAllErrors() {
    ['name', 'email', 'subject', 'message'].forEach(clearError);
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validateForm() {
    var valid = true;
    var name    = getField('contact-name')    ? getField('contact-name').value.trim()    : '';
    var email   = getField('contact-email')   ? getField('contact-email').value.trim()   : '';
    var subject = getField('contact-subject') ? getField('contact-subject').value.trim() : '';
    var message = getField('contact-message') ? getField('contact-message').value.trim() : '';

    clearAllErrors();

    if (!name) {
      setError('name', 'Please enter your full name.');
      valid = false;
    } else if (name.length < 2) {
      setError('name', 'Name must be at least 2 characters.');
      valid = false;
    }
    if (!email) {
      setError('email', 'Please enter your email address.');
      valid = false;
    } else if (!validateEmail(email)) {
      setError('email', 'Please enter a valid email address.');
      valid = false;
    }
    if (!subject) {
      setError('subject', 'Please enter a subject.');
      valid = false;
    }
    if (!message) {
      setError('message', 'Please enter your message.');
      valid = false;
    } else if (message.length < 10) {
      setError('message', 'Message must be at least 10 characters.');
      valid = false;
    }
    return valid;
  }

  // Live validation on input
  ['name', 'email', 'subject', 'message'].forEach(function (field) {
    var el = getField('contact-' + field);
    if (el) {
      el.addEventListener('input', function () { clearError('contact-' + field); });
    }
  });

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validateForm()) return;

      // Simulate sending (no real backend)
      if (formSubmitBtn) formSubmitBtn.disabled = true;
      if (formBtnText)   formBtnText.textContent = 'Sending...';

      setTimeout(function () {
        if (formFeedback) {
          formFeedback.className = 'form-feedback success';
          formFeedback.textContent = 'Thank you for your message! I will get back to you soon.';
        }
        contactForm.reset();
        clearAllErrors();
        if (formSubmitBtn) formSubmitBtn.disabled = false;
        if (formBtnText)   formBtnText.textContent = 'Send Message';

        // Hide feedback after 6 seconds
        setTimeout(function () {
          if (formFeedback) {
            formFeedback.className = 'form-feedback';
            formFeedback.textContent = '';
          }
        }, 6000);
      }, 1500);
    });
  }

}); // end DOMContentLoaded
