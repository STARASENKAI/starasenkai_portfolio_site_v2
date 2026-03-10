(function () {

  // ===== Splash: show once per browser session (index only) =====
   splash = document.getElementById("splash");
  const SPLASH_SESSION_KEY = "p5_splash_seen_session";

  if (splash) {
    const seenThisSession = sessionStorage.getItem(SPLASH_SESSION_KEY) === "1";

    if (seenThisSession) {
      splash.style.display = "none";
    } else {
      // Показали в этой сессии — больше не показываем до закрытия браузера
      sessionStorage.setItem(SPLASH_SESSION_KEY, "1");
      splash.style.display = ""; // на случай, если где-то было display:none
    }
  }

  const STORAGE_KEY = "portfolio_theme";
  const bodyEl = document.documentElement;

  const toggleBtn = document.getElementById("themeToggle");
  const labelEl = document.getElementById("themeLabel");
  const yearEl = document.getElementById("year");

  // Год в футере
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Установка темы
  function applyTheme(theme) {
    // theme: "dark" | "light"
    bodyEl.setAttribute("data-theme", theme);
    if (labelEl) {
      labelEl.textContent = theme === "light" ? "Светлая" : "Тёмная";
    }
  }

  // Загрузка темы
  const saved = localStorage.getItem(STORAGE_KEY);
  const startTheme = saved === "light" ? "light" : "dark";
  applyTheme(startTheme);

  // Переключатель
  if (toggleBtn) {
    toggleBtn.addEventListener("click", function () {
      const current = bodyEl.getAttribute("data-theme") === "light" ? "light" : "dark";
      const next = current === "light" ? "dark" : "light";
      localStorage.setItem(STORAGE_KEY, next);
      applyTheme(next);
    });
  }

  // Форма обратной связи (учебная, без сервера)
  const form = document.getElementById("contactForm");
  const statusEl = document.getElementById("formStatus");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(form);
      const name = (formData.get("name") || "").toString().trim();
      const email = (formData.get("email") || "").toString().trim();
      const message = (formData.get("message") || "").toString().trim();

      if (!name || !email || !message) {
        if (statusEl) statusEl.textContent = "Заполните все поля.";
        return;
      }

      // Тут обычно был бы fetch(...) на сервер, но для практики достаточно имитации
      if (statusEl) statusEl.textContent = "Сообщение отправлено! (учебная отправка)";
      form.reset();
    });
  }
})();