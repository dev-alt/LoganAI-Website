'use client';

import React, { useRef, useEffect, ReactElement } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin } from 'lucide-react';
import { gsap } from '@/lib/gsap';

interface ContactMethod {
    icon: ReactElement;
    title: string;
    description: string;
    value: string;
    href: string | null;
}

interface CardProps {
    children: React.ReactNode;
    className?: string;
}

const contactMethods: ContactMethod[] = [
    {
        icon: <Mail className="h-6 w-6" />,
        title: 'Email',
        description: 'Contact for technical inquiries',
        value: 'contact@loganai.dev',
        href: 'mailto:contact@loganai.dev',
    },
    {
        icon: (
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
        ),
        title: 'GitHub',
        description: 'View technical projects',
        value: 'github.com/dev-alt',
        href: 'https://www.linkedin.com/in/andrew-logan-681b53231/',
    },
    {
        icon: (
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" clipRule="evenodd" />
            </svg>
        ),
        title: 'LinkedIn',
        description: 'Professional profile',
        value: 'linkedin.com/in/dev-alt',
        href: 'https://www.linkedin.com/in/andrew-logan-681b53231/',
    },
    {
        icon: <MapPin className="h-6 w-6" />,
        title: 'Location',
        description: 'Based in',
        value: 'Tauranga, New Zealand',
        href: null,
    },
];

function Card({ children, className = '' }: CardProps): ReactElement {
    return (
        <div className={`bg-card rounded-lg border border-border shadow-sm ${className}`}>
            {children}
        </div>
    );
}

function ContactForm(): ReactElement {
    return (
        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Name
                </label>
                <input
                    type="text"
                    id="name"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="Your name"
                />
            </div>
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="you@example.com"
                />
            </div>
            <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Message
                </label>
                <textarea
                    id="message"
                    rows={4}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="Tell us about your project"
                />
            </div>
            <button
                type="submit"
                className="w-full rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary"
            >
                Send Message
            </button>
        </form>
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

export default function ContactPage(): ReactElement {
    const pageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const cards = pageRef.current?.querySelectorAll('.contact-card');

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
                            Contact
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-muted-foreground">
                            Let&#39;s discuss your technical requirements and explore how we can help bring your ideas to life.
                        </p>
                    </div>
                </motion.div>
            </div>

            <div className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
                <div className="grid gap-8 lg:grid-cols-2">
                    <div className="contact-card">
                        <Card>
                            <div className="p-6">
                                <h2 className="text-xl font-semibold mb-2">Project Discussion</h2>
                                <p className="text-sm text-muted-foreground mb-6">
                                    Share your technical requirements or project ideas.
                                </p>
                                <ContactForm />
                            </div>
                        </Card>
                    </div>

                    <div className="space-y-8">
                        {contactMethods.map((method) => (
                            <motion.div
                                key={method.title}
                                className="contact-card"
                                whileHover={{ y: -2 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Card>
                                    <div className="p-6">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="inline-block rounded-lg bg-primary/10 p-3 text-primary">
                                                {method.icon}
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-semibold">{method.title}</h3>
                                                <p className="text-sm text-muted-foreground">{method.description}</p>
                                            </div>
                                        </div>
                                        {method.href ? (
                                            <a
                                                href={method.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-muted-foreground hover:text-primary transition-colors"
                                            >
                                                {method.value}
                                            </a>
                                        ) : (
                                            <span className="text-muted-foreground">{method.value}</span>
                                        )}
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <motion.div
                    className="mt-16"
                    variants={fadeUpVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <Card>
                        <div className="p-6">
                            <div className="mx-auto max-w-2xl text-center">
                                <h2 className="text-2xl font-bold tracking-tight text-foreground mb-4">
                                    Technical Collaboration
                                </h2>
                                <p className="text-muted-foreground">
                                    We focus on technical excellence and practical solutions. Our expertise spans AI development,
                                    software engineering, and cloud architecture. Let&#39;s discuss how we can help with your specific
                                    technical challenges.
                                </p>
                            </div>
                        </div>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}
