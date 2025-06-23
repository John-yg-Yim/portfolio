function toggleSectionWithFetch(projectId, htmlPath = null) {
  const detail = document.getElementById(`section-${projectId}`);
  const content = document.getElementById(`content-${projectId}`);
  const button = document.getElementById(`btn-${projectId}`);
  const card = document.getElementById(`card-${projectId}`);

  if (currentlyOpenSectionId && currentlyOpenSectionId !== projectId) {
    document.getElementById(`section-${currentlyOpenSectionId}`).style.display = 'none';
    document.getElementById(`btn-${currentlyOpenSectionId}`).innerHTML = 'View Details ▼';
  }

  const isHidden = detail.style.display === 'none';

  detail.style.display = isHidden ? 'block' : 'none';
  button.innerHTML = isHidden ? 'View Details ▲' : 'View Details ▼';
  currentlyOpenSectionId = isHidden ? projectId : null;

  if (isHidden && htmlPath && content.innerHTML.trim() === 'Loading...') {
    fetch(htmlPath)
      .then(res => res.text())
      .then(data => content.innerHTML = data)
      .catch(() => content.innerHTML = 'Failed to load content.');
  }

  if (isHidden) card.insertAdjacentElement('afterend', detail);
}
