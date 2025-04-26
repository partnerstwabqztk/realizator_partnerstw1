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

// Reklama serwera
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
https://media.discordapp.net/attachments/1327529385611493447/1340104080818962443/reklama.png?ex=67b124ae&is=67afd32e&hm=4b586733bbb88251125e8ddfff59d15fab3443edfa675ee5135a5b6b51352698&=&format=webp&quality=lossless

🎨 **X-West Official Studios – Twoje pomysły, nasza pasja!** 🎨
`;

// Mapy do partnerstw
const partneringUsers = new Map();
const partnershipTimestamps = new Map();

// === Serwer 1 (Zimowe) ===
const zimoweChannels = {
  partnerstwa: '1346609247869337701',
  gaming: '1346609270933946490',
  shops: '1346609275761332325',
  gv: '1346609282174685264',
  thematic: '1346609283932094529',
  minecraft: '1346609287048204378',
  tech: '1346609290332602420',
  hosting: '1347263942975557633',
  programming: '1346609292425429194',
  zima6h: '1346609312042324060',
  zima4h: '1346609313329971293',
  zima2h: '1346609314927743047',
  zima1h: '1346609316190486528',
  zima30m: '1346609317335531632',
  zima15m: '1346609318476255293'
};

// === Serwer 2 (Miasto) ===
const miastoChannels = {
  partnerstwa: '1332399570872832151',
  shops: '1300543498310778961',
  hostings: '1300541497627902054',
  gaming: '1286056456961134702',
  thematic: '1254167088017440950',
  minecraft: '1254183529076756611',
  miasto6h: '1254123088103346247',
  miasto2h: '1254163564264947782',
  miasto1h: '1254163875620982834',
  miasto30m: '1254164476757020692',
  miasto15m: '1254165150978539520'
};

// === Serwer 3 (HyperADS) ===
const hyperChannels = {
  hyper101_500: '1286351421691793461',
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
};

client.once('ready', () => {
  console.log(`Bot ${client.user.tag} jest gotowy.`);

  // Zimowe - 11/16 minuty
  const zimowe11min = [
    zimoweChannels.gaming,
    zimoweChannels.shops,
    zimoweChannels.gv,
    zimoweChannels.thematic,
    zimoweChannels.minecraft,
    zimoweChannels.programming
  ];
  zimowe11min.forEach(id => {
    setInterval(() => {
      const channel = client.channels.cache.get(id);
      if (channel) channel.send(serverAd);
    }, 11 * 60 * 1000);
  });

  [zimoweChannels.tech, zimoweChannels.hosting].forEach(id => {
    setInterval(() => {
      const channel = client.channels.cache.get(id);
      if (channel) channel.send(serverAd);
    }, 16 * 60 * 1000);
  });

  // Zimowe - większe odstępy
  setInterval(() => client.channels.cache.get(zimoweChannels.zima6h)?.send(serverAd), 6 * 60 * 60 * 1000);
  setInterval(() => client.channels.cache.get(zimoweChannels.zima4h)?.send(serverAd), 4 * 60 * 60 * 1000);
  setInterval(() => client.channels.cache.get(zimoweChannels.zima2h)?.send(serverAd), 2 * 60 * 60 * 1000);
  setInterval(() => client.channels.cache.get(zimoweChannels.zima1h)?.send(serverAd), 1 * 60 * 60 * 1000);
  setInterval(() => client.channels.cache.get(zimoweChannels.zima30m)?.send(serverAd), 30 * 60 * 1000);
  setInterval(() => client.channels.cache.get(zimoweChannels.zima15m)?.send(serverAd), 15 * 60 * 1000);
  setInterval(() => client.channels.cache.get(zimoweChannels.partnerstwa)?.send("# Szukam partnerstw! Masz serwer? Wbij na PV!"), 6 * 60 * 1000);

  // Miasto
  setInterval(() => {
    [
      miastoChannels.shops,
      miastoChannels.hostings,
      miastoChannels.gaming,
      miastoChannels.thematic,
      miastoChannels.miasto2h
    ].forEach(id => {
      const channel = client.channels.cache.get(id);
      if (channel) channel.send(serverAd);
    });
  }, 2 * 60 * 60 * 1000);

  setInterval(() => client.channels.cache.get(miastoChannels.minecraft)?.send(serverAd), 30 * 60 * 1000);
  setInterval(() => client.channels.cache.get(miastoChannels.miasto6h)?.send(serverAd), 6 * 60 * 60 * 1000);
  setInterval(() => client.channels.cache.get(miastoChannels.miasto1h)?.send(serverAd), 1 * 60 * 60 * 1000);
  setInterval(() => client.channels.cache.get(miastoChannels.miasto30m)?.send(serverAd), 30 * 60 * 1000);
  setInterval(() => client.channels.cache.get(miastoChannels.miasto15m)?.send(serverAd), 15 * 60 * 1000);

  // HyperADS
  const hyperHourly = [
    hyperChannels.hyper101_500,
    hyperChannels.hyperall,
    hyperChannels.hypergraphic,
    hyperChannels.hypergaming,
    hyperChannels.hypertechnology,
    hyperChannels.hypershops,
    hyperChannels.hyperminecraft,
    hyperChannels.hyperothers
  ];
  hyperHourly.forEach(id => {
    setInterval(() => {
      const channel = client.channels.cache.get(id);
      if (channel) channel.send(serverAd);
    }, 1 * 60 * 60 * 1000);
  });

  setInterval(() => client.channels.cache.get(hyperChannels.hyperpartners)?.send("# Partnerstwo? Wbij na PV!"), 1 * 60 * 60 * 1000);
  setInterval(() => client.channels.cache.get(hyperChannels.hyper6h)?.send(serverAd), 6 * 60 * 60 * 1000);
  setInterval(() => client.channels.cache.get(hyperChannels.hyper2h)?.send(serverAd), 2 * 60 * 60 * 1000);
  setInterval(() => client.channels.cache.get(hyperChannels.hyper1h)?.send(serverAd), 1 * 60 * 60 * 1000);
  setInterval(() => client.channels.cache.get(hyperChannels.hyper30m)?.send(serverAd), 30 * 60 * 1000);
});

// Obsługa błędów
client.on('error', console.error);
process.on('unhandledRejection', console.error);

client.login(process.env.DISCORD_TOKEN);

