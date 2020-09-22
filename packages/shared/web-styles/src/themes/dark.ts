import { DefaultTheme } from 'styled-components'

const Dark: DefaultTheme = {
  title: 'dark',

  colors: {
    background: {
      light: '#fff',
      dark: '#f0f0f0'
    },

    primary: {
      light: '#db4437',
      dark: '#db4437'
    },

    secondary: {
      light: '#db4437',
      dark: '#db4437'
    },

    overlay: {
      dark: 'rgba(0, 0, 0, 0.7)',
      light: 'rgba(255, 255, 255, 0.7)'
    },

    border: {
      primary: '#BBB',
      secondary: '#DDD'
    },

    text: {
      primary: {
        dark: 'rgba(51, 51, 51, 1)',
        light: 'rgba(255, 255, 255, 1)'
      },
      secondary: {
        dark: 'rgba(51, 51, 51, 0.7)',
        light: 'rgba(255, 255, 255, 0.7)'
      },
      caption: {
        dark: 'rgba(51, 51, 51, 0.4)',
        light: 'rgba(255, 255, 255, 0.4)'
      }
    },

    button: {
      primary: {
        default: {
          dark: {
            background: '#333',
            foreground: '#fff'
          },
          light: {
            background: '#333',
            foreground: '#fff'
          }
        },
        hover: {
          dark: {
            background: '#222',
            foreground: '#fff'
          },
          light: {
            background: '#222',
            foreground: '#fff'
          }
        },
        focus: {
          dark: {
            background: '#222',
            foreground: '#fff'
          },
          light: {
            background: '#222',
            foreground: '#fff'
          }
        },
        disabled: {
          dark: {
            background: '#333',
            foreground: '#fff'
          },
          light: {
            background: '#333',
            foreground: '#fff'
          }
        }
      },
      secondary: {
        default: {
          dark: {
            background: 'none',
            foreground: '#666'
          },
          light: {
            background: 'none',
            foreground: '#666'
          }
        },
        hover: {
          dark: {
            background: '#f0f0f0',
            foreground: '#666'
          },
          light: {
            background: '#f0f0f0',
            foreground: '#666'
          }
        },
        focus: {
          dark: {
            background: '#f0f0f0',
            foreground: '#666'
          },
          light: {
            background: '#f0f0f0',
            foreground: '#666'
          }
        },
        disabled: {
          dark: {
            background: '#f0f0f0',
            foreground: '#666'
          },
          light: {
            background: '#f0f0f0',
            foreground: '#666'
          }
        }
      }
    }
  }
}

export default Dark
