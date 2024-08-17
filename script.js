var userData=[];                            //7.make one empty array to push the data inside it
var taskEl=document.getElementById("task");  //1.select the input data
var add=document.getElementById("add");        //2.select the add button .
var update=document.getElementById("update");   //3.select the update button


add.addEventListener("click",()=>{              //4.add click event on add button
    
    var taskEl=document.getElementById("task").value;  //Avoid to save empty data 
    if(taskEl==""){                         //13.if data is not enter do notthing after click
        
    }
    else{
        insertdata();                           //5.call the function that save in local storage
                                                //14.else call the function
    }
    
    
    taskEl.value="";                            //12.after submit the data form should be empty
    
    
    
    
});
if(localStorage.getItem("userData") !=null){              //First time data will null
userData=JSON.parse(localStorage.getItem("userData"));    //change local storage data to array ,bcz after refresh the data was disappear
}

function insertdata(){                                  //6.this is the function that save in local storage
        userData.push({                                   //8.push the data in empt  array                      
            task:taskEl.value                               //9.in object form like key value formate
        });
        var userString =JSON.stringify(userData);       //10.In local storage data will store in String formate
        localStorage.setItem("userData" , userString);     //11.set the data in local storage 
           //key : data

       
}

//data display

var tableData=document.getElementById("table-data1");   //1.select the table

const getDataFromLocal=()=>{                            //2.make a function for display
    tableData.innerHTML="";                             //3.in starting table should be empty
    userData.forEach((data,index)=>{                      //4.call userdata in foreach loop //5.put data in inner html
        tableData.innerHTML+=`                              
        <tr index='${index}'>
            <td>${index+1}</td>
            <td class="task_name">${data.task}</td>
            <td>
            <button class="action edit-btn"><i class="fa-solid fa-pen-to-square"></i></button>
            <button class="action del-btn"><i class="fa-solid fa-trash"></i></button>
        
            </td>
        </tr>
        `;
        
        
    });

    

    

    // delete 

    var i;                                                      //2.make a variable
    var allDelBtn=document.querySelectorAll(".del-btn");        //1.select the delete btn
    for(i=0;i<allDelBtn.length;i++){                            //3.for loop bcz for all delete btn not only one
        allDelBtn[i].onclick=function(){                        //4.onclick event
            var tr=this.parentElement.parentElement;       //5.scrabing the exact data that will going to delete
           var id=tr.getAttribute("index");                 //6.after refresh data was coming so to stop
           swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this data!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                userData.splice(id,1);             // 7.delete that id by localstorage
                localStorage.setItem("userData" , JSON.stringify(userData)); //update to localstorage in string form
                tr.remove();            //8.remove from screen
                location.reload();
              swal("Poof! Your data has been deleted!", {
                icon: "success",
              });
            } else {
              swal("Your data is safe!");
            }
          });
           
        }
    }

    

    //edit
    
    var allEdit = document.querySelectorAll(".edit-btn");       //1.select the edit btn
    for(i=0;i<allEdit.length;i++){                              //2.for all edit btn idhr variable nhi bana kuki upr me bana hai wahi use kr rhe(var=i)
        allEdit[i].onclick=function(){                             //3.onclick on edit btn
            add.disabled=true;              //6.and add btn should disable
            update.disabled=false;          //5.on this time update btn should enable
            var tr = this.parentElement.parentElement;       //4.select what to edit means scrabing the element 
            var td=tr.getElementsByTagName("TD");       //7.select the td from table
            var index=tr.getAttribute("index");     //8.select the index
            var task2 = td[1].innerHTML;            //9.selct that data that will be going to edit
            taskEl.value=userData[index].task;      //10.to select same index 
            update.onclick=function(e){
                    userData[index]={               //same jaisa display krhe  the
                    task:taskEl.value
                }
                localStorage.setItem("userData" , JSON.stringify(userData)); //local storage me update
            }
            
        }
        
    }


    
}
getDataFromLocal()