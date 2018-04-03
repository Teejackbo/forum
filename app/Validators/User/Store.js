'use strict'

class Store {
  get rules () {
    return {
      username: 'required|unique:users',
      email: 'required|email|unique:users',
      password: 'required',
      password_confirmation: 'required_if:password|same:password'
    }
  }
  
  get messages () {
    return {
      'username.required': 'Please choose a username.',
      'username.unique': 'Sorry, this username has already been chosen.',
      'email.required': 'Please enter an email.',
      'email.email': 'Sorry, this is an invalid email.',
      'email.unique': 'This email is already registered.',
      'password.required': 'Please enter a password.',
      'password_confirmation.required_if': 'Please confirm your password.',
      'password_confirmation.same': 'Passwords do not match.'
    }
  }
}

module.exports = Store
