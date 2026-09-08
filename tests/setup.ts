import '@testing-library/jest-dom/vitest'
import { vi, beforeEach } from 'vitest'

// Mock next/navigation
vi.mock('next/navigation', () => {
  const pushMock = vi.fn()
  const replaceMock = vi.fn()
  const backMock = vi.fn()
  const notFoundMock = vi.fn()

  return {
    useRouter: () => ({
      push: pushMock,
      replace: replaceMock,
      back: backMock,
      prefetch: vi.fn()
    }),
    usePathname: () => '/',
    useSearchParams: () => new URLSearchParams(),
    notFound: notFoundMock
  }
})

// Mock GSAP to prevent animation delays and canvas/RAF issues in tests
vi.mock('gsap', () => {
  const dummyTimeline = {
    to: vi.fn().mockReturnThis(),
    fromTo: vi.fn().mockReturnThis(),
    kill: vi.fn()
  }

  return {
    default: {
      to: vi.fn().mockReturnValue(dummyTimeline),
      fromTo: vi.fn().mockReturnValue(dummyTimeline),
      set: vi.fn(),
      timeline: vi.fn().mockReturnValue(dummyTimeline),
      killTweensOf: vi.fn()
    }
  }
})

// Mock Web Audio API for tests
class MockAudioNode {
  connect() {
    return this
  }
  disconnect() {}
}

class MockAudioParam {
  setValueAtTime = vi.fn()
  exponentialRampToValueAtTime = vi.fn()
  linearRampToValueAtTime = vi.fn()
  value = 1
}

class MockGainNode extends MockAudioNode {
  gain = new MockAudioParam()
}

class MockOscillatorNode extends MockAudioNode {
  frequency = new MockAudioParam()
  type = 'sine'
  start = vi.fn()
  stop = vi.fn()
}

class MockStereoPannerNode extends MockAudioNode {
  pan = new MockAudioParam()
}

class MockBiquadFilterNode extends MockAudioNode {
  frequency = new MockAudioParam()
  Q = new MockAudioParam()
  type = 'lowpass'
}

class MockAudioContext {
  state = 'running'
  currentTime = 0
  destination = new MockAudioNode()
  createGain = vi.fn(() => new MockGainNode())
  createOscillator = vi.fn(() => new MockOscillatorNode())
  createStereoPanner = vi.fn(() => new MockStereoPannerNode())
  createBiquadFilter = vi.fn(() => new MockBiquadFilterNode())
  resume = vi.fn().mockResolvedValue(undefined)
  suspend = vi.fn().mockResolvedValue(undefined)
  close = vi.fn().mockResolvedValue(undefined)
}

if (typeof window !== 'undefined') {
  // @ts-expect-error Mock AudioContext
  window.AudioContext = MockAudioContext
  // @ts-expect-error Mock webkitAudioContext
  window.webkitAudioContext = MockAudioContext

  // Mock matchMedia
  window.matchMedia =
    window.matchMedia ||
    vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn()
    }))
}

beforeEach(() => {
  localStorage.clear()
  vi.clearAllMocks()
})
