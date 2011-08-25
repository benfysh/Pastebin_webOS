function UserAssistant() {
	/* this is the creator function for your scene assistant object. It will be passed all the 
	   additional parameters (after the scene name) that were passed to pushScene. The reference
	   to the scene controller (this.controller) has not be established yet, so any initialization
	   that needs the scene controller should be done in the setup function below. */
	this.urlOther = "http://pastebin.com/api/api_post.php";	
	this.devAPI = "yourapikeyhere";
	this.urlPro = "http://pastebin.com/pro"	
}

UserAssistant.prototype.setupModel = function() {
	   // Configure the model for the command menu
   this.cmdMenuModel = {
      items: this.cmdMenuDefault()
   };
    //Scrim spinner
    this.statusSpinnerAttributes = {
        spinnerSize: "large"
    },
    this.statusSpinnerModel = {
        spinning: true 
    }	
};

UserAssistant.prototype.setup = function() {
	/* this function is for setup tasks that have to happen when the scene is first created */
		
	/* use Mojo.View.render to render view templates and add them to the scene, if needed */
	
	/* setup widgets here */
	
	/* add event handlers to listen to events from widgets */
    this.setupModel();
//comand menu
    this.controller.setupWidget(Mojo.Menu.commandMenu, {menuClass: 'no-fade'},this.cmdMenuModel);	
	//get user details
    this.updateDetails();	
	this.updateScene();
};

UserAssistant.prototype.startSync = function() {
   // Trigger actual sync actions; this just animates icon
   if (!this.animation) {
      this.cmdMenuModel.items = this.cmdMenuSynching();
      this.animation = new SpinnerAnimation(this.controller, 'indeterminate-stop');
      this.controller.modelChanged(this.cmdMenuModel);
      this.animation.start();
   }
};

UserAssistant.prototype.stopSync = function() {
   // Stop actual sync actions
   if (this.animation) {
      this.animation.stop();
      this.cmdMenuModel.items = this.cmdMenuDefault();
      this.controller.modelChanged(this.cmdMenuModel);
      this.animation = undefined;
   }
};

UserAssistant.prototype.cmdMenuDefault = function() {
   return [
	{ icon:'history', command:'history'},
    { icon: "sync", command: "sync" }
   ];
};

UserAssistant.prototype.cmdMenuSynching = function() {
   return [
   	{ icon:'history', command:'history'},
    { icon: "indeterminate-stop", command: "stop-sync" }
   ];
};

UserAssistant.prototype.handleCommand = function(event) {
	
    if(event.type == Mojo.Event.command) {
	
	switch(event.command) {
            
	    case "history":
                
            this.historyCheck();
		break;
		
		case "sync":
                
            this.updateDetails();
		break
	    
        }
    }
    
};

UserAssistant.prototype.historyCheck= function(event) {
//todo check if user has pasted!
        Mojo.Controller.stageController.pushScene("history");
};

UserAssistant.prototype.updateDetails= function(event) {
	//get info
	//Make sure any user inputs are saved in case of something going wrong
    	//logon check
 		Mojo.Log.info("logged on status is before get user details : " + this.loggedIn);
		switch(this.loggedIn){
		case false:
		return;
		case true:
		Mojo.Log.info("carry on : " + this.loggedIn);	
                }    
    //Build the url to submit info to
    var url = this.urlOther;
    this.option = "userdetails";
    Mojo.Log.info("Sending user request: " + url);
    AddSubcookie = new Mojo.Model.Cookie('key'); //Looks for a cookie called 'key'
	this.userKey = AddSubcookie.get(); //Read the cookie	
	Mojo.Log.info("the session key is : " + this.userKey);   
    //Indicate activity to the user
	this.startSync();
    
    
    //Post the url
    var request =  new Ajax.Request(url, {
        method: 'Post',
		evalJSON: 'false',
			parameters: {
				api_dev_key: this.devAPI,
				api_user_key: this.userKey,
				api_option: this.option				
			},
        onComplete: function(results){
            
            //Hide activity indicator
			this.stopSync();

            
            //Attempt to get the response from the send attempt
            var response;
            var status;
            try{
                response = results.responseText;
                status = parseInt(results.status);
            }catch(err){
                status = 0;
                if(!response){
                    response = "An unexpected error occured while sending your message."
                }
            }
            
            switch(status){
                case 200:
                    
                    //Message sent, processed by server and response received.
                    
                    if(response.toLowerCase().substr(0, 3) != "bad"){
    Mojo.Log.info("The response was: " + response);                        
                        //Sent and accepted by the server                      
                        //Indicate success to user and close the scene.
						// hide the form error message if it was there
this.userDetails = response;
AddSubcookie = new Mojo.Model.Cookie('userDetails');
                AddSubcookie.put(this.userDetails);
this.updateScene();
						// Give the users some choices
//store the logged in user
						
//this.showOKMessage("we got user info!");
		//end new
						
                    }else{
                        //Server not happy with inputs.
						// hide the form error message if it was there
                   
                        //Show user the server response.#
						    Mojo.Log.info("The response is: " + response); 
                        this.showOKMessage("Unable To Update!", response.substr(17, response.length - 17));
                    }
                    break;
                
                default:
					// hide the form error message if it was there
			
                    this.showOKMessage("Unable To Update", "Pastebin.com could not be reached (status code " + results.status + "). Please check you have a working internet connection and try again.")
            }

        }.bind(this),
        onFailure: function(){
            //Something gone horribly wrong (no active net connection most likely).
            
            //Ensure UI activity is hidden
			this.stopSync();
						    Mojo.Log.info("The fail: " + response); 
			// hide the form error message if it was there
           
            //Display message to user.
            this.showOKMessage("Unable To Update", "Pastebin.com could not be reached at this time. Please check you have a working internet connection and try again.")
        }.bind(this)
    })
	
};

UserAssistant.prototype.updateScene = function(event) {
	/* put in event handlers here that should only be in effect when this scene is active. For
	   example, key handlers that are observing the document */
			AddSubcookie = new Mojo.Model.Cookie('userDetails'); //Looks for a cookie called 'logonStatus'
	    this.olduserDetails = AddSubcookie.get(); //Read the cookie
		if(this.olduserDetails) //If the cookie data exists, read it
                {
                this.userDetails = this.olduserDetails;
                }
        else
                {
            //In this case, the cookie doesn't exist
                this.userDetails = "not logged in how did you get here?";
	this.controller.get("user").update(this.userDetails); 					
                }
	Mojo.Log.info("user details are : " + this.userDetails);			
                var username = this.userDetails.match("<user_name>(.*)</user_name>")[1];
                var userEmail = this.userDetails.match("<user_email>(.*)</user_email>")[1];				
                var userFormatShort = this.userDetails.match("<user_format_short>(.*)</user_format_short>")[1];
                var userExpire = this.userDetails.match("<user_expiration>(.*)</user_expiration>")[1];	
                var userAvatar = this.userDetails.match("<user_avatar_url>(.*)</user_avatar_url>")[1];
                var userWatching = this.userDetails.match("<user_watching>(.*)</user_watching>")[1];
                var userWatchers = this.userDetails.match("<user_watchers>(.*)</user_watchers>")[1];
                var userTotal = this.userDetails.match("<user_total_pastes>(.*)</user_total_pastes>")[1];
                var userPrivate = this.userDetails.match("<user_private>(.*)</user_private>")[1];
                var userAccount = this.userDetails.match("<user_account_type>(.*)</user_account_type>")[1];
                var userWeb = this.userDetails.match("<user_website>(.*)</user_website>")[1];
                var userLocation = this.userDetails.match("<user_location>(.*)</user_location>")[1];
                var userBio = this.userDetails.match("<user_bio>(.*)</user_bio>")[1];
//lets build the user view
//user info
		if(userAccount === "1") //Pro user check
                {
                this.userName = username+" <img src=\"images\\crown.png\">";				
                }
        else
                {
            //they are not pro users
                this.userName = username;					
                }
	this.controller.get("user").update(this.userName);
	this.controller.get("email").update(userEmail);	
//avatar
		if(userAvatar === "http://pastebin.com/i/guest.gif") //Pro user check
                {
                this.accountAvatar = "<img src=\"images\\default.png\">";					
                }
        else
                {
            //they are not pro users
                this.accountAvatar = "<img src=\""+userAvatar+"\">"; 					
                }	
	this.controller.get("avatar").update(this.accountAvatar);
	Mojo.Log.info("avatar url : " + this.accountAvatar);	
// watching and watchers
		if(userWatching === "0") //zero check
                {
                this.watching = "You are not watching anyone";				
                }
        else
                {
//do nothing
		if(userWatching === "1") //check one
                {
                this.watching = "You are watching "+userWatching+" person.";			
                }
        else
                {
                this.watching = "You are watching "+userWatching+" people.";		
                }			
                }			
	this.controller.get("watching").update(this.watching);	
//watchers	
		if(userWatchers === "0") //zero check
                {
                this.Watchers = "You have no watchers :(";				
                }
        else		
                {
//do nothing
		if(userWatchers=== "1") //check one
                {
                this.Watchers = "You have "+userWatchers+" watcher.";			
                }
        else
                {
                this.Watchers = "You have "+userWatchers+" watchers.";		
                }	
                }	
			
	this.controller.get("watchers").update(this.Watchers);	
//pastes
		if(userTotal === "1") //Pro user check
                {
                this.accountPastes = "You have "+userTotal+" Paste";				
                }
        else
                {
            //they are not pro users
                this.accountPastes = "You have "+userTotal+" Pastes";				
                }	
		if(userTotal === "0") //Pro user check
                {
                this.accountPastes = "You have not Pasted yet!";				
                }
        else
                {
            //they are not pro users
	Mojo.Log.info("have pasted : " + this.accountPastes);			
                }				
	this.controller.get("pastes").update(this.accountPastes);	
//account type
		if(userAccount === "1") //Pro user check
                {
                this.accountType = "Hey you\'re a Pro <img src=\"images\\crown.png\"> Member Awesome!";				
                }
        else
                {
            //they are not pro users
                this.accountType = "Normal, why not <a href=\""+this.urlPro+"\">go Pro?</a>"; 					
                }	
	this.controller.get("account").update(this.accountType);
//web
		if(userWeb === "") //website check
                {
                this.userWebsite = "You have not added a website.";
	this.controller.get("website").update(userWeb);				
                }
        else
                {
            //they have a website
	this.userWebsite = "<a href=\""+userWeb+"\">"+userWeb+"</a>"		
	this.controller.get("website").update(this.userWebsite);						
                }
//bio
		if(userBio === "") //Pro user check
                {
                userBio = "You have not updated your Bio.";
	this.controller.get("bio").update(userBio);				
                }
        else
                {
            //they are not pro users
	this.controller.get("bio").update(userBio);						
                }
//location
		if(userLocation === "") //Pro user check
                {
                userLocation = "You have not updated your Location.";
	this.controller.get("location").update(userLocation);				
                }
        else
                {
            //they are not pro users
	this.controller.get("location").update(userLocation);						
                }					
	Mojo.Log.info("account type : " + this.accountType);		   
};

UserAssistant.prototype.activate = function(event) {
	/* put in event handlers here that should only be in effect when this scene is active. For
	   example, key handlers that are observing the document */
			AddSubcookie = new Mojo.Model.Cookie('logonStatus'); //Looks for a cookie called 'logonStatus'
	    this.oldLogonStuatus = AddSubcookie.get(); //Read the cookie
		if(this.oldLogonStuatus) //If the cookie data exists, read it
                {
                this.loggedIn = this.oldLogonStuatus;
                }
        else
                {
            //In this case, the cookie doesn't exist
                this.loggedIn = false;		
                }
		Mojo.Log.info("logged on check at activate user status is : " + this.loggedIn);
		if(this.loggedIn === true) 
				{
		this.loggedInHandler();
		this.updateDetails();	
		this.updateScene();
                }
        else
                {
		this.loggedOffHandler();;		
                }  	   
};

UserAssistant.prototype.deactivate = function(event) {
	/* remove any event handlers you added in activate and do any other cleanup that should happen before
	   this scene is popped or another scene is pushed on top */
		AddSubcookie = new Mojo.Model.Cookie('userDetails');
		AddSubcookie.put(this.userDetails);	    
};

UserAssistant.prototype.cleanup = function(event) {
	/* this function should do any cleanup needed before the scene is destroyed as 
	   a result of being popped off the scene stack */
  	   
};

UserAssistant.prototype.showOKMessage = function(title,message){
		this.controller.showAlertDialog({
		onChoose: function(value) {},
		title:title,
		message:message,
		choices:[ {label:'OK', value:'OK', type:'color'} ]
	});
}

UserAssistant.prototype.loggedOffHandler = function() {
			this.controller.get('logon_true').hide();
			this.controller.get('logon_true').setStyle({visibility:'hidden'});
			this.controller.get('logon_error').show();
			this.controller.get('logon_error').setStyle({visibility:'visible'});			
};

UserAssistant.prototype.loggedInHandler = function() {

		// if the error message is already displayed then just make it invisible to avoid jumpiness
			this.controller.get('logon_error').hide();
			this.controller.get('logon_error').setStyle({visibility:'hidden'});
			this.controller.get('logon_true').show();
			this.controller.get('logon_true').setStyle({visibility:'visible'});

		
};	