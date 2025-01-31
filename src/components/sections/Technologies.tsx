'use client';

import React, { useRef, useEffect, ReactElement, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { gsap } from '@/lib/gsap';
import Link from 'next/link';

interface TechItem {
    name: string;
    icon: string;
    description: string;
}

interface TechCategory {
    category: string;
    items: TechItem[];
}

const technologies: TechCategory[] = [
    {
        category: 'AI/ML Technologies',
        items: [
            { name: 'AWS Bedrock', icon: '⚡', description: 'Foundation Models & AI Services' },
            { name: 'TensorFlow', icon: '🧠', description: 'Machine Learning Framework' },
            { name: 'PyTorch', icon: '🔥', description: 'Deep Learning Platform' },
            { name: 'LLMs', icon: '🤖', description: 'Large Language Models' },
        ]
    },
    {
        category: 'Frontend Development',
        items: [
            { name: 'React', icon: '⚛️', description: 'UI Development' },
            { name: 'Next.js', icon: '▲', description: 'React Framework' },
            { name: 'TypeScript', icon: '📘', description: 'Type-Safe JavaScript' },
            { name: 'Tailwind CSS', icon: '🎨', description: 'Utility-First CSS' },
        ]
    },
    {
        category: 'Backend Development',
        items: [
            { name: 'Go', icon: '🔹', description: 'High-Performance Backend' },
            { name: 'C#', icon: '#', description: '.NET Development' },
            { name: 'C++', icon: '++', description: 'Systems Programming' },
            { name: 'Node.js', icon: '📦', description: 'JavaScript Runtime' },
        ]
    },
    {
        category: 'Cloud & DevOps',
        items: [
            { name: 'AWS', icon: '☁️', description: 'Cloud Infrastructure' },
            { name: 'Docker', icon: '🐳', description: 'Containerization' },
            { name: 'Kubernetes', icon: '⚓', description: 'Container Orchestration' },
            { name: 'CI/CD', icon: '🔄', description: 'Continuous Integration/Deployment' },
        ]
    },
];

interface CardProps {
    children: React.ReactNode;
    className?: string;
}

function Card({ children, className = '' }: CardProps): ReactElement {
    return (
        <div className={`overflow-hidden rounded-lg border border-primary/20 ${className}`}>
            <div className="p-6">
                {children}
            </div>
        </div>
    );
}

interface TooltipProps {
    content: string;
    children: React.ReactNode;
}

function Tooltip({ content, children }: TooltipProps): ReactElement {
    const [isVisible, setIsVisible] = useState(false);
    const tooltipRef = useRef<HTMLDivElement>(null);

    return (
        <div
            className="relative"
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
        >
            {children}
            {isVisible && (
                <div
                    ref={tooltipRef}
                    className="absolute z-50 -top-12 left-1/2 transform -translate-x-1/2 px-3 py-2 rounded bg-popover text-popover-foreground text-sm shadow-lg animate-fade-in"
                >
                    {content}
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 rotate-45 bg-popover" />
                </div>
            )}
        </div>
    );
}

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
        },
    },
};

export function Technologies(): ReactElement {
    const techRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const cards = techRef.current?.querySelectorAll('.tech-card');

            cards?.forEach((card, index) => {
                gsap.fromTo(card,
                    {
                        opacity: 0,
                        y: 50,
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: card,
                            start: "top bottom-=100",
                            toggleActions: "play none none reverse",
                        },
                        delay: index * 0.1,
                    }
                );
            });
        }, techRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="relative py-24" ref={techRef}>
            <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background" />

            <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        Technology Stack
                    </h2>
                    <p className="mt-6 text-lg leading-8 text-muted-foreground">
                        Our expertise spans across cutting-edge technologies, enabling us to deliver
                        sophisticated solutions for complex challenges.
                    </p>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid gap-8 md:grid-cols-2"
                >
                    {technologies.map((category) => (
                        <motion.div
                            key={category.category}
                            variants={itemVariants}
                            className="tech-card space-y-4"
                        >
                            <Card>
                                <h3 className="text-lg font-semibold text-primary mb-4">
                                    {category.category}
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {category.items.map((tech) => (
                                        <Tooltip key={tech.name} content={tech.description}>
                                            <div className="group flex items-center space-x-3 rounded-lg border border-border p-3 transition-colors hover:bg-primary/10 hover:border-primary cursor-pointer">
                                                <span className="text-2xl">{tech.icon}</span>
                                                <span className="text-sm font-medium text-foreground">
                          {tech.name}
                        </span>
                                            </div>
                                        </Tooltip>
                                    ))}
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>

                <div className="mt-16 text-center">
                    <p className="text-muted-foreground">
                        Need a specific technology for your project?{' '}
                        <Link
                            href="/contact"
                            className="text-primary hover:text-primary/80 font-medium transition-colors"
                        >
                            Let&#39;s discuss your requirements
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    );
}
