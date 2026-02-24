const PROJECTS = [
  {
    id: 'entropy',
    title: 'Entropy - AI Humanizer',
    poster: './assets/projects/entropy-cover.svg',
    categories: ['ai', 'frontend'],
    stack: 'React, Vite, NLP prompt workflows',
    summary: 'A focused writing assistant that converts robotic AI output into natural, publish-ready copy.',
    problem: 'Writers were losing time rewriting stiff AI drafts before client delivery.',
    architecture: 'Prompt orchestration layer, output-safety checks, and low-latency editor UX in a React front end.',
    impact: 'Cut editing time and improved final readability for AI-assisted content workflows.',
    lessons: 'In text AI products, UX clarity and response speed influence adoption more than model novelty.',
    stats: ['AI Workflow', 'Fast UX'],
    live: 'https://entropy-iota.vercel.app/',
    github: 'https://github.com/yuv2819-cmyk/Entropy'
  },
  {
    id: 'voidspace',
    title: 'Voidspace Canvas',
    poster: './assets/projects/voidspace-cover.svg',
    categories: ['fullstack', 'frontend'],
    stack: 'React, TypeScript, Node.js, Canvas engine',
    summary: 'A graph interface for building automation flows with instant, deterministic interactions.',
    problem: 'Most workflow editors became hard to reason about once pipelines got large.',
    architecture: 'Typed node schema, custom edge-routing behavior, and event-driven sync endpoints.',
    impact: 'Improved flow creation speed and reduced debugging friction in complex visual pipelines.',
    lessons: 'At scale, predictable interactions matter more than flashy canvas effects.',
    stats: ['Workflow UI', 'Realtime Feel'],
    live: 'https://voidspace-canvas.vercel.app/',
    github: 'https://github.com/yuv2819-cmyk/voidspace-canvas'
  },
  {
    id: 'data-science-portfolio',
    title: 'Data Science Portfolio',
    poster: './assets/projects/data-science-cover.svg',
    categories: ['ai', 'ml'],
    stack: 'Python, Scikit-learn, XGBoost, Streamlit',
    summary: 'A practical ML showcase spanning churn, NLP sentiment, forecasting, and price prediction.',
    problem: 'Teams needed interpretable ML solutions tied to real business questions, not toy demos.',
    architecture: 'Reusable preprocessing modules, training pipelines, evaluation notebooks, and Streamlit dashboards.',
    impact: 'Delivered measurable baselines and a repeatable experimentation framework across use cases.',
    lessons: 'Feature quality and business framing drive model value more than algorithm complexity.',
    stats: ['5 ML Projects', '87% Accuracy'],
    live: '',
    github: 'https://github.com/yuv2819-cmyk/data-science-portfolio'
  },
  {
    id: 'smart-spreadsheet',
    title: 'Smart Spreadsheet',
    poster: './assets/projects/smart-spreadsheet-cover.svg',
    categories: ['ai', 'fullstack'],
    stack: 'Next.js, TypeScript, OpenAI, FastAPI',
    summary: 'A spreadsheet workspace where users ask questions in plain language and get structured insights.',
    problem: 'Small teams lacked analytics support and spent hours manually deriving spreadsheet insights.',
    architecture: 'Prompt-to-query orchestration, secure API layer, tenant-safe access controls, and async processing.',
    impact: 'Turned repetitive analysis tasks into guided AI workflows with faster turnaround.',
    lessons: 'Trust rises when AI answers include transparent logic and constraints.',
    stats: ['SaaS MVP', 'GPT Powered'],
    live: 'https://smart-spreadsheet-nu.vercel.app/',
    github: 'https://github.com/yuv2819-cmyk/Smart-spreadsheet'
  },
  {
    id: 'lead-agent-monitoring-system',
    title: 'Lead Management and Agent Monitoring System',
    poster: './assets/projects/lead-agent-system-cover.svg',
    categories: ['fullstack', 'frontend'],
    stack: 'React, Node.js, MongoDB, REST APIs',
    summary: 'A multi-role operations system focused on lead pipelines, agent performance, and daily sales execution.',
    problem: 'Real-estate teams were managing leads, properties, and follow-ups across disconnected tools.',
    architecture: 'Role-aware routing, token auth, service-layer CRUD APIs, and analytics-driven dashboard modules.',
    impact: 'Centralized workflows, improved team visibility, and reduced operations handoff delays.',
    lessons: 'In ops products, permissions and data consistency are core product features.',
    stats: ['Lead Ops', 'Multi-role'],
    live: 'https://dubai-real-estate-hub-three.vercel.app/',
    github: 'https://github.com/yuv2819-cmyk/dubai-real-estate-hub'
  },
  {
    id: 'property-hub-website',
    title: 'PropertyHub Website',
    poster: './assets/projects/propertyhub-cover.svg',
    categories: ['frontend', 'fullstack'],
    stack: 'HTML, CSS, JavaScript, Maps API',
    summary: 'A real-estate website experience with advanced search, map-led discovery, virtual tours, and alerts.',
    problem: 'Home seekers needed a faster way to compare listings without jumping between multiple portals.',
    architecture: 'Component-based UI, client-side filtering, map integrations, and responsive content modules.',
    impact: 'Improved listing discovery flow and made property comparison easier on mobile and desktop.',
    lessons: 'For listing products, clarity in filters and map interactions directly improves user trust.',
    stats: ['Interactive Maps', 'Virtual Tours'],
    live: 'https://projecthubdemo.netlify.app/',
    github: ''
  },
  {
    id: 'coursenet',
    title: 'CourseNet',
    poster: './assets/projects/coursenet-poster.jpg',
    categories: ['frontend'],
    stack: 'HTML, CSS, JavaScript',
    summary: 'A responsive learning portal concept with clear discovery, progression, and instructor visibility.',
    problem: 'Course platforms often overwhelm users with cluttered navigation and weak progression signals.',
    architecture: 'Lightweight frontend stack, modular sections, and responsive interaction patterns.',
    impact: 'Produced a cleaner course discovery experience with better mobile readability.',
    lessons: 'In content-heavy interfaces, hierarchy and spacing drive user confidence.',
    stats: ['Responsive UI', 'Clean UX'],
    live: 'https://coursenetdemo.netlify.app/',
    github: ''
  }
];

const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const THEME_KEY = 'ysg-portfolio-theme';
let toastTimeout = null;
let modalLastFocus = null;

function escapeForXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function categoryLabel(category) {
  const map = {
    ai: 'AI Product',
    ml: 'ML System',
    fullstack: 'Full Stack',
    frontend: 'Frontend'
  };
  return map[category] || 'Project';
}

function fallbackCover(project) {
  const title = escapeForXml(project.title);
  const stack = escapeForXml(project.stack);
  const tag = escapeForXml(categoryLabel(project.categories[0]));
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675">
      <defs>
        <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#2a2e2a"/>
          <stop offset="50%" stop-color="#1f2220"/>
          <stop offset="100%" stop-color="#171a17"/>
        </linearGradient>
      </defs>
      <rect width="1200" height="675" fill="url(#g1)"/>
      <circle cx="1020" cy="120" r="220" fill="#c8ff4d1f"/>
      <circle cx="180" cy="590" r="260" fill="#ffb2481a"/>
      <rect x="58" y="58" width="240" height="48" rx="24" fill="#ffffff14" stroke="#ffffff26"/>
      <text x="178" y="89" fill="#f6f9ef" font-size="24" font-family="Arial, sans-serif" text-anchor="middle">${tag}</text>
      <text x="58" y="510" fill="#ffffff" font-size="58" font-weight="700" font-family="Arial, sans-serif">${title}</text>
      <text x="58" y="558" fill="#c8d0c1" font-size="25" font-family="Arial, sans-serif">${stack}</text>
      <rect x="0" y="0" width="1200" height="675" fill="none" stroke="#ffffff26"/>
    </svg>
  `;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function thumbnailFromProject(project) {
  if (project.poster) {
    return project.poster;
  }
  if (project.live) {
    return `https://image.thum.io/get/width/1280/noanimate/${project.live}`;
  }
  if (project.github) {
    const repoPath = project.github.replace('https://github.com/', '');
    return `https://opengraph.githubassets.com/1/${repoPath}`;
  }
  return 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=60';
}

function projectCardTemplate(project) {
  const categories = project.categories.join(' ');
  const imageSrc = thumbnailFromProject(project);
  const fallbackSrc = fallbackCover(project);
  const hasPreview = Boolean(project.preview);
  const previewMedia = hasPreview
    ? `<img class="project-preview" src="${project.preview}" loading="lazy" alt="${project.title} animated preview" />`
    : '';
  const liveButton = project.live
    ? `<a class="btn btn-primary" href="${project.live}" target="_blank" rel="noopener noreferrer">Live</a>`
    : '';
  const githubButton = project.github
    ? `<a class="btn btn-secondary" href="${project.github}" target="_blank" rel="noopener noreferrer">GitHub</a>`
    : '';

  return `
    <article class="project-card" data-categories="${categories}" data-project-id="${project.id}">
      <div class="project-thumb ${hasPreview ? 'has-preview' : ''}">
        <img class="project-poster" src="${imageSrc}" data-fallback="${fallbackSrc}" loading="lazy" alt="${project.title} preview" />
        ${previewMedia}
      </div>
      <div class="project-body">
        <div class="project-head">
          <div>
            <h3>${project.title}</h3>
            <p class="project-stack">${project.stack}</p>
          </div>
        </div>
        <p class="project-summary">${project.summary}</p>
        <div class="project-meta">
          ${project.stats.map((item) => `<span>${item}</span>`).join('')}
        </div>
        <div class="project-actions">
          ${liveButton}
          ${githubButton}
          <button class="btn btn-secondary js-open-case" type="button" data-project-id="${project.id}">Case Study</button>
        </div>
      </div>
    </article>
  `;
}

function renderProjects() {
  const grid = document.getElementById('project-grid');
  if (!grid) {
    return;
  }
  grid.innerHTML = PROJECTS.map(projectCardTemplate).join('');
}

function setupProjectImageFallbacks() {
  document.querySelectorAll('.project-thumb img').forEach((img) => {
    img.addEventListener('error', () => {
      if (img.classList.contains('project-preview')) {
        img.remove();
        return;
      }

      const fallback = img.dataset.fallback;
      if (fallback && img.src !== fallback) {
        img.src = fallback;
      }
    });
  });
}

function setupFilters() {
  const buttons = [...document.querySelectorAll('.filter-btn')];
  const cards = () => [...document.querySelectorAll('.project-card')];

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter || 'all';

      buttons.forEach((item) => {
        const isActive = item === btn;
        item.classList.toggle('is-active', isActive);
        item.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      });

      cards().forEach((card) => {
        const categories = (card.dataset.categories || '').split(' ');
        const visible = filter === 'all' || categories.includes(filter);
        card.classList.toggle('is-hidden', !visible);
      });
    });
  });
}

function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) {
    return;
  }

  toast.textContent = message;
  toast.classList.add('is-visible');
  window.clearTimeout(toastTimeout);
  toastTimeout = window.setTimeout(() => {
    toast.classList.remove('is-visible');
  }, 1800);
}

function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text);
  }

  return new Promise((resolve, reject) => {
    const input = document.createElement('textarea');
    input.value = text;
    input.style.position = 'fixed';
    input.style.left = '-9999px';
    document.body.appendChild(input);
    input.focus();
    input.select();
    try {
      document.execCommand('copy');
      resolve();
    } catch (err) {
      reject(err);
    } finally {
      document.body.removeChild(input);
    }
  });
}

function setupContactActions() {
  const copyBtn = document.getElementById('copy-email');
  if (!copyBtn) {
    return;
  }

  copyBtn.addEventListener('click', async () => {
    const email = copyBtn.dataset.email || '';
    if (!email) {
      return;
    }

    try {
      await copyText(email);
      showToast('Email copied to clipboard');
    } catch (_) {
      showToast('Unable to copy email');
    }
  });
}

function applyTheme(theme) {
  const html = document.documentElement;
  const themeLabel = document.getElementById('theme-label');
  const toggle = document.getElementById('theme-toggle');
  const resolvedTheme = theme === 'light' ? 'light' : 'dark';

  html.setAttribute('data-theme', resolvedTheme);
  if (themeLabel) {
    themeLabel.textContent = resolvedTheme === 'dark' ? 'Theme: Dark' : 'Theme: Light';
  }
  if (toggle) {
    toggle.setAttribute('aria-pressed', resolvedTheme === 'dark' ? 'true' : 'false');
  }
}

function setupTheme() {
  const toggle = document.getElementById('theme-toggle');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const saved = localStorage.getItem(THEME_KEY);
  const initialTheme = saved || (systemPrefersDark ? 'dark' : 'light');
  applyTheme(initialTheme);

  if (!toggle) {
    return;
  }

  toggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    localStorage.setItem(THEME_KEY, next);
    applyTheme(next);
  });
}

function setupScrollSystem() {
  const progressBar = document.getElementById('scroll-progress-bar');
  const navLinks = [...document.querySelectorAll('.top-nav a')];
  const minimapLinks = [...document.querySelectorAll('.mini-map a')];
  const sections = [...document.querySelectorAll('main section[id]')];
  const allLinks = [...navLinks, ...minimapLinks];

  const updateProgress = () => {
    if (!progressBar) {
      return;
    }

    const max = document.documentElement.scrollHeight - window.innerHeight;
    const value = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
    progressBar.style.transform = `scaleX(${value})`;
  };

  const updateActiveLinks = () => {
    const offset = 140;
    let current = sections[0]?.id || 'home';

    sections.forEach((section) => {
      if (window.scrollY + offset >= section.offsetTop) {
        current = section.id;
      }
    });

    allLinks.forEach((link) => {
      const active = link.getAttribute('href') === `#${current}`;
      link.classList.toggle('is-active', active);
      if (active) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  };

  const onScroll = () => {
    updateProgress();
    updateActiveLinks();
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const targetId = link.getAttribute('href');
      if (!targetId || targetId === '#') {
        return;
      }

      const target = document.querySelector(targetId);
      if (!target) {
        return;
      }

      event.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({ top, behavior: REDUCED_MOTION ? 'auto' : 'smooth' });
    });
  });
}

function setupRevealObserver() {
  const revealItems = document.querySelectorAll('.reveal');
  if (!revealItems.length) {
    return;
  }

  if (REDUCED_MOTION) {
    revealItems.forEach((item) => item.classList.add('in-view'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    },
    {
      threshold: 0.2,
      rootMargin: '0px 0px -60px 0px'
    }
  );

  revealItems.forEach((item) => observer.observe(item));
}

function setupSignalBoard() {
  const board = document.getElementById('signal-board');
  const statusBtn = document.getElementById('signal-status');
  if (!board || !statusBtn) {
    return;
  }

  const states = [
    'Focus: scalable AI features for real users',
    'Focus: data products tied to measurable outcomes',
    'Focus: full-stack systems with strong UX performance'
  ];
  let idx = 0;

  const cycleState = () => {
    idx = (idx + 1) % states.length;
    statusBtn.textContent = states[idx];
  };

  statusBtn.addEventListener('click', cycleState);
  board.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      cycleState();
    }
  });

  if (REDUCED_MOTION || !window.matchMedia('(pointer:fine)').matches) {
    return;
  }

  board.addEventListener('pointermove', (event) => {
    const rect = board.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const ry = ((x - rect.width / 2) / 32).toFixed(2);
    const rx = ((rect.height / 2 - y) / 32).toFixed(2);

    board.style.setProperty('--mx', `${x}px`);
    board.style.setProperty('--my', `${y}px`);
    board.style.setProperty('--rx', `${rx}deg`);
    board.style.setProperty('--ry', `${ry}deg`);
  });

  board.addEventListener('pointerleave', () => {
    board.style.setProperty('--mx', '50%');
    board.style.setProperty('--my', '50%');
    board.style.setProperty('--rx', '0deg');
    board.style.setProperty('--ry', '0deg');
  });
}

function setupCaseModal() {
  const modal = document.getElementById('case-modal');
  const closeBtn = document.getElementById('close-case');
  if (!modal || !closeBtn) {
    return;
  }

  const title = document.getElementById('case-title');
  const subtitle = document.getElementById('case-subtitle');
  const problem = document.getElementById('case-problem');
  const architecture = document.getElementById('case-architecture');
  const impact = document.getElementById('case-impact');
  const lessons = document.getElementById('case-lessons');
  const liveLink = document.getElementById('case-live');
  const githubLink = document.getElementById('case-github');

  const hideModalLink = (element) => {
    if (!element) {
      return;
    }
    element.style.display = 'none';
    element.removeAttribute('href');
  };

  const showModalLink = (element, url) => {
    if (!element) {
      return;
    }
    if (!url) {
      hideModalLink(element);
      return;
    }
    element.style.display = 'inline-flex';
    element.href = url;
  };

  const closeModal = () => {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (modalLastFocus instanceof HTMLElement) {
      modalLastFocus.focus();
    }
  };

  const openModal = (project) => {
    if (!project) {
      return;
    }

    title.textContent = project.title;
    subtitle.textContent = project.stack;
    problem.textContent = project.problem;
    architecture.textContent = project.architecture;
    impact.textContent = project.impact;
    lessons.textContent = project.lessons;
    showModalLink(liveLink, project.live);
    showModalLink(githubLink, project.github);

    modalLastFocus = document.activeElement;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  };

  document.getElementById('project-grid')?.addEventListener('click', (event) => {
    const caseButton = event.target.closest('.js-open-case');
    if (!caseButton) {
      return;
    }
    const projectId = caseButton.getAttribute('data-project-id');
    const project = PROJECTS.find((item) => item.id === projectId);
    openModal(project);
  });

  closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('is-open')) {
      closeModal();
    }
  });
}

function init() {
  renderProjects();
  setupProjectImageFallbacks();
  setupFilters();
  setupTheme();
  setupScrollSystem();
  setupRevealObserver();
  setupSignalBoard();
  setupCaseModal();
  setupContactActions();
}

init();
