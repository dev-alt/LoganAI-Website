// src/app/(pages)/projects/page.tsx
import { Metadata } from 'next';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@/components/ui/tabs';

export const metadata: Metadata = {
    title: 'Projects',
    description: 'Portfolio of our AI and software development projects.',
};

const projects = [
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
    {
        title: 'Enterprise Integration Platform',
        client: 'Technology Company',
        category: 'backend',
        description: 'High-performance microservices architecture for enterprise data integration and processing.',
        image: '/api/placeholder/800/600',
        challenge: 'Creating a scalable system capable of handling complex data processing requirements across multiple enterprise systems.',
        solution: 'Developed a microservices architecture using Go and AWS services for optimal performance and reliability.',
        technologies: ['Go', 'AWS', 'Kubernetes', 'Microservices'],
        features: [
            'Real-time data processing',
            'Scalable architecture',
            'High availability',
            'Monitoring and logging'
        ],
        results: [
            'Increased processing speed',
            'Improved system reliability',
            'Better resource utilization',
            'Enhanced monitoring capabilities'
        ]
    },
    {
        title: 'Analytics Dashboard',
        client: 'Data Analytics Firm',
        category: 'frontend',
        description: 'Interactive analytics dashboard providing real-time insights and data visualization.',
        image: '/api/placeholder/800/600',
        challenge: 'Building an intuitive interface for complex data visualization and analysis tools.',
        solution: 'Created a responsive React application with real-time data processing and interactive visualizations.',
        technologies: ['React', 'TypeScript', 'D3.js', 'WebSocket'],
        features: [
            'Real-time updates',
            'Interactive charts',
            'Custom visualizations',
            'Data export capabilities'
        ],
        results: [
            'Enhanced user engagement',
            'Improved data accessibility',
            'Faster decision making',
            'Positive user feedback'
        ]
    }
];

const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'ai', name: 'AI & ML' },
    { id: 'backend', name: 'Backend' },
    { id: 'frontend', name: 'Frontend' },
];

export default function ProjectsPage() {
    return (
        <div className="min-h-screen">
            {/* Hero section */}
            <div className="relative py-24">
                <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background" />
                <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
                            Our Projects
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-muted-foreground">
                            Explore our portfolio of innovative solutions across AI, software development,
                            and technical consulting.
                        </p>
                    </div>
                </div>
            </div>

            {/* Projects section */}
            <div className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
                <Tabs defaultValue="all" className="w-full">
                    <TabsList className="mb-12">
                        {categories.map((category) => (
                            <TabsTrigger key={category.id} value={category.id}>
                                {category.name}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    {categories.map((category) => (
                        <TabsContent key={category.id} value={category.id}>
                            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                                {projects
                                    .filter((project) =>
                                        category.id === 'all' ? true : project.category === category.id
                                    )
                                    .map((project) => (
                                        <Card key={project.title} className="group overflow-hidden">
                                            <CardHeader className="p-0">
                                                <div className="relative aspect-video overflow-hidden">
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
                                                    {project.technologies.map((tech) => (
                                                        <Badge key={tech} variant="secondary">
                                                            {tech}
                                                        </Badge>
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
                                            </CardContent>
                                        </Card>
                                    ))}
                            </div>
                        </TabsContent>
                    ))}
                </Tabs>

                {/* Contact CTA */}
                <div className="mt-24 rounded-lg border bg-card p-8 text-card-foreground">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-2xl font-bold tracking-tight text-foreground mb-4">
                            Have a Project in Mind?
                        </h2>
                        <p className="text-muted-foreground mb-8">
                            Let&#39;s discuss how we can help bring your ideas to life with our technical expertise.
                        </p>
                        <Button asChild size="lg">
                            <a href="/contact">Discuss Your Project</a>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
