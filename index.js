const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const TOKEN = process.env.WHATSAPP_TOKEN;
const PHONE_ID = process.env.PHONE_ID;
app.get('/debug', (req, res) => res.send('TOKEN INAYOONEKANA NI: [' + process.env.VERIFY_TOKEN + ']'));

app.get('/webhook', (req, res) => {
  if (req.query['hub.verify_token'] === VERIFY_TOKEN) {
    res.send(req.query['hub.challenge']);
  } else { res.sendStatus(403); }
});

app.post('/webhook', async (req, res) => {
  try {
    let entry = req.body.entry?.[0]?.changes?.[0]?.value;
    let msg = entry?.messages?.[0];
    if (msg) {
      let from = msg.from;
      let text = msg.text?.body?.toLowerCase() || "";
      let reply = "";

      if (text.includes("mambo") || text.includes("hi") || text.includes("hello") || text.includes("bei") || text === "0") {
        reply = "Karibu MINTRA PRINTING Morogoro Ruaha! 🖨️👕\n\nTunapatikana Morogoro, Ruaha.\n\nChagua huduma:\n\n1️⃣ T-SHIRT Printing\n2️⃣ Vikombe\n3️⃣ Chupa\n4️⃣ Vitabu - 15,000/=\n5️⃣ Ongea na MINTRA\n\nJibu kwa namba, mf: 1";
      }
      else if (text === "1") {
        reply = "👕 T-SHIRT PRINTING\n\nBei ya kuchapa: Kuanzia 7,000/= hadi 18,000/=\n\nBei inategemea:\n- Idadi unayotaka (ukichukua nyingi bei inapungua)\n- Kama una design tayari au tunakuchorea\n- Rangi ya T-Shirt\n\nNiambie unataka T-Shirt ngapi ili nikupe bei kamili?\n\nAu andika *5* kuongea na MINTRA.";
      }
      else if (text === "2") {
        reply = "☕ VIKOMBE\n\nBei ya kuchapa Kikombe: Kuanzia 7,000/= hadi 18,000/=\n\nInategemea idadi na design unayotaka.\n\nUnataka vikombe vingapi?\n\nAu andika *5* kuongea na MINTRA.";
      }
      else if (text === "3") {
        reply = "🍶 CHUPA\n\nBei ya kuchapa Chupa: Kuanzia 7,000/= hadi 18,000/=\n\nInategemea idadi na design unayotaka.\n\nUnataka chupa ngapi?\n\nAu andika *5* kuongea na MINTRA.";
      }
      else if (text === "4") {
        reply = "📚 VITABU VYA AINA YOTE\n\nBei: 15,000/= kwa kitabu\n\nTunauza vitabu vya aina yote - vya shule, vya dini, na vya kusoma.\n\nNiambie unatafuta kitabu gani? Jina na darasa?\n\nAu andika *5* kuongea na MINTRA.";
      }
      else if (text === "5") {
        reply = "Sawa! ✅\n\nNamba ya MINTRA Printing ni: 0775366515\nTunapatikana Morogoro, Ruaha.\n\nNimemtumia ujumbe wako, atakujibu sasa hivi. Karibu sana!";
      }
      else {
        reply = "Samahani sikuelewa. Andika *Mambo* ili uone menu ya MINTRA PRINTING.";
      }

      await axios.post(`https://graph.facebook.com/v21.0/${PHONE_ID}/messages`, {
        messaging_product: "whatsapp",
        to: from,
        text: { body: reply }
      }, { headers: { Authorization: `Bearer ${TOKEN}` } });
    }
    res.sendStatus(200);
  } catch (e) { console.log(e.message); res.sendStatus(200); }
});

app.listen(3000, () => console.log("Mintra Bot iko hai"));
