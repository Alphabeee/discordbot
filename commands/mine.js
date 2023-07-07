const {
  SlashCommandBuilder,
  EmbedBuilder,
  ButtonBuilder,
  ActionRowBuilder,
  ButtonStyle,
} = require("discord.js");
const fs = require("fs");
let is = 1;
module.exports = {
  data: new SlashCommandBuilder().setName("挖礦").setDescription("挖呀挖呀挖"),
  async execute(client, interaction) {
    const data = fs.readFileSync("players.json"); //調取資料庫
    let players = JSON.parse(data);
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
    const st = new EmbedBuilder()
      .setTitle("Start Mine")
      .setDescription(`⛏️⛏️⛏️你目前有${players[ind].money} 元⛏️⛏️⛏️`);
    await interaction.reply({ embeds: [st], ephemeral: true });

    const embed = new EmbedBuilder()
      .setTitle("⚠️前方三條岔路⚠️")
      .setDescription("請選擇前進方向")
      .setImage(
        "https://cdn.discordapp.com/attachments/1122552599548272680/1126555121401204876/IMG_7105.png"
      );
    const buttonleft = new ButtonBuilder()
      .setStyle(ButtonStyle.Primary)
      .setCustomId("left")
      .setLabel("⬅️");
    const buttonright = new ButtonBuilder()
      .setStyle(ButtonStyle.Primary)
      .setCustomId("right")
      .setLabel("➡️");
    const buttonmiddle = new ButtonBuilder()
      .setStyle(ButtonStyle.Primary)
      .setCustomId("middle")
      .setLabel("⬆️");
    const buttonquit = new ButtonBuilder()
      .setStyle(ButtonStyle.Danger)
      .setCustomId("quit")
      .setLabel("↩️");
    const buttoncont = new ButtonBuilder()
      .setStyle(ButtonStyle.Primary)
      .setCustomId("continue")
      .setLabel("🔜");
    const row = new ActionRowBuilder().addComponents(
        buttonleft,
        buttonmiddle,
        buttonright,
        buttonquit
      ),
      row2 = new ActionRowBuilder().addComponents(buttoncont);

    interaction.followUp({
      embeds: [embed],
      components: [row],
      ephemeral: true,
    });
    const collector = interaction.channel.createMessageComponentCollector({
      time: 15000,
    });

    const handler = async (collected) => {
      let is = true;
      let choice = Math.floor(Math.random() * 99);
      let earning;
      earning = 0;
      const res = new EmbedBuilder();
      if (collected.customId == "continue") {
      } else if (collected.customId == "quit") {
        res.setTitle("You leave the cave");

        interaction.followUp({
          embeds: [res],
          components: [],
          ephemeral: true,
        });
        is = 0;
      } else if (choice >= 0 && choice < 5) {
        //鑽石5%
        res.setTitle(
          `恭喜挖到鑽石！💎你現在有 ${players[ind].money + 1000} 元💎`
        );
        res.setImage(
          "https://media.discordapp.net/attachments/1122552599548272680/1126710824577269810/IMG_7098.jpg?width=468&height=468"
        );
        interaction.followUp({ embeds: [res], component: [], ephemeral: true });
        earning += 1000;
      } else if (choice >= 5 && choice < 15) {
        //金10%
        res.setTitle(`挖到金礦⛏️你現在有 ${players[ind].money + 300} 元⛏️`);
        res.setImage(
          "https://media.discordapp.net/attachments/1122552599548272680/1126710073738145915/IMG_7122.jpg?width=511&height=468"
        );
        interaction.followUp({ embeds: [res], component: [], ephemeral: true });
        earning += 300;
      } else if (choice >= 15 && choice < 30) {
        //鐵15%
        res.setTitle(`挖到鐵礦⛏️你現在有 ${players[ind].money + 100} 元⛏️`);
        res.setImage(
          "https://media.discordapp.net/attachments/1122552599548272680/1126712221980954624/IMG_7128.jpg?width=679&height=676"
        );
        interaction.followUp({
          embeds: [res],
          components: [],
          ephemeral: true,
        });
        earning += 100;
      } else if (choice >= 30 && choice < 50) {
        //煤20%
        res.setTitle(`挖到煤礦⛏️你現在有 ${players[ind].money + 50} 元⛏️`);
        res.setImage(
          "https://media.discordapp.net/attachments/1122552599548272680/1126710074186944613/IMG_7123.jpg?width=507&height=468"
        );
        interaction.followUp({
          embeds: [res],
          components: [],
          ephemeral: true,
        });
        earning += 50;
      } else if (choice >= 50 && choice < 62) {
        //岩漿 12% 50
        if (players[ind].money - 50 > 0) {
          res.setTitle(`你掉進岩漿裡了🔥剩下 ${players[ind].money - 50} 元🔥`);
        } else {
          res.setTitle(`你掉進岩漿裡了🔥剩下 0 元🔥`);
        }

        res.setImage(
          "https://cdn.discordapp.com/attachments/1122552599548272680/1126556408591167631/19D522B1-D81E-4932-BA26-A43E0481D6A4.png"
        );
        collected.update({ embeds: [res], components: [] });
        is = 0;
        earning -= 50;
      } else if (choice >= 62 && choice < 75) {
        //怪物襲擊 13% 100
        if (players[ind].money - 100 > 0) {
          res.setTitle(`你被怪物殺死了😈剩下 ${players[ind].money - 100} 元😈`);
        } else {
          res.setTitle(`你被怪物殺死了😈剩下 0 元😈`);
        }
        res.setImage(
          "https://cdn.discordapp.com/attachments/1122552599548272680/1126707269636194354/IMG_1200.JPG"
        );
        collected.update({ embeds: [res], components: [], ephemeral: true });
        is = 0;
        earning -= 100;
      } else if (choice >= 75 && choice < 99) {
        //石頭 25%
        res.setTitle(`只有石頭⛏️你有 ${players[ind].money} 元⛏️`);
        res.setImage(
          "https://media.discordapp.net/attachments/1122552599548272680/1126710760769343538/IMG_7127.jpg?width=463&height=468"
        );
        collected.update({ embeds: [res], components: [], ephemeral: true });
        earning += 0;
      }

      if ((players[ind].money += earning > 0)) {
        players[ind].money += earning;
      } else {
        players[ind].money = 0;
      }

      const json = JSON.stringify(players);
      fs.writeFileSync("players.json", json);

      if (is) {
        const next_collector =
          interaction.channel.createMessageComponentCollector({
            time: 15000,
          });
        interaction.followUp({
          embeds: [embed],
          components: [row],
          ephemeral: true,
        });
        next_collector.once("collect", handler);
      }
    };

    collector.once("collect", handler);
  },
};
