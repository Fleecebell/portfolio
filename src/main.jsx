import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/components.css";

// 注意：不使用 StrictMode —— React 19 下 R3F + @react-three/rapier 的
// double-mount（挂载→卸载→重挂载）会导致物理世界初始化异常，挂牌黑屏
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
