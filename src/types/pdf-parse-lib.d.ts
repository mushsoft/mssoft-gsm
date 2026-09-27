// @types/pdf-parse only declares the package root ('pdf-parse'); we import
// 'pdf-parse/lib/pdf-parse.js' directly to skip index.js's debug-mode
// wrapper (see parseReceiptPdf.ts for why). Same shape, different path.
declare module 'pdf-parse/lib/pdf-parse.js' {
  import PdfParse = require('pdf-parse');
  export = PdfParse;
}
