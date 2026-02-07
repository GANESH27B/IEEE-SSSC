"use client";

import { useEffect, useRef } from "react";

interface Particle {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    opacity: number;
    color: string;
    pulse: number;
    pulseSpeed: number;
}

interface CircuitLine {
    startX: number;
    startY: number;
    segments: { x: number; y: number }[];
    progress: number;
    speed: number;
    color: string;
    glowIntensity: number;
}

export function TechBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const circuitLinesRef = useRef<CircuitLine[]>([]);
    const animationRef = useRef<number>(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const colors = ["#00d4ff", "#00ff88", "#ff00ff", "#ffaa00", "#00ffff"];

        // Initialize particles
        const initParticles = () => {
            particlesRef.current = [];
            const count = Math.floor((canvas.width * canvas.height) / 8000);

            for (let i = 0; i < count; i++) {
                particlesRef.current.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 3 + 1,
                    speedX: (Math.random() - 0.5) * 0.8,
                    speedY: (Math.random() - 0.5) * 0.8,
                    opacity: Math.random() * 0.5 + 0.3,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    pulse: 0,
                    pulseSpeed: Math.random() * 0.05 + 0.02
                });
            }
        };

        // Create a circuit line
        const createCircuitLine = (): CircuitLine => {
            const startEdge = Math.floor(Math.random() * 4);
            let startX: number, startY: number;

            switch (startEdge) {
                case 0: // Top
                    startX = Math.random() * canvas.width;
                    startY = 0;
                    break;
                case 1: // Right
                    startX = canvas.width;
                    startY = Math.random() * canvas.height;
                    break;
                case 2: // Bottom
                    startX = Math.random() * canvas.width;
                    startY = canvas.height;
                    break;
                default: // Left
                    startX = 0;
                    startY = Math.random() * canvas.height;
            }

            const segments: { x: number; y: number }[] = [{ x: startX, y: startY }];
            let currentX = startX;
            let currentY = startY;

            const segmentCount = 5 + Math.floor(Math.random() * 8);
            for (let i = 0; i < segmentCount; i++) {
                const horizontal = Math.random() > 0.5;
                const distance = 50 + Math.random() * 150;

                if (horizontal) {
                    currentX += (Math.random() > 0.5 ? 1 : -1) * distance;
                } else {
                    currentY += (Math.random() > 0.5 ? 1 : -1) * distance;
                }

                currentX = Math.max(0, Math.min(canvas.width, currentX));
                currentY = Math.max(0, Math.min(canvas.height, currentY));

                segments.push({ x: currentX, y: currentY });
            }

            return {
                startX,
                startY,
                segments,
                progress: 0,
                speed: 0.005 + Math.random() * 0.01,
                color: colors[Math.floor(Math.random() * colors.length)],
                glowIntensity: 0.5 + Math.random() * 0.5
            };
        };

        // Initialize circuit lines
        const initCircuitLines = () => {
            circuitLinesRef.current = [];
            for (let i = 0; i < 8; i++) {
                circuitLinesRef.current.push(createCircuitLine());
            }
        };

        // Resize handler
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
            initCircuitLines();
        };

        // Draw grid
        const drawGrid = (time: number) => {
            const gridSize = 60;
            const offsetX = (time * 0.2) % gridSize;
            const offsetY = (time * 0.15) % gridSize;

            ctx.strokeStyle = "rgba(0, 212, 255, 0.05)";
            ctx.lineWidth = 1;

            // Vertical lines
            for (let x = -gridSize + offsetX; x < canvas.width + gridSize; x += gridSize) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, canvas.height);
                ctx.stroke();
            }

            // Horizontal lines
            for (let y = -gridSize + offsetY; y < canvas.height + gridSize; y += gridSize) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(canvas.width, y);
                ctx.stroke();
            }
        };

        // Draw circuit line
        const drawCircuitLine = (line: CircuitLine) => {
            if (line.segments.length < 2) return;

            const totalSegments = line.segments.length - 1;
            const currentSegmentIndex = Math.floor(line.progress * totalSegments);
            const segmentProgress = (line.progress * totalSegments) % 1;

            // Draw completed segments
            ctx.beginPath();
            ctx.moveTo(line.segments[0].x, line.segments[0].y);

            for (let i = 1; i <= currentSegmentIndex && i < line.segments.length; i++) {
                ctx.lineTo(line.segments[i].x, line.segments[i].y);
            }

            // Draw current segment progress
            if (currentSegmentIndex < line.segments.length - 1) {
                const from = line.segments[currentSegmentIndex];
                const to = line.segments[currentSegmentIndex + 1];
                const currentX = from.x + (to.x - from.x) * segmentProgress;
                const currentY = from.y + (to.y - from.y) * segmentProgress;
                ctx.lineTo(currentX, currentY);

                // Draw glowing head
                const gradient = ctx.createRadialGradient(currentX, currentY, 0, currentX, currentY, 15);
                gradient.addColorStop(0, line.color);
                gradient.addColorStop(1, "transparent");
                ctx.save();
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(currentX, currentY, 15, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }

            // Draw the line with glow
            ctx.strokeStyle = line.color + "40";
            ctx.lineWidth = 4;
            ctx.stroke();

            ctx.strokeStyle = line.color + "80";
            ctx.lineWidth = 2;
            ctx.stroke();

            ctx.strokeStyle = line.color;
            ctx.lineWidth = 1;
            ctx.stroke();

            // Draw nodes at corners
            for (let i = 0; i <= currentSegmentIndex && i < line.segments.length; i++) {
                const node = line.segments[i];
                ctx.beginPath();
                ctx.arc(node.x, node.y, 3, 0, Math.PI * 2);
                ctx.fillStyle = line.color;
                ctx.fill();
            }
        };

        // Draw particle
        const drawParticle = (particle: Particle, time: number) => {
            const pulse = Math.sin(time * particle.pulseSpeed + particle.pulse) * 0.3 + 0.7;
            const currentOpacity = particle.opacity * pulse;
            const currentSize = particle.size * pulse;

            // Glow
            const gradient = ctx.createRadialGradient(
                particle.x, particle.y, 0,
                particle.x, particle.y, currentSize * 4
            );
            gradient.addColorStop(0, particle.color + Math.floor(currentOpacity * 255).toString(16).padStart(2, '0'));
            gradient.addColorStop(1, "transparent");

            ctx.beginPath();
            ctx.arc(particle.x, particle.y, currentSize * 4, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();

            // Core
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, currentSize, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.fill();
        };

        // Draw connecting lines between nearby particles
        const drawConnections = () => {
            const maxDistance = 120;

            for (let i = 0; i < particlesRef.current.length; i++) {
                for (let j = i + 1; j < particlesRef.current.length; j++) {
                    const p1 = particlesRef.current[i];
                    const p2 = particlesRef.current[j];
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < maxDistance) {
                        const opacity = (1 - distance / maxDistance) * 0.3;
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(0, 212, 255, ${opacity})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }
            }
        };

        // Animation loop
        let time = 0;
        const animate = () => {
            time += 1;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Dark gradient background
            const bgGradient = ctx.createRadialGradient(
                canvas.width / 2, canvas.height / 2, 0,
                canvas.width / 2, canvas.height / 2, canvas.width * 0.8
            );
            bgGradient.addColorStop(0, "#0a1628");
            bgGradient.addColorStop(0.5, "#050d18");
            bgGradient.addColorStop(1, "#020408");
            ctx.fillStyle = bgGradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw moving grid
            drawGrid(time);

            // Draw connections
            drawConnections();

            // Update and draw particles
            particlesRef.current.forEach(particle => {
                particle.x += particle.speedX;
                particle.y += particle.speedY;

                // Wrap around
                if (particle.x < 0) particle.x = canvas.width;
                if (particle.x > canvas.width) particle.x = 0;
                if (particle.y < 0) particle.y = canvas.height;
                if (particle.y > canvas.height) particle.y = 0;

                drawParticle(particle, time);
            });

            // Update and draw circuit lines
            circuitLinesRef.current.forEach((line, index) => {
                line.progress += line.speed;

                if (line.progress >= 1) {
                    circuitLinesRef.current[index] = createCircuitLine();
                } else {
                    drawCircuitLine(line);
                }
            });

            animationRef.current = requestAnimationFrame(animate);
        };

        resize();
        window.addEventListener("resize", resize);
        animate();

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationRef.current);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full"
            style={{ background: "#020408" }}
        />
    );
}
