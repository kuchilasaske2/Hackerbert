const url='http://localhost:8080/comment'
let comment;
let token;

document.onreadystatechange = () => {
    if(document.readyState =="complete"){
        commentGetAll();
    }
}

const commentGetAll = () => {
    //$.getJSON(`${url}/all`, function(data) {
    //    fillList(data);
    //});
    token = localStorage.getItem("token");

        $.ajax({
            type: 'GET',
            url: `${url}/all`,
            contentType: 'application/json',
            dataType: 'json',
            headers: {"token": token},
            success: (res) => { fillList(res) }
        });
    
}

const fillList = (comment) => {

    console.log(comment);

    comment = comments;//"comment" cria um array(vetor) que assim que cicla cria as "li"

    const ul = $("<ul>"); //cria uma variavel nova utilizando "ul"

    tasklist.forEach(e => {
        const li = $("<li>");
        const chk = $(`<input type='checkbox' id='${e.id}' 
                                            value='${e.id}' 
                                            ${e.status == 'DONE' ? 'checked' : ''} onclick='markToggle(this.value)'>`);
        const lbl = $(`<label for=${e.id}>`).append(e.description);
        const btn = $(`<button id='del-${e.id}'
                        onclick='deleteTask(this.id)'
                        >Excluir</button>`)
        ul.append(li.append(chk, lbl, btn));
    });
    $("#task-list").empty();
    $("#task-list").append(ul);

}

const authenticate =() =>{
    const email = $("#e").val();
    const password = $("#p").val();
    const body = `{"email": "${email}", "senha": "${password}"}`

    $.ajax({type: 'POST',
            url:'http://localhost:8080/auth',
            contentType: 'application/json',
            dataType: 'json',
            data: body,
            success: (res) => { token = res.token;
                                localStorage.setItem("token", token);
                                console.log(token);
                                commentGetAll();
                            }
});
}

const search = (obj) => {
    const text = $("#addcomment-text").val();
    
    token = localStorage.getItem("token");

    $.ajax({
        type: 'GET',
        url: `${url}/search?q=${text}&s=p`,
        contentType: 'application/jason',
        dataType: 'json',
        headers: {"token": token},
        success: (res) => { fillList(res) }
    });
}

const markToggle = (commentId) =>{
    console.log(commentId);
    const c = comment.find(e => e.id == commentId);
    console.log(c);

    const body = `{"description": "${c.description}",
                    "status": "${(c.status == 'DONE') ? 'PENDING' : 'DONE'}",
                    "notes": "${c.notes}"}`

    $.ajax({
        type: 'PUT',
        url: `${url}/${c.id}`,
        data: body,
        contentType: 'application/json',
        dataType: 'json',
        success: (res) => {commentGetAll();}
    })
}

const deleteComment = (commentId) => {
    const id = commentId.substring(4);
    $.ajax({
        type: 'DELETE',
        url:`${url}/${id}`,
        contentType: 'application/json',
        dataType: 'json',
        success: (res) => {commentGetAll();}
    })
}

const commentCreate = () => {
    const text = $("#addcomment-text").val();
    const body = `{"text": "${text}"}`;

    $.ajax({
        type: 'POST',
        url: url,
        data: body,
        contentType: 'application/json',
        dataType: 'json',
        headers: {"token": localStorage.getItem("token")},
        success: (res) => {commentGetAll();}
    })
}
