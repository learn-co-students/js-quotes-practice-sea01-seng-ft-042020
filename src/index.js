document.addEventListener('DOMContentLoaded', function(){

    fetchQuotes()
    postQuote()
    let quote = event.target.quote.value
        // ^^ grabs user input, saves to variable
        event.target.quote.value = ''
        // ^^ clears the form itself, which users like
    
        let author = event.target.author.value
        event.target.author.value = ''

    const grabButton = document.getElementById("butao")
    grabButton.addEventListener('submit', function (event) {
        event.preventDefault()

    
    })

    
   
function postQuote(quote, author){
    // console.log(quote, author)
    fetch("http://localhost:3000/quotes?_embed=likes", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({"quote":quote, "author":author})
    })
    .then(resp => resp.json())
    .then(json => listAllQuotes(json))
}

    


function fetchQuotes(){

    fetch("http://localhost:3000/quotes?_embed=likes")
    .then(resp => resp.json())
    .then(json => {
        json.forEach(quote => listAllQuotes(quote))
    })
}



function listAllQuotes(quote){
const getForm = document.getElementById("new-quote-form")
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

}

})