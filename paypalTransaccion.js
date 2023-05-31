const urlParams = new URLSearchParams(window.location.search); //extraer las propiedadesd de la url
const token = urlParams.get('token'); //extreaer el token y asignarlo a la variable
const user = "AT6MFYD64Ivz_qiZBW5gb_vZiJd049hownBVRru97LLCxyVuXs1ckyr3Wlylzf7GXC2He2Udp5qzo2fZ"; //client id
const clave = "EEeg4gAFTeh6Tl_OGRLeFOFNEr7-BR99usYcQp-jRnaCazkIOwj_knCp77LcEq_GYAuNZIkmZ2b0LHyT";//secret key
const contenedor = document.getElementById("contenedor"); //div donde se agregara el div con el id de la transaccion




//llamada a la funcion.
EnviarToken();



// fuencion que envia el token para finalizar la transaccion 
function EnviarToken() {

    const url = `https://api-m.sandbox.paypal.com/v2/checkout/orders/${token}/capture`
    fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + btoa(user + ':' + clave)
        },
        body: JSON.stringify({})
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if (data.status === "COMPLETED") {
                const idTransaction = data.purchase_units[0].payments.captures[0].id;
                console.log(data)
                const divCorrecto = document.createElement("div");
                divCorrecto.innerHTML = `<div class="col-sm-12 text-center">
                    <br />
                    <h1 class="text-success">Gracias!</h1>
                    <i class="far fa-check-circle fa-9x text-success"></i>
                    <h2 class="text-success"> Su pago fue realizado con exito</h2>
                    <h4> ID de Transacción : ${idTransaction}</h4>
                    <br />
                    <a href="http://127.0.0.1:5500/index.html" class="btn btn-primary">Volver a la tienda</a>
                    </div>`
                contenedor.appendChild(divCorrecto);
            }
            else
            {
                const divError = document.createElement("div");
                divError.innerHTML = `<div class="col-sm-12 text-center">
                <br />
                <h1 class="text-danger">Lo sentimos</h1>
                <i class="fas fa-exclamation-circle fa-9x text-danger"></i>
                <h2 class="text-danger"> Su pago no fue realizado</h2>
                <br />
                <a href="http://127.0.0.1:5500/index.html" class="btn btn-primary">Volver a la tienda</a>
                    </div>`
                contenedor.appendChild(divCorrecto);

            }
        })
        .catch(err => {
            console.log(err)
        })
}