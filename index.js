const fs=require('fs');
const fs1=require('fs');
const csv = require('csv-parser');
const pdf=require('pdfkit');
let count=0;
    const bulk=[];
    fs.createReadStream('providers.csv')
  .pipe(csv({separator: ','}))
  .on('data', (data) => {
    const doc=new pdf();
    doc.pipe(fs1.createWriteStream(`output/${data.name}${++count}.pdf`));
    doc.text(`Name: ${data.name}`);
    doc.text(`Gender: ${data.gender}`);
    doc.text(`Age: ${data.age}`);
    doc.text(`Father's Name: ${data.father}`);
    doc.text(`Husband's Name: ${data.husband}`);
    doc.text(`Address: ${data.address}`);
    doc.text(`Police Station: ${data.ps}`);
    doc.end();
    
  })
  .on('end', () => {

     console.log('Done');
      
  });