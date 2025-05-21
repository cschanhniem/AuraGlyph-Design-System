# Contributing to Quantum UI

We love your input! We want to make contributing to Quantum UI as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

## Development Process

We use GitHub to host code, to track issues and feature requests, as well as accept pull requests.

1. Fork the repo and create your branch from `main`.
2. If you've added code that should be tested, add tests.
3. If you've changed APIs, update the documentation.
4. Ensure the test suite passes.
5. Make sure your code lints.
6. Issue that pull request!

## Local Development Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/quantum-ui.git
cd quantum-ui
```

2. Install dependencies:
```bash
pnpm install
```

3. Run the setup script:
```bash
pnpm ts-node scripts/setup.ts
```

4. Start the development server:
```bash
pnpm dev
```

## Project Structure

```
react-components/
├── components/         # UI components
│   └── ui/
│       ├── button.tsx
│       ├── input.tsx
│       ├── modal.tsx
│       └── toggle.tsx
├── quantum/           # Quantum system
│   ├── quantum-provider.tsx
│   └── use-quantum.tsx
├── lib/              # Utilities
│   ├── animation-frame.ts
│   ├── quantum-plugin.ts
│   └── utils.ts
├── styles/           # CSS files
│   ├── quantum.css
│   └── quantum-theme.css
└── scripts/          # Build scripts
    └── setup.ts
```

## Component Guidelines

### 1. File Structure
```tsx
// imports
import React from 'react';
import { useQuantum } from '../../quantum/use-quantum';
import { cn } from '../../lib/utils';

// types & interfaces
interface ComponentProps {
  // ...
}

// component
export function Component({ ...props }: ComponentProps) {
  // hook calls
  const quantum = useQuantum();
  
  // component logic
  
  return (
    // JSX
  );
}
```

### 2. Naming Conventions
- Use PascalCase for component names
- Use camelCase for variables and functions
- Use kebab-case for CSS classes
- Prefix quantum-specific classes with `quantum-`

### 3. State Management
- Use quantum state for interactive elements
- Keep local state minimal
- Document state dependencies

### 4. Styling
- Use Tailwind CSS for utility classes
- Use CSS variables for dynamic values
- Follow the quantum theme system
- Support dark mode

### 5. Documentation
- Include JSDoc comments
- Provide usage examples
- Document prop types
- Explain quantum features

## Testing

We use Jest and React Testing Library for testing. Run the test suite with:

```bash
pnpm test
```

When writing tests:
- Test quantum interactions
- Test state entanglement
- Test emotional responses
- Test accessibility
- Test dark mode

## Pull Request Process

1. Update the README.md with details of changes if needed
2. Update the CHANGELOG.md with your changes
3. The PR will be merged once you have the sign-off of maintainers

## Any Contributions You Make Will Be Under the MIT Software License
In short, when you submit code changes, your submissions are understood to be under the same [MIT License](http://choosealicense.com/licenses/mit/) that covers the project. Feel free to contact the maintainers if that's a concern.

## Report Bugs Using GitHub's [Issue Tracker](https://github.com/yourusername/quantum-ui/issues)

### Bug Report Format
```md
**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected behavior**
A clear and concise description of what you expected to happen.

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Environment:**
 - OS: [e.g. iOS]
 - Browser: [e.g. chrome, safari]
 - Version: [e.g. 22]
```

## License
By contributing, you agree that your contributions will be licensed under its MIT License.

## References
This document was adapted from the open-source contribution guidelines for [Facebook's Draft](https://github.com/facebook/draft-js/blob/a9316a723f9e918afde44dea68b5f9f39b7d9b00/CONTRIBUTING.md).
