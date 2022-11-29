const { Comment, User, Restaurant, Category } = require('../models')
const commentController = {
  postComment: (req, res, next) => {
    const { restaurantId, text } = req.body
    const userId = req.user.id
    if (!text.trim()) throw new Error('Comment text is required!')
    if (text.length > 300) {
      return Restaurant.findByPk(restaurantId, {
        include: [Category, Comment]
      })
        .then(restaurant => {
          const errorMessages = 'Comment text shouldn\'t more than 300 characters!'
          res.render('restaurant', {
            errorMessages,
            text,
            restaurant: restaurant.toJSON()
          })
        })
        .catch(err => next(err))
    }
    return Promise.all([
      User.findByPk(userId),
      Restaurant.findByPk(restaurantId)
    ])
      .then(([user, restaurant]) => {
        if (!user) throw new Error("user didn't exist!")
        if (!restaurant) throw new Error("restaurant didn't exist!")
        return Comment.create({
          text, restaurantId, userId
        })
      })
      .then(() => {
        res.redirect(`/restaurants/${restaurantId}`)
      })
      .catch(err => next(err))
  },
  deleteComment: (req, res, next) => {
    return Comment.findByPk(req.params.id)
      .then(comment => {
        if (!comment) throw new Error("Comment didn't exist!")
        return comment.destroy()
      })
      .then(deletedComment =>
        res.redirect(`/restaurants/${deletedComment.restaurantId}`)
      )
      .catch(err => console.log(err))
  }
}

module.exports = commentController
