const express = require('express');
const router = express.Router();
const Place = require('../models/storagePlaces');




router.post('/addPlace', (req,res,next) => {
  const {name, coordinates} = req.body; 
  Place.create({ name, coordinates, user: req.session.user._id})
  .then(() => {
    res.redirect('/');
  })
  .catch(err => {
    
    next(err);
  })
}); 

// GET to the list of the favorites places 
router.get('/favoritesPlaces', (req,res,next) => {
  console.log("USER PLEASE BE HERE",req.session.user._id)
  Place.find({ user: req.session.user._id}).then(places => {
    console.log(places)
    res.render('user/placeList', {places});
  })
  .catch(err => {
    next(err);
  });
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


//Delete a place 
router.post('/favoritesPlaces/:id/delete', (req, res,next) => {
  const placeId = req.params.id; 
  console.log('HEEEEEEERE', placeId)
 Place.findByIdAndDelete(placeId)
   .then(()=> {
     console.log('DELETEDDDDDDD')
      res.redirect('/favoritesPlaces')
    })
    .catch(err => {
       next(err);
   })
   })



 // GET edit 
 router.get('/favoritesPlaces/:id/edit', (req, res) => {
  const placeId = req.params.id;
  console.log('THAT WORK!!!!!!!');
  Place.findById(placeId)
    .then(placeFromDB => {
      console.log(placeFromDB);
      res.render('user/placeEdit.hbs', { place: placeFromDB });
    })
})

// POST edit 
router.post('/favoritesPlaces/:id/edit', (req, res) => {
  const placeId = req.params.id;
  const { description, rating } = req.body; 
  Place.findByIdAndUpdate(placeId, {
    description: description,
    rating: rating
  })
    .then(place => {
      console.log(place)
      res.redirect(`/favoritesPlaces/${place._id}`);

    })
    .catch(err => {
      console.log(err);
    })
})


module.exports = router;