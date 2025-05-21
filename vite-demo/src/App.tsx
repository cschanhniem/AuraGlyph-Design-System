import React from 'react';
import { QuantumProvider } from '@/quantum/quantum-provider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Modal } from '@/components/ui/modal';
import { Toggle } from '@/components/ui/toggle';

function App() {
  const [modalOpen, setModalOpen] = React.useState(false);

  return (
    <QuantumProvider
      config={{
        globalAdaptivity: 0.7,
        globalEmotionalSensitivity: 0.6,
      }}
    >
      <div className="min-h-screen bg-background p-8">
        <div className="mx-auto max-w-4xl space-y-8">
          <h1 className="text-4xl font-bold text-foreground">
            Quantum UI Components
          </h1>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Buttons</h2>
            <div className="flex gap-4">
              <Button>Default Button</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="secondary">Secondary</Button>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Inputs</h2>
            <div className="flex max-w-sm flex-col gap-4">
              <Input placeholder="Type something..." />
              <Input type="password" placeholder="Password" />
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Modal</h2>
            <div className="flex gap-4">
              <Modal
                open={modalOpen}
                onOpenChange={setModalOpen}
                trigger={<Button>Open Modal</Button>}
              >
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Quantum Modal</h3>
                  <p>This modal uses quantum interactions!</p>
                  <div className="flex justify-end">
                    <Button onClick={() => setModalOpen(false)}>Close</Button>
                  </div>
                </div>
              </Modal>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Toggle</h2>
            <div className="flex gap-4">
              <Toggle>Default Toggle</Toggle>
              <Toggle variant="outline">Outline Toggle</Toggle>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Entangled Components</h2>
            <div className="flex gap-4">
              <Button entanglement={['input1']}>Entangled Button</Button>
              <Input
                quantumId="input1"
                placeholder="Entangled with button"
                className="max-w-[200px]"
              />
            </div>
          </section>
        </div>
      </div>
    </QuantumProvider>
  );
}

export default App;
