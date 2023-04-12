/***********************
  Load Components!

  Express      - A Node.js Framework
  Body-Parser  - A tool to help use parse the data in a post request
  Pg-Promise   - A database tool to help use connect to our PostgreSQL database
***********************/
const axios = require('axios');
var express = require('express'); //Ensure our express framework has been added
var app = express();
var bodyParser = require('body-parser'); //Ensure our body-parser tool has been added
app.use(bodyParser.json());              // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//Create Database Connection
var pgp = require('pg-promise')();

/**********************
  Database Connection information
  host: This defines the ip address of the server hosting our database.
		We'll be using `db` as this is the name of the postgres container in our
		docker-compose.yml file. Docker will translate this into the actual ip of the
		container for us (i.e. can't be access via the Internet).
  port: This defines what port we can expect to communicate to our database.  We'll use 5432 to talk with PostgreSQL
  database: This is the name of our specific database.  From our previous lab,
		we created the football_db database, which holds our football data tables
  user: This should be left as postgres, the default user account created when PostgreSQL was installed
  password: This the password for accessing the database. We set this in the
		docker-compose.yml for now, usually that'd be in a seperate file so you're not pushing your credentials to GitHub :).
**********************/
const dev_dbConfig = {
	host: 'db',
	port: 5432,
	database: 'D4DDB',
	user:  'postgres',
	password: 'pwd'
};

/** If we're running in production mode (on heroku), the we use DATABASE_URL
 * to connect to Heroku Postgres.
 */
const isProduction = process.env.NODE_ENV === 'production';
const dbConfig = isProduction ? process.env.DATABASE_URL : dev_dbConfig;

// Heroku Postgres patch for v10
// fixes: https://github.com/vitaly-t/pg-promise/issues/711
if (isProduction) {
  pgp.pg.defaults.ssl = {rejectUnauthorized: false};
}

const db = pgp(dbConfig);

// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/'));//This line is necessary for us to use relative paths and access our resources directory

// Home page - DON'T CHANGE
app.get('/', function(req, res) {
	res.render('pages/main', {
	  my_title: "CTAM",
	  items: '',
	  error: false,
	  message: ''
	});
  });

  app.get('/search', function(req, res) {
	var data = "select * from D4DDB.v_pers_comp;";

	db.task('get-everything', task => {
        return task.batch([
            task.any(data)
        ]);
    })
	
	.then(info => {
		//console.log(info);
    	res.render('pages/search',{
				my_title: 'Search CTAM',
				items: info[0],
				error: false,
				message: ''
			})
    })

	.catch(err => {
		console.log('error', err);
		res.render('pages/search', {
			my_title: "Search CTAM",
			items: '',
			error: false,
			message: ''
		})
	});
  });

  app.post('/filter', function(req, res) {
	var filt = req.body.filter_name;
	var comp_model = req.body.comp_model_name;
	var sub_comp = req.body.sub_comp_name;
	var expert = req.body.expert;
	var advanced = req.body.advanced;
	var intermediate = req.body.intermediate;
	var basic = req.body.basic;
	var anythingBefore = 0;
	var data;
	if (!filt && !comp_model && !sub_comp && !expert && !advanced && !intermediate && !basic) {
		data = "select * from D4DDB.v_pers_comp;";
	}
	else {
		data = "select * from D4DDB.v_pers_comp where ";
		if (filt) {
			data += "comp_name like '%"+filt+"%' ";
			anythingBefore = 1;
		}
		if (comp_model) {
			if (anythingBefore) {data += "and "};
			data += "comp_model_name like '%"+comp_model+"%' ";
			anythingBefore = 1;
		}
		if (sub_comp) {
			if (anythingBefore) {data += "and "};
			data += "sub_comp_name like '%"+sub_comp+"%' ";
			anythingBefore = 1;
		}

		if (expert && advanced && intermediate && basic) {
			if (anythingBefore) {data += "and "};
			data += "(prof_level = 'Expert' OR prof_level = 'Advanced' OR prof_level = 'Intermediate' OR prof_level = 'Basic')";
		}
		else if (expert && advanced && intermediate) {
			if (anythingBefore) {data += "and "};
			data += "(prof_level = 'Expert' OR prof_level = 'Advanced' OR prof_level = 'Intermediate')";
		}
		else if (expert && advanced && basic) {
			if (anythingBefore) {data += "and "};
			data += "(prof_level = 'Expert' OR prof_level = 'Advanced' OR prof_level = 'Basic')";
		}
		else if (expert && intermediate && basic) {
			if (anythingBefore) {data += "and "};
			data += "(prof_level = 'Expert' OR prof_level = 'Intermediate' OR prof_level = 'Basic')";
		}
		else if (advanced && intermediate && basic) {
			if (anythingBefore) {data += "and "};
			data += "(prof_level = 'Advanced' OR prof_level = 'Intermediate' OR prof_level = 'Basic')";
		}
		else if (expert && advanced) {
			if (anythingBefore) {data += "and "};
			data += "(prof_level = 'Expert' OR prof_level = 'Advanced')";
		}
		else if (expert && intermediate) {
			if (anythingBefore) {data += "and "};
			data += "(prof_level = 'Expert' OR prof_level = 'Intermediate')";
		}
		else if (expert && basic) {
			if (anythingBefore) {data += "and "};
			data += "(prof_level = 'Expert' OR prof_level = 'Basic')";
		}
		else if (advanced && intermediate) {
			if (anythingBefore) {data += "and "};
			data += "(prof_level = 'Advanced' OR prof_level = 'Intermediate')";
		}
		else if (advanced && basic) {
			if (anythingBefore) {data += "and "};
			data += "(prof_level = 'Advanced' OR prof_level = 'Basic')";
		}
		else if (intermediate && basic) {
			if (anythingBefore) {data += "and "};
			data += "(prof_level = 'Intermediate' OR prof_level = 'Basic')";
		}
		else if (expert) {
			if (anythingBefore) {data += "and "};
			data += "prof_level = 'Expert'";
		}
		else if (advanced) {
			if (anythingBefore) {data += "and "};
			data += "prof_level = 'Advanced'";
		}
		else if (intermediate) {
			if (anythingBefore) {data += "and "};
			data += "prof_level = 'Intermediate'";
		}
		else if (basic) {
			if (anythingBefore) {data += "and "};
			data += "prof_level = 'Basic'";
		}
		data += ";";
	}


	var backup = "select * from D4DDB.v_pers_comp;";

	db.task('get-everything', task => {
        return task.batch([
            task.any(data),
			task.any(backup),
        ]);
    })
	.then(info => {
		//console.log(info[0]);
		if (info[0] == "") {
			res.render('pages/search',{
				my_title: 'Search CTAM',
				items: info[1],
				error: false,
				message: ''
			})
		}
		else {
			res.render('pages/search',{
				my_title: 'Search CTAM',
				items: info[0],
				error: false,
				message: ''
			})
		}
    	
    })
	.catch(err => {
		console.log('error', err);
		res.render('pages/main', {
			my_title: "CTAM",
			items: '',
			error: false,
			message: ''
		})
	});
  });
  

  app.get('/personnel', function(req, res) {
	//var first = req.query.first_name;
	//var last = req.query.last_name;
	// var mid;
	var data;
	var underlings;
	var pending;
	var person;
	//console.log("MID: " + req.body.mid);
	let mid = req.query.mid;
	if (req.query.mid) {
		//mid = req.query.mid;
		data = "select * from D4DDB.v_pers_comp where pers_military_id like '%"+mid+"%';";
		underlings = "select * from D4DDB.v_pers where Comm_Officer like '%"+mid+"%';";
		pending = "select * from D4DDB.v_pers_comp where comm_officer like '%"+mid+"%' and stat = 'Pending';";
		person =  "select * from D4DDB.v_pers where pers_military_id like '%"+mid+"%';";
	}
	else {
		console.log("ERROR IN /Personnel");
		data = "";
		underlings = "";
		pending = "";
	}

	//queries for addComp
	var model = "select * from D4DDB.t_competency_model;";
	var comp = "select * from D4DDB.t_competency;";
	var sub = "select * from D4DDB.t_sub_competency;";
	var prof = "select * from D4DDB.t_prof_level;";

	db.task('get-everything', task => {
        return task.batch([
            task.any(data),
			task.any(underlings),
			task.any(pending),
			task.any(person),
			task.any(model),
			task.any(comp),
			task.any(sub),
			task.any(prof)
        ]);
    })
	
	.then(info => {
		//console.log(info);
    	res.render('pages/personnel',{
				my_title: 'Search CTAM',
				items: info[0],
				underlings: info[1],
				pending: info[2],
				person: info[3],
				mid: mid,
				model: info[4],
				comp: info[5],
				sub: info[6],
				prof: info[7],
				error: false,
				message: ''
			})
    })

	.catch(err => {
		console.log('error', err);
		res.render('pages/main', {
			my_title: "Search CTAM",
			items: '',
			error: false,
			message: ''
		})
	});
  });


  app.post('/newPers', function(req, res) {
	var first_name = req.body.add_first_name;
	var last_name = req.body.add_last_name;
	var add_mid = req.body.add_mid;
	var location = req.body.add_location;
	var unit = req.body.add_unit;
	var rank = req.body.add_rank;
	var available;
	if (req.body.add_available == "Available") available = 1; else available = 0;
	var comm_officer = req.body.add_commanding_officer; //Need to rework database to 
	var taken = "SELECT COUNT(*) FROM D4DDB.t_personnel WHERE pers_military_id = '"+add_mid+"';";
	var query = "INSERT INTO D4DDB.t_personnel (pers_first_name, pers_last_name, pers_military_id, pers_rank, pers_available, pers_location, pers_unit, pers_comm_off_id) VALUES ('"+first_name+"', '"+last_name+"', '"+add_mid+"', '"+rank+"', '"+available+"', '"+location+"', '"+unit+"', '"+comm_officer+"');";

	db.task('get-everything', task => {
        return task.batch([
			task.any(taken),
            task.any(query)
        ]);
    })
	
	.then(info => {
		res.redirect('back');
    })

	.catch(err => {
		console.log('error', err);
		res.render('pages/main', {
			my_title: "Personnel",
			items: '',
			error: false,
			message: ''
		})
	});
  });

  app.post('/newComp', function(req, res) {
	var pers_id = req.body.add_comp_pers_id;
	var model_id = req.body.newModel;
	var comp_id = req.body.newComp;
	var sub_id = req.body.newSubComp;
	var prof_id = req.body.newProf;
	//console.log("PERS ID:"+pers_id);
	var query = "insert into D4DDB.t_pers_comp_map(pers_id,comp_model_id,comp_id,sub_comp_id,prof_level_id, stat) VALUES ('"+pers_id+"', '"+model_id+"', '"+comp_id+"','"+sub_id+"', '"+prof_id+"', '0');";

	db.task('get-everything', task => {
        return task.batch([
            task.any(query)
        ]);
    })
	
	.then(info => {
		res.redirect('back');
    })

	.catch(err => {
		console.log('error', err);
		res.render('pages/main', {
			my_title: "Personnel",
			items: '',
			error: false,
			message: ''
		})
	});
  });


  app.get('/competency_model', function(req, res) {
	let model_id = req.query.model_id;
	
	var model = "select * from D4DDB.t_competency_model where comp_model_id = '"+model_id+"';";
	var comp = "select * from D4DDB.v_comp where comp_model_id = '"+model_id+"';";

	db.task('get-everything', task => {
        return task.batch([
            task.any(model),
			task.any(comp)
        ]);
    })
	
	.then(info => {
		//console.log(info);
    	res.render('pages/competency_model',{
				my_title: 'Search CTAM',
				model: info[0],
				comp: info[1],
				error: false,
				message: ''
			})
    })

	.catch(err => {
		console.log('error', err);
		res.render('pages/main', {
			my_title: "Search CTAM",
			items: '',
			error: false,
			message: ''
		})
	});
  });

  app.get('/competency', function(req, res) {
	let comp_id = req.query.comp_id;
	
	// var comp = "select * from D4DDB.t_competency where comp_id = '"+comp_id+"';";
	var t_comp = "select * from D4DDB.v_comp where comp_id = '"+comp_id+"';";

	db.task('get-everything', task => {
        return task.batch([
			task.any(t_comp)
        ]);
    })
	
	.then(info => {
		//console.log(info);
    	res.render('pages/competency',{
				my_title: 'Search CTAM',
				t_comp: info[0],
				error: false,
				message: ''
			})
    })

	.catch(err => {
		console.log('error', err);
		res.render('pages/main', {
			my_title: "Search CTAM",
			items: '',
			error: false,
			message: ''
		})
	});
  });

  app.get('/sub_competency', function(req, res) {
	let sub_comp_id = req.query.sub_comp_id;
	
	// var sub_comp = "select * from D4DDB.t_sub_competency where sub_comp_id = '"+sub_comp_id+"';";
	var t_comp = "select * from D4DDB.v_comp where sub_comp_id = '"+sub_comp_id+"';";

	db.task('get-everything', task => {
        return task.batch([
			task.any(t_comp)
        ]);
    })
	
	.then(info => {
		//console.log(info);
    	res.render('pages/sub_competency',{
				my_title: 'Search CTAM',
				t_comp: info[0],
				error: false,
				message: ''
			})
    })

	.catch(err => {
		console.log('error', err);
		res.render('pages/main', {
			my_title: "Search CTAM",
			items: '',
			error: false,
			message: ''
		})
	});
  });

  app.get('/create', function(req, res) {

	//queries for creating Model, Comp, SubComp
	var model = "select * from D4DDB.t_competency_model;";
	var comp = "select * from D4DDB.t_competency;";
	var sub = "select * from D4DDB.t_sub_competency;";
	var prof = "select * from D4DDB.t_prof_level;";

	db.task('get-everything', task => {
        return task.batch([
			task.any(model),
			task.any(comp),
			task.any(sub),
			task.any(prof)
        ]);
    })
	
	.then(info => {
		//console.log(info);
    	res.render('pages/create',{
				my_title: 'Search CTAM',
				model: info[0],
				comp: info[1],
				sub: info[2],
				prof: info[3],
				error: false,
				message: ''
			})
    })

	.catch(err => {
		console.log('error', err);
		res.render('pages/main', {
			my_title: "Search CTAM",
			items: '',
			error: false,
			message: ''
		})
	});
  });

  app.post('/createModel', function(req, res) {
	var model_name = req.body.model_model_name;
	var model_desc = req.body.model_model_desc;

	var query = "insert into D4DDB.t_competency_model(comp_model_name, comp_model_desc) VALUES ('"+model_name+"', '"+model_desc+"');";

	db.task('get-everything', task => {
        return task.batch([
            task.any(query)
        ]);
    })
	
	.then(info => {
		res.redirect('back');
    })

	.catch(err => {
		console.log('error', err);
		res.render('pages/main', {
			my_title: "Personnel",
			items: '',
			error: false,
			message: ''
		})
	});
  });


  app.post('/createComp', function(req, res) {
	var model_id = req.body.comp_model_id;
	var comp_name = req.body.comp_comp_name;
	var comp_desc = req.body.comp_comp_desc;

	var query = "insert into D4DDB.t_competency(comp_name, comp_desc, comp_model_id) VALUES ('"+comp_name+"', '"+comp_desc+"', '"+model_id+"');";

	db.task('get-everything', task => {
        return task.batch([
            task.any(query)
        ]);
    })
	
	.then(info => {
		res.redirect('back');
    })

	.catch(err => {
		console.log('error', err);
		res.render('pages/main', {
			my_title: "Personnel",
			items: '',
			error: false,
			message: ''
		})
	});
  });

  app.post('/createSubComp', function(req, res) {
	//var model_id = req.body.subcomp_model_id;
	var comp_id = req.body.subcomp_comp_id;
	var sub_name = req.body.subcomp_sub_name;
	var sub_desc = req.body.subcomp_sub_desc;

	var query = "insert into D4DDB.t_sub_competency(sub_comp_name, sub_comp_desc, comp_id) VALUES ('"+sub_name+"', '"+sub_desc+"', '"+comp_id+"');";

	db.task('get-everything', task => {
        return task.batch([
            task.any(query)
        ]);
    })
	
	.then(info => {
		res.redirect('back');
    })

	.catch(err => {
		console.log('error', err);
		res.render('pages/main', {
			my_title: "Personnel",
			items: '',
			error: false,
			message: ''
		})
	});
  });

  app.post('/createBehavior', function(req, res) {
	var model_id = req.body.behavior_model_id;
	var comp_id = req.body.behavior_comp_id;
	var sub_id = req.body.behavior_sub_id;
	var prof_id = req.body.behavior_prof_id;
	var behavior = req.body.behavior_behavior;

	var query = "insert into D4DDB.t_comp_map(comp_model_id,comp_id,sub_comp_id,prof_level_id,behavior) VALUES ('"+model_id+"', '"+comp_id+"', '"+sub_id+"', '"+prof_id+"', '"+behavior+"');";

	db.task('get-everything', task => {
        return task.batch([
            task.any(query)
        ]);
    })
	
	.then(info => {
		res.redirect('back');
    })

	.catch(err => {
		console.log('error', err);
		res.render('pages/main', {
			my_title: "Personnel",
			items: '',
			error: false,
			message: ''
		})
	});
  });


  app.post('/pendingAccept', function(req, res) {
	var pers_comp_id = req.query.pers_comp_id;
	var pers_id = req.query.pers_id;
	var model = req.query.model;
	var comp = req.query.comp;
	var sub = req.query.sub;
	var prof_level = req.query.prof_level;

	var query = "delete from D4DDB.t_pers_comp_map where pers_comp_map_id="+pers_comp_id+";";
		query += "insert into D4DDB.t_pers_comp_map (pers_id, comp_model_id, comp_id, sub_comp_id, prof_level_id, stat) values ("+pers_id+","+model+", "+comp+","+sub+", "+prof_level+", 1);";
	// console.log(query);
	db.task('get-everything', task => {
        return task.batch([
            task.any(query)
        ]);
    })
	
	.then(info => {
		res.redirect('back');
    })

	.catch(err => {
		console.log('error', err);
		res.redirect('back');
	});
  });

  app.post('/pendingDecline', function(req, res) {
	var pers_comp_id = req.query.pers_comp_id;

	var query = "delete from D4DDB.t_pers_comp_map where pers_comp_map_id="+pers_comp_id+";";

	db.task('get-everything', task => {
        return task.batch([
            task.any(query)
        ]);
    })
	
	.then(info => {
		res.redirect('back');
    })

	.catch(err => {
		//console.log('error', err);
		res.redirect('back');
	});
  });

  //to request data from API for given search criteria
  //TODO: You need to edit the code for this route to search for movie reviews and return them to the front-end
//   app.post('/get_feed', function(req, res) {
// 	var title = req.body.title; //TODO: Remove null and fetch the param (e.g, req.body.param_name); Check the NYTimes_home.ejs file or console.log("request parameters: ", req) to determine the parameter names
// 	var api_key = "f5ddc0df"; // TOOD: Remove null and replace with your API key you received at the setup
  
// 	if(title) {
// 	  axios({
// 		  url: `http://www.omdbapi.com/?apikey=${api_key}&t=${title}`,
// 		  method: 'GET',
// 		  dataType:'json',
// 		})
// 		  .then(items => {
// 			// TODO: Return the reviews to the front-end (e.g., res.render(...);); Try printing 'items' to the console to see what the GET request to the Twitter API returned.
// 			// Did console.log(items) return anything useful? How about console.log(items.data.results)?
// 			// Stuck? Look at the '/' route above
// 			//console.log(items);
// 			//console.log(items.data);
// 			if (items != '') {
// 				res.render('pages/main',{
// 					my_title: items.data,
// 					items: items.data,
// 					error: false,
// 					message: ''
// 				  })
// 			}
// 			else {
// 				res.render('pages/main',{
// 					my_title: items.data,
// 					items: '',
// 					error: false,
// 					message: ''
// 				  })
// 			}
  
			
			  
			
// 		  })
// 		  .catch(error => {
// 			if (error.response) {
// 			  console.log(error.response.data);
// 			  console.log(error.response.status);
// 			}
// 			console.log(error);
// 			res.render('pages/main',{
// 			  my_title: "Movie Search and Review",
// 			  items: '',
// 			  error: true,
// 			  message: 'error'
// 			})
// 		  });
  
  
// 	}
// 	else {
// 	  // TODO: Render the home page and include an error message (e.g., res.render(...);); Why was there an error? When does this code get executed? Look at the if statement above
// 	  // Stuck? On the web page, try submitting a search query without a search term
// 	}
//   });

//   app.post('/write_review', function(req, res) {
// 	var movie_name = req.body.movieTitle;
// 	var movie_review = req.body.movieReview;

// 	query = "INSERT INTO movie_reviews (movie_name, review) VALUES ('"+movie_name+"', '"+movie_review+"');";
	
// 	var movies = "SELECT * FROM movie_reviews;";

// 	db.task('get-everything', task => {
//         return task.batch([
//             task.any(query),
// 			task.any(movies)
//         ]);
//     })
	
// 	.then(info => {
//     	res.render('pages/reviewesPage',{
// 				my_title: 'Movie Reviews',
// 				items: info[1],
// 				error: false,
// 				message: ''
// 			})
//     })

// 	.catch(err => {
// 		console.log('error', err);
// 		res.render('pages/main', {
// 			my_title: "Movie Reviews",
// 			items: '',
// 			error: false,
// 			message: ''
// 		})
// 	});
    
// });

module.exports = app.listen(3000);
console.log("3000 is the magic port");