//speed (seconds) that the currently displayed quote changes
var quoteSpeed = 30;
//array of various quotes from political and historical figures
var quotes =
[
    //quote #0
    {
        quote : "As government expands, liberty contracts.",
        source : "Ronald Reagan",
        sourceDescriptor : "US President, Actor",
        citation : "WH Farewell Address",
        year : "1989",
        subject : "Scope of Government"
    },
    //quote #1
    {
        quote : "There is no grievance that is a fit object of redress by mob law.",
        source : "Abraham Lincoln",
        sourceDescriptor : "US President, Emmancipator, Revolutionary",
        citation : "The Lyceum Address",
        year : "1838",
        subject : "Populism"
    },
    //quote #2
    {
        quote : "I have a dream that my four children will one day live in a nation where they will not be judged by the color of their skin, but the content of their character.",
        source : "Martin Luther King Jr.",
        sourceDescriptor : "Equal Rights Activist, Individualist, Pastor",
        citation : "I Have a Dream Speech",
        year : "1963",
        subject : "Racial Discrimination"
    },
    //quote #3
    {
        quote : "Freedom of speech is a principal pillar of a free government; when this support is taken away, the constitution of a free society is disolved, and tyranny is erected on its ruins.",
        source : "Ben Franklin",
        sourceDescriptor : "Founding Father, Philosopher, Scientist",
        citation : "Pennsylvania Gazette",
        year : "1737",
        subject : "Right to Free Speech"
    },
    //quote #4
    {
        quote : "Facts don't care about your feelings.",
        source : "Ben Shapiro",
        sourceDescriptor : "Political Commentator, Author, Professional Savage",
        subject : "Emmotive Logic"
    },
    //quote #5
    {
        quote : "Among the many misdeeds of the British rule in India, history will look upon the act of depriving a whole nation of arms, as the blackest.",
        source : "Ghandi",
        sourceDescriptor : "Equal Rights Activist, Revolutionary",
        citation : "Autobiography",
        year : "1925-1929",
        subject : "Right to Bear Arms"
    },
    //quote #6
    {
        quote : "But I say to you, Love your enemies and pray for those who persecute you...",
        source : "Jesus Christ",
        sourceDescriptor : "Lord, Savior, The Way, The Truth, The Life",
        citation : "The Gospel according to Matthew",
        subject : "Love"
    }
];

//array of all characters used in hexidecimal color encoding
var colorCharacters = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];




//sets background color for website to a new random color
function refreshBackgroundColor()
{
    var color = "#";
    var body = document.querySelector("body");

    //hexidecimal color generation
    for(var count = 0; count < 6; count++)
    {
        //Conditional statement acts as a filter to ensure colors don't become too bright and blend with the white text
        if(count % 2 === 1)
        {
            color += colorCharacters[Math.floor(Math.random() * 16)];
        }
        else
        {
            color += colorCharacters[Math.floor(Math.random() * 6)];
        }
    }

    //sets background color
    body.style.backgroundColor = color;
}

//returns a randomly chosen quote object from array, "quotes"
function getRandomQuote()
{
    var index = Math.floor(Math.random() * quotes.length);

    return quotes[index];
}

//calls function, "getRandomQuote", and sets returned quote object for display
function printQuote()
{
    var html = "";
    var quote = getRandomQuote();

    //html construction
    html += "<p class=\"subject\">"  + "Subject: " + quote.subject + "</p>"
    html += "<p class=\"quote\">" + quote.quote + "</p>";
    html += "<p class=\"source\">" + quote.source + " (" + quote.sourceDescriptor + ")";
    {
        //checks if quote has citation
        if("citation" in quote)
        {
            html += "<span class=\"citation\">" + quote.citation + "</span>";
        }
        //checks if quote has year
        if("year" in quote)
        {
            html += "<span class=\"year\">" + quote.year + "</span>";
        }
    }
    html += "</p>";

    //apply html changes to display newly generated quote
    document.getElementById('quote-box').innerHTML = html;
    refreshBackgroundColor();
}

//cycles between all stored quotes
//paramaters:
//  - speed: the speed the quote changes
function cycleQuotes(speed)
{
    //ID for current quote timeout (timer). Used to clear timeout.
    var timeoutID = -1;

    //inner recursive function necessary to prevent "too much recursion" error caused by the "speed" paramater
    //if called twice, such as by an event listener, the previous timeout (timer) is reset
    function cycle()
    {
        //clear previous timeout (timer)
        window.clearTimeout(timeoutID);

        //changes quote
        printQuote();

        //sets new timeout
        timeoutID = window.setTimeout(cycle, speed /* <--- in seconds */ * 1000);
    }

    // event listener to respond to "Show another quote" button clicks
    // when user clicks anywhere on the button, the "loopQuotes" function is called
    document.getElementById('loadQuote').addEventListener("click", cycle, false);

    cycle();
}


//starts cycling of quotes
cycleQuotes(quoteSpeed);
