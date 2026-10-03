const API_URL = "http://localhost:3000/api/expenses";


const expenseTable = document.getElementById("expenseTable");


let editId = null;




// Load all expenses

async function loadExpenses() {

    try {

        const response = await fetch(API_URL);

        const expenses = await response.json();


        expenseTable.innerHTML = "";


        expenses.forEach(expense => {


            expenseTable.innerHTML += `

            <tr>

                <td>${expense.id}</td>

                <td>${expense.title}</td>

                <td>${expense.amount}</td>

                <td>${expense.category}</td>

                <td>${expense.date.substring(0,10)}</td>


                <td>


                    <button 
                    class="btn btn-warning btn-sm"
                    onclick="editExpense(${expense.id})">

                    Edit

                    </button>



                    <button 
                    class="btn btn-danger btn-sm"
                    onclick="deleteExpense(${expense.id})">

                    Delete

                    </button>


                </td>


            </tr>

            `;


        });



    } catch(error) {


        alert("Failed to load expenses");

        console.log(error);


    }


}







// Add / Update Expense

async function saveExpense(){



    const title = document
    .getElementById("title")
    .value
    .trim();



    const amount = document
    .getElementById("amount")
    .value;



    const category = document
    .getElementById("category")
    .value
    .trim();



    const date = document
    .getElementById("date")
    .value;





    // Validation

    if(title === ""){

        alert("Title is required");

        return;

    }



    if(amount === "" || Number(amount) <= 0){

        alert("Amount must be greater than zero");

        return;

    }



    if(category === ""){

        alert("Category is required");

        return;

    }



    if(date === ""){

        alert("Date is required");

        return;

    }




    const expense = {

        title,

        amount,

        category,

        date

    };






    try {



        if(editId === null){


            await fetch(API_URL, {

                method:"POST",

                headers:{

                    "Content-Type":"application/json"

                },

                body:JSON.stringify(expense)

            });



            alert("Expense added successfully");



        }

        else {



            await fetch(`${API_URL}/${editId}`,{


                method:"PUT",


                headers:{

                    "Content-Type":"application/json"

                },


                body:JSON.stringify(expense)


            });



            alert("Expense updated successfully");



            editId = null;


            document.getElementById("saveButton").innerText="Add";

            document.getElementById("formTitle").innerText="Add Expense";



        }






        clearForm();


        loadExpenses();




    } catch(error){


        alert("Operation failed");

        console.log(error);


    }



}








// Edit Expense

async function editExpense(id){


    try {


        const response = await fetch(`${API_URL}/${id}`);


        const expense = await response.json();



        document.getElementById("title").value =
        expense.title;



        document.getElementById("amount").value =
        expense.amount;



        document.getElementById("category").value =
        expense.category;



        document.getElementById("date").value =
        expense.date.substring(0,10);




        editId = id;



        document.getElementById("saveButton").innerText =
        "Update";



        document.getElementById("formTitle").innerText =
        "Update Expense";



    }

    catch(error){


        alert("Cannot load expense");


    }


}









// Delete Expense

async function deleteExpense(id){



    const confirmDelete = confirm(
        "Are you sure you want to delete this expense?"
    );



    if(!confirmDelete){

        return;

    }





    try {


        await fetch(`${API_URL}/${id}`,{


            method:"DELETE"


        });



        alert("Expense deleted successfully");



        loadExpenses();



    }

    catch(error){


        alert("Delete failed");


        console.log(error);


    }



}







// Clear inputs

function clearForm(){


    document.getElementById("title").value="";


    document.getElementById("amount").value="";


    document.getElementById("category").value="";


    document.getElementById("date").value="";



}






// Start

loadExpenses();