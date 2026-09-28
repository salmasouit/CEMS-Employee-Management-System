const PDFDocument = require('pdfkit');
const ExcelJS = require('exceljs');
const { Parser } = require('json2csv');

const exportPDF = (res, title, columns, rows) => {
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename="${title}.pdf"`);

  const doc = new PDFDocument({ margin: 40, size: 'A4' });
  doc.pipe(res);

  doc.fontSize(18).text(title, { align: 'center' });
  doc.moveDown();
  doc.fontSize(10);

  const colWidth = (doc.page.width - 80) / columns.length;
  let y = doc.y;

  doc.font('Helvetica-Bold');
  columns.forEach((col, i) => doc.text(col, 40 + i * colWidth, y, { width: colWidth }));
  y += 20;
  doc.font('Helvetica');

  rows.forEach((row) => {
    if (y > doc.page.height - 60) {
      doc.addPage();
      y = 40;
    }
    columns.forEach((col, i) => {
      doc.text(String(row[col] ?? ''), 40 + i * colWidth, y, { width: colWidth });
    });
    y += 18;
  });

  doc.end();
};

const exportExcel = async (res, title, columns, rows) => {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet(title);
  sheet.columns = columns.map((c) => ({ header: c, key: c, width: 20 }));
  rows.forEach((row) => sheet.addRow(row));
  sheet.getRow(1).font = { bold: true };

  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader('Content-Disposition', `attachment; filename="${title}.xlsx"`);
  await workbook.xlsx.write(res);
  res.end();
};

const exportCSV = (res, title, columns, rows) => {
  const parser = new Parser({ fields: columns });
  const csv = parser.parse(rows);
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', `attachment; filename="${title}.csv"`);
  res.send(csv);
};

const handleExport = async (res, format, title, columns, rows) => {
  if (format === 'pdf') return exportPDF(res, title, columns, rows);
  if (format === 'xlsx') return exportExcel(res, title, columns, rows);
  return exportCSV(res, title, columns, rows);
};

module.exports = { handleExport };
