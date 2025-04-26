const { Client, Intents, MessageEmbed } = require('discord.js-selfbot-v13');
const express = require('express');
const app = express();
const PORT = 8080;

const client = new Client({
  checkUpdate: false,
});

app.get('/', (req, res) => {
  res.send('Self-bot działa na Render! 🚀');
});

app.listen(PORT, () => {
  console.log(`Serwer pingujący działa na porcie ${PORT}`);
});

// Tekst reklamy:
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

👉 **Chcesz się wyróżnić? Dołącz teraz!**  
https://discord.gg/CwVrjqqhmJ  
https://media.discordapp.net/attachments/1327529385611493447/1340104080818962443/reklama.png?ex=67b124ae&is=67afd32e&hm=4b586733bbb88251125e8ddfff59d15fab3443edfa675ee5135a5b6b51352698&=&format=webp&quality=lossless

🎨 **X-West Official Studios – Twoje pomysły, nasza pasja!** 🎨
`;

// Kanały reklamowe
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
    miasto15m: '1254165150978539520'
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

const partneringUsers = new Map();
const partnershipTimestamps = new Map();

client.once('ready', () => {
  console.log(`Bot ${client.user.tag} jest gotowy.`);

  // Partnerstwa (co 6 min)
  setInterval(async () => {
    const channel = client.channels.cache.get(channels.zimowe.partnerstwa);
    if (channel) await channel.send('# Partnerstwo? PV!');
  }, 6 * 60 * 1000);

  // Zimowe reklamy (co 11 i 16 minut)
  setInterval(() => sendBatch([
    channels.zimowe.gaming,
    channels.zimowe.shops,
    channels.zimowe.gv,
    channels.zimowe.thematic,
    channels.zimowe.minecraft,
    channels.zimowe.programing
  ]), 11 * 60 * 1000);

  setInterval(() => sendBatch([
    channels.zimowe.tech,
    channels.zimowe.hosting
  ]), 16 * 60 * 1000);

  // Zimowe dłuższe
  setInterval(() => sendBatch([
    channels.zimowe.zima6h
  ]), 6 * 60 * 60 * 1000);

  setInterval(() => sendBatch([
    channels.zimowe.zima4h
  ]), 4 * 60 * 60 * 1000);

  setInterval(() => sendBatch([
    channels.zimowe.zima2h
  ]), 2 * 60 * 60 * 1000);

  setInterval(() => sendBatch([
    channels.zimowe.zima1h
  ]), 1 * 60 * 60 * 1000);

  setInterval(() => sendBatch([
    channels.zimowe.zima30m
  ]), 30 * 60 * 1000);

  setInterval(() => sendBatch([
    channels.zimowe.zima15m
  ]), 15 * 60 * 1000);

  // Miasto serwery
  setInterval(() => sendBatch([
    channels.miasto.minecraft
  ]), 30 * 60 * 1000);

  setInterval(() => sendBatch([
    channels.miasto.miasto6h
  ]), 6 * 60 * 60 * 1000);

  setInterval(() => sendBatch([
    channels.miasto.miasto2h
  ]), 2 * 60 * 60 * 1000);

  setInterval(() => sendBatch([
    channels.miasto.miasto1h
  ]), 1 * 60 * 60 * 1000);

  setInterval(() => sendBatch([
    channels.miasto.miasto30m
  ]), 30 * 60 * 1000);

  setInterval(() => sendBatch([
    channels.miasto.miasto15m
  ]), 15 * 60 * 1000);

  // HyperADS serwery
  setInterval(() => sendBatch([
    channels.hyper.hyper101,
    channels.hyper.hyperall,
    channels.hyper.hypergraphic,
    channels.hyper.hypergaming,
    channels.hyper.hypertechnology,
    channels.hyper.hypershops,
    channels.hyper.hyperminecraft,
    channels.hyper.hyperothers
  ]), 1 * 60 * 60 * 1000);

  setInterval(() => sendBatch([
    channels.hyper.hyperpartners
  ]), 1 * 60 * 60 * 1000);

  setInterval(() => sendBatch([
    channels.hyper.hyper6h
  ]), 6 * 60 * 60 * 1000);

  setInterval(() => sendBatch([
    channels.hyper.hyper2h
  ]), 2 * 60 * 60 * 1000);

  setInterval(() => sendBatch([
    channels.hyper.hyper30m
  ]), 30 * 60 * 1000);
});

async function sendBatch(channelIds) {
  for (const id of channelIds) {
    const channel = client.channels.cache.get(id);
    if (channel) await channel.send(serverAd);
  }
}

// Obsługa wiadomości DM (partnerstwa)
client.on('messageCreate', async (message) => {
  if (!message.guild && !message.author.bot && message.author.id !== client.user.id) {
    const now = Date.now();
    const last = partnershipTimestamps.get(message.author.id);

    if (!partneringUsers.has(message.author.id)) {
      partneringUsers.set(message.author.id, null);
      return message.channel.send('📩 Wyślij reklamę swojego serwera!');
    }

    if (last && now - last < 7 * 24 * 60 * 60 * 1000) {
      return message.channel.send('⏳ Musisz poczekać tydzień na kolejne partnerstwo.');
    }

    const userAd = partneringUsers.get(message.author.id);

    if (userAd === null) {
      partneringUsers.set(message.author.id, message.content);
      await message.channel.send(`✅ Świetnie! Teraz wstaw naszą reklamę:\n${serverAd}`);
      return message.channel.send('✅ Kiedy wstawisz, napisz coś jak "gotowe".');
    }

    if (message.content.toLowerCase().includes('gotowe') || message.content.toLowerCase().includes('wstawione') || message.content.toLowerCase().includes('już')) {
      await message.channel.send('Czy muszę dołączyć na Twój serwer? (tak/nie)');
      
      const filter = m => m.author.id === message.author.id;
      const collected = await message.channel.awaitMessages({ filter, max: 1, time: 60000 }).catch(() => null);

      if (collected && collected.first() && collected.first().content.toLowerCase().includes('tak')) {
        const owner = await client.users.fetch('862038729027354674');
        await owner.send(`Dołącz na serwer partnera:\n${userAd}`);
      }

      await message.channel.send('✅ Partnerstwo zakończone! Dzięki!');
      partnershipTimestamps.set(message.author.id, now);
      partneringUsers.delete(message.author.id);
    }
  }
});

client.login(process.env.DISCORD_TOKEN);

