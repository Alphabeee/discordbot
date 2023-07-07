const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fs = require("fs");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("capsule")
    .setDescription("capsule emoji"),
  async execute(client, interaction) {
    //使用者的錢夠不夠
    //扭扭蛋
    //調取資料庫
    const data = fs.readFileSync("players.json");
    const Edata = fs.readFileSync("emoji.json");
    let players = JSON.parse(data);
    let emoji = JSON.parse(Edata);

    //在所有資料中尋找呼叫此指令玩家的資料
    let found = false;
    for (let i = 0; i < players.length; i++) {
      //如果有就修改該玩家的 money 並回覆結果
      if (players[i].id == interaction.user.id) {
        found = true;
        let money = players[i].money;

        //回復結果(沒錢)
        if (money <= 0) {
          const cachaEmbed = new EmbedBuilder()
            .setColor("#5865F2")
            .setTitle(`你沒錢了,快去賺錢吧!`)
            .setDescription(`你現在有 ${money} 元!`);
          await interaction.reply({ embeds: [cachaEmbed] });
        } else if (money > 0 && money < 200) {
          const cachaEmbed = new EmbedBuilder()
            .setColor("#5865F2")
            .setTitle(`你錢不夠扭蛋,一次200元!`)
            .setDescription(`你現在有 ${money} 元!`);
          await interaction.reply({ embeds: [cachaEmbed] });
        }
        //回復結果(有錢) 開始扭蛋
        else if (money >= 200) {
          //隨機扭蛋
          const chahaout = Math.floor(Math.random() * 4) + 1; //1-5
          let chaha = 0;
          //扭蛋結果  80%20種 emoji  20%5種 emoji
          if (chahaout >= 1 && chahaout <= 4) {
            //進入80%機率
            chaha = Math.floor(Math.random() * 20); //0-19
          } else if (chahaout == 5) {
            //進入20%機率
            chaha = Math.floor(Math.random() * 5) + 20; //20-24
          }

          //扭蛋結果
          showemoji = emoji[chaha];
          players[i].money = money - 200;
          //console.log(Math.pow(2, chaha));
          players[i].dir |= Math.pow(2, chaha);
          const cachaEmbed = new EmbedBuilder()
            .setColor("#5865F2")
            .setTitle(`你得到了 ${showemoji}`) //emoji還
            .setDescription(`你現在有 ${money - 200} 元!`);
          await interaction.reply({ embeds: [cachaEmbed] });
        }
        break;
      }
    }
    //如果沒有資料就創建一個新的並回覆結果
    if (found == false) {
      //創建新的玩家資料
      players.push({
        id: interaction.user.id,
        money: 0,
        dir: 0,
      });

      //回復結果c (沒錢)
      const cachaEmbed = new EmbedBuilder()
        .setColor("#5865F2")
        .setTitle(`你沒錢了,快去賺錢吧!`)
        .setDescription(`你現在有 0 元!`);
      //await interaction.reply({ embeds: [cachaEmbed] });
    }

    //stringify players 並存回 players.json
    const json = JSON.stringify(players);
    fs.writeFileSync("players.json", json);
  },
};
