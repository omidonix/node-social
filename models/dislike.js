'use strict';
const {
  Model
} = require('sequelize');

const uppercaseFirst = str => `${str[0].toUpperCase()}${str.substr(1)}`;

module.exports = (sequelize, DataTypes) => {
  class dislike extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      dislike.belongsTo(models.post, { foreignKey: 'dislikeableId', constraints: false });
    }

    getLikeable(options) {
      if (!this.dislikeableType) return Promise.resolve(null);
      const mixinMethodName = `get${uppercaseFirst(this.dislikeableType)}`;
      return this[mixinMethodName](options);
    }

  };
  dislike.init({
    user_id: DataTypes.INTEGER,
    dislikeableId: DataTypes.INTEGER,
    dislikeableType: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'dislike',
  });



  dislike.addHook("afterFind", findResult => {
    if (!Array.isArray(findResult)) findResult = [findResult];
    for (const instance of findResult) {
      if (instance.likeableType === "post" && instance.post !== undefined) {
        instance.like = instance.post;
      }
      // To prevent mistakes:
      delete instance.post;
      delete instance.dataValues.post;
    }
  });



  dislike.addHook("afterFind", findResult => {
    if (!Array.isArray(findResult)) findResult = [findResult];
    for (const instance of findResult) {
      if (instance.likeableType === "post" && instance.post !== undefined) {
        instance.like = instance.post;
      }
      // To prevent mistakes:
      delete instance.post;
      delete instance.dataValues.post;
    }
  });



  dislike.addHook("afterCreate", (instance, options) => {
    if(instance.dislikeableType == 'post'){
      const db = require('./index')
      db.post.increment('dislike_count',{
        where : {
          id : instance.dislikeableId
        }
      })
    }
    
  });

  dislike.addHook("afterDestroy", (instance, options) => {
    if(instance.dislikeableType == 'post'){
      const db = require('./index')
      db.post.decrement('dislike_count',{
        where : {
          id : instance.dislikeableId
        }
      })
    }
    
  });


  return dislike;
};