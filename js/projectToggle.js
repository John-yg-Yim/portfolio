function toggleSectionWithFetch(projectId, htmlPath = null) {
  const detail = document.getElementById(`section-${projectId}`);
  const content = document.getElementById(`content-${projectId}`);
  const button = event.currentTarget;
  const card = document.getElementById(`card-${projectId}`);

  // 다른 섹션 닫기
  if (currentlyOpenSectionId && currentlyOpenSectionId !== projectId) {
    document.getElementById(`section-${currentlyOpenSectionId}`).style.display = 'none';
    if (currentlyOpenButton) currentlyOpenButton.innerHTML = 'View Details ▼';
  }

  if (detail.style.display === 'none') {
    detail.style.display = 'block';
    button.innerHTML = 'View Details ▲';
    currentlyOpenSectionId = projectId;
    currentlyOpenButton = button;

    // 카드 바로 뒤에 append
    card.insertAdjacentElement('afterend', detail);

    // 내용 fetch
    if (htmlPath && content.innerHTML.trim() === 'Loading...') {
      fetch(htmlPath)
        .then(res => res.text())
        .then(data => content.innerHTML = data)
        .catch(() => content.innerHTML = 'Failed to load content.');
    }
  } else {
    detail.style.display = 'none';
    button.innerHTML = 'View Details ▼';
    currentlyOpenSectionId = null;
    currentlyOpenButton = null;
  }
}
