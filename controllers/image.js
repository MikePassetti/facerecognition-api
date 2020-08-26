const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: '2a420e1f88b541629aee61fc7a866bc5'
 });

const handleApiCall = (req, res) => {
	app.models.predict('c0c0ac362b03416da06ab3fa36fb58e3', req.body.input)
	.then(data => {
		res.json(data);
	})
	.catch(err => res.status(400).json('unable to work with API'));
}

const handleImagePut = (req, res, db) => {
	const { id } = req.body;
	db('users').where('id', '=', id)
  	.increment('entries', 1)
  	.returning('entries')
  	.then(entries => {
  		res.json(entries[0]);
  	})
  	.catch(err => res.status(400).json('unable to find entries'))
}

module.exports = {
	handleImagePut: handleImagePut,
	handleApiCall: handleApiCall
};