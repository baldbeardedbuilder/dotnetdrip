const forms = document.querySelectorAll<HTMLFormElement>("form[data-webhook]");

forms.forEach((form) => {
  form.addEventListener("submit", async (event) => {
    if (event.defaultPrevented) {
      return;
    }
    event.preventDefault();

    const successUrl = new URL(window.location.href);
    const successParam = form.dataset.successParam;
    if (!successParam) {
      return;
    }
    successUrl.searchParams.set(successParam, "true");
    if (form.dataset.successHash) {
      successUrl.hash = form.dataset.successHash;
    }

    const honeypot = form.querySelector<HTMLInputElement>(
      'input[name="bot-field"], input[name="bot-field2"]',
    );
    if (honeypot?.value) {
      window.location.assign(successUrl);
      return;
    }

    const status = form.querySelector<HTMLElement>("[data-webhook-status]");
    const webhook = form.dataset.webhook;
    if (!webhook) {
      if (status) {
        status.textContent = "This form is temporarily unavailable. Please try again later.";
        status.classList.remove("hidden");
      }
      return;
    }

    const submitButton = form.querySelector<HTMLButtonElement>('button[type="submit"]');
    if (submitButton) {
      submitButton.disabled = true;
    }
    if (status) {
      status.textContent = "";
      status.classList.add("hidden");
    }

    try {
      const body = new URLSearchParams();
      new FormData(form).forEach((value, key) => {
        if (typeof value === "string") {
          body.append(key, value);
        }
      });

      const response = await fetch(webhook, {
        method: "POST",
        body,
      });
      if (!response.ok) {
        throw new Error(`Webhook request failed with status ${response.status}`);
      }

      window.location.assign(successUrl);
    } catch (error) {
      console.error("Form submission failed", error);
      if (status) {
        status.textContent = "We couldn't submit your form. Please try again.";
        status.classList.remove("hidden");
      }
      if (submitButton) {
        submitButton.disabled = false;
      }
    }
  });
});
