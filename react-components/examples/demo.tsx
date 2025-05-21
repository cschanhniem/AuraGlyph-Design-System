import React, { useState } from 'react';
import { 
  Button, 
  Card, 
  CardHeader, 
  CardContent, 
  CardFooter, 
  CardTitle, 
  CardDescription,
  Modal,
  ModalTrigger,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalTitle,
  ModalDescription,
  Input,
  Toggle,
  QuantumProvider,
  useQuantum,
  useGlobalQuantum
} from '@auraglyph/react';

const DemoSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <section className="mb-12">
    <h2 className="text-2xl font-bold mb-4 border-b pb-2">{title}</h2>
    <div className="p-4 bg-black/5 dark:bg-white/5 rounded-lg">
      {children}
    </div>
  </section>
);

// Custom component using useQuantum hook
const CustomQuantumElement = () => {
  const { 
    ref, 
    phase, 
    energy, 
    cssVariables,
    pulse,
    emitInteraction
  } = useQuantum({
    id: 'custom-element',
    onInteraction: (state) => {
      console.log('Interaction detected:', state);
    }
  });

  return (
    <div 
      ref={ref} 
      style={cssVariables as React.CSSProperties}
      className="quantum-glass p-6 rounded-lg text-center cursor-pointer transition-all"
      onClick={() => pulse(1.0)}
    >
      <h3 className="font-medium mb-2">Custom Quantum Element</h3>
      <div className="flex justify-center space-x-4">
        <div>Phase: {phase.toFixed(2)}</div>
        <div>Energy: {energy.toFixed(2)}</div>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">Click me to pulse!</p>
    </div>
  );
};

// Component to control global quantum state
const QuantumController = () => {
  const { state, setGlobalEnergy, setGlobalPhase } = useGlobalQuantum();
  
  return (
    <div className="p-4 border rounded-lg">
      <h3 className="font-medium mb-4">Quantum System Controller</h3>
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span>Global Energy: {state.energyLevel.toFixed(2)}</span>
          <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.01" 
            value={state.energyLevel} 
            onChange={(e) => setGlobalEnergy(parseFloat(e.target.value))}
            className="w-64"
          />
        </div>
        <div className="flex items-center justify-between">
          <span>Global Phase: {state.phase.toFixed(2)}</span>
          <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.01" 
            value={state.phase} 
            onChange={(e) => setGlobalPhase(parseFloat(e.target.value))}
            className="w-64"
          />
        </div>
      </div>
      <div className="flex space-x-2">
        <Button onClick={() => setGlobalEnergy(1.0)}>Max Energy</Button>
        <Button onClick={() => setGlobalEnergy(0.5)}>Reset Energy</Button>
        <Button onClick={() => setGlobalPhase(Math.random())}>Random Phase</Button>
      </div>
    </div>
  );
};

// Main Demo Component
export default function AuraGlyphDemo() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark');
  };

  return (
    <QuantumProvider 
      options={{ 
        adaptability: 0.7,
        quantumEffectsLevel: 'standard',
        debug: true
      }}
    >
      <div className={theme === 'dark' ? 'dark' : ''}>
        <div className="min-h-screen bg-background text-foreground p-8">
          <header className="mb-12 flex justify-between items-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              AuraGlyph Design System
            </h1>
            <Button onClick={toggleTheme} variant="outline">
              {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
            </Button>
          </header>

          <DemoSection title="Quantum Buttons">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <Button quantum variant="quantum">Default Quantum</Button>
              <Button quantum variant="quantum-nebula">Nebula</Button>
              <Button quantum variant="quantum-frost">Frost</Button>
              <Button quantum variant="quantum-crystal">Crystal</Button>
              <Button quantum variant="quantum" depth="deep" luminance="high">Deep Luminous</Button>
              <Button quantum variant="quantum-nebula" animate={false}>No Animation</Button>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button variant="default">Regular</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </div>
          </DemoSection>

          <DemoSection title="Quantum Cards">
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
          </DemoSection>

          <DemoSection title="Quantum Entanglement">
            <div className="mb-6">
              <p className="mb-4">These components are entangled. Interact with one to affect the other.</p>
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

          <DemoSection title="Custom Quantum Hook Usage">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CustomQuantumElement />
              <QuantumController />
            </div>
          </DemoSection>

          <DemoSection title="Quantum Input">
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
          </DemoSection>
          
          <DemoSection title="Quantum Toggle">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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
          
          <DemoSection title="Quantum Modal">
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

          <DemoSection title="CSS Utility Classes">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="quantum-glass p-4 rounded-lg">quantum-glass</div>
              <div className="quantum-nebula p-4 rounded-lg">quantum-nebula</div>
              <div className="quantum-frost p-4 rounded-lg">quantum-frost</div>
              <div className="quantum-crystal p-4 rounded-lg">quantum-crystal</div>
              <div className="quantum-glass quantum-depth-3 p-4 rounded-lg">quantum-depth-3</div>
              <div className="quantum-glass quantum-luminance-high p-4 rounded-lg">quantum-luminance-high</div>
              <div className="quantum-glass animate-quantum-pulse p-4 rounded-lg">animate-quantum-pulse</div>
              <div className="quantum-glass animate-quantum-breathe p-4 rounded-lg">animate-quantum-breathe</div>
              <div className="quantum-glass animate-quantum-glow p-4 rounded-lg">animate-quantum-glow</div>
            </div>
          </DemoSection>
        </div>
      </div>
    </QuantumProvider>
  );
}