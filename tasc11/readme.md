## Funcsiyalaerga qisqa tarif

1. 

```
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
```

- Bu funcsiya asinhron funcsiay bolib ichida "try"  va "catch" bloglari mavjud bo'lib bu blo'glar asosan api bn ishlashlikda hatliklar ushlashlik uchun yordam beradi asinhron funcsiya esa bizga prmis bloglarini chetlab o'tishlikda yordam beradi , agar bu funcsiyamiz asinhro'n bo'lmaganligida "fetch"  dan qaytgan promisni o'zini meto'dlari bilan natijani chiqarib olishligimiz kerak bo'lar edi bu esa o'z navbatida bizga birqancha noqulayliklarni keltirib chiqarar edi .

- Bu funcsiyamiz majarayotga ish biz kiritgan URL asosida bazadan userlar datasini olib kelib beraybti va shu bilan birgalikda kelgan natijani boshqa bir funcsiyaga 'render(result)' berib yuboryabdi.

<hr>

2. 

```
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
```

- Bu funcsiyamiz o'ziga bitta argument oladi va shu argument sifatida yqoridagi funcsiyamizda olinga data qiymat sifatida berilgan , vazifasi qiymat sifatida berilgan datani yani masivni forEach() metodi yordamida harbitta elament uchun  teg yaratib berilgan data yordamida unga malumotlar biriktiradi va tanlab olingan static elament ishiga joylashtiradi , bir so'z bilan aytganda dinamic teg yasaydi desak ham bo'ladi.

<hr>

3. 

```
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
```
- Bu funcsiyamiz ham asinhron bo'lob asosiy bajaradigan vazifasi bazadegi malumaotlarga yangi malumot qo'shish , funcsiyani thalil qilsak ishnig avvalida " data " nomli o'zgaruvchiga formadagi kiritilgan ma'lumotlarni bita object sifatida yigib oladi va shu malumotlarni bazga qosadi bu jarayoni try bol'gida qanday amalga oshishligini korishligimiz mumkun .

<hr>

4. 

```
async function deleteUser(id) {
    let respons = await fetch(`${URL}user/${id}`,{
        method: 'DELETE',
        headers:{
            "Content-Type": "application/json",
        },
    })

}
```

- Bu funcsiyamiz o'ziga qiymat sifatida berilgan id yordamida bazadagi shu id asosida shakilagan malumotlarni ochiradi .

<hr>

5. 

```
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
```

- Bu funcsiyanig asosiy bajarayotgan ishi bazadagi malumotlarni o'zgartiish , tahlil qilsak avaida ozgarishi kerak bo'lgan ma'lumotlarni object yigib olayabdi va funcsiyaga qiymat sifatida berilgan id orqali ozgarishi kerak bo'lgan malumotni bazadan topinb olayabdi va o'zinig "PUT" meto'di yordamida o'zgarishi kerak b'lgan malmotlarni o'zgaruvch ma'lumotlar bilan o'zgartirmoqda .
