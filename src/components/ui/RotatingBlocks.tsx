"use client";

import { motion } from "framer-motion";

export function RotatingBlocks() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-90">
            <div className="relative w-full h-full perspective-2000">
                {/* Large 3D Cube 1 */}
                <Cube
                    size="w-96 h-96"
                    color="border-cyan-500/30"
                    position="top-[5%] -left-20"
                    duration={45}
                />

                {/* Medium 3D Cube 2 */}
                <Cube
                    size="w-64 h-64"
                    color="border-emerald-500/20"
                    position="bottom-[15%] -right-10"
                    duration={38}
                    reverse
                />

                {/* Small 3D Cube 3 */}
                <Cube
                    size="w-40 h-40"
                    color="border-blue-500/20"
                    position="top-[50%] left-[15%]"
                    duration={30}
                />

                {/* Additional Blocks */}
                <Cube
                    size="w-56 h-56"
                    color="border-purple-500/20"
                    position="top-[20%] right-[10%]"
                    duration={50}
                    reverse
                />

                <Cube
                    size="w-32 h-32"
                    color="border-cyan-400/20"
                    position="bottom-[40%] left-[40%]"
                    duration={20}
                />

                <Cube
                    size="w-48 h-48"
                    color="border-emerald-400/10"
                    position="top-[70%] right-[30%]"
                    duration={60}
                />

                <Cube
                    size="w-72 h-72"
                    color="border-blue-400/10"
                    position="bottom-[5%] left-[60%]"
                    duration={40}
                    reverse
                />

                {/* Digital Rain / Shards */}
                {[...Array(12)].map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{
                            y: [-200, 1000],
                            opacity: [0, 0.6, 0]
                        }}
                        transition={{
                            duration: 15 + i * 2,
                            repeat: Infinity,
                            delay: i * 2,
                            ease: "linear"
                        }}
                        className="absolute w-[2px] h-60 bg-gradient-to-b from-transparent via-cyan-400/80 to-transparent"
                        style={{ left: `${i * 8}%` }}
                    />
                ))}
            </div>
        </div>
    );
}

function Cube({ size, color, position, duration, reverse = false }: any) {
    const halfSize = parseInt(size.split(' ')[0].replace('w-', '')) * 2; // Approximate half for translateZ

    return (
        <div className={`absolute ${position} ${size} transition-transform`}>
            <motion.div
                animate={{
                    rotateX: reverse ? [360, 0] : [0, 360],
                    rotateY: reverse ? [0, 360] : [360, 0],
                }}
                transition={{
                    duration: duration,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="relative w-full h-full"
                style={{ transformStyle: "preserve-3d" }}
            >
                {/* 6 Faces of the Cube */}
                <div className={`absolute inset-0 border ${color} bg-cyan-500/5 backdrop-blur-[1px]`} style={{ transform: `translateZ(${halfSize / 4}px)` }} />
                <div className={`absolute inset-0 border ${color} bg-cyan-500/5 backdrop-blur-[1px]`} style={{ transform: `translateZ(-${halfSize / 4}px) rotateY(180deg)` }} />
                <div className={`absolute inset-0 border ${color} bg-cyan-500/5 backdrop-blur-[1px]`} style={{ transform: `translateX(${halfSize / 4}px) rotateY(90deg)` }} />
                <div className={`absolute inset-0 border ${color} bg-cyan-500/5 backdrop-blur-[1px]`} style={{ transform: `translateX(-${halfSize / 4}px) rotateY(-90deg)` }} />
                <div className={`absolute inset-0 border ${color} bg-cyan-500/5 backdrop-blur-[1px]`} style={{ transform: `translateY(${halfSize / 4}px) rotateX(-90deg)` }} />
                <div className={`absolute inset-0 border ${color} bg-cyan-500/5 backdrop-blur-[1px]`} style={{ transform: `translateY(-${halfSize / 4}px) rotateX(90deg)` }} />
            </motion.div>
        </div>
    );
}
