document.addEventListener('DOMContentLoaded', () => {

    // —— 1. Journal Logic ——
    const form = document.getElementById('journalForm');
    const entriesList = document.getElementById('entriesList');
    if (form && entriesList) {
      let entries = JSON.parse(localStorage.getItem('bjjJournal')) || [];
      renderEntries();
  
      form.addEventListener('submit', e => {
        e.preventDefault();
        const date = document.getElementById('entryDate').value;
        const name = document.getElementById('techniqueName').value.trim();
        const proficiency = document.getElementById('proficiency').value;
        const notes = document.getElementById('notes').value.trim();
  
        entries.push({ date, name, proficiency, notes });
        localStorage.setItem('bjjJournal', JSON.stringify(entries));
        form.reset();
        renderEntries();
      });
  
      function renderEntries() {
        entriesList.innerHTML = '';
        entries.forEach(e => {
          const li = document.createElement('li');
          li.innerHTML = `
            <strong>${e.name}</strong> (${e.date}) — Belt: ${e.proficiency}<br>
            ${e.notes}
          `;
          entriesList.appendChild(li);
        });
      }
    }
  
    // —— 2. Drill Generator Logic ——
    const categorySelect = document.getElementById('categorySelect');
    const drillBtn       = document.getElementById('drillBtn');
    const drillOutput    = document.getElementById('drillOutput');
    const drillVideo     = document.getElementById('drillVideo');
  
    if (categorySelect && drillBtn && drillOutput && drillVideo) {
      const drills = {
        passing: [
          { text: "Knee slice pass – 10 reps each side",        videoId: "VIDEO_ID_A" },
          { text: "Toreando pass – 8 reps",                      videoId: "VIDEO_ID_B" },
          { text: "Weave under pass – 5 reps per side",          videoId: "VIDEO_ID_C" }
        ],
        standing: [
          { text: "Starfish drill – 20 reps",                    videoId: "VIDEO_ID_D" },
          { text: "Double leg entries – 5 reps",                 videoId: "VIDEO_ID_E" },
          { text: "Single leg entries – 5 reps",                 videoId: "VIDEO_ID_F" }
        ],
        retention: [
          { text: "Hip escape (shrimping) – 10 reps each side",   videoId: "VIDEO_ID_G" },
          { text: "Granby roll – 5 reps each side",              videoId: "VIDEO_ID_H" },
          { text: "X-guard entry & retention – 8 reps",          videoId: "VIDEO_ID_I" }
        ],
        recovery: [
          { text: "Recover to closed guard from half guard – 5 reps", videoId: "VIDEO_ID_J" },
          { text: "Recover to butterfly guard – 5 reps",               videoId: "VIDEO_ID_K" },
          { text: "Recover open guard from side control – 5 reps",     videoId: "VIDEO_ID_L" }
        ]
      };
  
      drillBtn.addEventListener('click', () => {
        const list = drills[categorySelect.value];
        const pick = list[Math.floor(Math.random() * list.length)];
  
        // display text
        drillOutput.textContent = pick.text;
  
        // display video
        drillVideo.innerHTML = `
          <iframe
            width="100%"
            height="240"
            src="https://www.youtube.com/embed/${pick.videoId}"
            frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen>
          </iframe>
        `;
      });
    }
  
    // —— 3. Glossary Logic ——
    const searchInput = document.getElementById('glossarySearch');
    const terms       = Array.from(document.querySelectorAll('.term'));
    if (searchInput && terms.length) {
      terms.forEach(term => {
        const btn = term.querySelector('.term-btn');
        if (btn) {
          btn.addEventListener('click', () => btn.classList.toggle('active'));
        }
      });
  
      searchInput.addEventListener('input', () => {
        const q = searchInput.value.toLowerCase();
        terms.forEach(term => {
          const text = term.querySelector('.term-btn').textContent.toLowerCase();
          term.style.display = text.includes(q) ? '' : 'none';
        });
      });
    }
  
  });
  