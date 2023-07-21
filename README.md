# HTML to PDF

A [GitHub Action](https://github.com/features/actions) that converts a HTML file to PDF.

## ✨ Example Usage

```yml
- name: html to pdf
  uses: fifsky/html-to-pdf-action@master
  with:
    htmlFile: ./public/index.html
    outputFile: ./public/resume.pdf
    pdfOptions: '{"format": "A4", "margin": {"top": "10mm", "left": "10mm", "right": "10mm", "bottom": "10mm"}}'
```

`pdfOptions` relate to [puppeteers page.pdf options](https://github.com/puppeteer/puppeteer/blob/main/docs/api/puppeteer.pdfoptions.md#pdfoptions-interface)
