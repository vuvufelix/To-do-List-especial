const add = document.querySelector("#add");
const task_input = document.querySelector("#task_input");
const tasks = document.querySelector("#tasks");
const tarefa = document.querySelector("#tarefa");
const btn_add = document.querySelector("#btn_add");

let tarefas = [];

// --- Funções principais ---

// Carrega as tarefas do localStorage e as renderiza na tela
function carregarTarefas() {
    const dadosSalvos = localStorage.getItem("tarefas");
    
    // Se houver dados salvos, converte de JSON para array
    if (dadosSalvos) {
        tarefas = JSON.parse(dadosSalvos);
    }
    renderizarTarefas();
}

// Salva a array de tarefas no localStorage
function salvarTarefas() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function delete_() {
    const delet = [...document.querySelectorAll(".deletar")]
    delet.forEach(element => {
        element.addEventListener("click", (evento) => {
            let def_ = evento.target.parentNode.parentNode

            let filters = tarefas.find(element => {
                if(element.id == def_.getAttribute("id")) {
                    return element
                }
            })

            let pos = tarefas.indexOf(filters)
            tarefas.splice(pos, 1)
            def_.remove()
            salvarTarefas()
            document.getElementsByTagName("strong")[0].innerHTML = tarefas.length
        })
    })
}

// Renderiza todas as tarefas na tela
function renderizarTarefas() {
    // Limpa o conteúdo atual da lista para evitar duplicatas
    tasks.innerHTML = "";
    
    document.getElementsByTagName("strong")[0].innerHTML = tarefas.length
    
    tarefas.forEach(item => {
        const taskHTML = `
        <div class="task" id="${item.id}">
        <span class="ref">
        <span>${item.texto}</span>
        </span>
        <div id="icons">
        <i class="fa-solid fa-circle-check"></i>
        <i class="fa-regular fa-circle"></i>
        <i class="fa-solid fa-pen"></i>
        <i class="fa-solid fa-trash-can deletar"></i>
        </div>
        </div>
        `;
        tasks.innerHTML += taskHTML;
    });
    update_()
    delete_()
}

function update_() {
    const fa_pen = [...document.querySelectorAll(".fa-pen")]
    fa_pen.forEach(element => {
        element.addEventListener("click", (evento) => {

            let def_ = evento.target.parentNode.parentNode
            
            let filters = tarefas.find(element => {
                if(element.id == def_.getAttribute("id")) {
                    return element
                }
            })

            const textoTarefa = tarefa.value = filters.texto

            if (task_input.style.bottom === "20%") {
                task_input.style.bottom = "-100%";
            } else {
                task_input.style.bottom = "20%";
            }

            const btn_update = document.querySelector("#btn_update")

            btn_update.addEventListener("click", (evento) => {
                evento.preventDefault();

                if(filters) {

                    if (textoTarefa) {
    
                        filters.texto = textoTarefa
                        salvarTarefas()
                    }
                }
            })

        })
    })
}

// --- Event Listeners ---

// Mostra/esconde o campo de input para adicionar nova tarefa
add.addEventListener("click", (evento) => {
    if (task_input.style.bottom === "20%") {
        task_input.style.bottom = "-200%";
    } else {
        task_input.style.bottom = "20%";
    }

    let targetParent = evento.target.parentNode
    const find_modal = document.getElementById("find_modal")

    if(targetParent.className == "btn_x") {
        targetParent.classList.remove("btn_x")
        targetParent.classList.add("btn_x1")
        find_modal.style.display = "block"
    } else {
        targetParent.classList.remove("btn_x1")
        targetParent.classList.add("btn_x")
        find_modal.style.display = "none"
    }
});

// Adiciona uma nova tarefa à lista
btn_add.addEventListener("click", (evento) => {
    evento.preventDefault();
    const textoTarefa = tarefa.value.trim(); // .trim() remove espaços em branco extras
    
    if (textoTarefa) {
        // Cria um ID único usando a data e hora atual
        const novaTarefa = {
            id: Date.now(),
            texto: textoTarefa,
            concluida: false
        };

        tarefas.push(novaTarefa);
        salvarTarefas(); // Salva a array atualizada no localStorage
        renderizarTarefas(); // Renderiza a lista atualizada
        tarefa.value = ""; // Limpa o campo de input
    }
});

// --- Início do script ---
// Chama a função para carregar as tarefas quando a página é carregada

//delete_()
carregarTarefas();
//update_()

const circles = document.querySelectorAll(".fa-circle")
const circle = [...circles]

circle.forEach(check => {
    
    check.addEventListener("click", (evento) => {
        let element_f = evento.target.parentNode.parentNode

        let filters = tarefas.find(element => {
            if(element.id == element_f.getAttribute("id")) {
                return element
            }
        })

        filters.concluida = true

        if(evento.target) {
            evento.target.style.display = "none"
            element_f.querySelector(".fa-circle-check").style.display = "block"
            let check_f = check.parentNode.parentNode
            let inx = [...check_f.querySelector(".ref").children]
            inx.forEach(element => {
                element.classList.add("rasp")
            })

        }
    })

    let check_f = check.parentNode
    check_f.querySelector(".fa-circle-check").addEventListener("click", (evento) => {
        
        let filters = tarefas.find(element => {
            if(element.id == check_f.parentNode.getAttribute("id")) {
                return element
            }
        })

        filters.concluida = false

        if(evento.target.style.display == "block") {
            evento.target.style.display = "none"
            check_f.querySelector(".fa-circle").style.display = "block"
            let check_g = check.parentNode.parentNode
            let iny = [...check_g.querySelector(".ref").children]
            iny.forEach(element => {
                element.classList.remove("rasp")
            })
        }
    })

})