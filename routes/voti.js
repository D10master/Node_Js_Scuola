exports.list = function(req, res){
  var id = req.params.id;
  req.getConnection(function(err,connection){



        var query = connection.query('SELECT * FROM voti WHERE id = ?',[id],function(err,rows)
        {

            if(err)
                console.log("Error Selecting : %s ",err );

            res.render('voti',{page_title:"Studenti - Node.js",data:rows});


         });

         //console.log(query.sql);
    });

};

exports.add = function(req, res){
  res.render('add_studenti',{page_title:"Add Studenti - Node.js"});
};

exports.edit = function(req, res){

    var id = req.params.id;

    req.getConnection(function(err,connection){

        var query = connection.query('SELECT * FROM studenti WHERE id = ?',[id],function(err,rows)
        {

            if(err)
                console.log("Error Selecting : %s ",err );

            res.render('edit_studenti',{page_title:"Edit Studenti - Node.js",data:rows});


         });

         //console.log(query.sql);
    });
};

//Save the customer
exports.save = function(req,res){

    var input = JSON.parse(JSON.stringify(req.body));

    req.getConnection(function (err, connection) {

        var data = {

            nome    : input.nome,
            cognome : input.cognome,
            mail   : input.mail

        };

        var query = connection.query("INSERT INTO studenti set ? ",data, function(err, rows)
        {

          if (err)
              console.log("Error inserting : %s ",err );

          res.redirect('/studenti');

        });

       // console.log(query.sql); get raw query

    });
};

exports.save_edit = function(req,res){

    var input = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;

    req.getConnection(function (err, connection) {

        var data = {

            nome    : input.nome,
            cognome : input.cognome,
            mail   : input.mail

        };

        connection.query("UPDATE studenti set ? WHERE id = ? ",[data,id], function(err, rows)
        {

          if (err)
              console.log("Error Updating : %s ",err );

          res.redirect('/studenti');

        });

    });
};


exports.delete_customer = function(req,res){

     var id = req.params.id;

     req.getConnection(function (err, connection) {

        connection.query("DELETE FROM studenti  WHERE id = ? ",[id], function(err, rows)
        {

             if(err)
                 console.log("Error deleting : %s ",err );

             res.redirect('/studenti');

        });

     });
};
