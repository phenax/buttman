
/* q_res:: Set of response to the asked question */
const q_res= {
	what(words) {
		switch(words[1]) {
			case "are":
			case "r":
				if(words[2] == "you?" || words[2] == "u?")
					return "ButtMan";
				return "ButtTraining";
			case "is":
				if(words[2] == "your" || words[2] == "ur")
					return "ButtMan";
				return "Fuck you";
			default:
				return "Fuck you";
		}

		return "My ButtCave. Also calld gigantic ButtHole wid flying Butts";
	},
	why(words) {
		return "Becuz I'm ButtMan!";
	},
	is(words) {
		var res= ["Yes", "No"];
		return res[Math.floor(Math.random()*res.length)];
	},
	where(words) {
		return "In my ButtCave";
	}
};

/* question:: Identifying the type of question */
const question= (words)=> {
	switch(words[0]) {
		case "why":
		case "how":
			return q_res.why(words);
		case "what":
			return q_res.what(words);
		case "are":
		case "is":
			return q_res.is(words);
		case "where":
			return q_res.where(words);
		default:
			return "Ur qustion iz stupid";
	}
};

/* just_text:: Outputs to non-questions */
const just_text= (words) => {
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