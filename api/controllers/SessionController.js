/**
 * SessionController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	'new': function(req, res){

        /*var oldDateObj = new Date();
        var newDateObj = new Date(oldDateObj.getTime() + 60000);
        req.session.cookie.expires = newDateObj;
        req.session.authenticated = true;
        console.log(req.session);*/
        res.view('session/new');
    },

    create: function(req, res, next) {
        if (!req.param('userEmail') || !req.param('userPassword')){
            var usernamePasswordRequiredError = [{name: 'usernamePasswordRequired', message: 'You must enter both a username and password'}];
            req.session.flash = {
                err: usernamePasswordRequiredError
            }
            res.redirect('/session/new');
            return
        }
    }
};

