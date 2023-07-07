const {
  SlashCommandBuilder,
  EmbedBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
  ActionRowBuilder,
} = require("discord.js");
const fs = require("fs");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("幫助")
    .setDescription("查看幫助選單"),
  async execute(client, interaction) {
    const embed = new EmbedBuilder()
      .setTitle("幫助選單")
      .setColor("#00ff00")
      .setTimestamp()
      .setFooter({
        text: "Made by: 獵蛋鵝",
        iconURL:
          "https://www.greenpeace.org/static/planet4-hongkong-stateless/2019/10/90e80dbb-penguin-chick.jpg",
      });

    const select = new StringSelectMenuBuilder()
      .setCustomId("help")
      .setPlaceholder("請選擇")
      .addOptions(
        new StringSelectMenuOptionBuilder()
          .setLabel("音樂指令")
          .setValue("music")
          .setDescription("音樂指令")
          .setEmoji("🎵"),
        new StringSelectMenuOptionBuilder()
          .setLabel("挖礦指令")
          .setValue("mine")
          .setDescription("挖礦指令")
          .setEmoji("⛏️"),
        new StringSelectMenuOptionBuilder()
          .setLabel("扭蛋指令")
          .setValue("cacha")
          .setDescription("扭蛋指令")
          .setEmoji("🥚")
      );

    const row = new ActionRowBuilder().addComponents(select);

    await interaction.reply({ embeds: [embed], components: [row] });
  },
};
