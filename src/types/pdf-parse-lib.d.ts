// @types/pdf-parse only declares the package root ('pdf-parse'); we import
// 'pdf-parse/lib/pdf-parse.js' directly to skip index.js's debug-mode
// wrapper (see parseReceiptPdf.ts for why). Same shape, different path.
declare module 'pdf-parse/lib/pdf-parse.js' {
  // eslint-disable-next-line @typescript-eslint/no-require-imports -- `export =` CJS interop needs TS's import-equals form here
  import PdfParse = require('pdf-parse');
  export = PdfParse;
}
