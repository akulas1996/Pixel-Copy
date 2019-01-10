/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
 
(function() {
  "use strict";
  $('.wrapper').hide();
  
    var ENTER_KEY_CODE = 13;
    var queryInput, resultDiv, accessTokenInput;
  
    window.onload = init;
  
    function init() {
      queryInput = document.getElementById("q");
      resultDiv = document.getElementById("msg-insert");
      accessTokenInput = document.getElementById("access_token");
      var setAccessTokenButton = document.getElementById("set_access_token");
  
      queryInput.addEventListener("keydown", queryInputKeyDown);
      setAccessTokenButton.addEventListener("click", setAccessToken);
  
      window.init(accessTokenInput.value);
      
    }
  
  
  
  
    var arrow = $('#close');
    var textarea = $('.chat-text textarea');

    var chatIcon = $('#chat-icon');





    chatIcon.on('click', function(){
      $('.wrapper').show();
      chatIcon.toggleClass('fa-times-circle fa-minus-circle')
      $('#text-before-icon').hide();
    });

  
    arrow.on('click', function(){
      $('.wrapper').hide();
      $('#text-before-icon').show();
      chatIcon.toggleClass('fa-times-circle fa-minus-circle')
      //chatIcon.toggleClass('fa-times-circle fa-minus-circle')


      // var src = arrow.attr('src');
  
      // $('.chat-body').slideToggle('fast');
      // if(src == 'https://maxcdn.icons8.com/windows10/PNG/16/Arrows/angle_down-16.png'){
      //   arrow.attr('src', 'https://maxcdn.icons8.com/windows10/PNG/16/Arrows/angle_up-16.png');
      // }
      // else{
      //   arrow.attr('src', 'https://maxcdn.icons8.com/windows10/PNG/16/Arrows/angle_down-16.png');
      // }
    });
  
  
  
    function setAccessToken() {
  
  
    }

  function queryInputKeyDown(event) {
    if (event.which !== ENTER_KEY_CODE) {
      return;
    }

    var value = queryInput.value;
    queryInput.value = "";

    createQueryNode(value);
    var responseNode = createResponseNode();
    

    sendText(value)
      .then(function(response) {
        var result;
        var link = ""
        try {
          if(response.result.fulfillment.speech === ""){

          if("data" in response.result.fulfillment) {
            console.log("IN LAMBDA")
            result = response.result.fulfillment.data.google.richResponse.items[0].simpleResponse.textToSpeech;
            if(response.result.fulfillment.data.google.richResponse.items[0].simpleResponse.link = ""){
              var linkInformation = "Click for more information";
              var link = "http://pixelarchitect.ca";
              var extraNode = createLinkButtonNode(); 
              setButtonLinkNodes(linkInformation, extraNode, link);
            }

          }else {

            console.log("IN CHATBOT")
            result = response.result.fulfillment.messages[0].payload.chatbot.Message;
            var linkInformation = "Click for more information";
            var link = response.result.fulfillment.messages[0].payload.chatbot.link;
            console.log("THIS IS LINK " + link)
            var extraNode = createLinkButtonNode(); 
            setButtonLinkNodes(linkInformation, extraNode, link);
          }
          }
          else {
          result = response.result.fulfillment.speech
          }
        } catch(error) {
          result = "Please try again. You can say help, to find out what I can do.";
        }
        setResponseJSON(response);
        
        setResponseOnNode(result, responseNode, link);
      })
      .catch(function(err) {
        setResponseJSON(err);
        var link="http://pixelarchitect.ca"
        setResponseOnNode("Something goes wrong", responseNode, link);
      });
  }

  function createQueryNode(query) {

    var node = document.createElement("div");
    node.className = "msg-send";
    node.innerHTML = query;
    var iconNode = document.createElement("i");
    iconNode.className = "fas fa-user";
    //iconNode.style="float:right; background-color:black; font-size:40px; padding:5px; z-index:0";
    iconNode.style.cssFloat = "right";
    iconNode.style.display = "inline-block";
    //iconNode.style.height = "50px";
    //iconNode.style.width = "50px";
    iconNode.style.backgroundColor = "#e9ecef";
    iconNode.style.color = "black";
    iconNode.style.zIndex="10000";
    iconNode.style.position="relative";
    iconNode.style.textAlign="right";
    iconNode.style.padding="10px"
    resultDiv.appendChild(iconNode);

    resultDiv.appendChild(node);
  }


	function createLinkButtonNode(){
	var node = document.createElement("a");
    node.className = "msg-receive";
    node.innerHTML = "...";
    resultDiv.appendChild(node);
    return node;

	}


  function createResponseNode() {

    var node = document.createElement("div");
    node.className = "msg-receive";
    node.innerHTML = "...";
    resultDiv.appendChild(node);


    
    return node;
  }

	function setButtonLinkNodes(response, extraNode, linkAddress){
		extraNode.innerHTML = response ? response : "[empty response]";
	    extraNode.setAttribute("data-actual-response", response);
		extraNode.style.backgroundColor = "#E5FFCC";
		extraNode.setAttribute("href",linkAddress)

	}

  function setResponseOnNode(response, node, link) {
    node.innerHTML = response ? response : "[empty response]";

    response = response.replace(/\n/g, "<br />");
    //console.log("THis is response from setResponseNode "  + response)
    //response = "<a href="+link+">" +response +"</a>";
    node.innerHTML = response;
    node.style.textAlign = "left";

    node.className = "msg-receive";
    var iconNode = document.createElement("i");
    iconNode.className = "fas fa-user";
    //iconNode.style="float:right; background-color:black; font-size:40px; padding:5px; z-index:0";
    iconNode.style.cssFloat = "left";
    iconNode.style.display = "inline-block";
    //iconNode.style.height = "50px";
    //iconNode.style.width = "50px";
    iconNode.style.backgroundColor = "#e9ecef";
    iconNode.style.color = "black";
    iconNode.style.zIndex="10000";
    iconNode.style.position="relative";
    iconNode.style.textAlign="left";
    iconNode.style.padding="10px"
    resultDiv.appendChild(iconNode);
    resultDiv.appendChild(node);


    var d = $('.chat-body');
    d.scrollTop(d.prop("scrollHeight"));
    


    //node.setAttribute("data-actual-response", response);

  }


  function setResponseJSON(response) {
    var node = document.getElementById("jsonResponse");
    node.innerHTML = JSON.stringify(response, null, 2);
  }

  function sendRequest() {

  }

})();
