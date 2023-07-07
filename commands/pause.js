const { SlashCommandBuilder } = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("pause")
    .setDescription("pause the song is playing"),

  async execute(client, interaction) {
    const queue = client.distube.getQueue(interaction);
    if (!queue)
      return interaction.reply(`There is nothing in the queue right now!`);
    if (queue.paused) {
      queue.resume();
      return interaction.reply("Resumed the song for you :)");
    }
    queue.pause();
    interaction.reply("Paused the song for you :)");
  },
};
