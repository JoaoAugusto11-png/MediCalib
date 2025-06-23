const PDFDocument = require('pdfkit');
const fs = require('fs');
const { dialog, BrowserWindow } = require('electron');

function estaDentroDoPadrao(valoresCalibrado, valoresReferencia, tolerancia) {
  for (let i = 0; i < valoresCalibrado.length; i++) {
    const dif = Math.abs(valoresCalibrado[i] - valoresReferencia[i]);
    if (dif > tolerancia) return false;
  }
  return true;
}

async function gerarPdfCalibracao(dados) {
  const win = BrowserWindow.getFocusedWindow();
  const { filePath, canceled } = await dialog.showSaveDialog(win, {
    title: 'Salvar Laudo de Calibração',
    defaultPath: 'laudo_calibracao.pdf',
    filters: [{ name: 'PDF', extensions: ['pdf'] }]
  });

  if (canceled || !filePath) {
    return { success: false, canceled: true };
  }

  // Parse dos valores
  const valoresReferencia = (typeof dados.valoresReferencia === 'string' ? dados.valoresReferencia.split(',') : dados.valoresReferencia).map(Number);
  const valoresCalibrado = (typeof dados.valoresCalibrado === 'string' ? dados.valoresCalibrado.split(',') : dados.valoresCalibrado).map(Number);
  const tolerancia = parseFloat(dados.tolerancia);

  const dentroPadrao = estaDentroDoPadrao(valoresCalibrado, valoresReferencia, tolerancia);

  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 40 });
      const stream = fs.createWriteStream(filePath);
      doc.pipe(stream);

      // Fundo do cabeçalho
      doc.rect(0, 0, doc.page.width, 70)
        .fill('#94c8f7');
      doc.fillColor('#0074d9')
        .fontSize(28)
        .font('Helvetica-Bold')
        .text('Laudo de Calibração', 0, 25, { align: 'center', underline: false });

      doc.moveDown(2);

      // Dados principais
      doc
        .fontSize(12)
        .fillColor('#222')
        .font('Helvetica')
        .text(`Data: ${dados.data || new Date().toLocaleDateString()}`, { align: 'right' })
        .moveDown();

      doc
        .fontSize(14)
        .fillColor('#222')
        .font('Helvetica-Bold')
        .text(`Equipamento: `, { continued: true })
        .font('Helvetica')
        .text(`${dados.equipamento_nome || dados.equipamento || ''}`)
        .moveDown(0.2)
        .font('Helvetica-Bold')
        .text(`Número de Série: `, { continued: true })
        .font('Helvetica')
        .text(`${dados.numero_serie || ''}`)
        .moveDown(0.2)
        .font('Helvetica-Bold')
        .text(`Responsável Técnico: `, { continued: true })
        .font('Helvetica')
        .text(`${dados.tecnico_nome || dados.tecnico || ''}`)
        .moveDown(0.2)
        .font('Helvetica-Bold')
        .text(`Empresa: `, { continued: true })
        .font('Helvetica')
        .text(`${dados.empresa || ''}`)
        .moveDown(1);

      // Parâmetros de calibração
      doc
        .fontSize(13)
        .fillColor('#222')
        .font('Helvetica-Bold')
        .text('Parâmetros de Calibração:', { underline: true })
        .moveDown(0.5);

      for (let i = 0; i < valoresReferencia.length; i++) {
        doc.font('Helvetica')
          .fillColor('#222')
          .text(`Ponto ${i + 1}: Referência = ${valoresReferencia[i]} | Calibrado = ${valoresCalibrado[i]}`);
      }
      doc.moveDown(0.5)
        .font('Helvetica-Bold')
        .text(`Tolerância Permitida: `, { continued: true })
        .font('Helvetica')
        .text(`±${tolerancia}`)
        .moveDown(1);

      // Resultado da calibração
      doc
        .fontSize(16)
        .font('Helvetica-Bold')
        .fillColor(dentroPadrao ? '#2ecc40' : '#ff4136')
        .text(
          dentroPadrao ? 'RESULTADO: DENTRO DO PADRÃO' : 'RESULTADO: FORA DO PADRÃO',
          { align: 'center', underline: true }
        );
      doc.moveDown(1);

      // Observações
      doc
        .fontSize(13)
        .fillColor('#222')
        .font('Helvetica-Bold')
        .text('Observações:', { underline: true })
        .moveDown(0.5)
        .font('Helvetica')
        .fontSize(12)
        .text(dados.observacoes || 'Nenhuma.');

      // Rodapé
      doc.moveDown(3);
      doc
        .fontSize(10)
        .fillColor('#888')
        .font('Helvetica')
        .text('Laudo gerado automaticamente pelo MediCalib Desktop.', { align: 'center' });

      doc.end();

      stream.on('finish', () => resolve({ success: true, caminho: filePath }));
      stream.on('error', err => reject(err));
    } catch (err) {
      reject(err);
    }
  });
}

module.exports = { gerarPdfCalibracao };