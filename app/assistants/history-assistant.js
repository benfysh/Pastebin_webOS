function HistoryAssistant() {
	/* this is the creator function for your scene assistant object. It will be passed all the 
	   additional parameters (after the scene name) that were passed to pushScene. The reference
	   to the scene controller (this.controller) has not be established yet, so any initialization
	   that needs the scene controller should be done in the setup function below. */
	this.linksUrl = "http://pastebin.com/api/api_post.php";
	this.devAPI = "yourapikeyhere";	
	this.history = [];
    //this.history.links_email = "";
	this.historyList = MyApp.historyList;
	
	/*var cookie;
    var cookieValue;
    
    cookie = new Mojo.Model.Cookie("links_email");
    cookieValue = cookie.get();
    if(cookieValue){
        this.history.links_email = cookieValue;
    }*/

	/*cookie = new Mojo.Model.Cookie("history_list");
    cookieValue = cookie.get();
    if(cookieValue){
        this.historyList = cookieValue;
    }*/
	//we need this to make enter key detection work
	that = this;
};

HistoryAssistant.prototype.setupModel = function() {
    
	this.myListModel = {
	items: MyApp.historyList || []

 }; 
  
 /*	this.myListModel = {
	items: [{"link":""}]

 }; */
   
this.myListAttr = {  
    itemTemplate: "history/rowTemplate", 
	swipeToDelete: true,	
    listTemplate: "history/listTemplate",  
    renderLimit: 1000 //will people have any more?
    //dividerTemplate: "list/dividerTemplate",  
    //dividerFunction : this.whatPosition  
};
	
    this.cmdMenuModel = {
        label: $L('View'),
        items: [
	    {label:$L('Delete'), icon:'delete', command:'delete'},
            {label:$L('Send'), icon:'sync', command:'send'}
	        			
        ]
    };
    
    //Scrim spinner
    this.statusSpinnerAttributes = {
        spinnerSize: "large"
    },
    this.statusSpinnerModel = {
        spinning: true 
    }

   
};

HistoryAssistant.prototype.setup = function() {
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
		Mojo.Log.info("logged on check at activate status is : " + this.loggedIn);
		if(this.loggedIn === true) 
				{
		this.loggedInHandler();
                }
        else
                {
		this.loggedOffHandler();;		
                }
    this.setupModel();
        // Setup App Menu
    this.controller.setupWidget(Mojo.Menu.commandMenu, {menuClass: 'no-fade'},this.cmdMenuModel);
	this.controller.setupWidget(Mojo.Menu.appMenu, myMenuAttr, myMenuModelHistory);
	//list
	this.controller.setupWidget("MyList",this.myListAttr,this.myListModel); 
	//setup widgets
	Mojo.Log.info("setup: Creating scrim...");
    this.controller.setupWidget("statusSpinner", this.statusSpinnerAttributes, this.statusSpinnerModel);
    this.statusContainer = this.controller.get("statusContainer");
    this.scrim = Mojo.View.createScrim(this.controller.document, {scrimClass:'palm-scrim'});
    this.controller.get("scrim").appendChild(this.scrim).appendChild(this.statusContainer);
	// hide scrim
	this.scrim.hide();
	//get the db info   
   //	this.getHistory();
	//Mojo.Log.info("before: j%", MyApp.historyList);
//	cupcake.retrieveCupcake('history', this.gotCupcake.bind(this));
	//Mojo.Log.info("after: j%", MyApp.historyList);
};

HistoryAssistant.prototype.handleCommand = function(event) {
    
    if(event.type == Mojo.Event.command) {
	
	switch(event.command) {
            
	    case "send":
                
	this.getHistory();
		break;
		
		case "delete":

	this.deleteCheck();
		break;
	    
        }
    }
    
};

	
HistoryAssistant.prototype.signInHandler = function() {

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

HistoryAssistant.prototype.deleteCheck = function() {						
if(this.loggedIn === true){
if (this.myListModel.items.length === 0) {
	Mojo.Log.info("nothing to delete");
		
		} 
		else {
                        this.controller.showAlertDialog({
                            onChoose: function(value) {if(value === 'ok'){
                                this.deleteAllHistory();
                                }},
                            title:"Delete History",
                            message: "Are you sure? Caution this will delete all of your Pastes on Pastebin.com and can not be undone!",
							choices:[
                                {label: 'Yes', value:'ok', type:'negative'},
                                {label: 'No', value:'nope', type:'affirmative'},								
                            ]
                        });

		

	Mojo.Log.info("delete cancelled");	
}
}else{
	Mojo.Log.info("We wont prompt as user logged in is: "+this.loggedIn);
	}
};

HistoryAssistant.prototype.deleteAllHistory = function() {		
							this.deleteSingle = false;
							try {
								var tmpLinks = this.myListModel.items;
								if (tmpLinks === undefined || tmpLinks.paste === undefined) {
									// no pastes
								} else {
									tmpLinks = tmpLinks.paste;
								}

								}catch(e){
									Mojo.Log.error("@@@@@ EXCEPTION");
									Mojo.Log.error(e.message);	
									}
								try {	
								if (tmpLinks[0] === undefined) { // this isn't an array since we only have 1
								Mojo.Log.info("not an array" +tmpLinks.length);
								var tmpLinksLen = 1;
								Mojo.Log.info("tmplinks lenth 1 " +tmpLinksLen);
								}else{					
								var tmpLinksLen = tmpLinks.length;
								Mojo.Log.info("tmplinks lenth 2 " +tmpLinksLen);	
									}
								} catch(e) {
								Mojo.Log.error("@@@@@ EXCEPTION");
								Mojo.Log.error(e.message);
								}
							for (var i = 0; i < tmpLinksLen; i++) {
								try {
								this.deleteKey = tmpLinks[i].key;
								Mojo.Log.info("delete key: "+this.deleteKey);									
								this.deletePaste(this.deleteKey, this.deleteSingle);

									}catch(e){
									Mojo.Log.error("@@@@@ EXCEPTION");
									Mojo.Log.error(e.message);
								}
							}
							//clear the list
							this.myListModel.items = [];
							Mojo.Log.info("list updated: " + Object.toJSON(this.myListModel.items)); // this will output an array of the items, as opposed to "[Object] [Object]"
							MyApp.historyList = this.myListModel.items;
							// update db
							cupcake.updateCupcake('history', MyApp.historyList);
							Mojo.Log.info("cupcake is now: %j", MyApp.historyList);	
							this.controller.modelChanged(this.myListModel);
							//show the no pastes message
							this.signInHandler();
							//save link
							Mojo.Log.info("modelChanged post mass delete");		
};

HistoryAssistant.prototype.deleteHistory = function() {						

	Mojo.Log.info("Lets delete the history" +Object.toJSON(this.myListModel.items));
	this.myListModel.items = [];
	Mojo.Log.info("list del: " + Object.toJSON(this.myListModel.items)); // this will output an array of the items, as opposed to "[Object] [Object]"
	this.controller.modelChanged(this.myListModel);
	//cookies
	var expires = new Date();
	expires.setFullYear(expires.getFullYear() + 1);
    
	/*var cookie
    cookie = new Mojo.Model.Cookie("history_list");
	cookie.put(this.myListModel.items, expires);*/
	// update cupcake
	MyApp.historyList = this.myListModel.items;
	// update db
	cupcake.updateCupcake('history', MyApp.historyList);
	Mojo.Log.info("history is now: %j", MyApp.historyList);
	//cookieupdated
	// show the instructions again
	/*this.controller.get('instructions').show();
	this.controller.get('instructions').setStyle({visibility:'visible'});*/
	Mojo.Log.info("model Changed post del");

};

	
HistoryAssistant.prototype.showErrorDialog = function() {	
		this.controller.get('error_message').show();
		this.controller.get('error_message').setStyle({visibility:'visible'});
};	

HistoryAssistant.prototype.getHistory = function() {
    
    
    //Make sure any user inputs are saved in case of something going wrong
    //this.saveContactInputs();
	//logon check
 		Mojo.Log.info("logged on status is before get history : " + this.loggedIn);
		switch(this.loggedIn){
		case false:
		return;
		case true:
		Mojo.Log.info("carry on : " + this.loggedIn);	
                }       
    //Build the url to submit info to
    var url = this.linksUrl;
    this.option = "list";
    Mojo.Log.info("Sending user request: "+this.option+" to url: "+ url);
    AddSubcookie = new Mojo.Model.Cookie('key'); //Looks for a cookie called 'key'
	this.userKey = AddSubcookie.get(); //Read the cookie	
	Mojo.Log.info("the session key is : " + this.userKey);   
    //Indicate activity to the user
	this.scrim.show();
    
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
            this.scrim.hide();
            
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
                        
                        //Sent and accepted by the server
                        
                        //Indicate success to user and close the scene.
						Mojo.Log.info("Response from API get history: " + response);						

								//indicate the sucess to the user
								//hide error message
						this.controller.get('error_message').hide();								
							this.updateList(response);
                    }else{
                        //Server not happy with inputs.
						// hide the form error message if it was there
						this.controller.get('error_message').hide();                        
                        //Show user the server response.
                        this.showOKMessage("My Pastebin Error!", response);
                    }
                    break;
                
                default:
					// hide the form error message if it was there
					this.controller.get('error_message').hide(); 				
                    this.showOKMessage("My Pastebin Error!", "Pastebin.com could not be reached (status code " + results.status + "). Please check you have a working internet connection and try again.")
            }

        }.bind(this),
        onFailure: function(){
            //Something gone horribly wrong (no active net connection most likely).
            
            //Ensure UI activity is hidden
            this.scrim.hide();
			// hide the form error message if it was there
			this.controller.get('error_message').hide();            
            //Display message to user.
            this.showOKMessage("My Pastebin Error!", "Pastebin.com could not be reached at this time. Please check you have a working internet connection and try again.")
        }.bind(this)
    })
}

//This should update our list!
HistoryAssistant.prototype.updateList = function(response) {
						//response:response
						Mojo.Log.info("items: " + this.myListModel.items);
						Mojo.Log.info("updateList: " + response);

						if (this.myListModel.items === undefined) {
							this.myListModel.items = [];
						}
						this.deleteHistory();
						if (response.toLowerCase().substr(0, 2) === "no") {
							MyApp.historyList = this.myListModel.items;
							cupcake.updateCupcake('history', MyApp.historyList);							
							this.signInHandler();
						} // there was an error, which could just be the "no pastes in our database for this email address"
						else
						{
						//empty what was there ...

							try {
								var tmpLinks = xml2json.parser(response);
								if (tmpLinks === undefined || tmpLinks.paste === undefined) {
									// no pastes
								} else {
									tmpLinks = tmpLinks.paste;
								}
								if (tmpLinks[0] === undefined) { // this isn't an array since we only have 1
									tmpLinks[0] = tmpLinks; // make it an array
							Mojo.Log.info("not an array" +tmpLinks.length);
								var tmpLinksLen = 1;
								Mojo.Log.info("tmplinks lenth 1 " +tmpLinksLen);
								}else{					
								var tmpLinksLen = tmpLinks.length;
								Mojo.Log.info("tmplinks lenth 2 " +tmpLinksLen);	
									}
							} catch(e) {
								Mojo.Log.error("@@@@@ EXCEPTION");
								Mojo.Log.error(e.message);
							}
							for (var i = 0; i < tmpLinksLen; i++) {
								try {
								if(tmpLinks[i].paste_private === 0){
								this.status = "<img src=\"images\\public.png\">";
								this.longStatus = "public";
								}else{
								this.status = "<img src=\"images\\private.png\">";
								this.longStatus = "private";
								}
									//this.longSize = tmpLinks[i].paste_size/1000;
									var tempsize = (tmpLinks[i].paste_size/1000);
									this.longSize = roundTwo(tempsize,2);									
								Mojo.Log.info("list title: " +typeof tmpLinks[i].paste_title);
									if (typeof tmpLinks[i].paste_title === 'object'){
									tmpLinks[i].paste_title ="Untitled";
								Mojo.Log.info("list title after: " +Object.toJSON(tmpLinks[i].paste_title));						
									}
									Mojo.Log.info("expire date: " +tmpLinks[i].paste_expire_date);
									if (tmpLinks[i].paste_expire_date === 0){
									this.longExp = "Never";
									}else{
									var todaysDate = Mojo.Format.formatDate(new Date(),{date:"short"});
									Mojo.Log.info("today is: " +todaysDate);
									var exDate = Mojo.Format.formatDate(new Date(tmpLinks[i].paste_expire_date*1000),{date:"short"});
									if(exDate === todaysDate){
									//this.longExp = "Today";
									this.longExp = timeUntil(tmpLinks[i].paste_expire_date, true);									
									}else{
									//this.longExp = exDate;
									this.longExp = timeUntil(tmpLinks[i].paste_expire_date, true);									
									}
									}
									this.since = timeSince(tmpLinks[i].paste_date, true);
									Mojo.Log.info("time since: "+this.since);
									this.expsince = timeUntil(tmpLinks[i].paste_expire_date, true);
									Mojo.Log.info("time until: "+this.expsince);									
									var temp = new Date(tmpLinks[i].paste_date * 1000).toString();
									Mojo.Log.info("temp: " +temp);
									var myDate = Mojo.Format.formatDate(new Date(tmpLinks[i].paste_date*1000),{date:"short"});
									//Mojo.Log.info("My Date: " +tmpLinks[i].paste_date);
									Mojo.Log.info("My Date: " +myDate);	
									//tmpLinks[i].paste_date = myDate;
									tmpLinks[i].paste_date = timeSince(tmpLinks[i].paste_date, true);	
									this.myListModel.items[i] = {
										link: tmpLinks[i].paste_url,
										longform: tmpLinks[i].paste_format_long,
										shortform: tmpLinks[i].paste_format_short,
										pastedate: tmpLinks[i].paste_date,
										pasteexpire: tmpLinks[i].paste_expire_date,
										pastesize: tmpLinks[i].paste_size,										
										locked: tmpLinks[i].paste_private,
										key: tmpLinks[i].paste_key,
										longsize: this.longSize,
										expirelong: this.longExp,
										statuslong: this.longStatus,
										statusimg: this.status,
										title: tmpLinks[i].paste_title
									};
								} catch(e) {
									Mojo.Log.error("@@@@@ EXCEPTION");
									Mojo.Log.error(e.message);
								}
							}
							Mojo.Log.info("list updated: " + Object.toJSON(this.myListModel.items)); // this will output an array of the items, as opposed to "[Object] [Object]"
							MyApp.historyList = this.myListModel.items;
							// update db
							cupcake.updateCupcake('history', MyApp.historyList);
							Mojo.Log.info("cupcake is now: %j", MyApp.historyList);	
							this.controller.modelChanged(this.myListModel);
							//save link
							/*var expires = new Date();
							expires.setFullYear(expires.getFullYear() + 1);
	    
							var cookie
	    
							cookie = new Mojo.Model.Cookie("history_list");
							cookie.put(this.myListModel.items, expires);
							//cookieupdated */
							Mojo.Log.info("modelChanged");	
						}
};

// This function will popup a dialog, displaying the message passed in.
HistoryAssistant.prototype.showOKMessage = function(title,message){
		this.controller.showAlertDialog({
		onChoose: function(value) {},
		title:title,
		message:message,
		choices:[ {label:'OK', value:'OK', type:'color'} ]
	});
}

HistoryAssistant.prototype.historyMessage = function(tappedRowValue,tappedRowTitle,tappedRowKey){
		this.controller.showAlertDialog({
	    onChoose: function(value) {this.historyPasteOptions(value,tappedRowValue,tappedRowTitle,tappedRowKey);},
	    title: $L("My Pastebin"),
	    message: $L("What do you want to do with this Paste?"),
	    choices:[
	         {label:$L('Copy URL to Clipboard'), value:"copy", type:'affirmative'},
	         {label:$L("Open in app Preview"), value:"preview"},			 
	         {label:$L("Open in Browser"), value:"browser"},
	         {label:$L("Share via Email"), value:"email"},
	         {label:$L("Share via Messaging"), value:"sms"},			 
	         {label:$L("Do Nothing"), value:"nowt", type:'dismiss'}    
	    ]
	    });
}

HistoryAssistant.prototype.historyPasteOptions = function(value,tappedRowValue,tappedRowTitle,tappedRowKey){
this.pasteUrl = tappedRowValue
if (value === 'copy') {

		Mojo.Log.info("Copy to clipboard: " +tappedRowValue);
		this.controller.stageController.setClipboard(tappedRowValue, false);
		// Set up and show the banner message for success
		var message = "URL copied to clipboard.";
		var appController = Mojo.Controller.getAppController();
		var bannerParams = {soundClass: '', soundFile: '', icon: '', messageText: message};
		appController.showBanner(bannerParams, {banner: message});
		
		}
		else if (value === 'preview'){

		Mojo.Log.info("Open preview with: " +tappedRowValue+ "title: "+tappedRowTitle+ " key: "+tappedRowKey);
		Mojo.Controller.stageController.pushScene("preview",tappedRowTitle,tappedRowKey);
		}		
		else if (value === 'browser'){

		Mojo.Log.info("Open browser with: " +tappedRowValue);
		// Set up and show the banner message for success
		var message = "Opening browser.";
		var appController = Mojo.Controller.getAppController();
		var bannerParams = {soundClass: '', soundFile: '', icon: '', messageText: message};
		appController.showBanner(bannerParams, {banner: message});
		//open browser and pass URL
		this.controller.serviceRequest("palm://com.palm.applicationManager", {
        method: "launch",
        parameters: {
            id: "com.palm.app.browser",
            params: {
                target: this.pasteUrl
            }
        }
    })
		
		}
		else if (value === 'email'){
//Sig lets deal with promotion				
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
		Mojo.Log.info("Sig in prefs is : " + this.sig);
		if(this.sig === "ON") //If the cookie data exists, read it
        {		
this.emailMessage = "<a href='#{src}'>#{title}</a><br /><br /><br /><i>Sent using <a href='http://developer.palm.com/appredirect/?packageid=com.milclobe.pastebin'>Pastebin for webOS</a></i>".interpolate({src: this.pasteUrl, title: this.pasteUrl});
		}
        else
                {
this.emailMessage = "<a href='#{src}'>#{title}</a>".interpolate({src: this.pasteUrl, title: this.pasteUrl});
				}
		Mojo.Log.info("Email this: " +tappedRowValue);
		// Set up and show the banner message for success
		var message = "Opening email.";
		var appController = Mojo.Controller.getAppController();
		var bannerParams = {soundClass: '', soundFile: '', icon: '', messageText: message};
		appController.showBanner(bannerParams, {banner: message});	
		// Open email and pass url
		this.controller.serviceRequest(
    "palm://com.palm.applicationManager", {
        method: 'open',
        parameters: {
            id: "com.palm.app.email",
            params: {
                summary: "Pastebin link: "+tappedRowTitle,
                text: this.emailMessage,
                recipients: [{
                    type:"email",
                    role:1,
                    value:"",
                    contactDisplay:""
                }]
            }
        }
    }
);
		}
		else if (value === 'sms'){

		Mojo.Log.info("SMS this: " +tappedRowValue);
		// Set up and show the banner message for success
		var message = "Opening the messaging app.";
		var appController = Mojo.Controller.getAppController();
		var bannerParams = {soundClass: '', soundFile: '', icon: '', messageText: message};
		appController.showBanner(bannerParams, {banner: message});	
		// Open messaging and pass url
		this.controller.serviceRequest(
    "palm://com.palm.applicationManager", {
        method: 'launch',
        parameters: {
            id: "com.palm.app.messaging",
            params: {
             composeRecipients: [{
                 address: "",
                 serviceName: ""
             },
             {
                 address: ""
             }],
         messageText: this.pasteUrl
		 }
        }
    }
);
		}		
		else if (value === 'nowt'){
		Mojo.Log.info("Do nothing with: " +tappedRowValue);
		//Mojo.Log.info("Tweet this: " +tappedRowValue);
		// Set up and show the banner message for success
		//var message = "Opening twitter.";
		//var appController = Mojo.Controller.getAppController();
		//var bannerParams = {soundClass: '', soundFile: '', icon: '', messageText: message};
		//appController.showBanner(bannerParams, {banner: message});
		
		}
				else {

		Mojo.Log.info("none of the above " + value + " " +tappedRowValue);
		
		}
}

HistoryAssistant.prototype.handleListTap = function(event) {
    this.tappedRowValue = event.item.link;
	this.tappedRowTitle = event.item.title;
	this.tappedRowKey = event.item.key;
	//report the tapped value to the log *to be removed once working*
	Mojo.Log.info("ListTap: " + this.tappedRowValue);
	//Mojo.Log.info("ListTap: " + Object.toJSON(this.tappedRowValue));
	//Mojo.Controller.errorDialog(this.tappedRowValue);
	//we then need to determine if its a valid value i.e. not 'your history goes here' etc look at items that only start with http://
	//then pass via a function? to the same code we use in main assitant
	if (this.tappedRowValue.toLowerCase().substr(0, 4) === "http") {
	this.historyMessage(this.tappedRowValue,this.tappedRowTitle,this.tappedRowKey);} else {
	Mojo.Log.info("Not a link: " + this.tappedRowValue);}
};

HistoryAssistant.prototype.handleDelete = function(event) {
	Mojo.Log.info("delete event "+event.item.key);
	this.deleteKey = event.item.key;
	this.deleteSingle = true;
	this.myListModel.items.splice(this.myListModel.items.indexOf(event.item), 1);
	this.deletePaste(this.deleteKey, this.deleteSingle);
}

HistoryAssistant.prototype.deletePaste = function(deleteKey, deleteSingle){
   //Build the url to submit info to
    var url = this.linksUrl;
	this.key = deleteKey;
	this.single = deleteSingle;
	Mojo.Log.info("delete single: " +this.single);
    this.option = "delete";
    Mojo.Log.info("Sending user request delete singe: "+this.single+" to url: "+ url);
    AddSubcookie = new Mojo.Model.Cookie('key'); //Looks for a cookie called 'key'
	this.userKey = AddSubcookie.get(); //Read the cookie	
	Mojo.Log.info("the session key is : " + this.userKey);   
    //Indicate activity to the user
	this.scrim.show();
    
    //Post the url
    var request =  new Ajax.Request(url, {
        method: 'Post',
		evalJSON: 'false',
			parameters: {
				api_dev_key: this.devAPI,
				api_user_key: this.userKey,
				api_paste_key: this.key,
				api_option: this.option				
			},
        onComplete: function(results){
            
            //Hide activity indicator
            this.scrim.hide();
            
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
                        
                        //Sent and accepted by the server
                        
                        //Indicate success to user and close the scene.
						Mojo.Log.info("Response from API delete: " + response);						

								//indicate the sucess to the user
								//hide error message
						if(this.single === true){		
						Mojo.Log.info("update the list post single delete: " + Object.toJSON(this.myListModel.items)); // this will output an array of the items, as opposed to "[Object] [Object]"
						this.getHistory();}
						else{
					Mojo.Log.info("We are doing a mass delete for "+this.key+" and the response was: " + response);	
							}
                    }else{
                        //Server not happy with inputs.
						// hide the form error message if it was there
						
						//this.controller.get('error_message').hide();                        
                        //Show user the server response.
                        this.showOKMessage("Unable to delete!", response.substr(17, response.length - 17)+" perhaps this Paste has already expired?");
                    }
                    break;
                
                default:
					// hide the form error message if it was there
				
                    this.showOKMessage("My Pastebin Error!", "Pastebin.com could not be reached (status code " + results.status + "). Please check you have a working internet connection and try again.")
            }

        }.bind(this),
        onFailure: function(){
            //Something gone horribly wrong (no active net connection most likely).
            
            //Ensure UI activity is hidden
            this.scrim.hide();
			// hide the form error message if it was there
           
            //Display message to user.
            this.showOKMessage("My Pastebin Error!", "Pastebin.com could not be reached at this time. Please check you have a working internet connection and try again.")
        }.bind(this)
    })
}

HistoryAssistant.prototype.activate = function(event) {
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
		Mojo.Log.info("logged on check at activate 2 status is : " + this.loggedIn);
		if(this.loggedIn === true) 
				{
		this.loggedInHandler();
                }
        else
                {
		this.loggedOffHandler();;		
                }   
	//setup handler				
	Mojo.Log.info("set up handler");	   
	this.handleListTap = this.handleListTap.bindAsEventListener(this);
	this.controller.listen('MyList', Mojo.Event.listTap, this.handleListTap);	
	this.deleteHandler = this.handleDelete.bindAsEventListener(this); 
	Mojo.Event.listen(this.controller.get('MyList'),Mojo.Event.listDelete, this.deleteHandler); 	   
	//get the db info   
   	this.getHistory();
	//Mojo.Log.info("before: j%", MyApp.historyList);
	Mojo.Log.info("go to cup cake at setup is : " + this.loggedIn);
		if(this.loggedIn === true) 
				{
	cupcake.retrieveCupcake('history', this.gotCupcake.bind(this));	
                }
        else
                {
	Mojo.Log.info("we dont need cupcake as user logged in is: " + this.loggedIn);	
                }
   
};

HistoryAssistant.prototype.loggedOffHandler = function() {
			this.controller.get('logon_true').hide();
			this.controller.get('logon_true').setStyle({visibility:'hidden'});
			this.controller.get('logon_error').show();
			this.controller.get('logon_error').setStyle({visibility:'visible'});			
};

HistoryAssistant.prototype.loggedInHandler = function() {

		// if the error message is already displayed then just make it invisible to avoid jumpiness
			this.controller.get('logon_error').hide();
			this.controller.get('logon_error').setStyle({visibility:'hidden'});
			this.controller.get('logon_true').show();
			this.controller.get('logon_true').setStyle({visibility:'visible'});

		
};

HistoryAssistant.prototype.gotCupcake = function (response)  {
	Mojo.Log.info("Response in got cupcake %j", response);
	/*if (response) {
		for (value in response) {
			MyApp[value] = response[value];
			//Mojo.Log.info("History: ", value, response[value], MyApp[value]);
		}
	}
	Mojo.Log.info("myObj %j", MyApp);*/
	Mojo.Log.info("myObj in got cupcake %j", MyApp.historyList);
	this.myListModel.items = response || [];
	//Mojo.Log.info("length: ", response.length);
	/*if (this.myListModel.items.length != 0) {
	//hide the instructions
	Mojo.Log.info("hide instructions");	
	this.controller.get('instructions').hide();
	this.controller.get('instructions').setStyle({visibility:'hidden'});
	}; */
	// update list
	this.controller.modelChanged(this.myListModel);	
	
};

HistoryAssistant.prototype.deactivate = function(event) {
	/* remove any event handlers you added in activate and do any other cleanup that should happen before
	   this scene is popped or another scene is pushed on top */
    Mojo.Event.stopListening(this.controller.get('MyList'),Mojo.Event.listTap, this.handleListTap);	
	Mojo.Event.stopListening(this.controller.get('MyList'),Mojo.Event.listDelete, this.deleteHandler);	
};

HistoryAssistant.prototype.cleanup = function(event) {
	/* this function should do any cleanup needed before the scene is destroyed as 
	   a result of being popped off the scene stack */
	//save settings   

};