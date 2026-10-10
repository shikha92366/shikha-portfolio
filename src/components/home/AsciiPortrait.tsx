import { useEffect, useRef, useState } from 'react';

export function AsciiPortrait() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [interactiveGlow, setInteractiveGlow] = useState({ x: 0, y: 0, active: false });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let t = 0;

    // Dimensions
    const width = 280;
    const height = 320;
    canvas.width = width;
    canvas.height = height;

    const cols = 28;
    const rows = 32;
    const cellW = width / cols;
    const cellH = height / rows;

    // Character set for intensity mapping
    const chars = ' .:-=+*#%@';

    const render = () => {
      ctx.fillStyle = '#0a192f';
      ctx.fillRect(0, 0, width, height);

      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * cellW + cellW / 2;
          const y = r * cellH + cellH / 2;

          // Normalized coordinates (-1 to 1)
          const nx = (c / cols - 0.5) * 2;
          const ny = (r / rows - 0.5) * 2;

          // Geometric silhouette of an engineer with headset/circuit lines
          // Head oval:
          const headDist = Math.hypot(nx * 1.2, (ny + 0.25) * 1.1);
          // Shoulder curve:
          const shoulderDist = Math.max(0, 1 - Math.hypot(nx * 0.7, (ny - 0.65) * 1.4));

          let intensity = 0;
          if (headDist < 0.55) {
            intensity += (0.55 - headDist) * 1.8;
          }
          if (ny > 0.1 && shoulderDist > 0.2) {
            intensity += shoulderDist * 0.9;
          }

          // Subtle wave modulation
          if (!reducedMotion) {
            const wave = Math.sin(nx * 3 + ny * 2 + t * 0.05) * 0.15;
            intensity += wave;
          }

          // Interactive mouse effect
          if (interactiveGlow.active) {
            const dToMouse = Math.hypot(x - interactiveGlow.x, y - interactiveGlow.y);
            if (dToMouse < 60) {
              intensity += (1 - dToMouse / 60) * 0.4;
            }
          }

          intensity = Math.max(0, Math.min(1, intensity));

          if (intensity > 0.08) {
            const charIdx = Math.floor(intensity * (chars.length - 1));
            const char = chars[charIdx] || ' ';

            // Alpha and brightness modulation
            ctx.fillStyle = intensity > 0.6 ? '#64ffda' : 'rgba(100, 255, 218, 0.65)';
            ctx.fillText(char, x, y);
          } else {
            // Faint matrix dot
            if ((r + c) % 4 === 0) {
              ctx.fillStyle = 'rgba(35, 53, 84, 0.4)';
              ctx.fillText('·', x, y);
            }
          }
        }
      }

      t += 1;
      if (!reducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [reducedMotion, interactiveGlow]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setInteractiveGlow({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    });
  };

  const handleMouseLeave = () => {
    setInteractiveGlow((prev) => ({ ...prev, active: false }));
  };

  return (
    <div className="relative group p-2 rounded-xl border border-[#233554] bg-[#112240]/40 backdrop-blur-sm max-w-[300px] mx-auto shadow-xl">
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#233554]/60 px-2 text-[10px] font-mono text-[#8892b0]">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#64ffda] inline-block animate-pulse" />
          <span>ASCII_PORTRAIT.v2</span>
        </div>
        <span className="text-[#64ffda]/80">28x32 MATRIX</span>
      </div>

      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="rounded border border-[#233554]/50 cursor-crosshair mx-auto block bg-[#0a192f]"
        width={280}
        height={320}
        aria-label="Dot-matrix ASCII portrait of Shikha"
      />

      <div className="pt-2 px-2 flex items-center justify-between text-[10px] font-mono text-[#8892b0]/70">
        <span>INTERACTIVE CANVAS</span>
        <span>HOVER TO MODULATE</span>
      </div>
    </div>
  );
}

export default AsciiPortrait;
