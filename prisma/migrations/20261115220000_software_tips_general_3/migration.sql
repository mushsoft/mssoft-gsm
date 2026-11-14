-- One-time content load (no schema change): 30 general tips (apps, accounts,
-- home tech and safety), each with its own photo from public/tips (free Pexels photos).
-- Fixed ids + ON CONFLICT DO NOTHING: added once, admin edits never overwritten.

INSERT INTO "RepairGuide" ("id", "category", "title", "brand", "modelName", "videoUrl", "thumbnail", "content", "toolsUsed", "createdAt") VALUES
('software-tip-whatsapp-privacy', 'SOFTWARE', 'WhatsApp Privacy Settings Everyone Should Check', 'All brands', 'WhatsApp on Android and iPhone', NULL, '/tips/whatsapp-privacy.jpg',
$tip$Open WhatsApp, Settings, Privacy.

1. Last seen and online, Profile photo, About: choose My contacts (or Nobody) instead of Everyone.
2. Groups: My contacts, so strangers can't add you to scam groups.
3. Read receipts: turn off if you don't want people to see the blue ticks.
4. Calls: turn on Silence unknown callers, and Protect IP address in calls.
5. Blocked contacts: review and add spammers.
6. Privacy checkup (at the top) walks you through everything.

Report and block anyone asking for money, codes or personal photos.$tip$,
ARRAY['WhatsApp'], now() - interval '1200 minutes'),

('software-tip-whatsapp-two-step', 'SOFTWARE', 'Stop WhatsApp Hijacking with Two-Step Verification', 'All brands', 'WhatsApp on Android and iPhone', NULL, '/tips/whatsapp-two-step.jpg',
$tip$Criminals take over WhatsApp accounts by tricking people into sharing the 6-digit SMS code.

1. WhatsApp, Settings, Account, Two-step verification, Turn on.
2. Choose a 6-digit PIN you'll remember (not your birthday or mobile money PIN).
3. Add an email address so you can reset the PIN if forgotten.
4. Also add a passkey if offered (Settings, Account, Passkeys).

Never share the WhatsApp SMS code with anyone, even a "friend" who says it was sent to you by mistake. If your account is stolen, reinstall WhatsApp, verify your number and enter your PIN. Then tell your contacts.$tip$,
ARRAY['WhatsApp'], now() - interval '1201 minutes'),

('software-tip-whatsapp-storage', 'SOFTWARE', 'Free Up Space Used by WhatsApp', 'All brands', 'WhatsApp on Android and iPhone', NULL, '/tips/whatsapp-storage.jpg',
$tip$1. WhatsApp, Settings, Storage and data, Manage storage.
2. Review "Larger than 5 MB" and "Forwarded many times". Select and delete videos and memes you don't need.
3. Each chat is listed by size. Tap a busy group to clear its media.
4. Media auto-download: set "When using mobile data" to No media, or Photos only. Saves data and space.
5. Android: open a group, tap its name, Media visibility, No, so its photos don't fill your gallery.
6. iPhone: Settings, Chats, turn off Save to Photos.

Deleting media inside WhatsApp also removes it from the phone, so save anything important first.$tip$,
ARRAY['WhatsApp'], now() - interval '1202 minutes'),

('software-tip-whatsapp-linked-devices', 'SOFTWARE', 'WhatsApp Web and Linked Devices: Use It on a Computer Safely', 'All brands', 'WhatsApp', NULL, '/tips/whatsapp-linked-devices.jpg',
$tip$1. On the computer, open web.whatsapp.com or install WhatsApp for Windows or Mac.
2. On the phone: WhatsApp, Settings (or three dots), Linked devices, Link a device, then scan the QR code.
3. Up to 4 computers or tablets can be linked. They keep working even when the phone is off.
4. Check regularly: Linked devices shows every computer using your account. Tap any you don't recognise and Log out.
5. On shared or office computers, always log out when done.

Someone reading your chats? An unknown linked device is the most common reason.$tip$,
ARRAY['WhatsApp Web', 'Linked devices'], now() - interval '1203 minutes'),

('software-tip-whatsapp-chat-lock', 'SOFTWARE', 'WhatsApp Chat Lock, Disappearing Messages and View Once', 'All brands', 'WhatsApp', NULL, '/tips/whatsapp-chat-lock.jpg',
$tip$Chat lock:
1. Open the chat, tap the name, Chat lock, turn on.
2. The chat moves to a Locked chats folder that needs your fingerprint, Face ID or a secret code.

Disappearing messages:
1. In the chat, tap the name, Disappearing messages, choose 24 hours, 7 days or 90 days.
2. New messages delete themselves after that time.

View once: tap the "1" icon when sending a photo or voice note. It can be opened only once.

People can still photograph the screen with another phone, so think before sending anything private.$tip$,
ARRAY['WhatsApp'], now() - interval '1204 minutes'),

('software-tip-telegram-security', 'SOFTWARE', 'Secure Your Telegram Account', 'All brands', 'Telegram on Android and iPhone', NULL, '/tips/telegram-security.jpg',
$tip$Open Telegram, Settings, Privacy and Security.

1. Two-Step Verification: set a cloud password and recovery email. Stops SIM swap and code theft.
2. Phone Number: who can see it, set to Nobody or My Contacts.
3. Groups and Channels: who can add you, My Contacts.
4. Active Sessions (Devices): terminate any you don't recognise.
5. Passcode Lock: locks the app with a PIN.

Telegram is full of fake investment, crypto and job channels. Never pay "registration fees" or send money to people you met there.$tip$,
ARRAY['Telegram'], now() - interval '1205 minutes'),

('software-tip-facebook-hacked', 'SOFTWARE', 'Facebook Account Hacked? Get It Back', 'All brands', 'Facebook', NULL, '/tips/facebook-hacked.jpg',
$tip$1. Act fast: go to facebook.com/hacked on any browser and follow the steps.
2. Check your email for messages from Facebook (security@facebookmail.com) saying your email or password changed. They often include a "secure your account" link to undo it.
3. Once in: change the password, then Settings, Accounts Center, Password and security, Where you're logged in. Log out of unknown devices.
4. Remove any email or phone number you don't recognise.
5. Turn on two-factor authentication (see our Facebook 2FA tip).
6. Warn your friends: hackers often ask them for money or mobile money codes.

Ignore people offering to "recover" accounts for a fee. They are scammers.$tip$,
ARRAY['facebook.com/hacked'], now() - interval '1206 minutes'),

('software-tip-facebook-two-factor', 'SOFTWARE', 'Turn On Two-Factor Authentication for Facebook and Instagram', 'All brands', 'Facebook, Instagram', NULL, '/tips/facebook-two-factor.jpg',
$tip$1. Facebook or Instagram: Settings, Accounts Center, Password and security, Two-factor authentication.
2. Choose the account, then a method:
   Authentication app (best): Google Authenticator, Microsoft Authenticator or similar.
   SMS: easier, but weaker if someone steals your SIM.
3. Save the recovery codes somewhere safe (a photo in a private place, or written down).
4. Also turn on login alerts in the same section.

Once on, a stolen password alone can't get into your account.$tip$,
ARRAY['Accounts Center', 'Authenticator app'], now() - interval '1207 minutes'),

('software-tip-instagram-security', 'SOFTWARE', 'Keep Your Instagram Account Safe', 'All brands', 'Instagram', NULL, '/tips/instagram-security.jpg',
$tip$1. Turn on two-factor authentication (see our Facebook and Instagram 2FA tip).
2. Profile, menu, Accounts Center, Password and security, Where you're logged in: log out of strange devices.
3. "Emails from Instagram" (Settings, Security) shows real messages from Instagram. If an email isn't listed there, it's fake.
4. Never fill forms for "verification badges", "copyright violations" or "collab offers". They steal logins.
5. Private account: Settings, Account privacy, if you only want people you approve.
6. Limit who can message and tag you under Settings, Messages and story replies, and Tags and mentions.$tip$,
ARRAY['Instagram'], now() - interval '1208 minutes'),

('software-tip-tiktok-privacy', 'SOFTWARE', 'TikTok Privacy and Safety Settings', 'All brands', 'TikTok', NULL, '/tips/tiktok-privacy.jpg',
$tip$Open your Profile, menu, Settings and privacy, Privacy.

1. Private account: only approved followers see your videos.
2. Suggest your account to others: turn off contacts and Facebook friends if you want to stay low-key.
3. Direct messages: Friends or No one.
4. Comments, Duet and Stitch: limit to Friends.
5. Location: don't post videos showing your home, school uniform or car plate.
6. Family Pairing (Settings, Family Pairing): parents can link to a teen's account and set limits.

Screen time: Settings, Screen time, to set a daily limit for yourself or your children.$tip$,
ARRAY['TikTok'], now() - interval '1209 minutes'),

('software-tip-youtube-save-data', 'SOFTWARE', 'Watch YouTube Without Finishing Your Data Bundle', 'All brands', 'YouTube on Android and iPhone', NULL, '/tips/youtube-save-data.jpg',
$tip$1. YouTube app, profile picture, Settings, General: turn on "Limit mobile data usage" (or "Upload over Wi-Fi only").
2. Settings, Video quality preferences: on mobile networks choose Data saver.
3. Change quality for one video: tap the video, gear icon, Quality.
4. Turn off Autoplay so the next video doesn't start by itself.
5. Turn off "Playback in feeds" (muted previews while scrolling).
6. Download for offline (where available) on Wi-Fi, then watch later with no data.

Video at 1080p can use over 1 GB per hour. 360p or 480p uses a fraction of that.$tip$,
ARRAY['YouTube'], now() - interval '1210 minutes'),

('software-tip-video-calls-tips', 'SOFTWARE', 'Better Video Calls on Zoom, Google Meet and WhatsApp', 'All brands', 'Phones and laptops', NULL, '/tips/video-calls-tips.jpg',
$tip$1. Test before important calls: join a test meeting or call a friend.
2. Internet: stand near the router or use a cable. Turn off downloads and other video on the same Wi-Fi.
3. Light in front of you (a window or lamp), not behind.
4. Use earphones to stop echo, and mute when you're not speaking.
5. Camera at eye level. Prop the laptop on books.
6. Poor connection: turn off your video and keep audio.
7. Data: a video call can use around 1 GB per hour or more. Audio only uses far less.

Share your screen to show a document. Close private tabs and messages first.$tip$,
ARRAY['Zoom', 'Google Meet', 'WhatsApp'], now() - interval '1211 minutes'),

('software-tip-gmail-storage-full', 'SOFTWARE', 'Gmail or Google Storage Full? Free Up Space', 'All brands', 'Google account', NULL, '/tips/gmail-storage-full.jpg',
$tip$Your free 15 GB is shared by Gmail, Google Drive and Google Photos. When it's full, you stop receiving emails.

1. See what uses space: one.google.com/storage (or Google One app, Storage).
2. Gmail: search has:attachment larger:10M and delete big old emails. Then empty Trash and Spam.
3. Google Photos: Free up space and delete large videos and blurry or duplicate photos (see our Google Photos tip).
4. Google Drive: open drive.google.com/drive/quota to list the biggest files first.
5. Old WhatsApp backups count too. Check the Backups section.

Download anything important to a computer or external drive before deleting it.$tip$,
ARRAY['Gmail', 'Google One'], now() - interval '1212 minutes'),

('software-tip-gmail-spam-filters', 'SOFTWARE', 'Gmail: Stop Spam and Organise Emails with Filters', 'All brands', 'Gmail', NULL, '/tips/gmail-spam-filters.jpg',
$tip$1. Spam: open the email and tap Report spam. Gmail learns from it.
2. Newsletters: tap Unsubscribe next to the sender's name.
3. Block a sender: open the email, three dots, Block.
4. Filters (on a computer): click the search options icon in the search bar, enter the sender or words, Create filter. Choose Skip the Inbox, Apply label, Delete or Never send to Spam.
5. Missing an email? Check the Spam, Promotions and Updates tabs.

Never reply to scam emails. It confirms your address is real.$tip$,
ARRAY['Gmail'], now() - interval '1213 minutes'),

('software-tip-google-drive-sharing', 'SOFTWARE', 'Share Google Drive Files Safely', 'All brands', 'Google Drive', NULL, '/tips/google-drive-sharing.jpg',
$tip$1. Right-click the file (or three dots), Share.
2. Add people by email and choose their role: Viewer, Commenter or Editor.
3. General access:
   Restricted: only people you added can open it. Best for private files.
   Anyone with the link: anyone who gets the link can open it. Fine for posters and price lists, not for ID cards or contracts.
4. Stop sharing: open Share again and remove people or set it back to Restricted.
5. "Shared with me" shows files others shared with you.

Check who has access to old files every few months.$tip$,
ARRAY['Google Drive'], now() - interval '1214 minutes'),

('software-tip-router-admin-password', 'SOFTWARE', 'Secure Your Wi-Fi Router: Change the Admin Password', 'All brands', 'Home and office routers', NULL, '/tips/router-admin-password.jpg',
$tip$Many routers still use the default admin password printed on the sticker, so anyone on the Wi-Fi can change its settings.

1. Connect to the router's Wi-Fi or cable.
2. Open a browser and go to the address on the sticker, often 192.168.1.1 or 192.168.0.1.
3. Sign in with the admin username and password from the sticker.
4. Find System, Administration or Management, and set a new strong admin password.
5. Also: turn off WPS and Remote management, and update the firmware if offered.

Router from your internet provider? Some settings are locked. Ask them to help. Write the new password down and keep it safe.$tip$,
ARRAY['Web browser', 'Router admin page'], now() - interval '1215 minutes'),

('software-tip-change-wifi-password', 'SOFTWARE', 'Change Your Wi-Fi Name and Password', 'All brands', 'Home and office routers', NULL, '/tips/change-wifi-password.jpg',
$tip$1. Open the router's admin page (see our router admin tip).
2. Go to Wireless, WLAN or Wi-Fi settings.
3. Change the network name (SSID) if you like. Don't use your name or house number.
4. Security: choose WPA2 or WPA3 (never Open or WEP).
5. Set a password of at least 12 characters and Save.
6. All devices disconnect. Reconnect them with the new password.

MiFi and 4G routers often have their own app or a web page at 192.168.0.1 or 192.168.8.1. Change the password when neighbours or old staff know it.$tip$,
ARRAY['Router admin page'], now() - interval '1216 minutes'),

('software-tip-wifi-signal-placement', 'SOFTWARE', 'Get Better Wi-Fi Signal at Home or in the Shop', 'All brands', 'Home and office Wi-Fi', NULL, '/tips/wifi-signal-placement.jpg',
$tip$1. Put the router in the middle of the space, up high (on a shelf, not on the floor or in a cupboard).
2. Keep it away from thick walls, metal, mirrors, microwaves and water tanks.
3. Point antennas in different directions (one up, one sideways).
4. Use 5 GHz near the router for speed, 2.4 GHz for longer range through walls.
5. Restart the router if it's been on for weeks and is slow.
6. Big house or several floors: add a Wi-Fi extender halfway between the router and the weak area, or a mesh system.
7. Too many devices? Check the router's connected device list and remove ones you don't know.$tip$,
ARRAY['Router'], now() - interval '1217 minutes'),

('software-tip-smart-tv-apps', 'SOFTWARE', 'Smart TV Apps: Install, Update and Free Up Space', 'All brands', 'Android TV, Google TV, Samsung, LG', NULL, '/tips/smart-tv-apps.jpg',
$tip$1. Install apps only from the TV's official store: Google Play (Android and Google TV), Samsung Apps, LG Content Store.
2. Update the TV software: Settings, Support or System, Software update.
3. App slow or crashing: Settings, Apps, choose it, Clear cache. Or uninstall and reinstall.
4. Storage full on Android TV: uninstall apps you don't use.
5. Sign out of YouTube and Netflix before selling the TV.

Avoid unknown "free channels" APK apps. Many carry malware or pirated content and can get blocked. A cheap streaming stick (Chromecast with Google TV, Fire TV) can make an old TV smart.$tip$,
ARRAY['TV app store'], now() - interval '1218 minutes'),

('software-tip-cast-to-tv', 'SOFTWARE', 'Cast YouTube and Netflix from Your Phone to a Smart TV', 'All brands', 'Android, iPhone, smart TV', NULL, '/tips/cast-to-tv.jpg',
$tip$1. Connect the phone and TV to the same Wi-Fi.
2. Open YouTube (or Netflix) on the phone and tap the cast icon at the top.
3. Choose the TV. The video plays on the TV and the phone becomes a remote.
4. Not showing? On the TV's YouTube app: Settings, Link with TV code. In the phone app: Settings, Watch on TV, Enter TV code.
5. Casting uses the TV's own internet, so your phone can be used for other things and doesn't drain its battery.

Whole phone screen instead? See our Screen Cast tip (Android) or AirPlay tip (iPhone).$tip$,
ARRAY['YouTube', 'Smart TV'], now() - interval '1219 minutes'),

('software-tip-smartwatch-pairing', 'SOFTWARE', 'Pair a Smartwatch or Fitness Band with Your Phone', 'All brands', 'Android, iPhone', NULL, '/tips/smartwatch-pairing.jpg',
$tip$1. Install the watch's own app, not just Bluetooth: Galaxy Wearable (Samsung), Wear OS (Google and others), Apple Watch app (iPhone only), Huawei Health, Zepp, Mi Fitness, or the app named in the manual.
2. Charge the watch and turn on Bluetooth and Location on the phone.
3. Pair from inside the app and confirm the code on both screens.
4. Allow notification access so messages show on the watch.
5. Android: turn off battery optimisation for the watch app (Settings, Apps, the app, Battery, Unrestricted), or it disconnects.

Apple Watch only works with iPhone. Most other watches work with both.$tip$,
ARRAY['Watch companion app', 'Bluetooth'], now() - interval '1220 minutes'),

('software-tip-earbuds-pairing', 'SOFTWARE', 'Pair Wireless Earbuds and Fix Connection Problems', 'All brands', 'Android, iPhone, Windows', NULL, '/tips/earbuds-pairing.jpg',
$tip$1. Put the earbuds in the case, open the lid. Many show a pop-up on the phone (Fast Pair, AirPods, Galaxy Buds).
2. No pop-up? Hold the case button, or touch and hold both earbuds, until the light flashes (pairing mode). Then pick them in Bluetooth settings.
3. Connected to another device nearby? Turn off Bluetooth on the old device or forget the earbuds there.
4. Reset: forget the earbuds in Bluetooth, then hold the case button for 10 to 15 seconds (check the manual).
5. Install the maker's app (Galaxy Wearable, Sony, JBL, Soundcore) for updates and controls.

Cheap earbuds may need each bud paired separately. Pair the right one first, then the left.$tip$,
ARRAY['Bluetooth settings'], now() - interval '1221 minutes'),

('software-tip-one-earbud-not-working', 'SOFTWARE', 'One Earbud Not Working or Too Quiet', 'All brands', 'Wireless and wired earbuds', NULL, '/tips/one-earbud-not-working.jpg',
$tip$1. Charge both: put them in the case and check each one's light. Clean the charging contacts with a dry cotton bud.
2. Clean the mesh: earwax blocks sound. Brush gently with a dry soft toothbrush. Never use water or pins.
3. Check balance: Android: Settings, Accessibility, Audio adjustment (balance). iPhone: Settings, Accessibility, Audio and Visual, Balance. Center it and turn off Mono audio.
4. Reset the earbuds (see our pairing tip) and pair again.
5. Try another phone. Still silent? The bud's battery or speaker has failed.

Wired earphones with sound in one side only: try another phone. If it works there, clean the phone's headphone jack.$tip$,
ARRAY['Soft brush', 'Accessibility settings'], now() - interval '1222 minutes'),

('software-tip-power-bank-buying', 'SOFTWARE', 'Buying a Power Bank: Real Capacity, Speed and Safety', 'All brands', 'Power banks', NULL, '/tips/power-bank-buying.jpg',
$tip$1. Capacity: 10,000 mAh charges most phones about 2 times. 20,000 mAh about 4 times. Expect roughly 60 to 70% of the printed number to reach the phone.
2. Fake capacity: a light, cheap "50,000 mAh" power bank is usually far smaller. Real large ones are heavy.
3. Speed: look for USB-C PD (18 W or 20 W and up) for fast charging, and enough ports for your devices.
4. Safety: buy known brands from trusted shops. Avoid swollen, hot or dented power banks.
5. Flights: carry it in hand luggage. Most airlines allow up to 100 Wh (about 27,000 mAh).
6. Recharge it every few months even when unused.$tip$,
ARRAY['Power bank'], now() - interval '1223 minutes'),

('software-tip-online-shopping-safety', 'SOFTWARE', 'Shop Online Safely and Avoid Fake Sellers', 'All brands', 'Phones and computers', NULL, '/tips/online-shopping-safety.jpg',
$tip$1. Buy from known shops and websites with a physical address and phone number.
2. Social media sellers: check how long the page has existed, real customer comments, and ask for a video of the item.
3. Prices far below everyone else are usually scams.
4. Prefer pay on delivery, or pay only after seeing the item for expensive things like phones.
5. Check the website address carefully and look for https.
6. Never send "delivery fees" or "deposits" by mobile money to strangers before seeing anything.
7. Keep receipts, chats and transaction IDs in case something goes wrong.

When collecting, test the phone or laptop before paying the balance (see our used phone checklist).$tip$,
ARRAY['Common sense'], now() - interval '1224 minutes'),

('software-tip-mobile-money-app-security', 'SOFTWARE', 'Mobile Money and Banking Apps: Security Habits', 'All brands', 'Android, iPhone', NULL, '/tips/mobile-money-app-security.jpg',
$tip$1. Download the official app only from the Play Store or App Store. Check the developer name.
2. Use a strong PIN that's not your birth year, and never share it, even with "agents" or "customer care".
3. Turn on the app's fingerprint or Face ID login, and lock the phone with a PIN.
4. Before confirming, check the recipient's name that appears.
5. Sent to the wrong number? Contact your provider at once through official channels to request a reversal.
6. Real transaction messages come from the provider's official sender name, not a normal phone number.
7. Set a SIM PIN (see our SIM PIN tip) and keep only what you need on the wallet.$tip$,
ARRAY['Official app', 'PIN'], now() - interval '1225 minutes'),

('software-tip-backup-3-2-1', 'SOFTWARE', 'The 3-2-1 Backup Rule: Never Lose Photos and Documents Again', 'All brands', 'Phones and computers', NULL, '/tips/backup-3-2-1.jpg',
$tip$Phones get stolen, laptops fail, and ransomware locks files. Follow 3-2-1:

3 copies of important files (the original plus two backups).
2 different types of storage (for example the laptop and an external drive).
1 copy in a different place (cloud storage like Google Drive, OneDrive or iCloud, or a drive kept at another location).

Example: photos on the phone, backed up to Google Photos, and copied to an external drive every month.

Test your backup: try opening a few files from it. A backup you've never checked might not work when you need it.$tip$,
ARRAY['External drive', 'Cloud storage'], now() - interval '1226 minutes'),

('software-tip-old-phone-recycling', 'SOFTWARE', 'Getting Rid of an Old Phone Safely', 'All brands', 'All phones', NULL, '/tips/old-phone-recycling.jpg',
$tip$1. Back up photos, contacts and chats (see our backup tips).
2. Sign out of Google, Samsung, Apple ID, WhatsApp and banking apps.
3. Factory reset it (see our factory reset tip). Modern phones encrypt data, so a reset makes it unreadable.
4. Remove the SIM and memory card.
5. Sell, give it to family, trade it in, or take it to an electronics recycling (e-waste) collection point.
6. Never burn phones or throw batteries in normal rubbish. Lithium batteries can catch fire and poison soil and water.

Broken phone that won't turn on? Its screen, camera and other parts may still be useful for repairs.$tip$,
ARRAY['Factory reset'], now() - interval '1227 minutes'),

('software-tip-battery-myths', 'SOFTWARE', 'Phone Battery Myths and What Really Helps', 'All brands', 'All phones and laptops', NULL, '/tips/battery-myths.jpg',
$tip$Myth: let the battery drop to 0% before charging. Truth: modern lithium batteries prefer staying between about 20% and 80%. Deep discharges wear them faster.
Myth: a new phone must charge for 8 hours first. Truth: not needed.
Myth: charging overnight destroys the battery. Truth: phones stop at 100%, but heat and staying at 100% add wear. Use battery protection if available (see our tips).
Myth: closing all apps saves battery. Truth: reopening apps often uses more. Close only apps that misbehave.

What really helps: avoid heat (sun, car dashboard, charging under pillows), use good chargers, lower screen brightness, and keep software updated.$tip$,
ARRAY['Battery settings'], now() - interval '1228 minutes'),

('software-tip-kids-tablet-setup', 'SOFTWARE', 'Set Up a Phone or Tablet for a Young Child', 'All brands', 'Android, iPad', NULL, '/tips/kids-tablet-setup.jpg',
$tip$1. Use a kids mode: Samsung Kids, Google Kids Space (on some tablets), or Family Link and Screen Time for older children (see our tips).
2. Install YouTube Kids and choose the age level.
3. Turn off in-app purchases, or require a parent password for every download.
4. Set daily time limits and a bedtime.
5. Limit headphone volume (see our sound tips).
6. Put a strong case and screen protector on it. Children drop devices.
7. Keep it in shared rooms and sit with young children while they use it.

Check the apps they use every few weeks, and talk about not chatting with strangers online.$tip$,
ARRAY['Samsung Kids', 'YouTube Kids', 'Family Link'], now() - interval '1229 minutes')
ON CONFLICT ("id") DO NOTHING;
