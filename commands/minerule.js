const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("minerule")
    .setDescription("挖礦規則介紹!"),
  async execute(client, interaction) {
    await interaction.reply(
      "歡迎歡迎來到「挖呀挖呀挖」!\n這邊將為您介紹此遊戲的規則"
    );
    await interaction.reply(
      "在開始遊戲後，選擇任一條路，你將會挖到四種礦物來賺錢，但也可能因故死亡，敬請期待!當挖到鑽石，賺取1000!黃金，賺取300!鐵礦，賺取100!煤炭，賺取50!遇到岩漿則死亡，並扣取50!怪物殺死，則扣取100!挖到石頭，不加不扣!"
    );
  },
};
