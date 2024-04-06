
// let APIURL = 'https://opentdb.com/api.php?amount=10&category=20&difficulty=medium&type=multiple'
let APIURL = 'https://opentdb.com/api.php?amount=50&category=9&type=multiple'
let score = document.getElementById("score-pts")
let count = 0;
async function fetch_data() {
    try {
        const response = await fetch(APIURL);
        if (!response.ok) {
            throw new Error('Status: ${response.status} ${response.statusText}');
        }
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error("Error fetching data:  ", error);
        throw error; // Rethrow the error to propagate it
    }
}

let buttons = $(".ques")
let correct_ans = null;
buttons.eq(0).text("hello")


async function load_question(){
        // let random_num = Math.floor(Math.random()*10);
         let random_question = await fetch_data()
        
        $("#question-area").text(random_question[0].question) 
        let correct = random_question[0].correct_answer
        correct_ans = correct
       
        let incorrects = random_question[0].incorrect_answers
     
        let random_choice =  Math.floor(Math.random()*4);
   
         $(".ques").eq(random_choice ).html(correct)
    

        for (let i = 0; i < incorrects.length; i++) { // Loop over incorrect answers
            $(".ques").eq((random_choice + i + 1) % 4).html(incorrects[i]); // Start from next position after correct answer
        }

       
}



load_question()


function check_answer(){
    let answer = null;

    [...buttons].forEach(button => {
        button.addEventListener('click', event => {
            const clickedButton = event.target;
            console.log("the correct session: ", correct_ans)
            console.log( clickedButton.textContent);
            answer = clickedButton.textContent
            if (answer == correct_ans){
                console.log("correct")
                console.log("the score is "+ score.innerText);
                score.innerText++;
                load_question()
            }
            else{
                console.log("incorrect")
                console.log("the score is "+ score);
                load_question()
            }
            
        }

      


    )});


    // buttons.array.forEach(element => {
    //     element.addEventListener('click', event =>{
    //         let clicked= event.target;
    //         console.log(clicked)
    //     })
    // });

}

function set_color(element, color){
    element.style.backgroundColor = "green";
        
}



check_answer()