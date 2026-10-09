// =====================================
// LIFESTYLE WITH Dr. Rwaa
// Website JavaScript
// =====================================

const TALLY_FORM_ID = "rjxNaL";

const serviceButtons = document.querySelectorAll(
  ".service-card"
);

const selectedServiceName = document.getElementById(
  "selected-service-name"
);

const tallyForm = document.getElementById("tally-form");

const confirmButton = document.getElementById(
  "confirm-button"
);

const successMessage = document.getElementById(
  "success-message"
);

const confirmationBox = document.getElementById(
  "confirmation-box"
);

const currentYear = document.getElementById(
  "current-year"
);

let selectedService = "";

// =====================================
// UPDATE FOOTER YEAR
// =====================================

currentYear.textContent = new Date().getFullYear();

// =====================================
// SERVICE SELECTION
// =====================================

serviceButtons.forEach((button) => {
  button.setAttribute("aria-pressed", "false");

  button.addEventListener("click", () => {
    selectedService = button.dataset.service;

    // Update selected service text
    selectedServiceName.textContent = selectedService;

    // Highlight the selected service
    serviceButtons.forEach((serviceButton) => {
      const isSelected = serviceButton === button;

      serviceButton.classList.toggle(
        "is-selected",
        isSelected
      );

      serviceButton.setAttribute(
        "aria-pressed",
        String(isSelected)
      );
    });

    // Update Tally embed URL
    const embedUrl = new URL(
      `https://tally.so/embed/${TALLY_FORM_ID}`
    );

    embedUrl.searchParams.set("alignLeft", "1");
    embedUrl.searchParams.set("hideTitle", "1");
    embedUrl.searchParams.set(
      "transparentBackground",
      "1"
    );
    embedUrl.searchParams.set("dynamicHeight", "1");

    // Pass the selected service to Tally.
    // Add a hidden field named "service" in Tally
    // to save this value with the registration.
    embedUrl.searchParams.set(
      "service",
      selectedService
    );

    tallyForm.src = embedUrl.toString();

    // Reset confirmation when changing services
    successMessage.hidden = true;
    confirmationBox.hidden = false;

    confirmButton.disabled = false;

    confirmButton.innerHTML =
      'I Confirm My Details <span aria-hidden="true">→</span>';

    // Scroll to the registration section
    document
      .getElementById("registration")
      .scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
  });
});

// =====================================
// CONFIRMATION BUTTON
// =====================================

confirmButton.addEventListener("click", () => {

  if (!selectedService) {
    alert("Please select a service first.");

    document
      .getElementById("services")
      .scrollIntoView({
        behavior: "smooth"
      });

    return;
  }

  // Show the confirmation message
  successMessage.hidden = false;

  confirmButton.disabled = true;

  confirmButton.textContent = "Details Confirmed ✓";

  // Bring the success message into view
  successMessage.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });

});

// =====================================
// END
// =====================================