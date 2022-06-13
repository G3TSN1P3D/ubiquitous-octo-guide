const Comment = require('./Comment');
const Post = require('./Post');
const User = require('./User');

Post.belongsTo(User, {
    foreignkey: 'userId',
    onDelete: 'CASCADE'
})

Post.hasMany(Comment, {
    foreignkey: 'postId',
    onDelete: 'CASCADE'
})

Comment.belongsTo(User, {
    foreignkey: 'userId',
    onDelete: 'CASCADE'
})

module.exports = { Post, Comment, User };