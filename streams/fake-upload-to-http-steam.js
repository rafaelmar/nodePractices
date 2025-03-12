import { Readable } from 'node:stream'

class OneToHoundredStream extends Readable {
    index = 1;

    _read() {
        const i = this.index++;

        setTimeout(() => {
        if(i > 5) {
            this.push(null);
        } else {
            const buf = Buffer.from(String(i));

            this.push(buf);
        }
    }, 1000)
}
}

fetch('http://localhost:3334',  {
    method: 'POST',
    body: new OneToHoundredStream(),
    duplex: 'half',
    }).then( res => {
        // const bufferArray = res.arrayBuffer();
        // const formDataArray = await res.formData();
        // const jsonArray = res.json();
        // const blobArray = res.blob();

        return res.arrayBuffer();
    }).then(res => {
        console.log(res);
    });