export class Rainbow {
  private gradients: ColorGradient[] = []
  private min = 0
  private max = 100
  private colors: string[] = ['ff0000', 'ffff00', '00ff00', '0000ff']

  constructor() {
    this.setColors(this.colors)
  }

  private setColors(spectrum: string[]) {
    if (spectrum.length < 2) {
      throw new Error('Rainbow must have two or more colours.')
    } else {
      const increment = (this.max - this.min) / (spectrum.length - 1)
      const firstGradient = new ColorGradient()

      firstGradient.setGradient(spectrum[0], spectrum[1])
      firstGradient.setNumberRange(this.min, this.min + increment)
      this.gradients = [firstGradient]

      for (let i = 1; i < spectrum.length - 1; i++) {
        const colourGradient = new ColorGradient()
        colourGradient.setGradient(spectrum[i], spectrum[i + 1])
        colourGradient.setNumberRange(
          this.min + increment * i,
          this.min + increment * (i + 1)
        )
        this.gradients[i] = colourGradient
      }

      this.colors = spectrum
    }
  }

  setSpectrum(...colors: string[]) {
    this.setColors(colors)

    return this
  }

  colorAt(index: number) {
    if (this.gradients.length === 1) {
      return this.gradients[0].colorAt(index)
    } else {
      const segment = (this.max - this.min) / this.gradients.length

      const i = Math.min(
        Math.floor((Math.max(index, this.min) - this.min) / segment),
        this.gradients.length - 1
      )

      return this.gradients[i].colorAt(index)
    }
  }

  setNumberRange(min: number, max: number) {
    if (max > min) {
      this.min = min
      this.max = max

      this.setColors(this.colors)
    } else {
      throw new RangeError()
    }
  }
}

class ColorGradient {
  private startColor: string
  private endColor: string
  private min = 0
  private max = 100

  setGradient(colorStart: string, colorEnd: string) {
    this.startColor = this.getHexColor(colorStart)
    this.endColor = this.getHexColor(colorEnd)
  }

  setNumberRange(min: number, max: number) {
    if (max > min) {
      this.min = min
      this.max = max
    } else {
      throw new RangeError()
    }
  }

  colorAt(index: number): string {
    return `#${this.calcHex(
      index,
      this.startColor.substring(0, 2),
      this.endColor.substring(0, 2)
    )}${this.calcHex(
      index,
      this.startColor.substring(2, 4),
      this.endColor.substring(2, 4)
    )}${this.calcHex(
      index,
      this.startColor.substring(4, 6),
      this.endColor.substring(4, 6)
    )}`
  }

  private calcHex(
    index: number,
    channelStartBase16: string,
    channelEndBase16: string
  ): string {
    let num = index

    if (num < this.min) {
      num = this.min
    }

    if (num > this.max) {
      num = this.max
    }

    const numRange = this.max - this.min

    const cStartBase10 = parseInt(channelStartBase16, 16)
    const cEndBase10 = parseInt(channelEndBase16, 16)

    const cPerUnit = (cEndBase10 - cStartBase10) / numRange
    const cBase10 = Math.round(cPerUnit * (num - this.min) + cStartBase10)

    return this.formatHex(cBase10.toString(16))
  }

  private formatHex(hex: string): string {
    if (hex.length === 1) {
      return '0' + hex
    } else {
      return hex
    }
  }

  private isHexColor(hex: string): boolean {
    const regex = /^#?[0-9a-fA-F]{6}$/i

    return regex.test(hex)
  }

  private getHexColor(hex: string): string {
    if (this.isHexColor(hex)) {
      return hex.substring(hex.length - 6, hex.length)
    } else {
      throw new Error(`${hex} is not a valid color.`)
    }
  }
}
