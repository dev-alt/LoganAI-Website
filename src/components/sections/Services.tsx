'use client';

import React, { useRef, useEffect, ReactElement } from 'react';
import { motion, Variants } from 'framer-motion';
import { Code2, Brain, Cloud, Terminal } from 'lucide-react';
import { gsap } from '@/lib/gsap';

interface Service {
    name: string;
    description: string;
    icon: React.ElementType;
}

interface CardProps {
    children: React.ReactNode;
    className?: string;
}

const services: Service[] = [
    {
        name: 'AI Solutions',
        description: 'Custom AI integration, machine learning models, and natural language processing solutions.',
        icon: Brain,
    },
    {
        name: 'Software Development',
        description: 'Full-stack web applications, mobile apps, and custom software solutions.',
        icon: Code2,
    },
    {
        name: 'Cloud Architecture',
        description: 'AWS infrastructure design, system integration, and cloud migration services.',
        icon: Cloud,
    },
    {
        name: 'Technical Consulting',
        description: 'Expert guidance on technology strategy, architecture design, and implementation.',
        icon: Terminal,
    },
];

function Card({ children, className = '' }: CardProps): ReactElement {
    return (
        <div className={`group relative overflow-hidden rounded-lg border border-border bg-card p-6 transition-all duration-300 hover:border-primary ${className}`}>
            {children}
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100 dark:from-primary/0 dark:via-primary/0 dark:to-primary/20" />
        </div>
    );
}

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
};

export function Services(): ReactElement {
    const servicesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const cards = servicesRef.current?.querySelectorAll('.service-card');

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
        }, servicesRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="relative py-24" ref={servicesRef}>
            <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background dark:from-background dark:via-background/50 dark:to-background" />

            <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <motion.h2
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-3xl font-bold tracking-tight gradient-text sm:text-4xl"
                    >
                        Our Services
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="mt-6 text-lg leading-8 text-muted-foreground"
                    >
                        Comprehensive solutions tailored to your business needs, powered by cutting-edge technology
                        and industry expertise.
                    </motion.p>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="mx-auto mt-16"
                >
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {services.map((service) => (
                            <motion.div
                                key={service.name}
                                variants={itemVariants}
                                className="service-card"
                            >
                                <Card>
                                    <div className="mb-4 inline-block rounded-lg p-3 bg-primary/10 dark:bg-primary/20">
                                        <service.icon className="h-6 w-6 text-primary dark:text-primary" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-foreground dark:text-foreground mb-2">
                                        {service.name}
                                    </h3>
                                    <p className="text-muted-foreground dark:text-muted-foreground">
                                        {service.description}
                                    </p>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
