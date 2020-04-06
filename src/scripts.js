
$("#btn").click(function(){
    $('#brackets').html("");

    var opts = $("#notinput").val(),
//      opts = 16,
        pools = $("#nopinput").val(),
//      pools = 1,
        // Teams = JSON.parse(data),
        knownBrackets = [2,4,8,16,32,64], // brackets with "perfect" proportions (full fields, no byes)
        bracketCount = 0,
        closest 		= _.find(knownBrackets, function(k) {
                                    return k>=opts;
                                    });
    var Teams=[{"teamId" : "Team A", "Score" : "20"},{"teamId" : "Team B", "Score" : "02"},{"teamId" : "Team C", "Score" : "22"},{"teamId" : "Team D", "Score" : "03"},{"teamId" : "Team E", "Score" : "43"},{"teamId" : "Team F", "Score" : "34"},{"teamId" : "Team G", "Score" : "04"},{"teamId" : "Team H", "Score" : "05"},{"teamId" : "Team I", "Score" : "06"},{"teamId" : "Team J", "Score" : "07"},{"teamId" : "Team K", "Score" : "08"},{"teamId" : "Team L", "Score" : "09"},{"teamId" : "Team M", "Score" : "10"},{"teamId" : "Team N", "Score" : "11"},{"teamId" : "Team O", "Score" : "12"},{"teamId" : "Team P", "Score" : "10"},{"teamId" : "Team Q", "Score" : "13"},{"teamId" : "Team R", "Score" : "15"},{"teamId" : "Team S", "Score" : "16"},{"teamId" : "Team T", "Score" : "17"},{"teamId" : "Team U", "Score" : "18"},{"teamId" : "Team V", "Score" : "19"},{"teamId" : "Team W", "Score" : "21"},{"teamId" : "Team X", "Score" : "23"},{"teamId" : "Team Y", "Score" : "24"},{"teamId" : "Team Z", "Score" : "25"},{"teamId" : "Team AA", "Score" : "26"},{"teamId" : "Team AB", "Score" : "27"},{"teamId" : "Team AC", "Score" : "28"},{"teamId" : "Team AD", "Score" : "29"},{"teamId" : "Team AE", "Score" : "30"},{"teamId" : "Team AF", "Score" : "31"},{"teamId" : "Team AG", "Score" : "32"},{"teamId" : "Team AH", "Score" : "33"},{"teamId" : "Team AI", "Score" : "35"},{"teamId" : "Team AJ", "Score" : "36"},{"teamId" : "Team AK", "Score" : "37"},{"teamId" : "Team AL", "Score" : "38"},{"teamId" : "Team AM", "Score" : "39"},{"teamId" : "Team AN", "Score" : "40"},{"teamId" : "Team AO", "Score" : "41"},{"teamId" : "Team AP", "Score" : "42"},{"teamId" : "Team AQ", "Score" : "43"},{"teamId" : "Team AR", "Score" : "44"},{"teamId" : "Team AS", "Score" : "45"},{"teamId" : "Team AT", "Score" : "46"},{"teamId" : "Team AU", "Score" : "47"},{"teamId" : "Team AV", "Score" : "48"},{"teamId" : "Team AW", "Score" : "49"},{"teamId" : "Team AX", "Score" : "50"},{"teamId" : "Team AY", "Score" : "51"},{"teamId" : "Team AZ", "Score" : "52"},{"teamId" : "Team BA", "Score" : "53"},{"teamId" : "Team BB", "Score" : "54"},{"teamId" : "Team BC", "Score" : "55"},{"teamId" : "Team BD", "Score" : "56"},{"teamId" : "Team BE", "Score" : "57"},{"teamId" : "Team BF", "Score" : "58"},{"teamId" : "Team BG", "Score" : "59"},{"teamId" : "Team BH", "Score" : "60"},{"teamId" : "Team BI", "Score" : "61"},{"teamId" : "Team BJ", "Score" : "62"},{"teamId" : "Team BK", "Score" : "63"},{"teamId" : "Team BL", "Score" : "64"}];
        
        
        
//    var k="pool";
//    Teams="";
//    Teams = JSON.parse(pool1);
    if($("input[type='checkbox']").prop("checked")==true){
    var teams=[];
//    var team={
//        teamId:document.getElementById('teamId').value
//    }
    
    Teams=[{"teamId":"","Score":"1"},{"teamId":"","Score":"2"},{"teamId":"","Score":"1"},{"teamId":"","Score":"2"},{"teamId":"","Score":"1"},{"teamId":"","Score":"7"},{"teamId":"","Score":"1"},{"teamId":"","Score":"2"},{"teamId":"","Score":"1"},{"teamId":"","Score":"6"},{"teamId":"","Score":"1"},{"teamId":"","Score":"2"},{"teamId":"","Score":"1"},{"teamId":"","Score":"32"},{"teamId":"","Score":"1"},{"teamId":"","Score":"2"},{"teamId":"","Score":"1"},{"teamId":"","Score":"4"},{"teamId":"","Score":"1"},{"teamId":"","Score":"2"},{"teamId":"","Score":"1"},{"teamId":"","Score":"24"},{"teamId":"","Score":"1"},{"teamId":"","Score":"2"},{"teamId":"","Score":"1"},{"teamId":"","Score":"42"},{"teamId":"","Score":"1"},{"teamId":"","Score":"2"},{"teamId":"","Score":"1"},{"teamId":"","Score":"22"}];
    
    var lines = $('textarea').val().split('\n');
        for(var i = 0;i < lines.length;i++){
            var team=lines[i];
            Teams[i].teamId=team;
    }
    }
//    localStorage.setItem('Teams',JSON.stringify(teams));

    getBracket(opts);
    
    function getBracket(base) {

        var byes 			= closest-base;
        if(byes>0)
            base = closest;

        var brackets 	= [],
            round 		= 1,
            baseT 		= base/2,
            baseC 		= base/2,
            teamMark	= 0,
            nextInc		= base/2;

        for(i=1;i<=(base-1);i++) {
            var	baseR = i/baseT,
                isBye = false,          
                goAhead0=0,
                goAhead1=0;

            if(byes>0 && (i%2!=0 || byes>=(baseT-i))) {
                isBye = true;
                byes--;
            }

            var last = _.map(_.filter(brackets, function(b) { 
                    return b.nextGame == i; 
                }), 
                function(b) { 
                    return {
                        game:b.bracketNo,teams:b.teamnames,score:b.scores
                    }; 
            });

            if(isBye){
                brackets.push({ 
                    lastGames:	round==1 ? null : [last[0].game,last[1].game],
                    nextGame:	nextInc+i>base-1?null:nextInc+i,
                    teamnames:	round==1 ? [Teams[teamMark].teamId,Teams[teamMark].teamId] : [last[0].teams[goAhead],last[1].teams[goAhead]],
                    scores:	round==1 ? [Teams[teamMark].Score,Teams[teamMark].Score] : [last[0].score[goAhead0],last[1].score[goAhead1]],

                    bracketNo:	i,
                    roundNo:	round,
                    bye:		isBye
                });
            }
            
            else{
                if(last.length!=0){
                    if(last[0].score[0]<last[0].score[1])
                        goAhead0=1;
                    if(last[1].score[0]<last[1].score[1])
                        goAhead1=1;
                }
                
                brackets.push({
                    lastGames:	round==1 ? null : [last[0].game,last[1].game],
                    nextGame:	nextInc+i>base-1?null:nextInc+i,
                    teamnames:	round==1 ? [Teams[teamMark].teamId,Teams[teamMark+1].teamId] : [last[0].teams[goAhead0],last[1].teams[goAhead1]],
                    scores:	round==1 ? [Teams[teamMark].Score,Teams[teamMark+1].Score] : [last[0].score[goAhead0],last[1].score[goAhead1]],

                    bracketNo:	i,
                    roundNo:	round,
                    bye:		isBye
                });
            }

            if(isBye)
                teamMark++;
            else
                teamMark+=2;

            if(i%2!=0)	nextInc--;
            while(baseR>=1) {
                round++;
                baseC/= 2;
                baseT = baseT + baseC;
                baseR = i/baseT;
            }
        }
        renderBrackets(brackets);
     }
   
    function renderBrackets(struct){
        var groupCount	= _.uniq(_.map(struct, function(s) { return s.roundNo; })).length;

        var group	= $('<div class="group'+(groupCount+1)+'" id="b'+bracketCount+'"></div>'),
            grouped = _.groupBy(struct, function(s) { 
                return s.roundNo; 
            });

        for(g=1;g<=groupCount;g++) {
            var poolarr=[];
            poolarr[0]=parseInt((closest)/(4*pools));
            var round = $('<div class="r'+g+'"></div>');
            for(var i=0;i<grouped[g].length;i++){
                if(g==1 && opts>4 && pools>1 && (pools!=4||opts!=8)){
                    for(var j=1;j<=pools;j++){
                        var recarr=(closest*j)/(2*pools);
                        poolarr[j]=poolarr[j-1]+(closest/(pools*2));
                        if(g==1 && i==poolarr[j-1])
                            round.append('<p class="pe">Pool '+ j +'</p>');
                        
                        if(g==1 && i==recarr)
                            round.append('<rect class="pre"></rect>')    
                    }                  
                }
                var gg=  grouped[g][i];
                
                if(pools==2 && i==0 && g==1 && opts==4)
                    round.append('<p class="pa">Pool 1</p>');
                
                else if(pools==2 && i==1 && g==1 && opts==4)
                    round.append('<p class="pb">Pool 2</p>');
                                
                if(pools==4 && i==0 && g==1 && opts==8)
                    round.append('<p class="pa">Pool 1</p>');
                                
                for(var x=1;x<4;x++){
                    if(pools==4 && i==x && g==1 && opts==8)
                        round.append('<p class="pb">Pool '+ (x+1)+'</p>');
                }
                                
                if(pools>1 && i==1 && g==1 && opts==4)
                    round.append('<rect class="pre"></rect>')
            
                if(gg.bye)
                    round.append('<div></div>');
                else
                    round.append('<div><div class="bracketbox"><span class="info1">'+gg.scores[0]+'</span><span class="info2">'+gg.scores[1]+'</span><span class="teama">'+gg.teamnames[0]+'</span><span class="teamb">'+gg.teamnames[1]+'</span></div></div>');   
            }

            group.append(round);
        }
        group.append('<div class="r'+(groupCount+1)+'"><div class="final"><div class="bracketbox"><span class="teamc">'+_.last(struct).teamnames[_.random(1)]+'</span></div></div></div>');
        $('#brackets').append(group);

        bracketCount++;
        $('html,body').animate({
            scrollTop: $("#b"+(bracketCount-1)).offset().top
        });
    }    
    
  $('span.teama,span.teamb,span.teamc').click(function(){
        var searched=$(this).text();
        for(var i=0;i<opts;i++){
            if(Teams[i].teamId==searched)
                alert("Team Name: "+Teams[i].teamId+"\nTeam Score: " + Teams[i].Score);
      }
    });
    
    function geBracket(base) {
        if(base<=16){
        var  base = closest*2;
        }
        else{
            var base=closest;
        }
        
        var brackets 	= [],
            round 		= 1,
            baseT 		= base/2,
            baseC 		= base/2,
            teamMark	= 0,
            nextInc		= base/2;
        var byes=base-opts;
       
        for(i=1;i<=(base-1);i++) {
        var j=0;
            if(round==2 && i==(base/2)+1)
                var rbyes=4;
            else if(round==1&&i==1)
                var rbyes=byes-base/8;
            
            var	baseR = i/baseT,
                isBye = false;
            
            if(round==1 && rbyes>0 && (i%4!=1 || rbyes>=(baseT-i))){
                isBye = true;
                rbyes--;
            }
            else if(rbyes>0 && (i%2!=1 || rbyes>=(baseT-i))) {
                    isBye = true;
                    rbyes--;
            }
            
            var last = _.map(_.filter(brackets, function(b) {
                return b.nextGame == i;
            }), 
            function(b) { 
                return {
                    game:b.bracketNo,teams:b.teamnames,score:b.scores
                }; 
            });            
            
            if(isBye){
                    brackets.push({
                        lastGames:	round==1 ? null : [last[0].game,last[1].game],
                        nextGame:	nextInc+i>base-1?null:nextInc+i,
                        teamnames:	round==1 ? [exampleTeams[teamMark],exampleTeams[teamMark]] : [last[0].teams[0],last[1].teams[1]],
                        scores:	round==1 ? [exampleScores[teamMark],exampleScores[teamMark]] : [last[0].score[0],last[1].score[1]],

                        bracketNo:	i,
                        roundNo:	round,
                        bye:		isBye
                    });                
                }
            
                else{
                    
                       if(last.length!=0){
                           
                            if(last[0].teams[0]==last[0].teams[1])
                                {
                                last[0].teams[0] =exampleTeams[teamMark];
                                last[0].teams[1] =exampleTeams[teamMark];
                                teamMark--;
                                j=1;
                                 }
                            if(last[1].teams[0]==last[1].teams[1]){
                                last[1].teams[0] =exampleTeams[teamMark];
                                last[1].teams[1] =exampleTeams[teamMark];
                            
                            if(j==0)
                                teamMark--;
                                
                            if(teamMark==6)
                                teamMark++;
                                
                }
            }
                    j=1;
                    brackets.push({     
                        lastGames:	round==1 ? null : [last[0].game,last[1].game],
                        nextGame:	nextInc+i>base-1?null:nextInc+i,
                        teamnames:	round==1 ? [exampleTeams[teamMark],exampleTeams[teamMark+1]] : [last[0].teams[1],last[1].teams[0]],
                        scores:	round==1 ? [exampleScores[teamMark],exampleScores[teamMark+1]] : [last[0].score[1],last[1].score[0]],

                        bracketNo:	i,
                        roundNo:	round,
                        bye:		isBye
                    });
                }
                    
                if(!isBye)
                    teamMark+=2;    
            
                if(i%2!=0)	nextInc--;
                while(baseR>=1) {
                    round++;
                    baseC/= 2;
                    baseT = baseT + baseC;
                    baseR = i/baseT;
                }
            }
            renderBrackets(brackets);
    }
}); 