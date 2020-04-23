/******************************************
Project 2 - Dynamic Web Page: Pagination and Filtering
By: Jacob Baer
******************************************/



//variable for the entire page
const page= document.getElementsByClassName("page")[0];

//a large UL of all of the accounts
var BigList = document.getElementsByClassName("student-list")[0];

//the list of accounts
var ListItems= BigList.children;

//determines how many accounts are displayed per page
var perPage=10;

//this is to create and append the div for the buttons into the whole list
var ButtDiv=document.createElement("div");
ButtDiv.className="pagination";
page.appendChild(ButtDiv);

//make unorder list elements for the buttons and appends it to a div for the buttons
var ButtList= document.createElement("ul");
ButtDiv.appendChild(ButtList);


//the top div where the searchbar goes
const TopDiv=document.getElementsByClassName("page-header cf")[0];

//creates searchbar Div with a class, the div class is also appended to the page
var BarDiv= document.createElement("div");
BarDiv.className="student-search";
TopDiv.appendChild(BarDiv);

//the input is created with a placeholder
var SInput = document.createElement("input");
SInput.placeholder="Search for students...";

//the button to search is created with its text
var SButton= document.createElement("button");
SButton.textContent="Search";

//the input and button are appended to the searchbar Div
BarDiv.appendChild(SInput);
BarDiv.appendChild(SButton);







//hides the students who arent on the page
function showPage(page, list){
   //hides all of the list Items
   for(let i=0; i<ListItems.length; i++){
      ListItems[i].style.display="none";
   }

   //shows the list items of the page
   for(let i=(page*perPage)-perPage; i<page*perPage; i++){
      //checks if i is within the list length
      if(i<list.length){
         list[i].style.display="block";
      }
   }

}



function appendPageLinks(list){
   //determines the amount of buttons for the pagination
   let ButtonNum= Math.ceil(list.length/10);

   //removes all the previous buttons from a previous itteration of appendpagelinks
   for(let i=ButtList.children.length-1; i>=0; i--){
      ButtList.removeChild(ButtList.children[i]);
   }

   for(let i=0; i<ButtonNum; i++){
      //creates a list item and appends it to an unordered list 
      let item= document.createElement("li");
      ButtList.appendChild(item);

      //creates a button with the A tag and gives the button a page number
      let link = document.createElement("A");
      link.textContent= i+1;

      //when the page is opened, the first button is set to active, since the first page is automatically opened
      if(i==0){
         link.className = "active";
      }

      //appends the button to the list item
      item.appendChild(link);

      
   }
   //shows the first page of whatever list was passed
   showPage(1, list);


}

function search(){
   //the value within the text input
   let Tval=SInput.value;

   //array of values that meet the search
   let arr =[]; 

   //checks if the value is within the list of names
   for(let i of ListItems){
      if(i.children[0].children[1].textContent.indexOf(Tval)>=0){
         arr.push(i);
      }
   }
   return arr;
   


};





//every time a button from a paginator it clicked it displays the accounts for that page
ButtList.addEventListener("click",()=>{

   //this clears the active class from the buttons
   for(let i of ButtList.children) {
      i.children[0].className="";
   }

   //this gives the button previously clicked the active class
   event.target.className="active";

   //this displays the certain page of the button
   showPage(event.target.textContent, search());
   


})

//searches name when the search button is hit
SButton.addEventListener("click", ()=>{
   appendPageLinks(search());
})

//searches name when the keys are typed
document.addEventListener("keyup", ()=>{
   appendPageLinks(search());
})

//this displays the first page with the buttons
appendPageLinks(ListItems);

