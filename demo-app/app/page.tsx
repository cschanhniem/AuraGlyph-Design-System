'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  Toggle,
  Modal,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@auraglyph/react';

// Demo section component
const DemoSection = ({ title, children, id }: { title: string; children: React.ReactNode; id?: string }) => (
  <section id={id} className="py-12 border-b border-border/20">
    <h2 className="text-3xl font-bold mb-8 text-gradient-quantum">{title}</h2>
    <div>{children}</div>
  </section>
);

// Header with navigation
const Header = ({ theme, toggleTheme }: { theme: 'light' | 'dark'; toggleTheme: () => void }) => (
  <header className="py-6 border-b border-border/20 mb-6 sticky top-0 z-10 backdrop-blur-xl bg-background/70">
    <div className="container-xl flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <h1 className="text-2xl font-bold text-gradient-quantum">AuraGlyph</h1>
        <span className="text-sm px-2 py-1 rounded-full bg-secondary text-secondary-foreground">Demo</span>
      </div>
      <nav>
        <ul className="flex space-x-6">
          <li><a href="#buttons" className="text-foreground/80 hover:text-primary transition">Buttons</a></li>
          <li><a href="#cards" className="text-foreground/80 hover:text-primary transition">Cards</a></li>
          <li><a href="#inputs" className="text-foreground/80 hover:text-primary transition">Inputs</a></li>
          <li><a href="#modals" className="text-foreground/80 hover:text-primary transition">Modals</a></li>
          <li><Button onClick={toggleTheme} variant="outline" size="sm">
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </Button></li>
        </ul>
      </nav>
    </div>
  </header>
);

// Custom quantum element component that uses the quantum hook
const CustomQuantumElement = () => {
  return (
    <div className="quantum-glass p-6 rounded-lg flex flex-col items-center space-y-4">
      <h3 className="text-xl font-medium">Custom Quantum Element</h3>
      <p className="text-center text-muted-foreground">
        This is a custom component built with quantum design principles
      </p>
      <div className="w-16 h-16 rounded-full quantum-nebula flex items-center justify-center animate-quantum-breathe">
        <span className="text-2xl">✨</span>
      </div>
      <Button quantum variant="quantum-frost">Interact</Button>
    </div>
  );
};

export default function Home() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark');
  };

  // Background orbs for decorative effect
  const BackgroundOrbs = () => (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
      <div className="quantum-orb" style={{ 
        '--orb-color-1': '#3B7EF6', 
        '--orb-color-2': '#5B6EF6',
        width: '500px', 
        height: '500px', 
        top: '-100px', 
        left: '-100px' 
      } as React.CSSProperties}></div>
      <div className="quantum-orb" style={{ 
        '--orb-color-1': '#9A5CFF', 
        '--orb-color-2': '#7A5CFF',
        width: '600px', 
        height: '600px', 
        bottom: '-200px', 
        right: '-100px' 
      } as React.CSSProperties}></div>
    </div>
  );

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <BackgroundOrbs />
      <div className="min-h-screen bg-background text-foreground">
        <Header theme={theme} toggleTheme={toggleTheme} />
        
        <div className="container-xl">
          <DemoSection title="Welcome to AuraGlyph Design System">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <p className="text-xl mb-6 text-foreground/80">
                  AuraGlyph is a next-generation quantum design system that evolves from glassmorphism into a responsive, 
                  conscious design organism.
                </p>
                <p className="mb-6 text-muted-foreground">
                  This demo showcases the React implementation of the AuraGlyph components, featuring quantum materials, 
                  entanglement effects, and responsive interactions.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button quantum variant="quantum">Get Started</Button>
                  <Button quantum variant="quantum-frost">Documentation</Button>
                  <Button variant="outline">GitHub</Button>
                </div>
              </div>
              <Card quantum variant="nebula" className="h-full flex flex-col justify-center">
                <CardHeader>
                  <CardTitle>Defining the future of UI</CardTitle>
                  <CardDescription>2025-2035 design language</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Experience interactivity beyond traditional UI paradigms with quantum effects, material properties, and entangled components.</p>
                </CardContent>
                <CardFooter>
                  <Button quantum variant="quantum-crystal">Learn More</Button>
                </CardFooter>
              </Card>
            </div>
          </DemoSection>

          <DemoSection title="Quantum Buttons" id="buttons">
            <Tabs defaultValue="variants">
              <TabsList className="mb-6">
                <TabsTrigger value="variants">Variants</TabsTrigger>
                <TabsTrigger value="materials">Materials</TabsTrigger>
                <TabsTrigger value="properties">Properties</TabsTrigger>
              </TabsList>
              <TabsContent value="variants">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>Quantum Variants</CardTitle>
                      <CardDescription>Enhanced button styles with quantum effects</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-4">
                      <Button quantum variant="quantum">Default Quantum</Button>
                      <Button quantum variant="quantum-nebula">Nebula</Button>
                      <Button quantum variant="quantum-frost">Frost</Button>
                      <Button quantum variant="quantum-crystal">Crystal</Button>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Traditional Variants</CardTitle>
                      <CardDescription>Standard button styles</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-4">
                      <Button variant="default">Default</Button>
                      <Button variant="destructive">Destructive</Button>
                      <Button variant="outline">Outline</Button>
                      <Button variant="secondary">Secondary</Button>
                      <Button variant="ghost">Ghost</Button>
                      <Button variant="link">Link</Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="materials">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>Material Properties</CardTitle>
                      <CardDescription>Different quantum material effects</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex flex-wrap gap-4">
                        <Button quantum variant="quantum">Glass</Button>
                        <Button quantum variant="quantum-nebula">Nebula</Button>
                        <Button quantum variant="quantum-frost">Frost</Button>
                        <Button quantum variant="quantum-crystal">Crystal</Button>
                      </div>
                      <div className="flex flex-wrap gap-4">
                        <Button quantum variant="quantum" depth="shallow">Shallow</Button>
                        <Button quantum variant="quantum" depth="medium">Medium</Button>
                        <Button quantum variant="quantum" depth="deep">Deep</Button>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Luminance & Clarity</CardTitle>
                      <CardDescription>Control the visual properties</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex flex-wrap gap-4">
                        <Button quantum variant="quantum" luminance="low">Low Luminance</Button>
                        <Button quantum variant="quantum" luminance="medium">Medium</Button>
                        <Button quantum variant="quantum" luminance="high">High</Button>
                      </div>
                      <div className="flex flex-wrap gap-4">
                        <Button quantum variant="quantum-frost" clarity="low">Low Clarity</Button>
                        <Button quantum variant="quantum-frost" clarity="medium">Medium</Button>
                        <Button quantum variant="quantum-frost" clarity="high">High</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="properties">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>Sizes & Animations</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex flex-wrap gap-4 items-center">
                        <Button quantum variant="quantum" size="sm">Small</Button>
                        <Button quantum variant="quantum">Default</Button>
                        <Button quantum variant="quantum" size="lg">Large</Button>
                      </div>
                      <div className="flex flex-wrap gap-4">
                        <Button quantum variant="quantum" animate={false}>No Animation</Button>
                        <Button quantum variant="quantum" className="animate-quantum-pulse">Pulse</Button>
                        <Button quantum variant="quantum" className="animate-quantum-breathe">Breathe</Button>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Interactive Demo</CardTitle>
                      <CardDescription>Click buttons to see energy transfer</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <p>Click to see quantum interactions:</p>
                        <div className="flex justify-center gap-4">
                          <Button 
                            quantum 
                            variant="quantum-nebula" 
                            quantumId="demo-button-1"
                            entanglement={["demo-button-2"]}
                          >
                            Primary Entangled
                          </Button>
                          <Button 
                            quantum 
                            variant="quantum-frost" 
                            quantumId="demo-button-2"
                            entanglement={["demo-button-1"]}
                          >
                            Secondary Entangled
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </DemoSection>

          <DemoSection title="Quantum Cards" id="cards">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card quantum variant="glass">
                <CardHeader>
                  <CardTitle>Quantum Glass</CardTitle>
                  <CardDescription>A card with quantum glass material</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>This card uses the quantum glass material effect. Hover over it to see the energy level change.</p>
                </CardContent>
                <CardFooter>
                  <Button quantum variant="quantum-nebula">Action</Button>
                </CardFooter>
              </Card>

              <Card quantum variant="nebula" depth="medium">
                <CardHeader>
                  <CardTitle>Nebula Variant</CardTitle>
                  <CardDescription>Space-inspired nebula effect</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>This card uses the nebula material with medium depth. It creates a cosmic-inspired effect.</p>
                </CardContent>
                <CardFooter>
                  <Button quantum variant="quantum-frost">Action</Button>
                </CardFooter>
              </Card>

              <Card quantum variant="frost" clarity="high">
                <CardHeader>
                  <CardTitle>Frost Variant</CardTitle>
                  <CardDescription>Crystal clear frost effect</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>This card uses the frost material with high clarity. Notice the crisp, icy appearance.</p>
                </CardContent>
                <CardFooter>
                  <Button quantum variant="quantum-crystal">Action</Button>
                </CardFooter>
              </Card>

              <Card quantum variant="crystal" luminance="high">
                <CardHeader>
                  <CardTitle>Crystal Variant</CardTitle>
                  <CardDescription>Highly luminous crystal</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>This card uses the crystal material with high luminance. See how it glows with energy.</p>
                </CardContent>
                <CardFooter>
                  <Button quantum variant="quantum">Action</Button>
                </CardFooter>
              </Card>
            </div>
            
            <div className="mt-12">
              <h3 className="text-xl font-bold mb-6">Quantum Entanglement</h3>
              <p className="mb-4">These cards are entangled. Interact with one to affect the other.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card 
                  quantum 
                  variant="nebula" 
                  quantumId="card-1"
                  entanglement={["card-2"]}
                >
                  <CardHeader>
                    <CardTitle>Entangled Card 1</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>This card is entangled with Card 2. Hover or click to see the effect.</p>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      quantum 
                      variant="quantum-frost"
                      quantumId="button-1"
                      entanglement={["button-2"]}
                    >
                      Entangled Button 1
                    </Button>
                  </CardFooter>
                </Card>

                <Card 
                  quantum 
                  variant="frost" 
                  quantumId="card-2"
                  entanglement={["card-1"]}
                >
                  <CardHeader>
                    <CardTitle>Entangled Card 2</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>This card is entangled with Card 1. Hover or click to see the effect.</p>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      quantum 
                      variant="quantum-nebula"
                      quantumId="button-2"
                      entanglement={["button-1"]}
                    >
                      Entangled Button 2
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </DemoSection>

          <DemoSection title="Quantum Inputs" id="inputs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Regular Inputs</h3>
                <Input placeholder="Default input" className="mb-2" />
                <Input placeholder="Disabled input" disabled className="mb-2" />
                <Input placeholder="With icon" type="email" className="mb-2" />
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Quantum Inputs</h3>
                <Input quantum variant="quantum" placeholder="Quantum input" className="mb-2" />
                <Input quantum variant="frost" placeholder="Frost input" className="mb-2" />
                <Input quantum variant="nebula" placeholder="Nebula input" className="mb-2" />
                <Input quantum variant="crystal" clarity="high" placeholder="Crystal input" className="mb-2" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
              <div className="space-y-6">
                <h3 className="text-lg font-medium">Regular Toggle</h3>
                <div className="flex items-center justify-between">
                  <span>Default Toggle</span>
                  <Toggle aria-label="Toggle example" />
                </div>
                <div className="flex items-center justify-between">
                  <span>Default Checked</span>
                  <Toggle aria-label="Toggle checked" defaultChecked />
                </div>
              </div>
              <div className="space-y-6">
                <h3 className="text-lg font-medium">Quantum Toggle</h3>
                <div className="flex items-center justify-between">
                  <span>Quantum Toggle</span>
                  <Toggle quantum variant="quantum" aria-label="Quantum toggle" />
                </div>
                <div className="flex items-center justify-between">
                  <span>Frost Toggle</span>
                  <Toggle quantum variant="frost" aria-label="Frost toggle" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span>Nebula Toggle</span>
                  <Toggle quantum variant="nebula" aria-label="Nebula toggle" />
                </div>
                <div className="flex items-center justify-between">
                  <span>Crystal Toggle (Fast)</span>
                  <Toggle 
                    quantum 
                    variant="crystal" 
                    transitionSpeed="fast" 
                    aria-label="Crystal toggle" 
                    defaultChecked 
                  />
                </div>
              </div>
            </div>
          </DemoSection>
          
          <DemoSection title="Quantum Modals" id="modals">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="text-lg font-medium mb-4">Modal Variants</h3>
                <div className="space-y-4">
                  <Modal>
                    <ModalTrigger asChild>
                      <Button quantum variant="quantum">Open Quantum Modal</Button>
                    </ModalTrigger>
                    <ModalContent quantum variant="quantum">
                      <ModalHeader>
                        <ModalTitle>Quantum Modal</ModalTitle>
                        <ModalDescription>This is a modal with quantum effects.</ModalDescription>
                      </ModalHeader>
                      <div className="p-6">
                        <p>Experience the depth and responsiveness of quantum materials in dialog form.</p>
                      </div>
                      <ModalFooter>
                        <Button variant="outline">Cancel</Button>
                        <Button quantum variant="quantum">Continue</Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
                  
                  <Modal>
                    <ModalTrigger asChild>
                      <Button quantum variant="quantum-frost">Open Frost Modal</Button>
                    </ModalTrigger>
                    <ModalContent quantum variant="frost" depth="deep">
                      <ModalHeader>
                        <ModalTitle>Frost Modal</ModalTitle>
                        <ModalDescription>This modal uses the frost quantum material.</ModalDescription>
                      </ModalHeader>
                      <div className="p-6">
                        <p>Experience the crisp, icy feel of the frost material with deep depth setting.</p>
                        <div className="mt-4">
                          <Input quantum variant="frost" placeholder="Frost input example" />
                        </div>
                      </div>
                      <ModalFooter>
                        <Button variant="outline">Cancel</Button>
                        <Button quantum variant="quantum-frost">Continue</Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">Immersive Modal</h3>
                <Modal>
                  <ModalTrigger asChild>
                    <Button quantum variant="quantum-nebula">Open Immersive Modal</Button>
                  </ModalTrigger>
                  <ModalContent 
                    quantum 
                    variant="immersive" 
                    luminance="high"
                    size="lg"
                  >
                    <ModalHeader>
                      <ModalTitle>Immersive Experience</ModalTitle>
                      <ModalDescription>A full immersive quantum modal experience.</ModalDescription>
                    </ModalHeader>
                    <div className="p-6">
                      <p className="mb-4">This modal creates a truly immersive quantum experience with high luminance.</p>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <Input quantum variant="nebula" placeholder="Name" />
                        <Input quantum variant="nebula" placeholder="Email" />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Toggle quantum variant="nebula" defaultChecked />
                        <span>Enable quantum notifications</span>
                      </div>
                    </div>
                    <ModalFooter>
                      <Button variant="outline">Cancel</Button>
                      <Button quantum variant="quantum-nebula">Submit</Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </div>
            </div>
          </DemoSection>

          <DemoSection title="Custom Components">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <CustomQuantumElement />
              <div className="quantum-glass p-6 rounded-lg">
                <h3 className="text-xl font-medium mb-4">CSS Utility Classes</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="quantum-glass p-2 rounded-md">quantum-glass</div>
                  <div className="quantum-nebula p-2 rounded-md">quantum-nebula</div>
                  <div className="quantum-frost p-2 rounded-md">quantum-frost</div>
                  <div className="quantum-crystal p-2 rounded-md">quantum-crystal</div>
                  <div className="quantum-glass quantum-depth-3 p-2 rounded-md">quantum-depth-3</div>
                  <div className="quantum-glass quantum-luminance-high p-2 rounded-md">quantum-luminance-high</div>
                  <div className="quantum-glass animate-quantum-pulse p-2 rounded-md">animate-quantum-pulse</div>
                  <div className="quantum-glass animate-quantum-breathe p-2 rounded-md">animate-quantum-breathe</div>
                </div>
              </div>
            </div>
          </DemoSection>
        </div>
        
        <footer className="py-12 mt-12 border-t border-border/20">
          <div className="container-xl text-center">
            <p className="text-muted-foreground">AuraGlyph Design System — Defining the visual, spatial and ethical language of 2025-2035</p>
            <div className="mt-6 flex justify-center space-x-4">
              <Button variant="ghost" size="sm">Documentation</Button>
              <Button variant="ghost" size="sm">GitHub</Button>
              <Button variant="ghost" size="sm">Examples</Button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}