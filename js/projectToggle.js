let currentlyOpenSectionId = null;

function toggleSectionWithFetch(projectId, htmlPath = null) {
  const detail = document.getElementById(`section-${projectId}`);
  const content = document.getElementById(`content-${projectId}`);
  const button = document.getElementById(`btn-${projectId}`);

  const isHidden = detail.classList.contains('hidden');

  // 다른 detail 닫기
  if (currentlyOpenSectionId && currentlyOpenSectionId !== projectId) {
    const prevDetail = document.getElementById(`section-${currentlyOpenSectionId}`);
    const prevButton = document.getElementById(`btn-${currentlyOpenSectionId}`);
    prevDetail.classList.add('hidden');
    prevButton.innerHTML = 'View Details ▼';
  }

  // 현재 클릭 detail 토글
  if (isHidden) {
    detail.classList.remove('hidden');
    button.innerHTML = 'View Details ▲';
    currentlyOpenSectionId = projectId;

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
  }
}
