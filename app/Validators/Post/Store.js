'use strict'

class Store {
  get rules () {
    return {
      title: 'required|min:5',
      description: 'required|min:20',
      body: 'required|min:10',
      category: 'required'
    }
  }

  get messages () {
    return {
      'title.required': 'Please enter a title.',
      'title.min': 'Title must be a minimum of 5 characters.',
      'description.required': 'Please enter a description.',
      'description.min': 'Description must be at least 20 characters.',
      'body.required': 'Please enter content.',
      'body.min': 'Please make sure your content is at least 10 characters.',
      'category.required': 'Please choose a category.'
    }
  }
}

module.exports = Store
