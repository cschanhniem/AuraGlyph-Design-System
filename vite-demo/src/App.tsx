import React from 'react';
import { QuantumProvider } from '@/quantum/quantum-provider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Toggle } from '@/components/ui/toggle';
import { Progress } from '@/components/ui/progress';

function App() {
  const [progress, setProgress] = React.useState(30);

  // Simulate progress increase
  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <QuantumProvider
      config={{
        globalAdaptivity: 0.7,
        globalEmotionalSensitivity: 0.6,
      }}
    >
      <div className="min-h-screen bg-background p-8">
        <div className="mx-auto max-w-4xl space-y-12">
          <header className="space-y-2">
            <h1 className="text-4xl font-bold text-foreground">
              AuraGlyph UI Components
            </h1>
            <p className="text-muted-foreground">
              A showcase of quantum-inspired UI components with advanced interactions
            </p>
          </header>

          {/* Buttons Section */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold border-b pb-2">Buttons</h2>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Standard Variants</h3>
              <div className="flex flex-wrap gap-4">
                <Button>Default Button</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Quantum Variants</h3>
              <div className="flex flex-wrap gap-4">
                <Button variant="quantum">Quantum</Button>
                <Button variant="nebula">Nebula</Button>
                <Button variant="crystal">Crystal</Button>
                <Button variant="frost">Frost</Button>
                <Button variant="glass">Glass</Button>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">With Quantum Effects</h3>
              <div className="flex flex-wrap gap-4">
                <Button
                  quantum
                  quantumId="quantum-button-1"
                  adaptivityLevel={0.8}
                  emotionalSensitivity={0.7}
                  animate
                >
                  Quantum Button
                </Button>
                <Button
                  variant="nebula"
                  quantum
                  adaptivityLevel={0.9}
                >
                  Adaptive Button
                </Button>
              </div>
            </div>
          </section>

          {/* Inputs Section */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold border-b pb-2">Inputs</h2>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Standard Inputs</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input placeholder="Type something..." />
                <Input type="password" placeholder="Password" />
                <Input type="email" placeholder="Email" />
                <Input type="number" placeholder="Number" />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Quantum Inputs</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  quantum
                  adaptivityLevel={0.6}
                  placeholder="Quantum Input"
                />
                <Input
                  quantum
                  variant="frost"
                  placeholder="Frost Input"
                />
                <Input
                  quantum
                  variant="crystal"
                  placeholder="Crystal Input"
                />
                <Input
                  quantum
                  variant="nebula"
                  placeholder="Nebula Input"
                />
              </div>
            </div>
          </section>

          {/* Progress Section */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold border-b pb-2">Progress</h2>

            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Standard Progress</h3>
                <Progress value={progress} />
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Quantum Progress</h3>
                <Progress
                  value={progress}
                  quantum
                  variant="quantum"
                />
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Frost Progress</h3>
                <Progress
                  value={progress}
                  quantum
                  variant="frost"
                />
              </div>
            </div>
          </section>

          {/* Toggle Section */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold border-b pb-2">Toggle</h2>

            <div className="space-y-4">
              <div className="flex flex-wrap gap-4">
                <Toggle>Default Toggle</Toggle>
                <Toggle variant="outline">Outline Toggle</Toggle>
                <Toggle quantum>Quantum Toggle</Toggle>
                <Toggle quantum variant="outline">Quantum Outline</Toggle>
              </div>
            </div>
          </section>

          {/* Cards Section */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold border-b pb-2">Cards</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Default Card</CardTitle>
                  <CardDescription>Standard card component</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>This is a standard card with no quantum effects.</p>
                </CardContent>
                <CardFooter>
                  <Button>Action</Button>
                </CardFooter>
              </Card>

              <Card
                quantum
                variant="glass"
                depth="medium"
                luminance="medium"
                clarity="high"
                hoverEffect
              >
                <CardHeader>
                  <CardTitle>Quantum Glass Card</CardTitle>
                  <CardDescription>With quantum effects</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>This card has quantum glass material with hover effects.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="quantum">Quantum Action</Button>
                </CardFooter>
              </Card>

              <Card
                quantum
                variant="frost"
                depth="deep"
                luminance="high"
              >
                <CardHeader>
                  <CardTitle>Frost Card</CardTitle>
                  <CardDescription>With frost effects</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>This card has frost material with deep depth.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="frost">Frost Action</Button>
                </CardFooter>
              </Card>

              <Card
                quantum
                variant="nebula"
                depth="shallow"
              >
                <CardHeader>
                  <CardTitle>Nebula Card</CardTitle>
                  <CardDescription>With nebula effects</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>This card has nebula material with shallow depth.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="nebula">Nebula Action</Button>
                </CardFooter>
              </Card>
            </div>
          </section>

          {/* Entangled Components Section */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold border-b pb-2">Quantum Entanglement</h2>

            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Button-Input Entanglement</h3>
                <div className="flex flex-wrap gap-4 items-center">
                  <Button
                    quantum
                    variant="quantum"
                    entanglement={['input1']}
                  >
                    Entangled Button
                  </Button>
                  <Input
                    quantum
                    quantumId="input1"
                    placeholder="Entangled with button"
                    className="max-w-[200px]"
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Interact with either component to see the entanglement effect
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </QuantumProvider>
  );
}

export default App;
