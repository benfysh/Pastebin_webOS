function PreferencesAssistant() {
	/* this is the creator function for your scene assistant object. It will be passed all the 
	   additional parameters (after the scene name) that were passed to pushScene. The reference
	   to the scene controller (this.controller) has not be established yet, so any initialization
	   that needs the scene controller should be done in the setup function below. */
	this.userName = "a user";
	this.userPass = "a pass";
	this.url = "http://pastebin.com/api/api_login.php";
	this.urlOther = "http://pastebin.com/api/api_post.php";	
	this.devAPI = "yourapikeyhere";
	this.signUpUrl = "http://pastebin.com/signup";
}


PreferencesAssistant.prototype.handleThemeChange = function(event){
//This function changes the theme, based on what was selected from the List Selector
this.theme = this.themeModel.value;
	if (this.theme == "DEFAULT_THEME"){
		$$('body')[0].addClassName('palm-default');
		$$('body')[0].removeClassName('palm-dark');
	}else{
		$$('body')[0].addClassName('palm-dark');
		$$('body')[0].removeClassName('palm-default');
	}
};

PreferencesAssistant.prototype.setup = function() {
	/* this function is for setup tasks that have to happen when the scene is first created */
		
	/* use Mojo.View.render to render view templates and add them to the scene, if needed */
	
	/* setup widgets here */
	
	/* add event handlers to listen to events from widgets */
//check if user is logged on				
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
		Mojo.Log.info("logged on status is : " + this.loggedIn);
		if(this.loggedIn === true) 
        {
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
                }
Mojo.Log.info("user details at start : " + this.userDetails)
		AddSubcookie = new Mojo.Model.Cookie('key'); //Looks for a cookie called 'key'
	    this.oldKey = AddSubcookie.get(); //Read the cookie
		if(this.oldKey) //If the cookie data exists, read it
                {
                this.key = this.oldKey;
                }
        else
                {
            //In this case, the cookie doesn't exist
                this.key = "empty";		
                }
Mojo.Log.info("user key at start : " + this.key)
try{	
Mojo.Log.info("show loggedin hide details")	
this.controller.get('loggedin').show();
this.controller.get('loggedin').setStyle({visibility:'visible'});
							} catch(e) {
								Mojo.Log.error("@@@@@ EXCEPTION");
								Mojo.Log.error(e.message);
							}
		}
        else
                {
Mojo.Log.info("hide loggedin show details")				
	this.controller.get('details').show();
	this.controller.get('details').setStyle({visibility:'visible'});
	this.key = "";
	this.userDetails ="";	
Mojo.Log.info("user key at start : " + this.key)	
				}	
//Read theme cookie or default info
	AddSubcookie = new Mojo.Model.Cookie('themePrefs'); //Looks for a cookie called 'addSub'
	    this.oldThemePrefs = AddSubcookie.get(); //Read the cookie
		if(this.oldThemePrefs) //If the cookie data exists, read it
                {
                this.theme = this.oldThemePrefs.theme;
                }
        else
                {
            //In this case, the cookie doesn't exist
                this.theme = "DARK_THEME";		
                }
//feedback				
		AddSubcookie = new Mojo.Model.Cookie('feedback'); //Looks for a cookie called 'feedback'
	    this.oldfeedbackPrefs = AddSubcookie.get(); //Read the cookie
		if(this.oldfeedbackPrefs) //If the cookie data exists, read it
                {
                this.feedback = this.oldfeedbackPrefs;
                }
        else
                {
            //In this case, the cookie doesn't exist
                this.feedback = "ON";		
                }		
//Updates				
		AddSubcookie = new Mojo.Model.Cookie('update'); //Looks for a cookie called 'update'
	    this.oldupdatePrefs = AddSubcookie.get(); //Read the cookie
		if(this.oldupdatePrefs) //If the cookie data exists, read it
                {
                this.update = this.oldupdatePrefs;
                }
        else
                {
            //In this case, the cookie doesn't exist
                this.update = "ON";		
                }	
		Mojo.Log.info("update in prefs setup is : " + this.update);
//Sig				
		AddSubcookie = new Mojo.Model.Cookie('sig'); //Looks for a cookie called 'sig'
	    this.oldSigPrefs = AddSubcookie.get(); //Read the cookie
		if(this.oldSigPrefs) //If the cookie data exists, read it
                {
                this.sig = this.oldSigPrefs;
                }
        else
                {
            //In this case, the cookie doesn't exist
                this.sig = "ON";		
                }	
		Mojo.Log.info("Sig in prefs setup is : " + this.sig);			
	// sort rotation cookie
		AddSubcookie = new Mojo.Model.Cookie('rotatePrefs'); //Looks for a cookie called 'rotatePrefs'
	    this.oldRotatePrefs = AddSubcookie.get(); //Read the cookie
		if(this.oldRotatePrefs) //If the cookie data exists, read it
                {
                this.rotate = this.oldRotatePrefs;
                }
        else
                {
            //In this case, the cookie doesn't exist
                this.rotate = "ON";		
                }
	//Inherit settings				
		AddSubcookie = new Mojo.Model.Cookie('inherit'); //Looks for a cookie called 'inherit'
	    this.oldinheritPrefs = AddSubcookie.get(); //Read the cookie
		if(this.oldinheritPrefs) //If the cookie data exists, read it
                {
                this.inherit = this.oldinheritPrefs;
                }
        else
                {
            //In this case, the cookie doesn't exist
                this.inherit = "ON";		
                }	
		Mojo.Log.info("inherit in prefs setup is : " + this.inherit);
        //Setup ListSelector
	this.themeAttributes = {
			label: $L('Theme'),
            choices: [
                {label: "Palm Classic", value: "DEFAULT_THEME"},
                {label: "Palm Dark", value: "DARK_THEME"}
                ]};
	this.themeModel = {
	        value: $L(this.theme),                
	        disabled: false
	        };
	this.controller.setupWidget("themeListId", this.themeAttributes, this.themeModel);
	//rotate checkbox
	this.rotatePrefsAttributes = {
	property: 'value',
	trueValue: 'ON',
	falseValue: 'OFF'
	};

	this.rotatePrefsModel = {
	//value: 'ON',
	value: this.rotate,
	disabled: false
	};
	//feedback checkbox
	this.feedbackPrefsAttributes = {
	property: 'value',
	trueValue: 'ON',
	falseValue: 'OFF'
	};

	this.feedbackPrefsModel = {
	//value: 'ON',
	value: this.feedback,
	disabled: false
	};
	//update checkbox
	this.updatePrefsAttributes = {
	property: 'value',
	trueValue: 'ON',
	falseValue: 'OFF'
	};

	this.updatePrefsModel = {
	//value: 'ON',
	value: this.update,
	disabled: false
	};
	//sig checkbox
	this.sigPrefsAttributes = {
	property: 'value',
	trueValue: 'ON',
	falseValue: 'OFF'
	};

	this.sigPrefsModel = {
	//value: 'ON',
	value: this.sig,
	disabled: false
	};
	//inherit checkbox
	this.inheritPrefsAttributes = {
	property: 'value',
	trueValue: 'ON',
	falseValue: 'OFF'
	};

	this.inheritPrefsModel = {
	//value: 'ON',
	value: this.inherit,
	disabled: false
	};
	//password
this.controller.setupWidget('passwordFieldId',
    this.attributes = {
        hintText: $L("Type Password ....")
    },
    this.model = {
        value: ""
    }
);	
this.controller.setupWidget('userName',
    this.attributes = {
        textCase: Mojo.Widget.steModeLowerCase,	
        hintText: $L("Type user name ..")		
    },
    this.model = {
        value: ""
    }
);
//logon widget
    this.controller.setupWidget('logon',
        this.attributes = {
		type: Mojo.Widget.activityButton
		},
        this.model = {
            label : "Logon",
			buttonClass: 'affirmative',			
            disabled: false
        }
    );
//user widget
    this.controller.setupWidget('userButton',
        this.attributes = {},
        this.model = {
            label : "User Details",		
			buttonClass: 'affirmative',		
            disabled: false
        }
    );	
//user widget
    this.controller.setupWidget('logoutButton',
        this.attributes = {
		type: Mojo.Widget.activityButton
		},
        this.model = {
		    label : "Log Out",	
			buttonClass: 'negative',		
            disabled: false
        }
    );
//logon widget
    this.controller.setupWidget('signup',
        this.attributes = {},
        this.model = {
            label : "I need an account",
			buttonClass: 'dismiss',			
            disabled: false
        }
    );	
//Username				
		AddSubcookie = new Mojo.Model.Cookie('loggedInUser'); //Looks for a cookie called 'loggedInUser'
	    this.oldloggedInUser = AddSubcookie.get(); //Read the cookie
		if(this.oldloggedInUser) //If the cookie data exists, read it
                {
                this.loggedInUser = this.oldloggedInUser;
                }
        else
                {
            //In this case, the cookie doesn't exist
                this.loggedInUser = "Welcome";		
                }		
	this.controller.get("user").update(this.loggedInUser);				
	/* add event handlers to listen to events from widgets */
	this.controller.setupWidget('feedback', this.feedbackPrefsAttributes,this.feedbackPrefsModel);
	this.controller.setupWidget('rotate', this.rotatePrefsAttributes,this.rotatePrefsModel);
	this.controller.setupWidget('update', this.updatePrefsAttributes,this.updatePrefsModel);
	this.controller.setupWidget('sig', this.sigPrefsAttributes,this.sigPrefsModel);	
	this.controller.setupWidget('inherit', this.inheritPrefsAttributes,this.inheritPrefsModel);		
};

PreferencesAssistant.prototype.handleButtonLogoutPress = function(event){
	//logout
		Mojo.Log.info("logout req: " );
	this.controller.get('loggedin').hide();
	this.controller.get('details').show();
	this.controller.get('details').setStyle({visibility:'visible'});
	this.key = "";
	this.userDetails ="";
	this.loggedIn = false;
	AddSubcookie = new Mojo.Model.Cookie('logonStatus');
                AddSubcookie.put(this.loggedIn);	
    //Hide activity indicator
	this.buttonWidget = this.controller.get('logoutButton');
	this.buttonWidget.mojo.deactivate();
	this.spinning = false;			
};

PreferencesAssistant.prototype.handleButtonUserPress = function(event){
	//user details
		Mojo.Log.info("user details reqs : " );
    Mojo.Controller.stageController.pushScene("user");		
};

PreferencesAssistant.prototype.handleButtonSignUp = function(event){
	//account req
		Mojo.Log.info("signup req: " );
		Mojo.Log.info("Open browser with: " +this.signUpUrl);
		// Set up and show the banner message for success
		var message = "Loading signup page";
		var appController = Mojo.Controller.getAppController();
		var bannerParams = {soundClass: '', soundFile: '', icon: '', messageText: message};
		appController.showBanner(bannerParams, {banner: message});
		//open browser and pass URL
		this.controller.serviceRequest("palm://com.palm.applicationManager", {
        method: "launch",
        parameters: {
            id: "com.palm.app.browser",
            params: {
                target: this.signUpUrl
            }
        }		
		});	
};

PreferencesAssistant.prototype.checkboxCallback = function(event){
 	this.rotate = event.value;
	//Setup Theme
	if (this.rotate === "ON"){
this.controller.stageController.setWindowOrientation("free");
	}else{
this.controller.stageController.setWindowOrientation("up");
	}	

};

PreferencesAssistant.prototype.checkboxFeedCallback = function(event){
 	this.feedback = event.value;
	//Setup Theme
		Mojo.Log.info("feedback in prefs is : " + this.feedback);
};

PreferencesAssistant.prototype.signInHandler = function() {

		// if the error message is already displayed then just make it invisible to avoid jumpiness
		if (this.controller.get('error_message').getStyle('display') != 'none') {
			this.controller.get('error_message').setStyle({visibility:'hidden'});
		} else {
			this.controller.get('error_message').hide();
			this.controller.get('error_message').setStyle({visibility:'visible'});
		}
		// adding manual delay 
		setTimeout(this.showErrorDialog.bind(this), 500);
};

PreferencesAssistant.prototype.showErrorDialog = function() {	
		this.controller.get('error_message').show();
		this.controller.get('error_message').setStyle({visibility:'visible'});
};
	
PreferencesAssistant.prototype.handleButtonLogonPress = function(event){
	//get info
	this.userName = this.controller.get("userName").mojo.getValue();
	this.userPass = this.controller.get("passwordFieldId").mojo.getValue();	
	//Setup Theme
	Mojo.Log.info("logon user is : " + this.userName);
	Mojo.Log.info("logon pass is : " + this.userPass);
	
	if(this.userName === "" || this.userPass === ""){
	// Show logon error
	Mojo.Log.info("User give us nothing!");	
	            //Hide activity indicator
	this.buttonWidget = this.controller.get('logon');
	this.buttonWidget.mojo.deactivate();
	this.spinning = false;	
	this.signInHandler();
	}else{
	Mojo.Log.info("we didnt get empty submit!");
	// goto logon stuff
	this.logonStuff();
	}
};



PreferencesAssistant.prototype.logonStuff = function(event){
	//get info
	this.userName = this.controller.get("userName").mojo.getValue();
	this.userPass = this.controller.get("passwordFieldId").mojo.getValue();	
	//Setup Theme
	Mojo.Log.info("logon user is : " + this.userName);
	Mojo.Log.info("logon pass is : " + this.userPass);

	    //Make sure any user inputs are saved in case of something going wrong
    this.controller.get('error_message').hide();   
    //Build the url to submit info to
    var url = this.url;
    
    Mojo.Log.info("Sending PB request: " + url);
    
    //Indicate activity to the user

    
    //Post the url
    var request =  new Ajax.Request(url, {
        method: 'Post',
		evalJSON: 'false',
			parameters: {
				api_dev_key: this.devAPI,
				api_user_name: this.userName,
				api_user_password: this.userPass				
			},
        onComplete: function(results){
            
            //Hide activity indicator
		this.buttonWidget = this.controller.get('logon');
		this.buttonWidget.mojo.deactivate();
		this.spinning = false;	
            
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
this.key = response;
this.loggedIn = true;
						// Give the users some choices		
//this.showOKMessage("Session Key: ", response);
this.controller.get('details').hide();
this.controller.get('loggedin').show();
this.controller.get('loggedin').setStyle({visibility:'visible'});
this.getUserInfo();
		//end new
						
                    }else{
                        //Server not happy with inputs.
						// hide the form error message if it was there

                        //Show user the server response.
                        this.showOKMessage("Login Error!", response.substr(17, response.length - 17));
                    }
                    break;
                
                default:
					// hide the form error message if it was there
			this.controller.get('error_message').hide();
                    this.showOKMessage("Login Error!", "Pastebin.com could not be reached (status code " + results.status + "). Please check you have a working internet connection and try again.")
            }

        }.bind(this),
        onFailure: function(){
            //Something gone horribly wrong (no active net connection most likely).
            
            //Ensure UI activity is hidden

			// hide the form error message if it was there

            //Display message to user.
            this.showOKMessage("Login Error!", "Pastebin.com could not be reached at this time. Please check you have a working internet connection and try again.")
        }.bind(this)
    })
	
};

PreferencesAssistant.prototype.getUserInfo = function(event){
	//get info
	    //Make sure any user inputs are saved in case of something going wrong
        
    //Build the url to submit info to
    var url = this.urlOther;
    this.option = "userdetails";
    Mojo.Log.info("Sending user request: " + url);
    
    //Indicate activity to the user

    
    //Post the url
    var request =  new Ajax.Request(url, {
        method: 'Post',
		evalJSON: 'false',
			parameters: {
				api_dev_key: this.devAPI,
				api_user_key: this.key,
				api_option: this.option				
			},
        onComplete: function(results){
            
            //Hide activity indicator

            
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
	Mojo.Log.info("lets pull out that info: ");  
                this.username = this.userDetails.match("<user_name>(.*)</user_name>")[1];
                this.userFormatShort = this.userDetails.match("<user_format_short>(.*)</user_format_short>")[1];
                this.userExpire = this.userDetails.match("<user_expiration>(.*)</user_expiration>")[1];	
                this.userAvatar = this.userDetails.match("<user_avatar_url>(.*)</user_avatar_url>")[1];
                this.userWatching = this.userDetails.match("<user_watching>(.*)</user_watching>")[1];
                this.userWatchers = this.userDetails.match("<user_watchers>(.*)</user_watchers>")[1];
                this.userTotal = this.userDetails.match("<user_total_pastes>(.*)</user_total_pastes>")[1];
                this.userPrivate = this.userDetails.match("<user_private>(.*)</user_private>")[1];
                this.userAccount = this.userDetails.match("<user_account_type>(.*)</user_account_type>")[1];
                this.userWeb = this.userDetails.match("<user_website>(.*)</user_website>")[1];
                this.userLocation = this.userDetails.match("<user_location>(.*)</user_location>")[1];
                this.userBio = this.userDetails.match("<user_bio>(.*)</user_bio>")[1];					
    Mojo.Log.info("Username: " + this.username);
    Mojo.Log.info("Userformat short: " + this.userFormatShort); 
    Mojo.Log.info("UserExpire: " + this.userExpire);	
    Mojo.Log.info("userAvatar: " + this.userAvatar);	
    Mojo.Log.info("userWatching: " + this.userWatching);
    Mojo.Log.info("userWatchers: " + this.userWatchers);
    Mojo.Log.info("userTotal: " + this.userTotal);
    Mojo.Log.info("userPrivate: " + this.userPrivate); 
    Mojo.Log.info("userAccount: " + this.userAccount);
    Mojo.Log.info("userWeb: " + this.userWeb);
    Mojo.Log.info("userLocation: " + this.userLocation);
    Mojo.Log.info("userBio: " + this.userBio);		
						// Give the users some choices
//store the logged in user
this.loggedInUser = this.username						
	this.controller.get("user").update(this.loggedInUser);						
//this.showOKMessage("we got user info!");
                    }else{
                        //Server not happy with inputs.
						// hide the form error message if it was there
                   
                        //Show user the server response.
                        this.showOKMessage("Login Error!", response.substr(17, response.length - 17));
                    }
                    break;
                
                default:
					// hide the form error message if it was there
			
                    this.showOKMessage("Login Error!", "Pastebin.com could not be reached (status code " + results.status + "). Please check you have a working internet connection and try again.")
            }

        }.bind(this),
        onFailure: function(){
            //Something gone horribly wrong (no active net connection most likely).
            
            //Ensure UI activity is hidden

			// hide the form error message if it was there
           
            //Display message to user.
            this.showOKMessage("Login Error!", "Pastebin.com could not be reached at this time. Please check you have a working internet connection and try again.")
        }.bind(this)
    })
	
};

PreferencesAssistant.prototype.checkboxUpdateCallback = function(event){
 	this.update = event.value;
	//Setup Theme
		Mojo.Log.info("update in prefs is : " + this.update);
};

PreferencesAssistant.prototype.checkboxSigCallback = function(event){
 	this.sig = event.value;
	//Setup Theme
		Mojo.Log.info("Sig in prefs is : " + this.sig);
};

PreferencesAssistant.prototype.checkboxInheritCallback = function(event){
 	this.inherit = event.value;
	//Setup Theme
		Mojo.Log.info("inherit in prefs is : " + this.inherit);
};

PreferencesAssistant.prototype.activate = function(event) {
	/* put in event handlers here that should only be in effect when this scene is active. For
	   example, key handlers that are observing the document */
	this.themeChanged = this.handleThemeChange.bindAsEventListener(this);
	Mojo.Event.listen(this.controller.get('themeListId'), Mojo.Event.propertyChange, this.themeChanged.bind(this));	   
	this.checkboxCallback = this.checkboxCallback.bind(this);
	Mojo.Event.listen(this.controller.get('rotate'),Mojo.Event.propertyChange,this.checkboxCallback);
	this.checkboxFeedCallback = this.checkboxFeedCallback.bind(this);
	Mojo.Event.listen(this.controller.get('feedback'),Mojo.Event.propertyChange,this.checkboxFeedCallback);
	this.checkboxUpdateCallback = this.checkboxUpdateCallback.bind(this);
	Mojo.Event.listen(this.controller.get('update'),Mojo.Event.propertyChange,this.checkboxUpdateCallback);
	this.checkboxSigCallback = this.checkboxSigCallback.bind(this);
	Mojo.Event.listen(this.controller.get('sig'),Mojo.Event.propertyChange,this.checkboxSigCallback);
	//inherit settings
	this.checkboxInheritCallback = this.checkboxInheritCallback.bind(this);
	Mojo.Event.listen(this.controller.get('inherit'),Mojo.Event.propertyChange,this.checkboxInheritCallback);	
	//logon button
	this.handleButtonLogon = this.handleButtonLogonPress.bindAsEventListener(this);
    Mojo.Event.listen(this.controller.get('logon'), Mojo.Event.tap, this.handleButtonLogon);
	//loout button
	this.handleButtonLogout = this.handleButtonLogoutPress.bindAsEventListener(this);
    Mojo.Event.listen(this.controller.get('logoutButton'), Mojo.Event.tap, this.handleButtonLogout);
	//user button
	this.handleButtonUser = this.handleButtonUserPress.bindAsEventListener(this);
    Mojo.Event.listen(this.controller.get('userButton'), Mojo.Event.tap, this.handleButtonUser);	
	//signup button
	this.handleButtonSignUp = this.handleButtonSignUp.bindAsEventListener(this);
    Mojo.Event.listen(this.controller.get('signup'), Mojo.Event.tap, this.handleButtonSignUp);		   
};

PreferencesAssistant.prototype.deactivate = function(event) {
	/* remove any event handlers you added in activate and do any other cleanup that should happen before
	   this scene is popped or another scene is pushed on top */
	//When the scene is deactivated, write the theme information to the cookie  
//Clean up ListSelector - IMPORTANT!
	Mojo.Event.stopListening(this.controller.get('themeListId'), Mojo.Event.propertyChange, this.themeChanged.bind(this));
	Mojo.Event.stopListening(this.controller.get('feedback'),Mojo.Event.propertyChange,this.checkboxFeedCallback);     
 	Mojo.Event.stopListening(this.controller.get('rotate'),Mojo.Event.propertyChange,this.checkboxCallback);
	Mojo.Event.stopListening(this.controller.get('update'),Mojo.Event.propertyChange,this.checkboxUpdateCallback);
	Mojo.Event.stopListening(this.controller.get('sig'),Mojo.Event.propertyChange,this.checkboxSigCallback);
    Mojo.Event.stopListening(this.controller.get('logon'), Mojo.Event.tap, this.handleButtonLogon);
    Mojo.Event.stopListening(this.controller.get('userButton'), Mojo.Event.tap, this.handleButtonUser);
    Mojo.Event.stopListening(this.controller.get('logoutButton'), Mojo.Event.tap, this.handleButtonLogout);
	Mojo.Event.stopListening(this.controller.get('inherit'),Mojo.Event.propertyChange,this.checkboxInheritCallback);	
	//lets see if the user wanted to inherit settings
if (this.inherit === "ON"){
    var expires = new Date();
    expires.setFullYear(expires.getFullYear() + 1);
    
    var cookie
    
    cookie = new Mojo.Model.Cookie("paste_format");
    cookie.put(this.userFormatShort, expires);
    cookie = new Mojo.Model.Cookie("paste_expire_date");
    cookie.put(this.userExpire, expires);
    cookie = new Mojo.Model.Cookie("paste_private");
    cookie.put(this.userPrivate, expires);
	Mojo.Log.info("User asked us to inherit so we shalll");
							}else{
//we dont need to do anything
	Mojo.Log.info("User asked us no to inherit so we wont");
							}
	//store prefs data
	AddSubcookie = new Mojo.Model.Cookie('themePrefs');	
        	dataField = this.themeModel.value;
                AddSubcookie.put({
		theme:dataField,
	});	 
	Mojo.Log.info("update in prefs2 is : " + this.update);
	Mojo.Log.info("feedback in prefs2 is : " + this.feedback);
	Mojo.Log.info("session key is : " + this.key);
	Mojo.Log.info("logon status is : " + this.loggedIn);
	Mojo.Log.info("user detaild : " + this.userDetails);
	Mojo.Log.info("uinherit settings is : " + this.inherit);	
	AddSubcookie = new Mojo.Model.Cookie('rotatePrefs');
                AddSubcookie.put(this.rotate);
	AddSubcookie = new Mojo.Model.Cookie('feedback');
                AddSubcookie.put(this.feedback);
	AddSubcookie = new Mojo.Model.Cookie('update');
                AddSubcookie.put(this.update);
	AddSubcookie = new Mojo.Model.Cookie('sig');
                AddSubcookie.put(this.sig);
	AddSubcookie = new Mojo.Model.Cookie('key');
                AddSubcookie.put(this.key);	
	AddSubcookie = new Mojo.Model.Cookie('logonStatus');
                AddSubcookie.put(this.loggedIn);
	AddSubcookie = new Mojo.Model.Cookie('userDetails');
                AddSubcookie.put(this.userDetails);		
	AddSubcookie = new Mojo.Model.Cookie('loggedInUser');
                AddSubcookie.put(this.loggedInUser);
	AddSubcookie = new Mojo.Model.Cookie('inherit');
                AddSubcookie.put(this.inherit);					
};

PreferencesAssistant.prototype.cleanup = function(event) {
	/* this function should do any cleanup needed before the scene is destroyed as 
	   a result of being popped off the scene stack */
};

PreferencesAssistant.prototype.showOKMessage = function(title,message){
		this.controller.showAlertDialog({
		onChoose: function(value) {},
		title:title,
		message:message,
		choices:[ {label:'OK', value:'OK', type:'color'} ]
	});
};