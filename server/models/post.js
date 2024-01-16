const { DataTypes, Sequelize } = require("sequelize");


module.exports = ((sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
        PostID: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        Title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        Summary: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        Content: {
            type: Sequelize.TEXT
        },
        Category: {
            type: Sequelize.STRING
        },
    });

    Post.associate = (models) => {
        Post.belongsTo(models.User);
    };

    return Post;
});