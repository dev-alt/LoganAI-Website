'use client';

import React, { useRef, useEffect, useState, ReactElement } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from '@/lib/gsap';

interface Project {
    title: string;
    client: string;
    category: string;
    description: string;
    image: string;
    challenge: string;
    solution: string;
    technologies: string[];
    features: string[];
    results: string[];
}

interface Category {
    id: string;
    name: string;
}

const projects: Project[] = [
    {
        title: 'AI Chatbot Platform',
        client: 'Ballance Agri-Nutrients',
        category: 'ai',
        description: 'Advanced conversational AI system built using AWS Bedrock, enabling intelligent customer interactions and streamlined support processes.',
        image: '/api/placeholder/800/600',
        challenge: 'Developing a sophisticated chatbot capable of understanding complex agricultural queries and providing accurate, context-aware responses.',
        solution: 'Implemented AWS Bedrock with custom prompt engineering and integration with enterprise systems for real-time data access.',
        technologies: ['AWS Bedrock', 'React', 'Node.js', 'AI/ML'],
        features: [
            'Natural language processing',
            'Context-aware responses',
            'Enterprise system integration',
            'Real-time data processing'
        ],
        results: [
            'Improved response accuracy',
            'Reduced support workload',
            'Enhanced user experience',
            'Scalable solution'
        ]
    },
    // Add other projects
];

const categories: Category[] = [
    { id: 'all', name: 'All Projects' },
    { id: 'ai', name: 'AI & ML' },
    { id: 'backend', name: 'Backend' },
    { id: 'frontend', name: 'Frontend' },
];

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }): ReactElement {
    return (
        <div className={`bg-card rounded-lg border border-border overflow-hidden ${className}`}>
            {children}
        </div>
    );
}

function Badge({ children }: { children: string }): ReactElement {
    return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
      {children}
    </span>
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
    exit: { opacity: 0 },
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

export default function ProjectsPage(): ReactElement {
    const [activeCategory, setActiveCategory] = useState<string>('all');
    const pageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const cards = pageRef.current?.querySelectorAll('.project-card');

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
    }, [activeCategory]);

    const filteredProjects = activeCategory === 'all'
        ? projects
        : projects.filter(project => project.category === activeCategory);

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
                            Our Projects
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-muted-foreground">
                            Explore our portfolio of innovative solutions across AI, software development,
                            and technical consulting.
                        </p>
                    </div>
                </motion.div>
            </div>

            <div className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
                <div className="mb-12 flex justify-center">
                    <div className="inline-flex rounded-lg border border-border p-1">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                                    activeCategory === category.id
                                        ? 'bg-primary text-primary-foreground'
                                        : 'text-muted-foreground hover:text-foreground'
                                }`}
                                onClick={() => setActiveCategory(category.id)}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeCategory}
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
                    >
                        {filteredProjects.map((project) => (
                            <motion.div
                                key={project.title}
                                variants={itemVariants}
                                className="project-card"
                            >
                                <Card className="h-full">
                                    <div className="relative aspect-video">
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                                        <p className="text-sm text-muted-foreground mb-4">
                                            Client: {project.client}
                                        </p>
                                        <p className="text-muted-foreground mb-4">
                                            {project.description}
                                        </p>
                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {project.technologies.map((tech) => (
                                                <Badge key={tech}>{tech}</Badge>
                                            ))}
                                        </div>
                                        <div className="space-y-4">
                                            <div>
                                                <h4 className="font-semibold mb-2">Key Features</h4>
                                                <ul className="text-sm text-muted-foreground space-y-1">
                                                    {project.features.map((feature) => (
                                                        <li key={feature}>• {feature}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div>
                                                <h4 className="font-semibold mb-2">Results</h4>
                                                <ul className="text-sm text-muted-foreground space-y-1">
                                                    {project.results.map((result) => (
                                                        <li key={result}>• {result}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mt-24 rounded-lg border bg-card p-8"
                >
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-2xl font-bold tracking-tight text-foreground mb-4">
                            Have a Project in Mind?
                        </h2>
                        <p className="text-muted-foreground mb-8">
                            Let&#39;s discuss how we can help bring your ideas to life with our technical expertise.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                        >
                            Discuss Your Project
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
