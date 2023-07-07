const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("gamerule")
    .setDescription("抽獎規則介紹!"),
  async execute(client, interaction) {
    await interaction.reply("pong!");
  },
};
