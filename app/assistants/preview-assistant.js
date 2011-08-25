function PreviewAssistant(tappedRowTitle, tappedRowKey) {
	/* this is the creator function for your scene assistant object. It will be passed all the 
	   additional parameters (after the scene name) that were passed to pushScene. The reference
	   to the scene controller (this.controller) has not be established yet, so any initialization
	   that needs the scene controller should be done in the setup function below. */
this.urlPreview = "http://pastebin.com/embed_iframe.php?i=";	 
this.title = tappedRowTitle;
this.key = tappedRowKey;
}

PreviewAssistant.prototype.setupModel = function() {
	   // Configure the model for the command menu
this.reloadModel = {
       label: $L('View'),
        items: [
    {label:$L('Refresh'), icon: "sync", command: "sync" }
	]
};

    /*this.cmdMenuModel = {
        label: $L('View'),
        items: [
	    {label:$L('Delete'), icon:'delete', command:'delete'},
            {label:$L('Send'), icon:'sync', command:'send'}
	        			
        ]
    };*/
	
this.stopModel = {
       label: $L('View'),
        items: [

    {label:$L('Stop'), icon: 'indeterminate-stop', command: "stop" }
	]
};	   
	   
    this.cmdMenuModel = {
        label: $L('View'),
        items: [
	{label:$L('History'), icon:'history', command:'history'},
            {}
	        			
        ]
    };
   
 Mojo.Log.info("title is: " +this.title+ " key: " +this.key);  
};

PreviewAssistant.prototype.setup = function() {
	/* this function is for setup tasks that have to happen when the scene is first created */
		
	/* use Mojo.View.render to render view templates and add them to the scene, if needed */
	
	/* setup widgets here */
	
	/* add event handlers to listen to events from widgets */
    this.setupModel();
 Mojo.Log.info("preview title is: " +this.title+ " key: " +this.key); 	
//update title
	this.controller.get("title").update(this.title);
//webview
    this.controller.setupWidget('WebView', {'url': this.urlPreview+this.key}, {});
this.progress = this.progress.bind(this);
this.started = this.started.bind(this);
this.stopped = this.stopped.bind(this);
this.finished = this.finished.bind(this);


Mojo.Event.listen(this.controller.get('WebView'), Mojo.Event.webViewLoadProgress, this.progress);
Mojo.Event.listen(this.controller.get('WebView'), Mojo.Event.webViewLoadStarted, this.started);
Mojo.Event.listen(this.controller.get('WebView'), Mojo.Event.webViewLoadStopped, this.stopped);
Mojo.Event.listen(this.controller.get('WebView'), Mojo.Event.webViewLoadFailed, this.stopped);
Mojo.Event.listen(this.controller.get('WebView'), Mojo.Event.webViewDidFinishDocumentLoad, this.stopped);
Mojo.Event.listen(this.controller.get('WebView'), Mojo.Event.webViewDownloadFinished, this.finished);
//comand menu
    this.controller.setupWidget(Mojo.Menu.commandMenu, {menuClass: 'no-fade'},this.cmdMenuModel);	
};

PreviewAssistant.prototype.started = function(event) {
this.cmdMenuModel.items.pop(this.reloadModel);
this.cmdMenuModel.items.push(this.stopModel);

this.controller.modelChanged(this.cmdMenuModel);

this.currLoadProgressImage = 0;
}

PreviewAssistant.prototype.stopped = function(event) {
this.cmdMenuModel.items.pop(this.stopModel);
this.cmdMenuModel.items.push(this.reloadModel);
this.controller.modelChanged(this.cmdMenuModel);
}

PreviewAssistant.prototype.finished = function(event) {

}

PreviewAssistant.prototype.handleCommand = function(event) {
	
    if(event.type == Mojo.Event.command) {
	
	switch(event.command) {
            
	    case "history":
                
		this.controller.stageController.pushScene('history');
		break;
		
		case "stop":
                
        this.controller.get('WebView').mojo.stopLoad();
		break;
		
		case "sync":
                
        this.controller.get('WebView').mojo.reloadPage();
		
		break
	    
        }
    }
    
};

PreviewAssistant.prototype.progress = function(event) {
var percent = event.progress;

try {
if (percent > 100) {
percent = 100;
}
else if (percent < 0) {
percent = 0;
}

// Update the percentage complete
this.currLoadProgressPercentage = percent;

// Convert the percentage complete to an image number
// Image must be from 0 to 23 (24 images available)
var image = Math.round(percent / 4.1);
if (image > 23) {
image = 23;
}

// Ignore this update if the percentage is lower than where we're showing
if (image < this.currLoadProgressImage) {
return;
}

// Has the progress changed?
if (this.currLoadProgressImage != image) {
var icon = this.controller.select('div.indeterminate-stop')[0];
if (icon) {
this.loadProgressAnimator = Mojo.Animation.animateValue(Mojo.Animation.queueForElement(icon), "linear", this._updateLoadProgress.bind(this), {
from: this.currLoadProgressImage,
to: image,
duration: 0.5
});
}
}
}
catch (e) {
Mojo.Log.logException(e, e.description);
}
};

PreviewAssistant.prototype._updateLoadProgress = function(image) {
// Find the progress image
image = Math.round(image);
// Don't do anything if the progress is already displayed
if (this.currLoadProgressImage == image) {
return;
}
var icon = this.controller.select('div.indeterminate-stop');
if (icon && icon[0]) {
icon[0].setStyle({'background-position': "0px -" + (image * 48) + "px"});
}
this.currLoadProgressImage = image;
};

PreviewAssistant.prototype.activate = function(event) {
	/* put in event handlers here that should only be in effect when this scene is active. For
	   example, key handlers that are observing the document */
};

PreviewAssistant.prototype.deactivate = function(event) {
	/* remove any event handlers you added in activate and do any other cleanup that should happen before
	   this scene is popped or another scene is pushed on top */
};

PreviewAssistant.prototype.cleanup = function(event) {
	/* this function should do any cleanup needed before the scene is destroyed as 
	   a result of being popped off the scene stack */
Mojo.Event.stopListening(this.controller.get('WebView'), Mojo.Event.webViewLoadProgress, this.progress);
Mojo.Event.stopListening(this.controller.get('WebView'), Mojo.Event.webViewLoadStarted, this.started);
Mojo.Event.stopListening(this.controller.get('WebView'), Mojo.Event.webViewLoadStopped, this.stopped);
Mojo.Event.stopListening(this.controller.get('WebView'), Mojo.Event.webViewLoadFailed, this.stopped);
Mojo.Event.stopListening(this.controller.get('WebView'), Mojo.Event.webViewDidFinishDocumentLoad, this.stopped);
Mojo.Event.stopListening(this.controller.get('WebView'), Mojo.Event.webViewDownloadFinished, this.finished);	   
};
