# Copilot Instructions for UMD-Ad-Inventory

Welcome to the UMD-Ad-Inventory codebase! This document provides essential guidelines for AI coding agents to be productive in this project. Follow these instructions to understand the architecture, workflows, and conventions specific to this repository.

## Project Overview
UMD-Ad-Inventory is a JavaScript-based project that manages ad inventory for a platform. The codebase uses Webpack for bundling and organizes its source code under the `src/` directory. Key modules include:

- `global_init.js`: Initializes global settings and configurations.
- `modules/Newstag.js`: Handles functionality related to news tags.
- `modules/SkinAd.js`: Manages skin advertisements.

### Architecture
The project follows a modular structure:
- **Global Initialization**: `global_init.js` sets up configurations shared across modules.
- **Modules**: Each module in `src/modules/` encapsulates specific functionality, promoting separation of concerns.

### Data Flow
Data flows between modules through shared configurations and explicit imports. Modules are designed to be loosely coupled, relying on well-defined interfaces.

## Developer Workflows

### Build
The project uses Webpack for bundling. To build the project, run:
```bash
npx webpack --config webpack.config.js
```

### Debugging
Use `console.log` statements or browser developer tools to debug the JavaScript code. Ensure source maps are enabled in Webpack for easier debugging.

### Testing
Currently, no specific testing framework is integrated. Add tests as needed, following the modular structure.

## Conventions and Patterns

### Code Organization
- Place all modules under `src/modules/`.
- Use descriptive filenames that reflect the module's purpose.

### Naming Conventions
- Use `camelCase` for variables and functions.
- Use `PascalCase` for class names.

### Comments
- Document the purpose of each module at the top of the file.
- Use inline comments sparingly to explain non-obvious code.

### External Dependencies
- Webpack: Used for bundling.
- Add other dependencies to `package.json` as needed.

## Integration Points
- Ensure all modules are properly imported in `global_init.js` or other entry points.
- Follow the modular structure to add new features without disrupting existing functionality.

## Examples
### Adding a New Module
1. Create a new file in `src/modules/`, e.g., `ExampleModule.js`.
2. Export the module's functionality:
   ```javascript
   export function exampleFunction() {
       // Module logic here
   }
   ```
3. Import and use the module in `global_init.js` or another appropriate file:
   ```javascript
   import { exampleFunction } from './modules/ExampleModule';

   exampleFunction();
   ```

---

Feel free to update this document as the project evolves. If any section is unclear or incomplete, provide feedback to improve it.