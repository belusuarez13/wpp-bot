const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const cron = require('node-cron');

const client = new Client({
    authStrategy: new LocalAuth() // Saves session locally
});

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('WhatsApp Bot is ready!');
    
    // Schedule weekly reminder (e.g., every Monday at 9 AM)
    // cron.schedule('0 9 * * 1', () => {
        sendReminder();
    // });
});

async function sendReminder() {
    const groupName = "We r Family";
    const chats = await client.getChats();
    const group = chats.find(chat => chat.isGroup && chat.name.includes(groupName));
    console.log(group)
    
    if (group) {
        client.sendMessage(group.id._serialized, "📢 Hola");
        console.log("Reminder sent to group:", groupName);
    } else {
        console.log("Group not found!");
    }
}

client.initialize();
