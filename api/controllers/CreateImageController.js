/**
 * CreateImageController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
    
  
  /**
   * Action blueprints:
   *    `/createimage/generate`
   */
   generate: function (req, res) {
      var fs = require('fs');
      var sys = require('sys');


      var img = req.body.image;
      var imageName = Math.random().toString(36).substring(7) + '.png';

      // strip off the data: url prefix to get just the base64-encoded bytes
      var data = img.replace(/^data:image\/png;base64,/, "");
      var buf = new Buffer(data, 'base64');
      fs.writeFile('assets/images/uploads/' + imageName, buf, function(err) {
        if (!err) {
            var response = {
                  result: 'success',
                  image: imageName,
                  message: 'File uploaded!'
                 };
          res.send(response)
        }
      });            


  },




  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to CreateImageController)
   */
  _config: {}

  
};
