// render quotes and add quotes only

const QUOTES_URL = 'http://localhost:3000/quotes?_embed=likes'

document.addEventListener('DOMContentLoaded', () => {
const quoteList = document.getElementById('quote-list')
const newQuoteForm = document.getElementById('new-quote-form')


function fetchQuotes () {
    fetch(QUOTES_URL)
    .then(response => response.json())
    .then(json => {
        json.forEach(quote => {
            buildQuoteCard(quote)
        })
    })
}

newQuoteForm.addEventListener("submit", function (event) {
    event.preventDefault()

    let myQuote = event.target[0].value
        event.target[0].value = ''
 
    let myAuthor = event.target[1].value
    event.target[1].value = ''

    let configObject = {
        method: "POST",
        headers: {
            "Content-Type": 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({"quote":myQuote, "author":myAuthor, "likes": []})
    }

    fetch(QUOTES_URL, configObject)
    .then(response => response.json())
    .then(json=>buildQuoteCard(json))

})

function buildQuoteCard(quote) {
    const newQuote = document.createElement('li')
    newQuote.className = 'quote-card'

    const quoteBlock = document.createElement('BLOCKQUOTE')
    quoteBlock.className = 'blockquote'

    const createP = document.createElement('p')
    createP.className = 'mb-0'
    createP.innerText = quote.quote

    const createFooter = document.createElement('FOOTER')
    createFooter.className = 'blockquote-footer'
    createFooter.innerText = quote.author
 
    const likeBtn = document.createElement('button')
    likeBtn.className = 'btn-success'
    likeBtn.innerText = "Likes:"
    likeBtn.span = 0

    const deleteBtn = document.createElement('button')
    deleteBtn.className = 'btn-danger'
    deleteBtn.innerText = "Delete"

    newQuote.appendChild(quoteBlock)
    newQuote.appendChild(createP)
    newQuote.appendChild(createFooter)
    newQuote.appendChild(likeBtn)
    newQuote.appendChild(deleteBtn)
    quoteList.appendChild(newQuote)
}

fetchQuotes();


})