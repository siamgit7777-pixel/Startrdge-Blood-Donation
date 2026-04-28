document.addEventListener("DOMContentLoaded", () => {
  // Icons load
  lucide.createIcons();

  // ====== PAGE TOGGLE ======
  const loginPage = document.getElementById("loginPage");
  const registerPage = document.getElementById("registerPage");

  const registerBtn = document.getElementById("registerBtn");
  const loginLink = document.getElementById("loginLink");

  if (registerBtn && loginPage && registerPage) {
    registerBtn.addEventListener("click", (e) => {
      e.preventDefault();
      loginPage.classList.add("hidden");
      registerPage.classList.remove("hidden");
    });
  }

  if (loginLink && loginPage && registerPage) {
    loginLink.addEventListener("click", (e) => {
      e.preventDefault();
      registerPage.classList.add("hidden");
      loginPage.classList.remove("hidden");
    });
  }

  // ====== TOAST ======
  const submitBtn = document.getElementById("submitBtn");
  const toast = document.getElementById("toast");

  if (submitBtn && toast) {
    submitBtn.addEventListener("click", () => {
      const originalContent = submitBtn.innerHTML;

      // loading
      submitBtn.innerHTML = `
        <svg class="animate-spin w-4 h-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
        </svg>
        Processing...
      `;
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = originalContent;
        submitBtn.disabled = false;
        lucide.createIcons();

        toast.classList.add("show");

        setTimeout(() => {
          toast.classList.remove("show");
        }, 3000);
      }, 1500);
    });
  }

  // ====== URGENT TOGGLE ======
  const urgentToggle = document.getElementById("urgentToggle");
  const urgentBanner = document.getElementById("urgentBanner");
  const urgentLabel = document.getElementById("urgentLabel");

  let isUrgent = false;

  if (urgentToggle && urgentBanner && urgentLabel) {
    urgentToggle.addEventListener("click", () => {
      isUrgent = !isUrgent;

      if (isUrgent) {
        urgentBanner.classList.remove("hidden");
        urgentLabel.innerText = "Urgent ON";
        urgentToggle.classList.add("bg-red-100");
      } else {
        urgentBanner.classList.add("hidden");
        urgentLabel.innerText = "Mark Urgent";
        urgentToggle.classList.remove("bg-red-100");
      }
    });
  }
});
