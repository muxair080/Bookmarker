console.log("Welcome to Bookmarker app");
let input = document.getElementsByClassName('input');
let Output = document.getElementById('Output');

let inputvalues = {
    sitename: document.getElementById('sitename'),
    url: document.getElementById('url')
};

let Data = [];

function GetData() {

    // create object assign vales of the input and push it to array
    let bookmark = {
        name: inputvalues.sitename.value,
        URL: inputvalues.url.value
    };
//    console.log(regex.test(bookmark.URL));
   const regex = /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm;
//    console.log(regex.test(bookmark.URL));
    // check condition if name or url input in empty it will be not submitted
    if(bookmark.name === '' || bookmark.URL === '' || regex.test(bookmark.URL) == false){
        alert('Please Enter Name and Link of the Source');
    }

    else{
   
        // when array is empty 
        if (localStorage.getItem('bookmarks') === null) {
            Data.push(bookmark);
            console.log(Data);
            
            localStorage.setItem('bookmarks', JSON.stringify(Data));
        }
        // add another element to array and then store it local storae;
    else {
        // parse array
        /*
        this portion is working like we save backup of our data when we refreash page the data from array is removed and also in the the localStorage it aslo replace by newone so there for we use this code to assign the previous array and then add new element to it
        */
        Data = JSON.parse(localStorage.getItem('bookmarks'));
        // now push another element to array 
        Data.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(Data));
    }
    // call sowdata function
    ShowData();
    inputvalues.sitename.value = '';
    inputvalues.url.value = '';
}
}

// 
async function ShowData() {
    Output.innerHTML = "";
    // console.log("Show Function is called");
    // console.log(Names.length)
    // get data from localstorage 
    let data = localStorage.getItem('bookmarks');

    // convert it to array
    let data2 = await JSON.parse(data);
    let data_length = data2.length
    console.log(data_length)
    // console.log(data2);
    // console.log("after data2");
    if(data_length >= 4){
        Output.style = 'overflow-y: scroll;'
    }
    if(data_length < 4){
        Output.style = 'overflow-y: hidden;'
    }
    
    for(let key in data2) {
        Output.innerHTML += `<div class = "book"><h3>${data2[key].name}</h3>
        <button class = "bothbtns visit"><a href = "${data2[key].URL}" targe>Visit</a></button>  
        <button class = "bothbtns Del">Delete</button>
        </div>`
        // console.log(Output);
    };
    let delbtn = document.getElementsByClassName('Del');
    // console.log(delbtn);
    // console.log(delbtn.length);
    // implent same code  on every class;
    Array.from(delbtn).forEach((element , index)=>{
        element.addEventListener('click',()=>{
            console.log("Inside del event listener")
            let getdata = JSON.parse(localStorage.getItem('bookmarks'));
            if(getdata === []){
                getdata = [];
            }
            else{
                getdata.splice(index , 1);
                localStorage.setItem('bookmarks',JSON.stringify(getdata));
            }
            ShowData();
            console.log(getdata);
        
        }); 
    });
    
    }

ShowData();
let btn = document.getElementById('submit');
btn.addEventListener('click', GetData);
