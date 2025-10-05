# Contributing to CardanoVerse

Thank you for your interest in contributing to CardanoVerse! This document provides guidelines and information for contributors.

## 🤝 How to Contribute

### Reporting Bugs
- Use the GitHub issue tracker
- Describe the bug in detail
- Include steps to reproduce
- Provide system information

### Suggesting Features
- Open a GitHub issue with the "enhancement" label
- Clearly describe the feature and its benefits
- Discuss potential implementation approaches

### Pull Requests
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Write/update tests
5. Update documentation
6. Submit a pull request

## 💻 Development Setup

### Prerequisites
```bash
- Node.js v20+
- Docker & Docker Compose
- Git
- PostgreSQL 15+
```

### Getting Started
```bash
# Clone the repository
git clone https://github.com/cardanoverse/trading-cards.git
cd cardano-trading-cards

# Install dependencies
npm run install:all

# Copy environment variables
cp .env.example .env

# Start development environment
docker-compose up -d
npm run dev
```

## 📝 Code Style

### TypeScript/JavaScript
- Use TypeScript for new code
- Follow ESLint rules
- Use Prettier for formatting
- Write meaningful variable names
- Add comments for complex logic

### React Components
- Use functional components
- Implement proper TypeScript interfaces
- Keep components small and focused
- Use custom hooks for reusable logic

### Smart Contracts
- Follow Aiken best practices
- Add comprehensive comments
- Write unit tests for all validators
- Optimize for gas efficiency

## 🧪 Testing

### Frontend
```bash
cd frontend
npm run test
```

### Backend
```bash
cd backend
npm run test
```

### Smart Contracts
```bash
cd smart-contracts
aiken test
```

## 📦 Commit Guidelines

Use conventional commits:
```
feat: add new feature
fix: bug fix
docs: documentation changes
style: formatting changes
refactor: code refactoring
test: add tests
chore: maintenance tasks
```

Example:
```
feat: implement AI valuation agent
fix: resolve wallet connection issue
docs: update README with deployment instructions
```

## 🔍 Code Review Process

1. All PRs require at least one approval
2. CI/CD tests must pass
3. Code must follow style guidelines
4. Documentation must be updated
5. Breaking changes require discussion

## 📚 Documentation

- Update README.md for user-facing changes
- Update ARCHITECTURE.md for structural changes
- Add inline comments for complex code
- Update API documentation

## 🐛 Debugging

### Frontend
```bash
npm run dev
# Open browser DevTools
# Check Console and Network tabs
```

### Backend
```bash
npm run dev
# Check terminal logs
# Use debugging tools
```

### Smart Contracts
```bash
aiken check
aiken test --verbose
```

## 🚀 Deployment

Contact maintainers for deployment access.

## 📧 Contact

- **Discord**: [Join our community](https://discord.gg/cardanoverse)
- **Twitter**: [@CardanoVerse](https://twitter.com/cardanoverse)
- **Email**: dev@cardanoverse.io

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to CardanoVerse! 🎴
