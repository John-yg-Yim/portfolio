
function toggleSectionWithFetch(id, filePath) {
  const ids = ['tumor', 'llm'];
  ids.forEach(sec => {
    const section = document.getElementById(`section-${sec}`);
    const content = document.getElementById(`content-${sec}`);
    const btn = document.getElementById(`btn-${sec}`);

    if (sec === id) {
      const isOpen = section.style.display === "block";
      section.style.display = isOpen ? "none" : "block";
      btn.innerText = isOpen ? "View Details ▼" : "Close ▲";

      if (!isOpen && content && content.innerHTML.trim() === 'Loading...' && filePath) {
        fetch(filePath)
          .then(res => res.text())
          .then(html => content.innerHTML = html)
          .catch(err => content.innerHTML = `<p class="text-red-400">Loading Fail!: ${err.message}</p>`);
      }
    } else {
      document.getElementById(`section-${sec}`).style.display = "none";
      document.getElementById(`btn-${sec}`).innerText = "View Details ▼";
    }
  });
}
