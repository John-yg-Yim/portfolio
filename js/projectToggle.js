let currentlyOpenSectionId = null;
let currentlyOpenButton = null;

function toggleSectionWithFetch(projectId, htmlPath = null) {
  const detailSection = document.getElementById(`section-${projectId}`);
  const contentDiv = document.getElementById(`content-${projectId}`);
  const button = event.currentTarget;

  if (currentlyOpenSectionId && currentlyOpenSectionId !== projectId) {
    // 이전 열려있던 디테일 닫기
    document.getElementById(`section-${currentlyOpenSectionId}`).style.display = 'none';
    if (currentlyOpenButton) {
      currentlyOpenButton.innerHTML = 'View Details ▼';
    }
  }

  const card = document.getElementById(`card-${projectId}`);
  if (detailSection.style.display === 'none') {
    detailSection.style.display = 'block';
    card.insertAdjacentElement('afterend', detailSection);  // ✅ 아래로 열림
    button.innerHTML = 'View Details ▲';                    // ✅ 버튼 토글
    currentlyOpenSectionId = projectId;
    currentlyOpenButton = button;

    if (htmlPath && contentDiv.innerHTML.trim() === 'Loading...') {
      fetch(htmlPath)
        .then(res => res.text())
        .then(data => {
          contentDiv.innerHTML = data;
        })
        .catch(err => {
          contentDiv.innerHTML = 'Failed to load content.';
        });
    }
  } else {
    detailSection.style.display = 'none';
    button.innerHTML = 'View Details ▼';
    currentlyOpenSectionId = null;
    currentlyOpenButton = null;
  }
}
