-- One-time content load (no schema change): 25 Android settings tips, each
-- with a thumbnail from public/tips (free Pexels photos).
-- Fixed ids + ON CONFLICT DO NOTHING: added once, admin edits never overwritten.
-- Menu names vary a little between brands (Samsung, Tecno, Infinix, Xiaomi);
-- the Settings search box finds any of them by name.

INSERT INTO "RepairGuide" ("id", "category", "title", "brand", "modelName", "videoUrl", "thumbnail", "content", "toolsUsed", "createdAt") VALUES
('software-tip-android-fingerprint-face', 'SOFTWARE', 'Set Up Fingerprint and Face Unlock on Android', '', '', NULL, '/tips/fingerprint-unlock.jpg',
$tip$1. Settings, then Security and privacy (or Biometrics and security), then Fingerprint or Face unlock.
2. Set a PIN, pattern or password first if asked. It's needed as a backup.
3. Fingerprint: lift and place your finger again and again until it's 100 percent. Add a second finger.
4. Face unlock on most phones is less secure than fingerprint, because a photo can sometimes fool it. Use fingerprint for banking and mobile money apps.
5. Fingerprint stopped working after a screen replacement? In-screen fingerprint readers need a compatible, good quality screen. Ask us before replacing.$tip$,
ARRAY['Android Settings'], now() - interval '300 minutes'),

('software-tip-android-dark-mode', 'SOFTWARE', 'Turn On Dark Mode and Eye Comfort on Android', '', '', NULL, '/tips/phone-settings-yellow.jpg',
$tip$1. Dark mode: Settings, then Display, then Dark theme (or Dark mode). Schedule it for sunset if you like.
2. Eye comfort or Night Light (warmer colours at night): Settings, then Display, then Eye comfort shield (Samsung) or Night light.
3. Quick toggles: swipe down twice and look for Dark theme and Eye comfort in Quick Settings. Tap the pencil icon to add them.
4. On phones with AMOLED screens, dark mode also saves battery.$tip$,
ARRAY['Display Settings', 'Quick Settings'], now() - interval '299 minutes'),

('software-tip-android-default-apps', 'SOFTWARE', 'Change Default Apps on Android', '', '', NULL, '/tips/apps-screen.jpg',
$tip$Choose which app opens links, calls, SMS and the home screen.

1. Settings, then Apps, then Default apps (sometimes under the three-dot menu in Apps).
2. Browser app: pick Chrome or another browser.
3. Phone and SMS app: choose which app handles calls and messages.
4. Home app: switch launchers. If a strange launcher full of ads took over, change it back here and uninstall the ad app.
5. Opening links: Settings, then Apps, choose an app (for example YouTube), then "Open by default", to control which links it opens.$tip$,
ARRAY['Android Settings'], now() - interval '298 minutes'),

('software-tip-android-permissions', 'SOFTWARE', 'Check Which Apps Use Your Camera, Mic and Location', '', '', NULL, '/tips/phone-settings-hand.jpg',
$tip$1. Settings, then Security and privacy, then Privacy, then Permission manager.
2. Tap Camera, Microphone, Location, Contacts or SMS to see every app that can use them.
3. Change apps you don't trust to "Ask every time" or "Don't allow".
4. Privacy dashboard (Android 12 and newer): shows which apps used the camera, mic or location in the last 24 hours.
5. A green dot at the top right of the screen means the camera or mic is in use right now. Swipe down to see which app.$tip$,
ARRAY['Permission manager'], now() - interval '297 minutes'),

('software-tip-android-digital-wellbeing', 'SOFTWARE', 'Limit Screen Time with Digital Wellbeing', '', '', NULL, '/tips/person-smartphone.jpg',
$tip$1. Settings, then Digital Wellbeing and parental controls.
2. The dashboard shows screen time, notifications and unlocks per app.
3. App timers: tap an app and set a daily limit. The app pauses when time is up.
4. Bedtime mode: turns the screen grey and silences notifications at night.
5. Focus mode: pause distracting apps while working or studying.

For children, use Google Family Link (see our parental controls tip).$tip$,
ARRAY['Digital Wellbeing'], now() - interval '296 minutes'),

('software-tip-android-do-not-disturb', 'SOFTWARE', 'Set Up Do Not Disturb Without Missing Important Calls', '', '', NULL, '/tips/phone-settings-hand.jpg',
$tip$1. Settings, then Notifications (or Sound), then Do Not Disturb.
2. People: allow calls from starred contacts, and turn on "Allow repeat callers" so someone calling twice in 15 minutes gets through.
3. Apps: allow important apps like mobile money, banking or work chats.
4. Schedules: set it for sleep, for example 10 PM to 6 AM.
5. Not getting calls? Swipe down and check that Do Not Disturb is off. A small minus or moon icon at the top means it's on.$tip$,
ARRAY['Android Settings'], now() - interval '295 minutes'),

('software-tip-android-battery-settings', 'SOFTWARE', 'Android Battery Settings That Really Help', '', '', NULL, '/tips/power-bank.jpg',
$tip$1. Adaptive battery: Settings, then Battery, then Adaptive preferences (or More battery settings). It limits apps you rarely use.
2. Battery saver: turn it on at 20 percent automatically.
3. Protect battery: many Samsung phones can stop charging at 80 or 85 percent (Settings, then Battery, then More battery settings, then Protect battery). Great for phones that stay plugged in.
4. Background usage: restrict apps that drain battery but don't need to run in the background.
5. Screen: lower brightness, shorten screen timeout to 30 seconds, and use dark mode on AMOLED screens.$tip$,
ARRAY['Battery Settings'], now() - interval '294 minutes'),

('software-tip-android-data-saver', 'SOFTWARE', 'Stop Mobile Data Finishing Fast on Android', '', '', NULL, '/tips/sim-yellow.jpg',
$tip$1. See which apps use data: Settings, then Network and internet (or Connections), then Data usage, then Mobile data usage.
2. Data saver: turn it on to stop apps using data in the background.
3. Set a data warning and limit: in the same menu, set a warning before your bundle runs out.
4. Restrict background data for big users like Facebook, TikTok and YouTube (tap the app, then Mobile data).
5. App updates on Wi-Fi only: Play Store, then profile, then Settings, then Network preferences.
6. WhatsApp: Settings, then Storage and data, and turn off auto-download of videos on mobile data.$tip$,
ARRAY['Data usage settings'], now() - interval '293 minutes'),

('software-tip-android-dual-sim', 'SOFTWARE', 'Choose Which SIM Is Used for Calls, SMS and Data', '', '', NULL, '/tips/sim-ejector.jpg',
$tip$1. Settings, then Network and internet (or Connections), then SIMs (or SIM manager).
2. Mobile data: choose the SIM with the cheapest bundle.
3. Calls: choose a SIM, or "Ask every time" to pick for each call.
4. SMS: choose a SIM.
5. Give each SIM a name and colour (for example "MTN" and "Airtel") so you can tell them apart.
6. One SIM not working? Turn each SIM off and on in the same menu, then see our SIM not detected tip.$tip$,
ARRAY['SIM manager'], now() - interval '292 minutes'),

('software-tip-android-ringtone', 'SOFTWARE', 'Set a Custom Ringtone on Android', '', '', NULL, '/tips/earbuds-phone.jpg',
$tip$1. Settings, then Sound and vibration, then Phone ringtone.
2. Pick a built-in tone, or tap the plus or "From internal storage" option to choose a song saved on the phone.
3. Dual SIM phones can set a different ringtone for each SIM.
4. One person, one ringtone: open the contact, tap the three dots (or Edit), then Set ringtone.
5. Notification sound: Settings, then Sound and vibration, then Default notification sound. Apps like WhatsApp have their own sound settings too.$tip$,
ARRAY['Sound Settings'], now() - interval '291 minutes'),

('software-tip-android-text-size', 'SOFTWARE', 'Make Text and Icons Bigger on Android', '', '', NULL, '/tips/phone-settings-yellow.jpg',
$tip$1. Settings, then Display, then Font size (or Font size and style). Drag the slider.
2. Display size (or Screen zoom) makes icons and buttons bigger too.
3. Turn on Bold text on the same screen.
4. Magnification: Settings, then Accessibility, then Magnification. Triple tap the screen to zoom in.
5. Simple mode (Samsung Easy mode, Tecno and Infinix Simple mode): bigger icons and a simpler home screen. Great for older users.$tip$,
ARRAY['Display Settings', 'Accessibility'], now() - interval '290 minutes'),

('software-tip-android-lockscreen-notifications', 'SOFTWARE', 'Hide Private Messages on the Lock Screen', '', '', NULL, '/tips/alert-message-2.jpg',
$tip$Anyone who picks up your phone can read message previews on the lock screen.

1. Settings, then Notifications, then Notifications on lock screen (or Lock screen).
2. Choose "Show conversations, default and silent" without content, "Hide sensitive notifications", or "Don't show any notifications".
3. WhatsApp can hide previews itself: WhatsApp, then Settings, then Notifications, then turn off Show preview.
4. Mobile money and bank SMS often contain codes. Hiding sensitive content keeps them private.$tip$,
ARRAY['Notification Settings'], now() - interval '289 minutes'),

('software-tip-google-password-manager', 'SOFTWARE', 'Save and Check Passwords with Google Password Manager', '', '', NULL, '/tips/google-settings.jpg',
$tip$1. Settings, then Google, then Autofill, then Google Password Manager (or open passwords.google.com).
2. When you sign in to an app or website, tap Save when Google offers to remember the password.
3. Password Checkup: shows passwords that are weak, reused or leaked in a data breach. Change those first.
4. To see a saved password, tap the website and confirm with your fingerprint or PIN.
5. Use passkeys where offered: you sign in with your fingerprint instead of a password.

Never use the same password for your Google account and other sites.$tip$,
ARRAY['Google Password Manager'], now() - interval '288 minutes'),

('software-tip-google-2-step-verification', 'SOFTWARE', 'Turn On 2-Step Verification for Your Google Account', '', '', NULL, '/tips/fingerprint-unlock.jpg',
$tip$Your Google account controls your phone, backups, photos and FRP lock. Protect it.

1. Go to myaccount.google.com, then Security, then 2-Step Verification, and follow the steps.
2. Google prompts on your phone are the easiest second step. Add your phone number as a backup.
3. Save backup codes somewhere safe (on paper, not only on the phone).
4. Check Security, then Your devices, and sign out devices you don't recognise.
5. Add a recovery email and phone number so you can get back in if you forget the password.$tip$,
ARRAY['Google Account'], now() - interval '287 minutes'),

('software-tip-android-quick-share', 'SOFTWARE', 'Send Files Phone to Phone with Quick Share', '', '', NULL, '/tips/phone-settings-hand.jpg',
$tip$Quick Share (formerly Nearby Share) sends photos, videos and files between Android phones without internet.

1. Swipe down twice and tap Quick Share. Add it with the pencil icon if it's missing.
2. On the receiving phone, set visibility to "Everyone for 10 minutes" (or "Contacts").
3. On the sending phone, open a photo or file, tap Share, then Quick Share, and choose the other phone.
4. The receiver taps Accept.
5. Works best with Bluetooth, Wi-Fi and Location on for both phones. Large videos transfer fast this way.

Also works with Windows PCs using the Quick Share app.$tip$,
ARRAY['Quick Share'], now() - interval '286 minutes'),

('software-tip-android-app-pinning', 'SOFTWARE', 'Lend Your Phone Safely with App Pinning', '', '', NULL, '/tips/child-phone.jpg',
$tip$App pinning keeps one app on screen, so a child or friend can't open your messages or photos.

1. Turn it on: Settings, then Security and privacy, then More security settings, then App pinning (or Pin app / Pin windows).
2. Turn on "Ask for PIN before unpinning".
3. Open the app you want to share, then open Recent apps, tap the app's icon at the top, and tap Pin.
4. To unpin: hold Back and Overview (or swipe up and hold with gesture navigation), then enter your PIN.$tip$,
ARRAY['Security Settings'], now() - interval '285 minutes'),

('software-tip-android-accessibility', 'SOFTWARE', 'Make an Android Phone Easier to Use', '', '', NULL, '/tips/person-smartphone.jpg',
$tip$Settings, then Accessibility has useful features for everyone:

Select to Speak: tap text on screen to hear it read aloud.
TalkBack: full screen reader for blind users. Turn it off by holding both volume keys for 3 seconds if it was turned on by mistake.
Magnification: zoom into any part of the screen.
Live Caption: subtitles for videos and voice notes on many phones.
Accessibility Menu: a big on-screen menu for volume, lock, screenshots and power. Useful when buttons are broken.
Remove animations: makes some phones feel faster.$tip$,
ARRAY['Accessibility Settings'], now() - interval '284 minutes'),

('software-tip-android-scheduled-power', 'SOFTWARE', 'Schedule the Phone to Turn Off and On', 'Tecno', 'Tecno, Infinix, itel and others', NULL, '/tips/man-repairing-phone.jpg',
$tip$Many phones can switch themselves off at night and on in the morning, saving battery.

1. Tecno, Infinix and itel: Settings, then Special functions (or Smart settings), then Scheduled power on and off. On some models it's under Settings, then Accessibility, or search Settings for "schedule".
2. Set the power off time and the power on time, and choose the days.
3. Xiaomi: Settings, then Battery, then Schedule power on or off (on many models).
4. Not on every phone: newer Samsung and Google Pixel phones don't include it.

Alarms usually still ring if the phone powers on before the alarm time.$tip$,
ARRAY['Android Settings'], now() - interval '283 minutes'),

('software-tip-samsung-secure-folder', 'SOFTWARE', 'Hide Private Apps and Photos in Samsung Secure Folder', 'Samsung', 'Galaxy phones', NULL, '/tips/samsung-lenses.jpg',
$tip$Secure Folder is a separate, locked space on Samsung phones for private apps, photos and files.

1. Settings, then Security and privacy, then More security settings, then Secure Folder. Sign in to your Samsung account.
2. Choose a lock type (PIN, pattern or fingerprint) different from your phone lock.
3. Add apps (you can have a second WhatsApp inside) and move photos or files in.
4. You can hide the Secure Folder icon from the apps screen.

Back up Secure Folder separately (Secure Folder settings, then Backup and restore). It's erased if you reset the phone or forget its lock.$tip$,
ARRAY['Samsung Secure Folder', 'Samsung Account'], now() - interval '282 minutes'),

('software-tip-android-block-spam-calls', 'SOFTWARE', 'Block Spam Calls and Unknown Numbers on Android', '', '', NULL, '/tips/alert-message.jpg',
$tip$1. Block one number: open the Phone app, tap the number in Recents, then Block (or Block and report spam).
2. Blocked list: Phone app, then three dots, then Settings, then Blocked numbers. You can also block "Unknown" or hidden numbers here.
3. Spam protection: in the Google Phone app, Settings, then Caller ID and spam, then turn on "Filter spam calls". Samsung phones have Caller ID and spam protection in their Phone app settings.
4. Block SMS: open the message, tap the three dots, then Block.

Never call back numbers from missed-call scams or send money to "wrong transfer" requests (see our scams tip).$tip$,
ARRAY['Phone app'], now() - interval '281 minutes'),

('software-tip-android-reset-app-preferences', 'SOFTWARE', 'Fix Many Android Problems with "Reset App Preferences"', '', '', NULL, '/tips/phone-settings-yellow.jpg',
$tip$This fixes links opening in the wrong app, disabled apps, blocked notifications and permission problems, without deleting any data.

1. Settings, then System, then Reset options, then Reset app preferences. On Samsung: Settings, then Apps, then the three dots, then Reset app preferences.
2. Confirm with Reset apps.

It resets: disabled apps, notification settings, default apps, background data limits and permission restrictions. Your photos, messages and app data stay.

Afterwards you may need to set your default apps and some permissions again.$tip$,
ARRAY['Android Settings'], now() - interval '280 minutes'),

('software-tip-android-wifi-qr-share', 'SOFTWARE', 'See or Share a Saved Wi-Fi Password on Android', '', '', NULL, '/tips/router-white.jpg',
$tip$Forgot the Wi-Fi password? Your phone remembers it.

1. Settings, then Network and internet (or Connections), then Wi-Fi.
2. Tap the gear next to the connected network (or long press it), then Share or QR code.
3. Confirm with your fingerprint or PIN. A QR code appears, and on most phones the password is shown underneath.
4. Another phone can scan the QR code with its camera to connect.

Works on Android 10 and newer. On Samsung, tap the network, then the QR code icon at the bottom.$tip$,
ARRAY['Wi-Fi Settings'], now() - interval '279 minutes'),

('software-tip-android-system-updates', 'SOFTWARE', 'Check for Android Updates and Google Play System Updates', '', '', NULL, '/tips/app-updates.jpg',
$tip$There are two kinds of updates, and you need both.

1. Phone software update: Settings, then System, then Software update (Samsung: Settings, then Software update; Tecno and Infinix: Settings, then System update). Download and install.
2. Google Play system update: Settings, then Security and privacy, then System and updates, then Google Play system update. These bring important security fixes.
3. Security patch date: Settings, then About phone, then Android version. A patch older than a year means the phone no longer gets security updates.
4. Back up and charge above 50 percent before big updates (see our safe update tip).$tip$,
ARRAY['Software Update'], now() - interval '278 minutes'),

('software-tip-android-emergency-sos', 'SOFTWARE', 'Set Up Emergency SOS on Android', '', '', NULL, '/tips/alert-message-2.jpg',
$tip$1. Settings, then Safety and emergency (or Advanced features on Samsung, then Send SOS messages).
2. Emergency SOS: turn on "Use Emergency SOS". Pressing the power button 5 times quickly starts a countdown and calls emergency services.
3. Emergency contacts: add family members who get your location in an emergency.
4. Medical information: add blood type, allergies and medications. Responders can see it from the lock screen.
5. Practise without completing the call so you know how it works. On some phones the countdown plays a loud alarm.$tip$,
ARRAY['Safety and emergency'], now() - interval '277 minutes'),

('software-tip-android-screen-refresh-rate', 'SOFTWARE', 'Smooth Screen (90 or 120 Hz) vs Battery Life', '', '', NULL, '/tips/apps-screen.jpg',
$tip$Many newer phones have a faster screen refresh rate that makes scrolling smoother, but uses more battery.

1. Settings, then Display, then Smooth display, Motion smoothness (Samsung) or Refresh rate (Tecno, Infinix, Xiaomi).
2. Choose High (90 or 120 Hz) for smoothness, or Standard (60 Hz) to save battery.
3. "Adaptive" or "Auto" switches between them and is the best balance.
4. Battery draining fast after buying a new phone? Setting this to Standard can add a couple of hours of use.$tip$,
ARRAY['Display Settings'], now() - interval '276 minutes')
ON CONFLICT ("id") DO NOTHING;
