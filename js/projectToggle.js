// ✅ 전역 변수 정의 추가 (함수 밖에 위치해야 함)
let currentlyOpenSectionId = null;
let currentlyOpenButton = null;

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

  if (detail.style.display === 'none' || detail.style.display === '') {
    detail.style.display = 'block';
    button.innerHTML = 'View Details ▲';
    currentlyOpenSectionId = projectId;
    currentlyOpenButton = button;

    // 카드 바로 뒤에 삽입
    card.insertAdjacentElement('afterend', detail);

    // 콘텐츠 로드
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
