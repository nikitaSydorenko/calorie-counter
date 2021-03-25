class Parser {
    constructor(event) {
        this.event = event;
        this.reader = null;
        this.result = [];
        this.callback = () => {};
    }

    initReader() {
        this.reader = new FileReader();
        this.setReaderListener();
    }

    setReaderListener() {
        this.reader.onload = this.readerOnLoad;
    }

    readerOnLoad = () => {
        const {reader: { result } = {}} = this;

        if (!result) {
            console.error('Result Error: ', result);
            return;
        }

        let lines = result.split("\n");
        let headers = lines[0].split(",");
        const a = []
        for (let i = 1; i < lines.length; i++) {
            let obj = {};
            let currentLine = lines[i].split(",");

            for (let j = 0; j < headers.length; j++) {
                obj[headers[j]] = currentLine[j];
            }
            obj.id = `huy__${i}`
            a.push(obj)

        }
        this.result = a;
        this.onLoad()
    }

    setOnLoad (callback) {
        this.callback = callback
    }

    onLoad () {
        this.callback(this);
    }

    readFile() {
        const {target: {files = []} = {}} = this.event;
        this.reader.readAsText(files[0])
    }
}
export default Parser;
