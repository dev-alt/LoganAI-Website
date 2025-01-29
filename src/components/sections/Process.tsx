'use client';

import { motion } from 'framer-motion';
import {
    GitBranch,
    Shield,
    Code2,
    Workflow,
    FileCode2,
    Repeat,
    Database,
    Component,
} from 'lucide-react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

const processes = [
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
    {
        title: 'CI/CD Pipeline',
        description: 'Automated workflows that ensure consistent quality and rapid, reliable deployment of your solutions.',
        icon: GitBranch,
        details: [
            'Automated testing',
            'Continuous integration',
            'Automated deployments',
            'Environment consistency',
        ]
    },
    {
        title: 'Security Priority',
        description: 'Security integrated throughout the development lifecycle, not added as an afterthought.',
        icon: Shield,
        details: [
            'Security-first architecture',
            'Automated security scanning',
            'Dependency auditing',
            'Regular security updates',
        ]
    },
    {
        title: 'Clean Code Practices',
        description: 'Maintaining high code quality standards through rigorous review processes and best practices.',
        icon: FileCode2,
        details: [
            'Code review process',
            'Testing requirements',
            'Documentation standards',
            'Best practices enforcement',
        ]
    },
    {
        title: 'Agile Development',
        description: 'Iterative development cycles with regular feedback and adjustments to meet evolving requirements.',
        icon: Repeat,
        details: [
            'Sprint planning',
            'Regular deployments',
            'Feedback integration',
            'Continuous improvement',
        ]
    },
    {
        title: 'Testing Strategy',
        description: 'Comprehensive testing approach ensuring reliability and performance at every level.',
        icon: Workflow,
        details: [
            'Unit testing',
            'Integration testing',
            'Performance testing',
            'Automated QA',
        ]
    },
    {
        title: 'Component Architecture',
        description: 'Modular, reusable components that ensure consistency and maintainability across your application.',
        icon: Component,
        details: [
            'Component library',
            'Reusable patterns',
            'Consistent interfaces',
            'Documentation',
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

export function Process() {
    return (
        <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Development Methodology
    </h2>
    <p className="mt-6 text-lg leading-8 text-muted-foreground">
        Our systematic approach to software development ensures high-quality,
        maintainable, and secure solutions through modern best practices.
    </p>
    </div>

    <motion.div
    variants={containerVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-100px" }}
    className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
        {processes.map((process) => (
                <motion.div
                    key={process.title}
            variants={itemVariants}
            >
            <Card className="h-full transition-colors hover:border-primary">
            <CardHeader>
                <div className="mb-4 inline-block rounded-lg bg-primary/10 p-3 text-primary">
            <process.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">{process.title}</CardTitle>
            <CardDescription className="text-muted-foreground">
            {process.description}
            </CardDescription>
            </CardHeader>
            <CardContent>
            <ul className="space-y-2">
                {process.details.map((detail) => (
                        <li key={detail} className="text-sm text-muted-foreground">
                        • {detail}
    </li>
))}
    </ul>
    </CardContent>
    </Card>
    </motion.div>
))}
    </motion.div>

    <div className="mt-16 rounded-lg border bg-card p-8 text-card-foreground">
    <h3 className="text-lg font-semibold mb-4">
        Why Our Process Matters
    </h3>
    <p className="text-muted-foreground">
        This structured approach ensures consistent quality, maintainable code, and reliable
    delivery while staying adaptable to changing requirements and new technologies.
    Every step is designed to produce enterprise-grade solutions that stand the test of time.
    </p>
    </div>
    </div>
    </section>
);
}
