var express = require('express'),
    app = express(),
    bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
const fileUpload = require('lib');
path=require('path');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/images')));
app.use(express.static(path.join(__dirname, 'public/js')));

app.use(fileUpload());
app.use(cookieParser());

app.use(expressSession({
    secret: 'sessione',
    resave: false,
    saveUninitialized: true
}));

app.use(function(req,res,next) {
    res.locals.session = req.session;
    next();
});



app.post('/upload', function(req, res) {
    let sampleFile;
    let uploadPath;

    if (Object.keys(req.files).length == 0) {
        res.status(400).send('No files were uploaded.');
        return;
    }

    //console.log('req.files >>>', req.files); // eslint-disable-line

    sampleFile = req.files.sampleFile;

    uploadPath = __dirname + '/uploads/' + sampleFile.name;

    sampleFile.mv(uploadPath, function(err) {
        if (err) {
            return res.status(500).send(err);
        }

        res.send('File uploaded to ' + uploadPath);
    });
});

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname + '/public/registrati.html'));
});

app.post("/", function(req, res) {
    res.sendFile(path.join(__dirname + '/public/registrati.html'));
});

app.listen(80, function () {

    console.log('Server listening on port 80!');
});


var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'nba'
});


connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('Database connected as id ' + connection.threadId);
});


app.post("/registrati.html", function(req,res){

    console.log("Ricevuto una richiesta POST");

    var nome=req.body.nome;
    var cognome=req.body.cognome;
    var email=req.body.email;
    var password=req.body.password;
    var confermapassword=req.body.confermaPassword;
    var termini=req.body.terms;

    app.set('view engine','jade');

     connection.query('SELECT count(*) as conta from utenti where email="'+email+'";', function (error, results) {
        if (error)
            throw error;
         controllo(results);

         });

function controllo(results){
    if (nome=="" || cognome=="" ||email=="" ||password=="" ||confermapassword=="" ){
        res.render("registrati.jade",{messaggio:"Errore Campo/i Nullo/i"});
    }
    else if (password!=confermapassword){
        res.render("registrati.jade",{messaggio:"Password non corrispondente"});
    }
    else if (password.length<8 || password.length>16){
        res.render("registrati.jade",{messaggio:"La password deve essere lunga 8-16 caratteri"});
        }
    else if(results[0].conta!=0)
        res.render("registrati.jade",{messaggio:"Utente già registrato!"});
    else if(termini!="yes")
        res.render("registrati.jade",{messaggio:"Accettare termini e condizioni!"});
    else{
        connection.query('insert into utenti (Nome,Cognome,Email,Password) values ("'+nome+'","'+cognome+'","'+email+'","'+password+'");', function (error, results, fields) {
            if (error) throw error;
        });
        res.sendFile(__dirname+'/public/login.html');
    }}
});


app.post("/home", function(req,res){
    var email=req.body.email;
    var password=req.body.password;
    app.set('view engine','jade');
    req.session.utente = req.body.email;
    console.log(req.session.utente);
    connection.query('SELECT count(*) as conta from utenti where email="'+email+'" and password="'+password+'";', function (error, results) {
        if (error)
            throw error;
        if(results[0].conta!=1)
            res.render("login.jade",{messaggio:"Email e/o Password non corrispondenti"});
        else
            res.render("attività.jade");
    });
});


app.post("/upload.html", function(req,res){

        console.log(req.files.mio);
});


/*app.post('/uploadfile', upload.single('myFile'), (req, res, next) => {
    const file = req.file
    if (!file) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return next(error)
    }
    res.send(file)

})*/