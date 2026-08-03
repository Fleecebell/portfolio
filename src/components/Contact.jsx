import { useRef, useState } from "react";
import Reveal from "./Reveal";
import data from "../data";

export default function Contact() {
  const [toast, setToast] = useState("");
  const timer = useRef(null);

  const showToast = (msg) => {
    setToast(msg);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(""), 2200);
  };

  const copy = async (text, msg) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    showToast(msg);
  };

  const links = [
    {
      label: "微信",
      text: "15112277413",
      msg: "已将电话/微信复制到剪切板",
    },
    {
      label: "邮箱",
      text: "2126401535@qq.com",
      msg: "已将邮箱复制到剪切板",
    },
  ];

  return (
    <section id="contact" className="section">
      <div className="container">
        <Reveal>
          <header className="section-head">
            <div>
              <span className="eyebrow">
                <span className="mono">04</span>
                Contact
              </span>
              <h2 className="section-title">联系与资料</h2>
            </div>
            <p className="section-desc">Get In Touch</p>
          </header>
        </Reveal>

        <Reveal>
          <div className="contact-panel">
            <h3 className="contact-title">
              一起做点<span className="t-accent">有意思</span>的游戏？
            </h3>
            <p className="contact-sub">
              {data.profile.contactCopy ||
                "欢迎通过以下方式联系我，交流合作或 GameJam 组队。"}
            </p>

            <div className="contact-links">
              {links.map((link) => (
                <button
                  className="btn"
                  key={link.label}
                  onClick={() => copy(link.text, link.msg)}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      {toast && <div className="contact-toast">{toast}</div>}
    </section>
  );
}
