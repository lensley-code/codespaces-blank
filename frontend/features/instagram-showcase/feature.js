const loadMoreBtn = document.getElementById("loadMoreBtn");
const showcaseTrack = document.getElementById("showcaseTrack");

if (loadMoreBtn && showcaseTrack) {
  loadMoreBtn.addEventListener("click", () => {
    const cards = showcaseTrack.querySelectorAll(".showcase-card");

    cards.forEach((card, index) => {
      card.style.display = index % 2 === 0 ? "block" : "none";
    });

    loadMoreBtn.textContent = "Filtered";
    loadMoreBtn.disabled = true;
  });
}
