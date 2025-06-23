// projectToggle.js

// 1) Grid 컨테이너
const grid = document.getElementById('projects-grid');

// 2) 카드 래퍼와 섹션 매핑
const wrappers = {
  birdclef: document.getElementById('card-birdclef-wrapper'),
  llm:      document.getElementById('card-llm-wrapper'),
  tumor:    document.getElementById('card-tumor-wrapper'),
};
const sections = {
  birdclef: document.getElementById('section-birdclef'),
  llm:      document.getElementById('section-llm'),
  tumor:    document.getElementById('section-tumor'),
};

// 3) 토글 버튼 (View/Close) 모두
const toggleButtons = Array.from(document.querySelectorAll('.toggle-btn'));

/**
 * 프로젝트 상세 토글 + 레이아웃 재배치
 * @param {string} project - 'birdclef' | 'llm' | 'tumor'
 * @param {string} [url]   - 상세 HTML 경로 (없으면 단순 토글)
 */
function toggleSectionWithFetch(project, url) {
  const sec   = sections[project];
  const isOpen = !sec.classList.contains('hidden');

  // 1) 모두 닫기 + 순서(order) 초기화 + 버튼 텍스트 초기화
  Object.values(sections).forEach(s => {
    s.classList.add('hidden');
    s.style.order = '';
  });
  Object.values(wrappers).forEach(w => {
    w.style.order = '';
  });
  toggleButtons.forEach(btn => {
    btn.textContent = 'View Details ▼';
  });

  // 이미 열려 있던 프로젝트면 여기서 종료
  if (isOpen) return;

  // 2) URL 있으면 AJAX 로드
  if (url) {
    const contentDiv = document.getElementById(`content-${project}`);
    fetch(url)
      .then(res => res.text())
      .then(html => { contentDiv.innerHTML = html; })
      .catch(() => { contentDiv.innerHTML = 'Failed to load.'; });
  }

  // 3) 해당 섹션 열기
  sec.classList.remove('hidden');

  // 4) PC(md 이상) 배치용 order 맵 설정
  let orderMap = {};
  switch (project) {
    case 'birdclef':
      orderMap = {
        'card-birdclef-wrapper': 1,
        'card-llm-wrapper':      2,
        'section-birdclef':      3,
        'card-tumor-wrapper':    4,
      };
      break;
    case 'llm':
      orderMap = {
        'card-birdclef-wrapper': 1,
        'card-llm-wrapper':      2,
        'section-llm':           3,
        'card-tumor-wrapper':    4,
      };
      break;
    case 'tumor':
      orderMap = {
        'card-birdclef-wrapper': 1,
        'card-llm-wrapper':      2,
        'card-tumor-wrapper':    3,
        'section-tumor':         4,
      };
      break;
  }
  // order 적용
  Object.entries(orderMap).forEach(([id, ord]) => {
    const el = document.getElementById(id);
    if (el) el.style.order = ord;
  });

  // 5) 해당 프로젝트 토글 버튼만 Close ▲ 로 변경
  toggleButtons
    .filter(btn => btn.dataset.project === project)
    .forEach(btn => {
      btn.textContent = 'Close ▲';
    });
}
