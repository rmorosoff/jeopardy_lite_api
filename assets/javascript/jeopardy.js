
(function(){

  //jQuery equivelent to window.onload = function{}
  //code in here wont run until page loads
  $(function(){

    // Buttons we need from the DOM, retrieved using jQuery
    let questionButton = $("#get-clue");
    let guessButton = $("#guess-button");

    //  set crowd noise objects
    let cheeringSound = new Audio("assets/images/crowdapplause.wav");
    let laughingSound = new Audio("assets/images/crowdlaughing.wav");

    //  Other items we need from the DOM, using jQuery to get them
    let currentScore = $("#score");
    let questionCategory = $("#category");
    let questionValue = $("#value");
    let questionText = $("#question");
    let answerText = "";
    let questionHeader = $("#get-clue-text");
    let answerHeader = $("#guess-button-text");

    /**
     * Gets the text from the answer box
     * @return {String}
     */
    function getText() {
      return $('#save-me').val();
    }

    /**
     * Puts text in the answer box to clear it out
     * @param {String} text the stuff you want to put in the box
     */
    function setText(text) {
      return $('#save-me').val(text);
    }

    // function to get next question and hide questionText and guess-button
    function getQuestion(){
      //  get question from api
      $.get("http://jservice.io/api/random", function(data){
        console.log(JSON.stringify(data));
        //  set html of variables from retrieved item
        questionText.html(data[0].question);
        questionCategory.html(data[0].category.title);
        questionValue.html(data[0].value);
        answerText = data[0].answer;
        console.log(answerText);
      })
      //  hide and show items accordingly
      questionText.hide();
      guessButton.hide();
      answerHeader.hide();
      questionHeader.show();
      questionButton.show();
    }

    //  Beginning of main flow.  Call getQuestion to load first question
    getQuestion();

    // When the questionButton is clicked, lets show and hide appropriately
    questionButton.click(function(){
      questionButton.hide();
      questionHeader.hide();
      answerHeader.show();
      questionText.show();
      guessButton.show();
      })

    //  when guessButton is clicked, do the following
    guessButton.click(function(){
      let guessText = getText();  // capture answer from box
      console.log(guessText);
      //  check user guess against real answer
      if (guessText === answerText) {
        console.log("The current score is " + currentScore.html());
        console.log("The question value is " + questionValue.html());
        //  add questionValue to current score
        currentScore.html(parseInt(currentScore.html()) + parseInt(questionValue.html()));
        console.log("Now, the cureent score is " + currentScore.html());
        cheeringSound.play();
      } else {
        laughingSound.play();
      }
      // clear out the answer box
      setText("");
      // now lets get the next question
      getQuestion();
    })

  })

})();
