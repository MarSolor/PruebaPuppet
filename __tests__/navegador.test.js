const puppeteer = require('puppeteer');

describe('Mi primer test puppeteer', () => {
    it('debe abrir y cerrar el navegador', async () => {
        const browser = await puppeteer.launch({
            headless: false,
            // reproduccion de modo grafico de forma lenta
            slowMo: 2000,
            // herramientas de desarrollo
            devtools: false,
            // resolucion que quiero
            // defaultViewport:{ width: 2100, height: 1080 }

            // para que tenga el tamano de mi ventana del monitor por defecto
            defaultViewport: null
        });

        const page = await browser.newPage();

        // se navega a yahoo, se espera a que se ingrese 6 segundo puede ser en menos por el timeout y se espera a que cargue el documento
        await page.goto('https://www.deviantart.com/', {
            waitUntil: 'domcontentloaded'
        });

        await page.reload()
        await page.waitForSelector('img')

        //navegar a otro sitio
        await page.goto('https://www.tizo.com.ni/', {
            waitUntil: 'domcontentloaded'
        });
        //logo de tizo se valida existencia
        await page.waitForSelector('body > app-root > app-pages > div > div > app-management-header > header > section > a > img')

        //navegar atras
        await page.goBack();
        await page.waitForSelector('img')

        //ir adealant
        await page.goForward();

        // -- abrir otra pagina
        const page2 = await browser.newPage()
        await page2.goto('https://www.youtube.com/', {
            waitUntil: 'domcontentloaded'
        });

        // cerrar navegador de prueba
        await browser.close();
    }, 500000);
});
