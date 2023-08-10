const background = document.querySelector(".container")
const result = document.querySelector('.result')
const background_props = background.getBoundingClientRect()
const character = document.querySelector("#character")
let traps = document.querySelectorAll('.trap')
let character_props = character.getBoundingClientRect()

const gameStart = document.querySelector(".start-game")
const gameRestart = document.querySelector(".restart-game")


let gameStarted = false

let jumpingCount = 2

const movementSpeed = 1.8

let time = 1500

let enterWasClicked = false


function play(){
    function trapElement(){


        const traps = ['no-trap','trap','trap water']

        const trapIndex = Math.floor(Math.random() * (traps.length))
        
        let selectedClass = traps[trapIndex].split(" ")


        if(gameStarted){
        let trap = document.createElement('div')

        if(selectedClass[0] !== 'no-trap' && selectedClass[1] !='water'){
            let symbol = document.createElement('img')
            symbol.src = 'assets/vulkan.gif'
            symbol.classList.add('trap-image')
        

        trap.appendChild(symbol)
        }

        

        trap.classList.add(...selectedClass)

        background.appendChild(trap)
        }
    }
    
    function applyGravity(){
        
        if(gameStarted){
            const gravityAmount = 1.8   
            character_props = character.getBoundingClientRect()  
        
        
            if(character_props.bottom < background_props.height){
                character.style.top = character_props.top + gravityAmount  + "px"
            }
            else if(character_props.bottom == background_props.height){
                character.style.top = character_props.top  + "px"
                jumpingCount = 2
            }
        }
        
    
    
    
        requestAnimationFrame(applyGravity)
    
    }
    
    requestAnimationFrame(applyGravity)
    
    setInterval(trapElement,1500)
    
    function trapMoves(){
    
       
            if(gameStarted){
                traps = document.querySelectorAll('.trap')
    
                traps.forEach((trap)=>{
                trap_props = trap.getBoundingClientRect()
    
    
                trap.style.left = trap.offsetLeft - movementSpeed + 'px' 
    
    
                trap_props = trap.getBoundingClientRect()
    
    
    
                if(character_props.right<= trap_props.right && character_props.right>= trap_props.left && character_props.bottom >= trap_props.top){
                    gameRestart.style.display = 'block'
                    gameStarted=false
                }else if(trap_props.right < character_props.left){
                    result.innerHTML = +result.innerHTML +1
                    trap.remove()
            
                }
        })
            }
        
    
    
        requestAnimationFrame(trapMoves)
    
    }
    
    requestAnimationFrame(trapMoves)
}


play()



gameRestart.addEventListener('click',()=>{
    window.location.reload()
})


window.addEventListener('keydown',(e)=>{
    if(e.key == " "){

        if(jumpingCount && gameStarted){
    
          jumpingCount -=1
    
          character_props = character.getBoundingClientRect()
      

          character.style.top = character_props.top - 90 +"px"
          
        }
      }
})

window.addEventListener('keydown',(e)=>{
    if(e.key === 'Enter' && !enterWasClicked){
        enterWasClicked = true
        gameStart.remove()

        gameStarted = true
    }
})