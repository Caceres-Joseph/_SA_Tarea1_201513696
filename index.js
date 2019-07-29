var request = require("request");


//crear10Contactos();
listarContactos();



/*
+----------------------------------------
| Obtener token
+----------------------------------------
|
*/
function obtnerToken() {
    var options = {
        method: 'POST',
        url: 'https://api.softwareavanzado.world/index.php?option=token&api=oauth2',
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        form: {
            grant_type: 'client_credentials',
            client_id: 'josephccaceres@gmail.com',
            client_secret: '201513696'
        }
    };
    return new Promise(resolve => {
        request(options, function (error, response, body) {
            if (error) throw new Error(error);
            resolve(JSON.parse(body).access_token);
        })
    });
}

/*
+----------------------------------------
| Crear 10 contactos
+----------------------------------------
| 
*/

function crear10Contactos() {
    for (let index = 0; index < 10; index++) { 
        crearcontacto(index);

    }
}

/*
+----------------------------------------
| Crear nuevo contacto
+----------------------------------------
| 
*/
async function crearcontacto(index) {

    var token = await obtnerToken();
    var options = {
        method: 'POST',
        json: true,
        url: 'https://api.softwareavanzado.world/index.php?' +
            'option=contact&' +
            'webserviceVersion=1.0.0&' +
            'webserviceClient=administrator&' +
            'access_token=' + token +
            '&api=Hal',
        body: {
            name: '201513696_Jhosef' + index,
            catid: index,
        }
    };


    request(options, function (error, response, body) {
        if (error) throw new Error(error); 
        if (response.statusCode == 201) {
            console.log("¡Contacto insertado exitosamente!")
        } else {
            console.log("Ocurrió un error al insertar el contacto");
        }
    });
}

/*
+----------------------------------------
| Listar contactos
+----------------------------------------
| Lista los contactos con el filtro de
| 201513696 
*/
async function listarContactos() {
    var token = await obtnerToken();
    var options = {
        method: 'GET',
        json: true,
        rejectUnauthorized: false,
        url: 'https://api.softwareavanzado.world/index.php?' +
            'option=com_contact&' +
            'webserviceVersion=1.0.0&' +
            'webserviceClient=administrator&' +
            'filter[search]=201513696&' +
            'access_token=' + token +
            '&api=Hal',

    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        if (response.statusCode == 200) {
            console.log("=============== LISTA DE CONTACTOS CON 201513696 =============");
            console.log("Total de contactos devueltos: " + body.totalItems)
            console.log(body._embedded);
        } else {
            console.log("=== Ocurrió un error al listar los contactos");
        }
    });
}