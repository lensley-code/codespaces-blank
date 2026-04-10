/**
 * Free Book Opt-in Popup
 *
 * Configurable popup that collects email addresses for newsletter signup
 * and free spiritual guide delivery.
 *
 * Usage:
 *   FreeBookPopup.init({ delayMs: 5000, triggerSelector: '.open-popup-btn' });
 */
const FreeBookPopup = (() => {
  const STORAGE_KEY = 'freeBookPopupDismissed';
  const STORAGE_SUBSCRIBED_KEY = 'freeBookSubscribed';

  let overlay = null;
  let form = null;
  let emailInput = null;
  let errorMsg = null;
  let formWrapper = null;
  let successWrapper = null;
  let scrollTimer = null;
  let delayTimer = null;

  function isAlreadyDismissed() {
    try {
      return sessionStorage.getItem(STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  }

  function isAlreadySubscribed() {
    try {
      return localStorage.getItem(STORAGE_SUBSCRIBED_KEY) === 'true';
    } catch {
      return false;
    }
  }

  function markDismissed() {
    try {
      sessionStorage.setItem(STORAGE_KEY, 'true');
    } catch { /* noop */ }
  }

  function markSubscribed() {
    try {
      localStorage.setItem(STORAGE_SUBSCRIBED_KEY, 'true');
    } catch { /* noop */ }
  }

  function open() {
    if (!overlay) return;
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    setTimeout(() => emailInput && emailInput.focus(), 400);
  }

  function close() {
    if (!overlay) return;
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    markDismissed();
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function showError(msg) {
    if (!emailInput || !errorMsg) return;
    emailInput.classList.add('error');
    errorMsg.textContent = msg;
    errorMsg.classList.add('visible');
  }

  function clearError() {
    if (!emailInput || !errorMsg) return;
    emailInput.classList.remove('error');
    errorMsg.classList.remove('visible');
  }

  function showSuccess() {
    if (formWrapper) formWrapper.style.display = 'none';
    if (successWrapper) successWrapper.classList.add('visible');
    markSubscribed();
  }

  function handleSubmit(e, onSubmit) {
    e.preventDefault();
    clearError();

    const email = emailInput ? emailInput.value.trim() : '';

    if (!email) {
      showError('Please enter your email address.');
      return;
    }
    if (!validateEmail(email)) {
      showError('Please enter a valid email address.');
      return;
    }

    if (typeof onSubmit === 'function') {
      onSubmit(email);
    } else {
      console.log('[FreeBookPopup] Email submitted:', email);
    }

    showSuccess();

    setTimeout(() => close(), 3500);
  }

  function buildPopupHTML() {
    return `
      <div class="popup-overlay" id="freeBookPopup" role="dialog" aria-modal="true" aria-labelledby="popupHeading">
        <div class="popup-container">
          <button class="popup-close" aria-label="Close popup">&times;</button>

          <div class="popup-image">
            <img src="assets/images/zodiac-wheel.svg" alt="Zodiac wheel with astrological signs" />
          </div>

          <div class="popup-content">
            <div class="popup-stars" aria-hidden="true">&#9733;&#9733;&#9733;&#9733;&#9733;</div>

            <h2 class="popup-heading" id="popupHeading">Receive Your Free Spiritual Guide</h2>

            <p class="popup-description">
              Enter your email below to unlock your personalized astrological chart reading and our 2024 celestial handbook.
            </p>

            <div class="popup-form-wrapper">
              <form class="popup-form" novalidate>
                <div class="popup-input-wrapper">
                  <input
                    type="email"
                    class="popup-input"
                    placeholder="Email address"
                    aria-label="Email address"
                    autocomplete="email"
                    required
                  />
                  <div class="popup-error-msg" role="alert"></div>
                </div>
                <button type="submit" class="popup-submit">Get My Free Book</button>
              </form>

              <p class="popup-disclaimer">
                By signing up, you agree to receive spiritual insights and updates. You can unsubscribe at any time.
              </p>
            </div>

            <div class="popup-success">
              <div class="popup-success-icon">&#10024;</div>
              <h3>Welcome to the Journey!</h3>
              <p>Check your inbox for your free spiritual guide. Your celestial handbook is on its way.</p>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function init(options = {}) {
    const {
      delayMs = 5000,
      scrollPercent = 40,
      triggerSelector = null,
      onSubmit = null,
    } = options;

    if (isAlreadySubscribed()) return;

    document.body.insertAdjacentHTML('beforeend', buildPopupHTML());

    overlay = document.getElementById('freeBookPopup');
    form = overlay.querySelector('.popup-form');
    emailInput = overlay.querySelector('.popup-input');
    errorMsg = overlay.querySelector('.popup-error-msg');
    formWrapper = overlay.querySelector('.popup-form-wrapper');
    successWrapper = overlay.querySelector('.popup-success');

    overlay.querySelector('.popup-close').addEventListener('click', close);

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) close();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && overlay.classList.contains('active')) close();
    });

    form.addEventListener('submit', (e) => handleSubmit(e, onSubmit));

    emailInput.addEventListener('input', clearError);

    if (triggerSelector) {
      document.querySelectorAll(triggerSelector).forEach((el) => {
        el.addEventListener('click', (e) => {
          e.preventDefault();
          open();
        });
      });
    }

    if (!isAlreadyDismissed()) {
      if (delayMs > 0) {
        delayTimer = setTimeout(() => {
          if (!isAlreadyDismissed()) open();
        }, delayMs);
      }

      if (scrollPercent > 0) {
        const scrollHandler = () => {
          const scrolled = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
          if (scrolled >= scrollPercent && !isAlreadyDismissed()) {
            open();
            window.removeEventListener('scroll', scrollHandler);
          }
        };
        window.addEventListener('scroll', scrollHandler, { passive: true });
      }
    }
  }

  return { init, open, close };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = FreeBookPopup;
}
