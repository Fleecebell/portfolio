/* eslint-disable react/no-unknown-property */
'use client';
import { Component, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import * as THREE from 'three';
import './Lanyard.css';
// 挂牌正反面图：?inline 构建时内联为 data URI（file:// 下 WebGL 纹理不受跨域限制）
import frontCardPng from './cards/front.png?inline';
import backCardPng from './cards/back.png?inline';

extend({ MeshLineGeometry, MeshLineMaterial });

// 1x1 transparent pixel — lets useTexture be called unconditionally when a
// front/back image isn't supplied.
const BLANK_PIXEL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

// The card's front/back faces map to the LEFT/RIGHT halves of the atlas.
// atlas 尺寸 1422×1000：每半区 711×1000，与卡片几何比例（0.711:1）及
// front/back 图片比例完全一致 → 无裁切、无拉伸。
const FRONT_UV_RECT = { x: 0, y: 0, w: 0.5, h: 1 };
const BACK_UV_RECT = { x: 0.5, y: 0, w: 0.5, h: 1 };

// ---- 运行时构建挂牌模型（卡片 / 金属夹 / 材质），不依赖外部 .glb 资源 ----
// 卡片尺寸 0.711 × 1.0 × 0.02（乘 group scale 2.25 后 ≈ 物理碰撞盒 1.6 × 2.25）
function buildCardGeometry() {
  const w = 0.3555;
  const h = 0.5;
  const d = 0.01;
  const positions = [];
  const normals = [];
  const uvs = [];
  const indices = [];

  const pushQuad = (corners, uvCorners, normal, tris) => {
    const base = positions.length / 3;
    corners.forEach((c) => positions.push(...c));
    uvCorners.forEach((u) => uvs.push(...u));
    for (let i = 0; i < 4; i++) normals.push(...normal);
    tris.forEach((t) => indices.push(base + t[0], base + t[1], base + t[2]));
  };

  // 正面（朝 +z）：atlas 左半 [0,0.5]×[0,1]，底部 y=0、顶部 y=1
  pushQuad(
    [
      [-w, -h, d],
      [w, -h, d],
      [w, h, d],
      [-w, h, d],
    ],
    [
      [0, 0],
      [0.5, 0],
      [0.5, 1],
      [0, 1],
    ],
    [0, 0, 1],
    [
      [0, 1, 2],
      [0, 2, 3],
    ]
  );

  // 背面（朝 -z）：atlas 右半 [0.5,1]×[0,1]；顶点逆序保证法线朝 -z
  pushQuad(
    [
      [-w, -h, -d],
      [w, -h, -d],
      [w, h, -d],
      [-w, h, -d],
    ],
    [
      [0.5, 0],
      [1, 0],
      [1, 1],
      [0.5, 1],
    ],
    [0, 0, -1],
    [
      [0, 2, 1],
      [0, 3, 2],
    ]
  );

  // 侧面（厚度不可见，UV 随意）
  const sideUV = [
    [0, 0],
    [0.5, 0],
    [0.5, 1],
    [0, 1],
  ];
  pushQuad(
    [
      [w, -h, -d],
      [w, -h, d],
      [w, h, d],
      [w, h, -d],
    ],
    sideUV,
    [1, 0, 0],
    [
      [0, 1, 2],
      [0, 2, 3],
    ]
  );
  pushQuad(
    [
      [-w, -h, d],
      [-w, -h, -d],
      [-w, h, -d],
      [-w, h, d],
    ],
    sideUV,
    [-1, 0, 0],
    [
      [0, 1, 2],
      [0, 2, 3],
    ]
  );
  pushQuad(
    [
      [-w, h, -d],
      [-w, h, d],
      [w, h, d],
      [w, h, -d],
    ],
    sideUV,
    [0, 1, 0],
    [
      [0, 1, 2],
      [0, 2, 3],
    ]
  );
  pushQuad(
    [
      [-w, -h, d],
      [-w, -h, -d],
      [w, -h, -d],
      [w, -h, d],
    ],
    sideUV,
    [0, -1, 0],
    [
      [0, 1, 2],
      [0, 2, 3],
    ]
  );

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geo.setIndex(indices);
  return geo;
}

// 运行时构建挂牌模型（卡片 / 金属夹 / 材质），不依赖外部 .glb 资源
// cardScale：视觉缩放（桌面 4.5 ≈ 放大 2 倍；移动端 2.5 适中）
function buildCardAssets(cardScale = 4.5) {
  // 卡片纹理 atlas（1422×1000：左右半区 = 正/背面 711×1000，与图片同比例）
  const atlas = document.createElement('canvas');
  atlas.width = 1422;
  atlas.height = 1000;
  const ctx = atlas.getContext('2d');
  const grad = ctx.createLinearGradient(0, 0, 0, 1000);
  grad.addColorStop(0, '#182230');
  grad.addColorStop(0.5, '#0e151f');
  grad.addColorStop(1, '#080c12');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1422, 1000);

  const atlasTex = new THREE.CanvasTexture(atlas);
  atlasTex.colorSpace = THREE.SRGBColorSpace;
  // 非 2 的幂纹理：关闭 mipmap，避免 NPOT 警告
  atlasTex.generateMipmaps = false;
  atlasTex.minFilter = THREE.LinearFilter;
  atlasTex.anisotropy = 16;
  atlasTex.needsUpdate = true;

  const baseMat = new THREE.MeshStandardMaterial({
    map: atlasTex,
    roughness: 0.9,
    metalness: 0.8,
  });
  const metalMat = new THREE.MeshStandardMaterial({
    color: 0x9aa7b8,
    metalness: 0.55,
    roughness: 0.55,
  });

  // 挂绳默认纹理（深色带 + 亮色细线，可被 lanyardImage 覆盖）
  const band = document.createElement('canvas');
  band.width = 256;
  band.height = 64;
  const bctx = band.getContext('2d');
  bctx.fillStyle = '#161e2a';
  bctx.fillRect(0, 0, 256, 64);
  bctx.fillStyle = 'rgba(94, 234, 212, 0.45)';
  bctx.fillRect(0, 24, 256, 3);
  bctx.fillRect(0, 38, 256, 3);
  const bandTex = new THREE.CanvasTexture(band);
  bandTex.wrapS = bandTex.wrapT = THREE.RepeatWrapping;

  return {
    cardGeo: buildCardGeometry(),
    // 工牌卡扣（鳄鱼夹简化）：单块夹片，夹在卡片顶部，挂绳末端直接贴在夹片上边缘
    clipGeo: new THREE.BoxGeometry(0.24, 0.06, 0.08),
    baseMat,
    metalMat,
    bandTex,
    // 夹片上边缘的 group 局部 y（用于对齐 joint 锚点与挂绳末端）
    clipAnchorY: (0.5 + 0.06 / 2) * cardScale,
  };
}

export default function Lanyard({
  // 画布四向延展后，拉远相机 + 加大 fov 让牌子在屏幕上的视觉尺寸恢复原大小
  position = [1.4, -0.9, 30],
  gravity = [0, -40, 0],
  fov = 44,
  transparent = true,
  frontImage = frontCardPng,
  backImage = backCardPng,
  imageFit = 'cover',
  lanyardImage = null,
  lanyardWidth = 0.4,
  phone = '15112277413',
  eventSource = null
}) {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);
  const [toast, setToast] = useState(false);
  const toastTimer = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 复制电话号码到剪贴板（含 file:// 与老浏览器兜底）
  const copyPhone = () => {
    const done = () => setToast(true);
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard
        .writeText(phone)
        .then(done)
        .catch(() => {
          legacyCopy(phone);
          done();
        });
    } else {
      legacyCopy(phone);
      done();
    }
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(false), 2200);
  };

  // 移动端相机：拉远 + 广角，牌子视觉尺寸恢复原大小（画布保持延展）
  const camPos = isMobile ? [1.2, 0.2, 22] : position;
  const camFov = isMobile ? 40 : fov;

  return (
    <div className="lanyard-wrapper">
      <LanyardBoundary frontImage={frontImage}>
        <Canvas
          eventSource={eventSource}
          camera={{ position: camPos, fov: camFov }}
          // 画布四向延展后物理像素巨大，dpr 降到 1.25 控制 GPU 开销
          dpr={[1, 1.25]}
          gl={{ alpha: transparent }}
          onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)}
        >
          {/* 中性白光为主（去掉冷色/teal 光源，避免立牌蒙蓝） */}
          <ambientLight intensity={1.0} />
          <directionalLight position={[4, 5, 3]} intensity={1.4} color="#ffffff" />
          <directionalLight position={[-5, 1, 4]} intensity={0.5} color="#ffffff" />
          <Physics gravity={gravity} timeStep={isMobile ? 1 / 30 : 1 / 60}>
            <Band
              isMobile={isMobile}
              frontImage={frontImage}
              backImage={backImage}
              imageFit={imageFit}
              lanyardImage={lanyardImage}
              lanyardWidth={lanyardWidth}
              copyPhone={copyPhone}
            />
          </Physics>
        </Canvas>
      </LanyardBoundary>
      {toast && <div className="lanyard-toast">已将电话/微信复制到剪切板</div>}
    </div>
  );
}

// 3D 渲染异常兜底：降级为静态名片图，保证整页不崩溃
class LanyardBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { failed: false, err: null };
  }
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(error) {
    // 开发环境把错误暴露到页面便于定位，生产环境不显示
    if (import.meta.env.DEV) this.setState({ err: error && (error.message || String(error)) });
  }
  render() {
    if (this.state.failed) {
      return (
        <div className="lanyard-fallback">
          {this.props.frontImage && <img src={this.props.frontImage} alt="名片" draggable="false" />}
          {this.state.err && <p className="lanyard-fallback-err">3D 初始化失败：{this.state.err}</p>}
        </div>
      );
    }
    return this.props.children;
  }
}

// 老式复制兜底（file:// / 微信等不支持 Clipboard API 的场景）
function legacyCopy(text) {
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;top:-999px;opacity:0;';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
  } catch {
    /* ignore */
  }
}

function Band({
  maxSpeed = 50,
  minSpeed = 0,
  isMobile = false,
  frontImage = null,
  backImage = null,
  imageFit = 'cover',
  lanyardImage = null,
  lanyardWidth = 1,
  copyPhone = null
}) {
  const band = useRef(),
    fixed = useRef(),
    j1 = useRef(),
    j2 = useRef(),
    j3 = useRef(),
    card = useRef();
  const vec = new THREE.Vector3(),
    ang = new THREE.Vector3(),
    rot = new THREE.Vector3(),
    dir = new THREE.Vector3();
  const segmentProps = { type: 'dynamic', canSleep: true, colliders: false, angularDamping: 4, linearDamping: 4 };

  // 运行时构建的模型资产（几何 + 材质），替代 useGLTF(card.glb)
  const cardScale = isMobile ? 2.5 : 4.5;
  const { cardGeo, clipGeo, baseMat, metalMat, bandTex, clipAnchorY } = useMemo(
    () => buildCardAssets(cardScale),
    [cardScale]
  );

  // 挂绳纹理：自定义图片优先，否则用运行时生成的默认纹理
  const customBand = useTexture(lanyardImage || BLANK_PIXEL);
  const texture = lanyardImage ? customBand : bandTex;

  // useTexture must be called unconditionally; use a blank pixel when an image
  // isn't supplied for a given face, then skip compositing it below.
  const frontTex = useTexture(frontImage || BLANK_PIXEL);
  const backTex = useTexture(backImage || BLANK_PIXEL);

  // Composite the front/back images into the card's texture atlas (front = left
  // half, back = right half). Each image is drawn aspect-preserving (no stretch).
  const cardMap = useMemo(() => {
    const baseMap = baseMat.map;
    if (!frontImage && !backImage) return baseMap;

    const baseImg = baseMap.image;
    const W = baseImg.width;
    const H = baseImg.height;
    const canvas = document.createElement('canvas');
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d');
    if (!ctx) return baseMap;
    // Keep the original baked atlas for the card edges and any untouched face.
    ctx.drawImage(baseImg, 0, 0, W, H);

    const drawFitted = (img, rect) => {
      const rx = rect.x * W;
      const ry = rect.y * H;
      const rw = rect.w * W;
      const rh = rect.h * H;
      const pick = imageFit === 'contain' ? Math.min : Math.max;
      const scale = pick(rw / img.width, rh / img.height);
      const dw = img.width * scale;
      const dh = img.height * scale;
      const dx = rx + (rw - dw) / 2;
      const dy = ry + (rh - dh) / 2;
      ctx.save();
      ctx.beginPath();
      ctx.rect(rx, ry, rw, rh);
      ctx.clip();
      ctx.drawImage(img, dx, dy, dw, dh);
      ctx.restore();
    };

    if (frontImage && frontTex.image) drawFitted(frontTex.image, FRONT_UV_RECT);
    if (backImage && backTex.image) drawFitted(backTex.image, BACK_UV_RECT);

    const composite = new THREE.CanvasTexture(canvas);
    composite.colorSpace = THREE.SRGBColorSpace;
    composite.flipY = baseMap.flipY;
    composite.anisotropy = 16;
    composite.needsUpdate = true;
    return composite;
  }, [frontImage, backImage, imageFit, frontTex, backTex, baseMat.map]);

  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()])
  );
  const [dragged, drag] = useState(false);
  const [hovered, hover] = useState(false);

  // 定点弹动：每 5 秒随机方向轻推一下（让读者感知可交互）；点击时大力度弹动
  const kickTimer = useRef(5);
  const downInfo = useRef(null);
  const kick = (power) => {
    try {
      if (!card.current) return;
      [card, j1, j2, j3].forEach((ref) => ref.current?.wakeUp());
      // 水平方向为主、纵向轻微，避免卡片甩出可视区域
      const v = new THREE.Vector3(
        (Math.random() - 0.5) * 2 * power,
        Math.random() * power * 0.4 - power * 0.15,
        (Math.random() - 0.5) * 2 * power
      );
      card.current.applyImpulse({ x: v.x, y: v.y, z: v.z }, true);
      card.current.applyTorqueImpulse(
        {
          x: (Math.random() - 0.5) * power * 0.8,
          y: (Math.random() - 0.5) * power * 0.8,
          z: (Math.random() - 0.5) * power * 0.8,
        },
        true
      );
      [j1, j2, j3].forEach((ref) =>
        ref.current?.applyImpulse({ x: v.x * 0.35, y: v.y * 0.35, z: v.z * 0.35 }, true)
      );
    } catch {
      /* 物理异常不向外抛，避免拖垮整页 */
    }
  };

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  // joint 锚在夹片上边缘 → 挂绳末端精确贴住夹片顶端，无环无空隙
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, clipAnchorY, 0]
  ]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => void (document.body.style.cursor = 'auto');
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    try {
      if (dragged) {
        vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
        dir.copy(vec).sub(state.camera.position).normalize();
        vec.add(dir.multiplyScalar(state.camera.position.length()));
        [card, j1, j2, j3, fixed].forEach(ref => ref.current?.wakeUp());
        card.current?.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z });
      }
      if (fixed.current) {
        [j1, j2].forEach(ref => {
          if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
          const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())));
          ref.current.lerped.lerp(
            ref.current.translation(),
            delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
          );
        });
        curve.points[0].copy(j3.current.translation());
        curve.points[1].copy(j2.current.lerped);
        curve.points[2].copy(j1.current.lerped);
        curve.points[3].copy(fixed.current.translation());
        // 防御：物理初始化/摆动期间 translation 可能为 NaN，跳过该帧避免挂绳几何 NaN
        const bandPoints = curve.getPoints(isMobile ? 16 : 32);
        const validBand = bandPoints.every(
          (p) => isFinite(p.x) && isFinite(p.y) && isFinite(p.z)
        );
        if (validBand) band.current.geometry.setPoints(bandPoints);
        ang.copy(card.current.angvel());
        rot.copy(card.current.rotation());
        card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
      }
    // 每 5 秒随机轻弹一下（桌面端 + 手机端；拖拽中不弹，避免干扰）
    if (!dragged) {
      kickTimer.current -= delta;
      if (kickTimer.current <= 0) {
        kickTimer.current = 5;
        kick(isMobile ? 0.14 : 0.18);
      }
    }
    } catch {
      /* 物理/渲染异常不向上传播 */
    }
  });

  curve.curveType = 'chordal';
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  // 场景高度基准：整体下移 50% 卡片自身长度（桌面卡片高 4.5 → 下移 2.25，
  // 移动端高 2.5 → 下移 1.25），绳头锚点统一落在 y≈1.95；相机已同步下移
  const anchorY = 1.95;
  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" position={[0, anchorY, 0]} />
        <RigidBody position={[0.5, anchorY, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, anchorY, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[2, anchorY + clipAnchorY, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[2, anchorY, 0]} ref={card} {...segmentProps} type={dragged ? 'kinematicPosition' : 'dynamic'}>
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={cardScale}
            position={[0, 0, 0]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e) => {
              if (e.target.hasPointerCapture?.(e.pointerId)) {
                e.target.releasePointerCapture(e.pointerId);
              }
              drag(false);
              // 点击（位移小、时长短）→ 大力度弹动；拖拽 → 正常物理。两者都复制电话
              const info = downInfo.current;
              downInfo.current = null;
              const dist = info
                ? Math.hypot(e.clientX - info.x, e.clientY - info.y)
                : 0;
              const elapsed = info ? performance.now() - info.t : 0;
              if (dist < 8 && elapsed < 700) kick(1.4);
              copyPhone?.();
            }}
            onPointerDown={(e) => {
              downInfo.current = {
                x: e.clientX,
                y: e.clientY,
                t: performance.now(),
              };
              // 移动端不做拖拽（避免与页面滚动冲突，仅保留点击交互）
              if (isMobile) return;
              e.target.setPointerCapture?.(e.pointerId);
              drag(
                new THREE.Vector3()
                  .copy(e.point)
                  .sub(vec.copy(card.current.translation()))
              );
            }}
          >
            <mesh geometry={cardGeo}>
              <meshPhysicalMaterial
                map={cardMap}
                map-anisotropy={16}
                clearcoat={isMobile ? 0 : 0.3}
                clearcoatRoughness={0.5}
                roughness={0.72}
                metalness={0.3}
              />
            </mesh>
            {/* 工牌卡扣（鳄鱼夹简化）：夹片夹在卡片顶部，挂绳末端直接贴在夹片上边缘 */}
            <mesh geometry={clipGeo} material={metalMat} position={[0, 0.5, 0]} material-roughness={0.3} />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={isMobile ? [1000, 2000] : [1000, 1000]}
          useMap
          map={texture}
          repeat={[-4, 1]}
          lineWidth={lanyardWidth}
        />
      </mesh>
    </>
  );
}
