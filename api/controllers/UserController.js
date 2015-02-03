/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var UserController = {



  /**
   * `UserController.index()`
   */
  new: function (req, res) {
      res.view();
  },


  /**
   * `UserController.show()`
   */
  show: function (req, res, netx) {
    User.findOne(req.param('id'), function foundUser (err, user){
        if (err) return next(err)
        if(!user) return next();
        res.view({
            user:user
        });
    });
      /*
    if (!_.isEmpty(req.param('name'))){
          var param = req.param('name');
          User.find({name:param},function getUser(err,result){
              if(err) throw erro;

              if(!_.isEmpty(result)){
                  return res.json({
                      status: 'success',
                      data: result
                  });
              } else {
                  return res.json({
                      status: 'User Not Found'
                  });
              }
          });
      } else {
          User.find({},function userList(err,result){
              if (err) throw err;
              return res.json({
                  status: 'success',
                  data: result
              });
          });
      }*/
  },

  index: function (req, res, netx) {

    User.find(function userList(err,users){
        if (err) return next(err);
        res.view({
            users: users
        });
    });
  },


  /**
   * `UserController.edit()`
   */
  edit: function (req, res) {

      User.findOne(req.param('id'), function foundUser (err, user){
        if (err) return next(err)
        if(!user) return next();
        res.view({
            user:user
        });

          /*if(!_.isEmpty(result)){
              return res.json({
                  status: 'success',
                  data: result
              });
          } else {
              return res.json({
                  status: 'User Not Found'
              });
          }*/
      });
  },



  /**
   * `UserController.delete()`
   */
  delete: function (req, res) {
    var param = req.param('name');

    User.destroy({name:param},function deleteUser(err,result){
        if(err) throw erro;

        if(!_.isEmpty(result)){
          return res.json({
            status: 'success',
            data: result
          });
        } else {
          return res.json({
            status: 'User Not Found'
          });
        }
    });
  },

  create: function(req, res){
    var params = req.params.all();
    User.create(params).exec(function createCB(err, created){
        if (err) {
            console.log(err);
            req.session.flash = {
                err: err
            }
            return res.redirect('/user/new');
        }


        //res.json(user);
        res.redirect('/user/show/'+user.id);

        res.ok({
            notice: 'Create user with name ' + created.username,
            data: created
        });
    });
      //res.redirect('back');
  }
};
module.exports = UserController;

