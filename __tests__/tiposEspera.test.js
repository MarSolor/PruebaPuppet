const puppeteer = require('puppeteer');

// Aumentar timeout global de Jest
jest.setTimeout(20000); // 20 segundos

describe('tipos esperas pupeteer', () => {
    it('mostrar diferentes tipos de espera', async () => {
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

       page.on('dialog', async (dialog) => {
            console.log('Dialog detectado:', dialog.message());
            await dialog.accept();
        });

        //bloquear permissos de notificaciones
        const context = browser.defaultBrowserContext();        
        //networkkidle0 espera a que todos lo elementos terminen de cargar
       
        await context.overridePermissions('https://demoqa.com/modal-dialogs',[])
        await page.goto('https://demoqa.com/modal-dialogs', {waitUntil: 'networkidle2'})

        //esperar por elemento
        await page.waitForSelector('#app > header > a > img', {waitUntil: 'networkidle2'})

        await page.waitForSelector('#showSmallModal', {visible:true})

        //clic modal
        await page.click('#showSmallModal', {delay: 500})

        // Esperar que aparezca el título del modal
        await page.waitForSelector('#example-modal-sizes-title-sm', { visible: true });

        // Validar el texto del título
        await page.waitForFunction(() => {
            const el = document.querySelector('#example-modal-sizes-title-sm');
            return el && el.innerText.includes('Small Modal');
        });

        // Cerrar el modal
        await page.waitForSelector('#closeSmallModal', { visible: true });
        await page.click('#closeSmallModal', { delay: 500 });

        // Esperar a que desaparezca el modal
        //await page.waitForSelector('#example-modal-sizes-title-sm', { hidden: true });


        // cerrar navegador de prueba
        await browser.close();
    });
});
