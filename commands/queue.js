const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("queue")
    .setDescription("displays the current song queue")
    .addNumberOption((option) =>
      option.setName("page").setDescription("page").setRequired(true)
    ),
  async execute(client, interaction) {
    const queue = client.distube.getQueue(interaction);
    if (!queue) return interaction.channel.send(`There is nothing playing!`);
    const embed = new EmbedBuilder().setTitle(
        `Page ${interaction.options.getNumber("page")}:`
      ),
      num = interaction.options.getNumber("page");
    //console.log(queue.songs);

    for (
      let i = (num - 1) * 10 == 0 ? 0 : (num - 1) * 10 + 1;
      i <= Math.min(queue.songs.length, num * 10);
      i++
    ) {
      if (i == 0)
        embed.addFields({
          name: `Playing: ${queue.songs[i].name}`,
          value: `${queue.songs[i].formattedDuration}`,
        });
      else {
        embed.addFields({
          name: `${i}. ${queue.songs[i].name}`,
          value: `${queue.songs[i].formattedDuration}`,
        });
      }
    }
    interaction.reply({ embeds: [embed] });
  },
};
