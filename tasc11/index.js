"use stric"

let form = document.querySelector('#form');
let tablBody = document.querySelector('#tabl-body');
let inputName = document.querySelector('#input-name');
let inputAge = document.querySelector('#input-age');
let inputEmail = document.querySelector('#input-email');

let editUserName = document.querySelector('#name');
let editUserAge = document.querySelector('#age');
let editUserEmail = document.querySelector('#email');
let editUserBtn = document.querySelector('.edit-user-btn')

let URL = "http://localhost:5757/";




//-API DATA----------------
async function test(url) {
    try{
       let respons = await fetch(`${url}user`);
       let result = await respons.json();
       tablBody.innerHTML=`<span class="loader"></span>`
       render(result)
    }catch(e){
       console.log(e);
    }
} test(URL)
//------------------------------





//RENDER DATA --------------------
function render(data) {
    tablBody.innerHTML=''
    data.reverse().forEach((el,id)=> {
        let tr = document.createElement('tr');
        tr.innerHTML=`
        <th scope="row">${id+1}</th>
        <td>${el.name}</td>
        <td>${el.age}</td>
        <td>${el.email}</td>
        <td>
            <button data-edit='${el.id}' class="btn btn-primary edit" data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button>
            <button data-delete='${el.id}' class="btn btn-danger delete">Delete</button>
        </td>
        `
        tablBody.append(tr)
    });
}
//----------------------------------





//-API POST DATA-----------------------
async function apandData() {
    tablBody.innerHTML=`<span class="loader"></span>`
    let data = {
        name: inputName.value,
        age: inputAge.value,
        email: inputEmail.value
    }
    
    try{
        const respons = await fetch(`${URL}user`,{
            method: "POST",
            headers:{
                "Content-Type": "application/json",
            },
            body:JSON.stringify(data)
        });
        
        test(URL);
        

    }catch(e){
        console.log(e);
    }
    
    
}
//------------------------------------------






//-FORM SUBMIT-----------------
form.addEventListener('submit', (e)=>{
    e.preventDefault()
    apandData()
    form.reset()
   
})
//-------------------------






//DELETE USER-------------------
async function deleteUser(id) {
    let respons = await fetch(`${URL}user/${id}`,{
        method: 'DELETE'
    })

}


tablBody.addEventListener('click' , (e)=>{

    //Condishin delet uyser
    if(e.target.classList.contains('delete')){
        let id = e.target.getAttribute('data-delete');
        deleteUser(id)

        setTimeout(()=>{
            window.location.reload()
        },600)
    }
     //Condishin dedit uyser
    if(e.target.classList.contains('edit')){
        let id = e.target.getAttribute('data-edit');
        editUser(id);
        localStorage.setItem('userId', id)
        
    }
})
//-----------------------------------------------






//--EDIT USER DATA WATCH-------------------
async function editUser(id) {
    let respons = await fetch(`${URL}user/${id}`);
    let result = await respons.json()

    
    editUserName.value = result.name;
    editUserAge.value = result.age;
    editUserEmail.value = result.email;

}
//--------------------------------------------------





//--EDIT USER PUT ----------------------------

editUserBtn.addEventListener( 'click',() => {
    let id = localStorage.getItem('userId');
    editNuwUser(id)

})


async function editNuwUser(id) {

    let editUserData = {
        name: editUserName.value,
        age: editUserAge.value,
        email: editUserEmail.value
    }

    try{
        let respons = await fetch(`${URL}user/${id}`,{
            method: "PUT",
            headers:{
                "Content-Type": "application/json",
            },
            body:JSON.stringify(editUserData)
            
        })

        test(URL);
    }catch(err){
        console.log(err);
    }

}
//---------------------------------------------------------