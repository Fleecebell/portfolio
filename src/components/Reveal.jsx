import { useEffect, useRef } from "react";

/**
 * Reveal —— 滚动进入视口时显现的动效容器
 * 通过 IntersectionObserver 给节点添加 .is-inview 类，
 * 过渡动画由 CSS 定义（见 base.css 中 .reveal）。
 */
export default function Reveal({
  children,
  delay = 0,
  className = "",
  ...rest
}) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      node.classList.add("is-inview");
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add("is-inview");
          io.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -48px 0px" }
    );

    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${className}`.trim()}
      style={{ "--reveal-delay": `${delay}ms` }}
      {...rest}
    >
      {children}
    </div>
  );
}
