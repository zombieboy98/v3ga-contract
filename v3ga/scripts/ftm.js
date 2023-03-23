//requiring path and fs modules
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

//joining path of directory
const basePath = '/Users/leonscottkennedy/Documents/zombie';
const directoryPath = `${basePath}/v3ga-collection-v2`;
const outPath = `${basePath}/v3ga-collection`;
const outImages = `${outPath}/images`;

if (!fs.existsSync(outPath)) {
  fs.mkdirSync(outPath);
}

if (!fs.existsSync(outImages)) {
  fs.mkdirSync(outImages);
}

//passsing directoryPath and callback function
fs.readdir(directoryPath, function (err, files) {
  //handling error
  if (err) {
    return console.log('Unable to scan directory: ' + err);
  }
  //listing all files using forEach
  let ctr = 0;
  const META = [];
  files.forEach(function (file) {
    // Do whatever you want to do with the file
    let filename = file.replace('.png', '');
    let values = filename.split('_');

    if (values.length === 8) {
      const metadata = {
        id: crypto.randomUUID(),
        image: file,
        attributes: [
          { trait_type: 'Species', value: values[0] },
          { trait_type: 'Region', value: values[1] },
          { trait_type: 'Purity', value: values[2] },
          { trait_type: 'Age', value: values[3] },
          { trait_type: 'Vision', value: values[4] },
          { trait_type: 'Temperment', value: values[5] },
          { trait_type: 'Motion', value: values[6] },
          { trait_type: 'Number', value: values[7] },
        ],
      };
      META.push(metadata);

      fs.copyFile(
        `${directoryPath}/${file}`,
        `${outImages}/${metadata.id}.png`,
        (err) => {
          if (err) throw err;
          ctr++;
          console.log(metadata);
        }
      );
    }
  });

  console.log(`${ctr}/${files.length} processed...`);

  fs.writeFile(`${outPath}/metadata`, JSON.stringify(META), function (err) {
    if (err) {
      return console.log(err);
    }
    console.log('The file was saved!');
  });
});
