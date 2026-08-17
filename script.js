const navToggle = document.querySelector(".nav-toggle");
const mainNav = document.querySelector(".main-nav");
const processTabs = document.querySelectorAll(".process-tab");
const processPanels = document.querySelectorAll(".process-panel");
const accordionButtons = document.querySelectorAll(".accordion-button");
const industrySearch = document.querySelector("#industry-search");
const industryCards = document.querySelectorAll(".industry-grid article");
const blogFilters = document.querySelectorAll(".filter");
const blogCards = document.querySelectorAll(".blog-grid article");
const enquiryForm = document.querySelector("#enquiry-form");
const formMessage = document.querySelector("#form-message");
const currentPage = document.body.dataset.page;

if (currentPage) {
  document.querySelector(`[data-nav="${currentPage}"]`)?.classList.add("active");
}

navToggle?.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
});

mainNav?.addEventListener("click", (event) => {
  if (event.target.tagName === "A") {
    mainNav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open menu");
  }
});

processTabs.forEach((button) => {
  button.addEventListener("click", () => {
    processTabs.forEach((item) => item.classList.remove("active"));
    processPanels.forEach((panel) => panel.classList.remove("active"));
    button.classList.add("active");
    document.querySelector(`[data-panel="${button.dataset.tab}"]`)?.classList.add("active");
  });
});

accordionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const panel = button.nextElementSibling;
    const isOpen = panel.classList.contains("open");
    accordionButtons.forEach((item) => item.classList.remove("active"));
    document.querySelectorAll(".accordion-panel").forEach((item) => item.classList.remove("open"));
    if (!isOpen) {
      button.classList.add("active");
      panel.classList.add("open");
    }
  });
});

industrySearch?.addEventListener("input", () => {
  const term = industrySearch.value.trim().toLowerCase();
  industryCards.forEach((card) => {
    const text = `${card.dataset.name} ${card.textContent}`.toLowerCase();
    card.classList.toggle("hide", term !== "" && !text.includes(term));
  });
});

blogFilters.forEach((button) => {
  button.addEventListener("click", () => {
    blogFilters.forEach((filter) => filter.classList.remove("active"));
    button.classList.add("active");
    const selected = button.dataset.filter;
    blogCards.forEach((card) => {
      card.classList.toggle("hide", selected !== "all" && card.dataset.category !== selected);
    });
  });
});

document.querySelectorAll("[data-job]").forEach((button) => {
  button.addEventListener("click", () => {
    const message = encodeURIComponent(`Career enquiry selected: ${button.dataset.job}. Please add your contact details in the form.`);
    if (document.body.dataset.page === "contact" && formMessage) {
      formMessage.textContent = decodeURIComponent(message);
    } else {
      window.location.href = `contact.html?career=${encodeURIComponent(button.dataset.job)}`;
    }
  });
});

if (document.body.dataset.page === "contact" && formMessage) {
  const params = new URLSearchParams(window.location.search);
  const submitted = params.get("submitted");
  const job = params.get("career");
  if (submitted === "1") {
    formMessage.textContent = "Thank you. Your enquiry has been submitted to Paresh Founders and Engineers.";
  } else if (job) {
    formMessage.textContent = "Career enquiry selected: " + job + ". Please add your contact details in the form.";
  }
}