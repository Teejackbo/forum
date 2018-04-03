'use strict'

class Store {
  get rules () {
    return {
      title: 'required',
      description: 'required'
    }
  }

  get messages () {
    return {
      'title.required': 'Please enter a title.',
      'description.required': 'Please enter a description.'
    }
  }
}

module.exports = Store
