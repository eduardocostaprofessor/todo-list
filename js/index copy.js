document.getElementById('mais-item').addEventListener('click', novoItem)
document.getElementById('salvar-nota').addEventListener('click', cadastraItem)
// document.getElementById('fake-api').addEventListener('click', testarFetch)
document.getElementById('form-pesquisa').addEventListener('submit', pesquisarNota)
document.getElementById('pesquisar').addEventListener('keyup', pesquisarNota)

//variáveis globais
let id = 0 // itens da nota - inputs dos forulários
let notas = retornaStorage('notas') //array vazio ou array preenchido com as notas
let mensagem = ''
document.body.onload = geraTemplate(notas)

function pesquisarNota() {
    //para o evento padrão (no caso o evento do formulário)
    event.preventDefault()
    let arrPesquisa = []
    let pesquisa = document.getElementById('pesquisar').value.toLowerCase()

    for (let i = 0; i < notas.length; i++) {

        if (notas[i].titulo.toLowerCase().indexOf(pesquisa) >= 0)
            arrPesquisa.push(notas[i])
    }

    if (arrPesquisa.length > 0)
        geraTemplate(arrPesquisa)
}

function atualizaStorage(k, v) {
    localStorage.setItem(k, JSON.stringify(v))
}

function retornaStorage(k) {
    if (JSON.parse(localStorage.getItem(k)))
        return JSON.parse(localStorage.getItem(k))
    else
        return []
}

function criarElemento(nomeElemento, objProps = {}, texto = null, elPai = null) {
    //criar elemento
    let elemento = document.createElement(nomeElemento)

    if (texto !== null)
        elemento.appendChild(document.createTextNode(texto))

    //setar atributos

    for (const prop in objProps) {
        //            propriedade , valor  
        elemento.setAttribute(prop, objProps[prop])
    }

    if (elPai !== null)
        elPai.appendChild(elemento)

    return elemento
}

function geraTemplate(notasLocal) {
    //iterar o array de notas (nota a nota)
    document.getElementById('section-notas').innerHTML = ''

    for (let i = 0; i < notasLocal.length; i++) {
        //criar os elementos
        let article = criarElemento('article', { class: 'notas' }) //document.createElement('article') // <article></article>
        let h4 = criarElemento('h4', {}, notasLocal[i].titulo, article)
        let ul = criarElemento('ul')
        let p = criarElemento('p', { class: 'acoes' })

        // let aApple = document.createElement('a')
        let aApple = criarElemento('a', { href: "#" })
        let aAndroid = criarElemento('a', { href: "#" })
        let aChrome = criarElemento('a', { href: "#" })
        let aClose = criarElemento('a', { href: "#" })

        let iApple = criarElemento('i', {
            class: "fa fa-apple fa-wf",
            'aria-hidden': 'true'
        })

        let iAndroid = criarElemento('i', {
            class: "fa fa-android fa-wf",
            'aria-hidden': 'true'
        })

        let iChrome = criarElemento('i', {
            class: "fa fa-chrome fa-wf",
            'aria-hidden': 'true'
        })

        let iClose = criarElemento('i', {
            class: "fa fa-close fa-wf",
            'aria-hidden': 'true',
            onclick: 'excluirNota(this)',
            codigo: notasLocal[i].codigo
        })

        //iterando o array de itens da nota atual (item a item)
        for (let x = 0; x < notasLocal[i].itens.length; x++) {
            let li = criarElemento('li', {}, notasLocal[i].itens[x])
            ul.appendChild(li)
        }

        //gerar os append's necessários
        aApple.appendChild(iApple)
        aAndroid.appendChild(iAndroid)
        aChrome.appendChild(iChrome)
        aClose.appendChild(iClose)

        p.appendChild(aApple)
        p.appendChild(aAndroid)
        p.appendChild(aChrome)
        p.appendChild(aClose)

        //h4.appendChild(document.createTextNode(notas[i].titulo))

        // article.appendChild(h4)
        article.appendChild(ul)
        article.appendChild(p)


        //pra cada nota, você vai gerar um template
        document.getElementById('section-notas').appendChild(article)
    }

    limpaCampo()
}

function limpaCampo() {
    document.getElementById('limpar-nota').click()
    document.getElementById('div-new').innerHTML = ''
    id = 0
}

function cadastraItem() {
    //recuperar o título
    let titulo = document.getElementById('titulo').value

    //recuperar os itens
    let itens = document.getElementsByClassName('itens-lista'); //retorna um array com todos os inputs de itens

    if (validaCadastro(titulo, itens)) {
        let nota = {}
        nota.codigo = Math.random()
        nota.titulo = titulo.trim()
        nota.itens = []
            //cadastrar os itens
        for (let i = 0; i < itens.length; i++) {
            nota.itens.push(itens[i].value.trim())
        }

        notas.push(nota)
        localStorage.setItem('notas', JSON.stringify(notas))
        geraTemplate(notas)
    } else {
        alert(mensagem)
        mensagem = ''
    }
}

function validaCadastro(titulo, itens) {
    if (titulo.trim() == '') {
        mensagem = 'Preencha o título'
        return false
    }

    if (itens.length == 0) {
        mensagem = "Preencha pelo menos 1 item"
        return false
    }

    for (i = 0; i < itens.length; i++) {
        if (itens[i].value.trim() == '') {
            mensagem = `Preencha o item ${i + 1}`
            return false
        }

    }

    return true;
}

function novoItem() {
    //criar elementos
    let div = document.createElement('div')
    let label = document.createElement('label')
    label.appendChild(document.createTextNode(`Item ${id + 1}`))
    let input = document.createElement('input')
    let icone = document.createElement('i')
    let br = document.createElement('br')
    br.setAttribute('class', 'clear')
        // setar atributos
    label.setAttribute('for', '')

    input.setAttribute('type', 'text')
    input.setAttribute('id', `item${id}`)
    id++
    input.setAttribute('class', 'itens-lista')

    icone.setAttribute('class', 'fa fa-minus-square-o fa-lg')
    icone.setAttribute('aria-hidden', 'true')
    icone.setAttribute('style', 'margin-left: 1%;')

    //motar lego(div)
    div.appendChild(label)
    div.appendChild(input)
    div.appendChild(icone)
    div.appendChild(br)

    //inserir a div gerada em #div-new
    document.getElementById('div-new').appendChild(div)
    input.focus()
}

function excluirNota(icone) {
    if (confirm("Você quer excluir a nota?")) {
        let codigoNota = icone.getAttribute('codigo')
        for (let i = 0; i < notas.length; i++) {
            if (codigoNota == notas[i].codigo) {
                notas.splice(i, 1)
                localStorage.setItem('notas', JSON.stringify(notas))
            }
        }
        // icone.parentNode.parentNode.parentNode.remove()// apava o article
        //              i       a        p           article
        let article = icone.parentNode.parentNode.parentNode
        let section = document.getElementById('section-notas')
        section.removeChild(article)
    } //fim do confirm

}





/**
 * Teste de consumo de API Ajax com Fetch
 */
function testarFetch() {
    const urlTodos = 'https://jsonplaceholder.typicode.com/todos'
    const urlUnico = 'https://jsonplaceholder.typicode.com/todos/1dfdfd'
    fetch(urlUnico).then(function(resultado) {
        if (resultado.status == 404)
            throw 'página não encontrada'

        return resultado.json()

    }).then(function(objetoDados) {

        console.log(
            `
                código: ${objetoDados.id}
                descrição : ${objetoDados.title}
            `
        );

    }).catch(function(e) {
        console.log(`Deu pau: ${e}`);
    })
}