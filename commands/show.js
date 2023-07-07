const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fs = require("fs");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("展示")
    .setDescription("展示你的圖鑑"),
  async execute(client, interaction) {
    const emojidata = fs.readFileSync("emoji.json");
    let emojilist = JSON.parse(emojidata);
    const playerdata = fs.readFileSync("players.json");
    let players = JSON.parse(playerdata);
    let chk = 0,
      ind = 0;
    for (let i = 0; i < players.length; i++) {
      if (players[i].id == interaction.user.id) {
        chk = 1;
        ind = i;
      }
    }
    if (!chk) {
      players.push({ id: interaction.user.id, money: 0, dir: 0 });
      ind = players.length - 1;
    }
    const ans = new EmbedBuilder().setTitle("Your dir");
    let str = "";
    for (let i = 0; i < 25; i += 5) {
      for (let j = i; j < i + 5; j++) {
        //onsole.log(players[ind].dir);
        //console.log(players[ind].dir & Math.pow(2, j));
        if (players[ind].dir & Math.pow(2, j)) str += emojilist[j];
        else str += "❓";
      }
      str += "\n";
    }
    ans.setDescription(str);
    interaction.reply({ embeds: [ans] });
  },
};
