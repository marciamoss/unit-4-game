// JavaScript function that wraps everything
$(document).ready(function() {
    //global vars
    var crysNum=[];
    var random;
    var collectorValue;
    var finalSum;
    var win;
    var los;
    win=0;
    los=0;

    function reset(){
        finalSum=0;
        crysNum=[];
        var final="Your Total Score is: "+finalSum;
        $("#total").text(final);
        begin();
    }
    
    function clear(){
        $("#randomNumber").empty();
        $("#imgnum1").empty();
        $("#imgnum2").empty();
        $("#imgnum3").empty();
        $("#imgnum4").empty();
        $("#total").empty();
        $("img").off("click");
    }
           
    //function for random number generator 
    function numGenerator(min,max){
        random=Math.floor(Math.random() * (max+1-min)) + min;   
    }

    //function for generating random numbers between 1-12 for crystals
    function poparray(){
        numGenerator(1,12);
        crysNum.push(random);
    };

    reset();
    var wstats="Wins: "+win+"<br>"+"Losses: "+los;
    $("#wGameStats").html(wstats);
    var lstats="Losses: "+los;
    $("#lGameStats").text(lstats);

    function begin(){
        //Generate random number 19-120
        numGenerator(19,120);
        //assign the value to the html page
        collectorValue=random;
        $("#randomNumber").text(collectorValue);
     
        //create crystal array without duplicate random numbers
        while(crysNum.length<4){
            poparray(); 
            if (crysNum.length>1){
                for( var z = 0; z < (crysNum.length-1); z++){
                    lth=crysNum.length-1;
                    if (crysNum[z]===crysNum[lth]){
                        crysNum.pop();
                    }    
                }
            }
        }
    
        //assign the numbers to crystals
        $("#imgnum1").attr("data-crystalvalue",crysNum[0]);
        $("#imgnum2").attr("data-crystalvalue",crysNum[1]);
        $("#imgnum3").attr("data-crystalvalue",crysNum[2]);
        $("#imgnum4").attr("data-crystalvalue",crysNum[3]);

        $("img").on("click", function() {
            var crystalValue = ($(this).attr("data-crystalvalue"));
            crystalValue = parseInt(crystalValue);
            finalSum=finalSum+crystalValue;
            var final="Your Total Score is: "+finalSum;
            $("#total").text(final);
            if (finalSum===collectorValue){
                win=win+1;
                var wstats="You Win!!!"+"<br>"+"Wins: "+win+"<br>"+"Losses: "+los;
                $("#wGameStats").html(wstats);
                clear();
                reset();
                
            }
            if(finalSum>collectorValue){
                los=los+1;
                var wstats="You Lose!!!"+"<br>"+"Wins: "+win+"<br>"+"Losses: "+los;
                $("#wGameStats").html(wstats);
                clear();    
                reset();
            }
        });

};

});