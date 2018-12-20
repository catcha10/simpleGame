var app = new Vue({
	el:"#app",
	data:{
		playerHealth:0,
		dragonHealth:0, 
		attackPlayerVal:0, //value for attack player
		attackDragonVal:0, //value for attack dragon
		commentaryList:[],
		gameOn:false,
		curPlayerVal:0,
		curDragonVal:0,
		winMsg:"You Win. Do you want a re-match?",
		loseMsg:"You Lose. Do you want restart a new game?",
		gvUpMsg:"Are you sure you want to give up?",
		healVal:0,
		playerBarClass:"",
		dragonBarClass:"",
	},
	 methods: {

	 	//reset all the values
	 	reset:function(){
	 		this.playerHealth = 100;
	 		this.dragonHealth = 100;
	 		//this.playerBarClass = "progress-bar progress-bar-striped active progress-bar-success";
	 		//this.dragonBarClass = "progress-bar progress-bar-striped active progress-bar-success";
	 		this.attackPlayerVal = 0;
			this.attackDragonVal=0;
			this.curPlayerVal=0;
			this.curDragonVal=0;
			this.commentaryList=[];
			this.healVal=0;
	 	},
	 	//Start A New Game
	 	startGameFunc:function(){
	 		this.reset();
	 		this.gameOn = true;
	 		//this.disableStartBtn = false;
	 	},
	 	//attack function
	 	attack : function(){
	 		this.attackPlayerVal = Math.floor(Math.random()*10)+1;
	 		this.attackDragonVal = Math.floor(Math.random()*10)+1;

	 		this.curPlayerVal = this.playerHealth;
	 		this.curDragonVal = this.dragonHealth;

	 		this.playerHealth -= this.attackPlayerVal;
	 		this.dragonHealth -= this.attackDragonVal;

	 		this.commentary(this.attackPlayerVal , this.attackDragonVal , 'attacks');
	 		this.chkStatus();
	 	},
	 	//blast function
	 	blast: function(){
	 		/*this.attackPlayerVal = (Math.floor(Math.random()*10)+1)*3;
	 		this.attackDragonVal = (Math.floor(Math.random()*10)+1)*3;*/
	 		this.attackPlayerVal = Math.floor(Math.random()*20)+10;
	 		this.attackDragonVal = Math.floor(Math.random()*20)+10;

	 		this.curPlayerVal = this.playerHealth;
	 		this.curDragonVal = this.dragonHealth;

	 		this.playerHealth -= this.attackPlayerVal;
	 		this.dragonHealth -= this.attackDragonVal;

	 		this.commentary(this.attackPlayerVal , this.attackDragonVal , 'power attacks');
	 		this.chkStatus();
	 	},
	 	//heal function
	 	heal:function(){
	 		this.healVal = Math.floor(Math.random()*10)+1;
	 		this.attackPlayerVal = Math.floor(Math.random()*10)+1;

	 		if((this.playerHealth + this.healVal)<=100){
	 			this.playerHealth += this.healVal;
	 			this.playerHealth -= this.attackPlayerVal;

	 			this.commentaryList.unshift("Player heals themself for " + this.healVal , "Dragon attacks player for " + this.attackPlayerVal);
	 			this.chkStatus();
	 		}

	 	},
	 	//giveup function
	 	giveUp:function(){
	 		if (confirm(this.gvUpMsg)) {
		     this.reset();
	 		 this.gameOn = false;
		    } 
	 		
	 	},
	 	//commentary function
	 	commentary:function(playerAttack , dragonAttack, type){
	 		//show the latest on top
	 		this.commentaryList.unshift("Dragon "+type+" player for " + playerAttack , "Player "+type+" dragon for " + dragonAttack);
	 		
	 	},
	 	winFunc:function(){
		  if (confirm(this.winMsg)) {
		    this.startGameFunc();
		  } 
	 	},
	 	loseFunc:function(){
	 		if(confirm(this.loseMsg)) {
			    this.startGameFunc();
			} 
	 	},
	 	chkStatus:function(){
	 		
	 		if(this.playerHealth<=0){
	 			this.playerHealth = 0;
	 			this.dragonHealth = this.curDragonVal; 
	 			return this.loseFunc();
	 		}
	 		if(this.dragonHealth<=0){
	 			this.dragonHealth = 0;
	 			this.playerHealth = this.curPlayerVal;
	 			return this.winFunc();
	 		}
	 	}

	 }
});