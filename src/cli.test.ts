import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import * as path from 'path'

describe('CLI', () => {
  const originalArgv = process.argv.slice()
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>
  let consoleLogSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    vi.resetModules()
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.restoreAllMocks()
    process.argv = originalArgv.slice()
    vi.unmock('./generator')
    vi.unmock('fs-extra')
  })

  function mockDeps(generateImpl?: (config: any) => any) {
    const mockGenerate = vi.fn(generateImpl)
    const mockPathExists = vi.fn()
    const mockEnsureDir = vi.fn()
    const mockReadJSON = vi.fn()

    vi.doMock('./generator', () => ({
      CodeGenerator: vi.fn().mockImplementation(() => ({
        generate: mockGenerate
      }))
    }))

    vi.doMock('fs-extra', () => ({
      pathExists: mockPathExists,
      ensureDir: mockEnsureDir,
      readJSON: mockReadJSON
    }))

    mockPathExists.mockResolvedValue(true)
    mockEnsureDir.mockResolvedValue(undefined)
    mockReadJSON.mockResolvedValue({})

    return { mockGenerate, mockPathExists, mockEnsureDir, mockReadJSON }
  }

  it('invokes CodeGenerator.generate with parsed options', async () => {
    const { mockGenerate, mockPathExists } = mockDeps()
    const exitSpy = vi.spyOn(process, 'exit').mockImplementation(() => {})

    const outDir = 'tmp-output'
    process.argv = [
      'node',
      'cli',
      'generate',
      '-i',
      'openapi.json',
      '-o',
      outDir,
      '--client-name',
      'CustomClient',
      '--base-url',
      'https://api.test.com'
    ]

    await import('./cli')

    expect(exitSpy).not.toHaveBeenCalled()
    expect(mockGenerate).toHaveBeenCalledWith({
      inputPath: 'openapi.json',
      outputDir: path.resolve(outDir),
      apiClientName: 'CustomClient',
      baseUrl: 'https://api.test.com',
      generateHooks: true
    })
    expect(mockPathExists).toHaveBeenCalledWith(path.resolve('openapi.json'))
  })

  it('loads config file and merges with CLI flags', async () => {
    const { mockGenerate, mockReadJSON, mockPathExists } = mockDeps()
    const exitSpy = vi.spyOn(process, 'exit').mockImplementation(() => {})

    mockReadJSON.mockResolvedValue({
      inputPath: 'spec.json',
      outputDir: 'from-config',
      apiClientName: 'CfgClient',
      generateHooks: false
    })

    const outDir = 'cli-output'
    process.argv = [
      'node',
      'cli',
      'generate',
      '--config',
      'cfg.json',
      '-o',
      outDir,
      '--base-url',
      'https://from.cli'
    ]

    await import('./cli')

    expect(exitSpy).not.toHaveBeenCalled()
    expect(mockReadJSON).toHaveBeenCalledWith(path.resolve('cfg.json'))
    expect(mockGenerate).toHaveBeenCalledWith({
      inputPath: 'spec.json',
      outputDir: path.resolve(outDir),
      apiClientName: 'CfgClient',
      baseUrl: 'https://from.cli',
      generateHooks: false,
      prettierConfig: undefined
    })
    expect(mockPathExists).toHaveBeenCalledWith(path.resolve('cfg.json'))
    expect(mockPathExists).toHaveBeenCalledWith(path.resolve('spec.json'))
  })

  it('exits with error when no input provided', async () => {
    const { mockGenerate } = mockDeps()
    const exitSpy = vi.spyOn(process, 'exit').mockImplementation(() => {})

    process.argv = ['node', 'cli', 'generate', '-o', 'out']

    await import('./cli')

    expect(mockGenerate).not.toHaveBeenCalled()
    expect(exitSpy).toHaveBeenCalledWith(1)
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      '❌ Error: Input file or URL is required. Use -i or --input option.'
    )
  })

  it('exits when generator throws error', async () => {
    const { mockGenerate } = mockDeps(() => Promise.reject(new Error('boom')))
    const exitSpy = vi.spyOn(process, 'exit').mockImplementation(() => {})

    process.argv = ['node', 'cli', 'generate', '-i', 'openapi.json', '-o', 'out']

    await import('./cli')

    expect(mockGenerate).toHaveBeenCalled()
    expect(exitSpy).toHaveBeenCalledWith(1)
    expect(consoleErrorSpy).toHaveBeenCalledWith('❌ Generation failed:', 'boom')
  })
})

