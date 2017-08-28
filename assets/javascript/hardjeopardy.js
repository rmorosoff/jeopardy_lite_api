(function() {

  //jQuery equivelent to window.onload = function{}
  //code in here wont run until page loads
  $(function() {

    // Buttons we need from the DOM, retrieved using jQuery
    //let questionButton = $("#get-clue1");
    //let guessButton = $("#guess-button1");

    //  set crowd noise objects
    let cheeringSound = new Audio("assets/images/crowdapplause.wav");
    let laughingSound = new Audio("assets/images/crowdlaughing.wav");

    //  Other items we need from the DOM on subheader, using jQuery to get them
    let currentScore = $("#score");
    let questionHeader = $("#get-clue-text");
    let answerHeader = $("#guess-button-text");

    //  initialize global variables for answer text
    let answerText1 = "";
    let answerText2 = "";
    let answerText3 = "";

    // *******************************************************************************************
    // **********  Functions needed for Jeopardy Game ********************************************
    // *******************************************************************************************

    // random integer generator between min and max inclusive to be used for offset
    //  found this by googling random # 1 to 10 on MDN (Math.random)
    function getRandomIntInclusive(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
    }

    // function to get next questions and show and hide appropriate DOM elements
    function getQuestion() {
      // random number to use as offset to get different categries each time
      let offset = getRandomIntInclusive(1, 1000);
      // set the string to send for category request
      let categoryString = "http://jservice.io/api/categories?count=3&offset=" + offset;
      console.log("Category string is " + categoryString);

      // Call jeopardy API and get 3 categories
      $.get(categoryString, function(catArray) {
        console.log(JSON.stringify(catArray));

        //  Handle question ONE stuff
        let questionString1 = ("http://jservice.io/api/clues?category=" + catArray[0].id);
        console.log(questionString1);
        //  get question1 from api
        $.get(questionString1, function(data) {
          console.log(JSON.stringify(data));
          //  set html of variables from retrieved item
          $("#question1").html(data[0].question);
          $("#category1").html(data[0].category.title);
          $("#value1").html(data[0].value);
          answerText1 = data[0].answer.toUpperCase();
          console.log("Answer one is " + answerText1);
        })

        //  Handle question TWO stuff
        let questionString2 = ("http://jservice.io/api/clues?category=" + catArray[1].id);
        console.log(questionString2);
        //  get question1 from api
        $.get(questionString2, function(data) {
          //  set html of variables from retrieved item
          $("#question2").html(data[0].question);
          $("#category2").html(data[0].category.title);
          $("#value2").html(data[0].value);
          answerText2 = data[0].answer.toUpperCase();
          console.log("Answer two is " + answerText2);
        })

        //  Handle question THREE stuff
        let questionString3 = ("http://jservice.io/api/clues?category=" + catArray[2].id);
        console.log(questionString3);
        //  get question1 from api
        $.get(questionString3, function(data) {
          //  set html of variables from retrieved item
          $("#question3").html(data[0].question);
          $("#category3").html(data[0].category.title);
          $("#value3").html(data[0].value);
          answerText3 = data[0].answer.toUpperCase();
          console.log("Answer three is " + answerText3);
        })

      })
      //  hide and show items accordingly
      $("#question1").hide();
      $("#guess-button1").hide();
      $("#get-clue1").show();
      $("#question2").hide();
      $("#guess-button2").hide();
      $("#get-clue2").show();
      $("#question3").hide();
      $("#guess-button3").hide();
      $("#get-clue3").show();
      answerHeader.hide();
      questionHeader.show();
      $("#card1").show();
      $("#card2").show();
      $("#card3").show();
    }


    //********************************************************************
    //  Beginning of main flow.  Call getQuestion to load first question
    //********************************************************************
    getQuestion();

    // When the $("#get-clue1") is clicked, lets show and hide appropriately
    $("#get-clue1").click(function() {
      $("#get-clue1").hide();
      questionHeader.hide();
      answerHeader.show();
      $("#question1").show();
      $("#guess-button1").show();
      $("#card3").hide();
      $("#card2").hide();
    })

    // When the $("#get-clue2") is clicked, lets show and hide appropriately
    $("#get-clue2").click(function() {
      $("#get-clue2").hide();
      questionHeader.hide();
      answerHeader.show();
      $("#question2").show();
      $("#guess-button2").show();
      $("#card1").hide();
      $("#card3").hide();
    })

    // When the $("#get-clue3") is clicked, lets show and hide appropriately
    $("#get-clue3").click(function() {
      $("#get-clue3").hide();
      questionHeader.hide();
      answerHeader.show();
      $("#question3").show();
      $("#guess-button3").show();
      $("#card1").hide();
      $("#card2").hide();
    })

    //  when $("#guess-button1") is clicked, do the following
    $("#guess-button1").click(function() {
      let guessText = $('#save-me1').val().toUpperCase(); // capture answer from box
      console.log(guessText);
      //  check user guess against real answer
      if (guessText === answerText1) {
        //  add $("#value1") to current score
        currentScore.html(parseInt(currentScore.html()) + parseInt($("#value1").html()));
        cheeringSound.play();
      } else {
        laughingSound.play();
      }
      // clear out the answer box
      $('#save-me1').val("");
      // now lets get the next question
      getQuestion();
    })

    //  when $("#guess-button2") is clicked, do the following
    $("#guess-button2").click(function() {
      let guessText = $('#save-me2').val().toUpperCase(); // capture answer from box
      console.log(guessText);
      //  check user guess against real answer
      if (guessText === answerText2) {
        //  add $("#value1") to current score
        currentScore.html(parseInt(currentScore.html()) + parseInt($("#value2").html()));
        cheeringSound.play();
      } else {
        laughingSound.play();
      }
      // clear out the answer box
      $('#save-me2').val("");
      // now lets get the next question
      getQuestion();
    })

    //  when $("#guess-button3") is clicked, do the following
    $("#guess-button3").click(function() {
      let guessText = $('#save-me3').val().toUpperCase(); // capture answer from box
      console.log(guessText);
      //  check user guess against real answer
      if (guessText === answerText3) {
        //  add $("#value1") to current score
        currentScore.html(parseInt(currentScore.html()) + parseInt($("#value3").html()));
        cheeringSound.play();
      } else {
        laughingSound.play();
      }
      // clear out the answer box
      $('#save-me3').val("");
      // now lets get the next question
      getQuestion();
    })

  })

})();
