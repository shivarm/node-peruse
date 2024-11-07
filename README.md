<div align="center">

<h1 style="color: #3498db;">node-peruse</h1>
<a href="https://github.com/shivam-sharma7/node-peruse/actions/workflows/ci.yml"><img alt="Node.js CI" src="https://github.com/shivam-sharma7/node-peruse/actions/workflows/ci.yml/badge.svg"></a>
<a href="https://www.npmjs.com/package/node-peruse"><img alt="npm version" src="https://img.shields.io/npm/v/node-peruse"></a>
<a href="https://github.com/shivam-sharma7/node-peruse/issues"><img alt="GitHub issues" src="https://img.shields.io/github/issues/shivam-sharma7/node-peruse"></a>
<a href="./LICENSE"><img alt="GitHub license" src="https://img.shields.io/github/license/shivam-sharma7/node-peruse"></a>
 
</div>

<br/>

CLI tool designed to help Node.js developers analyze and review node.js project.

## Key Features

- Analyze project dependencies
- Check outdated dependencies

## Download/install

```bash
npm install -g node-peruse

yarn add -g node-peruse

```

Once installed, you can use node-peruse directly in your terminal.

```bash
node-peruse <command> [options]
```

## Documentation

### 1. Analyze project dependencies

Use the `--dependencies` option to analyze and list all dependencies in your project.

```bash
node-peruse --dependencies
```

### 2. Check outdated dependencies

To check for outdated packages in your project, use the `--outdated` flag.

```bash
node-peruse --outdated
```

## Using Node-Peruse with npx

To run Node-Peruse without installing it globally, users can simply use:

```bash
npx node-peruse <command> [options]
```

mean you can remove `node-peruse` with `npx` and run the command directly and it will work the same way.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for more information on how to contribute to node-peruse.

## Support

- Give a ⭐️ if this project helped you!
- You can also sponsor me on [Github](https://github.com/sponsors/shivam-sharma7)
