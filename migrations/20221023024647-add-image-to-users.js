'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'image', {
      type: Sequelize.STRING,
      default: 'https://secure.gravatar.com/avatar/12122a41f5e1d5f75d7b0aaf67199e7e?s=300&d=mm&r=g',
      allowNull: false
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'image')
  }
}
