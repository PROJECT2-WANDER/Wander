const express = require('express');
const router = express.Router();
const Place = require('../models/storagePlaces');




router.post('/addPlace', (req,res,next) => {
  //const {name, coordinates} = req.body; 
  // Place.create({name, coordinates})
  // .then(place => {
  //   console.log('THIS IS THE PLACE',place)
  // }).catch(err => {
  //   console.log(err); 
  // })
  const {name, coordinates} = req.body; 
  Place.create({name, coordinates})
  .then(() => {
    res.redirect('/');
  })
  .catch(err => {
    
    next(err);
  })
}); 

// GET to placeList 
router.get('/favoritesPlaces', (req,res,next) => {
  console.log("USER PLEASE BE HERE",req)
  Place.find().then(places => {
    console.log(places)
    res.render('user/placeList', {places});
  })
  .catch(err => {
    next(err);
  });
});


//Delete a place 
router.post('/favoritePlaces/:id/delete', (req, res, next) => {
  Celebrity.findOneAndDelete({ _id : req.params.id })
    .then(() => {
      console.log('DELETEDDDDDDD')
      res.redirect('favoritePlaces');
    })
    .catch(err => {
      next(err);
    })
});




// //GET to a specific place 
 router.get("/favoritesPlaces/:id", (req,res, next) => {
  const placeId = req.params.id; 
  console.log(placeId);
  Place.findById(placeId).then(place => {
     res.render('user/placeDetails', {place});
   }).catch(err => {
    next(err);
    })
 });






// /GET to the list of celebrities
// router.get("/celebrities", (req, res, next) => {
//   //call the celibrity model's find method
//   Celebrity.find().then(firstCelebrities => {
//     console.log(firstCelebrities); 
//     res.render('celebrities/index', { celibritiesList : firstCelebrities })
//   }).catch(err => {
//     next(err);
//   })
// });

// //Locate the /celebrities post route
// router.post('/celebrities', (req,res) => { 
//   const {name, occupation, catchPhrase} = req.body; 
//   Celebrity.create({
//     name: name,
//     occupation: occupation,
//     catchPhrase: catchPhrase
//   })
//     .then(celebrity => {
//       console.log('this celebrities was just created', celebrity); 
//       res.redirect(`/celebrities/${celebrity._id}`)
//     })
//     //.catch(err=> res.redirect('/celebrities/new'));
// });



// //Locate the /celebrities/new GET route in routes/celebrities
// router.get('/celebrities/new', (req, res) => {
//   console.log('new routes works')
//   res.render('celebrities/new');
// })


// //GET to a specific celebrity 
// router.get("/celebrities/:id", (req,res, next) => {
//   const celebrityId = req.params.id; 
//   Celebrity.findById(celebrityId).then(firstCelebrities => {
//     res.render('celebrities/show', {celebrityDetails : firstCelebrities});
//   }).catch(err => {
//     next(err);
//   })
// });


// //Deleting Celebrity
// router.post('/celebrities/:id/delete', (req, res,next) => {
//   const celebrityId = req.params.id; 
//   console.log('HEEEEEEERE', celebrityId)
//   Celebrity.findByIdAndDelete(celebrityId)
//     .then(()=> {
//       console.log('DELETEDDDDDDD')
//       res.redirect('/celebrities')
//     })
//     .catch(err => {
//       next(err);
//     })
// })

// //Celebrity Edit 
// router.get('/celebrities/:id/edit', (req,res) => {
//   const celebrityId = req.params.id;
//   Celebrity.findById(celebrityId)
//   .then(celebrityFromDB => {
//     res.render('celebrities/edit', {celebrity : celebrityFromDB});
//   })
//   .catch(err => {
//     next(err);
//   })
// })

// //celebrity Edit post 
// router.post('/celebrities/:id', (req, res) => {
//   const celebrityId = req.params.id;
//   const name = req.body.name;
//   const occupation = req.body.occupation;
//   const catchPhrase = req.body.catchPhrase;
//   Celebrity.findByIdAndUpdate(celebrityId, {
//     name: name,
//     occupation: occupation,
//     catchPhrase: catchPhrase
//   })
//     .then(celebrityFromDB => {
//       res.redirect(`/celebrities/${celebrityFromDB._id}`);
//     })
//     .catch(err => {
//       console.log(err);
//     })
// })







module.exports = router;