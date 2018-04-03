'use strict'

class Store {
  get rules () {
    return {
      comment: 'required|min:3'
    }
  }

  get messages () {
    return {
      'comment.required': 'You must enter a comment.',
      'comment.min': 'Your comment must be a minimum of 3 characters.'
    }
  }
}

module.exports = Store
