// projectToggle.js

// 전역 변수: 그리드, 카드, 섹션
const grid      = document.getElementById('projects-grid');
const cards     = Array.from(document.querySelectorAll('.project-card'));
const sections  = Array.from(document.querySelectorAll('.project-section'));

/**
 * 프로젝트 상세 토글 함수
 * @param {string} project - 'birdclef' | 'llm' | 'tumor'
 * @param {string} [url]   - (optional) 상세 HTML 경로. 없으면 단순 토글만 수행.
 */
function toggleSectionWithFetch(project, url) {
  const targetSection = document.getElementById(`section-${project}`);
  const targetContent = document.getElementById(`content-${project}`);
  const isOpen        = !targetSection.classList.contains('hidden');

  // 1) 모든 섹션 닫기 & 버튼 텍스트 초기화 & 카드 order 초기화
  sections.forEach(sec => sec.classList.add('hidden'));
  cards.forEach(card => card.style.order = '');
  document.querySelectorAll(`.toggle-btn[data-project]`).forEach(btn => {
    btn.innerText = 'View Details ▼';
  });

  if (isOpen) {
    // 이미 열려 있었다면 닫기만
    return;
  }

  // 2) 외부 HTML 로드 (url이 주어졌을 때만)
  if (url) {
    fetch(url)
      .then(res => res.text())
      .then(html => { targetContent.innerHTML = html; })
      .catch(() => { targetContent.innerHTML = 'Failed to load.'; });
  }

  // 3) 해당 섹션 열기
  targetSection.classList.remove('hidden');

  // 4) PC 레이아웃용 순서 재배치 (md 이상)
  let orderMap;
  switch (project) {
    case 'birdclef':
    case 'llm':
      orderMap = {
        'card-birdclef':        1,
        'card-llm':             2,
        [`section-${project}`]: 3,
        'card-tumor':           4
      };
      break;
    case 'tumor':
      orderMap = {
        'card-birdclef':        1,
        'card-llm':             2,
        'card-tumor':           3,
        [`section-${project}`]: 4
      };
      break;
    default:
      orderMap = {};
  }
  Object.entries(orderMap).forEach(([id, ord]) => {
    const el = document.getElementById(id);
    if (el) el.style.order = ord;
  });

  // 5) 해당 프로젝트 버튼만 "Close ▲"로 변경
  document
    .querySelectorAll(`.toggle-btn[data-project="${project}"]`)
    .forEach(btn => {
      btn.innerText = 'Close ▲';
    });
}
