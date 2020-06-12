document.addEventListener('DOMContentLoaded', function(){

    fetchQuotes()
    
   

  function fetchQuotes(){

    fetch("http://localhost:3000/quotes?_embed=likes$")
    .then(resp => resp.json())
    .then(json => {
        json.forEach( quote => listAllQuotes(quote))
    })
}

const deleteQuote = (quote) => {
    fetch(`http://localhost:3000/quotes/${quote.id}`, {
      method: "DELETE",
    })
    
  }
  
  

    
    const getBtn = document.getElementById("new-quote-form")
    getBtn.addEventListener('submit', function (event) {
     event.preventDefault()
    
    const quote = event.target.quote.value
    event.target.quote.value = ""
    const author = event.target.author.value
    event.target.author.value = ""

    const newQuote = {
        quote: quote,
        author:  author
    }

    postQuote(newQuote)
              
    })

  function postQuote(quotes){
    fetch("http://localhost:3000/quotes?_embed=likes", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(quotes)
        
    })
    .then(resp => resp.json())
    .then(json => listAllQuotes(json))
    
 }
   



function listAllQuotes(quote){
const getForm = document.getElementById("new-quote-form")
// const newDiv = document.createElement('div')
const newLi = document.createElement('li')
const createBlock = document.createElement("BLOCKQUOTE")
const createP = document.createElement('p')
const footer = document.createElement('FOOTER')
const createBreak = document.createElement('BR')
const button1 = document.createElement('button')
const button2 = document.createElement('button')



newLi.className = 'quote-card'
createBlock.className = "blockquote"
createP.innerText = quote.quote
createP.className = "mb-0"
footer.className = "blockquote-footer"
footer.innerText = quote.author
button1.innerText = "Likes:"
button1.className = 'btn-success'
button2.innerText = "Delete"
button2.className = 'btn-danger'

newLi.append(createBlock)
newLi.appendChild(createP)
newLi.appendChild(footer)
newLi.appendChild(createBreak)
newLi.appendChild(button1)
newLi.appendChild(button2)
getForm.appendChild(newLi)

//  const deleteButton = document.querySelector(".btn-danger")

 button2.addEventListener("click", () => {
    deleteQuote(quote);
    newLi.remove();
  });
}

})
