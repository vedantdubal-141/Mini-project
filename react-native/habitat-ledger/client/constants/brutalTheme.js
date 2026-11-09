/**
 * Neo-Brutalist Pop Design System Tokens
 * Matched to the reference:
 * - Warm cream canvas
 * - Jet-black 2px outlines
 * - Hard 3D offset drop shadows (bottom-right)
 * - Pop canary yellow primary accent
 * - Playful, tactile interaction
 */

export const BrutalTheme = {
  colors: {
    canvas: '#FFFDF5',          // Warm off-white paper canvas
    canvasMuted: '#F4F0E6',     // Slightly darker paper shade
    white: '#FFFFFF',
    black: '#000000',
    ink: '#121826',

    // Vibrant Pop Accents
    yellow: '#FFE600',          // Signature highlighter yellow
    yellowLight: '#FFF490',
    coral: '#FF5252',           // Critical / Urgent Red
    coralLight: '#FFE5E5',
    cyan: '#38BDF8',            // Electric Blue / In Progress
    cyanLight: '#E0F2FE',
    green: '#22C55E',           // Resolved Mint Green
    greenLight: '#DCFCE7',
    orange: '#FB923C',
    purple: '#A855F7',
    purpleLight: '#F3E8FF',

    border: '#000000',
  },

  borders: {
    thin: 1.5,
    regular: 2,
    thick: 2.5,
  },

  radii: {
    sm: 10,
    md: 16,
    lg: 22,
    xl: 28,
    pill: 999,
  },

  // Hard 3D offset shadows (no blur, crisp offset)
  shadows: {
    sm: {
      shadowColor: '#000000',
      shadowOffset: { width: 2, height: 2 },
      shadowOpacity: 1,
      shadowRadius: 0,
      elevation: 2,
    },
    default: {
      shadowColor: '#000000',
      shadowOffset: { width: 3, height: 4 },
      shadowOpacity: 1,
      shadowRadius: 0,
      elevation: 4,
    },
    lg: {
      shadowColor: '#000000',
      shadowOffset: { width: 4, height: 5 },
      shadowOpacity: 1,
      shadowRadius: 0,
      elevation: 5,
    },
  },
};
