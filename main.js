

let APIURL = 'https://opentdb.com/api.php?amount=50&category=9&type=multiple'  // this is the API URL
let score = document.getElementById("score-pts")
let scoring= 0;
const buttons = $(".ques")
let count = 0; //counts the num of questions
let correct_answer = null; //since i shall use this in other functions
let scoreIncremented = false
const start_button = $("#intro-button")
let counter = document.getElementById('counter')



async function fetch_data() {
    try {
        const response = await fetch(APIURL);
        if (!response.ok) {
            if (response.status === 429) {
                
                await new Promise(resolve => setTimeout(resolve, 1000)); 
                return fetch_data(); 
            }
            throw new Error(`Failed to fetch data. Status: ${response.status}, ${response.statusText}`);
        }
        count++;
        counter.innerText = count
            
        if(count > 12){
        play_again()
        }
        const data = await response.json();
        return data.results;
    } 
    catch (error) {
        console.error("Error fetching data:  ", error);
        throw error; 
    }
}


function decodeHtmlEntities(text) {
    const element = document.createElement("div");
    element.innerHTML = text;
    return element.textContent || element.innerText;
}

async function load_question(){


    $("#intro-button").css("display", "none")
    $("#intro-text").css("display", "none")
    $(".question").css("display", "block")


      $(".ques").css("background-color", ""); 

        const random_question = await fetch_data()
        $("#question-area").text(decodeHtmlEntities(random_question[0].question))

        let correct = random_question[0].correct_answer
        let incorrects = random_question[0].incorrect_answers
        let random_choice =  Math.floor(Math.random()*4);
        correct_answer = correct
        $(".ques").eq(random_choice ).html(correct)
    

        for (let i = 0; i < incorrects.length; i++) { // Loop over incorrect answers
            $(".ques").eq((random_choice + i + 1) % 4).html(incorrects[i]); // Start from next position after correct answer
        }
        scoreIncremented = false;
}


$("#intro-button").on('click', load_question)


$(".ques").on('click', function() {
    const selectedAnswer = $(this).text();
    if (selectedAnswer === correct_answer && !scoreIncremented) {
        if (selectedAnswer === correct_answer){
        $(this).css("background-color", "green");}
        score.innerText++;
        scoring++;
        scoreIncremented = true; 
    } else {
        if (selectedAnswer === correct_answer){
        $(this).css("background-color", "green");}
        else{
        $(this).css("background-color", "red");}
    
    }
  
    setTimeout(function() {
        load_question();
        
    }, 500); // Load next question after 1 second
});



function play_again(){
    console.log(score)
    $(".question").css("display", "none")
    $(".final-results").css("display", "display")
    const final = document.getElementsByClassName("f_score")[0]
    final.innerText = scoring
    console.log(final)
    $(".play_again").on('click', function(){
        $(".play_again").css("display", "none")
        $(".final-results").css("display", "none")
        $("#intro-button").css("display", "block")
        $("#intro-text").css("display", "block")
        count = 0;
        score.innerText = 0;
    })
 
}