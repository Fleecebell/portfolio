const data = window.PORTFOLIO_DATA;

const statusClassMap = {
  已具备: "done",
  补强中: "learning",
  目标: "target",
};

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

function renderStats() {
  const target = document.querySelector("#quick-stats");
  data.stats.forEach((item) => {
    const card = el("div", "stat");
    card.append(el("strong", "", item.value));
    card.append(el("span", "", item.label));
    target.append(card);
  });
}

function renderIntro() {
  const target = document.querySelector("#intro-grid");
  data.intro.forEach((item) => {
    const card = el("article", "info-card");
    card.append(el("h3", "", item.title));
    card.append(el("p", "", item.text));
    target.append(card);
  });
}

function renderProjects() {
  const target = document.querySelector("#project-list");
  data.projects.forEach((project, index) => {
    const card = el("article", "project-card");

    const content = el("div", "project-content");
    content.append(el("p", "eyebrow", project.type));
    content.append(el("h3", "", project.name));
    content.append(el("p", "", project.summary));

    const meta = el("div", "project-meta");
    meta.append(el("span", `status ${statusClassMap[project.status] || "target"}`, project.status));
    meta.append(el("span", "tag", project.role));
    project.tags.forEach((tag) => meta.append(el("span", "tag", tag)));
    content.append(meta);

    const points = el("div", "project-points");
    project.points.forEach((point) => {
      const item = el("div", "point");
      item.append(el("b", "", point.label));
      item.append(el("span", "", point.text));
      points.append(item);
    });
    content.append(points);

    const links = el("div", "project-meta");
    project.links.forEach((link) => links.append(el("span", "tag", link)));
    content.append(links);

    const media = el("div", "media-grid");
    const imageSources = project.media?.images || ["", "", ""];
    imageSources.slice(0, 3).forEach((src, imageIndex) => {
      if (src) {
        const image = el("img", "project-image");
        image.src = src;
        image.alt = `${project.name} 截图 ${imageIndex + 1}`;
        media.append(image);
        return;
      }

      const placeholder = el("div", "media-placeholder");
      placeholder.textContent = `项目 ${index + 1} 图片 ${imageIndex + 1}`;
      media.append(placeholder);
    });

    if (project.media?.video) {
      const video = el("video", "project-video");
      video.src = project.media.video;
      video.controls = true;
      video.preload = "metadata";
      media.append(video);
    } else {
      const video = el("div", "media-placeholder video");
      const play = el("div", "play-dot", "▶");
      const label = el("span", "", `项目 ${index + 1} 视频占位`);
      video.append(play, label);
      media.append(video);
    }

    card.append(content, media);
    target.append(card);
  });
}

function renderSkills() {
  const target = document.querySelector("#skill-grid");
  data.skills.forEach((skill) => {
    const card = el("article", "skill-card");
    const header = el("header");
    header.append(el("h3", "", skill.group));
    header.append(el("span", `status ${statusClassMap[skill.status] || "target"}`, skill.status));

    const list = el("ul");
    skill.items.forEach((item) => list.append(el("li", "", item)));

    card.append(header, list);
    target.append(card);
  });
}

function renderWorkflow() {
  const target = document.querySelector("#ai-workflow");
  data.aiWorkflow.forEach((item, index) => {
    const card = el("article", "workflow-item");
    card.append(el("div", "workflow-index", String(index + 1).padStart(2, "0")));
    card.append(el("h3", "", item.title));
    card.append(el("p", "", item.text));
    target.append(card);
  });
}

function renderTimeline(source, selector) {
  const target = document.querySelector(selector);
  source.forEach((item) => {
    const card = el("article", "timeline-item");
    card.append(el("time", "", item.time));
    card.append(el("h3", "", item.title));
    card.append(el("p", "", item.text));
    target.append(card);
  });
}

function renderRoadmap() {
  const target = document.querySelector("#roadmap-list");
  data.roadmap.forEach((item, index) => {
    const card = el("article", "roadmap-item");
    card.dataset.step = String(index + 1).padStart(2, "0");
    card.append(el("h3", "", item.title));
    const list = el("ul");
    item.items.forEach((entry) => list.append(el("li", "", entry)));
    card.append(list);
    target.append(card);
  });
}

function renderContact() {
  document.querySelector("#contact-copy").textContent = data.profile.contactCopy;
  const target = document.querySelector("#contact-links");
  data.contactLinks.forEach((link) => {
    const anchor = el("a", "button", link.label);
    anchor.href = link.href;
    target.append(anchor);
  });
}

function boot() {
  document.querySelector("#profile-summary").textContent = data.profile.summary;
  document.querySelector("#year").textContent = new Date().getFullYear();
  renderStats();
  renderIntro();
  renderProjects();
  renderSkills();
  renderWorkflow();
  renderTimeline(data.awards, "#awards-list");
  renderTimeline(data.experience, "#experience-list");
  renderRoadmap();
  renderContact();
}

boot();
