const { Client, Intents } = require('discord.js-selfbot-v13');
const express = require('express');
const app = express();
const PORT = 8080;

const client = new Client({ checkUpdate: false });

app.get('/', (req, res) => {
  res.send('Self-bot działa na Render! 🚀');
});
app.listen(PORT, () => {
  console.log(`🌐 Serwer Express działa na porcie ${PORT}`);
});

// --- KONFIGURACJA ---
const serverAd = `
### 🎨 **X-West Official Studios - Twoje miejsce na profesjonalne grafiki i więcej!** 🎨  

🌟 **Potrzebujesz grafiki, bota Discord, czy strony internetowej? My to zrobimy!**  

### Co oferujemy:  
- **🎨 Kreatywne projekty graficzne**  
- **🤖 Boty Discord**  
- **🌐 Strony internetowe**  
- **⚡ Szybko i profesjonalnie**  
- **💬 Indywidualne podejście**  

👉 **Chcesz się wyróżnić? Dołącz teraz!**  
https://discord.gg/CwVrjqqhmJ
`;

const partnerMessageText = '# Masz serwer i chcesz partnerstwo? Wbijaj pv!';
const partnerMessageChannelId = '1332399570872832151'; // Kanał partnerstw

const channels = {
  zimowe: [
    '1346609270933946490', // gaming
    '1346609275761332325', // shops
    '1346609282174685264', // gv
    '1346609283932094529', // thematic
    '1346609287048204378', // minecraft
    '1346609290332602420', // tech
    '1347263942975557633', // hosting
    '1346609292425429194', // programing
    '1346609312042324060', // zima6h
    '1346609313329971293', // zima4h
    '1346609314927743047', // zima2h
    '1346609316190486528', // zima1h
    '1346609317335531632', // zima30m
    '1346609318476255293', // zima15m
  ],
  miasto: [
    '1254183529076756611', // minecraft
    '1254123088103346247', // miasto6h
    '1254163564264947782', // miasto2h
    '1254163875620982834', // miasto1h
    '1254164476757020692', // miasto30m
    '1254165150978539520', // miasto15m
  ],
  hyper: [
    '1286351421691793461', // hyper101
    '1286351421133815988', // hyperall
    '1286351421457039383', // hypergraphic
    '1286351421457039384', // hypergaming
    '1286351421457039386', // hypertechnology
    '1286351421457039389', // hypershops
    '1286351421457039390', // hyperminecraft
    '1286351421457039388', // hyperothers
    '1286351421691793466', // hyperpartners
    '1286351420911521829', // hyper6h
    '1286351420911521830', // hyper2h
    '1286351421133815982', // hyper1h
    '1286351421133815983', // hyper30m
  ]
};

// --- BOT READY ---
client.once('ready', async () => {
  console.log(`✅ Zalogowano jako ${client.user.tag}`);

  // --- Wysyłki reklam ---
  
  // Zimowe co 6 minut
  setInterval(() => {
    channels.zimowe.forEach(channelId => {
      sendAd(channelId);
    });
  }, 6 * 60 * 1000);

  // Miasto co 2 godziny
  setInterval(() => {
    channels.miasto.forEach(channelId => {
      sendAd(channelId);
    });
  }, 2 * 60 * 60 * 1000);

  // Hyper co 1 godzinę
  setInterval(() => {
    channels.hyper.forEach(channelId => {
      sendAd(channelId);
    });
  }, 60 * 60 * 1000);

  // --- Partnerstwo ---
  
  // Od razu po starcie
  sendPartnerMessage(partnerMessageChannelId, partnerMessageText);

  // Potem co 1 godzinę
  setInterval(() => {
    sendPartnerMessage(partnerMessageChannelId, partnerMessageText);
  }, 60 * 60 * 1000);
});

// --- FUNKCJE ---
async function sendAd(channelId) {
  try {
    let channel = client.channels.cache.get(channelId);
    if (!channel) channel = await client.channels.fetch(channelId).catch(() => null);

    if (!channel) {
      console.error(`❌ Nie znaleziono kanału ${channelId}`);
      return;
    }

    await channel.send(serverAd);
    console.log(`✅ Wysłano reklamę na ${channel.name}`);
  } catch (err) {
    console.error(`❌ Błąd przy wysyłaniu reklamy:`, err.message);
  }
}

async function sendPartnerMessage(channelId, messageText) {
  try {
    let channel = client.channels.cache.get(channelId);
    if (!channel) channel = await client.channels.fetch(channelId).catch(() => null);

    if (!channel) {
      console.error(`❌ Nie znaleziono kanału partnerstw ${channelId}`);
      return;
    }

    await channel.send(messageText);
    console.log(`✅ Wysłano partnerstwo na ${channel.name}`);
  } catch (err) {
    console.error(`❌ Błąd przy wysyłaniu partnerstwa:`, err.message);
  }
}

// --- OBSŁUGA BŁĘDÓW ---
client.on('error', console.error);
process.on('unhandledRejection', console.error);

// --- LOGOWANIE ---
client.login(process.env.DISCORD_TOKEN);
