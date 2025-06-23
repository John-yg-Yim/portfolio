let currentlyOpenSectionId = null;

function toggleSectionWithFetch(projectId, htmlPath = null) {
  const detail = document.getElementById(`section-${projectId}`);
  const content = document.getElementById(`content-${projectId}`);
  const button = document.getElementById(`btn-${projectId}`);
  const card = document.getElementById(`card-${projectId}`);

  // 다른 열려있는 섹션 닫기
  if (currentlyOpenSectionId && currentlyOpenSectionId !== projectId) {
    const prevDetail = document.getElementById(`section-${currentlyOpenSectionId}`);
    const prevButton = document.getElementById(`btn-${currentlyOpenSectionId}`);
    if (prevDetail) prevDetail.style.display = 'none';
    if (prevButton) prevButton.innerHTML = 'View Details ▼';
  }

  const isHidden = detail.style.display === 'none' || detail.style.display === '';

  detail.style.display = isHidden ? 'block' : 'none';
  button.innerHTML = isHidden ? 'View Details ▲' : 'View Details ▼';
  currentlyOpenSectionId = isHidden ? projectId : null;

  if (isHidden && htmlPath && content.innerHTML.trim() === 'Loading...') {
    fetch(htmlPath)
      .then(res => res.text())
      .then(data => content.innerHTML = data)
      .catch(() => content.innerHTML = 'Failed to load content.');
  }

  if (isHidden) {
    card.insertAdjacentElement('afterend', detail);
  }
}
