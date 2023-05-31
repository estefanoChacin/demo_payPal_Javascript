const nombreProducto = document.getElementById("nombreProducto").textContent; //obtener el nombre del producto
const precio = document.getElementById("precio").value;// obtener el precio

const user = "AT6MFYD64Ivz_qiZBW5gb_vZiJd049hownBVRru97LLCxyVuXs1ckyr3Wlylzf7GXC2He2Udp5qzo2fZ";//client id
const clave = "EEeg4gAFTeh6Tl_OGRLeFOFNEr7-BR99usYcQp-jRnaCazkIOwj_knCp77LcEq_GYAuNZIkmZ2b0LHyT";//secret key

//objecto que recopila la indormacion para ser enviado a la api como json
const objeto = {
    intent: "CAPTURE",
    purchase_units: [
      {
        items: [
          {
            name: nombreProducto,
            description: nombreProducto,
            quantity: "1",
            unit_amount: {
              currency_code: "USD",
              value: precio.trim(),
            },
          },
        ],
        amount: {
          currency_code: "USD",
          value: precio.trim(),
          breakdown: {
            item_total: {
              currency_code: "USD",
              value: precio.trim(),
            },
          },
        },
      },
    ],
    application_context: {
      return_url: "http://127.0.0.1:5500/exito.html",
      cancel_url: "http://127.0.0.1:5500/index.html",
    },
  };



//funcion que envia la orden de la transaccion a paypal
function pagar()
{
    

    fetch("https://api-m.sandbox.paypal.com/v2/checkout/orders",{
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + btoa(user + ':' + clave)//enviar la autenticacion basica en el header
        },
        body: JSON.stringify(objeto)
    })
    .then(response => response.json())
    .then(data => {
        
        if(data.status === "CREATED")
        {
            let links = data.links;

            const linkAprove = links.find(item => item.rel === "approve"); //buscar la url aprovada del json de respuesta
            window.location.href = linkAprove.href //redirigir con la url obtenida.
        }
    })
    .catch(err =>{
        console.log(err)
    })
}