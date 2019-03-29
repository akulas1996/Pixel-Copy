var wrapper = 
	
'	<div class="container" style="display:none">'+
'	    <div >'+
'	    </div>'+
'	    <div >'+
'	        <div >'+
'	            <input id="access_token" type="text" value="825eeb3cba0d444a891b10cafb445914">'+
'	            <label for="access_token">Access token</label>'+
'	        </div>'+
'	        <div >'+
'	            <a  id="set_access_token">Start</a>'+
'	        </div>'+
'	    </div>'+
'	</div>'+
'	    <div><i class="fas fa-comments" id="chat-icon" class ="chat-icon-resize"></i></div>'+
'	    '+
'	    <div  id = "text-before-icon" style="position:fixed; color:white;">How can we help?</div>'+
'	<div class="wrapper" >'+
'	  <div>'+
'	  <div class="chat-box">'+
'	    <div class="chat-head">'+
'	        <i class="fas fa-comment chat-head-text"> </i> <p class="chat-head-text-p">How can we help?</p>'+
'	        <i class="fas fa-times" id = "close" > </i>'+
'	    </div>'+
'	    <div class="chat-body">'+
'	      <div id="msg-insert">'+
'	        '+
'	      </div>'+
'	      <div class="chat-text">'+
'	          <textarea id="q" class="control-label" autofocus></textarea>'+
'	          <input type="button" class="click" id="click" style="color: white;" value="SEND" > '+
'	      </div>'+
'	    </div>'+
'	  </div>'+
'	  </div>'+
'	</div>'+
'	<div ></div>'+
'	<div style="display:none" >'+
'	<!--h5>Request payload:</h5>'+
'	<pre id="jsonRequest"></pre-->'+
'	<h5>Response payload:</h5>'+
'	<pre id="jsonResponse"></pre>'+
'	</div>';

//JQuery
var head = document.getElementsByTagName('head')[0];
var script  = document.createElement('script');
script.src = 'http://18.225.18.49/ThirdPartyJs/thirdpartyjs/PixelArchitect-chatbot-copy/demo/simple/jquery-3.3.1.min.js';
script.defer = true;
head.appendChild(script);


//Attach demofunctionsScript+
var head  = document.getElementsByTagName('head')[0];
var script  = document.createElement('script');
script.src = '/Users/sachin/Desktop/Pixel-Copy-master/demo/simple/demoFunctions.js';
script.defer = true;
head.appendChild(script);

//Attach API.AI
var script  = document.createElement('script');
script.src = 'http://18.225.18.49/ThirdPartyJs/thirdpartyjs/PixelArchitect-chatbot-copy/target/ApiAi.js';
script.defer = true;
head.appendChild(script);

//Attaching style sheet
var head  = document.getElementsByTagName('head')[0];
var link  = document.createElement('link');
link.id   = 'cssId';
link.rel  = 'stylesheet';
link.setAttribute('crossorigin', 'anonymous');
link.setAttribute('integrity', 'sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr');
link.type = 'text/css';
link.href = 'https://use.fontawesome.com/releases/v5.7.2/css/all.css';
script.defer = true;
head.appendChild(link);



//Attaching style sheet
var head  = document.getElementsByTagName('head')[0];
var link  = document.createElement('link');
link.id   = 'cssId';
link.rel  = 'stylesheet';
link.type = 'text/css';
link.href = '/Users/sachin/Desktop/Pixel-Copy-master/demo/simple/chatbot_style.css';
script.defer = true;
link.media = 'all';
head.appendChild(link);



console.log(wrapper);
var div = document.createElement('div');

div.innerHTML = wrapper;
// set style

// better to use CSS though - just set class
div.setAttribute('class', 'myclass'); // and make sure myclass has some styles in css
document.body.appendChild(div);


//Attach layout link
var script  = document.createElement('script');
script.src = '/Users/sachin/Desktop/Pixel-Copy-master/demo/simple/layout.js';
script.defer = true;
head.appendChild(script);
