const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("load songs from youtube ,spotify,and songcloud")
    .addStringOption((option) =>
      option
        .setName("song")
        .setDescription("Please enter a song url or query to search.")
        .setRequired(true)
    ),
  async execute(client, interaction) {
    if (!interaction.member.voice.channel)
      return interaction.reply("You need to in a voice channel");
    const str = interaction.options.getString("song");
    client.distube.play(interaction.member.voice.channel, str, {
      member: interaction.member,
      textChannel: interaction.channel,
      interaction,
    });
    const embed = new EmbedBuilder().setDescription("Sucessful add song!!!");
    interaction.reply({ embeds: [embed] });
  },
};
