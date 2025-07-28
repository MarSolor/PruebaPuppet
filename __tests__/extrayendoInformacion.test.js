const puppeteer = require('puppeteer');

// Aumentar timeout global de Jest
jest.setTimeout(90000); // 20 segundos

describe('extrayendo informacion', () => {

    let browser
    let page
    beforeEach(async()=>{
        browser = await puppeteer.launch({
            headless: true,
            // reproduccion de modo grafico de forma lenta
            //slowMo: 2000,
            // herramientas de desarrollo
            devtools: false,
            // resolucion que quiero
            // defaultViewport:{ width: 2100, height: 1080 }

            // para que tenga el tamano de mi ventana del monitor por defecto
            defaultViewport: null
        });

        page = await browser.newPage()

    })

    afterEach(async()=>{
        // cerrar navegador de prueba
        await browser.close();

    })

    it('extraer titulo de la pagina y url', async () => {
        
       page.on('dialog', async (dialog) => {
            console.log('Dialog detectado:', dialog.message());
            await dialog.accept();
        });

        //bloquear permissos de notificaciones
        const context = browser.defaultBrowserContext();        
        //networkkidle0 espera a que todos lo elementos terminen de cargar
       
        await context.overridePermissions('https://demoqa.com/modal-dialogs',[])
        await page.goto('https://demoqa.com/modal-dialogs', {waitUntil: 'networkidle2'})
        const titulo = await page.title()
        const url = await page.url()

        console.log('titulo:',titulo)
        console.log('url:', url)

    });

    it('extraer la informacion de un elemento', async () => {
        const browser = await puppeteer.launch({
            headless: true,
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

       page.on('dialog', async (dialog) => {
            console.log('Dialog detectado:', dialog.message());
            await dialog.accept();
        });

        //bloquear permissos de notificaciones
        const context = browser.defaultBrowserContext();        
        //networkkidle0 espera a que todos lo elementos terminen de cargar
       
        await context.overridePermissions('https://demoqa.com/modal-dialogs',[])
        await page.goto('https://demoqa.com/modal-dialogs', {waitUntil: 'networkidle2'})

        await page.waitForSelector('#showSmallModal')

        //funcion corre el metodo de query selector
        const nombreBoton = await page.$eval('#showSmallModal', (button) =>button.textContent)
        console.log('nombreBoton', nombreBoton)

        // cerrar navegador de prueba
        await browser.close();
    });

    it('contar elementos de pagina', async () => {

       page.on('dialog', async (dialog) => {
            console.log('Dialog detectado:', dialog.message());
            await dialog.accept();
        });

        //bloquear permissos de notificaciones
        const context = browser.defaultBrowserContext();        
        //networkkidle0 espera a que todos lo elementos terminen de cargar
       
        await context.overridePermissions('https://demoqa.com/modal-dialogs',[])
        await page.goto('https://demoqa.com/modal-dialogs', {waitUntil: 'networkidle2'})

        //Contar imagenes
        //$$ va a correr un query selector all, regresando un arreglo
        const images = await page.$$eval('img', (imagenes)=>imagenes.length)
        console.log('images', images)

    });
});
