//Globals
MyApp = {}; //Global Objec
MyApp.historyList = [];

myMenuAttr = {omitDefaultItems: true};

/*myMenuModel = {
 
        visible: true,
        items: [Mojo.Menu.editItem,
                Mojo.Menu.prefsItem,
                Mojo.Menu.helpItem
        ]
}*/

myMenuModel = {
 
        visible: true,
        items: [Mojo.Menu.editItem,
                {
                    label: $L("Preferences"),
                    command: 'do-prefs'
                },
                {
                    label: $L("About"),
                    command: 'do-about'
                },
				                {
                    label: $L("Fields"),
                    command: 'do-fields'
                },
				                {
                    label: $L("My Pastebin"),
                    command: 'do-history'
                },				
                Mojo.Menu.helpItem
        ]
    };
	
myMenuModelAbout = {
 
        visible: true,
        items: [Mojo.Menu.editItem,
                {
                    label: $L("Preferences"),
                    command: 'do-prefs'
                },
				                {
                    label: $L("Fields"),
                    command: 'do-fields'
                },
				{
                    label: $L("My Pastebin"),
                    command: 'do-history'
                },				
                Mojo.Menu.helpItem
        ]
    };
	
myMenuModelFields = {
 
        visible: true,
        items: [Mojo.Menu.editItem,
                {
                    label: $L("Preferences"),
                    command: 'do-prefs'
                },
                {
                    label: $L("About"),
                    command: 'do-about'
                },
				{
                    label: $L("My Pastebin"),
                    command: 'do-history'
                },				
                Mojo.Menu.helpItem
        ]
    };

myMenuModelHistory = {
 
        visible: true,
        items: [Mojo.Menu.editItem,
                {
                    label: $L("Preferences"),
                    command: 'do-prefs'
                },
                {
                    label: $L("About"),
                    command: 'do-about'
                },
				{
                    label: $L("Fields"),
                    command: 'do-fields'
                },				
                Mojo.Menu.helpItem
        ]
    };
	
function StageAssistant() {
	/* this is the creator function for your stage assistant object */
}	

StageAssistant.prototype.setup = function() {

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
	/* this function is for setup tasks that have to happen when the stage is first created */
	if(this.feedback === "ON") //If the cookie data exists, read it
                {
	MyApp.Metrix = new Metrix(); //Instantiate Metrix Library				
    MyApp.Metrix.postDeviceData(); 	//Post basic info
	Mojo.Log.info("feedback is : " + this.feedback);	
                }
        else
                {
            //do nothing
		Mojo.Log.info("feedback is : " + this.feedback);
                }

	// initiate database
	if (!cupcake.init()) {
		Mojo.Log.info("Uh oh, cupcake initialization failed!");
	}
//Read theme cookie or default info
	AddSubcookie = new Mojo.Model.Cookie('themePrefs'); //Looks for a cookie called 'themePrefs'
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
			Mojo.Log.info("Theme: " + this.theme);	
//Setup Theme
	if (this.theme === "DEFAULT_THEME"){
		$$('body')[0].addClassName('palm-default');
		$$('body')[0].removeClassName('palm-dark');
	}else{
		$$('body')[0].addClassName('palm-dark');
		$$('body')[0].removeClassName('palm-default');
	}
//rotation cookie stuff
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
	Mojo.Log.info("Rotate: " + this.rotate);	
// act on rotation info#
	if (this.rotate === "ON"){
		this.controller.setWindowOrientation("free");
	}else{
		this.controller.setWindowOrientation("up");
	}					
	// Get Cookie
	//this.controller.document.getElementsByTagName("body")[0].addClassName('palm-dark')
	this.version = Mojo.Controller.appInfo.version
	Mojo.Log.info("Version: " + this.version);
	
	var cookie;
    var cookieValue;
    
    cookie = new Mojo.Model.Cookie("app_version");
    cookieValue = cookie.get();
    if(cookieValue != this.version){
	cookie.put(this.version);
	this.controller.pushScene("first");
	} else {
	this.controller.pushScene("main");
	}

};

/*StageAssistant.prototype.handleCommand = function(inEvent) {

  switch (inEvent.type) {

    case Mojo.Event.commandEnable:
      switch (inEvent.command) {
        case Mojo.Menu.helpCmd:
          inEvent.stopPropagation();
        break;
      }
    break;

    case Mojo.Event.command:
      switch (inEvent.command) {
        case Mojo.Menu.helpCmd:
          this.controller.pushAppSupportInfoScene();
        break;
      }
    break;

  }

};*/

StageAssistant.prototype.handleCommand = function (event) {
    var currentScene = this.controller.activeScene();
 
    switch(event.type) {
        case Mojo.Event.commandEnable:
            switch (event.command) {

                case Mojo.Menu.helpCmd:
                    if(!currentScene.assistant.helpMenuDisabled)
                        event.stopPropagation();
                    break;
            }
            break;
        case Mojo.Event.command:
            switch (event.command) {   
                case Mojo.Menu.helpCmd:
					this.controller.pushAppSupportInfoScene();
                    break;
                case 'do-prefs':
					this.controller.pushScene("preferences");
                    break;			
                case 'do-about':
                    this.controller.pushScene("about");
                    break;
                case 'do-fields':
                    this.controller.pushScene("fields");
                    break;
                case 'do-history':
                    this.historyCheck();
                    break;					
            }
        break;
    }
}


StageAssistant.prototype.historyCheck = function() {
		// check to see if the user is logged on
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
        Mojo.Controller.stageController.pushScene("history");
		}
        else
                {
//user is not logged in send them to the prefs to logon
					this.controller.pushScene("preferences");	
                }
		
};


/*StageAssistant.prototype.handleCommand = function(event) {    
    var stageController = this.controller.getActiveStageController();
    var currentScene = stageController.activeScene();
    
    if (event.type == Mojo.Event.commandEnable) {
        if (News.feedListUpdateInProgress && (event.command == "do-feedUpdate")) {
            event.preventDefault();
        }
    }
    
    else {
        
        if(event.type == Mojo.Event.command) {
            switch(event.command) {
            
                case "do-about":
                    stageController.pushScene("about");
                break;
                
                case "do-help":
					this.controller.pushAppSupportInfoScene();
                break;

            }
        }
    }
};*/