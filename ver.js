let botonComent = document.getElementById("añadirComent");
botonComent.addEventListener("click",añadirComentario);


let id = window.location.search;
window.addEventListener("load",function(){
    fetch(`http://localhost:3000/posts/${id}`)
    .then(res =>{
        if(res.ok){
            return res.json();
        }
        return Promise.reject(res) 
    })
    .then(datos=>{
        datos.forEach (dato => {
            let cuerpo=document.getElementById("cuerpo");
            let textoNode = document.createTextNode(dato.cuerpo);
            cuerpo.appendChild(textoNode);
            let titulo=document.getElementById("titulo");
            let textoNode2 = document.createTextNode(dato.title);
            titulo.appendChild(textoNode2);
        })
    })
    .catch(err => {
        console.log('Error en la petición HTTP: '+err.message);
    });

    let formulario = document.getElementById("formComent");
    fetch(`http://localhost:3000/users`)
    .then(res =>{
        if(res.ok){
            return res.json();
        }
        return Promise.reject(res) 
    })
    .then(datos=>{
        datos.forEach(dato=>{
            let select = document.getElementById("users");
            let option = document.createElement("option");
            option.value = dato.nombre.toUpperCase();
            option.innerHTML=`${dato.nombre.toUpperCase()}`;
            select.appendChild(option);
        });
    })
    .catch(err => {
        console.log('Error en la petición HTTP: '+err.message);
    });

    let seccionComentarios = document.getElementById("comentariosDeUsuarios");
    fetch(`http://localhost:3000/comments`)
    .then(res =>{
        if(res.ok){
            return res.json();
        }
        return Promise.reject(res) 
    })
    .then(datosComents=>{
        datosComents.forEach(dato => {
            if (`?id=${dato.idPost}` == id){
                let autor = document.createElement("p");
                autor.className = "AutorComent";
                let textoAutor = document.createTextNode(dato.usuario);
                autor.appendChild(textoAutor);
                seccionComentarios.appendChild(autor);


                let cuerpo = document.createElement("p");
                cuerpo.className = "CuerpoComent";
                let textoComent = document.createTextNode(dato.cuerpo);
                cuerpo.appendChild(textoComent);
                seccionComentarios.appendChild(cuerpo);

                let fecha = document.createElement("p");
                fecha.className = "fechaComent";
                let fechaComent = document.createTextNode(dato.fecha);
                fecha.appendChild(fechaComent);
                seccionComentarios.appendChild(fecha);
            }
        }); 
    })
    .catch(err => {
        console.log('Error en la petición HTTP: '+err.message);
    });

    formulario.addEventListener("submit", (e)=>{
        e.preventDefault();
        añadirComentario();
    })

      
})

let idP = (new URLSearchParams(window.location.search)).get("id");
    function añadirComentario(){
        const datosComent={
            usuario: document.getElementById("users").value,
            cuerpo: document.getElementById("TextoComentario").value,
            fecha: (new Date (Date.now())).toDateString(),
            idPost: idP,
        }
        fetch(`http://localhost:3000/comments`,{
            method: "POST",
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify(datosComent)
        })
        .then(res =>{
        if(res.ok){
            return res.json();
            formulario.reload();
        }
        return Promise.reject(res) 
    })
       .catch(err => {
        console.log('Error en la petición HTTP: '+err.message);
        });
    }






