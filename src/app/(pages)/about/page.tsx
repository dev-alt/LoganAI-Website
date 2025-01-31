'use client';

import React, { useRef, useEffect, ReactElement } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { gsap } from '@/lib/gsap';

interface ExpertiseCategory {
    category: string;
    skills: string[];
}

interface ButtonProps {
    variant?: 'default' | 'ghost';
    size?: 'default' | 'lg' | 'icon';
    asChild?: boolean;
    children: React.ReactNode;
    className?: string;
}

const expertise: ExpertiseCategory[] = [
    {
        category: "AI & Machine Learning",
        skills: [
            "Large Language Models",
            "AWS Bedrock",
            "Natural Language Processing",
            "Machine Learning",
            "Neural Networks",
            "Prompt Engineering"
        ]
    },
    {
        category: "Software Development",
        skills: [
            "C#/.NET",
            "Go",
            "C++",
            "TypeScript",
            "React",
            "Node.js"
        ]
    },
    {
        category: "Cloud & DevOps",
        skills: [
            "AWS Services",
            "Cloud Architecture",
            "CI/CD",
            "Docker",
            "Kubernetes",
            "Infrastructure as Code"
        ]
    }
];

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }): ReactElement {
    return (
        <div className={`bg-card rounded-lg border border-border ${className}`}>
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

function Button({ children, variant = 'default', size = 'default', className = '' }: ButtonProps): ReactElement {
    const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring';
    const variantStyles = {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
    };
    const sizeStyles = {
        default: 'h-10 px-4 py-2',
        lg: 'h-11 px-8',
        icon: 'h-10 w-10',
    };

    return (
        <button className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}>
            {children}
        </button>
    );
}

const fadeUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: 'easeOut',
        }
    }
};

export default function AboutPage(): ReactElement {
    const pageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const cards = pageRef.current?.querySelectorAll('.animate-card');

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

        return () => ctx.revert();
    }, []);

    return (
        <div className="min-h-screen" ref={pageRef}>
            <div className="relative py-24">
                <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background" />
                <motion.div
                    className="relative mx-auto max-w-7xl px-6 lg:px-8"
                    initial="hidden"
                    animate="visible"
                    variants={fadeUpVariants}
                >
                    <div className="mx-auto max-w-2xl text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
                            About Us
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-muted-foreground">
                            Technical excellence and innovative solutions in software development and AI integration.
                        </p>
                    </div>
                </motion.div>
            </div>

            <div className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
                <div className="mx-auto max-w-3xl mb-24 animate-card">
                    <Card>
                        <div className="p-6">
                            <div className="relative aspect-video mb-8 overflow-hidden rounded-lg">
                                <Image
                                    src="/api/placeholder/1200/600"
                                    alt="About Logan Software"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="space-y-4 text-muted-foreground">
                                <p>
                                    Logan Software & AI Solutions specializes in developing advanced software solutions
                                    with a focus on artificial intelligence integration. With a foundation in modern
                                    software development practices and expertise in cutting-edge AI technologies,
                                    we deliver solutions that drive innovation and efficiency.
                                </p>
                                <p>
                                    Our approach combines technical excellence with practical implementation,
                                    ensuring that every solution we deliver is not just technically sophisticated
                                    but also delivers real business value. We pride ourselves on staying at the
                                    forefront of technology while maintaining a focus on reliability and security.
                                </p>
                                <div className="flex gap-4 pt-4">
                                    <Button variant="ghost" size="icon">
                                        <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
                                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                            </svg>
                                        </Link>
                                    </Button>
                                    <Button variant="ghost" size="icon">
                                        <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path fillRule="evenodd" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" clipRule="evenodd" />
                                            </svg>
                                        </Link>
                                    </Button>
                                    <Button variant="ghost" size="icon">
                                        <Link href="mailto:contact@example.com">
                                            <Mail className="h-5 w-5" />
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                <div className="mb-24">
                    <h2 className="text-2xl font-bold tracking-tight text-foreground mb-12 text-center">
                        Technical Expertise
                    </h2>
                    <div className="grid gap-8 md:grid-cols-3">
                        {expertise.map((category) => (
                            <motion.div
                                key={category.category}
                                className="animate-card"
                                whileHover={{ y: -5 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Card>
                                    <div className="p-6">
                                        <h3 className="text-lg font-semibold mb-4">{category.category}</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {category.skills.map((skill) => (
                                                <Badge key={skill}>{skill}</Badge>
                                            ))}
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="mx-auto max-w-3xl animate-card">
                    <Card>
                        <div className="p-6">
                            <h3 className="text-lg font-semibold mb-2">Our Approach</h3>
                            <p className="text-sm text-muted-foreground mb-6">
                                How we deliver value through technology
                            </p>
                            <div className="space-y-4 text-muted-foreground">
                                <p>
                                    We believe in a pragmatic approach to software development, combining
                                    cutting-edge technologies with proven methodologies. Our focus is on
                                    delivering maintainable, scalable solutions that provide long-term value.
                                </p>
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div>
                                        <h4 className="font-semibold text-foreground mb-2">Technical Focus</h4>
                                        <ul className="space-y-1 text-sm">
                                            <li>• Modern development practices</li>
                                            <li>• Security-first mindset</li>
                                            <li>• Performance optimization</li>
                                            <li>• Quality code architecture</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-foreground mb-2">Development Process</h4>
                                        <ul className="space-y-1 text-sm">
                                            <li>• Agile methodology</li>
                                            <li>• Regular communication</li>
                                            <li>• Continuous integration</li>
                                            <li>• Automated testing</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                <motion.div
                    className="mt-24 text-center"
                    variants={fadeUpVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <h2 className="text-2xl font-bold tracking-tight text-foreground mb-6">
                        Let&#39;s Work Together
                    </h2>
                    <p className="text-muted-foreground mb-8 mx-auto max-w-2xl">
                        Looking to implement AI solutions or need expert software development?
                        Let&#39;s discuss how we can help bring your technical vision to life.
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
