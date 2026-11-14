-- One-time content load (no schema change): 20 more Android and phone tips,
-- each with its own photo from public/tips (free Pexels photos).
-- Fixed ids + ON CONFLICT DO NOTHING: added once, admin edits never overwritten.

INSERT INTO "RepairGuide" ("id", "category", "title", "brand", "modelName", "videoUrl", "thumbnail", "content", "toolsUsed", "createdAt") VALUES
('software-tip-android-apn-settings', 'SOFTWARE', 'Mobile Data Not Working? Check the APN Settings', 'Android', 'All Android', NULL, '/tips/android-apn-settings.jpg',
$tip$The APN tells the phone how to connect to your network's internet. A wrong APN means calls work but data doesn't.

1. Check the basics first: mobile data is on, you have a bundle, and Airplane mode is off.
2. Samsung: Settings, Connections, Mobile networks, Access Point Names.
   Others: Settings, Network and internet (or SIM cards), your SIM, Access Point Names.
3. Tap the three dots, then Reset to default. Most phones then load the right settings for the SIM.
4. Still nothing? Ask your network for the correct APN details (or request settings by SMS) and add a new APN with them.
5. Restart the phone.

Phones bought abroad sometimes lack local settings, so the manual APN is needed.$tip$,
ARRAY['Settings', 'APN'], now() - interval '625 minutes'),

('software-tip-android-network-mode', 'SOFTWARE', 'Choose 5G, 4G or 3G Network Mode on Android', 'Android', 'All Android', NULL, '/tips/android-network-mode.jpg',
$tip$1. Samsung: Settings, Connections, Mobile networks, Network mode.
   Others: Settings, Network and internet, SIMs (choose the SIM), Preferred network type.
2. Choose the highest Auto option, for example "5G/LTE/3G/2G (auto connect)".
3. 4G (LTE) gives faster internet and clearer calls (VoLTE) where available.
4. Only 2G or 3G showing? The SIM may be old. Swap it at your network for a 4G SIM.
5. In weak signal areas, 4G only can drop calls. Keep Auto.

On dual SIM phones, usually only one SIM can use 4G or 5G at a time. Put the data SIM in slot 1 if the phone asks.$tip$,
ARRAY['Settings', 'Mobile networks'], now() - interval '626 minutes'),

('software-tip-android-data-limit', 'SOFTWARE', 'Set a Mobile Data Warning and Limit on Android', 'Android', 'All Android', NULL, '/tips/android-data-limit.jpg',
$tip$Stop bundles from running out without warning.

Samsung: Settings, Connections, Data usage, Billing cycle and data warning.
Pixel and others: Settings, Network and internet, SIMs, Data warning and limit.

1. Set the billing cycle start date (for example the day your monthly bundle renews).
2. Set data warning: for example 80% of your bundle.
3. Set data limit: mobile data turns off when you reach it.
4. See which apps used the most: Mobile data usage. Block background data for the worst ones.

Turn on Data saver too (see our Data Saver tip). Weekly or daily bundles? Change the cycle or check usage each week.$tip$,
ARRAY['Settings', 'Data usage'], now() - interval '627 minutes'),

('software-tip-android-google-backup', 'SOFTWARE', 'Back Up Your Android Phone to Google', 'Android', 'All Android', NULL, '/tips/android-google-backup.jpg',
$tip$1. Open Settings, Google, Backup (or Settings, System, Backup).
2. Turn on Backup by Google One and tap Back up now. Stay on Wi-Fi.
3. It saves apps list, contacts, call history, SMS, device settings and Wi-Fi passwords.
4. Photos and videos are backed up by Google Photos (see our Google Photos tip).
5. WhatsApp uses its own backup to Google Drive (see our WhatsApp tip).
6. On a new phone, sign in with the same Google account during setup and choose the backup to restore.

Free Google storage is 15 GB, shared with Gmail and Drive. Samsung phones can also back up to Samsung Cloud or Smart Switch on a PC.$tip$,
ARRAY['Google One', 'Settings'], now() - interval '628 minutes'),

('software-tip-android-google-photos', 'SOFTWARE', 'Back Up Photos Automatically with Google Photos', 'Android', 'All Android, iPhone', NULL, '/tips/android-google-photos.jpg',
$tip$1. Open Google Photos and sign in with your Google account.
2. Tap your profile picture, then Photos settings (or Turn on backup), and turn on Backup.
3. Backup quality: "Storage saver" fits more in the free 15 GB. "Original quality" keeps full size.
4. Back up other folders too (WhatsApp Images, Screenshots): Backup, Back up device folders.
5. Free up space: profile picture, Free up space. Removes phone copies that are already backed up.
6. To save data, keep "Back up using mobile data" off.

Check photos.google.com on a computer to confirm they're really there before deleting anything from the phone.$tip$,
ARRAY['Google Photos'], now() - interval '629 minutes'),

('software-tip-android-apk-safety', 'SOFTWARE', 'Installing APK Files: The Risks and How to Stay Safe', 'Android', 'All Android', NULL, '/tips/android-apk-safety.jpg',
$tip$An APK is an app installed from outside the Play Store. Many "free premium" or "mod" APKs contain malware that steals passwords, mobile money PINs or shows ads everywhere.

1. Use the Play Store whenever possible.
2. Only install APKs from the software maker's own official website.
3. Android asks permission per app: Settings, Apps, Special access, Install unknown apps. Allow only the app you need (for example your browser) and turn it off again after.
4. Never install APKs sent on WhatsApp, even from friends. Their phone may be infected.
5. After installing, check its permissions. A torch app has no reason to read SMS.

Keep Google Play Protect on (see our Play Protect tip).$tip$,
ARRAY['Settings', 'Play Protect'], now() - interval '630 minutes'),

('software-tip-android-play-protect', 'SOFTWARE', 'Scan Your Phone with Google Play Protect', 'Android', 'All Android with Play Store', NULL, '/tips/android-play-protect.jpg',
$tip$Play Protect is Android's built-in malware scanner. No extra antivirus app needed for most people.

1. Open the Play Store, tap your profile picture, then Play Protect.
2. Tap Scan. It checks all installed apps.
3. Settings (gear icon): keep "Scan apps with Play Protect" on.
4. If it finds a harmful app, tap Uninstall.
5. App won't uninstall? It may be a device admin: Settings, Security, Device admin apps (or Other security settings), turn it off, then uninstall. Or use Safe mode (see our Safe mode tip).

Avoid "cleaner" and "booster" apps. Many are adware themselves.$tip$,
ARRAY['Play Store', 'Play Protect'], now() - interval '631 minutes'),

('software-tip-android-multiple-users', 'SOFTWARE', 'Share a Phone Safely: Guest Mode and Multiple Users', 'Android', 'Pixel, Motorola, Nokia and others', NULL, '/tips/android-multiple-users.jpg',
$tip$Many Android phones let each person have their own space, with separate apps, photos and accounts.

1. Settings, System, Multiple users (or Users and accounts, Users).
2. Turn on "Allow multiple users".
3. Add guest: a temporary space you can delete after someone borrows the phone.
4. Add user: a permanent space for a family member. They set up their own Google account.
5. Switch users from the quick settings panel (person icon).

Samsung phones don't have this on phones. Use Secure Folder (see our Secure Folder tip) or Kids mode instead. Tablets often support multiple users.$tip$,
ARRAY['Settings', 'Users'], now() - interval '632 minutes'),

('software-tip-android-gboard', 'SOFTWARE', 'Gboard Tips: Voice Typing, Clipboard and Translate', 'Android', 'All Android', NULL, '/tips/android-gboard.jpg',
$tip$Gboard is Google's keyboard. Install it from the Play Store if your phone uses another one.

1. Voice typing: tap the microphone and speak. Say "full stop" or "comma" for punctuation.
2. Clipboard: tap the clipboard icon to see things you copied recently and paste them.
3. Translate: tap the menu (four squares), then Translate, and type in your language.
4. Glide typing: slide your finger across letters instead of tapping.
5. One-handed mode and keyboard height: in the same menu.
6. Add languages: Gboard settings, Languages, Add keyboard.

Set as default: Settings, General management (or System), Keyboard, Default keyboard.$tip$,
ARRAY['Gboard'], now() - interval '633 minutes'),

('software-tip-android-screen-cast', 'SOFTWARE', 'Show Your Phone Screen on a TV (Screen Cast and Smart View)', 'Android', 'All Android', NULL, '/tips/android-screen-cast.jpg',
$tip$1. Connect the phone and a smart TV (or a Chromecast) to the same Wi-Fi. Some TVs also work with Wi-Fi off, using screen mirroring (Miracast).
2. Samsung: swipe down twice, tap Smart View, choose the TV.
   Others: quick settings, Screen cast, Cast, or Screen mirroring.
3. Accept on the TV if it asks.
4. YouTube and Netflix: tap the cast icon inside the app instead. The phone can then be used for other things.
5. To stop: tap the same tile again.

No smart TV? A cheap HDMI cable adapter works with many phones that support video out through USB-C.$tip$,
ARRAY['Smart View', 'Screen cast'], now() - interval '634 minutes'),

('software-tip-android-wifi-calling', 'SOFTWARE', 'Turn On Wi-Fi Calling on Android', 'Android', 'All Android', NULL, '/tips/android-wifi-calling.jpg',
$tip$Wi-Fi Calling lets you make normal calls over Wi-Fi when mobile signal is weak indoors.

1. Samsung: open the Phone app, three dots, Settings, Wi-Fi calling. Or swipe down and tap the Wi-Fi calling tile.
   Pixel and others: Settings, Network and internet, SIMs, Wi-Fi calling.
2. Turn it on and choose "Prefer Wi-Fi" if the option exists.
3. When active, a Wi-Fi call icon shows in the status bar.

Calls use your normal number and bundle. It only works if your network supports Wi-Fi calling for your phone model. Option missing? Update the phone and ask your network.$tip$,
ARRAY['Phone app', 'Settings'], now() - interval '635 minutes'),

('software-tip-android-auto-rotate', 'SOFTWARE', 'Screen Won''t Rotate? Fix Auto-Rotate on Android', 'Android', 'All Android', NULL, '/tips/android-auto-rotate.jpg',
$tip$1. Swipe down and check the Auto rotate tile. If it shows Portrait (locked), tap it.
2. Some apps (and many home screens) only work in portrait. Test with YouTube or the Gallery.
3. Restart the phone. Sensor glitches often clear.
4. Test the sensor: Samsung users can dial *#0*# and tap Sensor. Other phones: install a sensor test app from the Play Store.
5. Works in Safe mode? Then an app is blocking it (see our Safe mode tip).
6. Sensor test shows no movement after a drop or water? It's a hardware fault, bring it in.

Also check that "Rotate button" isn't the only option set in Display settings.$tip$,
ARRAY['Quick settings', 'Sensor test'], now() - interval '636 minutes'),

('software-tip-android-chrome-site-notifications', 'SOFTWARE', 'Stop Website Pop-up Notifications in Chrome on Android', 'Android', 'All Android', NULL, '/tips/android-chrome-site-notifications.jpg',
$tip$Fake "virus" warnings and prize alerts often come from websites you allowed to send notifications.

1. Pull down the notification, touch and hold it, and see which website or app it comes from.
2. In Chrome: three dots, Settings, Site settings (or Privacy and security), Notifications.
3. Tap each unknown website and choose Block or Remove.
4. Turn off "Sites can ask to send notifications" if you never want them.
5. Turn on Safe Browsing: Chrome Settings, Privacy and security, Safe Browsing, Standard or Enhanced.

Never tap "Allow" on a site that says "Click Allow to prove you're not a robot". It's a trick.$tip$,
ARRAY['Chrome', 'Site settings'], now() - interval '637 minutes'),

('software-tip-android-sound-quality', 'SOFTWARE', 'Better Sound on Android: Equaliser, Dolby Atmos and Volume Limit', 'Android', 'Samsung and others', NULL, '/tips/android-sound-quality.jpg',
$tip$Samsung: Settings, Sounds and vibration, Sound quality and effects.
1. Dolby Atmos: fuller sound for speakers and headphones.
2. Equaliser: choose a preset (Bass boost, Treble boost) or set your own.
3. Adapt Sound: tunes sound to your hearing.

Volume limit: Settings, Sounds and vibration, Volume, three dots, Media volume limiter. Protects children's ears with headphones.

Other brands: look under Settings, Sound, Audio effects (or DTS, Dirac). Music apps like Spotify also have their own equaliser.

Low or crackling sound even after this? Clean the speaker grille gently with a soft brush and check our No Sound tip.$tip$,
ARRAY['Settings', 'Equaliser'], now() - interval '638 minutes'),

('software-tip-android-extend-unlock', 'SOFTWARE', 'Keep Your Phone Unlocked at Home (Extend Unlock / Smart Lock)', 'Android', 'All Android', NULL, '/tips/android-extend-unlock.jpg',
$tip$1. Samsung: Settings, Lock screen and AOD (or Lock screen), Extend Unlock (older: Smart Lock).
   Pixel and others: Settings, Security and privacy, More security, Extend Unlock (or Smart Lock).
2. Enter your PIN.
3. Choose:
   On-body detection: stays unlocked while you carry it.
   Trusted places: stays unlocked at home.
   Trusted devices: stays unlocked near your Bluetooth earphones, watch or car.

Careful: anyone who picks up the phone while it's in a trusted place or near a trusted device can open it. Don't use trusted places for an office or shop.$tip$,
ARRAY['Settings', 'Lock screen'], now() - interval '639 minutes'),

('software-tip-phone-wifi-no-internet', 'SOFTWARE', 'Phone Connected to Wi-Fi but No Internet', 'All brands', 'Android, iPhone', NULL, '/tips/phone-wifi-no-internet.jpg',
$tip$1. Check other devices on the same Wi-Fi. All of them offline? The problem is the router or internet, not the phone. Restart the router.
2. Public Wi-Fi (hotel, café): open the browser. A sign-in page may need to be accepted.
3. Forget the network and join again with the password.
4. Android: turn off Private DNS (Settings, Connections, More connection settings, Private DNS, Off or Automatic). A wrong setting blocks all internet.
5. Check the date and time are automatic. Wrong dates break secure websites.
6. Router has a device limit or MAC filter? Try turning off Private (random) Wi-Fi address for that network in its settings.
7. Still failing? Reset network settings (see our Reset Network Settings tip).$tip$,
ARRAY['Wi-Fi settings'], now() - interval '640 minutes'),

('software-tip-reset-network-settings', 'SOFTWARE', 'Reset Network Settings on Android and iPhone', 'All brands', 'Android, iPhone', NULL, '/tips/reset-network-settings.jpg',
$tip$Fixes many Wi-Fi, Bluetooth and mobile data problems without deleting your files.

Samsung: Settings, General management, Reset, Reset network settings (or Reset mobile network settings).
Pixel and others: Settings, System, Reset options, Reset Wi-Fi, mobile and Bluetooth.
iPhone: Settings, General, Transfer or Reset iPhone, Reset, Reset Network Settings.

What it removes: saved Wi-Fi networks and passwords, paired Bluetooth devices, VPN settings and mobile network settings.
What it keeps: photos, apps, messages and accounts.

Write down important Wi-Fi passwords first. The phone restarts and you reconnect to everything.$tip$,
ARRAY['Settings', 'Reset'], now() - interval '641 minutes'),

('software-tip-android-factory-reset-right', 'SOFTWARE', 'Factory Reset an Android Phone the Right Way (Before Selling)', 'Android', 'All Android', NULL, '/tips/android-factory-reset-right.jpg',
$tip$Resetting without removing your accounts first leaves the phone locked to your Google account (FRP) for the next owner.

1. Back up: photos (Google Photos or a PC), WhatsApp chats, contacts (see our backup tips).
2. Remove accounts: Settings, Accounts (or Passwords and accounts), tap the Google account, Remove account. Samsung: also remove the Samsung account.
3. Remove the screen lock: Settings, Lock screen, Screen lock type, None.
4. Take out the SIM and memory card.
5. Reset: Settings, General management (or System), Reset, Factory data reset, Reset.

After the reset the phone starts with the welcome screen and can be set up by anyone. If you are buying a used phone, ask the seller to do this in front of you.$tip$,
ARRAY['Settings', 'Accounts'], now() - interval '642 minutes'),

('software-tip-wireless-charging', 'SOFTWARE', 'Wireless Charging Tips: What Works and What Doesn''t', 'All brands', 'Qi phones', NULL, '/tips/wireless-charging.jpg',
$tip$1. Check your phone supports it (Qi or MagSafe). Most budget phones don't.
2. Place the phone in the centre of the pad. If it's off-centre it won't charge, or charges slowly and gets hot.
3. Remove thick cases, metal plates, ring holders and cards. Bank cards can be damaged.
4. Use the adapter that came with the charging pad. A weak phone charger makes it very slow.
5. Wireless charging is slower and warmer than a cable. Phones may pause at 80% to protect the battery.
6. Samsung and some others can charge earbuds on their back: Wireless PowerShare in quick settings.

Phone very hot on the pad? Take it off and use a cable.$tip$,
ARRAY['Qi charger'], now() - interval '643 minutes'),

('software-tip-fast-charging', 'SOFTWARE', 'Fast Charging: Getting the Right Charger and Cable', 'All brands', 'Android, iPhone', NULL, '/tips/fast-charging.jpg',
$tip$Fast charging only works when the phone, charger and cable all support the same standard.

1. Samsung: "Super Fast Charging" needs a USB-C PD charger with PPS (25 W or 45 W).
2. iPhone 8 and newer: a USB-C PD charger (20 W or more) and a USB-C to Lightning or USB-C cable.
3. Xiaomi, Tecno, Infinix, Oppo and others use their own fast chargers. Use the original or an approved one.
4. Cheap cables often charge slowly even with a fast charger.
5. Check it's working: Samsung shows "Super fast charging" on the lock screen.
6. Turn fast charging off at night to reduce heat (Samsung: Settings, Battery, More battery settings, Charging settings).

Avoid fake "original" chargers. They can overheat and damage the charging IC.$tip$,
ARRAY['USB-C PD charger', 'Cable'], now() - interval '644 minutes')
ON CONFLICT ("id") DO NOTHING;
