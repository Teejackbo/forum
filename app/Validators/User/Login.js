'use strict'

class Login {
  get rules () {
    return {
      email: 'required',
      password: 'required'
    }
  }

  get messages () {
    return {
      'email.required': 'Please enter an email.',
      'password.required': 'Please enter a password.'
    }
  }
}

module.exports = Login
