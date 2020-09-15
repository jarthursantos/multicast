import { PDFOptions } from 'puppeteer'

const options: PDFOptions = {
  format: 'A4',
  displayHeaderFooter: false,
  margin: {
    top: '40px',
    right: '50px',
    left: '50px',
    bottom: '100px'
  },
  printBackground: true
}

export default options
