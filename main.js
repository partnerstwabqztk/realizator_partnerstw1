const { Client } = require('discord.js-selfbot-v13');
const express = require('express');
const app = express();
const PORT = 8080;

// KLIENT
const client = new Client({
  checkUpdate: false
});

// EXPRESS SERVER (podtrzymanie bota przy życiu np. na Render)
app.get('/', (req, res) => {
  res.send('Bot działa! 🚀');
});
app.listen(PORT, () => {
  console.log(`🌐 Express serwer działa na porcie ${PORT}`);
});

// REKLAMA DO WYSYŁKI
const serverAd = `
### 🎨 **X-West Official Studios - Twoje miejsce na profesjonalne grafiki i więcej!** 🎨  

🌟 **Potrzebujesz grafiki, bota Discord, czy strony internetowej? My to zrobimy!**  

### Co oferujemy:  
- 🎨 Kreatywne projekty graficzne  
- 🤖 Boty Discord  
- 🌐 Strony internetowe  
- ⚡ Szybko i profesjonalnie  
- 💬 Indywidualne podejście  
- 🌈 Szeroka oferta  

👉 **Chcesz się wyróżnić? Dołącz teraz!**  
[Link do serwera](https://discord.gg/CwVrjqqhmJ)
`;

// KANAŁY
const channels = {
  zimowe: [
    '1346609270933946490', // gamingzimowe
    '1346609275761332325', // shopszimowe
    '1346609282174685264', // gvzimowe
    '1346609283932094529', // thematiczimowe
    '1346609287048204378', // minecraftzimowe
    '1346609290332602420', // techzimowe
    '1347263942975557633', // hostingzimowe
    '1346609292425429194'  // zimoweprograming
  ],
  miasto: [
    '1254183529076756611',
    '1254123088103346247',
    '1254163564264947782',
    '1254163875620982834',
    '1254164476757020692',
    '1254165150978539520'
  ],
  hyper: [
    '1286351421691793461',
    '1286351421133815988',
    '1286351421457039383',
    '1286351421457039384',
    '1286351421457039386',
    '1286351421457039389',
    '1286351421457039390',
    '1286351421457039388'
  ]
};

// Partnerstwa - nowe ID
const partnerMessageChannelId = '1332399570872832151';
const partnerMessageText = '# Masz serwer i chcesz partnerstwo? wbijaj pv!';

// BOT GOTOWY
client.once('ready', async () => {
  console.log(`✅ Zalogowano jako ${client.user.tag}`);

  // Zimowe - co 6 minut
  setInterval(() => {
    channels.zimowe.forEach(channelId => {
      sendAd(channelId);
    });
  }, 6 * 60 * 1000);

  // Miasto - co 2 godziny
  setInterval(() => {
    channels.miasto.forEach(channelId => {
      sendAd(channelId);
    });
  }, 2 * 60 * 60 * 1000);

  // Hyper - co 1 godzinę
  setInterval(() => {
    channels.hyper.forEach(channelId => {
      sendAd(channelId);
    });
  }, 60 * 60 * 1000);

  // Partnerstwa - co 1 godzinę
  setInterval(() => {
    sendPartnerMessage(partnerMessageChannelId, partnerMessageText);
  }, 60 * 60 * 1000);
});

// FUNKCJA - wysyłanie reklamy
async function sendAd(channelId) {
  try {
    let channel = client.channels.cache.get(channelId);
    if (!channel) {
      console.log(`🔎 Kanał ${channelId} nie w cache, próba pobrania...`);
      channel = await client.channels.fetch(channelId).catch(() => null);
    }
    if (!channel) {
      console.error(`❌ Nie znaleziono kanału ${channelId}`);
      return;
    }
    await channel.send(serverAd);
    console.log(`✅ Reklama wysłana na ${channel.name}`);
  } catch (err) {
    console.error(`❌ Błąd przy wysyłaniu reklamy na ${channelId}:`, err);
  }
}

// FUNKCJA - wysyłanie partnerstwa
async function sendPartnerMessage(channelId, messageText) {
  try {
    let channel = client.channels.cache.get(channelId);
    if (!channel) {
      console.log(`🔎 Kanał partnerstw ${channelId} nie w cache, próba pobrania...`);
      channel = await client.channels.fetch(channelId).catch(() => null);
    }
    if (!channel) {
      console.error(`❌ Nie znaleziono kanału partnerstw ${channelId}`);
      return;
    }
    await channel.send(messageText);
    console.log(`✅ Partnerstwo wysłane na ${channel.name}`);
  } catch (err) {
    console.error(`❌ Błąd przy wysyłaniu partnerstwa na ${channelId}:`, err);
  }
}

// Obsługa błędów
client.on('error', (err) => console.error('Błąd Discord:', err));
process.on('unhandledRejection', (err) => console.error('Nieobsłużony błąd:', err));

// LOGOWANIE
client.login(process.env.DISCORD_TOKEN);
