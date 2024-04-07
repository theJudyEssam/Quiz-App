

let APIURL = 'https://opentdb.com/api.php?amount=50&category=9&type=multiple'  // this is the API URL
let score = document.getElementById("score-pts")
const buttons = $(".ques")
let count = 0; //counts the num of questions
let correct_answer = null; //since i shall use this in other functions


async function fetch_data() {
    try {
        const response = await fetch(APIURL);
        if (!response.ok) {
            throw new Error(`Failed to fetch data. Status: ${response.status}, ${response.statusText}`);
        }
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error("Error fetching data:  ", error);
        throw error; 
    }
}


function decodeHtmlEntities(text) {
    const element = document.createElement("div");
    element.innerHTML = text;
    return element.textContent || element.innerText;
} // i got this from the internet lol

async function load_question(){
       
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
}

load_question()


// function check_answer(){
//     let answer = null;

//     // [...buttons].forEach(button => {
//     //     button.addEventListener('click', event => {
//     //         const clickedButton = event.target;
//     //         // console.log("the correct session: ", correct_ans)
//     //         // console.log( clickedButton.textContent);
//     //         answer = clickedButton.textContent
//     //         if (answer == correct_answer){
//     //             // console.log("correct")
//     //             // console.log("the score is "+ score.innerText);
//     //             score.innerText++;
//     //             try{
//     //             load_question()
//     //             score.innerText++;
//     //              }
//     //             catch(error){
//     //                 console.log("errrrrorrrrr")
//     //             score.innerText--;
//     //             load_question()
//     //             }
//     //         }
//     //         else{
//     //             // console.log("incorrect")
//     //             // console.log("the score is "+ score);
//     //             load_question()
//     //         }})});


//     // buttons.array.forEach(element => {
//     //     element.addEventListener('click', event =>{
//     //         let clicked= event.target;
//     //         console.log(clicked)
//     //     })
//     // });

// }

$(".ques").on('click', function() {
    const selectedAnswer = $(this).text();
    if (selectedAnswer === correct_answer) {
        $(this).css("background-color", "green");
        score.innerText++;
    } else {
        $(this).css("background-color", "red");
    }
    load_question()// Load next question after 1 second
});

