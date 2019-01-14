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
    var queryInput, resultDiv, accessTokenInput, sendButton;
  
    window.onload = init;
    var i = 0;
    var fromDialogflow = [];
    var fromUser = [];
  
    function init() {
      deleteMessagesIfTimeExpires();
      queryInput = document.getElementById("q");
      sendButton = document.getElementById("click");
      resultDiv = document.getElementById("msg-insert");
      accessTokenInput = document.getElementById("access_token");
      var setAccessTokenButton = document.getElementById("set_access_token");
  
      queryInput.addEventListener("keydown", queryInputKeyDown);
      sendButton.addEventListener("click", onSendButtonClick);
      setAccessTokenButton.addEventListener("click", setAccessToken);
      

  
      window.init(accessTokenInput.value);
      console.log(fromDialogflow.length)
      if(localStorage.getItem("responseMessages") === null) {
        fromDialogflow =[];
      } else {
        var retrievedData = localStorage.getItem("responseMessages");
        console.log(retrievedData+" RET ");
        fromDialogflow = JSON.parse(retrievedData);
      }

      if(localStorage.getItem("queryMessages") != null) {
        var qMessages = localStorage.getItem("queryMessages");
        fromUser = JSON.parse(qMessages);
      }
      else{
        fromUser = [];
      }
      
      //alert(fromDialogflow.length);
        i = fromDialogflow.length;
  
      
      console.log(String(fromDialogflow[0]))
      var k = 0;
      for(k = 0; k < fromDialogflow.length; k++){
        createQueryNode(fromUser[k]);
        var node = createResponseNode();
        var link = "http://pixelarchitect.ca"
        setResponseFromStorage(fromDialogflow[k], node)

      }
      
    }

    function deleteMessagesIfTimeExpires(){
      var retrievedData = localStorage.getItem("timeStamp");
      var pastTime = JSON.parse(retrievedData);
      //check with the current time. Delete if the time is more than 10 minutes
      var currentTime = new Date();
      currentTime = currentTime.getMinutes();
      console.log('Current time  => ' +currentTime);
      console.log('pastTime = > ' + retrievedData);
      var timeDifference = currentTime - pastTime;
      console.log('Time difference --> ' + timeDifference);
      if(timeDifference > 1) {
        deleteAll();
      }


    }



  
    function deleteAll(){
      localStorage.removeItem("responseMessages");
      localStorage.removeItem("queryMessages");
      localStorage.removeItem("timeStamp");
    }

    function checkTheCurrentTime(){
      var d = new Date();
      var timeStamp = d.getMinutes();
      console.log(timeStamp);
      localStorage.setItem("timeStamp", JSON.stringify(timeStamp));
      
    }


    function setResponseFromStorage(response, node){

      node.innerHTML = response;
      node.style.textAlign = "left";
      node.className = "msg-receive";
      
      resultDiv.appendChild(node);
      var d = $('.chat-body');
      console.log(d.height())
      d.scrollTop(d.prop("scrollHeight"));

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
    
    });
  
  
  
    function setAccessToken() {
  
  
    }

    function onSendButtonClick(event) {

      console.log(event)
  
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
              console.log(response+"");
              result = response.result.fulfillment.data.google.richResponse.items[0].simpleResponse.textToSpeech;
              if(response.result.fulfillment.data.google.richResponse.items[0].simpleResponse.link = ""){
                var linkInformation = "Click for more information";
                var link = "http://pixelarchitect.ca";
                var extraNode = createLinkButtonNode(); 
                setButtonLinkNodes(linkInformation, extraNode, link);
              } else{
                link = response.result.fulfillment.data.google.richResponse.items[0].simpleResponse.link;
                var linkInformation = "Click for more information";
                var extraNode = createLinkButtonNode(); 
                setButtonLinkNodes(linkInformation, extraNode, link);
              }
  
            }else {
  
              console.log("IN CHATBOT")
              result = response.result.fulfillment.fromDialogflow[0].payload.chatbot.Message;
              var linkInformation = "Click for more information";
              var link = response.result.fulfillment.fromDialogflow[0].payload.chatbot.link;
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
  

  function queryInputKeyDown(event) {
    if (event.which !== ENTER_KEY_CODE) {
      return;
    }
    console.log(event)

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
            console.log(response)
            result = response.result.fulfillment.data.google.richResponse.items[0].simpleResponse.textToSpeech;
            if(response.result.fulfillment.data.google.richResponse.items[0].simpleResponse.link = ""){
              var linkInformation = "Click for more information";
              var link = "http://pixelarchitect.ca";
              var extraNode = createLinkButtonNode(); 
              setButtonLinkNodes(linkInformation, extraNode, link);
            } else{
              var linkInformation = "Click for more information";
              var link = response.result.fulfillment.data.google.richResponse.items[0].simpleResponse.link;
              var extraNode = createLinkButtonNode(); 
              setButtonLinkNodes(linkInformation, extraNode, link);

            }

          }else {

            console.log("IN CHATBOT")
            result = response.result.fulfillment.fromDialogflow[0].payload.chatbot.Message;
            var linkInformation = "Click for more information";
            var link = response.result.fulfillment.fromDialogflow[0].payload.chatbot.link;
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
    iconNode.style="float:right; background-color:black; font-size:40px; padding:5px; z-index:0";
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

    console.log(query);
    fromUser[i] = query;

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
      console.log("Link addres " + linkAddress);
		extraNode.style.backgroundColor = "royalblue";
		extraNode.setAttribute("href","google.ca")

	}



  


  function setResponseOnNode(response, node, link) {
    node.innerHTML = response ? response : "[empty response]";

    response = response.replace(/\n/g, "<br />");

    node.innerHTML = response;
    node.style.textAlign = "left";
    node.className = "msg-receive";
    
    resultDiv.appendChild(node);
    var d = $('.chat-body');
    console.log(d.height())
    d.scrollTop(d.prop("scrollHeight"));

    //push the responses to the browser local storage

    fromDialogflow[i] = response;
    i++;
    checkTheCurrentTime();
 
  }


  function setResponseJSON(response) {
    var node = document.getElementById("jsonResponse");
    node.innerHTML = JSON.stringify(response, null, 2);
  }

  window.onbeforeunload = function(){
    localStorage.setItem("responseMessages", JSON.stringify(fromDialogflow));
    localStorage.setItem("queryMessages", JSON.stringify(fromUser));
 }


//    window.onload = function() {
//      var retrievedData = localStorage.getItem("responseMessages");
//      var fromDialogflow = JSON.parse(retrievedData);
//      alert(fromDialogflow.length);

//  }

})();
