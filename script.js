
// COLOQUE AQUI O WHATSAPP DA BARBEARIA.
// Formato: 55 + DDD + número. Apenas números.
const WHATSAPP_NUMBER = "COLOQUE_O_NUMERO_AQUI";

// Menu para celular
const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

menuButton.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

nav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

// Data mínima: hoje
const dateInput = document.querySelector("#date");
const today = new Date();
const localToday = new Date(
  today.getTime() - today.getTimezoneOffset() * 60000
).toISOString().split("T")[0];

dateInput.min = localToday;
dateInput.value = localToday;

// Formulário de agendamento
document.querySelector("#booking-form").addEventListener("submit", event => {
  event.preventDefault();

  const name = document.querySelector("#name").value.trim();
  const service = document.querySelector("#service").value;
  const date = document.querySelector("#date").value;
  const time = document.querySelector("#time").value;
  const notes = document.querySelector("#notes").value.trim();

  if (!name || !service || !date || !time) {
    alert("Preencha os campos obrigatórios.");
    return;
  }

  if (
    WHATSAPP_NUMBER === "COLOQUE_O_NUMERO_AQUI" ||
    !/^\d{12,13}$/.test(WHATSAPP_NUMBER)
  ) {
    alert("Este é um site demonstrativo. Configure o WhatsApp no script.js.");
    return;
  }

  const [year, month, day] = date.split("-");

  const message = [
    "Olá! Gostaria de solicitar um agendamento.",
    "",
    `Nome: ${name}`,
    `Serviço: ${service}`,
    `Data preferida: ${day}/${month}/${year}`,
    `Horário preferido: ${time}`,
    notes ? `Observação: ${notes}` : ""
  ].filter(Boolean).join("\n");

  window.open(
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
    "_blank",
    "noopener"
  );
});

// Galeria de imagens ampliadas
const lightbox = document.querySelector("#lightbox");
const lightboxImage = lightbox.querySelector("img");

document.querySelectorAll(".gallery-item").forEach(item => {
  item.addEventListener("click", () => {
    lightboxImage.src = item.dataset.full;
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
  });
});

function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
}

lightbox.querySelector(".lightbox-close").addEventListener("click", closeLightbox);

lightbox.addEventListener("click", event => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeLightbox();
});

// Animações ao rolar a página
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(element => {
  observer.observe(element);
});

// Ano automático no rodapé
document.querySelector("#year").textContent = new Date().getFullYear();
