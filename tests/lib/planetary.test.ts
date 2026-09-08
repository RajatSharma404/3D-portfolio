import { describe, it, expect } from 'vitest'
import {
  calculateSubsolarPoint,
  getCityLocalTime,
  getCityDaylightStatus,
  CITY_TIMEZONE_MAP
} from '@/lib/planetary'

describe('Planetary Astronomical Calculations', () => {
  describe('calculateSubsolarPoint', () => {
    it('calculates valid subsolar coordinates for current time and custom radius', () => {
      const radius = 350
      const subsolar = calculateSubsolarPoint(new Date('2026-06-21T12:00:00Z'), radius)

      expect(subsolar.lat).toBeGreaterThanOrEqual(-23.5)
      expect(subsolar.lat).toBeLessThanOrEqual(23.5)
      expect(subsolar.lng).toBeGreaterThanOrEqual(-180)
      expect(subsolar.lng).toBeLessThanOrEqual(180)

      // 3D Cartesian coordinates magnitude should equal the orbital radius
      const magnitude = Math.sqrt(subsolar.x ** 2 + subsolar.y ** 2 + subsolar.z ** 2)
      expect(magnitude).toBeCloseTo(radius, 1)
    })

    it('positions the subsolar longitude near 0° at 12:00 UTC', () => {
      const noonDate = new Date('2026-03-20T12:00:00Z')
      const result = calculateSubsolarPoint(noonDate, 350)
      expect(Math.abs(result.lng)).toBeLessThanOrEqual(1)
    })

    it('positions the subsolar longitude near -90° at 18:00 UTC', () => {
      const eveningDate = new Date('2026-03-20T18:00:00Z')
      const result = calculateSubsolarPoint(eveningDate, 350)
      expect(result.lng).toBeCloseTo(-90, 0)
    })
  })

  describe('getCityLocalTime', () => {
    it('formats valid local time string for mapped cities', () => {
      const testDate = new Date('2026-09-08T12:00:00Z')
      const londonTime = getCityLocalTime('Europe/London', testDate)
      expect(londonTime).toMatch(/\d{1,2}:\d{2}:\d{2}\s*(AM|PM)/i)

      const tokyoTime = getCityLocalTime('Asia/Tokyo', testDate)
      expect(tokyoTime).toMatch(/\d{1,2}:\d{2}:\d{2}\s*(AM|PM)/i)
    })

    it('falls back gracefully to toLocaleTimeString on invalid timezone without throwing', () => {
      const invalidTzTime = getCityLocalTime('Invalid/Timezone_Name')
      expect(typeof invalidTzTime).toBe('string')
      expect(invalidTzTime.length).toBeGreaterThan(0)
    })
  })

  describe('getCityDaylightStatus', () => {
    it('identifies Daylight phase during midday hours', () => {
      // 13:00 in London
      const midday = new Date('2026-09-08T12:00:00Z') // BST is UTC+1 -> 13:00
      const status = getCityDaylightStatus('Europe/London', midday)
      expect(status.status).toBe('Daylight')
      expect(status.icon).toBe('☀️')
    })

    it('identifies Night phase during late night hours', () => {
      // 02:00 in Tokyo (UTC 17:00 -> 02:00 JST next day)
      const lateNight = new Date('2026-09-08T17:00:00Z')
      const status = getCityDaylightStatus('Asia/Tokyo', lateNight)
      expect(status.status).toBe('Night')
      expect(status.icon).toBe('🌙')
    })

    it('identifies Twilight phase during sunrise/sunset transitions', () => {
      // Create a fixed date that is 05:30 in UTC
      const dawn = new Date('2026-09-08T05:30:00Z')
      const status = getCityDaylightStatus('UTC', dawn)
      expect(status.status).toBe('Twilight')
      expect(status.icon).toBe('🌅')
    })
  })

  describe('CITY_TIMEZONE_MAP', () => {
    it('contains all required major telemetry cities with metadata', () => {
      const requiredCities = ['San Francisco', 'London', 'Tokyo', 'Bengaluru', 'Sydney', 'Cairo']

      requiredCities.forEach((city) => {
        const info = CITY_TIMEZONE_MAP[city]
        expect(info).toBeDefined()
        expect(info.timezone).toBeTruthy()
        expect(info.tzCode).toBeTruthy()
        expect(info.climate).toBeTruthy()
        expect(info.orbitAltitude).toMatch(/km LEO$/)
      })
    })
  })
})
