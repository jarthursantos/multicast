export interface Colors {
  background: string

  primary: {
    light: string
    dark: string
  }

  secondary: {
    light: string
    dark: string
  }

  overlay: {
    dark: string
    light: string
  }

  border: {
    primary: string
    secondary: string
  }

  text: {
    primary: {
      dark: string
      light: string
    }
    secondary: {
      dark: string
      light: string
    }
    caption: {
      dark: string
      light: string
    }
  }

  button: {
    primary: ButtonColors
    secondary: ButtonColors
  }
}

export interface ButtonProps {
  background: string
  foreground: string
}

export interface ButtonColors {
  default: {
    dark: ButtonProps
    light: ButtonProps
  }

  hover: {
    dark: ButtonProps
    light: ButtonProps
  }

  focus: {
    dark: ButtonProps
    light: ButtonProps
  }

  disabled: {
    dark: ButtonProps
    light: ButtonProps
  }
}
