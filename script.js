const timer = document.querySelector("#timer")
const startPause = document.querySelector("#startPause")
const stop = document.querySelector("#stop")
const audio = document.querySelector("audio")
const divAlert = document.querySelector("#alert")
const divAlert2 = document.querySelector("#alert2")
const btnConfirm = document.querySelector("#confirm")
const btnConfirm2 = document.querySelector("#confirm2")

// para o timer e reseta seu valor
function stopTimer(interval) {
    timer.value = "00:00:00"
    clearInterval(interval)
}

// converte o valor do display em milisegundos
function converterMilisegundos() {
    let timerAtual = timer.value
    horasEmMilisegundos = Number(timerAtual.substring(0, 2)) * 3600000
    minutosEmMilisegundos = Number(timerAtual.substring(3, 5)) * 60000
    segundosEmMilisegundos = Number(timerAtual.substring(6, 8)) * 1000

    timerAtualMilisegundos = horasEmMilisegundos + minutosEmMilisegundos + segundosEmMilisegundos

    return timerAtualMilisegundos
}

// converte os milisegundos em modo display novamente hh:mm:ss
function converterHorario(timerAtualMilisegundos) {
    milisegundosEmHoras = parseInt((timerAtualMilisegundos / 3600000))
    milisegundosEmMinutos = parseInt((timerAtualMilisegundos / 60000) % 60)
    milisegundosEmSegundos = parseInt((timerAtualMilisegundos / 1000) % 60)

    let hora = milisegundosEmHoras < 10 ? "0" + milisegundosEmHoras : milisegundosEmHoras
    let minuto = milisegundosEmMinutos < 10 ? "0" + milisegundosEmMinutos : milisegundosEmMinutos
    let segundo = milisegundosEmSegundos < 10 ? "0" + milisegundosEmSegundos : milisegundosEmSegundos

    timer.value = `${hora}:${minuto}:${segundo}`
}

function startTimer() {
    let interval = setInterval(() => {

        // Se o botão for de pause ele para o set interval
        let img_button = startPause.children[0]
        if (img_button.id == "start") {
            clearInterval(interval)
        } else {

            // Se clicar no botão stop ele para e reseta o valor do display
            stop.addEventListener("click", () => {
                let img_button = startPause.children[0]
                img_button.src = "src/not_started.svg"
                img_button.id = "start"
                stopTimer(interval)
            })

            // decrementa os milisegundos
            let cms = converterMilisegundos()
            cms -= 1000

            // Se o timer chegar a zero muda o icone toca uma musica e cria um alerta
            if (cms < 1000) {

                // muda icone para start novamente
                stopTimer(interval)
                let img_button = startPause.children[0]
                img_button.src = "src/not_started.svg"
                img_button.id = "start"

                // Cria um elemento de musica e faz tocar com autoplay
                let newAudio = document.createElement("audio")
                newAudio.setAttribute("src", "src/Icelandic Arpeggios - DivKid.mp3")
                newAudio.setAttribute("loop", "")
                newAudio.setAttribute("autoplay", "")

                audio.appendChild(newAudio)
                
                // Criar uma div de alerta
                divAlert.style.display = "flex"
                btnConfirm.addEventListener("click", () => {
                    audio.removeChild(newAudio)
                    divAlert.style.display = "none"
                })

            } else {
                converterHorario(cms)
            }
        }
    }, 1000)
}

// Altera o icone de botão start e pause
startPause.addEventListener("click", () => {

    // Se o timer for 0 e tentar iniciar cria uma div de alerta informando o erro
    if (timer.value == "00:00:00") {
        divAlert2.style.display = "flex"
        btnConfirm2.addEventListener("click", () => {
            divAlert2.style.display = "none"
        })
    } else {

        // Alterna entre start e pause
        let img_button = startPause.children[0]

        if (img_button.id == "pause") {
            img_button.src = "src/not_started.svg"
            img_button.id = "start"
        } else {
            img_button.src = "src/pause.svg"
            img_button.id = "pause"
            startTimer()
        }
    }
})
