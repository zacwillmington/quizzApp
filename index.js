
let questionCount = 0;
let countCorrect = 0;
let countIncorrect = 0;


		
//Initializes the application, hiding start page html and runs funtion to render the questions page. 
function handleStartQuiz(){
	$('.js-readyToStart').on('click', function(event){
		$(this).closest('div').remove('.js-ready');
		$('.progress').removeClass('hidden');
		$('.js-nextButton').removeClass('hidden');
			renderQuestion();
	}); 
}


//Generates all the html need for question selection page.
function generateQuestion(){
	return `<main role='main'>
				<div class='imgInfo'>
						<img src='${STORE[questionCount].image}' class='flagImages' alt='Flag image'>
						<br>
					<h2 class='hint'>HINT: ${STORE[questionCount].question}</ledgend>
					</h2>
				</div>
				<form class='buttonsGroup'>
					<fieldset>
						<div class='inputStyles'>
							<input type='radio' name='answerInput' id='js-ans1' value='${STORE[questionCount].answer1}' required></input>
							<label class='noValPopUp' for='js-ans1'>${STORE[questionCount].answer1}</label>
						</div>
						
						<div class='inputStyles'>
							<input type='radio' name='answerInput' id='js-ans2' value='${STORE[questionCount].answer2}' required></input>
							<label for='js-ans2'>${STORE[questionCount].answer2}</label>
						</div>
						
						<div class='inputStyles'>
							<input type='radio' name='answerInput' id='js-ans3' value='${STORE[questionCount].answer3}' required></input>
							<label for='js-ans3'>${STORE[questionCount].answer3}</label>
						</div>
						
						<div class='inputStyles'>
							<input type='radio' name='answerInput' id='js-ans4' value='${STORE[questionCount].answer4}' required></input>
							<label for='js-ans4'>${STORE[questionCount].answer4}</label>
						</div>
						<br>
						<button class="js-nextButton submitButton" type='button' name='submitAnswer'>Next</button>
					</fieldset>
				</form>
			</main>`;
	}
	
//Renders the generateQuestion function, which adds it to webpage in html form. Also runs the handleChooseQuestion(checks chosen value and runs a correct or incorrect function).
function renderQuestion() {
  $('.questions').html(generateQuestion());
		 $('.js-nextButton').on('click', function(event){
        var check = true;
        
        $("input:radio").each(function(){
            var name = $(this).attr("name");
            if($("input:radio[name="+name+"]:checked").length === 0){
                check = false;
            }
        });
        
        if(check){
            handleChooseQuestion();
        }else{
           noValueSelected();
        }
    });
}

function noValueSelected(){
	$('.js-feedBack').show();
	console.log('noValueSelected ran');
	$('.js-feedBack').html(
			`
			<div class='popUp'>
						<h1>Please pick a country</h1>
						<button type='button' class='js-noValpopUp noValpopUp'>OK</button>
			</div>
	`);
	$('.noValpopUp').on('click', function(){
		console.log( 'noValpopUp on click ran');
		$('.js-feedBack').hide();
	});
}

//checks selected input value from radio button with correct value and runs apropriate function.
function handleChooseQuestion(){
console.log('handleChooseQuestion ran');
	let selected = $("input[name=answerInput]:checked").val();
	const correctVal= `${STORE[questionCount].correctAns}`;
	
	if(selected === correctVal){
		handlePopUpFeedBackCorrect();
	}	
	else{	
		handlePopUpFeedBackIncorrect();
		}
}



function questionCounter(){
	questionCount++;
	$('.progress').html(
		`<span class='countOfQ'>${questionCount} / 5</span><span class='countWrong'>Incorrect: ${countIncorrect}</span>`
		);
		console.log('questionCounter ran');
}


function handlePopUpFeedBackCorrect(){
	//shows the results of each question 
	//runs  questionCounter, then removes popuphtml 
	countCorrect++;
	questionCounter();
 $('.js-feedBack').show();
	$('.js-feedBack').html(
			`
			<div class='popUp'>
						<h1>You got it!</h1>
						<button type="button" class='js-popUpContinue   popUpcontinueButton'>Next</button>
			</div>
	`);
	$('.js-popUpContinue').on('click', function(event){
		if(questionCount <= 4){
			$(this).closest('.popUp').hide();
			renderQuestion();
		}
		else{
			$(this).closest('.popUp').hide();
			finalResults();
		}
	});
}

//same as above function but for incorrect answer.
function handlePopUpFeedBackIncorrect(){
	countIncorrect++;
	$('.js-feedBack').show();
	$('.js-feedBack').html(
		` 	
		<div class='popUp'>
			<feildset>
				<h1>You missed that one, the correct country is "${STORE[questionCount].correctAns}."</h1>
				<button class='js-popUpContinue popUpContinueButton' type="button">Continue</button>
			</feildset>
		</div>
		`
		);
		
		questionCounter();
		$('.js-popUpContinue').on('click', function(event){
			$('.popUp').addClass('.hidden');
		if(questionCount <= 4){
			$(this).closest('.popUp').hide();
			renderQuestion();
		}
		else{
			$(this).closest('.popUp').hide();
			finalResults();
		}
	});
}


//final results shown in pop and option the take again.
function finalResults(){
	$('body').addClass('.popUpOuter');
	$('.js-finalResults').html(
		`<div class='popUp'>
			<h1>You scored a total of ${countCorrect} out of 5 questions</h1>
				<button class='js-playAgain playAgainBtn'>PLAY AGAIN</button>
		</div>
		`
		);
		$('.js-playAgain').on('click', function(event){
			location.reload();
		});
}

handleStartQuiz();
