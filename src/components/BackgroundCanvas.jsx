import React, { useEffect, useRef } from 'react';

export function BackgroundCanvas({ isOverclocked = false, activeTheme = 'beige' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    let mouse = { x: width / 2, y: height / 2, active: false };
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };
    const handleMouseLeave = () => {
      mouse.active = false;
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Grid crosshair points
    const step = 80;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Subtle drafting crosshairs (+) across the page
      const isDark = activeTheme === 'dark';
      const baseStroke = isOverclocked
        ? 'rgba(220, 38, 38, 0.12)'
        : isDark ? 'rgba(255, 248, 235, 0.07)' : 'rgba(50, 45, 38, 0.05)';
      ctx.strokeStyle = baseStroke;
      ctx.lineWidth = 1;

      for (let x = 40; x < width; x += step) {
        for (let y = 40; y < height; y += step) {
          const crossSize = 3;
          ctx.beginPath();
          ctx.moveTo(x - crossSize, y);
          ctx.lineTo(x + crossSize, y);
          ctx.moveTo(x, y - crossSize);
          ctx.lineTo(x, y + crossSize);
          ctx.stroke();

          // Subtle interaction with mouse: crosshairs near mouse highlight gently
          if (mouse.active) {
            const dist = Math.hypot(x - mouse.x, y - mouse.y);
            if (dist < 120) {
              const alpha = (1 - dist / 120) * 0.25;
              ctx.strokeStyle = isOverclocked 
                ? `rgba(220, 38, 38, ${alpha})` 
                : `rgba(${isDark ? '231, 124, 76' : '194, 94, 46'}, ${alpha})`;
              ctx.beginPath();
              ctx.arc(x, y, 6, 0, Math.PI * 2);
              ctx.stroke();
              // Reset stroke style
              ctx.strokeStyle = baseStroke;
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isOverclocked, activeTheme]);

  return (
    <canvas 
      ref={canvasRef} 
      className="background-canvas" 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none'
      }}
    />
  );
}
