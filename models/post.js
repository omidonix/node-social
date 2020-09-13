'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
       post.belongsTo(models.file,{
        foreignKey: 'file_id',
        as: 'file'
       })

       post.hasMany(models.comment,{
        foreignKey: 'post_id',
        as: 'comment'
       })

       post.belongsTo(models.users,{
        foreignKey: 'user_id',
        as: 'users'
       })

       post.hasMany(models.like, {
        foreignKey: 'likeableId',
        constraints: false,
        scope: {
          likeableType: 'post'
        }
      });

      post.hasMany(models.dislike, {
        foreignKey: 'dislikeableId',
        constraints: false,
        scope: {
          dislikeableType: 'post'
        }
      });
      
    }

    static async list(offset){
      const db = require('./index')
      try {
        let posts = await this.findAll({
          limit: 3,
          offset: offset,
          order: [['id','DESC']],
          include: ['file','users',{
            model: db.comment,
            as: 'comment',
            limit: 2,
            order: [['id','DESC']],
            include: ['users']
            // required: true // true LEFT OUTER JOIN and false inner join | agaram ke limit ezafe she ke hichi dige aslan az select tu dar tu estefade mikone na az join mesle alan va dige amalan bifaydaf meghdare in property
          }]
          
          // subQuery: false, //add limit and offset to all query post limit 2 , file limit 2, file limit 2
        })
  
        if(posts){
          return posts
        }
      } catch (error) {
        console.log(error)
        return false
      }

      return false
    }

  };
  post.init({
    user_id: DataTypes.INTEGER,
    file_id: DataTypes.INTEGER,
    content: DataTypes.STRING,
    tags: DataTypes.STRING,
    view_count: DataTypes.INTEGER,
    comment_count: DataTypes.INTEGER,
    like_count: DataTypes.INTEGER,
    dislike_count: DataTypes.INTEGER
  }, {
    paranoid: true,
    sequelize,
    modelName: 'post',
  });
  return post;
};