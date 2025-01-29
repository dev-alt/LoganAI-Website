'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const projects = [
    {
        title: 'AI Chatbot Platform',
        description: 'Advanced conversational AI system built for agricultural technology sector, featuring natural language processing and integration with enterprise systems.',
        image: '/api/placeholder/600/400',
        tags: ['AWS Bedrock', 'React', 'Node.js', 'AI/ML'],
        link: '/projects/ai-chatbot',
        client: 'Ballance Agri-Nutrients',
    },
    {
        title: 'Enterprise Integration System',
        description: 'High-performance microservices architecture handling real-time data processing and system integration for large-scale operations.',
        image: '/api/placeholder/600/400',
        tags: ['Go', 'AWS', 'Kubernetes', 'Microservices'],
        link: '/projects/integration-system',
        client: 'Enterprise Client',
    },
    {
        title: 'Smart Analytics Dashboard',
        description: 'Real-time analytics platform with predictive modeling capabilities, providing actionable insights for business intelligence.',
        image: '/api/placeholder/600/400',
        tags: ['Python', 'React', 'TensorFlow', 'Data Analytics'],
        link: '/projects/analytics-dashboard',
        client: 'Technology Company',
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
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

export function Projects() {
    return (
        <section className="py-24 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background" />

            <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        Featured Projects
                    </h2>
                    <p className="mt-6 text-lg leading-8 text-muted-foreground">
                        Explore our portfolio of innovative solutions and successful implementations
                        across various industries.
                    </p>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
                >
                    {projects.map((project) => (
                        <motion.div
                            key={project.title}
                            variants={itemVariants}
                        >
                            <Card className="group h-full overflow-hidden transition-colors hover:border-primary">
                                <CardHeader className="p-0">
                                    <div className="relative aspect-[4/3] overflow-hidden">
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </div>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <CardTitle className="text-xl mb-2">{project.title}</CardTitle>
                                    <p className="text-sm text-muted-foreground mb-4">
                                        Client: {project.client}
                                    </p>
                                    <CardDescription className="mb-4">
                                        {project.description}
                                    </CardDescription>
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {project.tags.map((tag) => (
                                            <Badge key={tag} variant="secondary">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <Button asChild variant="outline" size="sm">
                                            <Link href={project.link}>
                                                View Case Study
                                                <ArrowRight className="ml-2 h-4 w-4" />
                                            </Link>
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="rounded-full"
                                            asChild
                                        >
                                            <Link href={project.link} target="_blank">
                                                <ExternalLink className="h-4 w-4" />
                                            </Link>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>

                <div className="mt-16 text-center">
                    <Button asChild size="lg">
                        <Link href="/projects">
                            View All Projects
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
