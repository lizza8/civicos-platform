import React, { useRef, useEffect, useState } from "react";
import { Node } from "../App";

interface GlobeCanvasProps {
  nodes: Node[];
  onNodeClick: (node: Node) => void;
}

export function GlobeCanvas({ nodes, onNodeClick }: GlobeCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrame: number;
    let rotation = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resize();
    window.addEventListener("resize", resize);

    const render = () => {
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.min(width, height) * 0.35;

      // Clear canvas
      ctx.fillStyle = "#050a14";
      ctx.fillRect(0, 0, width, height);

      // Draw stars
      ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
      for (let i = 0; i < 200; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const size = Math.random() * 1.5;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw globe
      const gradient = ctx.createRadialGradient(
        centerX,
        centerY,
        radius * 0.5,
        centerX,
        centerY,
        radius
      );
      gradient.addColorStop(0, "rgba(10, 22, 40, 1)");
      gradient.addColorStop(1, "rgba(0, 255, 255, 0.1)");

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fill();

      // Draw grid lines
      ctx.strokeStyle = "rgba(0, 255, 255, 0.2)";
      ctx.lineWidth = 1;

      // Latitude lines
      for (let i = -2; i <= 2; i++) {
        const y = centerY + (i * radius) / 2.5;
        const ellipseWidth = Math.sqrt(1 - Math.pow(i / 2.5, 2)) * radius;
        
        ctx.beginPath();
        ctx.ellipse(centerX, y, ellipseWidth, ellipseWidth * 0.3, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Longitude lines
      for (let i = 0; i < 8; i++) {
        const angle = (i * Math.PI) / 4 + rotation;
        ctx.beginPath();
        ctx.ellipse(
          centerX,
          centerY,
          radius * Math.abs(Math.cos(angle)),
          radius,
          angle,
          0,
          Math.PI * 2
        );
        ctx.stroke();
      }

      // Draw atmosphere glow
      const glowGradient = ctx.createRadialGradient(
        centerX,
        centerY,
        radius,
        centerX,
        centerY,
        radius * 1.15
      );
      glowGradient.addColorStop(0, "rgba(0, 255, 255, 0.3)");
      glowGradient.addColorStop(1, "rgba(0, 255, 255, 0)");

      ctx.fillStyle = glowGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 1.15, 0, Math.PI * 2);
      ctx.fill();

      // Draw nodes
      nodes.forEach((node) => {
        const phi = ((90 - node.lat) * Math.PI) / 180;
        const theta = ((node.lng + 180 + rotation * 57.3) * Math.PI) / 180;

        const x = centerX + radius * Math.sin(phi) * Math.cos(theta);
        const y = centerY - radius * Math.cos(phi);
        const z = radius * Math.sin(phi) * Math.sin(theta);

        // Only draw nodes on visible side
        if (z > -radius * 0.3) {
          const scale = 1 + Math.sin(Date.now() * 0.002) * 0.3;
          const nodeRadius = 4 * scale;
          const color = node.type === "need" ? "#ff0055" : "#00ff88";
          const isHovered = hoveredNode === node.id;

          // Glow
          const nodeGlow = ctx.createRadialGradient(x, y, 0, x, y, nodeRadius * 3);
          nodeGlow.addColorStop(0, color);
          nodeGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
          ctx.fillStyle = nodeGlow;
          ctx.beginPath();
          ctx.arc(x, y, nodeRadius * 3, 0, Math.PI * 2);
          ctx.fill();

          // Node
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(x, y, isHovered ? nodeRadius * 1.5 : nodeRadius, 0, Math.PI * 2);
          ctx.fill();

          // Store node position for click detection
          (node as any)._x = x;
          (node as any)._y = y;
          (node as any)._radius = nodeRadius;
        }
      });

      rotation += 0.001;
      animationFrame = requestAnimationFrame(render);
    };

    render();

    // Mouse interaction
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      let found = false;
      for (const node of nodes) {
        const nx = (node as any)._x;
        const ny = (node as any)._y;
        const nr = (node as any)._radius;

        if (nx && ny && nr) {
          const dist = Math.sqrt(Math.pow(x - nx, 2) + Math.pow(y - ny, 2));
          if (dist < nr * 2) {
            setHoveredNode(node.id);
            canvas.style.cursor = "pointer";
            found = true;
            break;
          }
        }
      }

      if (!found) {
        setHoveredNode(null);
        canvas.style.cursor = "default";
      }
    };

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      for (const node of nodes) {
        const nx = (node as any)._x;
        const ny = (node as any)._y;
        const nr = (node as any)._radius;

        if (nx && ny && nr) {
          const dist = Math.sqrt(Math.pow(x - nx, 2) + Math.pow(y - ny, 2));
          if (dist < nr * 2) {
            onNodeClick(node);
            break;
          }
        }
      }
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("click", handleClick);
      cancelAnimationFrame(animationFrame);
    };
  }, [nodes, onNodeClick, hoveredNode]);

  return (
    <div className="absolute inset-0 w-full h-full">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ display: "block" }}
      />
    </div>
  );
}
