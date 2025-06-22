let currentDetailId = null;

function toggleSectionWithFetch(id, htmlPath) {
  const detailSection = document.getElementById(`section-${id}`);
  const detailContent = document.getElementById(`content-${id}`);
  const card = document.getElementById(`card-${id}`);
  const grid = card?.parentElement; // .grid 요소

  if (!detailSection || !card || !grid) return;

  // 현재 열려있는 항목을 다시 클릭하면 닫기
  if (currentDetailId === id) {
    detailSection.style.display = 'none';
    currentDetailId = null;
    return;
  }

  // 모든 section 숨기기
  document.querySelectorAll(".project-detail").forEach(sec => {
    sec.style.display = "none";
  });

  // 콘텐츠 로드
  if (htmlPath && detailContent.innerHTML.trim() === "Loading...") {
    fetch(htmlPath)
      .then(res => res.text())
      .then(html => {
        detailContent.innerHTML = html;
      });
  }

  // 해당 카드 바로 뒤로 이동
  const next = card.nextElementSibling;
  detailSection.style.display = 'block';

  if (next) {
    grid.insertBefore(detailSection, next);
  } else {
    grid.appendChild(detailSection);
  }

  currentDetailId = id;
}

function hideProjectDetail() {
  const detailSection = document.getElementById(`section-${currentDetailId}`);
  if (detailSection) detailSection.style.display = "none";
  currentDetailId = null;
}
