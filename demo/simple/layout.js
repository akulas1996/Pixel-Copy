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
    //var j is for links;
    var j = 0;
    var fromDialogflow = [];
    var fromUser = [];
    var links = [];
    var isChatWindowOpen = false;
  
    function init() {

      //detect device
      if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        console.log('This is mobile');
        var chatIcon = document.getElementById('chat-icon');
        chatIcon.style.fontSize = '80px';

        var textBeforeIcon = document.getElementById('text-before-icon');
        textBeforeIcon.style.marginRight = '5%';
        textBeforeIcon.style.marginBottom = '5%';
        textBeforeIcon.style.padding = '20px';
        textBeforeIcon.height = '10%';

       } else {
         console.log("This is computer");
         var chatIcon = document.getElementById('chat-icon');         
         chatIcon.style.color = 'green';
       }


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

        if(i < 1){
          var node = document.createElement("div");
          //node.className = "msg-receive";
          //response = "Hello! How can we help you today?";
          node.innerHTML = '<div class="msg_container base_receive"><div ><i class="fas fa-user message-response-text-icon"></i></div><div ><div class="messages msg_receive"><p>Hello! How can we help you today?</p><time datetime="2009-11-13T20:00">Pixel Architect </time></div></div></div>';
          //node.innerHTML = "Hello"
          resultDiv.appendChild(node);
        } else{
          var d = $('.chat-body');
          console.log("THE HEIGHT::::::" + d.height());
          d.scrollTop(d.prop("scrollHeight"));
          console.log('IM HERE')
        }

  
      
      console.log(String(fromDialogflow[0]));
      var k = 0;
      for(k = 0; k < fromDialogflow.length; k++){
        createQueryNode(fromUser[k]);
        var node = createResponseNode();
        setResponseFromStorage(fromDialogflow[k], node)

      }
      
    }

    function deleteMessagesIfTimeExpires(){
      var retrievedData = localStorage.getItem("timeStamp");
      var pastTime = JSON.parse(retrievedData);
      //check with the current time. Delete if the time is more than 10 minutes
      var currentTime = new Date();
      currentTime = currentTime.getTime();
      console.log('Current time  => ' +currentTime);
      console.log('TYPE  --> ' + typeof currentTime);
      console.log('pastTime = > ' + retrievedData);

      var difference = (currentTime - retrievedData)/1000;

      
      difference /= 60;
      console.log(Math.abs(Math.round(difference)) + '  <----minute/s');


      var timeDifference = Math.abs(Math.round(difference));
      console.log('Time difference -- > ' + timeDifference);
      if(timeDifference > 1) {
        console.log("Delete All ")
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
      var timeStamp = d.getTime();
      localStorage.setItem("timeStamp", JSON.stringify(timeStamp));
      
    }


    function setResponseFromStorage(response, node){

      node.innerHTML = response;
      
      resultDiv.appendChild(node);

    }

    function setLinkNodeFromResponse(link){
      var node = document.createElement("a");
      node.className = "msg-receive";
      node.innerHTML = link;
      resultDiv.appendChild(node);
      return node;
  
    }

  
    var arrow = $('#close');
    var textarea = $('.chat-text textarea');

    var chatIcon = $('#chat-icon');
    var textBeforeIcon = $('#text-before-icon')


    chatIcon.on('click', function(){
      if(isChatWindowOpen == false) {
        $('.wrapper').show();
        chatIcon.toggleClass('fa-times-circle fa-minus-circle')
        $('#text-before-icon').hide();
        var d = $('.chat-body');
        console.log(d.height())
        d.scrollTop(d.prop("scrollHeight"));
        console.log('open')
        isChatWindowOpen = true;
      }
      else{
        $('.wrapper').hide();
        chatIcon.toggleClass('fa-times-circle fa-minus-circle')
        $('#text-before-icon').hide();
        $('#text-before-icon').show();
        console.log('close');
        isChatWindowOpen = false;
      }
    });


    textBeforeIcon.on('click', function(){
      if(isChatWindowOpen == false) {
        $('.wrapper').show();
        chatIcon.toggleClass('fa-times-circle fa-minus-circle')
        $('#text-before-icon').hide();
        var d = $('.chat-body');
        console.log(d.height())
        d.scrollTop(d.prop("scrollHeight"));
        console.log('open')
        isChatWindowOpen = true;
      }
      else{
        $('.wrapper').hide();
        chatIcon.toggleClass('fa-times-circle fa-minus-circle')
        $('#text-before-icon').hide();
        $('#text-before-icon').show();
        console.log('close');
        isChatWindowOpen = false;
      }
    });


  //   $( "#chat-icon" )
  // .mouseenter(function() {
  //   var iconDiv=document.getElementById("icon-div");
  //   iconDiv.innerHTML = '<i class="fas fa-comment" id="chat-icon"></i>'
  //   console.log('mouse')
  //   //$("#chat-icon" ).addClass('fas fa-comment');
  //   //$("#chat-icon" ).removeClass('fas fa-comments');
  // })
  // .mouseleave(function() {
  //   var iconDiv=document.getElementById("icon-div");
  //   iconDiv.innerHTML = '<i class="fas fa-comments" id="chat-icon"></i>'
  //   console.log('mouse left')
  //   //$("#chat-icon" ).addClass('fas fa-comments');
  //   //$("#chat-icon" ).removeClass('fas fa-comment');
  // });



  
    arrow.on('click', function(){
      $('.wrapper').hide();
      chatIcon.toggleClass('fa-times-circle fa-minus-circle')
      $('#text-before-icon').hide();
      $('#text-before-icon').show();
      console.log('close');
      isChatWindowOpen = false;
    
    });
  
  


    //On send button click
    function onSendButtonClick(event) {

      console.log(event)
  
      var value = queryInput.value;
      queryInput.value = "";
  
      createQueryNode(value);
      var responseNode = createResponseNode();
      
      sendText(value)
      .then(function(response) {
        var result;
        var link;

        try {
          if(response.result.fulfillment.speech === ""){

          if("data" in response.result.fulfillment) {
            console.log("IN LAMBDA")
            console.log(response)
            result = response.result.fulfillment.data.google.richResponse.items[0].simpleResponse.textToSpeech;

              var linkInformation = "Click for more information";
              link = response.result.fulfillment.data.google.richResponse.items[0].simpleResponse.link;

          }else {

            console.log("IN CHATBOT")
            result = response.result.fulfillment.messages[0].payload.chatbot.Message;
            var linkInformation = "Click for more information";
            link = response.result.fulfillment.messages[0].payload.chatbot.link;
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
        var link;

        try {
          if(response.result.fulfillment.speech === ""){

          if("data" in response.result.fulfillment) {
            console.log("IN LAMBDA")
            console.log(response)
            result = response.result.fulfillment.data.google.richResponse.items[0].simpleResponse.textToSpeech;

              var linkInformation = "Click for more information";
              link = response.result.fulfillment.data.google.richResponse.items[0].simpleResponse.link;
            

          }else {

            console.log("IN CHATBOT")
            result = response.result.fulfillment.messages[0].payload.chatbot.Message;
            var linkInformation = "Click for more information";
            link = response.result.fulfillment.messages[0].payload.chatbot.link;
            console.log("THIS IS LINK " + link)
          }
          }
          else {
          result = response.result.fulfillment.speech
          }
        } catch(error) {
          result = "Please try again. You can say help, to find out what I can do.";
        }
        setResponseJSON(response);
        queryInput.value='';
        
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
    // node.className = "msg-send";
    // node.innerHTML = query;
    // console.log(query);
    fromUser[i] = query;

    // resultDiv.appendChild(node);


    node.innerHTML = '<div class="row msg_container base_sent"><div ><div class="messages msg_sent"><p>'+query+'</p><time datetime="2009-11-13T20:00">Guest </time></div></div><div ><i class="fas fa-user message-sent-text-icon"></i></div></div>'
    resultDiv.appendChild(node);
  }



function createLinkButtonNode(){
	var node = document.createElement("a");
    node.className = "msg-receive";
    node.innerHTML = "";
    resultDiv.appendChild(node);
    return node;

	}



function setAccessToken(){
    }


  function createResponseNode() {

    var node = document.createElement("div");
    //node.className = "msg-receive";
    node.innerHTML = "";
    resultDiv.appendChild(node);
    return node;
  }

	function setButtonLinkNodes(response, extraNode, linkAddress){
    	extraNode.innerHTML = response ? response : "[empty response]";
        extraNode.setAttribute("data-actual-response", response);
        console.log("Link addres " + linkAddress);
        extraNode.style.backgroundColor = "royalblue";
        console.log("Link Address -- > " + linkAddress);
        extraNode.setAttribute("href","google.ca");
        links[j] = linkAddress;
        j++;
	}



  


  function setResponseOnNode(response, node, link) {
    node.innerHTML = response ? response : "[empty response]";

    response = response.replace(/\n/g, "<br />");


    node.innerHTML = '<div class="row msg_container base_receive"><div ><i class="fas fa-user message-response-text-icon"></i></div><div ><div class="messages msg_receive"><p>'+response+'</p><time datetime="2009-11-13T20:00">Pixel Architect </time></div></div></div>';
    
    if(link != undefined) {
      
      console.log("THE LLLLLLLLINK " + link);

      var linkNode = document.createElement("div");
      //linkNode.className = "msg-receive";
      linkNode.innerHTML = '<div class="row msg_container base_receive"><div  avatar"><i class="fas fa-user message-response-text-icon" ></i></div><div ><div class="messages msg_receive"><p><a target="_blank" href='+link+'>Click Here for more info</a></p><time datetime="2009-11-13T20:00">Pixel Architect</time></div></div></div>';

      //linkNode.innerHTML = '<br> <a href='+link+'>Click Here for more info</a>';
      node.appendChild(linkNode);
    }

    resultDiv.appendChild(node);


    var d = $('.chat-body');
    console.log(d.height())
    d.scrollTop(d.prop("scrollHeight"));

    //push the responses to the browser local storage

    fromDialogflow[i] = node.innerHTML;
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
    localStorage.setItem("linkNodes", JSON.stringify(links));
 }
 


})();
