import fs from 'fs'
import { pipeline, Transform } from 'stream';
const [input, output, operation] = process.argv.slice(2)

const transformation = new Transform({
        transform(chunk, encoding, callback) {
            switch (operation) {
                case 'uppercase':
                 callback(null, chunk.toString().toUpperCase());   
                 break;
                case 'lowercase':
                 callback(null, chunk.toString().toLowerCase());   
                 break;
                case 'reverse':
                 callback(null, [...chunk.toString()].reverse().join(''));   
                 break;
            
                default:
                    console.log('no Such operation, try again');
                    process.exit()
            }
          
        },
      })

fs.createReadStream(input).on('error', (err)=>{throw err})

pipeline(
    fs.createReadStream(input),
    transformation,
    fs.createWriteStream(output),
    (err) => {
      if (err) {
        console.error('Pipeline failed.', err);
      } else {
        console.log('Pipeline succeeded.');
      }
    },
  );