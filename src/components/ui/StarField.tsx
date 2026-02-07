"use client";

import { useEffect, useRef } from "react";

interface Star {
    x: number;
    y: number;
    size: number;
    speed: number;
    opacity: number;
    twinkleSpeed: number;
    twinklePhase: number;
}

export function StarField() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const starsRef = useRef<Star[]>([]);
    const animationRef = useRef<number>(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Set canvas size
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initStars();
        };

        // Initialize stars
        const initStars = () => {
            const starCount = Math.floor((canvas.width * canvas.height) / 3000);
            starsRef.current = [];

            for (let i = 0; i < starCount; i++) {
                starsRef.current.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 2 + 0.5,
                    speed: Math.random() * 0.5 + 0.1,
                    opacity: Math.random() * 0.5 + 0.5,
                    twinkleSpeed: Math.random() * 0.02 + 0.01,
                    twinklePhase: Math.random() * Math.PI * 2,
                });
            }

            // Add some special bright stars
            for (let i = 0; i < 20; i++) {
                starsRef.current.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 3 + 2,
                    speed: Math.random() * 0.3 + 0.05,
                    opacity: 1,
                    twinkleSpeed: Math.random() * 0.03 + 0.02,
                    twinklePhase: Math.random() * Math.PI * 2,
                });
            }
        };

        // Draw stars with glow effect
        const drawStar = (star: Star, time: number) => {
            const twinkle = Math.sin(time * star.twinkleSpeed + star.twinklePhase) * 0.3 + 0.7;
            const currentOpacity = star.opacity * twinkle;

            // Outer glow
            const gradient = ctx.createRadialGradient(
                star.x, star.y, 0,
                star.x, star.y, star.size * 3
            );
            gradient.addColorStop(0, `rgba(255, 255, 255, ${currentOpacity})`);
            gradient.addColorStop(0.3, `rgba(180, 220, 255, ${currentOpacity * 0.4})`);
            gradient.addColorStop(1, "transparent");

            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();

            // Core
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`;
            ctx.fill();
        };

        // Animation loop
        let time = 0;
        const animate = () => {
            time += 1;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw deep space gradient background
            const bgGradient = ctx.createRadialGradient(
                canvas.width / 2, canvas.height / 2, 0,
                canvas.width / 2, canvas.height / 2, canvas.width
            );
            bgGradient.addColorStop(0, "rgba(5, 10, 30, 1)");
            bgGradient.addColorStop(0.5, "rgba(0, 5, 20, 1)");
            bgGradient.addColorStop(1, "rgba(0, 0, 5, 1)");
            ctx.fillStyle = bgGradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Add subtle nebula effects
            const nebula1X = canvas.width * 0.3 + Math.sin(time * 0.001) * 50;
            const nebula1Y = canvas.height * 0.4 + Math.cos(time * 0.001) * 30;
            const nebulaGradient1 = ctx.createRadialGradient(
                nebula1X, nebula1Y, 0,
                nebula1X, nebula1Y, 400
            );
            nebulaGradient1.addColorStop(0, "rgba(0, 100, 150, 0.08)");
            nebulaGradient1.addColorStop(0.5, "rgba(50, 0, 100, 0.04)");
            nebulaGradient1.addColorStop(1, "transparent");
            ctx.fillStyle = nebulaGradient1;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const nebula2X = canvas.width * 0.7 + Math.cos(time * 0.0015) * 40;
            const nebula2Y = canvas.height * 0.6 + Math.sin(time * 0.0015) * 25;
            const nebulaGradient2 = ctx.createRadialGradient(
                nebula2X, nebula2Y, 0,
                nebula2X, nebula2Y, 350
            );
            nebulaGradient2.addColorStop(0, "rgba(100, 0, 80, 0.06)");
            nebulaGradient2.addColorStop(0.5, "rgba(0, 50, 100, 0.03)");
            nebulaGradient2.addColorStop(1, "transparent");
            ctx.fillStyle = nebulaGradient2;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Update and draw stars
            starsRef.current.forEach((star) => {
                // Move stars slowly (parallax effect)
                star.y += star.speed;
                star.x += star.speed * 0.2;

                // Wrap around screen
                if (star.y > canvas.height + star.size * 3) {
                    star.y = -star.size * 3;
                    star.x = Math.random() * canvas.width;
                }
                if (star.x > canvas.width + star.size * 3) {
                    star.x = -star.size * 3;
                }

                drawStar(star, time);
            });

            // Add occasional shooting stars
            if (Math.random() < 0.002) {
                drawShootingStar(ctx, canvas.width, canvas.height);
            }

            animationRef.current = requestAnimationFrame(animate);
        };

        // Draw shooting star
        const drawShootingStar = (
            context: CanvasRenderingContext2D,
            width: number,
            height: number
        ) => {
            const startX = Math.random() * width;
            const startY = Math.random() * height * 0.5;
            const length = Math.random() * 100 + 50;
            const angle = Math.PI / 4 + Math.random() * 0.2;

            const endX = startX + Math.cos(angle) * length;
            const endY = startY + Math.sin(angle) * length;

            const gradient = context.createLinearGradient(startX, startY, endX, endY);
            gradient.addColorStop(0, "rgba(255, 255, 255, 0)");
            gradient.addColorStop(0.5, "rgba(255, 255, 255, 0.8)");
            gradient.addColorStop(1, "rgba(180, 220, 255, 0)");

            context.beginPath();
            context.moveTo(startX, startY);
            context.lineTo(endX, endY);
            context.strokeStyle = gradient;
            context.lineWidth = 2;
            context.stroke();
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
            style={{ background: "linear-gradient(to bottom, #000510, #020815, #000)" }}
        />
    );
}
