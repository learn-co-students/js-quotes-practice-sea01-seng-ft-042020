
// EDITED_CARD = null
document.addEventListener('DOMContentLoaded', function(){
  getQuotes()

})

function getQuotes(){
  fetch("http://localhost:3000/quotes")
  .then(resp => resp.json())
  .then(json => {
    json.forEach(quote => handleQuotes(quote))
  })

}

function handleQuotes(quote){
    const getContainer = document.querySelector('#quote-list')
    const createLi = document.createElement('li')
    createLi.className = 'quote-card'

    const createBlockquote = document.createElement('BLOCKQUOTE')
    createBlockquote.className = 'blockquote'
    

    const createP = document.createElement('p')
    createP.className = 'mb-0'
    createP.innerText = quote.quote

    const createFooter = document.createElement('FOOTER')
    createFooter.className = 'blockquote-footer'
    createFooter.innerText = quote.author

    const createBR = document.createElement('BREAK')

    const createBtn1 = document.createElement('button')
    createBtn1.className = 'btn-success'
    createBtn1.innerText = "like"

    const createBtn3 = document.createElement('button')
    createBtn3.className = 'btn-info'
    createBtn3.innerText = "Edit"
    createBtn3.setAttribute('value', "")
    createBtn3.addEventListener('click', function(){
      editQuote(quote)
      createLi.remove()
      deleteQuote(quote)
      
    })
    

    const createBtn2 = document.createElement('button')
    createBtn2.className = 'btn-danger'
    createBtn2.innerText = "Delete"
    createBtn2.addEventListener('click', function(){
      createLi.remove()
      deleteQuote(quote)
    })


    createLi.append(createP,createFooter,createBtn2,createBtn3)
    getContainer.appendChild(createLi)
}

function editQuote(quote){
  const editForm = document.querySelector("#new-quote-form")
  editForm.quote.value = quote.quote;
  editForm.author.value = quote.author;
}

function postQuote(newQuote){
  fetch("http://localhost:3000/quotes",{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application.json'
    },
    body: JSON.stringify(newQuote)
  })
  .then(resp => resp.json())
  .then(json => handleQuotes(json))
}

function deleteQuote(quote){
  fetch(`http://localhost:3000/quotes/${quote.id}`,{
    method: 'DELETE'
  })
}

function upDateQuote(quote){
  fetch(`http://localhost:3000/quotes/${quote.id}`,{
    method: 'PUT',
    headers: {
      'Content-Type': application/json,
      'Accept': application/json
    },
    body: JSON.stringify(quote)
  })
  .then(resp => resp.json())
  .then(json => handleQuotes(json))
  
}

const getSubmitBtn = document.querySelector("#new-quote-form")
getSubmitBtn.addEventListener('submit', function(e){
  e.preventDefault()

  const quote = e.target.quote.value
  e.target.quote.value = ""

  const author = e.target.author.value
  e.target.author.value = ""

  let newQuote = {
    quote: quote,
    author: author
  }
  postQuote(newQuote)
  
})






























// document.addEventListener('DOMContentLoaded', function(){

//     fetchQuotes()
    
   

//   function fetchQuotes(){

//     fetch("http://localhost:3000/quotes?_embed=likes$")
//     .then(resp => resp.json())
//     .then(json => {
//         json.forEach( quote => listAllQuotes(quote))
//     })
// }

// const deleteQuote = (quote) => {
//     fetch(`http://localhost:3000/quotes/${quote.id}`, {
//       method: "DELETE",
//     })
    
//   }
  
  

    
//     const getBtn = document.getElementById("new-quote-form")
//     getBtn.addEventListener('submit', function (event) {
//      event.preventDefault()
    
//     const quote = event.target.quote.value
//     event.target.quote.value = ""
//     const author = event.target.author.value
//     event.target.author.value = ""

//     const newQuote = {
//         quote: quote,
//         author:  author
//     }

//     postQuote(newQuote)
              
//     })

//   function postQuote(quotes){
//     fetch("http://localhost:3000/quotes?_embed=likes", {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Accept': 'application/json'
//         },
//         body: JSON.stringify(quotes)
        
//     })
//     .then(resp => resp.json())
//     .then(json => listAllQuotes(json))
    
//  }
   



// function listAllQuotes(quote){
// const getForm = document.getElementById("new-quote-form")
// // const newDiv = document.createElement('div')
// const newLi = document.createElement('li')
// const createBlock = document.createElement("BLOCKQUOTE")
// const createP = document.createElement('p')
// const footer = document.createElement('FOOTER')
// const createBreak = document.createElement('BR')
// const button1 = document.createElement('button')
// const button2 = document.createElement('button')



// newLi.className = 'quote-card'
// createBlock.className = "blockquote"
// createP.innerText = quote.quote
// createP.className = "mb-0"
// footer.className = "blockquote-footer"
// footer.innerText = quote.author
// button1.innerText = "Likes:"
// button1.className = 'btn-success'
// button2.innerText = "Delete"
// button2.className = 'btn-danger'

// newLi.append(createBlock)
// newLi.appendChild(createP)
// newLi.appendChild(footer)
// newLi.appendChild(createBreak)
// newLi.appendChild(button1)
// newLi.appendChild(button2)
// getForm.appendChild(newLi)

// //  const deleteButton = document.querySelector(".btn-danger")

//  button2.addEventListener("click", () => {
//     deleteQuote(quote);
//     newLi.remove();
//   });
// }

// })
