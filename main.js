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

const serverAd = `
### 🎨 **X-West Official Studios - Twoje miejsce na profesjonalne grafiki i więcej!** 🎨  

🌟 **Potrzebujesz grafiki, bota Discord, czy strony internetowej? My to zrobimy!**  

### Co oferujemy:  
- **🎨 Kreatywne projekty graficzne** – Logo, branding, grafiki do social media i więcej.  
- **🤖 Boty Discord** – Tworzymy boty dostosowane do Twoich potrzeb: zarządzanie, rozrywka, automatyzacja.  
- **🌐 Strony internetowe** – Profesjonalne projekty, responsywny design, zgodność z Twoją wizją.  
- **⚡ Szybko i profesjonalnie** – Gwarancja jakości i terminowości.  
- **💬 Indywidualne podejście** – Tworzymy wszystko zgodnie z Twoimi oczekiwaniami.  
- **🌈 Szeroka oferta** – Od prostych grafik po zaawansowane projekty 3D i kompleksowe systemy.  

### Dlaczego my:  
- **🌟 Doświadczenie** – Setki udanych projektów i zadowolonych klientów.  
- **⚡ Nowoczesne rozwiązania** – Innowacyjność i unikalność na pierwszym miejscu.  
- **💬 Współpraca na każdym etapie** – Twoje pomysły, nasza realizacja.  

👉 **Chcesz się wyróżnić? Dołącz teraz!**  
[Link do serwera](https://discord.gg/CwVrjqqhmJ)  
https://discord.gg/CwVrjqqhmJ  
https://media.discordapp.net/attachments/1327529385611493447/1340104080818962443/reklama.png?ex=67b124ae&is=67afd32e&hm=4b586733bbb88251125e8ddfff59d15fab3443edfa675ee5135a5b6b51352698&=&format=webp&quality=lossless

🎨 **X-West Official Studios – Twoje pomysły, nasza pasja!** 🎨
`;

const partnerGuildID = '1328172859222134844';
const partnerChannelID = '1328182722937753692';

 // Wysyłanie wiadomości co 6 minut
  const channelId_partnerstwa = '1346609247869337701';
  const serverId = '1348273862365941780';
  setInterval(async () => {
    const channel = client.channels.cache.get(channelId_partnerstwa);
    if (channel) {
      await channel.send('# Masz serwer i szukasz partnerstw? Wbijaj PV!');
    } else {
      console.error(`Nie znaleziono kanału o ID ${channelId_partnerstwa}`);
    }
  }, 6 * 60 * 1000); // 6 minut w milisekundach


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
    partnerstwa: '1332399570872832151' // <-- dodane partnerstwa dla miasta
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
client.once('ready', () => {
  console.log(`✅ Zalogowano jako ${client.user.tag}`);

  // Zimowe
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
  setInterval(() => sendPartnerInvitation(channels.zimowe.partnerstwa), 1 * 60 * 60 * 1000);

  // Miasto
  setInterval(() => sendAd(channels.miasto.minecraft), 1 * 60 * 60 * 1000);
  setInterval(() => sendAd(channels.miasto.miasto6h), 6 * 60 * 60 * 1000);
  setInterval(() => sendAd(channels.miasto.miasto2h), 2 * 60 * 60 * 1000);
  setInterval(() => sendAd(channels.miasto.miasto1h), 1 * 60 * 60 * 1000);
  setInterval(() => sendAd(channels.miasto.miasto30m), 30 * 60 * 1000);
  setInterval(() => sendAd(channels.miasto.miasto15m), 15 * 60 * 1000);
  setInterval(() => sendPartnerInvitation(channels.miasto.partnerstwa), 1 * 60 * 60 * 1000); // NOWE!

  // Hyper
  setInterval(() => sendAd(channels.hyper.hyper101), 1 * 60 * 60 * 1000);
  setInterval(() => sendAd(channels.hyper.hyperall), 1 * 60 * 60 * 1000);
  setInterval(() => sendAd(channels.hyper.hypergraphic), 1 * 60 * 60 * 1000);
  setInterval(() => sendAd(channels.hyper.hypergaming), 1 * 60 * 60 * 1000);
  setInterval(() => sendAd(channels.hyper.hypertechnology), 1 * 60 * 60 * 1000);
  setInterval(() => sendAd(channels.hyper.hypershops), 1 * 60 * 60 * 1000);
  setInterval(() => sendAd(channels.hyper.hyperminecraft), 1 * 60 * 60 * 1000);
  setInterval(() => sendAd(channels.hyper.hyperothers), 1 * 60 * 60 * 1000);
  setInterval(() => sendPartnerInvitation(channels.hyper.hyperpartners), 1 * 60 * 60 * 1000);
  setInterval(() => sendAd(channels.hyper.hyper6h), 6 * 60 * 60 * 1000);
  setInterval(() => sendAd(channels.hyper.hyper2h), 2 * 60 * 60 * 1000);
  setInterval(() => sendAd(channels.hyper.hyper1h), 1 * 60 * 60 * 1000);
  setInterval(() => sendAd(channels.hyper.hyper30m), 30 * 60 * 1000);
});

// FUNKCJE
async function sendAd(channelId) {
  const channel = client.channels.cache.get(channelId);
  if (channel) await channel.send(serverAd);
}

async function sendPartnerInvitation(channelId) {
  const channel = client.channels.cache.get(channelId);
  if (channel) await channel.send('# Posiadasz serwer i szukasz partnerstw? Wbijaj PV!');
}

// DM - obsługa partnerstw
client.on('messageCreate', async (message) => {
  if (!message.guild && !message.author.bot && message.author.id !== client.user.id) {
    const now = Date.now();
    const last = partnershipTimestamps.get(message.author.id);

    if (last && now - last < 7 * 24 * 60 * 60 * 1000) {
      return message.channel.send("⏳ Musisz jeszcze poczekać, zanim będziesz mógł nawiązać kolejne partnerstwo.");
    }

    if (!partneringUsers.has(message.author.id)) {
      partneringUsers.set(message.author.id, null);
      return message.channel.send("🌎 Jeśli chcesz nawiązać partnerstwo, wyślij swoją reklamę (maks. 1 serwer).");
    }

    const userAd = partneringUsers.get(message.author.id);

    if (userAd === null) {
      partneringUsers.set(message.author.id, message.content);
      await message.channel.send(`✅ Wstaw naszą reklamę:\n${serverAd}`);
      return message.channel.send("⏰ Daj znać, gdy wstawisz reklamę!");
    }

    if (message.content.toLowerCase().includes('wstawi') || message.content.toLowerCase().includes('już') || message.content.toLowerCase().includes('gotowe') || message.content.toLowerCase().includes('juz')) {
      const guild = client.guilds.cache.get(partnerGuildID);
      if (!guild) return message.channel.send("❕ Nie znaleziono serwera X-West.");

      const channel = guild.channels.cache.get(partnerChannelID);
      if (!channel) return message.channel.send("❕ Nie znaleziono kanału na partnerstwa X-West.");

      await channel.send(`${userAd}\n\nPartnerstwo z: ${message.author.tag}`);
      await message.channel.send("✅ Dziękujemy za partnerstwo! W razie pytań: @saioshi (saioshi)");

      partnershipTimestamps.set(message.author.id, now);
      partneringUsers.delete(message.author.id);
    }
  }
});

// Obsługa błędów
client.on('error', (error) => console.error('Błąd Discorda:', error));
process.on('unhandledRejection', (error) => console.error('Nieobsłużony błąd:', error));

// LOGOWANIE
client.login(process.env.DISCORD_TOKEN);

