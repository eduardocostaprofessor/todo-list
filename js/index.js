/* 
    VARIÁVEIS GLOBAIS 
        - podem ser acessadas dentro das funções 
        - e não perderão seu valor após o fim da execução da função 

*/
let idItem = 0;

/**
 * Função que apaga todos os campos de formulários e zera o idItem
 */
function zerarFormulario() {
    
    document.getElementById('titulo').value = '';
    document.getElementById('div-new').innerHTML = "";
    idItem = 0;
}




function limpaCampos() {
    //apaga o texto do input titulo
    document.getElementById('titulo').value = '';

    //percorrer todos os inputs para apagar os textos(value) de cada um
    let arrItens = document.getElementsByClassName('itens-lista');

    for(let i = 0; i < arrItens.length; i++){
        var id = 'item'+i;
        document.getElementById(id).value = '';
    }
}

function validaDados(titulo, itens) {
   
   if( titulo == '' ) return false;

    if (itens.length == 0) {//não tem itens
        return false;
    } else {//tem itens
        //verificar cada item
        for (let i = 0; i < itens.length; i++) {//roda todo o array de itens
            
            if( itens[i].value == '' ){//item vazio
                return false;
                break;//para de verificar os outros
            }
        }
    }

    return true;//última alternativa
}


function cadastrarSemDom() {
    let titulo = document.getElementById('titulo').value;
    //montar os ítens de lista baseados nos inputs
    //retorna uma array com todos os inputs(OBJETOS) que tem a classe itens-lista
    let arrItens = document.getElementsByClassName('itens-lista');

    /*
    console.log(arrItens);//array de objetos
    console.log(arrItens[0]);//objeto que está no índice 0 do array
    console.log(arrItens[0].value);
    */
    
    if ( validaDados(titulo, arrItens) ) {//se tiver pelo menos 1 item
        let lis = '';//template vazio

        for (let i = 0; i < arrItens.length; i++) {
            // montar o template com todos os ítens dentro do array
            // arrItens[i].value - pega o value do objeto INPUT corrente
            lis += `<li>${arrItens[i].value}</li>`;
        }


        let templateNota = `
                <article class="nota">
                    <h4>${titulo}</h4>
                    <ul>${lis}</ul>
                    <p class="acoes">
                        <a href="#"><i class="fa fa-apple fa-wf" aria-hidden="true"></i></a>
                        <a href="#"><i class="fa fa-android fa-wf" aria-hidden="true"></i></a>
                        <a href="#"><i class="fa fa-chrome fa-wf" aria-hidden="true"></i></a>
                        <a href="#"><i onclick="removeNota(this)" class="fa fa-close fa-wf" aria-hidden="true"></i></a>
                    </p>
                </article>
            `;

        document.getElementById('section-notas').innerHTML += templateNota;
        zerarFormulario();
    } else { //fim do if
        alert("Você deve cadastrar pelo menos 1 item. Não se esqueça do título");

    }
}//fim da função


function removeNota(elemento) {
    // console.log(elemento.parentNode.parentNode.parentNode);
    //article a remover
    let article = elemento.parentNode.parentNode.parentNode;
    document.getElementById('section-notas').removeChild(article);
}

function excluiLinha(divLinha) {
    
    document.getElementById('div-new').removeChild(divLinha);//exelui o filho (div da linha)
}

function novoItem() {
    
    let template = `
            <div id="linha${idItem}">
                <label for="item${idItem}">ITEM ${(idItem + 1)}</label>
                <input type="text" id="item${idItem}" class="itens-lista">
                <i onclick="excluiLinha(linha${idItem})" class="fa fa-minus-square-o fa-lg" aria-hidden="true" style="margin-left: 1%;"></i>
                <br class="clear">
            </div>
        `;
    document.getElementById('div-new').innerHTML += template;

    idItem++;
}