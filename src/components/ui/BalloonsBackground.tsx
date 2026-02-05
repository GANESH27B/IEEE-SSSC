"use client";

import { useEffect, useRef } from "react";

interface Balloon {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    color: string;
    opacity: number;
}

export function BalloonsBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        const mouse = {
            x: -1000,
            y: -1000,
            radius: 300
        };

        const balloons: Balloon[] = [];
        const balloonCount = 50;
        const colors = [
            "rgba(6, 182, 212, 0.8)", // Cyan
            "rgba(59, 130, 246, 0.8)", // Blue
            "rgba(139, 92, 246, 0.8)", // Purple
            "rgba(250, 204, 21, 0.8)"  // Yellow
        ];

        for (let i = 0; i < balloonCount; i++) {
            balloons.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 1,
                vy: (Math.random() - 0.5) * 1,
                size: Math.random() * 200 + 200,
                color: colors[Math.floor(Math.random() * colors.length)],
                opacity: Math.random() * 0.2 + 0.7
            });
        }

        const animate = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, width, height);

            balloons.forEach((b) => {
                // Movement
                b.x += b.vx;
                b.y += b.vy;

                // Bounce
                if (b.x < -b.size) b.x = width + b.size;
                if (b.x > width + b.size) b.x = -b.size;
                if (b.y < -b.size) b.y = height + b.size;
                if (b.y > height + b.size) b.y = -b.size;

                // Mouse Interaction
                const dx = mouse.x - b.x;
                const dy = mouse.y - b.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < mouse.radius) {
                    const force = (mouse.radius - distance) / mouse.radius;
                    const directionX = (dx / distance) * force * 10;
                    const directionY = (dy / distance) * force * 10;

                    // Push away from mouse
                    b.x -= directionX;
                    b.y -= directionY;
                }

                // Draw Balloon (Blurred Circle)
                ctx.beginPath();
                const gradient = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.size);
                gradient.addColorStop(0, b.color);
                gradient.addColorStop(1, "rgba(0,0,0,0)");

                ctx.fillStyle = gradient;
                ctx.arc(b.x, b.y, b.size, 0, Math.PI * 2);
                ctx.fill();

                // Add a small "highlight" for a glass/balloon look
                ctx.beginPath();
                ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
                ctx.arc(b.x - b.size * 0.3, b.y - b.size * 0.3, b.size * 0.1, 0, Math.PI * 2);
                ctx.fill();
            });

            requestAnimationFrame(animate);
        };

        animate();

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        window.addEventListener("resize", handleResize);
        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 pointer-events-none"
        />
    );
}
