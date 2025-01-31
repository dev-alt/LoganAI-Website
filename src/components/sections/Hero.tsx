'use client';

import React, { useRef, useEffect, ReactElement } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { gsap } from '@/lib/gsap';

interface ButtonProps {
    variant?: 'default' | 'outline';
    size?: 'default' | 'lg';
    href: string;
    children: React.ReactNode;
    className?: string;
}

function Button({
                    variant = 'default',
                    size = 'default',
                    href,
                    children,
                    className = '',
                }: ButtonProps): ReactElement {
    const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring';
    const variantStyles = {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        outline: 'border border-transparent bg-background text-foreground hover:bg-accent/10 gradient-border',
    };
    const sizeStyles = {
        default: 'h-10 px-4 py-2',
        lg: 'h-11 px-8',
    };

    return (
        <Link
            href={href}
            className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        >
            {children}
        </Link>
    );
}

export function Hero(): ReactElement {
    const heroRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const gradientElement = heroRef.current?.querySelector('.animated-gradient');
            const decorativeElement = heroRef.current?.querySelector('.decorative-element');

            if (gradientElement) {
                gsap.to(gradientElement, {
                    rotation: 360,
                    duration: 20,
                    repeat: -1,
                    ease: 'none',
                });
            }

            if (decorativeElement) {
                gsap.to(decorativeElement, {
                    rotation: -10,
                    duration: 10,
                    repeat: -1,
                    yoyo: true,
                    ease: 'sine.inOut',
                });
            }
        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <div className="relative" ref={heroRef}>
            {/* Animated background effect */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="animated-gradient absolute -inset-[10px] opacity-10 dark:opacity-20 blur-3xl" />
            </div>

            {/* Hero content */}
            <div className="relative mx-auto max-w-7xl px-6 pt-32 sm:pt-40 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="relative z-10"
                    >
            <span className="mb-8 inline-flex animate-background-shine cursor-default items-center rounded-full border border-border px-3 py-1 text-sm text-muted-foreground">
              <span className="mx-1">Available for projects</span>
            </span>

                        <h1 className="mt-8 text-4xl font-bold tracking-tight sm:text-6xl">
                            <span className="gradient-text">Engineering Intelligence,</span>{' '}
                            <span className="inline-block text-foreground">Delivering Excellence</span>
                        </h1>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mt-6 text-lg leading-8 text-muted-foreground"
                    >
                        Transforming businesses through cutting-edge AI solutions and expert software development.
                        From concept to deployment, we bring your digital vision to life.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="mt-10 flex items-center justify-center gap-x-6"
                    >
                        <Button
                            href="/contact"
                            size="lg"
                        >
                            Get Started
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            href="/projects"
                        >
                            View Projects
                        </Button>
                    </motion.div>
                </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
                <div
                    className="decorative-element relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[hsl(var(--highlight-blue))] to-[hsl(var(--highlight-purple))] opacity-10 dark:opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                    style={{
                        clipPath:
                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                />
            </div>
        </div>
    );
}
