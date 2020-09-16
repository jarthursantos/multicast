import { PDFOptions } from 'puppeteer'

const options: PDFOptions = {
  format: 'A4',
  displayHeaderFooter: false,
  margin: {
    top: '30px',
    right: '30px',
    left: '30px',
    bottom: '30px'
  },
  printBackground: true
}

export default options
