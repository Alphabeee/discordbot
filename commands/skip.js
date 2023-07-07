const { SlashCommandBuilder } = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("skip")
    .setDescription("skip the song"),

  async execute(client, interaction) {
    const queue = client.distube.getQueue(interaction);
    if (!queue)
      return interaction.channel.send(
        `| There is nothing in the queue right now!`
      );
    try {
      const song = await queue.skip();
      interaction.channel.send(` | Skipped! Now playing:\n${song.name}`);
    } catch (e) {
      interaction.channel.send(`| ${e}`);
    }
  },
};
