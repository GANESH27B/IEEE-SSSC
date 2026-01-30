"use client";

import { useEffect, useRef } from "react";

export function GlobeBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = 0;
        let height = 0;

        const updateDimensions = () => {
            if (canvas.parentElement) {
                width = canvas.width = canvas.parentElement.clientWidth;
                height = canvas.height = canvas.parentElement.clientHeight;
            } else {
                width = canvas.width = window.innerWidth;
                height = canvas.height = window.innerHeight;
            }
        };
        updateDimensions();

        // Globe Config
        const globeRadius = 300;
        const globeCenterZ = -globeRadius;
        const perspective = 800;
        const dotCount = 800;
        const rotationSpeed = 0.002;
        let rotationAngle = 0;

        class Dot {
            x: number;
            y: number;
            z: number;
            theta: number; // Horizontal angle
            phi: number;   // Vertical angle

            constructor() {
                this.theta = Math.random() * 2 * Math.PI;
                this.phi = Math.acos((Math.random() * 2) - 1);
                this.x = 0;
                this.y = 0;
                this.z = 0;
                this.updatePosition();
            }

            updatePosition() {
                this.x = globeRadius * Math.sin(this.phi) * Math.cos(this.theta);
                this.y = globeRadius * Math.sin(this.phi) * Math.sin(this.theta);
                this.z = globeRadius * Math.cos(this.phi);
            }

            draw(angle: number) {
                if (!ctx) return;

                // Rotate around Y axis
                const rotatedX = this.x * Math.cos(angle) - this.z * Math.sin(angle);
                const rotatedZ = this.x * Math.sin(angle) + this.z * Math.cos(angle);

                // Perspective projection
                const scale = perspective / (perspective + rotatedZ + globeRadius + 200);
                const screenX = width / 2 + rotatedX * scale;
                const screenY = height / 2 + this.y * scale;

                // Adjust opacity based on depth (z) to simulate fog/depth
                const alpha = Math.max(0.1, (scale - 0.5) * 1.5);
                const size = Math.max(0.5, scale * 2);

                ctx.fillStyle = `rgba(6, 182, 212, ${alpha})`; // Cyan
                ctx.beginPath();
                ctx.arc(screenX, screenY, size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const dots: Dot[] = [];
        for (let i = 0; i < dotCount; i++) {
            dots.push(new Dot());
        }

        const animate = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, width, height);

            rotationAngle += rotationSpeed;

            dots.forEach(dot => {
                dot.draw(rotationAngle);
            });

            // Draw some connecting lines for "tech" feel (optional, simplified for performance)

            requestAnimationFrame(animate);
        };

        animate();

        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none"
            style={{ background: "#020617" }}
        />
    );
}
