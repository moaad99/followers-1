"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, Lightformer, Sparkles } from "@react-three/drei";
import { MathUtils, type Group, type Mesh } from "three";

const NEON = "#39ff88";
const PLASMA = "#a855f7";

type Vec2 = { x: number; y: number };

interface SceneInput {
  pointer: RefObject<Vec2>;
  scroll: RefObject<number>;
  motion: number;
}

/** Small shapes orbiting the vault. Fixed positions keep renders deterministic. */
const SATELLITES: {
  position: [number, number, number];
  shape: "box" | "octa" | "torus" | "tetra";
  scale: number;
  color: string;
  wire?: boolean;
  speed: number;
}[] = [
  { position: [-2.9, 1.5, -0.6], shape: "octa", scale: 0.42, color: NEON, speed: 1.4 },
  { position: [2.7, 1.9, -1.2], shape: "box", scale: 0.36, color: PLASMA, speed: 1.1 },
  { position: [3.1, -1.4, 0.2], shape: "torus", scale: 0.38, color: NEON, speed: 1.6 },
  { position: [-2.5, -1.7, 0.4], shape: "tetra", scale: 0.45, color: PLASMA, wire: true, speed: 1.2 },
  { position: [-0.6, 2.6, -1.8], shape: "box", scale: 0.24, color: NEON, wire: true, speed: 2 },
  { position: [0.9, -2.5, -1], shape: "octa", scale: 0.28, color: PLASMA, speed: 1.8 },
];

function Satellite({ item }: { item: (typeof SATELLITES)[number] }) {
  return (
    <Float
      speed={item.speed}
      rotationIntensity={1.4}
      floatIntensity={1.6}
      position={item.position}
    >
      <mesh scale={item.scale}>
        {item.shape === "box" && <boxGeometry args={[1, 1, 1]} />}
        {item.shape === "octa" && <octahedronGeometry args={[1, 0]} />}
        {item.shape === "torus" && <torusGeometry args={[0.8, 0.28, 24, 64]} />}
        {item.shape === "tetra" && <tetrahedronGeometry args={[1, 0]} />}
        {item.wire ? (
          <meshBasicMaterial color={item.color} wireframe transparent opacity={0.7} />
        ) : (
          <meshPhysicalMaterial
            color={item.color}
            emissive={item.color}
            emissiveIntensity={0.35}
            metalness={0.2}
            roughness={0.15}
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        )}
      </mesh>
    </Float>
  );
}

function Vault({ pointer, scroll, motion }: SceneInput) {
  const group = useRef<Group>(null);
  const shell = useRef<Mesh>(null);
  const cage = useRef<Mesh>(null);
  const core = useRef<Mesh>(null);
  const ringA = useRef<Mesh>(null);
  const ringB = useRef<Mesh>(null);
  const viewportWidth = useThree((state) => state.viewport.width);

  // On wide screens the vault sits to the right of the headline. On narrow ones it sits behind it.
  const wide = viewportWidth > 7.5;
  const baseX = wide ? viewportWidth * 0.2 : 0;
  const baseScale = wide ? 1 : 0.78;

  useFrame((_, delta) => {
    const g = group.current;
    if (!g) return;
    const p = pointer.current;
    const s = scroll.current;
    const d = Math.min(delta, 0.05);

    g.rotation.x = MathUtils.damp(g.rotation.x, p.y * 0.35 + s * 0.6, 3.5, d);
    g.rotation.y = MathUtils.damp(g.rotation.y, p.x * 0.55 + s * 1.4, 3.5, d);
    g.position.x = MathUtils.damp(g.position.x, baseX + p.x * 0.25, 3, d);
    g.position.y = MathUtils.damp(g.position.y, -s * 2.2 + p.y * 0.15, 3, d);
    const targetScale = baseScale * (1 - s * 0.25);
    g.scale.setScalar(MathUtils.damp(g.scale.x, targetScale, 3, d));

    if (shell.current) {
      shell.current.rotation.x += d * 0.12 * motion;
      shell.current.rotation.y += d * 0.18 * motion;
    }
    if (cage.current) {
      cage.current.rotation.x -= d * 0.08 * motion;
      cage.current.rotation.z += d * 0.1 * motion;
    }
    if (core.current) {
      core.current.rotation.y -= d * 0.7 * motion;
      core.current.rotation.x += d * 0.3 * motion;
    }
    if (ringA.current) ringA.current.rotation.z += d * 0.35 * motion;
    if (ringB.current) ringB.current.rotation.z -= d * 0.25 * motion;
  });

  return (
    <group ref={group} position={[baseX, 0, 0]} scale={baseScale}>
      {/* Glass shell */}
      <mesh ref={shell}>
        <icosahedronGeometry args={[1.55, 0]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transmission={1}
          thickness={1.4}
          roughness={0.08}
          ior={1.45}
          iridescence={1}
          iridescenceIOR={1.3}
          clearcoat={1}
          attenuationColor={PLASMA}
          attenuationDistance={2.5}
          flatShading
        />
      </mesh>

      {/* Wireframe cage */}
      <mesh ref={cage} scale={1.95}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color={NEON} wireframe transparent opacity={0.16} />
      </mesh>

      {/* Glowing core */}
      <mesh ref={core} scale={0.62}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color={NEON}
          emissive={NEON}
          emissiveIntensity={2.2}
          roughness={0.3}
          toneMapped={false}
        />
      </mesh>

      {/* Orbit rings */}
      <mesh ref={ringA} rotation={[Math.PI / 2.4, 0.2, 0]}>
        <torusGeometry args={[2.55, 0.012, 16, 160]} />
        <meshBasicMaterial color={NEON} toneMapped={false} />
      </mesh>
      <mesh ref={ringB} rotation={[Math.PI / 1.7, -0.5, 0.4]}>
        <torusGeometry args={[2.95, 0.01, 16, 160]} />
        <meshBasicMaterial color={PLASMA} toneMapped={false} />
      </mesh>

      {SATELLITES.map((item, index) => (
        <Satellite key={index} item={item} />
      ))}
    </group>
  );
}

export default function HeroScene({ onReady }: { onReady?: () => void }) {
  const wrapper = useRef<HTMLDivElement>(null);
  const pointer = useRef<Vec2>({ x: 0, y: 0 });
  const scroll = useRef(0);
  const [active, setActive] = useState(true);
  // This component never renders on the server, so reading matchMedia here is safe.
  const [motion] = useState(() =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0.15 : 1,
  );

  useEffect(() => {
    const onPointer = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    };
    const onScroll = () => {
      scroll.current = MathUtils.clamp(window.scrollY / window.innerHeight, 0, 1.5);
    };
    onScroll();
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Pause rendering when the hero is off-screen to save battery.
  useEffect(() => {
    const element = wrapper.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { rootMargin: "100px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapper} className="h-full w-full">
      <Canvas
        frameloop={active ? "always" : "never"}
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 7.5], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        onCreated={() => onReady?.()}
        aria-hidden="true"
      >
        <ambientLight intensity={0.35} />
        <directionalLight position={[4, 6, 5]} intensity={1.2} />
        <pointLight position={[-4, 2, 3]} intensity={30} color={NEON} />
        <pointLight position={[4, -2, 2]} intensity={30} color={PLASMA} />

        <Vault pointer={pointer} scroll={scroll} motion={motion} />

        <Sparkles
          count={90}
          scale={[12, 7, 6]}
          size={2.2}
          speed={0.35 * motion}
          opacity={0.7}
          color={NEON}
        />
        <Sparkles
          count={50}
          scale={[12, 7, 6]}
          size={1.6}
          speed={0.25 * motion}
          opacity={0.5}
          color={PLASMA}
        />

        {/* Studio lighting built from shapes, so no HDR file is downloaded. */}
        <Environment resolution={256}>
          <Lightformer form="rect" intensity={3} position={[0, 4, -6]} scale={[10, 2, 1]} />
          <Lightformer form="rect" intensity={2} color={NEON} position={[-6, 0, -2]} scale={[2, 8, 1]} />
          <Lightformer form="rect" intensity={2} color={PLASMA} position={[6, 0, -2]} scale={[2, 8, 1]} />
          <Lightformer form="ring" intensity={1.5} position={[0, 0, 6]} scale={4} />
        </Environment>
      </Canvas>
    </div>
  );
}
