const { Client, Intents } = require('discord.js-selfbot-v13');
const express = require('express');
const app = express();
const PORT = 8080;

const client = new Client({ checkUpdate: false });

// EXPRESS
app.get('/', (req, res) => {
  res.send('Self-bot działa na Render! 🚀');
});
app.listen(PORT, () => {
  console.log(`🌐 Serwer Express działa na porcie ${PORT}`);
});

// ZMIENNE
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
    partnerstwa: '1346609247869337701' // <-- zimoweauto (to nowe co dodajesz)
  },
  miasto: {
    partnerstwa: '1332399570872832151' // <-- miasto
  },
  hyper: {
    hyperpartners: '1286351421691793466' // <-- hyper
  }
};

// PARTNERSTWA - WIADOMOŚĆ
const partnerMessage = '# Masz serwer i chcesz partnerstwo? Wbijaj pv!';

// KLIENT GOTOWY
client.once('ready', async () => {
  console.log(`✅ Zalogowano jako ${client.user.tag}`);

  // Wysyłanie reklam (zimowe, hyper, miasto)
  startSendingAds();

  // Wysyłanie partnerstw
  startSendingPartnerInvites();
});

// FUNKCJE
async function sendAd(channelId) {
  try {
    let channel = client.channels.cache.get(channelId) || await client.channels.fetch(channelId);
    if (!channel) return console.error(`❌ Nie znaleziono kanału ${channelId}`);
    await channel.send(serverAd);
    console.log(`✅ Wysłano reklamę na kanał ${channel.name}`);
  } catch (error) {
    console.error(`❌ Błąd przy wysyłaniu reklamy:`, error);
  }
}

async function sendPartnerInvite(channelId) {
  try {
    let channel = client.channels.cache.get(channelId) || await client.channels.fetch(channelId);
    if (!channel) return console.error(`❌ Nie znaleziono kanału ${channelId}`);
    await channel.send(partnerMessage);
    console.log(`✅ Wysłano partnerstwo na kanał ${channel.name}`);
  } catch (error) {
    console.error(`❌ Błąd przy wysyłaniu partnerstwa:`, error);
  }
}

function startSendingAds() {
  // Reklamy na zimowe co 6 minut
  setInterval(() => {
    sendAd(channels.zimowe.gaming);
    sendAd(channels.zimowe.shops);
    sendAd(channels.zimowe.gv);
    sendAd(channels.zimowe.thematic);
    sendAd(channels.zimowe.minecraft);
    sendAd(channels.zimowe.tech);
    sendAd(channels.zimowe.hosting);
    sendAd(channels.zimowe.programing);
  }, 6 * 60 * 1000);

  // Reklamy na hyper co 1 godzinę
  setInterval(() => {
    sendAd(channels.hyper.hyperpartners);
  }, 1 * 60 * 60 * 1000);

  // Reklamy na miasto co 2 godziny
  setInterval(() => {
    sendAd(channels.miasto.partnerstwa);
  }, 2 * 60 * 60 * 1000);
}

function startSendingPartnerInvites() {
  // Partnerstwo na zimoweauto co 6 minut
  setInterval(() => {
    sendPartnerInvite(channels.zimowe.partnerstwa);
  }, 6 * 60 * 1000);

  // Partnerstwo na miasto co 2 godziny
  setInterval(() => {
    sendPartnerInvite(channels.miasto.partnerstwa);
  }, 2 * 60 * 60 * 1000);

  // Partnerstwo na hyper co 1 godzinę
  setInterval(() => {
    sendPartnerInvite(channels.hyper.hyperpartners);
  }, 1 * 60 * 60 * 1000);
}

// LOGOWANIE
client.login(process.env.DISCORD_TOKEN);
