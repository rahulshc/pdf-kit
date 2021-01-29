const fs=require('fs');
//const fs1=require('fs');
const csv = require('csv-parser');
const pdf=require('pdfkit');
let count=0;
    const bulk=[];
    fs.createReadStream('providers.csv')
  .pipe(csv({separator: ','}))
  .on('data', (data) => {
    bulk.push({
      si: ++count,
      name: data.name,
      gender: data.gender,
      age: data.age,
      father: data.father,
      address: data.address
    });
    
  })
  .on('end', () => {
    const doc=new pdf();
    doc.pipe(fs.createWriteStream(`output.pdf`));
    for(const item of bulk){
      //console.log(data.name);
      doc.text(`${item.si}.	${item.name}, (${item.gender}) aged about ${item.age} years, ${item.gender==="Male" ? 'Son' : 'Daughter'} of ${item.father}, 
    Resident of ${item.address}.`);
    doc.text(` `);
    doc.text(` `);
    }
    
    doc.end();

     console.log('Done');
      
  });