// src/app/(pages)/about/page.tsx
import { Metadata } from 'next';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Github, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'About',
    description: 'Learn about Logan Software & AI Solutions and our technical expertise.',
};

const expertise = [
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

export default function AboutPage() {
    return (
        <div className="min-h-screen">
            {/* Hero section */}
            <div className="relative py-24">
                <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background" />
                <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
                            About Us
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-muted-foreground">
                            Technical excellence and innovative solutions in software development and AI integration.
                        </p>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
                {/* Introduction */}
                <div className="mx-auto max-w-3xl mb-24">
                    <Card>
                        <CardContent className="p-6">
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
                                    <Button asChild variant="ghost" size="icon">
                                        <Link href="https://github.com" target="_blank">
                                            <Github className="h-5 w-5" />
                                        </Link>
                                    </Button>
                                    <Button asChild variant="ghost" size="icon">
                                        <Link href="https://linkedin.com" target="_blank">
                                            <Linkedin className="h-5 w-5" />
                                        </Link>
                                    </Button>
                                    <Button asChild variant="ghost" size="icon">
                                        <Link href="mailto:contact@example.com">
                                            <Mail className="h-5 w-5" />
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Technical Expertise */}
                <div className="mb-24">
                    <h2 className="text-2xl font-bold tracking-tight text-foreground mb-12 text-center">
                        Technical Expertise
                    </h2>
                    <div className="grid gap-8 md:grid-cols-3">
                        {expertise.map((category) => (
                            <Card key={category.category}>
                                <CardHeader>
                                    <CardTitle>{category.category}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-wrap gap-2">
                                        {category.skills.map((skill) => (
                                            <Badge key={skill} variant="secondary">
                                                {skill}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Approach Section */}
                <div className="mx-auto max-w-3xl">
                    <Card>
                        <CardHeader>
                            <CardTitle>Our Approach</CardTitle>
                            <CardDescription>
                                How we deliver value through technology
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 text-muted-foreground">
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
                        </CardContent>
                    </Card>
                </div>

                {/* Contact CTA */}
                <div className="mt-24 text-center">
                    <h2 className="text-2xl font-bold tracking-tight text-foreground mb-6">
                        Let&#39;s Work Together
                    </h2>
                    <p className="text-muted-foreground mb-8 mx-auto max-w-2xl">
                        Looking to implement AI solutions or need expert software development?
                        Let&#39;s discuss how we can help bring your technical vision to life.
                    </p>
                    <Button asChild size="lg">
                        <Link href="/contact">Get in Touch</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
