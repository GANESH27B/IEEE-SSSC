"use client";

import { useEffect, useRef } from "react";

interface FloatingShape {
    x: number;
    y: number;
    size: number;
    rotation: number;
    rotationSpeed: number;
    speedX: number;
    speedY: number;
    type: "circle" | "square" | "triangle" | "hexagon";
    color: string;
    opacity: number;
}

interface Spotlight {
    x: number;
    y: number;
    targetX: number;
    targetY: number;
    radius: number;
    color: string;
    speed: number;
}

interface GlowOrb {
    x: number;
    y: number;
    size: number;
    pulsePhase: number;
    pulseSpeed: number;
    color: string;
    vx: number;
    vy: number;
}

export function LectureBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const shapesRef = useRef<FloatingShape[]>([]);
    const spotlightsRef = useRef<Spotlight[]>([]);
    const orbsRef = useRef<GlowOrb[]>([]);
    const mouseRef = useRef({ x: 0, y: 0 });
    const animationRef = useRef<number>(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const colors = ["#ffd700", "#ff8c00", "#00d4ff", "#ff6b9d", "#8b5cf6"];
        const shapeTypes: ("circle" | "square" | "triangle" | "hexagon")[] = ["circle", "square", "triangle", "hexagon"];

        // Initialize floating shapes
        const initShapes = () => {
            shapesRef.current = [];
            const count = 25;

            for (let i = 0; i < count; i++) {
                shapesRef.current.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: 20 + Math.random() * 60,
                    rotation: Math.random() * Math.PI * 2,
                    rotationSpeed: (Math.random() - 0.5) * 0.01,
                    speedX: (Math.random() - 0.5) * 0.3,
                    speedY: (Math.random() - 0.5) * 0.3,
                    type: shapeTypes[Math.floor(Math.random() * shapeTypes.length)],
                    color: colors[Math.floor(Math.random() * colors.length)],
                    opacity: 0.1 + Math.random() * 0.2
                });
            }
        };

        // Initialize spotlights
        const initSpotlights = () => {
            spotlightsRef.current = [
                { x: canvas.width * 0.3, y: canvas.height * 0.3, targetX: canvas.width * 0.7, targetY: canvas.height * 0.7, radius: 300, color: "#ffd700", speed: 0.005 },
                { x: canvas.width * 0.7, y: canvas.height * 0.6, targetX: canvas.width * 0.3, targetY: canvas.height * 0.4, radius: 250, color: "#00d4ff", speed: 0.007 },
                { x: canvas.width * 0.5, y: canvas.height * 0.8, targetX: canvas.width * 0.5, targetY: canvas.height * 0.2, radius: 280, color: "#8b5cf6", speed: 0.004 }
            ];
        };

        // Initialize glow orbs
        const initOrbs = () => {
            orbsRef.current = [];
            for (let i = 0; i < 8; i++) {
                orbsRef.current.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: 40 + Math.random() * 80,
                    pulsePhase: Math.random() * Math.PI * 2,
                    pulseSpeed: 0.02 + Math.random() * 0.02,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5
                });
            }
        };

        // Handle resize
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initShapes();
            initSpotlights();
            initOrbs();
        };

        // Handle mouse move
        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };

        // Draw hexagon
        const drawHexagon = (x: number, y: number, size: number, rotation: number) => {
            ctx.beginPath();
            for (let i = 0; i < 6; i++) {
                const angle = rotation + (Math.PI / 3) * i;
                const px = x + size * Math.cos(angle);
                const py = y + size * Math.sin(angle);
                if (i === 0) ctx.moveTo(px, py);
                else ctx.lineTo(px, py);
            }
            ctx.closePath();
        };

        // Draw triangle
        const drawTriangle = (x: number, y: number, size: number, rotation: number) => {
            ctx.beginPath();
            for (let i = 0; i < 3; i++) {
                const angle = rotation + (Math.PI * 2 / 3) * i - Math.PI / 2;
                const px = x + size * Math.cos(angle);
                const py = y + size * Math.sin(angle);
                if (i === 0) ctx.moveTo(px, py);
                else ctx.lineTo(px, py);
            }
            ctx.closePath();
        };

        // Draw shape
        const drawShape = (shape: FloatingShape) => {
            ctx.save();

            ctx.strokeStyle = shape.color + Math.floor(shape.opacity * 255).toString(16).padStart(2, '0');
            ctx.lineWidth = 2;

            switch (shape.type) {
                case "circle":
                    ctx.beginPath();
                    ctx.arc(shape.x, shape.y, shape.size, 0, Math.PI * 2);
                    ctx.stroke();
                    break;
                case "square":
                    ctx.translate(shape.x, shape.y);
                    ctx.rotate(shape.rotation);
                    ctx.strokeRect(-shape.size / 2, -shape.size / 2, shape.size, shape.size);
                    break;
                case "triangle":
                    drawTriangle(shape.x, shape.y, shape.size, shape.rotation);
                    ctx.stroke();
                    break;
                case "hexagon":
                    drawHexagon(shape.x, shape.y, shape.size, shape.rotation);
                    ctx.stroke();
                    break;
            }

            ctx.restore();
        };

        // Draw spotlight
        const drawSpotlight = (spotlight: Spotlight) => {
            const gradient = ctx.createRadialGradient(
                spotlight.x, spotlight.y, 0,
                spotlight.x, spotlight.y, spotlight.radius
            );
            gradient.addColorStop(0, spotlight.color + "20");
            gradient.addColorStop(0.5, spotlight.color + "08");
            gradient.addColorStop(1, "transparent");

            ctx.fillStyle = gradient;
            ctx.fillRect(
                spotlight.x - spotlight.radius,
                spotlight.y - spotlight.radius,
                spotlight.radius * 2,
                spotlight.radius * 2
            );
        };

        // Draw glow orb
        const drawOrb = (orb: GlowOrb, time: number) => {
            const pulse = Math.sin(time * orb.pulseSpeed + orb.pulsePhase) * 0.3 + 0.7;
            const size = orb.size * pulse;

            const gradient = ctx.createRadialGradient(
                orb.x, orb.y, 0,
                orb.x, orb.y, size
            );
            gradient.addColorStop(0, orb.color + "30");
            gradient.addColorStop(0.4, orb.color + "15");
            gradient.addColorStop(1, "transparent");

            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(orb.x, orb.y, size, 0, Math.PI * 2);
            ctx.fill();
        };

        // Draw elegant lines (like stage curtain strings)
        const drawElegantLines = (time: number) => {
            const lineCount = 30;

            for (let i = 0; i < lineCount; i++) {
                const x = (canvas.width / lineCount) * i;
                const wave = Math.sin(time * 0.01 + i * 0.3) * 20;

                const gradient = ctx.createLinearGradient(x, 0, x, canvas.height);
                gradient.addColorStop(0, "rgba(255, 215, 0, 0.05)");
                gradient.addColorStop(0.5, "rgba(255, 215, 0, 0.02)");
                gradient.addColorStop(1, "transparent");

                ctx.beginPath();
                ctx.moveTo(x + wave, 0);

                // Curved line
                for (let y = 0; y < canvas.height; y += 50) {
                    const xOffset = Math.sin(time * 0.005 + y * 0.01 + i * 0.5) * 10 + wave;
                    ctx.lineTo(x + xOffset, y);
                }

                ctx.strokeStyle = gradient;
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        };

        // Draw bokeh effect
        const drawBokeh = (time: number) => {
            const bokehCount = 20;

            for (let i = 0; i < bokehCount; i++) {
                const x = (canvas.width / bokehCount) * i + Math.sin(time * 0.003 + i) * 50;
                const y = canvas.height * 0.3 + Math.cos(time * 0.002 + i * 0.5) * 100;
                const size = 30 + Math.sin(time * 0.01 + i) * 15;
                const opacity = 0.05 + Math.sin(time * 0.008 + i * 0.7) * 0.03;

                const gradient = ctx.createRadialGradient(x, y, 0, x, y, size);
                gradient.addColorStop(0, `rgba(255, 215, 0, ${opacity})`);
                gradient.addColorStop(0.7, `rgba(255, 200, 0, ${opacity * 0.5})`);
                gradient.addColorStop(1, "transparent");

                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(x, y, size, 0, Math.PI * 2);
                ctx.fill();
            }
        };

        // Animation loop
        let time = 0;
        const animate = () => {
            time += 1;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Deep elegant gradient background
            const bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
            bgGradient.addColorStop(0, "#0a0a12");
            bgGradient.addColorStop(0.3, "#0f0a18");
            bgGradient.addColorStop(0.6, "#100a15");
            bgGradient.addColorStop(1, "#050508");
            ctx.fillStyle = bgGradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw elegant lines
            drawElegantLines(time);

            // Draw bokeh effect
            drawBokeh(time);

            // Update and draw spotlights
            spotlightsRef.current.forEach(spotlight => {
                // Move spotlight toward target
                const dx = spotlight.targetX - spotlight.x;
                const dy = spotlight.targetY - spotlight.y;
                spotlight.x += dx * spotlight.speed;
                spotlight.y += dy * spotlight.speed;

                // If close to target, set new target
                if (Math.abs(dx) < 10 && Math.abs(dy) < 10) {
                    spotlight.targetX = Math.random() * canvas.width;
                    spotlight.targetY = Math.random() * canvas.height;
                }

                // Mouse influence
                const mouseDx = mouseRef.current.x - spotlight.x;
                const mouseDy = mouseRef.current.y - spotlight.y;
                const mouseDist = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy);
                if (mouseDist < 400) {
                    spotlight.x += mouseDx * 0.01;
                    spotlight.y += mouseDy * 0.01;
                }

                drawSpotlight(spotlight);
            });

            // Update and draw orbs
            orbsRef.current.forEach(orb => {
                orb.x += orb.vx;
                orb.y += orb.vy;

                // Bounce off edges
                if (orb.x < 0 || orb.x > canvas.width) orb.vx *= -1;
                if (orb.y < 0 || orb.y > canvas.height) orb.vy *= -1;

                drawOrb(orb, time);
            });

            // Update and draw shapes
            shapesRef.current.forEach(shape => {
                shape.x += shape.speedX;
                shape.y += shape.speedY;
                shape.rotation += shape.rotationSpeed;

                // Wrap around
                if (shape.x < -shape.size) shape.x = canvas.width + shape.size;
                if (shape.x > canvas.width + shape.size) shape.x = -shape.size;
                if (shape.y < -shape.size) shape.y = canvas.height + shape.size;
                if (shape.y > canvas.height + shape.size) shape.y = -shape.size;

                // Mouse proximity effect
                const dx = mouseRef.current.x - shape.x;
                const dy = mouseRef.current.y - shape.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 200) {
                    shape.opacity = 0.3 + (1 - dist / 200) * 0.3;
                } else {
                    shape.opacity = Math.max(0.1, shape.opacity - 0.01);
                }

                drawShape(shape);
            });

            // Mouse glow
            const mouseGlow = ctx.createRadialGradient(
                mouseRef.current.x, mouseRef.current.y, 0,
                mouseRef.current.x, mouseRef.current.y, 200
            );
            mouseGlow.addColorStop(0, "rgba(255, 215, 0, 0.1)");
            mouseGlow.addColorStop(0.5, "rgba(255, 180, 0, 0.03)");
            mouseGlow.addColorStop(1, "transparent");
            ctx.fillStyle = mouseGlow;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            animationRef.current = requestAnimationFrame(animate);
        };

        resize();
        window.addEventListener("resize", resize);
        window.addEventListener("mousemove", handleMouseMove);
        animate();

        return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationRef.current);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full"
            style={{ background: "#050508" }}
        />
    );
}
