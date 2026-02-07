"use client";

import { useEffect, useRef } from "react";

interface DataStream {
    x: number;
    y: number;
    speed: number;
    chars: string[];
    opacity: number;
    length: number;
}

interface PulseRing {
    x: number;
    y: number;
    radius: number;
    maxRadius: number;
    opacity: number;
    color: string;
}

interface FloatingNode {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    color: string;
    connections: number[];
    pulse: number;
    pulseSpeed: number;
}

export function InteractiveSessionBg() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: 0, y: 0 });
    const nodesRef = useRef<FloatingNode[]>([]);
    const streamsRef = useRef<DataStream[]>([]);
    const pulsesRef = useRef<PulseRing[]>([]);
    const animationRef = useRef<number>(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const colors = ["#00ffff", "#00ff88", "#ff00ff", "#ffaa00", "#8855ff"];
        const codeChars = "01アイウエオカキクケコサシスセソタチツテト{}[]<>/\\=+-*&%$#@!";

        // Initialize nodes
        const initNodes = () => {
            nodesRef.current = [];
            const nodeCount = Math.floor((canvas.width * canvas.height) / 25000);

            for (let i = 0; i < nodeCount; i++) {
                nodesRef.current.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    size: 3 + Math.random() * 4,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    connections: [],
                    pulse: Math.random() * Math.PI * 2,
                    pulseSpeed: 0.02 + Math.random() * 0.03
                });
            }
        };

        // Initialize data streams (matrix-like effect)
        const initStreams = () => {
            streamsRef.current = [];
            const streamCount = Math.floor(canvas.width / 40);

            for (let i = 0; i < streamCount; i++) {
                const length = 10 + Math.floor(Math.random() * 20);
                const chars: string[] = [];
                for (let j = 0; j < length; j++) {
                    chars.push(codeChars[Math.floor(Math.random() * codeChars.length)]);
                }

                streamsRef.current.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height - canvas.height,
                    speed: 1 + Math.random() * 3,
                    chars,
                    opacity: 0.1 + Math.random() * 0.3,
                    length
                });
            }
        };

        // Resize handler
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initNodes();
            initStreams();
        };

        // Mouse handler
        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };

        const handleClick = (e: MouseEvent) => {
            // Add pulse ring on click
            pulsesRef.current.push({
                x: e.clientX,
                y: e.clientY,
                radius: 10,
                maxRadius: 200,
                opacity: 0.8,
                color: colors[Math.floor(Math.random() * colors.length)]
            });
        };

        // Draw data stream
        const drawStream = (stream: DataStream) => {
            const charHeight = 18;

            stream.chars.forEach((char, i) => {
                const y = stream.y + i * charHeight;
                if (y < 0 || y > canvas.height) return;

                const fadeProgress = i / stream.length;
                const opacity = stream.opacity * (1 - fadeProgress * 0.8);

                ctx.font = "14px monospace";
                ctx.fillStyle = i === 0
                    ? `rgba(255, 255, 255, ${opacity})`
                    : `rgba(0, 255, 150, ${opacity})`;
                ctx.fillText(char, stream.x, y);
            });
        };

        // Draw node with glow
        const drawNode = (node: FloatingNode, time: number) => {
            const pulseScale = 1 + Math.sin(time * node.pulseSpeed + node.pulse) * 0.3;
            const size = node.size * pulseScale;

            // Outer glow
            const gradient = ctx.createRadialGradient(
                node.x, node.y, 0,
                node.x, node.y, size * 4
            );
            gradient.addColorStop(0, node.color + "60");
            gradient.addColorStop(0.5, node.color + "20");
            gradient.addColorStop(1, "transparent");

            ctx.beginPath();
            ctx.arc(node.x, node.y, size * 4, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();

            // Core
            ctx.beginPath();
            ctx.arc(node.x, node.y, size, 0, Math.PI * 2);
            ctx.fillStyle = node.color;
            ctx.fill();

            // Inner bright core
            ctx.beginPath();
            ctx.arc(node.x, node.y, size * 0.5, 0, Math.PI * 2);
            ctx.fillStyle = "#ffffff";
            ctx.fill();
        };

        // Draw connections between nodes
        const drawConnections = () => {
            const maxDistance = 180;

            for (let i = 0; i < nodesRef.current.length; i++) {
                const nodeA = nodesRef.current[i];

                // Check mouse proximity for extra connections
                const mouseDist = Math.sqrt(
                    Math.pow(nodeA.x - mouseRef.current.x, 2) +
                    Math.pow(nodeA.y - mouseRef.current.y, 2)
                );

                if (mouseDist < 200) {
                    const opacity = (1 - mouseDist / 200) * 0.5;
                    ctx.beginPath();
                    ctx.moveTo(nodeA.x, nodeA.y);
                    ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
                    ctx.strokeStyle = `rgba(0, 255, 255, ${opacity})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }

                for (let j = i + 1; j < nodesRef.current.length; j++) {
                    const nodeB = nodesRef.current[j];
                    const dx = nodeA.x - nodeB.x;
                    const dy = nodeA.y - nodeB.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < maxDistance) {
                        const opacity = (1 - distance / maxDistance) * 0.4;

                        // Gradient line
                        const gradient = ctx.createLinearGradient(
                            nodeA.x, nodeA.y, nodeB.x, nodeB.y
                        );
                        gradient.addColorStop(0, nodeA.color + Math.floor(opacity * 255).toString(16).padStart(2, '0'));
                        gradient.addColorStop(1, nodeB.color + Math.floor(opacity * 255).toString(16).padStart(2, '0'));

                        ctx.beginPath();
                        ctx.moveTo(nodeA.x, nodeA.y);
                        ctx.lineTo(nodeB.x, nodeB.y);
                        ctx.strokeStyle = gradient;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }
            }
        };

        // Draw pulse ring
        const drawPulse = (pulse: PulseRing) => {
            ctx.beginPath();
            ctx.arc(pulse.x, pulse.y, pulse.radius, 0, Math.PI * 2);
            ctx.strokeStyle = pulse.color + Math.floor(pulse.opacity * 255).toString(16).padStart(2, '0');
            ctx.lineWidth = 3;
            ctx.stroke();

            // Inner ring
            ctx.beginPath();
            ctx.arc(pulse.x, pulse.y, pulse.radius * 0.7, 0, Math.PI * 2);
            ctx.strokeStyle = pulse.color + Math.floor(pulse.opacity * 0.5 * 255).toString(16).padStart(2, '0');
            ctx.lineWidth = 1;
            ctx.stroke();
        };

        // Draw hexagonal pattern
        const drawHexPattern = (time: number) => {
            const hexSize = 50;
            const rows = Math.ceil(canvas.height / (hexSize * 1.5)) + 1;
            const cols = Math.ceil(canvas.width / (hexSize * Math.sqrt(3))) + 1;

            ctx.strokeStyle = "rgba(0, 200, 255, 0.03)";
            ctx.lineWidth = 1;

            for (let row = 0; row < rows; row++) {
                for (let col = 0; col < cols; col++) {
                    const x = col * hexSize * Math.sqrt(3) + (row % 2) * hexSize * Math.sqrt(3) / 2;
                    const y = row * hexSize * 1.5;

                    // Animate some hexagons
                    const pulseIntensity = Math.sin(time * 0.02 + row * 0.3 + col * 0.2) * 0.5 + 0.5;

                    if (pulseIntensity > 0.7) {
                        ctx.strokeStyle = `rgba(0, 255, 255, ${0.05 + pulseIntensity * 0.05})`;
                    } else {
                        ctx.strokeStyle = "rgba(0, 200, 255, 0.02)";
                    }

                    ctx.beginPath();
                    for (let i = 0; i < 6; i++) {
                        const angle = (Math.PI / 3) * i - Math.PI / 6;
                        const px = x + hexSize * 0.8 * Math.cos(angle);
                        const py = y + hexSize * 0.8 * Math.sin(angle);
                        if (i === 0) ctx.moveTo(px, py);
                        else ctx.lineTo(px, py);
                    }
                    ctx.closePath();
                    ctx.stroke();
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
            bgGradient.addColorStop(0, "#0a0a1a");
            bgGradient.addColorStop(0.5, "#050510");
            bgGradient.addColorStop(1, "#000005");
            ctx.fillStyle = bgGradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw hex pattern
            drawHexPattern(time);

            // Update and draw streams
            streamsRef.current.forEach(stream => {
                stream.y += stream.speed;

                // Reset when off screen
                if (stream.y > canvas.height + stream.length * 18) {
                    stream.y = -stream.length * 18;
                    stream.x = Math.random() * canvas.width;

                    // Randomize characters
                    for (let i = 0; i < stream.chars.length; i++) {
                        stream.chars[i] = codeChars[Math.floor(Math.random() * codeChars.length)];
                    }
                }

                // Occasionally change a character
                if (Math.random() < 0.02) {
                    const idx = Math.floor(Math.random() * stream.chars.length);
                    stream.chars[idx] = codeChars[Math.floor(Math.random() * codeChars.length)];
                }

                drawStream(stream);
            });

            // Draw connections
            drawConnections();

            // Update and draw nodes
            nodesRef.current.forEach(node => {
                // Mouse attraction
                const dx = mouseRef.current.x - node.x;
                const dy = mouseRef.current.y - node.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 300 && dist > 0) {
                    const force = (300 - dist) / 300 * 0.02;
                    node.vx += (dx / dist) * force;
                    node.vy += (dy / dist) * force;
                }

                // Apply velocity with damping
                node.x += node.vx;
                node.y += node.vy;
                node.vx *= 0.98;
                node.vy *= 0.98;

                // Bounce off edges
                if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
                if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

                node.x = Math.max(0, Math.min(canvas.width, node.x));
                node.y = Math.max(0, Math.min(canvas.height, node.y));

                drawNode(node, time);
            });

            // Update and draw pulses
            pulsesRef.current = pulsesRef.current.filter(pulse => {
                pulse.radius += 4;
                pulse.opacity = 1 - (pulse.radius / pulse.maxRadius);

                if (pulse.radius >= pulse.maxRadius) return false;

                drawPulse(pulse);
                return true;
            });

            // Mouse glow effect
            const mouseGlow = ctx.createRadialGradient(
                mouseRef.current.x, mouseRef.current.y, 0,
                mouseRef.current.x, mouseRef.current.y, 150
            );
            mouseGlow.addColorStop(0, "rgba(0, 255, 255, 0.15)");
            mouseGlow.addColorStop(0.5, "rgba(0, 200, 255, 0.05)");
            mouseGlow.addColorStop(1, "transparent");
            ctx.fillStyle = mouseGlow;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            animationRef.current = requestAnimationFrame(animate);
        };

        resize();
        window.addEventListener("resize", resize);
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("click", handleClick);
        animate();

        return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("click", handleClick);
            cancelAnimationFrame(animationRef.current);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full"
            style={{ background: "#000005" }}
        />
    );
}
