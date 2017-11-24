var prompt = require('prompt');
var properties = [
    {
      name: 'filename', 
      validator: /^[a-zA-Z].*.json/,                                                //it takes valid jsonfile
	  required: true,
      warning: '!!!!!!!!!!please enter valid json file!!!!!! '
    },
    {
      name: 'number_of_teams',
      validator: /^[1-9]/,                                                     //it takes valid number of teams
	  required: true,
	  warning: '!!!!!!please enter valid NO OF TEAMS !!!!!!! '
	  
    }
  ];

  prompt.start();
prompt.get(properties, function (err, result) {
    if (err) { return onErr(err); }
    console.log('------yoou enter---- ');
    console.log('  Filename: ' + result.filename);
    console.log('  number_of_teams: ' + result.number_of_teams);
	var input_file=result.filename;
	var no_of_teams=result.number_of_teams;
	const fs = require('fs');
	fs.exists(input_file, function(exists) {                                  //it checks for  given json file exist or not
    console.log("file exists ? " + exists);
	if(exists==true){
	var inputfile = fs.readFileSync(input_file); 
	var parsed = JSON.parse(inputfile);
var student_data = [];
for(var x in parsed.students){
student_data.push(parsed.students[x]);                    

}
var shuffle = require('shuffle-array');
shuffle(student_data);
console.log(student_data);
 var i=0;
 var count=0;
  while(student_data[i++]!=null){            //it finds the number of students in given json file 
	count++;
	}
  console.log("no of students in given file are "+count);
  var total_students=count;
   var min_studentsofeachteam=parseInt(total_students/no_of_teams);
   if(min_studentsofeachteam!=0){                    //it checks for number of teams exceeded the number of students
   var exta_members=total_students%no_of_teams;  
  var outputfile= fs.createWriteStream("output.txt");
  var z=0;
  var team_no=1;
 	  var sizeofteam=1;
      var temp=0;
	  outputfile.write("team no:"+team_no );
	   outputfile.write("\n");
	  while (z<total_students){              //it runs upto number of  students written into output file   
		  if(sizeofteam<=min_studentsofeachteam){
			   outputfile.write(JSON.stringify(student_data[z]) );
			    outputfile.write("\n");
			   z++;
			   sizeofteam++;
		  }
		  else if(exta_members!=0){               //'else if' loop used to add the extra members to each team.it adds only one member to some teams only 
			  			  outputfile.write(JSON.stringify(student_data[z]) );        
			    			   z++;
							   exta_members--;
			  temp=exta_members;
			  exta_members=0;
			  
		  }
		  
		 else {
			  team_no++;
			  outputfile.write("\n");	 
		        outputfile.write("team no:"+team_no );
	           outputfile.write("\n");	 
		
			 sizeofteam=1;
			   exta_members=temp;	  
	  }
		  
	}
   }
	else{
         console.log("\n we could not find because  number of teams exceeded the number of students ");}
	
	}
	else{
		console.log("!!!!!Sorry ...WE COULD NOT FIND ENTERED FILE!!!!!!!!!");
		}
	});
  });