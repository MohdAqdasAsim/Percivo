# Contributing to Percivo

Thank you for your interest in contributing to **Percivo**. This project is built on the belief that accessibility tools should be open, transparent, and community-driven. Every contribution — whether it's a bug fix, a feature suggestion, or an improvement to the docs — helps make the app better for everyone who relies on it.

Please take a few minutes to read this guide before opening an issue or submitting a pull request.

## Table of Contents

- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Branch Naming](#branch-naming)
- [Commit Messages](#commit-messages)
- [Pull Request Guidelines](#pull-request-guidelines)
- [Code Style](#code-style)
- [Reporting Bugs](#reporting-bugs)
- [Requesting Features](#requesting-features)
- [Documentation Contributions](#documentation-contributions)
- [Questions & Discussions](#questions--discussions)

## Getting Started

### Prerequisites

Before contributing, ensure you have the following installed:

- **Node.js** v18 or higher
- **npm** or **yarn**
- **Expo CLI** — `npm install -g expo-cli`
- **EAS CLI** — `npm install -g eas-cli` (for builds)
- **Git**
- **Android device or emulator** for testing (Android 8.0+ / API 26+)

### Fork & Clone

```bash
# Fork the repository via GitHub, then clone your fork:
git clone https://github.com/MohdAqdasAsim/Percivo.git
cd Percivo

# Add the upstream remote:
git remote add upstream https://github.com/MohdAqdasAsim/Percivo.git
```

### Install Dependencies & Run

```bash
# Install dependencies
npm install

# Start the Expo dev server
npx expo start

# Run directly on a connected Android device or emulator
npx expo run:android
```

## Development Workflow

We follow a standard **fork-and-branch** workflow.

1. **Sync your fork** with the latest changes from `main` before starting work:

    ```bash
    git fetch upstream
    git checkout main
    git merge upstream/main
    ```

2. **Create a new branch** from `main` for your work (see [Branch Naming](#branch-naming))

3. **Make your changes** — keep them focused and atomic

4. **Write or update tests** where applicable

5. **Run the test suite** locally before pushing:

    ```bash
    npx jest
    # With coverage:
    npx jest --coverage
    ```

6. **Push your branch** and open a Pull Request

## Branch Naming

Use the following naming convention for all branches:

| Type | Pattern | Example |
|------|---------|---------|
| New feature | `feature/short-description` | `feature/hybrid-mode` |
| Bug fix | `fix/short-description` | `fix/lens-drag-offset` |
| Documentation | `docs/short-description` | `docs/update-readme` |
| Refactor | `refactor/short-description` | `refactor/overlay-service` |
| Release | `release/version` | `release/1.1.0` |
| Hotfix | `hotfix/short-description` | `hotfix/crash-on-launch` |

Branch names must be lowercase, use hyphens (no underscores or spaces), and be concise but descriptive.

## Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <short summary>
```

### Types

| Type | Use for |
|------|---------|
| `feat` | A new feature |
| `fix` | A bug fix |
| `docs` | Documentation changes only |
| `style` | Formatting, missing semicolons — no logic change |
| `refactor` | Code restructuring — no feature or fix |
| `test` | Adding or updating tests |
| `chore` | Build process, dependency updates, tooling |

### Examples

```
feat(lens): add pinch-to-zoom gesture support
fix(overlay): correct lens position offset on high-DPI screens
docs(readme): add installation instructions for APK sideloading
refactor(service): extract magnification logic into dedicated class
```

## Pull Request Guidelines

Before opening a PR, please confirm the following:

- [ ] The branch is up to date with `upstream/main`
- [ ] The code builds without errors
- [ ] All existing tests pass
- [ ] New functionality is covered by tests where appropriate
- [ ] Code follows the project's style conventions
- [ ] The PR description explains **what** was changed and **why**
- [ ] Relevant issues are referenced (e.g., `Closes #42`)

### PR Description Template

When opening a pull request, please include:

```
## Summary
<!-- What does this PR do? -->

## Changes
<!-- List the key changes made -->

## Related Issue
<!-- Closes #ISSUE_NUMBER -->

## Testing
<!-- How was this tested? Include device/API level if relevant -->

## Screenshots (if applicable)
<!-- Before/After if UI was changed -->
```

Pull requests are reviewed by maintainers. Feedback will be provided constructively — please be patient, as reviews may take a few days.

## Code Style

Percivo is built with **Expo React Native** and **TypeScript**. Please follow the conventions below.

### General

- Follow standard [TypeScript best practices](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)
- Use **2-space indentation** (no tabs)
- Maximum line length: **100 characters**
- Prefer **arrow functions** for components and callbacks
- Use **meaningful, descriptive names** for variables, functions, and components

### React Native / Expo Specific

- Use **functional components** with hooks — no class components
- Follow a **feature-based folder structure** (group by feature, not type)
- Prefer **React Query or Zustand** for state management where applicable
- Avoid inline styles — use `StyleSheet.create()` or a styling utility
- Use **typed props** with TypeScript interfaces for all components
- Avoid hardcoded strings — centralize in a `constants/` or `i18n/` module

### Linting & Formatting

The project uses **ESLint** and **Prettier**. Run before submitting:

```bash
# Check for lint errors
npx eslint .

# Auto-fix lint issues
npx eslint . --fix

# Format with Prettier
npx prettier --write .
```

## Reporting Bugs

If you've found a bug, please [open an issue](https://github.com/percivo/percivo/issues/new?template=bug_report.md) and include:

- **Device model** and **Android version**
- **Percivo version** (visible in app settings)
- **Steps to reproduce** the issue
- **Expected behavior**
- **Actual behavior**
- **Logs or screenshots** if available (use `adb logcat` to capture logs)

Please search existing issues before filing a new one — duplicates slow down triage.

## Requesting Features

We welcome feature requests. Before submitting, please:

1. Check the [Roadmap](README.md#roadmap) to see if it's already planned
2. Search [existing issues](https://github.com/percivo/percivo/issues) for similar requests
3. If not present, [open a feature request](https://github.com/percivo/percivo/issues/new?template=feature_request.md)

In your request, describe:

- **The problem** you're trying to solve
- **The proposed solution**
- **Any alternatives** you've considered
- **Who would benefit** from this feature

## Documentation Contributions

Documentation improvements are always welcome:

- Fixing typos or unclear explanations
- Improving the README
- Adding examples or usage scenarios
- Translating documentation

For small fixes, open a PR directly. For larger documentation changes, open an issue first to discuss the approach.

## Questions & Discussions

For general questions, ideas, or open-ended discussion, use [GitHub Discussions](https://github.com/percivo/percivo/discussions) rather than issues. Issues are reserved for bugs and actionable feature requests.

## Thank You

Open-source projects thrive because of people who care. Whether you're fixing a typo, adding a feature, or helping another user in discussions — every contribution matters.

We're glad you're here.