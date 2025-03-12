process.stdin.pipe(process.stdout);

import { Readable, Writable, Transform } from 'node:stream'

class OneToHoundredStream extends Readable {
    index = 1;

    _read() {
        const i = this.index++;
        setTimeout(() => {
        if(i > 100) {
            this.push(null);
        } else {

            const buf = Buffer.from(String(i));
            this.push(buf);
        }
    }, 1000)
}
}

class InverseNumberStream extends Transform {
    _transform(chunk, encoding, callback) {
        const transformed = chunk * -1  ;

        callback(null, Buffer.from(String(transformed)));
    }
}

class MultiplayByTenStream extends Writable {
    _write(chunk, encoding, callback) {
        console.log(chunk * 10);
        callback();
    }
    
}

class Streamtest extends Writable {
    _write(chunk, encoding, callback) {
        if(chunk){
            console.log(`Soy el numero: ${chunk}`);
            callback();
        }
    }
}

new OneToHoundredStream()
.pipe(new InverseNumberStream())
.pipe(new Streamtest());