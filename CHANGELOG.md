# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.8.4] - 2025-08-29
### Fixed
- Resolved issues with the **Stencil plugin**. By @Graphmaxer ([#15](https://github.com/Kamiapp-fr/vite-plugin-cem/issues/15))

## [0.8.3] - 2025-07-01
### Fixed
- Resolved **Windows path resolution** issue. By @JamesIves ([#13](https://github.com/Kamiapp-fr/vite-plugin-cem/issues/13))
- Upgraded dev dependencies for improved stability and compatibility.

## [0.8.2] - 2025-01-10
### Fixed
- Upgrades dependencies:
  - @custom-elements-manifest/analyzer to **0.10.4**
  - typescript to **5.7.3**
- Marked `vite` as a `peerDependency`.

## [0.8.1] - 2024-06-24
### Fixed
- Upgrades dependencies:
  - @custom-elements-manifest/analyzer to **0.10.2**
  - typescript to **5.5.2**
  - vite to **5.3.1**

## [0.8.0] - 2024-03-22
### Added
- Add support for the [custom-elements-manifest.config.mjs](https://custom-elements-manifest.open-wc.org/analyzer/config/#config-file) configuration file. ([#10](https://github.com/Kamiapp-fr/vite-plugin-cem/issues/10))

## [0.7.0] - 2024-03-01
### Added
- Introducing the `overrideModuleCreation` option for personalized [sourceFile creation](https://custom-elements-manifest.open-wc.org/analyzer/plugins/authoring/#overriding-sourcefile-creation). ([#8](https://github.com/Kamiapp-fr/vite-plugin-cem/issues/8))

## [0.6.0] - 2023-11-23
### Added
- Introduced virtual import for the `custom-elements.json`, allowing seamless integration into your codebase. ([#6](https://github.com/Kamiapp-fr/vite-plugin-cem/issues/6))

### Changed
- Upgrade `vite` to v5.0.2

## [0.5.0] - 2023-02-13
### Added
- Add an option to add path of the manifest into the `package.json` file. By @ozee ([#3](https://github.com/Kamiapp-fr/vite-plugin-cem/issues/3))
- Allow the utilization of patterns within the `files` option. ([#5](https://github.com/Kamiapp-fr/vite-plugin-cem/issues/5))

## [0.4.0] - 2022-12-15
### Changed
- Upgrade `vite` to v4.0.1

## [0.3.0] - 2022-08-01
### Changed
- Upgrade `vite` to v3.0.4
- Upgrade `@custom-elements-manifest/analyzer` to v0.6.3

### Fixed
- Fixed typescript error due to old version of vite. ([#1](https://github.com/Kamiapp-fr/vite-plugin-cem/issues/1))

## [0.2.0] - 2022-05-31
### Added
- Adds support for `@custom-elements-manifest/analyzer` plugins. Get more information about these plugins [here](https://custom-elements-manifest.open-wc.org/analyzer/plugins/intro/).

## [0.1.2] - 2022-04-28
### Fixed
- Fixs the install error. This error was due to the postinstall script which try to install the example project but this was not into the npm package.

## [0.1.1] - 2022-04-28
### Fixed
- Fix error on build when dist output folder isn't create.

## [0.1.0] - 2022-04-28
### Added
- Add these options :
  - **endpoint:** Define where will be serve the manifest.
  - **output:** Define where will be build the final manifest.
  - **files:** Register files which will be used to build the manifest.
  - **lit:** Use the lit plugin to parse files
  - **fast:** Use the fast plugin to parse files
  - **stencil:** Use the stencil plugin to parse files
  - **catalyst:** Use the catalyst plugin to parse files
  - **dev:** Run the builder in dev mode.
- In `development` serve the manifest and rebuild it on the fly.
- In `production` build the final manifest.

[Unreleased]: https://github.com/Kamiapp-fr/vite-plugin-cem/compare/v0.8.4...HEAD
[0.8.4]: https://github.com/Kamiapp-fr/vite-plugin-cem/compare/v0.8.3...v0.8.4
[0.8.3]: https://github.com/Kamiapp-fr/vite-plugin-cem/compare/v0.8.2...v0.8.3
[0.8.2]: https://github.com/Kamiapp-fr/vite-plugin-cem/compare/v0.8.1...v0.8.2
[0.8.1]: https://github.com/Kamiapp-fr/vite-plugin-cem/compare/v0.8.0...v0.8.1
[0.8.0]: https://github.com/Kamiapp-fr/vite-plugin-cem/compare/v0.7.0...v0.8.0
[0.7.0]: https://github.com/Kamiapp-fr/vite-plugin-cem/compare/v0.6.0...v0.7.0
[0.6.0]: https://github.com/Kamiapp-fr/vite-plugin-cem/compare/v0.5.0...v0.6.0
[0.5.0]: https://github.com/Kamiapp-fr/vite-plugin-cem/compare/v0.4.0...v0.5.0
[0.4.0]: https://github.com/Kamiapp-fr/vite-plugin-cem/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/Kamiapp-fr/vite-plugin-cem/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/Kamiapp-fr/vite-plugin-cem/compare/v0.1.2...v0.2.0
[0.1.2]: https://github.com/Kamiapp-fr/vite-plugin-cem/compare/v0.1.1...v0.1.2
[0.1.1]: https://github.com/Kamiapp-fr/vite-plugin-cem/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/Kamiapp-fr/vite-plugin-cem/releases/tag/v0.1.0
