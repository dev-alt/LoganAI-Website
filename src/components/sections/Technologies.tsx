'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';

const technologies = [
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

export function Technologies() {
    return (
        <section className="py-24 relative">
            {/* Background gradient */}
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
                            className="space-y-4"
                        >
                            <Card className="overflow-hidden border-primary/20">
                                <CardContent className="p-6">
                                    <h3 className="text-lg font-semibold text-primary mb-4">
                                        {category.category}
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <TooltipProvider>
                                            {category.items.map((tech) => (
                                                <Tooltip key={tech.name}>
                                                    <TooltipTrigger asChild>
                                                        <div className="group flex items-center space-x-3 rounded-lg border border-border p-3 transition-colors hover:bg-primary/10 hover:border-primary">
                                                            <span className="text-2xl">{tech.icon}</span>
                                                            <span className="text-sm font-medium text-foreground">
                                {tech.name}
                              </span>
                                                        </div>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>{tech.description}</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            ))}
                                        </TooltipProvider>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Optional: Add a CTA section */}
                <div className="mt-16 text-center">
                    <p className="text-muted-foreground">
                        Need a specific technology for your project?{' '}
                        <a href="/contact" className="text-primary hover:text-primary/80 font-medium">
                            Let&#39;s discuss your requirements
                        </a>
                    </p>
                </div>
            </div>
        </section>
    );
}
