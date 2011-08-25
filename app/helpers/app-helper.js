function roundNumber(num, dec) {
	var result = Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
	return result;
};

function roundTwo (n) { 

  ans = n * 1000 
  ans = Math.round(ans /10) + "" 
  while (ans.length < 3) {ans = "0" + ans} 
  len = ans.length 
  ans = ans.substring(0,len-2) + "." + ans.substring(len-2,len)
  return ans 
};

function showOKMessage(title,message){
	try {
		Mojo.Controller.showAlertDialog({
		onChoose: function(value) {},
		title:title,
		message:message,
		choices:[ {label:'OK', value:'OK', type:'color'} ]
	});
	} catch (e) {
		Mojo.Log.info("error "+e);
	}	
};