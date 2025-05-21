#!/bin/bash

# AuraGlyph Vite Demo Setup Script
# This script helps set up and run the AuraGlyph Vite demo

# Text formatting
BOLD='\033[1m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[0;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BOLD}AuraGlyph Vite Demo Setup${NC}\n"
echo -e "This script will help you set up and run the AuraGlyph Vite demo."

# Function to check if command exists
command_exists() {
  command -v "$1" >/dev/null 2>&1
}

# Check for required dependencies
echo -e "\n${BLUE}Checking dependencies...${NC}"

if ! command_exists node; then
  echo -e "${RED}Node.js is not installed. Please install Node.js v16 or higher.${NC}"
  exit 1
fi

NODE_VERSION=$(node -v | cut -d 'v' -f 2 | cut -d '.' -f 1)
if [ "$NODE_VERSION" -lt 16 ]; then
  echo -e "${YELLOW}Node.js version is too old. Please upgrade to v16 or higher.${NC}"
  exit 1
fi

echo -e "Node.js $(node -v) ✓"
echo -e "npm $(npm -v) ✓"
if command_exists pnpm; then
  echo -e "pnpm $(pnpm -v) ✓"
  PACKAGE_MANAGER="pnpm"
elif command_exists yarn; then
  echo -e "yarn $(yarn -v) ✓"
  PACKAGE_MANAGER="yarn"
else
  PACKAGE_MANAGER="npm"
fi

# Setup React components first (required for the Vite demo)
echo -e "\n${BLUE}Setting up AuraGlyph React components...${NC}"
cd "$(dirname "$0")/../react-components" || {
  echo -e "${RED}Could not find the React components directory!${NC}"
  exit 1
}

echo "Installing React components dependencies using ${PACKAGE_MANAGER}..."
$PACKAGE_MANAGER install || {
  echo -e "${RED}Failed to install React components dependencies.${NC}"
  exit 1
}

# Now set up the Vite demo
echo -e "\n${BLUE}Setting up Vite demo...${NC}"
cd "$(dirname "$0")" || {
  echo -e "${RED}Could not find the Vite demo directory!${NC}"
  exit 1
}

echo "Installing Vite demo dependencies using ${PACKAGE_MANAGER}..."
$PACKAGE_MANAGER install || {
  echo -e "${RED}Failed to install Vite demo dependencies.${NC}"
  exit 1
}

# Setup complete
echo -e "\n${GREEN}Setup complete!${NC}"
echo -e "To run the Vite demo:"
echo -e "  cd $(pwd)"
echo -e "  ${PACKAGE_MANAGER} run dev"
echo -e "Then open ${BOLD}http://localhost:5173${NC} in your browser."
echo -e "\n${BLUE}Important Notes:${NC}"
echo -e "1. This is a pure client-side application with no server-side rendering,"
echo -e "   avoiding any React Server Component conflicts that occur with Next.js."
echo -e "2. The demo directly imports components from the react-components directory,"
echo -e "   rather than using a packaged library approach."
echo -e "3. If you encounter any module resolution errors, try running ${PACKAGE_MANAGER} install again."