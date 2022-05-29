const listo = document.querySelector("#listo")
const input = document.querySelector("#input")


const palabra = ["perro","gato","conejo","caramelo","camote","leon","chiquito","arbol","melon","blanco","negro"]
function nuevaPalabra(){
    palabra.push(input.value)
    input.value = ""
    start.style.display = "block"
    agregar.style.display = "block"
    contenedorNuevaPalabra.style.display = "none"
    h4.style.display = "none"
    listo.style.display = "none"   
}
listo.addEventListener("click", nuevaPalabra)