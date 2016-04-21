const DONT_UNDERSTAND= "ButtMan no understnd wut u say. Do u evn school, bruh?";

const randomResponse= (res)=> {
	var random_index= Math.floor(Math.random()*res.length);
	return res[random_index];
}

/* q_res:: Set of response to the asked question */
const q_res= {
	what(words) {
		const whats= (i)=> {
			if(words[i] == "your" || words[i] == "ur")
					return "ButtMan";
				return DONT_UNDERSTAND;
		};

		if(words[0] == "whats")
			return whats(1);

		switch(words[1]) {
			case "are":
			case "r":
				if(!(words[3]) && (words[2] == "you" || words[2] == "u"))
					return "ButtMan";
				return "ButtTraining";
			case "is":
				return whats(2);
		}

		return "Fuck you";
	},
	why(words) {
		if(words[0] == "how") {
			switch(words[1]) {
				case "did":
					return "Magic!";
				case "are":
					return randomResponse([
								"Full of poop",
								"Good",
								"Very Smelly"
							]);
			}

			return "I dunno";
		}

		return "Becuz I'm ButtMan!";
	},
	is(words) {
		return randomResponse(["Yes", "No"]);
	},
	where(words) {
		return "ButtCave. Also calld gigantic ButtHole wid flying Butts";
	},
	who(words) {
		switch(words[1]) {
			case "are":
			case "r":
				return randomResponse([
						"I'm ButtMan", 
						"Me ButtMan", 
						"ButtMan iz me name"
					]);
		}

		return randomResponse([
				"Me thnk it iz PooFace", 
				"ButtGirl, probably"
			]);
	}
};

/* question:: Identifying the type of question */
const question= (words)=> {

	words= words.join(" ");
	words= words.slice(0,words.length - 1);
	words= words.split(" ");

	switch(words[0]) {
		case "why":
		case "how":
			return q_res.why(words);
		case "what":
		case "whats":
			return q_res.what(words);
		case "are":
		case "is":
		case "did":
			return q_res.is(words);
		case "where":
			return q_res.where(words);
		case "who":
			return q_res.who(words);
		default:
			return DONT_UNDERSTAND;
	}
};

/* just_text:: Outputs to non-questions */
const just_text= (words) => {

	switch(words[0]) {
		case "hey":
		case "hello":
			return randomResponse([
					"Helo! Dis iz ButtMan", 
					"Helo. ButtMan speaking", 
					"Hey. Me ButtMan", 
					"I AM BUTTMAN"
				]);
		case "my":
			if(words[1] == "name")
				return "Helo, "+(words[3] || "friend");
			return DONT_UNDERSTAND;
		case "fuck":
		case "bitch":
		case "asshole":
			return randomResponse([
						"Same to yu",
						"U seem lyk a gurl wid daddy issues",
						"Gud to see tht u knw hw to spell ur name"
					]);
		case "assnugget":
			return "Yu very smart";
	}

	return "ButtMan knw secret of univurs. Ask ButtMan sumthng...";
};

/* Bot reply */
module.exports= (msg)=> {
	var data= "";

	msg= msg.toLowerCase();
	var words= msg.split(" ");

	if(msg[msg.length - 1] == "?")
		return question(words);

	return just_text(words);
};