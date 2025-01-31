'use client';

import React, { useRef, useEffect, ReactElement } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { gsap } from '@/lib/gsap';
import {
    Brain,
    Database,
} from 'lucide-react';

interface Service {
    title: string;
    description: string;
    icon: React.ElementType;
    features?: string[];
}

interface CardProps {
    children: React.ReactNode;
    className?: string;
}

const services: Service[] = [
    {
        title: 'AI Development',
        description: 'Custom AI solutions leveraging cutting-edge technologies.',
        icon: Brain,
        features: [
            'Custom AI Models',
            'Natural Language Processing',
            'Machine Learning Integration',
            'AWS Bedrock Implementation',
            'AI-Powered Chatbots',
            'Predictive Analytics',
        ],
    },
    // ... other services
];

const additionalServices: Service[] = [
    {
        title: 'Database Solutions',
        description: 'Optimize and scale your data architecture.',
        icon: Database,
    },
    // ... other additional services
];

function Card({ children, className = '' }: CardProps): ReactElement {
    return (
        <div className={`bg-card rounded-lg border border-border p-6 ${className}`}>
            {children}
        </div>
    );
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
        },
    },
};

export default function ServicesPage(): ReactElement {
    const pageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const cards = pageRef.current?.querySelectorAll('.service-card');

            if (cards) {
                gsap.from([...cards], {
                    opacity: 0,
                    y: 50,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: cards,
                        start: 'top bottom-=100',
                        toggleActions: 'play none none reverse',
                    },
                });
            }
        }, pageRef);

        // Simplified cleanup
        return () => ctx.revert();
    }, []);
    return (
        <div className="min-h-screen" ref={pageRef}>
            <div className="relative py-24">
                <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background" />
                <motion.div
                    className="relative mx-auto max-w-7xl px-6 lg:px-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="mx-auto max-w-2xl text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
                            Our Services
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-muted-foreground">
                            Comprehensive software development and AI solutions tailored to your needs.
                            We combine technical expertise with modern best practices to deliver
                            exceptional results.
                        </p>
                    </div>
                </motion.div>
            </div>

            <div className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
                <motion.div
                    className="grid gap-8 md:grid-cols-2"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {services.map((service) => (
                        <motion.div
                            key={service.title}
                            variants={itemVariants}
                            className="service-card"
                        >
                            <Card className="h-full transition-all duration-300 hover:border-primary hover:shadow-lg">
                                <div className="mb-4 inline-block rounded-lg bg-primary/10 p-3 text-primary">
                                    <service.icon className="h-6 w-6" />
                                </div>
                                <h3 className="text-2xl font-semibold mb-2">{service.title}</h3>
                                <p className="text-muted-foreground mb-6">{service.description}</p>
                                {service.features && (
                                    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                        {service.features.map((feature) => (
                                            <li key={feature} className="flex items-center text-sm text-muted-foreground">
                                                <span className="mr-2">•</span>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>

                <div className="mt-24">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-2xl font-bold tracking-tight text-foreground mb-12 text-center"
                    >
                        Additional Capabilities
                    </motion.h2>
                    <motion.div
                        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {additionalServices.map((service) => (
                            <motion.div
                                key={service.title}
                                variants={itemVariants}
                                className="service-card"
                            >
                                <Card className="transition-all duration-300 hover:border-primary hover:shadow-lg">
                                    <div className="mb-4 inline-block rounded-lg bg-primary/10 p-3 text-primary">
                                        <service.icon className="h-6 w-6" />
                                    </div>
                                    <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                                    <p className="text-sm text-muted-foreground">{service.description}</p>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mt-24 text-center"
                >
                    <h2 className="text-2xl font-bold tracking-tight text-foreground mb-6">
                        Ready to Start Your Project?
                    </h2>
                    <p className="mb-8 text-muted-foreground">
                        Let&#39;s discuss how we can help you achieve your technical goals.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                    >
                        Get in Touch
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}
