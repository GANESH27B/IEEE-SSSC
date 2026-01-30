"use client";

import { useEffect, useRef } from "react";

export function EarthCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        // Resize handler using local variables to prevent scope issues
        const handleResize = () => {
            if (canvas.parentElement) {
                width = canvas.width = canvas.parentElement.clientWidth;
                height = canvas.height = canvas.parentElement.clientHeight;
            }
        };

        // Initial sizing
        handleResize();

        // 3D Config
        const globeRadius = 220;
        const perspective = 800;
        let rotation = 0;

        // Generate Wireframe Data
        const points: { x: number; y: number; z: number }[] = [];
        const lines: { start: number; end: number }[] = [];

        const addPoint = (lat: number, lon: number) => {
            const phi = (90 - lat) * (Math.PI / 180);
            const theta = (lon + 180) * (Math.PI / 180);
            const x = -(globeRadius * Math.sin(phi) * Math.cos(theta));
            const z = globeRadius * Math.sin(phi) * Math.sin(theta);
            const y = globeRadius * Math.cos(phi);
            return { x, y, z };
        };

        // Latitudes
        for (let lat = -75; lat <= 75; lat += 15) {
            const startIndex = points.length;
            for (let lon = 0; lon < 360; lon += 10) {
                points.push(addPoint(lat, lon));
                if (lon > 0) lines.push({ start: startIndex + lon / 10 - 1, end: startIndex + lon / 10 });
            }
            lines.push({ start: points.length - 1, end: startIndex });
        }

        // Longitudes
        for (let lon = 0; lon < 360; lon += 30) {
            const startIndex = points.length;
            for (let lat = -90; lat <= 90; lat += 10) {
                points.push(addPoint(lat, lon));
                if (lat > -90) lines.push({ start: points.length - 2, end: points.length - 1 });
            }
        }

        const animate = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, width, height);

            rotation += 0.002;
            const cx = width / 2;
            const cy = height / 2;

            ctx.lineWidth = 1.5;

            ctx.beginPath();
            for (let i = 0; i < lines.length; i++) {
                const p1 = points[lines[i].start];
                const p2 = points[lines[i].end];

                // Rotate around Y axis
                const x1 = p1.x * Math.cos(rotation) - p1.z * Math.sin(rotation);
                const z1 = p1.x * Math.sin(rotation) + p1.z * Math.cos(rotation);

                const x2 = p2.x * Math.cos(rotation) - p2.z * Math.sin(rotation);
                const z2 = p2.x * Math.sin(rotation) + p2.z * Math.cos(rotation);

                // Culling (only draw front facing)
                if (z1 < -50 && z2 < -50) continue;

                // Projection
                const scale1 = perspective / (perspective + z1 + globeRadius);
                const scale2 = perspective / (perspective + z2 + globeRadius);

                const sx1 = cx + x1 * scale1;
                const sy1 = cy + p1.y * scale1;
                const sx2 = cx + x2 * scale2;
                const sy2 = cy + p2.y * scale2;

                // Opacity based on depth
                const depth = (z1 + z2) / 2;
                const alpha = Math.max(0.05, (depth + globeRadius) / (2 * globeRadius) * 0.6);

                // We draw lines individually for alpha (performance tradeoff accepted for small complexity)
                ctx.strokeStyle = `rgba(6, 182, 212, ${alpha})`;
                ctx.beginPath();
                ctx.moveTo(sx1, sy1);
                ctx.lineTo(sx2, sy2);
                ctx.stroke();
            }

            requestAnimationFrame(animate);
        };

        animate();

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full -z-10"
        />
    );
}
