document.addEventListener("DOMContentLoaded", () => {
  // =============== MODAL ===============
  const modal = document.querySelector(".modal");
  const modalClose = document.querySelector(".modal-close");
  const contactButtons = document.querySelectorAll(".btn");
  const modalThanks = document.querySelector(".modal-thanks");
  const modalCloseThanks = document.querySelector(".modal-close-thanks");
  const orderForm = document.querySelector(".order-form");
  const modalForm = document.querySelector(".modal form");

  function openModal() {
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.style.display = "none";
    document.body.style.overflow = "";
  }

  function openModalThanks() {
    modalThanks.style.display = "block";
    document.body.style.overflow = "hidden";
  }

  function closeModalThanks() {
    modalThanks.style.display = "none";
    document.body.style.overflow = "";
  }

  contactButtons.forEach((button) => {
    button.addEventListener("click", openModal);
  });

  modalClose.addEventListener("click", closeModal);
  modalCloseThanks.addEventListener("click", closeModalThanks);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  modalThanks.addEventListener("click", (e) => {
    if (e.target === modalThanks) {
      closeModalThanks();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape") {
      if (modal.style.display === "block") {
        closeModal();
      }
      if (modalThanks.style.display === "block") {
        closeModalThanks();
      }
    }
  });

  // =============== FORM VALIDATION ===============
  function validateForm(form) {
    const name = form.querySelector('input[name="name"]').value;
    const phone = form.querySelector('input[name="phone"]').value;
    const nameInput = form.querySelector('input[name="name"]');
    const phoneInput = form.querySelector('input[name="phone"]');
    const nameError = form.querySelector(
      '[data-error="name"], [data-error="modal-name"]'
    );
    const phoneError = form.querySelector(
      '[data-error="phone"], [data-error="modal-phone"]'
    );
    let isValid = true;

    nameInput.classList.remove("error");
    phoneInput.classList.remove("error");
    nameError.style.display = "none";
    phoneError.style.display = "none";

    if (!validator.isLength(name, { min: 2, max: 30 })) {
      nameInput.classList.add("error");
      nameError.textContent = "Name must be between 2 and 30 characters";
      nameError.style.display = "block";
      isValid = false;
    }

    if (!validator.matches(phone, /^\+?[0-9]{10,12}$/)) {
      phoneInput.classList.add("error");
      phoneError.textContent = "Please enter a valid phone number";
      phoneError.style.display = "block";
      isValid = false;
    }

    return isValid;
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    if (validateForm(this)) {
      closeModal();
      openModalThanks();
      this.reset();
    }
  }

  orderForm.addEventListener("submit", handleFormSubmit);
  modalForm.addEventListener("submit", handleFormSubmit);

  // =============== TABS ===============
  const tabContent = document.querySelectorAll(".tabcontent");
  const tabHeaderItems = document.querySelectorAll(".tabheader-item");

  function hideTabContent() {
    tabContent.forEach((item) => {
      item.style.display = "none";
    });
    tabHeaderItems.forEach((item) => {
      item.classList.remove("item-active");
    });
  }

  function showTabContent(i = 0) {
    tabContent[i].style.display = "block";
    tabHeaderItems[i].classList.add("item-active");
  }

  hideTabContent();
  showTabContent();

  tabHeaderItems.forEach((item, i) => {
    item.addEventListener("click", () => {
      hideTabContent();
      showTabContent(i);
    });
  });

  // =============== SLIDER ===============
  const slides = document.querySelectorAll(".offer-slide");
  const prev = document.querySelector(".slider-prev");
  const next = document.querySelector(".slider-next");
  const current = document.querySelector("#current");
  const total = document.querySelector("#total");
  let slideIndex = 1;

  total.textContent = slides.length < 10 ? `0${slides.length}` : slides.length;

  function showSlides(n) {
    if (n > slides.length) {
      slideIndex = 1;
    }
    if (n < 1) {
      slideIndex = slides.length;
    }

    slides.forEach((slide) => {
      slide.style.display = "none";
    });

    slides[slideIndex - 1].style.display = "block";

    current.textContent = slideIndex < 10 ? `0${slideIndex}` : slideIndex;
  }

  showSlides(slideIndex);

  prev.addEventListener("click", () => {
    showSlides((slideIndex -= 1));
  });

  next.addEventListener("click", () => {
    showSlides((slideIndex += 1));
  });
});
