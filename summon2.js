//
// Thanks to Fairfield University and University of Huddersfield
// for all the tips, help, and code!
//

$(document).ready(function() {

  var cssPath = '//gvsuliblabs.com/labs/summon2.0/',libDetailPageId, newHref, libCurrentURL, record, recordParts, thisID,libCurrentURL = window.location.hash.substring(1);
  // Add custom styles
  $('head').append('<link rel="stylesheet" type="text/css" href="' + cssPath + 'summon2.css" />');


    
    setTimeout(function() {
      $(".savedItemsFolderContainer").append('<div id="libchat_6290b3d40228a9e708fa7066d01f56bf"></div>');
	  var chatScript = document.createElement('script');
	  chatScript.type = 'text/javascript';
	  chatScript.src = '//v2.libanswers.com/load_chat.php?hash=6290b3d40228a9e708fa7066d01f56bf';
	  document.body.appendChild(chatScript);
	  

      console.log('About to add the chat button...');
        // Accessability titles
  $('div.searchBox div.queryBox span.caret').parent().attr('title','advanced search');

  // Fix the homepage banner links, which are invisible because
  // they are white on a white background
  if($("div.home").css("display") !== 'none') {
    $("div.home").prepend('<div id="home-banner" style="height:6em;background-color:#0065a4;">&nbsp;</div>');
  }

  // I want the logo to be a bit bigger
  $(".siteHeader .Logo img").attr("src", "//gvsu.edu/homepage/files/img/gvsu_logo.png");

	// Proquest has 2 links both labeled "Log in" that go to different places
	// because they cannot do Internet. Fix that
	$('form.flowLogin').find('input[type="submit"]').attr('title', 'Save and organize citations to make research and writing easier.').val('Log in to ProQuest Flow');
	
	

}, 1500);
      

    

  
  	//Track what type of content user actually click on (with GA)
  	$('div.inner').on('click','a[ng-class="linkClass"] , a.availabilityLink', function() {
  		var libContentType = $(this).closest('div.summary').find('div.contentType span.ng-binding').text();
  		_gaq.push(['_trackEvent', 'gvsuCustomClick', 'clickOnMainResult', 'contentType:' + tidyContentType(libContentType)]);
  	});
  	//preview pane - can't think of less stupid way to do this
  	var contentTypeOfLastHoveredOn;
  	$('div.inner').on('mouseenter','div.documentSummary', function() {
  		contentTypeOfLastHoveredOn = $(this).find('div.contentType span.ng-binding').text();
  	});
  	$('div.previewPane').on('click','a[ng-class="linkClass"] , div.previewOptions a.btn.span4:first', function() {
  		_gaq.push(['_trackEvent', 'gvsuCustomClick', 'clickOnPreview', 'contentType:' + tidyContentType(contentTypeOfLastHoveredOn)]);
  	});
  	//saved item dialog
  	$('div.savedItemsDialog').on('click','a[ng-class="linkClass"] , a.availabilityLink', function() {
  		var libContentType = $(this).closest('div.summary').find('div.contentType span.ng-binding').text();
  		_gaq.push(['_trackEvent', 'gvsuCustomClick', 'clickOnSavedItem', 'contentType:' + tidyContentType(libContentType)]);
  	});

  	$('.advancedBtn').click(function() { logClickGA('clickOnInterface','Advanced Search'); });

/*
  // If this is a book detail page, update the Request button to either
  // request the book from the shelf or from the ASRS

  if( libCurrentURL.indexOf("gvsu_catalog") > 0 ) {
    		record = libGetQueryVariable('id',libCurrentURL);
        libDetailPageId = libGetBibID(record);
        libLog(libDetailPageId);

      $.ajax({
        type: "GET", //Change to whatever method type you are using on your page
        url: cssPath + "summon2.php",
        data: { record: libDetailPageId }
     }).done(function(result) {
        newHref = result;
        $("a.secondary.btn.ng-binding").attr('href',newHref);

        //alert(newHref);
     });
  }
  */

  // Remove the text in availability links

  var sillyLinkText,newText;
  $("a.availabilityLink:contains(' Browse Similar')").each(function() {
    sillyLinkText = $(this).text();
    newText = sillyLinkText.replace(' Browse Similar','');
    $(this).text(newText);
  });


  // Extract a bib Number from a Summon docID (thanks, Dave Pattern!)
  function libGetBibID(str) {
  	var bibID = 0;
  	if( str ) {
  		bibID = str.replace(/^.*gvsu_catalog_([0-9]*)([0-9])$/, "$1" );
  		if( bibID === str ) { bibID = 0; }
  	}
  	return(bibID);
  }


  // PARSE THE QUERY STRING FOR SOMETHING

  function libGetQueryVariable(variable,query) {
  	if( query ) {
  		var chunks = query.split('?');
  		if( chunks[1] ) {
  			var vars = chunks[1].split('&');
  			for (var i = 0; i < vars.length; i++) {
  				var pair = vars[i].split('=');
  				if (decodeURIComponent(pair[0]) == variable) {
  					return decodeURIComponent(pair[1]);
  				}
  			}
        console.log('Query variable %s not found', variable);
  		}
  	}
  }

  // Clean up events sent to GA
  function tidyContentType( text ) {
  	if( text ) {
  		res = text.split(" (");
  		text = res[0];
  	}
  	return( text );
  }

  // Record a log to the console for debugging
  function libLog(message) {
  	var date = new Date();
  	var time = date.toLocaleTimeString();
  	console.log(message+' ['+time+']');
  }

  function logClickGA( eventName, eventValue ) {
  //	libLog(eventName+'='+eventValue);
  	_gaq.push(['_trackEvent', 'gvsuCustomClick', eventName, eventValue]);
  }
});
