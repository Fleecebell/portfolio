import Reveal from "./Reveal";
import data from "../data";

export default function Contact() {
  return (
    <section id="contact" className="section">
      <div className="container">
        <Reveal>
          <div className="contact-panel">
            <p className="eyebrow" style={{ justifyContent: "center" }}>
              Contact
            </p>
            <h2 className="contact-title">
              一起做点<span className="t-accent">有意思</span>的游戏？
            </h2>
            <p className="contact-sub">
              {data.profile.contactCopy ||
                "欢迎通过以下方式联系我，交流合作、实习机会或 GameJam 组队。"}
            </p>

            <div className="contact-links">
              {data.contactLinks.map((link) => (
                <a
                  className="btn"
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  key={link.label}
                >
                  {link.icon && (
                    <img
                      className="btn-ico"
                      src={link.icon}
                      alt=""
                      aria-hidden="true"
                    />
                  )}
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
