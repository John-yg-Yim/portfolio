let currentlyOpenSectionId = null;
let currentlyOpenButton = null;

function toggleSectionWithFetch(projectId, htmlPath = null) {
  const detail = document.getElementById(`section-${projectId}`);
  const content = document.getElementById(`content-${projectId}`);
  const button = document.getElementById(`btn-${projectId}`);
  const card = document.getElementById(`card-${projectId}`);

  // 이전 열려있던 디테일 닫기
  if (currentlyOpenSectionId && currentlyOpenSectionId !== projectId) {
    const prevDetail = document.getElementById(`section-${currentlyOpenSectionId}`);
    const prevButton = document.getElementById(`btn-${currentlyOpenSectionId}`);
    prevDetail.classList.add('hidden');
    prevButton.innerHTML = 'View Details ▼';
  }

  const isHidden = detail.classList.contains('hidden');

  if (isHidden) {
    detail.classList.remove('hidden');
    button.innerHTML = 'View Details ▲';
    currentlyOpenSectionId = projectId;
    currentlyOpenButton = button;

    // 이동 위치 조정
    card.insertAdjacentElement('afterend', detail);

    // HTML Fetch (한 번만)
    if (htmlPath && content.innerHTML.trim() === 'Loading...') {
      fetch(htmlPath)
        .then(res => res.text())
        .then(data => content.innerHTML = data)
        .catch(() => content.innerHTML = 'Failed to load content.');
    }
  } else {
    detail.classList.add('hidden');
    button.innerHTML = 'View Details ▼';
    currentlyOpenSectionId = null;
    currentlyOpenButton = null;
  }
}
