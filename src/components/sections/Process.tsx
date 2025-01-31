'use client';

import React, { useRef, useEffect, ReactElement } from 'react';
import { motion, Variants } from 'framer-motion';
import { Code2, Database } from 'lucide-react';
import { gsap } from '@/lib/gsap';

interface ProcessDetail {
    title: string;
    description: string;
    icon: React.ElementType;
    details: string[];
}

// Only import and define icons that we actually use
const processes: ProcessDetail[] = [
    {
        title: 'Architecture First',
        description: 'We begin with robust system design, focusing on scalability, maintainability, and performance. Every technical decision is documented and validated.',
        icon: Database,
        details: [
            'System architecture documentation',
            'Performance benchmarking',
            'Scalability planning',
            'Infrastructure as Code',
        ]
    },
    {
        title: 'Modern Development',
        description: 'Utilizing cutting-edge development practices and tools to ensure code quality and maintainability from day one.',
        icon: Code2,
        details: [
            'TypeScript for type safety',
            'ESLint & Prettier integration',
            'Modern framework utilization',
            'Component-driven development',
        ]
    },
];

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

export function Process(): ReactElement {
    const processRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const cards = processRef.current?.querySelectorAll('.process-card');

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
        }, processRef);

        return () => {
            // Clean up GSAP animations
            ctx.revert();
        };
    }, []);

    return (
        <section className="relative py-24" ref={processRef}>
            <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background" />

            <div className="relative mx-auto max-w-7xl px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mx-auto max-w-2xl text-center mb-16"
                >
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        Development Methodology
                    </h2>
                    <p className="mt-6 text-lg text-muted-foreground">
                        Our systematic approach to software development ensures high-quality,
                        maintainable, and secure solutions through modern best practices.
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {processes.map((process) => (
                        <motion.div
                            key={process.title}
                            variants={itemVariants}
                            className="process-card"
                        >
                            <div className="h-full rounded-lg border border-border bg-card p-6 transition-colors hover:border-primary">
                                <div className="inline-block rounded-lg bg-primary/10 p-3 text-primary mb-4">
                                    <process.icon className="h-6 w-6" />
                                </div>
                                <h3 className="text-xl font-semibold text-card-foreground mb-2">
                                    {process.title}
                                </h3>
                                <p className="text-muted-foreground mb-4">
                                    {process.description}
                                </p>
                                <ul className="space-y-2">
                                    {process.details.map((detail) => (
                                        <li
                                            key={detail}
                                            className="text-sm text-muted-foreground flex items-start"
                                        >
                                            <span className="mr-2">•</span>
                                            <span>{detail}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mt-16 rounded-lg border border-border bg-card p-8"
                >
                    <h3 className="text-xl font-semibold text-card-foreground mb-4">
                        Why Our Process Matters
                    </h3>
                    <p className="text-muted-foreground">
                        This structured approach ensures consistent quality, maintainable code, and reliable
                        delivery while staying adaptable to changing requirements and new technologies.
                        Every step is designed to produce enterprise-grade solutions that stand the test of time.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
