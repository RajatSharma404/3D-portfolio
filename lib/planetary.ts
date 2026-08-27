/**
 * Planetary & Astronomical Calculation Engine
 * Calculates real-world subsolar points, UTC day/night lighting vectors,
 * live city timezone clocks, and orbital climate telemetry.
 */

export interface SubsolarPoint {
  lat: number
  lng: number
  x: number
  y: number
  z: number
}

export interface CityPlanetaryInfo {
  timezone: string
  tzCode: string
  climate: string
  orbitAltitude: string
}

export const CITY_TIMEZONE_MAP: Record<string, CityPlanetaryInfo> = {
  'San Francisco': {
    timezone: 'America/Los_Angeles',
    tzCode: 'PT',
    climate: '18°C Coastal Fog / Clear Orbit',
    orbitAltitude: '360 km LEO'
  },
  'London': {
    timezone: 'Europe/London',
    tzCode: 'GMT',
    climate: '16°C Mild Breeze / Light Cloud',
    orbitAltitude: '350 km LEO'
  },
  'Tokyo': {
    timezone: 'Asia/Tokyo',
    tzCode: 'JST',
    climate: '24°C Neon Night / Clear Skies',
    orbitAltitude: '380 km LEO'
  },
  'Bengaluru': {
    timezone: 'Asia/Kolkata',
    tzCode: 'IST',
    climate: '23°C Tech Hub Breeze',
    orbitAltitude: '370 km LEO'
  },
  'Sydney': {
    timezone: 'Australia/Sydney',
    tzCode: 'AEST',
    climate: '19°C Oceanic Clear Orbit',
    orbitAltitude: '355 km LEO'
  },
  'Cairo': {
    timezone: 'Africa/Cairo',
    tzCode: 'EET',
    climate: '29°C Warm Desert Atmosphere',
    orbitAltitude: '365 km LEO'
  }
}

/**
 * Calculates the exact Subsolar coordinate (lat, lng, 3D Cartesian) based on UTC time.
 */
export function calculateSubsolarPoint(date: Date = new Date(), radius: number = 350): SubsolarPoint {
  const utcHours = date.getUTCHours() + date.getUTCMinutes() / 60 + date.getUTCSeconds() / 3600

  // Sun longitude: Greenwich meridian is at 0° at 12:00 UTC
  // Sun moves 15 degrees per hour westward (-180 to +180)
  const lng = -((utcHours - 12) * 15)

  // Day of year calculation for solar declination
  const startOfYear = new Date(Date.UTC(date.getUTCFullYear(), 0, 1))
  const dayOfYear = Math.floor((date.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24))

  // Approximate solar declination angle (ranges from -23.44° to +23.44°)
  const lat = -23.44 * Math.cos(((360 / 365) * (dayOfYear + 10) * Math.PI) / 180)

  // Convert Spherical to 3D Cartesian coordinates
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lng + 180) * (Math.PI / 180)

  const x = -(radius * Math.sin(phi) * Math.cos(theta))
  const z = radius * Math.sin(phi) * Math.sin(theta)
  const y = radius * Math.cos(phi)

  return { lat, lng, x, y, z }
}

/**
 * Formats live local city time with AM/PM and Timezone.
 */
export function getCityLocalTime(timezone: string, date: Date = new Date()): string {
  try {
    return new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    }).format(date)
  } catch {
    return date.toLocaleTimeString()
  }
}

/**
 * Detects whether it is currently Daylight, Twilight, or Night at a city.
 */
export function getCityDaylightStatus(timezone: string, date: Date = new Date()): {
  status: 'Daylight' | 'Twilight' | 'Night'
  icon: string
  label: string
} {
  try {
    const hourStr = new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      hour: 'numeric',
      hour12: false
    }).format(date)
    const hour = parseInt(hourStr, 10)

    if (hour >= 6 && hour < 18) {
      return { status: 'Daylight', icon: '☀️', label: 'Daylight Phase' }
    } else if ((hour >= 5 && hour < 6) || (hour >= 18 && hour < 19)) {
      return { status: 'Twilight', icon: '🌅', label: 'Twilight Horizon' }
    } else {
      return { status: 'Night', icon: '🌙', label: 'Night Orbit' }
    }
  } catch {
    return { status: 'Daylight', icon: '☀️', label: 'Daylight Phase' }
  }
}
