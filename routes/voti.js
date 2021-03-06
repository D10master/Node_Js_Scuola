exports.list = function(req, res){

  req.getConnection(function(err,connection){


        var id = req.params.id;
        var query = connection.query('SELECT voti.id,voti.voto, studenti.cognome, studenti.nome, studenti.mail FROM voti INNER JOIN studenti ON voti.id_studente = studenti.id WHERE studenti.id=?',[id],function(err,rows)
        {
            if(err){
                console.log("Error Selecting : %s ",err );
                console.log([id]);
              }
            res.render('voti',{page_title:"Voti - Node.js",data:rows});


         });

         //console.log(query.sql);
    });

};

exports.add = function(req, res){
  req.getConnection(function (err, connection) {

  var query = connection.query("SELECT * FROM studenti", function(err, rows)
      {

        if (err)
            console.log("Error inserting : %s ",err );
            res.render('add_voti',{page_title:"Add Voti - Node.js",data:rows});
      });

  //console.log("add view: "+query.sql);


});


};

exports.edit = function(req, res){

    var id = req.params.id;

    req.getConnection(function(err,connection){

        var query = connection.query('SELECT * FROM voti WHERE id = ?',[id],function(err,rows)
        {

            if(err)
                console.log("Error Selecting : %s ",err );

            res.render('edit_voti',{page_title:"Edit Voti - Node.js",data:rows});


         });

         //console.log(query.sql);
    });
};

//Save the customer
exports.save = function(req,res){

    var input = JSON.parse(JSON.stringify(req.body));

    req.getConnection(function (err, connection) {

        var voto = input.voto;
        var id = input.id;
        var query = connection.query("INSERT INTO voti(voto, id_studente) VALUES (?,?)",[voto,id], function(err, rows)
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

            voto    : input.voto,

        };

        connection.query("UPDATE voti set ? WHERE id = ? ",[data,id], function(err, rows)
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

        connection.query("DELETE FROM voti  WHERE id = ? ",[id], function(err, rows)
        {

             if(err)
                 console.log("Error deleting : %s ",err );

             res.redirect('/studenti');

        });

     });
};
