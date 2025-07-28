const puppeteer = require('puppeteer');

// ✅ Aumentar timeout global de Jest
jest.setTimeout(20000); // 20 segundos

describe('interactuando con elementos', () => {
    it('debe abrir y cerrar el navegador', async () => {
        const browser = await puppeteer.launch({
            headless: false,
            // reproduccion de modo grafico de forma lenta
            //slowMo: 2000,
            // herramientas de desarrollo
            devtools: false,
            // resolucion que quiero
            // defaultViewport:{ width: 2100, height: 1080 }

            // para que tenga el tamano de mi ventana del monitor por defecto
            defaultViewport: null
        });

        const page = await browser.newPage()
        await page.goto('https://devexpress.github.io/testcafe/example/')

        //listener --cuando se vea una alerta
        page.on('dialog', async(dialog)=>{
            await dialog.accept();
        })

        //clic derecho
        //await page.click('#populate', {button: 'right', delay: 500})

        //escribir en input
        await page.type('#developer-name', 'prueba', {delay: 500})
        //un clic en checkbox
        await page.click('#remote-testing', {delay: 500})
        //un clic en checkbox
        await page.click('#tried-test-cafe', {delay: 500})

        //doble clic
        await page.click('#populate', {clickCount: 2, delay: 500})

       //escribir en comentario
        await page.type('#comments', 'esto es una preba', {delay: 500})

       //un clic en submit
        await page.click('#submit-button', {delay: 500})

        // cerrar navegador de prueba
        await browser.close();
    });
});
