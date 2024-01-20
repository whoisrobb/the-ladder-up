const { DataTypes, Sequelize } = require("sequelize");


module.exports = ((sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
        CommentID: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        Content: {
            type: Sequelize.TEXT,
            allowNull: false
        },
    });

    Comment.associate = (models) => {
        Comment.belongsTo(models.User);
        Comment.belongsTo(models.Post);
    };

    return Comment;
});