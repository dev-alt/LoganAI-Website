# Create base directories
$directories = @(
    "src/assets/fonts",
    "src/assets/images",
    "src/assets/styles",
    "src/components/common",
    "src/components/layout",
    "src/components/sections",
    "src/utils",
    "src/hooks",
    "src/context",
    "src/app",
    "src/app/(pages)/about",
    "src/app/(pages)/contact",
    "src/app/(pages)/projects",
    "src/app/(pages)/services"
)

foreach ($dir in $directories) {
    New-Item -Path $dir -ItemType Directory -Force
}

# Create component files
$components = @{
    "src/components/common/Button.tsx" = "export default function Button() { return <button>Button</button> }"
    "src/components/common/Card.tsx" = "export default function Card() { return <div>Card</div> }"
    "src/components/common/Navigation.tsx" = "export default function Navigation() { return <nav>Navigation</nav> }"
    "src/components/layout/Footer.tsx" = "export default function Footer() { return <footer>Footer</footer> }"
    "src/components/layout/Header.tsx" = "export default function Header() { return <header>Header</header> }"
    "src/components/layout/Layout.tsx" = "export default function Layout({ children }: { children: React.ReactNode }) { return <div>{children}</div> }"
    "src/components/sections/Hero.tsx" = "export default function Hero() { return <section>Hero Section</section> }"
    "src/components/sections/Services.tsx" = "export default function Services() { return <section>Services Section</section> }"
    "src/components/sections/Technologies.tsx" = "export default function Technologies() { return <section>Technologies Section</section> }"
}

foreach ($component in $components.GetEnumerator()) {
    Set-Content -Path $component.Key -Value $component.Value -Force
}

# Create utility files
$utils = @{
    "src/utils/animations.ts" = "// Animation utilities"
    "src/utils/constants.ts" = "// Constants and configuration"
}

foreach ($util in $utils.GetEnumerator()) {
    Set-Content -Path $util.Key -Value $util.Value -Force
}

# Create hooks
Set-Content -Path "src/hooks/useScrollAnimation.ts" -Value "export function useScrollAnimation() { return {} }" -Force

# Create context
Set-Content -Path "src/context/ThemeContext.tsx" -Value "import { createContext } from 'react'; export const ThemeContext = createContext({});" -Force

# Create global styles
Set-Content -Path "src/assets/styles/globals.css" -Value "@tailwind base;`n@tailwind components;`n@tailwind utilities;" -Force

# Create Next.js app pages
$pages = @{
    "src/app/layout.tsx" = @"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/assets/styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Logan Software & AI Solutions',
  description: 'Engineering Intelligence, Delivering Excellence',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
"@

    "src/app/page.tsx" = @"
import Hero from '@/components/sections/Hero'
import Services from '@/components/sections/Services'
import Technologies from '@/components/sections/Technologies'

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <Technologies />
    </main>
  )
}
"@

    "src/app/(pages)/about/page.tsx" = "export default function About() { return <div>About Page</div> }"
    "src/app/(pages)/contact/page.tsx" = "export default function Contact() { return <div>Contact Page</div> }"
    "src/app/(pages)/projects/page.tsx" = "export default function Projects() { return <div>Projects Page</div> }"
    "src/app/(pages)/services/page.tsx" = "export default function Services() { return <div>Services Page</div> }"
}

foreach ($page in $pages.GetEnumerator()) {
    Set-Content -Path $page.Key -Value $page.Value -Force
}

Write-Host "Project structure created successfully!" -ForegroundColor Green