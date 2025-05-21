import { execSync } from 'child_process';
import { writeFileSync, copyFileSync, existsSync, mkdirSync } from 'fs';
import { join, resolve } from 'path';

console.log('🚀 Setting up Quantum UI components...');

// Configuration files to be created
const configs = {
  tsconfig: {
    path: 'tsconfig.json',
    content: {
      compilerOptions: {
        target: "es5",
        lib: ["dom", "dom.iterable", "esnext"],
        allowJs: true,
        skipLibCheck: true,
        strict: true,
        forceConsistentCasingInFileNames: true,
        noEmit: true,
        esModuleInterop: true,
        module: "esnext",
        moduleResolution: "node",
        resolveJsonModule: true,
        isolatedModules: true,
        jsx: "preserve",
        incremental: true,
        baseUrl: ".",
        paths: {
          "@/*": ["./*"]
        }
      },
      include: ["**/*.ts", "**/*.tsx"],
      exclude: ["node_modules"]
    }
  },
  postcss: {
    path: 'postcss.config.js',
    content: `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}`
  },
  prettier: {
    path: '.prettierrc',
    content: {
      semi: true,
      singleQuote: true,
      tabWidth: 2,
      trailingComma: 'es5'
    }
  }
};

// Create necessary directories
const dirs = [
  'styles',
  'components',
  'lib',
  'quantum'
].forEach(dir => {
  const dirPath = join(process.cwd(), dir);
  if (!existsSync(dirPath)) {
    mkdirSync(dirPath, { recursive: true });
  }
});

// Write configuration files
Object.entries(configs).forEach(([name, config]) => {
  const filePath = join(process.cwd(), config.path);
  writeFileSync(
    filePath,
    typeof config.content === 'string'
      ? config.content
      : JSON.stringify(config.content, null, 2)
  );
  console.log(`✅ Created ${config.path}`);
});

// Install dependencies using the appropriate package manager
try {
  const useYarn = existsSync('yarn.lock');
  const usePnpm = existsSync('pnpm-lock.yaml');
  
  const installCmd = usePnpm 
    ? 'pnpm add' 
    : useYarn 
      ? 'yarn add' 
      : 'npm install';

  // Install dependencies
  console.log('📦 Installing dependencies...');
  execSync(`${installCmd} @radix-ui/react-dialog @radix-ui/react-slot @radix-ui/react-toggle class-variance-authority clsx tailwind-merge`, { stdio: 'inherit' });
  
  // Install dev dependencies
  console.log('📦 Installing dev dependencies...');
  execSync(`${installCmd} -D @types/node @types/react @types/react-dom autoprefixer postcss tailwindcss typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin`, { stdio: 'inherit' });

  console.log('✅ Dependencies installed successfully');
} catch (error) {
  console.error('❌ Error installing dependencies:', error);
  process.exit(1);
}

// Create index file
const indexContent = `export * from './components/ui/button';
export * from './components/ui/input';
export * from './components/ui/modal';
export * from './components/ui/toggle';
export * from './quantum/quantum-provider';
export * from './quantum/use-quantum';
`;

writeFileSync(join(process.cwd(), 'index.ts'), indexContent);
console.log('✅ Created index.ts');

console.log(`
🎉 Quantum UI setup complete! 

Next steps:
1. Import quantum styles in your app:
   import '@quantum-ui/react/styles/quantum.css';
   import '@quantum-ui/react/styles/quantum-theme.css';

2. Configure your tailwind.config.ts to use the quantum plugin:
   import { quantumPlugin } from '@quantum-ui/react/lib/quantum-plugin';
   
   export default {
     // ...other config
     plugins: [quantumPlugin],
   }

3. Wrap your app with QuantumProvider:
   import { QuantumProvider } from '@quantum-ui/react';
   
   function App() {
     return (
       <QuantumProvider>
         {/* Your app content */}
       </QuantumProvider>
     );
   }

For more information, check out the documentation at:
https://github.com/your-repo/quantum-ui
`);
