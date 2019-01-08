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

  var ENTER_KEY_CODE = 13;
  var queryInput, resultDiv, accessTokenInput;

  window.onload = init;

  function init() {
    queryInput = document.getElementById("q");
    resultDiv = document.getElementById("result");
    accessTokenInput = document.getElementById("access_token");
    var setAccessTokenButton = document.getElementById("set_access_token");

    queryInput.addEventListener("keydown", queryInputKeyDown);
    setAccessTokenButton.addEventListener("click", setAccessToken);
  }

  function setAccessToken() {
    document.getElementById("placeholder").style.display = "none";
    document.getElementById("main-wrapper").style.display = "block";
    window.init(accessTokenInput.value);
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
        setResponseOnNode("Something goes wrong", responseNode, link);
      });
  }

  function createQueryNode(query) {
    var node = document.createElement("div");
    node.className = "clearfix left-align left card-panel green accent-1";
    node.innerHTML = query;
    resultDiv.appendChild(node);
  }


	function createLinkButtonNode(){
	var node = document.createElement("a");
    node.className = "clearfix right-align right card-panel blue-text text-darken-2 hoverable";
    node.innerHTML = "...";
    resultDiv.appendChild(node);
    return node;

	}


  function createResponseNode() {
    var node = document.createElement("div");
    node.className = "clearfix right-align right card-panel blue-text text-darken-2 hoverable";
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
    response = "<a href="+link+">" +response +"</a>";
    node.innerHTML = response;
    node.style.textAlign = "left";
    //node.setAttribute("data-actual-response", response);

  }

  function setResponseJSON(response) {
    var node = document.getElementById("jsonResponse");
    node.innerHTML = JSON.stringify(response, null, 2);
  }

  function sendRequest() {

  }

})();
