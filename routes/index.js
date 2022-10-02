const express = require('express');
const router = express.Router();


const mongoose = require('mongoose');
const Shiping = require("../models/shiping")



// index page
router.get('/', function (req, res) {
    res.render('pages/index');
});


// index page
router.get('/about', function (req, res) {
    res.render('pages/about');
});


// index page
router.get('/career', function (req, res) {
    res.render('pages/career');
});




// index page
router.get('/clients', function (req, res) {
    res.render('pages/clients');
});



// index page
router.get('/company-history', function (req, res) {
    res.render('pages/company-history');
});



// index page
router.get('/contact', function (req, res) {
    res.render('pages/contact');
});




// index page
router.get('/faq', function (req, res) {
    res.render('pages/faq');
});




// index page
router.get('/fleet-gallery-1', function (req, res) {
    res.render('pages/fleet-gallery-1');
});




// index page
router.get('/fleet-gallery-2', function (req, res) {
    res.render('pages/fleet-gallery-2');
});




// index page
router.get('/pricing', function (req, res) {
    res.render('pages/pricing');
});



// index page
router.get('/request-qoute', function (req, res) {
    res.render('pages/request-qoute', {message: "null"});
});



// index page
router.get('/service', function (req, res) {
    res.render('pages/service');
});



// index page
router.get('/edit-quote/:id/:shipingID/:status/:packageType/:weight/:pickup/:dropoff/:email/:amount', function (req, res) {
    res.render('pages/edit-quote', {
        message: "null",
        id: req.params.id,
        shipingID: req.params.shipingID,
        status: req.params.status,
        packageType: req.params.packageType,
        weight: req.params.weight,
        pickup: req.params.pickup,
        dropoff: req.params.dropoff,
        email: req.params.email,
        amount: req.params.amount
    });
});


 
router.post('/editqoute/:id', function (req, res) {

    Shiping.updateMany(
        {_id: mongoose.Types.ObjectId(req.params.id) },
        req.body,
        function (err, docs) {
          if (err) {
            res.status(400).send({ message: "failed to update" });
          } else {
            res.redirect("/dashboard/1")
          }
        }
      )
});



router.post('/track', function (req, res, next) {
    Shiping.find({shipingID: req.body.shipingID }).then(function(shiping){
        if(shiping.length === 0){
        return    res.render('pages/track-shipment', {
                message: "No tracking number found",
            });
        }else{
        return    res.render('pages/trackfind', {
                transaction: shiping,
            });
        }
      
    }).catch(next);
});


router.get('/track/:shipingID', function (req, res) {
    Shiping.find({shipingID: req.params.shipingID }).then(function(shiping){
        if(shiping.length === 0){
            res.render('pages/track-shipment', {
                message: "No tracking number found",
            });
        }else{
            res.render('pages/trackfind', {
                transaction: shiping,
            });
        }
      
    })
});



router.get('/trackfind', function (req, res) {
    res.render('pages/trackfind', { transaction: [],});
});



router.get('/dashboard', function (req, res) {
    res.redirect('dashboard/1');
});

// track


// index page
router.get('/dashboard/:page', function (req, res) {
    var perPage = 5;
    var page = req.params.page || 1;
    Shiping.find({ }).skip((perPage * page) - perPage)
    .limit(perPage).exec(function (err, shiping) {
        if (err) throw err;
        Shiping.countDocuments({}).exec((err, count) => {

            res.render('pages/dashboard', {
      
                transaction: shiping,
                current: page,
                pages: Math.ceil(count / perPage)
        
            });

        });
    });

   
});



// index page
router.get('/single-service', function (req, res) {
    res.render('pages/single-service');
});




// index page
router.get('/team', function (req, res) {
    res.render('pages/team');
});



// index page
router.get('/testimonials', function (req, res) {
    res.render('pages/testimonials');
});



// index page
router.get('/track-shipment', function (req, res) {
    res.render('pages/track-shipment', {message: "null"});
});


function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}


// index page
router.post('/request-qoute', function (req, res) {
    let today = new Date();
    Shiping.create({
        date: today.toLocaleDateString("en-US"),
        shipingID: makeid(12),
        status: "pending",
        packageType: req.body.packageType,
        pickup: req.body.pickup,
        dropoff: req.body.dropoff,
        weight: req.body.weight,
        email: req.body.email,
        amount: req.body.amount,
    }).then(
        function (tran) {
              res.render('pages/request-qoute', 
              { message: "Confinement created successfully" } );
        }
    )
  
});

module.exports = router;




