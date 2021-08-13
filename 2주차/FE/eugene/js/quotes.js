const quotes = [
    {
        quote: "But I know, somehow, that only when it is dark enough can you see the stars.",
        author: "Martin Luther King, Jr",
    },
    {
        quote:"The greatest glory in living lies not in never falling, but in rising every time we fall.",
        author:"Nelson Mandela",
    },
    {
        quote:"Learn as if you would live forever, live as if you would die tomorrow.",
        author:"Mahatma Gandhi",
    },
    {
        quote:"You'll never find a rainbow if you're looking down.",
        author:"Charlie Chaplin",
    },
    {
        quote:"All progress takes place outside the comfort zone.",
        author:"Michael John Bobak",
    },
    {
        quote:"The only place where success comes before work is in the dictionary.",
        author:"Vidal Sassoon",
    },
    {
        quote:"Do one thing every day that scares you",
        author:"Anonymous",
    },
    {
        quote:"Success is walking from failure to failure with no loss of enthusiasm.",
        author:"Winston Churchill",
    },
    {
        quote:"What is written without effort is in general read without pleasure.",
        author:"Samuel Johnson",
    },
    {
        quote:"Though the sun is gone, I have a light.",
        author:"Kurt cobain",
    }

]

const quote = document.querySelector("#quote span:first-child");
const author = document.querySelector("#quote span:last-child");

//console.log(quotes[0]);
const todaysQuote = quotes[Math.floor(Math.random() * quotes.length)];

quote.innerText = todaysQuote.quote;
author.innerText = todaysQuote.author;