// src/app/(pages)/services/page.tsx
import { Metadata } from 'next';
import {
    Code2,
    Brain,
    Cloud,
    Terminal,
    Database,
    Laptop,
    LineChart,
    Shield,
} from 'lucide-react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Services',
    description: 'AI development, software solutions, and technical consulting services.',
};

const services = [
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
    {
        title: 'Software Development',
        description: 'Full-stack development with modern technologies.',
        icon: Code2,
        features: [
            'Web Applications',
            'Mobile Apps',
            'Desktop Software',
            'API Development',
            'Database Design',
            'System Integration',
        ],
    },
    {
        title: 'Cloud Architecture',
        description: 'Scalable and secure cloud infrastructure solutions.',
        icon: Cloud,
        features: [
            'AWS Architecture',
            'Cloud Migration',
            'Serverless Solutions',
            'Infrastructure as Code',
            'Monitoring & Logging',
            'Cost Optimization',
        ],
    },
    {
        title: 'Technical Consulting',
        description: 'Expert guidance on technology strategy and implementation.',
        icon: Terminal,
        features: [
            'Architecture Review',
            'Technology Selection',
            'Security Assessment',
            'Performance Optimization',
            'Best Practices',
            'Technical Documentation',
        ],
    },
];

const additionalServices = [
    {
        title: 'Database Solutions',
        description: 'Optimize and scale your data architecture.',
        icon: Database,
    },
    {
        title: 'Frontend Development',
        description: 'Create engaging user experiences.',
        icon: Laptop,
    },
    {
        title: 'Analytics Integration',
        description: 'Data-driven insights and reporting.',
        icon: LineChart,
    },
    {
        title: 'Security Implementation',
        description: 'Protect your systems and data.',
        icon: Shield,
    },
];

export default function ServicesPage() {
    return (
        <div className="min-h-screen">
            {/* Hero section */}
            <div className="relative py-24">
                <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background" />
                <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
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
                </div>
            </div>

            {/* Main services */}
            <div className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
                <div className="grid gap-8 md:grid-cols-2">
                    {services.map((service) => (
                        <Card key={service.title} className="transition-colors hover:border-primary">
                            <CardHeader>
                                <div className="mb-4 inline-block rounded-lg bg-primary/10 p-3 text-primary">
                                    <service.icon className="h-6 w-6" />
                                </div>
                                <CardTitle className="text-2xl">{service.title}</CardTitle>
                                <CardDescription className="text-muted-foreground">
                                    {service.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                    {service.features.map((feature) => (
                                        <li key={feature} className="flex items-center text-sm text-muted-foreground">
                                            <span className="mr-2">•</span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Additional services */}
                <div className="mt-24">
                    <h2 className="text-2xl font-bold tracking-tight text-foreground mb-12 text-center">
                        Additional Capabilities
                    </h2>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {additionalServices.map((service) => (
                            <Card key={service.title} className="transition-colors hover:border-primary">
                                <CardHeader>
                                    <div className="mb-4 inline-block rounded-lg bg-primary/10 p-3 text-primary">
                                        <service.icon className="h-6 w-6" />
                                    </div>
                                    <CardTitle>{service.title}</CardTitle>
                                    <CardDescription className="text-muted-foreground">
                                        {service.description}
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* CTA Section */}
                <div className="mt-24 text-center">
                    <h2 className="text-2xl font-bold tracking-tight text-foreground mb-6">
                        Ready to Start Your Project?
                    </h2>
                    <p className="mb-8 text-muted-foreground">
                        Let&#39;s discuss how we can help you achieve your technical goals.
                    </p>
                    <Button asChild size="lg">
                        <Link href="/contact">Get in Touch</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
