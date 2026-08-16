
const STORAGE_KEY = "codevent_progress_v1";
const LAST_KEY = "codevent_last_v1";

/* ---------- Course access authorization ---------- */
const ACCESS_TOKEN_KEY = "codevent_webdev_access_token";
const WORKER_URL = "https://codevent-web-development-course.emezch93.workers.dev";
const AUTH_STATES = Object.freeze({ LOCKED: "LOCKED", VERIFYING: "VERIFYING", UNLOCKED: "UNLOCKED" });
let authorizationState = AUTH_STATES.LOCKED;

function renderAuthState(html) {
  const content = document.getElementById("content");
  const sidebar = document.getElementById("sidebar");
  if (sidebar) sidebar.innerHTML = "";
  if (content) content.innerHTML = html;
}

function authLoadingHtml(message) {
  return `<div class="auth-gate"><div class="auth-spinner" aria-hidden="true"></div><p class="auth-gate-message">${message}</p></div>`;
}

function authGateHtml(message = "Enter the access token you received after completing payment.", error = "") {
  return `
    <div class="auth-gate">
      <div class="auth-gate-card">
        <div class="auth-gate-label">CodeVent Web Development</div>
        <h1>Course Locked</h1>
        <p class="auth-gate-message">${escapeHtml(message)}</p>
        <form id="auth-unlock-form" class="auth-unlock-form">
          <label for="access-token">Access token</label>
          <input id="access-token" name="access-token" type="text" autocomplete="off" spellcheck="false" required placeholder="Paste your access token">
          <button type="submit" class="auth-retry-btn">Unlock Course</button>
        </form>
        <p id="auth-error" class="auth-error" role="alert">${escapeHtml(error)}</p>
      </div>
    </div>`;
}

async function verifyAccess(token) {
  let response;
  try {
    response = await fetch(WORKER_URL + "/verify-access", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({ token }),
      cache: "no-store"
    });
  } catch (err) {
    return { networkError: true, message: "Unable to reach the verification service. Check your connection and try again." };
  }

  let data;
  try {
    data = await response.json();
  } catch (err) {
    return { networkError: true, message: "Received an unexpected response from the verification service. Please try again." };
  }

  return {
    networkError: false,
    authorized: response.ok && data.authorized === true,
    message: typeof data.message === "string" ? data.message : "This access token is invalid or has expired."
  };
}

function showLockedState(message, error) {
  authorizationState = AUTH_STATES.LOCKED;
  renderAuthState(authGateHtml(message, error));
  const form = document.getElementById("auth-unlock-form");
  if (form) form.addEventListener("submit", handleManualUnlock);
}

function lockCourse() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  closeMobileSidebar();
  showLockedState("Course access has been cleared. Enter your access token to unlock this course again.");
}

async function handleManualUnlock(event) {
  event.preventDefault();
  const input = document.getElementById("access-token");
  const token = input ? input.value.trim() : "";
  if (!token) return;

  authorizationState = AUTH_STATES.VERIFYING;
  renderAuthState(authLoadingHtml("Verifying your access token..."));
  const result = await verifyAccess(token);

  if (result.authorized) {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
    authorizationState = AUTH_STATES.UNLOCKED;
    startApp();
    return;
  }

  showLockedState("Enter the access token you received after completing payment.", result.message);
}

async function initAuth() {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY);
  if (!token) {
    showLockedState();
    return;
  }

  authorizationState = AUTH_STATES.VERIFYING;
  renderAuthState(authLoadingHtml("Checking your course access..."));
  const result = await verifyAccess(token);

  if (result.networkError) {
    showLockedState("Your saved token could not be checked right now. Check your connection and try again.", result.message);
    return;
  }

  if (!result.authorized) {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    showLockedState("Enter the access token you received after completing payment.", result.message);
    return;
  }

  authorizationState = AUTH_STATES.UNLOCKED;
  startApp();
}

/* ---------- Flatten course into a linear sequence for prev/next + progress ---------- */
const SEQUENCE = [];
COURSE.modules.forEach((mod) => {
  (mod.lessons || []).forEach((lesson) => {
    SEQUENCE.push({ type: "lesson", moduleId: mod.id, id: lesson.id, title: lesson.title, data: lesson });
  });
  if (mod.project) {
    SEQUENCE.push({ type: "project", moduleId: mod.id, id: mod.project.id, title: mod.project.title, data: mod.project });
  }
  if (mod.projects) {
    mod.projects.forEach((p) => {
      SEQUENCE.push({ type: "project", moduleId: mod.id, id: p.id, title: p.title, data: p });
    });
  }
  if (mod.capstone) {
    SEQUENCE.push({ type: "capstone", moduleId: mod.id, id: mod.capstone.id, title: mod.capstone.title, data: mod.capstone });
  }
});
const TOTAL_ITEMS = SEQUENCE.length;

function findById(id) {
  return SEQUENCE.find((entry) => entry.id === id) || null;
}
function indexOf(id) {
  return SEQUENCE.findIndex((entry) => entry.id === id);
}

/* ---------- Progress (localStorage) ---------- */
function getCompleted() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
}
function saveCompleted(set) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...set]));
}
function markComplete(id) {
  const set = getCompleted();
  set.add(id);
  saveCompleted(set);
}
function toggleComplete(id) {
  const set = getCompleted();
  if (set.has(id)) set.delete(id);
  else set.add(id);
  saveCompleted(set);
}
function progressPercent() {
  const completed = getCompleted().size;
  if (TOTAL_ITEMS === 0) return 0;
  return Math.round((completed / TOTAL_ITEMS) * 100);
}
function setLast(id) {
  localStorage.setItem(LAST_KEY, id);
}
function getLast() {
  return localStorage.getItem(LAST_KEY);
}

/* ---------- Routing (simple hash state) ---------- */
function navigate(id) {
  window.location.hash = id;
  setLast(id);
  render();
  window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  closeMobileSidebar();
}
function currentId() {
  return window.location.hash.replace("#", "") || null;
}
window.addEventListener("hashchange", render);

/* ---------- Helpers ---------- */
function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function codeBlock(code, lang) {
  const escaped = escapeHtml(code);
  const blockId = "code-" + Math.random().toString(36).slice(2, 9);
  return `
    <div class="code-block">
      <div class="code-block-bar">
        <span class="code-lang">${lang}</span>
        <button class="copy-btn" data-target="${blockId}" type="button">Copy</button>
      </div>
      <pre id="${blockId}"><code>${escaped}</code></pre>
    </div>`;
}

function codeGroup(codeObj) {
  if (!codeObj) return "";
  const langs = Object.keys(codeObj);
  const blocks = langs.map((l) => codeBlock(codeObj[l], l.toUpperCase())).join("");
  return `<div class="code-group">${blocks}<a href="https://codeventdigital.site/code-editor.html" target="_blank" class="editor-link">Open in Code Editor</a></div>`;
}

function attachCopyHandlers(root) {
  root.querySelectorAll(".copy-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = document.getElementById(btn.dataset.target);
      const text = target ? target.textContent : "";
      navigator.clipboard.writeText(text).then(() => {
        const original = btn.textContent;
        btn.textContent = "Copied";
        setTimeout(() => (btn.textContent = original), 1200);
      });
    });
  });
}

function moduleOf(moduleId) {
  return COURSE.modules.find((m) => m.id === moduleId);
}

/* ---------- Sidebar ---------- */
function renderSidebar() {
  const completed = getCompleted();
  const active = currentId();
  const modulesHtml = COURSE.modules
    .map((mod, idx) => {
      const items = [];
      (mod.lessons || []).forEach((l) => items.push({ id: l.id, title: l.title, done: completed.has(l.id) }));
      if (mod.project) items.push({ id: mod.project.id, title: mod.project.title, done: completed.has(mod.project.id), isProject: true });
      if (mod.projects) mod.projects.forEach((p) => items.push({ id: p.id, title: p.title, done: completed.has(p.id), isProject: true }));
      if (mod.capstone) items.push({ id: mod.capstone.id, title: mod.capstone.title, done: completed.has(mod.capstone.id), isProject: true });

      const doneCount = items.filter((i) => i.done).length;
      const isOpen = items.some((i) => i.id === active) || localStorage.getItem("open_" + mod.id) === "1";

      return `
      <div class="nav-module ${isOpen ? "open" : ""}" data-module="${mod.id}">
        <button class="nav-module-toggle" type="button" data-toggle="${mod.id}">
          <span class="nav-module-index">${String(idx + 1).padStart(2, "0")}</span>
          <span class="nav-module-title">${escapeHtml(mod.title)}</span>
          <span class="nav-module-count">${doneCount}/${items.length}</span>
        </button>
        <div class="nav-module-items">
          ${items
            .map(
              (i) => `
            <a href="#${i.id}" class="nav-item ${i.id === active ? "active" : ""} ${i.isProject ? "nav-item-project" : ""}" data-nav="${i.id}">
              <span class="nav-item-mark">${i.done ? "✓" : ""}</span>
              <span class="nav-item-title">${escapeHtml(i.title)}</span>
            </a>`
            )
            .join("")}
        </div>
      </div>`;
    })
    .join("");

  return `
    <div class="sidebar-header">
      <a href="#dashboard" class="brand">
        <img src="codevent-logo.PNG" alt="CodeVent Digital logo" class="brand-mark-img">
        <span class="brand-name">CodeVent Digital</span>
      </a>
      <div class="brand-course">CodeVent Web Development</div>
    </div>
    <div class="sidebar-progress">
      <div class="sidebar-progress-label">
        <span>Course Progress</span>
        <span class="mono">${progressPercent()}%</span>
      </div>
      <div class="progress-track"><div class="progress-fill" style="width:${progressPercent()}%"></div></div>
    </div>
    <nav class="nav-modules">${modulesHtml}</nav>
    <div class="sidebar-help">
      <a href="https://codeventdigital.site/chat.html" target="_blank" class="ai-help-link">
        <span class="ai-help-icon">AI</span>
        <span>Stuck? Ask the CodeVent AI Tutor</span>
      </a>
      <a href="https://codeventdigital.site/code-editor.html" target="_blank" class="ai-help-link">
        <span class="ai-help-icon mono">&lt;/&gt;</span>
        <span>Open the Code Editor</span>
      </a>
    </div>
    <div class="sidebar-footer">
      <button type="button" class="lock-course-btn" id="lock-course-btn">Lock Course</button>
      <a href="about.html">About</a>
      <a href="contact.html">Contact</a>
      <a href="terms.html">Terms</a>
      <a href="privacy.html">Privacy</a>
    </div>
  `;
}

/* ---------- Practice block (task / hint / solution reveal) ---------- */
function practiceBlock(practice, lessonId) {
  if (!practice) return "";
  const hintId = "hint-" + lessonId;
  const solId = "sol-" + lessonId;
  return `
    <div class="practice-box">
      <div class="practice-label">Practice</div>
      <p class="practice-task">${escapeHtml(practice.task)}</p>
      <div class="practice-actions">
        <button class="reveal-btn" type="button" data-reveal="${hintId}">Show hint</button>
        <button class="reveal-btn" type="button" data-reveal="${solId}">Show solution</button>
      </div>
      <div id="${hintId}" class="reveal-panel hidden">
        <div class="reveal-label">Hint</div>
        <p>${escapeHtml(practice.hint)}</p>
      </div>
      <div id="${solId}" class="reveal-panel hidden">
        <div class="reveal-label">Solution</div>
        ${codeBlock(practice.solution, "CODE")}
      </div>
    </div>`;
}

function aiHelpCallout(label) {
  return `
    <div class="ai-callout">
      <p>Stuck on ${escapeHtml(label)}? The CodeVent AI Tutor can walk through it with you.</p>
      <a href="https://codeventdigital.site/chat.html" target="_blank" class="ai-callout-link">Ask the AI Tutor</a>
    </div>`;
}

function attachRevealHandlers(root) {
  root.querySelectorAll("[data-reveal]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const panel = document.getElementById(btn.dataset.reveal);
      panel.classList.toggle("hidden");
    });
  });
}

/* ---------- Lesson view ---------- */
function renderLessonView(mod, lesson) {
  const idx = indexOf(lesson.id);
  const prev = idx > 0 ? SEQUENCE[idx - 1] : null;
  const next = idx < SEQUENCE.length - 1 ? SEQUENCE[idx + 1] : null;
  const completed = getCompleted().has(lesson.id);

  return `
    <div class="crumb">
      <a href="#dashboard">Dashboard</a> <span>/</span> <span>${escapeHtml(mod.title)}</span>
    </div>
    <h1 class="lesson-title">${escapeHtml(lesson.title)}</h1>

    <section class="lesson-section">
      <h2>Concept</h2>
      <p>${escapeHtml(lesson.concept)}</p>
    </section>

    <section class="lesson-section">
      <h2>Why It Matters</h2>
      <p>${escapeHtml(lesson.why)}</p>
    </section>

    <section class="lesson-section">
      <h2>How It Works</h2>
      <p>${escapeHtml(lesson.how)}</p>
    </section>

    <section class="lesson-section">
      <h2>Example</h2>
      <p>${escapeHtml(lesson.example)}</p>
      ${codeGroup(lesson.code)}
    </section>

    <section class="lesson-section">
      ${practiceBlock(lesson.practice, lesson.id)}
    </section>

    <section class="lesson-section">
      <h2>Mini Task</h2>
      <p>${escapeHtml(lesson.miniTask)}</p>
    </section>

    <section class="lesson-section">
      ${aiHelpCallout("this lesson")}
    </section>

    <div class="lesson-footer">
      <button class="complete-btn ${completed ? "done" : ""}" type="button" data-complete="${lesson.id}">
        ${completed ? "Lesson Complete" : "Complete Lesson"}
      </button>
      <div class="prev-next">
        ${prev ? `<a href="#${prev.id}" class="pn-link">Previous: ${escapeHtml(prev.title)}</a>` : "<span></span>"}
        ${next ? `<a href="#${next.id}" class="pn-link pn-next">Next: ${escapeHtml(next.title)}</a>` : ""}
      </div>
    </div>
  `;
}

/* ---------- Project view (used for module projects, m4 projects, m5 projects) ---------- */
function renderProjectView(mod, project) {
  const idx = indexOf(project.id);
  const prev = idx > 0 ? SEQUENCE[idx - 1] : null;
  const next = idx < SEQUENCE.length - 1 ? SEQUENCE[idx + 1] : null;
  const completed = getCompleted().has(project.id);

  const list = (arr, label) =>
    arr && arr.length
      ? `<section class="lesson-section"><h2>${label}</h2><ul class="plain-list">${arr.map((x) => `<li>${escapeHtml(x)}</li>`).join("")}</ul></section>`
      : "";

  return `
    <div class="crumb">
      <a href="#dashboard">Dashboard</a> <span>/</span> <span>${escapeHtml(mod.title)}</span>
    </div>
    <div class="project-tag">Project</div>
    <h1 class="lesson-title">${escapeHtml(project.title)}</h1>
    <section class="lesson-section">
      <h2>Objective</h2>
      <p>${escapeHtml(project.objective)}</p>
    </section>
    ${list(project.requirements, "Requirements")}
    ${list(project.features, "Features")}
    ${list(project.structure, "Recommended Structure")}
    ${list(project.steps, "Development Steps")}
    ${list(project.tasks, "Coding Tasks")}
    ${project.challenge ? `<section class="lesson-section"><h2>Final Challenge</h2><p>${escapeHtml(project.challenge)}</p></section>` : ""}

    <section class="lesson-section">
      ${aiHelpCallout("this project")}
    </section>

    <div class="lesson-footer">
      <button class="complete-btn ${completed ? "done" : ""}" type="button" data-complete="${project.id}">
        ${completed ? "Project Complete" : "Mark Project Complete"}
      </button>
      <div class="prev-next">
        ${prev ? `<a href="#${prev.id}" class="pn-link">Previous: ${escapeHtml(prev.title)}</a>` : "<span></span>"}
        ${next ? `<a href="#${next.id}" class="pn-link pn-next">Next: ${escapeHtml(next.title)}</a>` : ""}
      </div>
    </div>
  `;
}

/* ---------- Capstone view ---------- */
function renderCapstoneView(mod, capstone) {
  const completed = getCompleted().has(capstone.id);
  const idx = indexOf(capstone.id);
  const prev = idx > 0 ? SEQUENCE[idx - 1] : null;

  return `
    <div class="crumb"><a href="#dashboard">Dashboard</a> <span>/</span> <span>${escapeHtml(mod.title)}</span></div>
    <div class="project-tag">Final Capstone</div>
    <h1 class="lesson-title">${escapeHtml(capstone.title)}</h1>
    <section class="lesson-section">
      <h2>Objective</h2>
      <p>${escapeHtml(capstone.objective)}</p>
    </section>
    <section class="lesson-section">
      <h2>Requirements</h2>
      <ul class="plain-list">${capstone.requirements.map((r) => `<li>${escapeHtml(r)}</li>`).join("")}</ul>
    </section>
    <section class="lesson-section">
      <h2>Evaluation Checklist</h2>
      <ul class="checklist">${capstone.checklist.map((c, i) => `<li><label><input type="checkbox" data-checklist="${capstone.id}-${i}"> ${escapeHtml(c)}</label></li>`).join("")}</ul>
    </section>
    <section class="lesson-section">
      ${aiHelpCallout("the capstone project")}
    </section>
    <div class="lesson-footer">
      <button class="complete-btn ${completed ? "done" : ""}" type="button" data-complete="${capstone.id}">
        ${completed ? "Capstone Complete" : "Mark Capstone Complete"}
      </button>
      <div class="prev-next">
        ${prev ? `<a href="#${prev.id}" class="pn-link">Previous: ${escapeHtml(prev.title)}</a>` : "<span></span>"}
        <span></span>
      </div>
    </div>
  `;
}

/* ---------- Dashboard ---------- */
function renderDashboard() {
  const pct = progressPercent();
  const lastId = getLast();
  const lastEntry = lastId ? findById(lastId) : null;
  const continueEntry = lastEntry || SEQUENCE[0];
  const completed = getCompleted();

  const moduleCards = COURSE.modules
    .map((mod, i) => {
      const items = [];
      (mod.lessons || []).forEach((l) => items.push(l.id));
      if (mod.project) items.push(mod.project.id);
      if (mod.projects) mod.projects.forEach((p) => items.push(p.id));
      if (mod.capstone) items.push(mod.capstone.id);
      const done = items.filter((id) => completed.has(id)).length;
      const first = items[0];
      return `
      <a href="#${first}" class="module-card">
        <div class="module-card-top">
          <span class="mono">${String(i + 1).padStart(2, "0")}</span>
          <span class="module-card-count">${done}/${items.length}</span>
        </div>
        <h3>${escapeHtml(mod.title)}</h3>
        <p>${escapeHtml(mod.description)}</p>
      </a>`;
    })
    .join("");

  const projectCount = SEQUENCE.filter((e) => e.type === "project" && completed.has(e.id)).length;
  const totalProjects = SEQUENCE.filter((e) => e.type === "project").length;
  const capstoneEntry = SEQUENCE.find((e) => e.type === "capstone");

  return `
    <div class="dashboard-head">
      <h1>CodeVent Web Development</h1>
      <p class="dashboard-tagline">${escapeHtml(COURSE.tagline)}</p>
    </div>

    <div class="dashboard-stats">
      <div class="stat-card">
        <div class="stat-label">Course Progress</div>
        <div class="stat-value mono">${pct}%</div>
        <div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Current Lesson</div>
        <div class="stat-value-small">${escapeHtml(continueEntry.title)}</div>
        <a href="#${continueEntry.id}" class="continue-btn">Continue Learning</a>
      </div>
      <div class="stat-card">
        <div class="stat-label">Completed Projects</div>
        <div class="stat-value mono">${projectCount}/${totalProjects}</div>
        <div class="stat-label">Final Project: ${capstoneEntry && completed.has(capstoneEntry.id) ? "Complete" : "Not Started"}</div>
      </div>
    </div>

    <h2 class="section-heading">Modules</h2>
    <div class="module-grid">${moduleCards}</div>
  `;
}

/* ---------- Main render ---------- */
function render() {
  if (authorizationState !== AUTH_STATES.UNLOCKED) return;
  const id = currentId();
  const content = document.getElementById("content");
  const sidebar = document.getElementById("sidebar");
  sidebar.innerHTML = renderSidebar();

  let html;
  if (!id || id === "dashboard") {
    html = renderDashboard();
  } else {
    const entry = findById(id);
    if (!entry) {
      html = renderDashboard();
    } else {
      const mod = moduleOf(entry.moduleId);
      if (entry.type === "lesson") html = renderLessonView(mod, entry.data);
      else if (entry.type === "project") html = renderProjectView(mod, entry.data);
      else if (entry.type === "capstone") html = renderCapstoneView(mod, entry.data);
    }
    if (id && id !== "dashboard") setLast(id);
  }

  content.innerHTML = html;
  attachCopyHandlers(content);
  attachRevealHandlers(content);
  attachCompleteHandlers(content);
  attachChecklistHandlers(content);
  attachSidebarHandlers(sidebar);
}

function attachCompleteHandlers(root) {
  root.querySelectorAll("[data-complete]").forEach((btn) => {
    btn.addEventListener("click", () => {
      toggleComplete(btn.dataset.complete);
      render();
    });
  });
}

function attachChecklistHandlers(root) {
  root.querySelectorAll("[data-checklist]").forEach((box) => {
    const key = "chk_" + box.dataset.checklist;
    box.checked = localStorage.getItem(key) === "1";
    box.addEventListener("change", () => {
      localStorage.setItem(key, box.checked ? "1" : "0");
    });
  });
}

function attachSidebarHandlers(root) {
  const lockButton = root.querySelector("#lock-course-btn");
  if (lockButton) lockButton.addEventListener("click", lockCourse);

  root.querySelectorAll("[data-toggle]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const modId = btn.dataset.toggle;
      const wrap = btn.closest(".nav-module");
      const isOpen = wrap.classList.toggle("open");
      localStorage.setItem("open_" + modId, isOpen ? "1" : "0");
    });
  });
  root.querySelectorAll("[data-nav]").forEach((a) => {
    a.addEventListener("click", () => closeMobileSidebar());
  });
}

/* ---------- Mobile sidebar toggle ---------- */
function closeMobileSidebar() {
  document.getElementById("app").classList.remove("sidebar-open");
}

function startApp() {
  const toggle = document.getElementById("menu-toggle");
  toggle.addEventListener("click", () => {
    document.getElementById("app").classList.toggle("sidebar-open");
  });
  document.getElementById("overlay").addEventListener("click", closeMobileSidebar);
  render();
}

document.addEventListener("DOMContentLoaded", () => {
  initAuth();
});
