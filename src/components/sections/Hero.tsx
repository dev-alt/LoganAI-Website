'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Link from 'next/link';

export function Hero() {
    return (
        <div className="relative">
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
                            asChild
                            size="lg"
                            className="bg-primary text-primary-foreground hover:bg-primary/90 dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/90"
                        >
                            <Link href="/contact">Get Started</Link>
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            asChild
                            className="gradient-border border-transparent bg-background text-foreground hover:bg-accent/10"
                        >
                            <Link href="/projects">View Projects</Link>
                        </Button>
                    </motion.div>
                </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
                <div
                    className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[hsl(var(--highlight-blue))] to-[hsl(var(--highlight-purple))] opacity-10 dark:opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                    style={{
                        clipPath:
                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                />
            </div>
        </div>
    );
}
