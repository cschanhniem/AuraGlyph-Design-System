#!/bin/bash

# AuraGlyph Demo Setup Script
# This script helps set up and run demos for AuraGlyph design system

# Text formatting
BOLD='\033[1m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

echo -e "${BOLD}AuraGlyph Demo Setup${NC}\n"
echo -e "This script will help you set up and run the AuraGlyph demos."

# Function to check if command exists
command_exists() {
  command -v "$1" >/dev/null 2>&1
}

# Check for required dependencies
echo -e "\n${BLUE}Checking dependencies...${NC}"

if ! command_exists node; then
  echo -e "${YELLOW}Node.js is not installed. Please install Node.js v16 or higher.${NC}"
  exit 1
fi

NODE_VERSION=$(node -v | cut -d 'v' -f 2 | cut -d '.' -f 1)
if [ "$NODE_VERSION" -lt 16 ]; then
  echo -e "${YELLOW}Node.js version is too old. Please upgrade to v16 or higher.${NC}"
  exit 1
fi

echo -e "Node.js $(node -v) ✓"
echo -e "npm $(npm -v) ✓"

# Setup Web Components demo
setup_web_components() {
  echo -e "\n${BLUE}Setting up Web Components demo...${NC}"
  cd "$(dirname "$0")/web-components" || exit
  
  echo "Installing dependencies..."
  npm install

  echo -e "${GREEN}Web Components demo setup complete!${NC}"
  echo -e "To run the Web Components demo:"
  echo -e "  cd $(dirname "$0")/web-components"
  echo -e "  node server.js"
  echo -e "Then open http://localhost:3000 in your browser."
}

# Setup React demo
setup_react_demo() {
  echo -e "\n${BLUE}Setting up React demo...${NC}"
  
  # First install React components dependencies
  echo "Installing React components dependencies..."
  cd "$(dirname "$0")/../react-components" || exit
  npm install
  
  # Then set up the demo app
  echo "Installing demo app dependencies..."
  cd "$(dirname "$0")/../demo-app" || exit
  npm install

  echo -e "${GREEN}React demo setup complete!${NC}"
  echo -e "To run the React demo:"
  echo -e "  cd $(dirname "$0")/../demo-app"
  echo -e "  npm run dev"
  echo -e "Then open http://localhost:3000 in your browser."
}

# Ask which demo to setup
echo -e "\n${BLUE}Which demo would you like to set up?${NC}"
echo "1) Web Components demo"
echo "2) React demo"
echo "3) Both demos"
read -p "Enter your choice (1-3): " demo_choice

case $demo_choice in
  1)
    setup_web_components
    ;;
  2)
    setup_react_demo
    ;;
  3)
    setup_web_components
    setup_react_demo
    ;;
  *)
    echo -e "${YELLOW}Invalid choice. Exiting.${NC}"
    exit 1
    ;;
esac

echo -e "\n${GREEN}Setup complete!${NC}"
echo -e "Follow the instructions above to run your chosen demo(s)."
echo -e "For more information, refer to the README files in each project directory."