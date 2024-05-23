import browserslist from 'browserslist'
import { browserslistToTargets, transform } from 'lightningcss';
import { readFile, writeFile } from 'fs/promises';
import { dirname, join as pathJoin } from 'path';
import { fileURLToPath } from 'url';

const dir = dirname(fileURLToPath(import.meta.url));
const files = [pathJoin(dir, '../efy.css'), pathJoin(dir, '../extra.css')]

files.forEach(async (file) => {
    let data = await readFile(file);

    let { code, map } = transform({
        code: data,
        minify: true,
        targets: browserslistToTargets(browserslist()),
        sourceMap: true
    })

    writeFile(file.replace(".css", ".min.css"), new TextDecoder("utf-8").decode(code))
    writeFile(file.replace(".css", ".css.map"), new TextDecoder("utf-8").decode(map))

})
