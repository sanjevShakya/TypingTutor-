;(function() {
	var CANVAS_WIDTH = 700;
	var CANVAS_HEIGHT = 500;
	var GAME_LOOP = 30;
	var OFFSET = 100;

	var randomWords = "Stylohyoidean continuation crosscheck tryptic shawano Aeroballistics doorstone faunally expeditating ungenial Pyrrole transarctic open preacquired hardwood Crunchable unrobbed regnant karyn gentoo Uncudgeled lipopectic pieceworker picocurie unforsaken Pharyngitis synoptic combined presaw gluck Bouillon unfricative ctesius unjoyed noncontradictory Catastrophism congeneric unliquidating sinuousness nonextenuative Climactical malaprop unvendable briber kenhorst Donorship obote pretestify expropriator iricise Duodiode embus fabliaux immuniser netting Fenestral hylozoist bivvy mylohyoid miltonic Submediant varus metempsychosis sugarless oeonus Mohilev illumine carnarvonshire garda peperoni Threadfin nah denarii autonomously crenulation Glarus liftman photoduplication homosexuality actualistic Creuse innervate reconcentration linebred signore Hecticness peeblesshire waynesville salet hugeness Benzonitrile nontanning hustings ion tranquillity Histadrut gaminess somberness noncircuitous nonlymphatic".toLowerCase().split(' ');

	function Word() {
		this.word;
		this.x =0;
		this.y =0;
		this.element;
		this.dx = 0;
		this.dy = 1;
		this.span = [];
		this.init = function() {
			this.element = document.createElement('div');
			this.element.setAttribute('class','word');
			this.container = document.getElementById('container');
			this.container.appendChild(this.element);
		}

		this.setWordPosition = function(randX) {
			this.x = randX;
			this.y = 0;
		}

		this.draw = function() {
			this.element.style.top = this.y + 'px';
			this.element.style.left = this.x + 'px';
		}

		this.removeElement = function() {
			this.element.remove();
		}

		this.getWord = function() {
			return this.word;
		}

		this.setRandomWord = function() {
			this.word = randomWords[getRandom(0,randomWords.length -1)];
			//this.element.innerHTML = this.word;
			var tempWord = this.word.split('');
			for(var i = 0; i < tempWord.length; i++) {
				var spanElems = document.createElement('span');
				spanElems.innerHTML = tempWord[i];
				this.element.appendChild(spanElems);
				this.span.push(spanElems);
			}

		}

	}

	function Game() {
		var words = [];
		var that = this;
		var gameIntervalId;
		var counter = 0;
		var gameWord;
		var index = 1;
		var score = 0;
		var scoreBoard = document.getElementById('scoreBoard');
		document.addEventListener("keydown",firstWordCompare,false);
		
		this.init = function() {
			gameIntervalId = setInterval(runGame,GAME_LOOP);
			scoreBoard.innerHTML = "SCORE: 0";
		}

		var runGame = function() {
			counter++;
			if(counter % 100 == 0) {
				createWords();
			}
			moveWords();
			bottomWallCollision();
			//removeWords();
		}

		var createWords = function() {
			var word = new Word();
			word.init();
			word.setRandomWord();
			var xpos = getRandom(0, CANVAS_WIDTH - OFFSET);
			word.setWordPosition(xpos);
			word.draw();
			words.push(word);
		}

		var moveWords = function() {
			for(var i = 0; i < words.length; i++) {
				var word = words[i];
				word.y += word.dy
				word.draw();
			}
		}

		var bottomWallCollision = function() {
			for(var i = 0; i < words.length; i++) {
				if(words[i].y > CANVAS_HEIGHT) {
					words[i].removeElement();
					words.shift();
				}
			}
		}

		var removeWords = function() {
			for(var i = 0; i < words.length; i++) {
				var word = words[i];
				var flag =word.span.forEach(function(element){
					return element.style.color == "red" ? true : false;
				});
				if(flag) {
					
					words.shift();
				}

			}
		}  
	

		function firstWordCompare(e) {
			var wordFirst;
			var flag = false;

			for(var i=0; i < words.length; i++) {
				var firstLetter = String.fromCharCode(e.keyCode).toLowerCase();
				wordFirst = words[i];
				if(wordFirst.span[0].innerHTML == firstLetter) {
					wordFirst.span[0].style.color = "red";
					document.removeEventListener("keydown",firstWordCompare);
					document.addEventListener("keydown",tempEvent);
					break;
				}
			}


			function tempEvent(event) {
				var currentLetter = String.fromCharCode(event.which).toLowerCase();	
				flag = compareWord(currentLetter);
				console.log("temporary Event",flag);
				if(flag) {
					words.slice(words.indexOf(wordFirst),1);
					wordFirst.removeElement();
					index = 1;
					console.log("inside tempEvent",index);
					document.removeEventListener("keydown",tempEvent);
					document.addEventListener("keydown",firstWordCompare);
				}
			}

			
			function compareWord(currentLetter) {
				for(var i = index; i < wordFirst.span.length; i++) {
					if(wordFirst.span[i].innerHTML == currentLetter){
						wordFirst.span[i].style.color = "red";
						index++;
						flag = false;
						break;
					}else {
						//mistake occured
						return true;
					}
				}
				if(wordFirst.span.length == index) {
					score++;
					updateScore();
					//word correct
					return true;
				}else {
					return false;
				}
			}	
		}

		var updateScore = function() {
			scoreBoard.innerHTML = "SCORE: " + score;
		}
	}

	function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
	}	

	new Game().init();
})();
