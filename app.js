const container = document.querySelector("#container")
const letrasUsadas = document.querySelector("#letrasUsadas")
const start = document.querySelector("#start")
const agregar = document.querySelector("#agregar")
const h4 = document.querySelector("#h4")
const contenedorNuevaPalabra = document.querySelector("#contenedorNuevaPalabra")
const contenedorFestejo = document.querySelector(".contenedorFestejo")

let canvas = document.querySelector("#canvas")
let ctx = canvas.getContext("2d")
ctx.canvas.width = 0
ctx.canvas.heigth = 0

const partesCuerpo =[
   [4.5,2.5,0.5,0,Math.PI*2],
    [4,3,1,2],
    [3,5,1,1],
    [5,5,1,1],
    [3,3,1,1],
    [5,3,1,1]
]

let selectorPalabra;
let usarLetras;
let errores;
let aciertos;

const addLetter = letter =>{
    const letterElement = document.createElement("span")
    letterElement.innerHTML = letter.toUpperCase()
    letrasUsadas.appendChild(letterElement)
}

const dibujarCabeza = ()=>{
    ctx.fillStyle = "while"
    ctx.beginPath()
    ctx.arc(4.5,2.5,0.5,0,Math.PI*2)
    ctx.fill()
}

const addPartesCuerpo = partesCuerpo =>{
    ctx.fillStyle = "white"
    ctx.fillRect(...partesCuerpo,dibujarCabeza())
    
    
}

const wongLetter = ()=>{
    addPartesCuerpo(partesCuerpo[errores])
    errores++
    if(errores===partesCuerpo.length) endGame()
}

const endGame = ()=>{
    document.removeEventListener("keydown", letterEvent)
    start.style.display = "block"
    agregar.style.display = "block"
    

}

const correctLetter = letter =>{
    const {children} = container
    for(let i = 0; i < children.length; i++){
     if(children[i].innerHTML === letter){
        children[i].classList.toggle("hidden")
        aciertos++
        }
        
    }
    
    if(aciertos ===selectorPalabra.length){
        endGame()
        ganaste() 
    } 
}

const letterImput = letter =>{
    if(selectorPalabra.includes(letter)){
       correctLetter(letter)
    }else{
      wongLetter()
    }
    addLetter(letter)
    usarLetras.push(letter)
}

const letterEvent = event =>{
    let nuevaLetra = event.key.toUpperCase()
    if(nuevaLetra.match(/^[a-zñ]$/i) && !usarLetras.includes(nuevaLetra)){
      letterImput(nuevaLetra)
    }
}

const dibujarPalabra =()=>{
    selectorPalabra.forEach(letter => {
        const letterElement = document.createElement("span")
        letterElement.innerHTML = letter.toUpperCase()
        letterElement.classList.add("letter")
        letterElement.classList.add("hidden")
        container.appendChild(letterElement)
    });
}


const random = ()=>{
    let word = palabra[Math.floor((Math.random()*palabra.length))].toUpperCase()
    selectorPalabra = word.split("")
}

const dibujarOrca = ()=>{
    ctx.canvas.width = 120
    ctx.canvas.heigth = 160
    ctx.scale(20,20)
    ctx.clearRect(0,0,canvas.width,canvas.heigth)
    ctx.fillStyle = "black"
    ctx.fillRect(0,7,4,1)
    ctx.fillRect(1,0,1,8)
    ctx.fillRect(2,0,3,1)
    ctx.fillRect(4,1,1,1)

}




const agregarPalabras =()=>{
    
    start.style.display = "none"
    agregar.style.display = "none"
    contenedorNuevaPalabra.style.display = "block"
    h4.style.display = "block"
    listo.style.display = "block"   
}



function ganaste(){
    const deNuevo = document.createElement("button")
    deNuevo.textContent = "Nuevo"
    contenedorFestejo.appendChild(deNuevo)
    deNuevo.classList.add("deNuevo")
    letrasUsadas.style.display = "none"
    container.style.display = "none"
    contenedorNuevaPalabra.style.display = "none"
    contenedorFestejo.style.display = "flex"
    agregar.style.display = "none"
    h4.style.display = "none"
    start.style.display = "none"
    deNuevo.addEventListener("click", recetear)
}
function recetear(){
    contenedorFestejo.style.display = "none"
    agregar.style.display = "block"
    h4.style.display = "block"
    start.style.display = "block"
    container.innerHTML = ""
    container.style.display = "block"
    letrasUsadas.innerHTML = ""
    letrasUsadas.style.display = "block"
    
    
}




const startGame =()=>{
    usarLetras = []
    errores = 0
    aciertos = 0
    container.innerHTML = ""
    letrasUsadas.innerHTML = ""
    start.style.display = "none"
    agregar.style.display = "none"
    dibujarOrca()
    random()
    dibujarPalabra()
    document.addEventListener("keydown", letterEvent)
    
}
start.addEventListener("click", startGame)
agregar.addEventListener("click", agregarPalabras)

// Obtener todos los botones del teclado
const keyboardButtons = document.querySelectorAll(".keyboard-key");

// Función para manejar el evento de clic en un botón del teclado
const handleKeyboardButtonClick = (event) => {
    // Obtener la letra asociada al botón del teclado
    const letter = event.target.textContent;

    // Llamar a la función letterInput para manejar la entrada de la letra
    letterImput(letter);
};

// Agregar un event listener a cada botón del teclado
keyboardButtons.forEach(button => {
    button.addEventListener("click", handleKeyboardButtonClick);
});
