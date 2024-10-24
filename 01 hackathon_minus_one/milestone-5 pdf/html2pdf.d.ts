// html2pdf.d.ts
declare module 'html2pdf.js' {
    interface Html2PdfOptions {
      margin?: any;
      filename?: string;
      image?: any;
      html2canvas?: any;
      jsPDF?: any;
    }
  
    function html2pdf(element: HTMLElement | string, options?: Html2PdfOptions): any;
  
    export default html2pdf;
  }