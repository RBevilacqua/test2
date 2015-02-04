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
            return;
        }

        User.findOneByUserEmail(req.param('userEmail'), function foundUser (err, user){
            if (err) return next(err);

            if (!user) {
                var noAccountError = [{name: 'noAccount', message: 'The Email Addres ' + req.param('userEmail') + ' not found.'}]
                req.session.flash = {
                    err: noAccountError
                }
                res.redirect('/session/new');
                return;
            }
            var bcrypt = require('bcrypt');
            // Compara password con el password encriptado del usuario encontrado.
            bcrypt.compare(req.param('userPassword'), user.userPassword, function(err, valid){
                if (err) return next(err);
                if (!valid) {
                    var usernamePasswordMismatchError = [{name: 'usernamePasswordMismatch', message: 'Invalid Username and Pasword Combination.'}];
                    req.session.flash = {
                        err: usernamePasswordMismatchError
                    }
                    res.redirect('/session/new');
                    return;
                }

                // Log user
                req.session.authenticated = true;
                req.session.User = user;

                // Redirige a su pagina de perfil
                res.redirect('/user/show/' + user.id);
            });
        });
    },

    destroy: function(req, res, next){
        req.session.destroy();
        res.redirect('/session/new');
    }
};

