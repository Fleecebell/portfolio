import Reveal from "./Reveal";
import data from "../data";

function MediaBlock({ project, index }) {
  const { images, video } = project.media || {};
  const cover = (images || []).find(Boolean);

  return (
    <div className="project-media">
      {cover ? (
        <img src={cover} alt={`${project.name} 截图`} loading="lazy" />
      ) : video ? (
        <video src={video} controls preload="metadata" />
      ) : (
        <div className="media-placeholder">
          <span className="ph-icon" aria-hidden="true">
            ◫
          </span>
          <span>
            PROJECT {String(index + 1).padStart(2, "0")} · MEDIA
          </span>
          <span style={{ fontSize: "0.62rem", opacity: 0.7 }}>
            截图与视频素材待补充
          </span>
        </div>
      )}
    </div>
  );
}

function ProjectCard({ project, index }) {
  const flip = index % 2 === 1;

  return (
    <Reveal className="project-card">
      <div className={`project-media-col ${flip ? "flip" : ""}`}>
        <MediaBlock project={project} index={index} />
      </div>

      <div className="project-info">
        <div className="project-idx">
          <span className="num">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="type">{project.type}</span>
        </div>

        <h3 className="project-name">{project.name}</h3>
        <p className="project-summary">{project.summary}</p>

        {project.tags?.length > 0 && (
          <div className="project-tags">
            {project.tags.map((tag) => (
              <span className="tag" key={tag}>
                {tag}
              </span>
            ))}
          </div>
        )}

        {project.points?.length > 0 && (
          <div className="project-points">
            {project.points.map((point, i) => (
              <div className="point" key={i}>
                <b>{point.label}</b>
                <span>{point.text}</span>
              </div>
            ))}
          </div>
        )}

        {project.links?.length > 0 && (
          <div className="project-links">
            {project.links.map((link, i) => (
              <a
                className="btn"
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                key={i}
              >
                {link.label} ↗
              </a>
            ))}
          </div>
        )}
      </div>
    </Reveal>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="section section-alt">
      <div className="container">
        <Reveal>
          <header className="section-head">
            <div>
              <span className="eyebrow">
                <span className="mono">03</span>
                Projects
              </span>
              <h2 className="section-title">项目与能力</h2>
            </div>
            <p className="section-desc">
              Selected Works
            </p>
          </header>
        </Reveal>

        <div className="project-list">
          {data.projects.map((project, i) => (
            <ProjectCard key={project.name} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
