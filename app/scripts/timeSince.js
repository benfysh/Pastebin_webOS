//timeSince.js by David Strack
//written for webOS application Digloo and modified for Zipsquare
//a collection of functions useful to me
function timeUntil(time, unix){
	//takes a JS or UNIX timestamp and figures out how long ago it was compared to current time
	var diff = new Date();
	var now = new Date();
	var then = new Date(time);
	if (unix){
		then.setTime(time * 1000); //unix timestamp support	
	}		
	diff.setTime(Math.abs(now.getTime() - then.getTime()));
	var timediff = diff.getTime();
	
	years = Math.floor(timediff / (1000 * 60 * 60 * 24 * 365));
	months = Math.floor(timediff / (1000 * 60 * 60 * 24 * 31));
	days = Math.floor(timediff / (1000 * 60 * 60 * 24)); 
	hours = Math.floor(timediff / (1000 * 60 * 60)); 
	mins = Math.floor(timediff / (1000 * 60)); 
	secs = Math.floor(timediff / 1000);

	if (years != 0){
		if (years == 1){
			return 'in a year';
		}
		else{
			return 'in ' + years + ' years';
		}
	}
	else if(months != 0){
		if (months == 1){
			return 'in a month';
		}
		else{
			return 'in ' + months + ' months';
		}
	}
	else if(days != 0){
		if (days == 1){
			return 'in a day';
		}
		else{
			return 'in ' + days + ' days';
		}		
	}
	else if(hours != 0){
		if (hours == 1){
			return 'in 1 hour';
		}
		else{
			return 'in ' + hours + ' hrs';
		}
	}
	else if(mins != 0){
		return 'in ' + mins + ' min';
	}
	else if(secs != 0){
		return 'in ' + secs + ' sec';
	}
}

function timeSince(time, unix){
	//takes a JS or UNIX timestamp and figures out how long ago it was compared to current time
	var diff = new Date();
	var now = new Date();
	var then = new Date(time);
	if (unix){
		then.setTime(time * 1000); //unix timestamp support	
	}		
	diff.setTime(Math.abs(now.getTime() - then.getTime()));
	var timediff = diff.getTime();
	
	years = Math.floor(timediff / (1000 * 60 * 60 * 24 * 365));
	months = Math.floor(timediff / (1000 * 60 * 60 * 24 * 31));
	days = Math.floor(timediff / (1000 * 60 * 60 * 24)); 
	hours = Math.floor(timediff / (1000 * 60 * 60)); 
	mins = Math.floor(timediff / (1000 * 60)); 
	secs = Math.floor(timediff / 1000);

	if (years != 0){
		if (years == 1){
			return '1 year ago';
		}
		else{
			return years + ' years ago';
		}
	}
	else if(months != 0){
		if (months == 1){
			return '1 month ago';
		}
		else{
			return months + ' months ago';
		}
	}
	else if(days != 0){
		if (days == 1){
			return '1 day ago';
		}
		else{
			return days + ' days ago';
		}		
	}
	else if(hours != 0){
		if (hours == 1){
			return '1 hour ago';
		}
		else{
			return hours + ' hrs ago';
		}
	}
	else if(mins != 0){
		return mins + ' min ago';
	}
	else if(secs != 0){
		return secs + ' sec ago';
	}
}
function isToday(time){
	var diff = new Date();
	var now = new Date();
	var then = new Date(time);

	diff.setTime(Math.abs(now.getTime() - then.getTime()));
	var timediff = diff.getTime();
	
	var hours = Math.floor(timediff / (1000 * 60 * 60)); 
	if (hours < 24){
		return true;
	}else{
		return false;
	}
}
function secondsSince(time){
	var diff = new Date();
	var now = new Date();
	var then = new Date(time);
	diff.setTime(Math.abs(now.getTime() - then.getTime()));
	var timediff = diff.getTime();
	return Math.floor(timediff / 1000) + 0;	
}
function sortDate(a, b){
	return parseInt(a.secs) - parseInt(b.secs);
}
