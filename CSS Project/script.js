var names = ["John","Mathew","Dwayne","Brad","Jackie","Jim"]

$(document).ready(function() {
    $('#img1').draggable();
    $('#btn').click(function(){
        $('#img1').animate({
          width:"200px",
        });
    });
    $('#date').datepicker({
      showOtherMonths:true,
      selectOtherMonths:true,
      showButtonPanel:true,
    });
    $('#name').tooltip({
      track:true,
      show:{effect:'pulsate',duration:2000},
      hide:{effect:'explode',duration:2000}
    });
    $('#name').autocomplete({
      source: names,
    },{delay:500,autoFocus:true});
    $('#div1').accordion({
      collapsible:true,
      icons:{header:'ui-icon-caret-1-s',activeHeader:'ui-icon-caret-1-n'},
      animate:1500,
    });
    $('#btn1').click(function(){
      var modal = $('#dialog').dialog("option","draggable");
      alert(modal);
    });
    $('#btn2').click(function(){
      $('#dialog').dialog("option","draggable",false);
    });
    $('#dialog').dialog({
      title:"Title",
      draggable:true,
      resizable:false,
      closeOnEscape:false,
      modal:false,
      autoOpen:true,
    });
    $('.box').draggable({
      cursor:'grabbing',
      opacity:'0.4',
      // containment:'parent'
      // grid:[300,300],
      snap:true,
      snapTolerance: 100
    });
    $('.sort').sortable({
      opacity: 0.5,
      cursor: 'grabbing',
      containment:'parent',
      delay:300,
      distance:5
    });
    $('#img1').resizable({
      maxHeight:400,
      maxWidth:400,
      minHeight:150,
      maxHeight:150,
      ghost:true,
    });
    // Calculator script

    $('.calculator').draggable();
    var result = 0;
    var prevEntry = 0;
    var operation = null;
    var currentEntry = '0';
    var calculation = false;
    
    $('.button').on('click',function(evt){
      updateScreen(result);
      var buttonPressed = $(this).html();
      console.log(buttonPressed);
      if(buttonPressed === "C"){
        result = 0;
        currentEntry = '0';
      }else if(buttonPressed === "CE"){
        currentEntry = '0';
      }else if(buttonPressed === "back"){
        currentEntry = currentEntry.substring(0,currentEntry.length-1);
      }else if(buttonPressed === "+/-"){
        currentEntry *= -1
      }else if(buttonPressed === '.'){
        currentEntry += '.';
      }else if(isNumber(buttonPressed)){
        if(currentEntry==='0'){
          currentEntry = buttonPressed;
        }else{
          currentEntry = currentEntry+buttonPressed;
        }
      }else if(isOperator(buttonPressed)){
        prevEntry = parseFloat(currentEntry);
        operation = buttonPressed;
        currentEntry = '';
      }else if(buttonPressed === "%"){
        currentEntry = currentEntry/100;
      }else if(buttonPressed === "sqrt"){
        currentEntry = Math.sqrt(currentEntry);
      }else if(buttonPressed === "1/x"){
        currentEntry = 1/currentEntry;
      }else if(buttonPressed === "pi"){
        currentEntry = Math.PI;
      }else if(buttonPressed === "="){
        currentEntry = operate(prevEntry,currentEntry,operation)
        operation = null;
      }
       updateScreen(currentEntry);
    });
    updateScreen = function(displayValue){
      var displayValue = displayValue.toString();
      $('.screen').html(displayValue.substring(0,10));
    }
    isNumber = function(value){
      return !isNaN(value);
    }
    isOperator = function(value){
      return value === '/' || value === '*' || value === '+' || value === '-';
    }
    operate = function(a,b,operation){
      a = parseFloat(a);
      b = parseFloat(b);
      console.log(a,b,operation);
      if(operation === '+')return a+b;
      if(operation === '-')return a-b;
      if(operation === '*')return a*b;
      if(operation === '/')return a/b;
    }

    //To-Do List script

    jQuery('input').keypress(function(event){
      if(event.keyCode === 13){
        jQuery('#button').click();
        return false;
      }
    })
    jQuery('#button').click(function(){
      var toAdd = jQuery('input[name=listItem]').val();
      jQuery('ul').append('<li>'+toAdd+'</li>');
    })
    jQuery(document).on('dblclick','li',function(){
      jQuery(this).toggleClass('strike').fadeOut('slow');
      // jQuery(this).toggleClass('strike').remove();
    })
    jQuery('input').focus(function(){
      jQuery(this).val(' ');
    })
    jQuery('ul').sortable();
});