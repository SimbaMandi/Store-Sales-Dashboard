const loginForm = document.querySelector("#loginForm");
const errorMessage = document.querySelector("#errorMessage");
loginForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  if (email === "user@gmail.com" && password === "123456") {
    errorMessage.classList.remove("text-red-500");
    errorMessage.classList.add("text-green-500");
    errorMessage.textContent = "Login successfull";
  } else {
    errorMessage.classList.remove("text-green-500");
    errorMessage.classList.add("text-red-500");
    errorMessage.textContent = "Incorrect email or password, Please try again";
  }
});
// order form

const form= document.getElementById("order-form");
    form.addEventListener("submit", function(event){
     event.preventDefault(); 
     
     const productName= document.getElementById("product-name").value;  
    const unitPrice= document.getElementById("unit-price").value;  
    const quantity= document.getElementById("quantity").value;  

    if(productName === ""){
        alert("Enter Product name");
        return;
    }

    if(unitPrice === ""){
        alert("Enter price");
        return;
    }

    if(quantity === ""){
        alert("Enter quantity");
        return;
    }

    const price= Number(unitPrice);
    const quantityy= Number(quantity);

    if (price<=0){
        alert("Price must be greater than 0");
        return;
    }

     if (quantityy<=0){
        alert("Quantity must be greater than 0");
        return;
    }
    
    const newOrder= {
        productName: productName,
        price: unitPrice,
        quantityy: quantity,
        status:"Pending",
        inStock: true
    };
     orders.push(newOrder);

     });

