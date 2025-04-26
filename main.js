const { Client, Intents } = require('discord.js-selfbot-v13');
const express = require('express');
const app = express();
const PORT = 8080;

const client = new Client({
  checkUpdate: false,
});

// EXPRESS
app.get('/', (req, res) => {
  res.send('Self-bot działa na Render! 🚀');
});
app.listen(PORT, () => {
  console.log(`🌐 Serwer Express działa na porcie ${PORT}`);
});

// ZMIENNE
const partneringUsers = new Map();
const partnershipTimestamps = new Map();

const serverAd = `Twoja reklama serwera tutaj`; // <-- tutaj twój tekst reklamowy

const partnerGuildID = '1328172859222134844';
const partnerChannelID = '1328182722937753692';

const channels = {
  zimowe: {
    gaming: '1346609270933946490',
    shops: '1346609275761332325',
    gv: '1346609282174685264',
    thematic: '1346609283932094529',
    minecraft: '1346609287048204378',
    tech: '1346609290332602420',
    hosting: '1347263942975557633',
    programing: '1346609292425429194',
    zima6h: '1346609312042324060',
    zima4h: '1346609313329971293',
    zima2h: '1346609314927743047',
    zima1h: '1346609316190486528',
    zima30m: '1346609317335531632',
    zima15m: '1346609318476255293',
    partnerstwa: '1346609247869337701'
  },
  miasto: {
    minecraft: '1254183529076756611',
    miasto6h: '1254123088103346247',
    miasto2h: '1254163564264947782',
    miasto1h: '1254163875620982834',
    miasto30m: '1254164476757020692',
    miasto15m: '1254165150978539520',
    partnerstwa: '1332399570872832151'
  },
  hyper: {
    hyper101: '1286351421691793461',
    hyperall: '1286351421133815988',
    hypergraphic: '1286351421457039383',
    hypergaming: '1286351421457039384',
    hypertechnology: '1286351421457039386',
    hypershops: '1286351421457039389',
    hyperminecraft: '1286351421457039390',
    hyperothers: '1286351421457039388',
    hyperpartners: '1286351421691793466',
    hyper6h: '1286351420911521829',
    hyper2h: '1286351420911521830',
    hyper1h: '1286351421133815982',
    hyper30m: '1286351421133815983'
  }
};

// KLIENT GOTOWY
client.once('ready', async () => {
  console.log(`✅ Zalogowano jako ${client.user.tag}`);

  // Reklamy
  setInterval(() => sendAd(channels.zimowe.gaming), 11 * 60 * 1000);
  setInterval(() => sendAd(channels.zimowe.shops), 11 * 60 * 1000);
  setInterval(() => sendAd(channels.zimowe.gv), 11 * 60 * 1000);
  setInterval(() => sendAd(channels.zimowe.thematic), 11 * 60 * 1000);
  setInterval(() => sendAd(channels.zimowe.minecraft), 11 * 60 * 1000);
  setInterval(() => sendAd(channels.zimowe.tech), 16 * 60 * 1000);
  setInterval(() => sendAd(channels.zimowe.hosting), 16 * 60 * 1000);
  setInterval(() => sendAd(channels.zimowe.programing), 11 * 60 * 1000);
  setInterval(() => sendAd(channels.zimowe.zima6h), 6 * 60 * 60 * 1000);
  setInterval(() => sendAd(channels.zimowe.zima4h), 4 * 60 * 60 * 1000);
  setInterval(() => sendAd(channels.zimowe.zima2h), 2 * 60 * 60 * 1000);
  setInterval(() => sendAd(channels.zimowe.zima1h), 1 * 60 * 60 * 1000);
  setInterval(() => sendAd(channels.zimowe.zima30m), 30 * 60 * 1000);
  setInterval(() => sendAd(channels.zimowe.zima15m), 15 * 60 * 1000);

  setInterval(() => sendAd(channels.miasto.minecraft), 1 * 60 * 60 * 1000);
  setInterval(() => sendAd(channels.miasto.miasto6h), 6 * 60 * 60 * 1000);
  setInterval(() => sendAd(channels.miasto.miasto2h), 2 * 60 * 60 * 1000);
  setInterval(() => sendAd(channels.miasto.miasto1h), 1 * 60 * 60 * 1000);
  setInterval(() => sendAd(channels.miasto.miasto30m), 30 * 60 * 1000);
  setInterval(() => sendAd(channels.miasto.miasto15m), 15 * 60 * 1000);

  setInterval(() => sendAd(channels.hyper.hyper101), 1 * 60 * 60 * 1000);
  setInterval(() => sendAd(channels.hyper.hyperall), 1 * 60 * 60 * 1000);
  setInterval(() => sendAd(channels.hyper.hypergraphic), 1 * 60 * 60 * 1000);
  setInterval(() => sendAd(channels.hyper.hypergaming), 1 * 60 * 60 * 1000);
  setInterval(() => sendAd(channels.hyper.hypertechnology), 1 * 60 * 60 * 1000);
  setInterval(() => sendAd(channels.hyper.hypershops), 1 * 60 * 60 * 1000);
  setInterval(() => sendAd(channels.hyper.hyperminecraft), 1 * 60 * 60 * 1000);
  setInterval(() => sendAd(channels.hyper.hyperothers), 1 * 60 * 60 * 1000);
  setInterval(() => sendAd(channels.hyper.hyper6h), 6 * 60 * 60 * 1000);
  setInterval(() => sendAd(channels.hyper.hyper2h), 2 * 60 * 60 * 1000);
  setInterval(() => sendAd(channels.hyper.hyper1h), 1 * 60 * 60 * 1000);
  setInterval(() => sendAd(channels.hyper.hyper30m), 30 * 60 * 1000);

  // Partnerstwa
  setInterval(() => sendPartnerInvitation(channels.zimowe.partnerstwa), 6 * 60 * 1000); // 6 minut
  setInterval(() => sendPartnerInvitation(channels.miasto.partnerstwa), 2 * 60 * 60 * 1000); // 2 godziny
  setInterval(() => sendPartnerInvitation(channels.hyper.hyperpartners), 1 * 60 * 60 * 1000); // 1 godzina
});

// FUNKCJE
async function sendAd(channelId) {
  try {
    let channel = client.channels.cache.get(channelId) || await client.channels.fetch(channelId);
    if (!channel) return console.error(`❌ Nie znaleziono kanału ${channelId}`);
    await channel.send(serverAd);
    console.log(`✅ Wysłano reklamę na kanał ${channel.name}`);
  } catch (error) {
    console.error(`❌ Błąd wysyłki reklamy:`, error);
  }
}

async function sendPartnerInvitation(channelId) {
  try {
    let channel = client.channels.cache.get(channelId) || await client.channels.fetch(channelId);
    if (!channel) return console.error(`❌ Nie znaleziono kanału ${channelId}`);
    await channel.send('# Posiadasz serwer i szukasz partnerstw? Wbijaj PV!');
    console.log(`✅ Wysłano wiadomość o partnerstwie na kanał ${channel.name}`);
  } catch (error) {
    console.error(`❌ Błąd wysyłki partnerstwa:`, error);
  }
}

// LOGOWANIE
client.login(process.env.DISCORD_TOKEN);
