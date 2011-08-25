function MainAssistant() {
	/* this is the creator function for your scene assistant object. It will be passed all the 
	   additional parameters (after the scene name) that were passed to pushScene. The reference
	   to the scene controller (this.controller) has not be established yet, so any initialization
	   that needs the scene controller should be done in the setup function below. */
	this.url = "http://pastebin.com/api/api_post.php";
	this.devAPI = "yourapikeyhere";
	this.signUpUrl = "http://pastebin.com/signup";
	this.userKey = "";
	this.paste_option = 'paste';
	this.composition = {};
    this.composition.paste_format = "text";
    this.composition.paste_expire_date = "N";
    this.composition.paste_private = "0";	
    this.composition.paste_name = "";
    this.composition.paste_code = "";
    this.paste_settings = 'ON';
	this.paste_advance = false;
	
	this.defaultpaste_format = "";
    this.defaultpaste_expire_date = "N";
    this.defaultpaste_private = "0";
	//we need this to flush the name and code
    this.defaultpaste_name = "";	
    this.defaultpaste_code = "";
	
	var cookie;
    var cookieValue;
    //get the key


	
    cookie = new Mojo.Model.Cookie("paste_format");
    cookieValue = cookie.get();
    if(cookieValue){
        this.composition.paste_format = cookieValue;
    }
    
	cookie = new Mojo.Model.Cookie("paste_expire_date");
    cookieValue = cookie.get();
    if(cookieValue){
        this.composition.paste_expire_date = cookieValue;
    }
	
	cookie = new Mojo.Model.Cookie("paste_private");
    cookieValue = cookie.get();
    if(cookieValue){
        this.composition.paste_private = cookieValue;
    }
	
    cookie = new Mojo.Model.Cookie("paste_name");
    cookieValue = cookie.get();
    if(cookieValue){
        this.composition.paste_name = cookieValue;
    }
	
    cookie = new Mojo.Model.Cookie("paste_settings");
    cookieValue = cookie.get();
    if(cookieValue){
        this.paste_settings = cookieValue;
    }
	
    cookie = new Mojo.Model.Cookie("paste_advance");
    cookieValue = cookie.get();
    if(cookieValue){
        this.paste_advance = cookieValue;
    }		
    
    cookie = new Mojo.Model.Cookie("paste_code");
    cookieValue = cookie.get();
    if(cookieValue && cookieValue.length > 0){
        this.composition.paste_code = cookieValue;
    }
	
}

MainAssistant.prototype.setupModel = function() {

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
        this.icon = "vip";
		}
        else
                {
//user is not logged in send them to the prefs to logon
        this.icon = "new-contact";		
                }
	Mojo.Log.info("The icon to use is : " +this.icon);

	this.cmdMenuModel = {
        label: $L('View'),
        items: [
	    {label:$L('History'), icon:'history', command:'history'},
	    {label:$L('User On'), icon:this.icon, command:'user'},		
            {label:$L('Send'), icon:'send', command:'send'}
	        			
        ]
    };


    //Scrim spinner
    this.statusSpinnerAttributes = {
        spinnerSize: "large"
    },
    this.statusSpinnerModel = {
        spinning: true 
    }
    
    //Paste format selector
    this.paste_formatSelector = [
{'label': 'None', 'value':  'text'},
{'label': '4CS', 'value':  '4cs'},
{'label': '6502 ACME Cross Assembler', 'value':  '6502acme'},
{'label': '6502 Kick Assembler', 'value':  '6502kickass'},
{'label': '6502 TASM/64TASS', 'value':  '6502tasm'},
{'label': 'ABAP', 'value':  'abap'},
{'label': 'ActionScript', 'value':  'actionscript'},
{'label': 'ActionScript 3', 'value':  'actionscript3'},
{'label': 'Ada', 'value':  'ada'},
{'label': 'ALGOL 68', 'value':  'algol68'},
{'label': 'Apache Log', 'value':  'apache'},
{'label': 'AppleScript', 'value':  'applescript'},
{'label': 'APT Sources', 'value':  'apt_sources'},
{'label': 'ASM (NASM)', 'value':  'asm'},
{'label': 'ASP', 'value':  'asp'},
{'label': 'autoconf', 'value':  'autoconf'},
{'label': 'Autohotkey', 'value':  'autohotkey'},
{'label': 'AutoIt', 'value':  'autoit'},
{'label': 'Avisynth', 'value':  'avisynth'},
{'label': 'Awk', 'value':  'awk'},
{'label': 'Bash', 'value':  'bash'},
{'label': 'Basic4GL', 'value':  'basic4gl'},
{'label': 'BibTeX', 'value':  'bibtex'},
{'label': 'Blitz Basic', 'value':  'blitzbasic'},
{'label': 'BNF', 'value':  'bnf'},
{'label': 'BOO', 'value':  'boo'},
{'label': 'BrainFuck', 'value':  'bf'},
{'label': 'C', 'value':  'c'},
{'label': 'C for Macs', 'value':  'c_mac'},
{'label': 'C Intermediate Language', 'value':  'cil'},
{'label': 'C#', 'value':  'csharp'},
{'label': 'C++', 'value':  'cpp'},
{'label': 'C++ (with QT extensions)', 'value':  'cpp-qt'},
{'label': 'CAD DCL', 'value':  'caddcl'},
{'label': 'CAD Lisp', 'value':  'cadlisp'},
{'label': 'CFDG', 'value':  'cfdg'},
{'label': 'ChaiScript', 'value':  'chaiscript'},
{'label': 'Clojure', 'value':  'clojure'},
{'label': 'Clone C', 'value':  'klonec'},
{'label': 'Clone C++', 'value':  'klonecpp'},
{'label': 'CMake', 'value':  'cmake'},
{'label': 'COBOL', 'value':  'cobol'},
{'label': 'ColdFusion', 'value':  'cfm'},
{'label': 'CSS', 'value':  'css'},
{'label': 'Cuesheet', 'value':  'cuesheet'},
{'label': 'D', 'value':  'd'},
{'label': 'DCS', 'value':  'dcs'},
{'label': 'Delphi', 'value':  'delphi'},
{'label': 'Delphi Prism (Oxygene)', 'value':  'oxygene'},
{'label': 'Diff', 'value':  'diff'},
{'label': 'DIV', 'value':  'div'},
{'label': 'DOS', 'value':  'dos'},
{'label': 'DOT', 'value':  'dot'},
{'label': 'E', 'value':  'e'},
{'label': 'ECMAScript', 'value':  'ecmascript'},
{'label': 'Eiffel', 'value':  'eiffel'},
{'label': 'Email', 'value':  'email'},
{'label': 'Erlang', 'value':  'erlang'},
{'label': 'F#', 'value':  'fsharp'},
{'label': 'FO Language', 'value':  'fo'},
{'label': 'Formula One', 'value':  'f1'},
{'label': 'Fortran', 'value':  'fortran'},
{'label': 'FreeBasic', 'value':  'freebasic'},
{'label': 'GAMBAS', 'value':  'gambas'},
{'label': 'Game Maker', 'value':  'gml'},
{'label': 'GDB', 'value':  'gdb'},
{'label': 'Genero', 'value':  'genero'},
{'label': 'Genie', 'value':  'genie'},
{'label': 'GetText', 'value':  'gettext'},
{'label': 'Go', 'value':  'go'},
{'label': 'Groovy', 'value':  'groovy'},
{'label': 'GwBasic', 'value':  'gwbasic'},
{'label': 'Haskell', 'value':  'haskell'},
{'label': 'HicEst', 'value':  'hicest'},
{'label': 'HQ9 Plus', 'value':  'hq9plus'},
{'label': 'HTML', 'value':  'html4strict'},
{'label': 'Icon', 'value':  'icon'},
{'label': 'IDL', 'value':  'idl'},
{'label': 'INI file', 'value':  'ini'},
{'label': 'Inno Script', 'value':  'inno'},
{'label': 'INTERCAL', 'value':  'intercal'},
{'label': 'IO', 'value':  'io'},
{'label': 'J', 'value':  'j'},
{'label': 'Java', 'value':  'java'},
{'label': 'Java 5', 'value':  'java5'},
{'label': 'JavaScript', 'value':  'javascript'},
{'label': 'jQuery', 'value':  'jquery'},
{'label': 'KiXtart', 'value':  'kixtart'},
{'label': 'Latex', 'value':  'latex'},
{'label': 'Liberty BASIC', 'value':  'lb'},
{'label': 'Linden Scripting', 'value':  'lsl2'},
{'label': 'Lisp', 'value':  'lisp'},
{'label': 'Loco Basic', 'value':  'locobasic'},
{'label': 'Logtalk', 'value':  'logtalk'},
{'label': 'LOL Code', 'value':  'lolcode'},
{'label': 'Lotus Formulas', 'value':  'lotusformulas'},
{'label': 'Lotus Script', 'value':  'lotusscript'},
{'label': 'LScript', 'value':  'lscript'},
{'label': 'Lua', 'value':  'lua'},
{'label': 'M68000 Assembler', 'value':  'm68k'},
{'label': 'MagikSF', 'value':  'magiksf'},
{'label': 'Make', 'value':  'make'},
{'label': 'MapBasic', 'value':  'mapbasic'},
{'label': 'MatLab', 'value':  'matlab'},
{'label': 'mIRC', 'value':  'mirc'},
{'label': 'MIX Assembler', 'value':  'mmix'},
{'label': 'Modula 2', 'value':  'modula2'},
{'label': 'Modula 3', 'value':  'modula3'},
{'label': 'Motorola 68000 HiSoft Dev', 'value':  '68000devpac'},
{'label': 'MPASM', 'value':  'mpasm'},
{'label': 'MXML', 'value':  'mxml'},
{'label': 'MySQL', 'value':  'mysql'},
{'label': 'newLISP', 'value':  'newlisp'},
{'label': 'NullSoft Installer', 'value':  'nsis'},
{'label': 'Oberon 2', 'value':  'oberon2'},
{'label': 'Objeck Programming Lang', 'value':  'objeck'},
{'label': 'Objective C', 'value':  'objc'},
{'label': 'OCalm Brief', 'value':  'ocaml-brief'},
{'label': 'OCaml', 'value':  'ocaml'},
{'label': 'OpenBSD PACKET FILTER', 'value':  'pf'},
{'label': 'OpenGL Shading', 'value':  'glsl'},
{'label': 'Openoffice BASIC', 'value':  'oobas'},
{'label': 'Oracle 11', 'value':  'oracle11'},
{'label': 'Oracle 8', 'value':  'oracle8'},
{'label': 'Oz', 'value':  'oz'},
{'label': 'Pascal', 'value':  'pascal'},
{'label': 'PAWN', 'value':  'pawn'},
{'label': 'PCRE', 'value':  'pcre'},
{'label': 'Per', 'value':  'per'},
{'label': 'Perl', 'value':  'perl'},
{'label': 'Perl 6', 'value':  'perl6'},
{'label': 'PHP', 'value':  'php'},
{'label': 'PHP Brief', 'value':  'php-brief'},
{'label': 'Pic 16', 'value':  'pic16'},
{'label': 'Pike', 'value':  'pike'},
{'label': 'Pixel Bender', 'value':  'pixelbender'},
{'label': 'PL/SQL', 'value':  'plsql'},
{'label': 'PostgreSQL', 'value':  'postgresql'},
{'label': 'POV-Ray', 'value':  'povray'},
{'label': 'Power Shell', 'value':  'powershell'},
{'label': 'PowerBuilder', 'value':  'powerbuilder'},
{'label': 'Progress', 'value':  'progress'},
{'label': 'Prolog', 'value':  'prolog'},
{'label': 'Properties', 'value':  'properties'},
{'label': 'ProvideX', 'value':  'providex'},
{'label': 'PureBasic', 'value':  'purebasic'},
{'label': 'Python', 'value':  'python'},
{'label': 'q/kdb+', 'value':  'q'},
{'label': 'QBasic', 'value':  'qbasic'},
{'label': 'R', 'value':  'rsplus'},
{'label': 'Rails', 'value':  'rails'},
{'label': 'REBOL', 'value':  'rebol'},
{'label': 'REG', 'value':  'reg'},
{'label': 'Robots', 'value':  'robots'},
{'label': 'RPM Spec', 'value':  'rpmspec'},
{'label': 'Ruby', 'value':  'ruby'},
{'label': 'Ruby Gnuplot', 'value':  'gnuplot'},
{'label': 'SAS', 'value':  'sas'},
{'label': 'Scala', 'value':  'scala'},
{'label': 'Scheme', 'value':  'scheme'},
{'label': 'Scilab', 'value':  'scilab'},
{'label': 'SdlBasic', 'value':  'sdlbasic'},
{'label': 'Smalltalk', 'value':  'smalltalk'},
{'label': 'Smarty', 'value':  'smarty'},
{'label': 'SQL', 'value':  'sql'},
{'label': 'SystemVerilog', 'value':  'systemverilog'},
{'label': 'TCL', 'value':  'tcl'},
{'label': 'Tera Term', 'value':  'teraterm'},
{'label': 'thinBasic', 'value':  'thinbasic'},
{'label': 'T-SQL', 'value':  'tsql'},
{'label': 'TypoScript', 'value':  'typoscript'},
{'label': 'Unicon', 'value':  'unicon'},
{'label': 'Vala', 'value':  'vala'},
{'label': 'VB.NET', 'value':  'vbnet'},
{'label': 'VeriLog', 'value':  'verilog'},
{'label': 'VHDL', 'value':  'vhdl'},
{'label': 'VIM', 'value':  'vim'},
{'label': 'Visual Pro Log', 'value':  'visualprolog'},
{'label': 'VisualBasic', 'value':  'vb'},
{'label': 'VisualFoxPro', 'value':  'visualfoxpro'},
{'label': 'WhiteSpace', 'value':  'whitespace'},
{'label': 'WHOIS', 'value':  'whois'},
{'label': 'Win Batch', 'value':  'winbatch'},
{'label': 'XBasic', 'value':  'xbasic'},
{'label': 'XML', 'value':  'xml'},
{'label': 'Xorg Config', 'value':  'xorg_conf'},
{'label': 'XPP', 'value':  'xpp'},
{'label': 'Z80 Assembler', 'value':  'z80'},
{'label': 'ZXBasic', 'value':  'zxbasic'}
    ];
    this.paste_formatAttributes = {
        'label': "Syntax highlighting",
		hintText: $L('Language...'),
        'labelPlacement': "right",
        'modelProperty': "paste_format",
        'choices': this.paste_formatSelector
    }
    this.paste_formatModel = {
        value: this.composition.paste_format
    }
	
	//Paste expire selector N = Never, 10M = 10 Minutes, 1H = 1 Hour, 1D = 1 Day, 1M = 1 Month.
    this.paste_expire_dateSelector = [
{'label': 'Never', 'value': 'N'},
{'label': '10 Minutes', 'value': '10M'},
{'label': '1 Hour', 'value': '1H'},
{'label': '1 Day', 'value': '1D'},
{'label': '1 Month', 'value': '1M'}
    ];
    this.paste_expire_dateAttributes = {
        'label': "Post expiration",
		hintText: $L('Expires...'),
        'labelPlacement': "right",
        'modelProperty': "paste_expire_date",
        'choices': this.paste_expire_dateSelector
    }
    this.paste_expire_dateModel = {
        value: this.composition.paste_expire_date
    }

	//Paste private selector 0 = Public, 1 = Private
    this.paste_privateSelector = [
{'label': 'Public', 'value': '0'},
{'label': 'Private', 'value': '1'}
    ];
    this.paste_privateAttributes = {
	    'label': $L('Post Exposure'),
        'modelProperty': "paste_private",
        'choices': this.paste_privateSelector
    }
    this.paste_privateModel = {
        value: this.composition.paste_private
    }	
   
    //paste_name
    this.paste_nameAttributes = {
        textFieldName : 'paste_name',  
        hintText: $L('Optional name or title...'),
        modelProperty: 'paste_name',
        autoReplace: true,
        acceptBack: true
    };
    
    //Paste_Code
    this.paste_codeAttributes = {
	modelProperty: 'paste_code',
	focus: true,
	enterSubmits: false,
	hintText: $L('Required Pastebin text...'),	
	multiline: true,
	focusMode: Mojo.Widget.focusInsertMode,
	requiresEnterKey: false,
	changeOnKeyPress: false
    };
    
	//advanceSettings
	this.advanceSettingsAttributes = {
	property: 'value',
	trueValue: 'ON',
	falseValue: 'OFF'
	};

	this.advanceSettingsModel = {
	//value: 'ON',
	value: this.paste_settings,
	disabled: false
	};
	
	//AS toggle
	this.toggleatts =
	{
		property: 'togglestate',
		trueLabel: 'On',
		falseLabel: 'Off'
	};
	this.togglemodel = {
		togglestate: false
	};
	
	//AS divider
	this.divAtts = {
	modelProperty: 'open',
	unstyled: true
	};
	this.divModel = {
	open: this.paste_advance
	};
	
}

MainAssistant.prototype.cmdMenuDefault = function() {
   return [
	    {label:$L('History'), icon:'history', command:'history'},
	    {label:$L('User Off'), icon:'new-contact', command:'user'},		
            {label:$L('Send'), icon:'send', command:'send'}
	        			
        ];
},

MainAssistant.prototype.cmdMenuLoggedOn = function() {
   return [
	    {label:$L('History'), icon:'history', command:'history'},
	    {label:$L('User On'), icon:'vip', command:'user'},		
            {label:$L('Send'), icon:'send', command:'send'}
	        			
        ];
},

MainAssistant.prototype.setup = function() {
	/* this function is for setup tasks that have to happen when the scene is first created */
		
	/* use Mojo.View.render to render view templates and add them to the scene, if needed */
	
	/* setup widgets here */
	
	/* add event handlers to listen to events from widgets */
	// set this scene's default transition
    // this.controller.setDefaultTransition(Mojo.Transition.zoomFade);
	Mojo.Log.info("setup: ");
	// use puchk update checking framework (http://www.jdf-software.com/puchk)
	// check only once every minute (0.017 hours)
	// (hours, this)

//Updates				
		AddSubcookie = new Mojo.Model.Cookie('update'); //Looks for a cookie called 'update'
	    this.oldupdatebackPrefs = AddSubcookie.get(); //Read the cookie
		if(this.oldupdatePrefs) //If the cookie data exists, read it
                {
                this.update = this.oldupdatePrefs;
                }
        else
                {
            //In this case, the cookie doesn't exist
                this.update = "ON";		
                }
//updates check
	if(this.update === "ON") //If the cookie data exists, read it
                {
		var update = new puchk(12, this);
		update.check();
		Mojo.Log.info("update is : " + this.update);	
                }
        else
                {
            //do nothing
		Mojo.Log.info("update is : " + this.update);
                }				


    /* setup widgets here */
    this.setupModel();
    // Setup cmd Menu
	this.controller.setupWidget(Mojo.Menu.commandMenu, {menuClass: 'no-fade'},this.cmdMenuModel);
	//set up app menu
	this.controller.setupWidget(Mojo.Menu.appMenu, myMenuAttr, myMenuModel);
	Mojo.Log.info("setup: getting contact details:");	
	// Advanced settings checkbox
	this.controller.setupWidget('paste_settings', this.advanceSettingsAttributes,this.advanceSettingsModel);
	// Setup text fields
    this.controller.setupWidget('paste_format', this.paste_formatAttributes, this.composition);
    this.controller.setupWidget('paste_expire_date', this.paste_expire_dateAttributes, this.composition);
    this.controller.setupWidget('paste_private', this.paste_privateAttributes, this.composition);
    this.controller.setupWidget('paste_name', this.paste_nameAttributes, this.composition);
    this.controller.setupWidget('paste_code', this.paste_codeAttributes, this.composition);
    //setup scrim
	Mojo.Log.info("setup: Creating scrim...");
    this.controller.setupWidget("statusSpinner", this.statusSpinnerAttributes, this.statusSpinnerModel);
    this.statusContainer = this.controller.get("statusContainer");
    this.scrim = Mojo.View.createScrim(this.controller.document, {scrimClass:'palm-scrim'});
    this.controller.get("scrim").appendChild(this.scrim).appendChild(this.statusContainer);
    this.scrim.hide();
    //get info
    this.paste_format = this.controller.get("paste_format");
    this.paste_expire_date = this.controller.get("paste_expire_date");
    this.paste_private = this.controller.get("paste_private");
    this.paste_name = this.controller.get("paste_name");
    this.paste_code = this.controller.get("paste_code");
	//this.paste_settings = this.controller.get("paste_settings"); 	
 
    //Restore message content
    this.paste_code.innerHTML = this.composition.paste_code;
    
    //Set first focused field
    this.focusElement = this.paste_code;
	
    this.controller.setInitialFocusedElement(this.focusElement);
  
	/*
  	//This is the toggle widget... you can make it do stuff... hahahaha sorry... read the code files from Palm\SDK\share\framework\javascripts
	//The one about Widget-toggle to learn about the toggle button
	this.controller.setupWidget("toggle1", this.toggleatts, this.togglemodel);
	this.togglechange = this.togglechange.bindAsEventListener(this);
	Mojo.Event.listen(this.controller.get('toggle1'), Mojo.Event.propertyChange, this.togglechange);

	//This is what makes a list in Mojo. Again, give it a model and call it from a controller function.
	this.listmodel = {
		open: false
	};
	this.controller.setupWidget("hiddenlist", {}, this.listmodel);
	//In order to make something hidden, you have to put it in a drawer. this.drawer = this.controller.get() gets whatevers inside the function
	this.drawer = this.controller.get('hiddenlist');
	*/
	//divider
	this.controller.setupWidget('drawer1', this.divAtts,this.divModel);
	Mojo.Log.info("Paste Advance Setup: " + this.paste_advance);
	this.drawer1 = this.controller.get("drawer1");
	if (this.paste_advance == true){
	this.controller.get("butArrow1").removeClassName("palm-arrow-closed").addClassName("palm-arrow-expanded")
	}
	else{
	this.controller.get("butArrow1").removeClassName("palm-arrow-expanded").addClassName("palm-arrow-closed")
	}
	Mojo.Event.listen(this.controller.get("dividerOne"),Mojo.Event.tap,this.toggleDrawer1.bindAsEventListener(this));	
	this.checkboxCallback = this.checkboxCallback.bind(this);
	Mojo.Event.listen(this.controller.get('paste_settings'),Mojo.Event.propertyChange,this.checkboxCallback);		
};

MainAssistant.prototype.toggleDrawer1 = function(){

this.drawer1.mojo.setOpenState(!this.drawer1.mojo.getOpenState());
this.paste_advance = this.drawer1.mojo.getOpenState();
if (this.drawer1.mojo.getOpenState() == true){
this.controller.get("butArrow1").removeClassName("palm-arrow-closed").addClassName("palm-arrow-expanded")
}
else{
this.controller.get("butArrow1").removeClassName("palm-arrow-expanded").addClassName("palm-arrow-closed")
}
}
		
MainAssistant.prototype.checkboxCallback = function(event){
 	this.paste_settings = event.value; 
	//	this.showOKMessage("Checkbox value changed", "The value of the checkbox is now: " + event.value);
    }

//This is what happens when the toggle is switched
//The function inside just toggles the drawer state to "show" from "hidden"
MainAssistant.prototype.togglechange = function (event) {
	this.drawer.mojo.setOpenState(!this.drawer.mojo.getOpenState());
};

MainAssistant.prototype.activate = function(event) {
	/* put in event handlers here that should only be in effect when this scene is active. For
	   example, key handlers that are observing the document */  
    cookie = new Mojo.Model.Cookie("paste_format");
    cookieValue = cookie.get();
    if(cookieValue){
        this.composition.paste_format = cookieValue;
    }
    
	cookie = new Mojo.Model.Cookie("paste_expire_date");
    cookieValue = cookie.get();
    if(cookieValue){
        this.composition.paste_expire_date = cookieValue;
    }
	
	cookie = new Mojo.Model.Cookie("paste_private");
    cookieValue = cookie.get();
    if(cookieValue){
        this.composition.paste_private = cookieValue;
    }
	
    /* setup widgets here */
    this.setupModel();
	    // Setup cmd Menu
    this.controller.setupWidget(Mojo.Menu.commandMenu, {menuClass: 'no-fade'},this.cmdMenuModel);
	// Setup text fields
    this.controller.setupWidget('paste_format', this.paste_formatAttributes, this.composition);
    this.controller.setupWidget('paste_expire_date', this.paste_expire_dateAttributes, this.composition);
    this.controller.setupWidget('paste_private', this.paste_privateAttributes, this.composition);
	this.controller.modelChanged(this.composition, this);
	Mojo.Log.info("change cmd menu next");	
	this.controller.modelChanged(this.cmdMenuModel);	

};

MainAssistant.prototype.deactivate = function(event) {
	/* remove any event handlers you added in activate and do any other cleanup that should happen before
	   this scene is popped or another scene is pushed on top */		
this.controller.stopListening(this.controller.get('paste_settings'),Mojo.Event.propertyChange,this.checkboxCallback);
//this.controller.stopListening(this.controller.get('toggle1'), Mojo.Event.propertyChange, this.togglechange);
this.controller.stopListening(this.controller.get('dividerOne'), Mojo.Event.propertyChange, this.togglechange);		   
};

MainAssistant.prototype.clearAll = function() {
    //Reset inputs to defaults
    this.composition.paste_format = this.defaultpaste_format;
    this.composition.paste_expire_date = this.defaultpaste_expire_date;
    this.composition.paste_private = this.defaultpaste_private;
	//this is needed to clear name and code
    this.composition.paste_name = this.defaultpaste_name;	
    this.composition.paste_code = this.defaultpaste_code;
	//
    this.controller.modelChanged(this.composition, this);
    Mojo.Log.info("defaults reset");
    //Save changes
    //this.saveContactInputs();
    
}

MainAssistant.prototype.cleanup = function(event) {
	/* this function should do any cleanup needed before the scene is destroyed as 
	   a result of being popped off the scene stack */
	   		Mojo.Log.info("paste_settings is %s.", this.paste_settings);
if (this.paste_settings === 'OFF') {

		Mojo.Log.info("Not saved");
		this.dontSaveAdvancedSettings();
		
		} 
		else {

		Mojo.Log.info("Saved");	
		this.saveAdvancedSettings();
		
		}
		//Mojo.Log.info("Save Inputs");
		//this.saveContactInputs();
};

MainAssistant.prototype.saveContactInputs = function(event) {
    /* this function should do any cleanup needed before the scene is destroyed as 
       a result of being popped off the scene stack */
    

    var expires = new Date();
    expires.setFullYear(expires.getFullYear() + 1);
    
    var cookie
    
    cookie = new Mojo.Model.Cookie("paste_format");
    cookie.put(this.composition.paste_format, expires);
    cookie = new Mojo.Model.Cookie("paste_expire_date");
    cookie.put(this.composition.paste_expire_date, expires);
    cookie = new Mojo.Model.Cookie("paste_private");
    cookie.put(this.composition.paste_private, expires);
    cookie = new Mojo.Model.Cookie("paste_name");
    cookie.put(this.composition.paste_name, expires);
    cookie = new Mojo.Model.Cookie("paste_code");
    cookie.put(this.composition.paste_code, expires);
    cookie = new Mojo.Model.Cookie("paste_settings");
    cookie.put(this.composition.paste_settings, expires);	
};

MainAssistant.prototype.saveAdvancedSettings = function(event) {
    /* this function should do any cleanup needed before the scene is destroyed as 
       a result of being popped off the scene stack  if save settings is enabled */
	
		//this is needed to clear name and code
    this.composition.paste_name = this.defaultpaste_name;	
    this.composition.paste_code = this.defaultpaste_code;
	Mojo.Log.info("Save advanced settings only");
	//save settings
    var expires = new Date();
    expires.setFullYear(expires.getFullYear() + 1);
    
    var cookie
    
    cookie = new Mojo.Model.Cookie("paste_format");
    cookie.put(this.composition.paste_format, expires);
    cookie = new Mojo.Model.Cookie("paste_expire_date");
    cookie.put(this.composition.paste_expire_date, expires);
    cookie = new Mojo.Model.Cookie("paste_private");
    cookie.put(this.composition.paste_private, expires);
	cookie = new Mojo.Model.Cookie("paste_settings");
    cookie.put(this.paste_settings, expires);
    cookie = new Mojo.Model.Cookie("paste_advance");
    cookie.put(this.paste_advance, expires);		
	//flush the name and code
	cookie = new Mojo.Model.Cookie("paste_name");
    cookie.put(this.composition.paste_name, expires);
    cookie = new Mojo.Model.Cookie("paste_code");
    cookie.put(this.composition.paste_code, expires);
	Mojo.Log.info("settings cookie full");
	Mojo.Log.info("PAste Advance: " + this.paste_advance);
};

MainAssistant.prototype.dontSaveAdvancedSettings = function(event) {
    /* this function should do any cleanup needed before the scene is destroyed as 
       a result of being popped off the scene stack if save settings is not enabled */
	//empty values
	    //reset defaults
	Mojo.Log.info("lets reset defaults");
			this.clearAll();
	Mojo.Log.info("Not saving is really emptying values");
	//put new values in a cookie
	    var expires = new Date();
    expires.setFullYear(expires.getFullYear() + 1);
    
    var cookie 

    cookie = new Mojo.Model.Cookie("paste_format");
    cookie.put(this.composition.paste_format, expires);
    cookie = new Mojo.Model.Cookie("paste_expire_date");
    cookie.put(this.composition.paste_expire_date, expires);
    cookie = new Mojo.Model.Cookie("paste_private");
    cookie.put(this.composition.paste_private, expires);
    cookie = new Mojo.Model.Cookie("paste_settings");
    cookie.put(this.paste_settings, expires);
    cookie = new Mojo.Model.Cookie("paste_advance");
    cookie.put(this.paste_advance, expires);	
	//flush the name and code
	cookie = new Mojo.Model.Cookie("paste_name");
    cookie.put(this.composition.paste_name, expires);
    cookie = new Mojo.Model.Cookie("paste_code");
    cookie.put(this.composition.paste_code, expires);
	Mojo.Log.info("Paste Advance: " + this.paste_advance);
	Mojo.Log.info("Cookies full");	
};

MainAssistant.prototype.handleCommand = function(event) {
    
	/*if(event.type == Mojo.Event.back) {
	event.stop();
        event.stopPropagation();
    }*/
	
    if(event.type == Mojo.Event.command) {
	
	switch(event.command) {
            
	    case "send":
                
			this.checkPasteCode();
		break;
		
	    case "user":
                
			this.logonCheck();
		break;		
		
		case "history":
                
            this.historyCheck();
		break
	    
        }
    }
    
};

MainAssistant.prototype.logonCheck = function() {
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
        Mojo.Controller.stageController.pushScene("user");
		}
        else
                {
//user is not logged in send them to the prefs to logon
            Mojo.Controller.stageController.pushScene("preferences");		
                }
		
};

MainAssistant.prototype.historyCheck = function() {
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
						this.controller.showAlertDialog({
	    onChoose: function(value) {this.goLogon(value);},
	    title: $L("Not Logged In!"),
	    message: $L("You need to be logged in to see your Pastebin. Login now?"),
	    choices:[
	         {label:$L('Yes'), value:"yes", type:'affirmative'},  		 
	         {label:$L("No"), value:"no", type:'negative'},
	         {label:$L("I need an account"), value:"acct", type:'dismiss'}			 
	    ]
	    });		
                }
		
};

MainAssistant.prototype.goLogon = function(value) {
		// what did they say
	switch(value) {
            
	    case "yes":
                
        Mojo.Controller.stageController.pushScene("preferences");
		break;
		
	    case "acct":
	//account req
		Mojo.Log.info("signup req: " );
		Mojo.Log.info("Open browser with: " +this.signUpUrl);
		// Set up and show the banner message for success
		var message = "Loading signup page.";
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
		break;		
		
		case "no":
                
					Mojo.Log.info("doing nothing");	
		break
	    
        }	
};
	
MainAssistant.prototype.checkPasteCode = function() {
		// A character was entered.  Enable or disable the "Sign In" button based on valid data
if (this.composition.paste_code.length != 0) {

if(this.composition.paste_code === this.lastPaste){
		this.dupeCheck();
		}else{
		this.sendContactMessage();
		}
		} 
		else {
		this.signInHandler();		
		} 
		
};

MainAssistant.prototype.dupeCheck = function() {
// the user sent the same data before confirm they are happy to send again
		this.controller.showAlertDialog({
	    onChoose: function(value) {if(value === "yes"){
		Mojo.Log.info("dupe accepted");
		this.sendContactMessage();
		}
		Mojo.Log.info("dupe rejected");
		},
	    title: $L("Duplicate Paste!"),
	    message: $L("You have just sent this to Pastebin.com. Create a duplicate Paste?"),
	    choices:[
	         {label:$L('Yes'), value:"yes", type:'affirmative'},  		 
	         {label:$L("No"), value:"no", type:'negative'}		 
	    ]
	    });
		
};
	
MainAssistant.prototype.signInHandler = function() {

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
	

	
MainAssistant.prototype.showErrorDialog = function() {	
		this.controller.get('error_message').show();
		this.controller.get('error_message').setStyle({visibility:'visible'});
	};
	
MainAssistant.prototype.sendContactMessage = function() {
    
    
    //Make sure any user inputs are saved in case of something going wrong
    this.saveContactInputs();
        
    //Build the url to submit info to
    var url = this.url;
    
    Mojo.Log.info("Sending PB request: " + url);
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
				api_option: this.paste_option,
				api_user_key: this.userKey,
				api_dev_key: this.devAPI,
				api_paste_code: this.composition.paste_code,
				api_paste_format: this.composition.paste_format,
				api_paste_expire_date: this.composition.paste_expire_date,
				api_paste_private: this.composition.paste_private,
				api_paste_name: this.composition.paste_name				
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
            Mojo.Log.info("response : " + response); 
	        Mojo.Log.info("response : " + response.toLowerCase().substr(17, 3)); 		
            switch(status){
                case 200:
                    
                    //Message sent, processed by server and response received.
                    
                    if(response.toLowerCase().substr(0, 3) != "bad"){
                        
                        //Sent and accepted by the server                      
                        //Indicate success to user and close the scene.
						// hide the form error message if it was there
						this.controller.get('error_message').hide();
						this.lastPaste = this.composition.paste_code;
						// Give the users some choices		
						this.controller.showAlertDialog({
	    onChoose: function(value) {this.pasteOptions(value,response);},
	    title: $L("Pastebin Updated"),
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
		//end new
						
                    }else{
                        //Server not happy with inputs.
						// hide the form error message if it was there
						this.controller.get('error_message').hide();                        
                        //Show user the server response.
						if(response.toLowerCase().substr(17, 3) === "max"){
                        this.showOKMessage("Unable to Paste!", response.substr(17, response.length - 17) +". Why not go Pro?");
						}else{
						this.showOKMessage("Unable to Paste!", response.substr(17, response.length - 17));
						}
                    }
                    break;
                
                default:
					// hide the form error message if it was there
					this.controller.get('error_message').hide(); 				
                    this.showOKMessage("Unable To Post", "Pastebin.com could not be reached (status code " + results.status + "). Please check you have a working internet connection and try again.");
            }

        }.bind(this),
        onFailure: function(){
            //Something gone horribly wrong (no active net connection most likely).
            
            //Ensure UI activity is hidden
            this.scrim.hide();
			// hide the form error message if it was there
			this.controller.get('error_message').hide();            
            //Display message to user.
            this.showOKMessage("Unable To Post", "Pastebin.com could not be reached at this time. Please check you have a working internet connection and try again.");
        }.bind(this)
    })
}

MainAssistant.prototype.pasteOptions = function(value,response){
this.pasteUrl = response;
if(this.composition.paste_name ===""){
var tappedRowTitle = "Untitled";
}else{
var tappedRowTitle = this.composition.paste_name;
}
var tappedRowKey = response.substr(20, response.length - 20);
Mojo.Log.info("title: "+tappedRowTitle+" key: "+tappedRowKey);
		if (value === 'copy') {

		Mojo.Log.info("Copy to clipboard: " +response);
		this.controller.stageController.setClipboard(response, false);
		// Set up and show the banner message for success
		var message = "URL copied to clipboard.";
		var appController = Mojo.Controller.getAppController();
		var bannerParams = {soundClass: '', soundFile: '', icon: '', messageText: message};
		appController.showBanner(bannerParams, {banner: message});
		
		}
		else if (value === 'preview'){

		Mojo.Log.info("Open preview with: title: "+tappedRowTitle+ " key: "+tappedRowKey);
		Mojo.Controller.stageController.pushScene("preview",tappedRowTitle,tappedRowKey);
		}		
		else if (value === 'browser'){

		Mojo.Log.info("Open browser with: " +response);
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
		Mojo.Log.info("Email this: " +response);
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

		Mojo.Log.info("SMS this: " +response);
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

		Mojo.Log.info("Doing nothing with this: " +response);
		//Mojo.Log.info("Tweet this: " +response);
		// Set up and show the banner message for success
		//var message = "Opening twitter.";
		//var appController = Mojo.Controller.getAppController();
		//var bannerParams = {soundClass: '', soundFile: '', icon: '', messageText: message};
		//appController.showBanner(bannerParams, {banner: message});
		
		}
				else {

		Mojo.Log.info("none of the above " + value + " " +response);
		
		}
}

// This function will popup a dialog, displaying the message passed in.
MainAssistant.prototype.showOKMessage = function(title,message){
		this.controller.showAlertDialog({
		onChoose: function(value) {},
		title:title,
		message:message,
		choices:[ {label:'OK', value:'OK', type:'color'} ]
	});
}
//MainAssistant.prototype.logMessage = function(message) {
//    log("MainAssistant message: " + message);
//}

