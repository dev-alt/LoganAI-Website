'use client';

import { useRef, useEffect, ReactElement } from 'react';
import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { gsap } from '@/lib/gsap';

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
  client: string;
}

const projects: Project[] = [
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

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

interface TagProps {
  children: string;
}

function Tag({ children }: TagProps): ReactElement {
  return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
      {children}
    </span>
  );
}

interface ButtonProps {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  children: React.ReactNode;
  href?: string;
  external?: boolean;
}

function Button({
                  variant = 'default',
                  size = 'default',
                  className = '',
                  children,
                  href,
                  external
                }: ButtonProps): ReactElement {
  const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50';

  const variantStyles = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
  };

  const sizeStyles = {
    default: 'h-10 px-4 py-2',
    sm: 'h-9 px-3',
    lg: 'h-11 px-8',
    icon: 'h-10 w-10',
  };

  const styles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if (href) {
    return (
        <Link
            href={href}
            className={styles}
            {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {children}
        </Link>
    );
  }

  return (
      <button className={styles}>
        {children}
      </button>
  );
}

export function Projects(): ReactElement {
  const projectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = projectsRef.current?.querySelectorAll('.project-card');

      cards?.forEach((card, index) => {
        gsap.fromTo(card,
            {
              opacity: 0,
              y: 50,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top bottom-=100",
                toggleActions: "play none none reverse",
              },
              delay: index * 0.1,
            }
        );
      });
    }, projectsRef);

    return () => ctx.revert();
  }, []);

  return (
      <section className="relative py-24" ref={projectsRef}>
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mx-auto max-w-2xl text-center mb-16"
          >
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Featured Projects
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              Explore our portfolio of innovative solutions and successful implementations
              across various industries.
            </p>
          </motion.div>

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
                    className="project-card"
                >
                  <div className="group h-full rounded-lg border border-border bg-card overflow-hidden transition-colors hover:border-primary">
                    <div className="p-0">
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-card-foreground mb-2">
                        {project.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Client: {project.client}
                      </p>
                      <p className="text-muted-foreground mb-4">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.map((tag) => (
                            <Tag key={tag}>{tag}</Tag>
                        ))}
                      </div>
                      <div className="flex justify-between items-center">
                        <Button variant="outline" size="sm" href={project.link}>
                          View Case Study
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full"
                            href={project.link}
                            external
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
            ))}
          </motion.div>

          <div className="mt-16 text-center">
            <Button href="/projects" size="lg">
              View All Projects
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
  );
}
