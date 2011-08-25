function FirstAssistant() {
	/* this is the creator function for your scene assistant object. It will be passed all the 
	   additional parameters (after the scene name) that were passed to pushScene. The reference
	   to the scene controller (this.controller) has not be established yet, so any initialization
	   that needs the scene controller should be done in the setup function below. */
    this.letsGoMenuModel =
	{
	    visible: false, 
	    items:
	    [
		    {},
		    {
				label: $L("Ok thanks, let's go ..."),
				command: 'do-done'
		    },
		    {}
	     ]
	};
	   
}

FirstAssistant.prototype.setup = function() {
    /* this function is for setup tasks that have to happen when the scene is first created */

    /* use Mojo.View.render to render view templates and add them to the scene, if needed. */

    /* setup widgets here */

    /* add event handlers to listen to events from widgets */
	//get the version and pass it back
	this.controller.get("version").update(Mojo.Controller.appInfo.version);	
	//set up the lets go menu
	this.controller.setupWidget(Mojo.Menu.commandMenu, { menuClass: 'fade' }, this.letsGoMenuModel);		
}

FirstAssistant.prototype.activate = function(event){
	/* put in event handlers here that should only be in effect when this scene is active. For
	   example, key handlers that are observing the document */  
    //lets make them wait
    this.controller.window.setTimeout(this.showLetsGo.bind(this), 2 * 1000);
};

FirstAssistant.prototype.showLetsGo = function()
{
    //show the lets go menu
    this.controller.setMenuVisible(Mojo.Menu.commandMenu, true);	
}

FirstAssistant.prototype.handleCommand = function(event)
{
    if (event.type == Mojo.Event.command)
	{
	    switch (event.command)
		{
		case 'do-done':
		this.controller.stageController.swapScene('main');
		break;
		}
	}
};


FirstAssistant.prototype.deactivate = function(event) {
	/* remove any event handlers you added in activate and do any other cleanup that should happen before
	   this scene is popped or another scene is pushed on top */   
};

FirstAssistant.prototype.cleanup = function(event) {
	/* this function should do any cleanup needed before the scene is destroyed as 
	   a result of being popped off the scene stack */
};
