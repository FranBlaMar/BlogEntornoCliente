window.addEventListener("load",function(){
    fetch('http://localhost:3000/posts')
    .then(res =>{
        if(res.ok){
            return res.json();
        }
        return Promise.reject(res) 
    })
    .then (datos=> {
        //Guardamos el array con todos los posts
        datos.forEach (post => {
            /*Creacion de cada celda de la tabla. Se usa un bucle for para crear tantas celdas como datos
            nos haya devuelto la peticion GET.
            Se crea un tr donde añadimos el restos de tds con los datos del autor, titulo y los botones de borrar y ver*/
            
            //Bloque de creacion de tr,td y textnodes
            //---------------------------------------------------------//
            let tr = document.createElement("tr");
            let titulo = document.createElement("td");
            let autor = document.createElement("td");
            let acciones = document.createElement("td");
            let textotitulo = document.createTextNode(post.title);
            titulo.appendChild(textotitulo);
            let textoautor = document.createTextNode(post.author);
            autor.appendChild(textoautor);
            let botonBorrar = document.createElement("button");
            let botonBorrarText=document.createTextNode("Borrar");
            botonBorrar.appendChild(botonBorrarText);
            acciones.appendChild(botonBorrar);
            botonBorrar.id = post.id;
            //añadimos evento click al boton de borrar y de ver más
            botonBorrar.addEventListener("click",borrarPost);
            let botonVer = document.createElement("button");
            let botonVerText=document.createTextNode("Ver más");
            botonVer.appendChild(botonVerText);
            acciones.appendChild(botonVer);
            botonVer.addEventListener("click",function(){
                location.href=`ver.html?id=${post.id}`;
            });
            //------------------------------------------------------//
            tr.appendChild(autor);
            tr.appendChild(titulo);
            tr.appendChild(acciones);

            //Añadimos finalmente el TR a la tabla
            document.getElementById("tabla").appendChild(tr);
        })
    })
    .catch(err => {
        console.log('Error en la petición HTTP: '+err.message);
    });
})

//Cómo obtener los parámetros de la URL usando JavaScript.
function borrarPost (e){
    let id = e.target.id;
    fetch(`http://localhost:3000/posts/${id}`, {
        method:"DELETE",
    })
    //añadimos evento a la peticion
    .then(res =>{
        if(res.ok){
            return res.json();
        }
        return Promise.reject(res) 
    })
    .then(res =>{
        console.log(res);
        alert("Post Borrado :(");
        let tabla = document.getElementById("tabla");
        let tr = document.getElementsByTagName("tr")[posicion];
        tabla.removeChild(tr);
    })
    .catch(err => {
        console.log('Error en la petición HTTP: '+err.message);
    });
}


window.addEventListener("load",function(){
    fetch("http://localhost:3000/users")
    .then(res =>{
        if(res.ok){
            return res.json();
        }
        return Promise.reject(res) 
    })
    .then(res => {
        res.forEach(usuario=>{
            let select = document.getElementById("users");
            let option = document.createElement("option");
            option.value = usuario.nombre.toUpperCase();
            option.innerHTML=`${usuario.nombre.toUpperCase()}`;
            select.appendChild(option);
        });
    })
    .catch(err => {
        console.log('Error en la petición HTTP: '+err.message);
    });
})


let botonPost = document.getElementById("añadirPost");
botonPost.addEventListener("click",añadirPost);
let formulario = document.getElementById("formPost");
formulario.addEventListener("submit", (e)=>{
    e.preventDefault();
    añadirPost();
})

function añadirPost(){
    const datosPost={
        title: document.getElementById("TituloPost").value,
        author: document.getElementById("users").value,
        cuerpo: document.getElementById("CuerpoPost").value,
    }
    fetch(`http://localhost:3000/posts`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body: JSON.stringify(datosPost)   
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