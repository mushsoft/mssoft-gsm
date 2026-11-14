-- One-time content load (no schema change): 20 more Android tips, each with its
-- own photo from public/tips (free Pexels photos).
-- Fixed ids + ON CONFLICT DO NOTHING: added once, admin edits never overwritten.

INSERT INTO "RepairGuide" ("id", "category", "title", "brand", "modelName", "videoUrl", "thumbnail", "content", "toolsUsed", "createdAt") VALUES
('software-tip-samsung-modes-routines', 'SOFTWARE', 'Automate Your Samsung with Modes and Routines', 'Samsung', 'Galaxy (One UI 5 and newer)', NULL, '/tips/samsung-modes-routines.jpg',
$tip$1. Open Settings, Modes and Routines.
2. Modes: turn on Sleep, Driving, Work or Exercise. Each mode can silence calls, turn on dark mode, change the wallpaper and more.
3. Routines tab, then +: choose "If" (a time, battery level, Wi-Fi network, charger connected) and "Then" (actions).
4. Examples:
   If battery is below 20%: turn on Power saving.
   If connected to home Wi-Fi: turn off mobile data.
   At 22:00: turn on Do Not Disturb and Eye comfort shield.
5. Save and switch the routine on.

The Discover tab has ready-made routines to start from.$tip$,
ARRAY['Modes and Routines'], now() - interval '1000 minutes'),

('software-tip-google-lens', 'SOFTWARE', 'Google Lens: Search, Copy and Translate What Your Camera Sees', 'Android', 'Android, iPhone', NULL, '/tips/google-lens.jpg',
$tip$1. Open the Google app and tap the camera icon in the search bar (or the Lens icon in your camera or gallery).
2. Point at something:
   Text: copy it to your phone, or send it to your computer.
   Foreign language: tap Translate to see it in your language.
   Products: find where to buy them and compare prices.
   Plants, animals, landmarks: find out what they are.
   Homework: get step by step help for maths and science questions.
3. Works on screenshots and saved photos too.

Lens is also inside Google Photos: open a photo and tap the Lens button.$tip$,
ARRAY['Google Lens', 'Google app'], now() - interval '1001 minutes'),

('software-tip-google-translate', 'SOFTWARE', 'Google Translate: Conversations, Camera and Offline Use', 'Android', 'Android, iPhone', NULL, '/tips/google-translate.jpg',
$tip$Google Translate supports over 200 languages, including Swahili and Luganda.

1. Type or speak: choose the languages at the top, then tap the microphone.
2. Conversation: both people speak in turn, and the app translates aloud.
3. Camera: point at signs, menus or documents to see the translation on screen.
4. Offline: tap your profile picture, Downloaded languages, and download the ones you need (where available). Then it works with no data.
5. Tap to Translate: translate text inside WhatsApp and other apps (in the app's settings).

Translations aren't perfect. For legal or medical documents, ask a human translator.$tip$,
ARRAY['Google Translate'], now() - interval '1002 minutes'),

('software-tip-google-maps-offline', 'SOFTWARE', 'Use Google Maps Offline and Share Your Location', 'Android', 'Android, iPhone', NULL, '/tips/google-maps-offline.jpg',
$tip$Offline maps:
1. Open Google Maps while on Wi-Fi, tap your profile picture, then Offline maps.
2. Tap Select your own map, move the box over the area (for example Kampala) and Download.
3. Directions and search then work without data. Maps update automatically on Wi-Fi.

Share your location with family:
1. Profile picture, Location sharing, New share.
2. Choose how long and who. They see where you are on their map.

Save places (home, work, the shop) with the Save button so you can find them quickly. Location not accurate? See our GPS tip.$tip$,
ARRAY['Google Maps'], now() - interval '1003 minutes'),

('software-tip-files-by-google', 'SOFTWARE', 'Clean Up Your Phone with Files by Google', 'Android', 'All Android', NULL, '/tips/files-by-google.jpg',
$tip$Files by Google is a free, safe cleaner from Google. Install it from the Play Store if your phone doesn't have it.

1. Open Files, then the Clean tab.
2. Junk files: tap Clean to remove temporary files.
3. Duplicate files, Large files, Old screenshots, Downloaded files: review each list and delete what you don't need.
4. Unused apps: shows apps you haven't opened for weeks.
5. Browse tab: see all images, videos, documents and audio by category.
6. Safe folder: lock private files with a PIN.

Use this instead of "cleaner" or "booster" apps from unknown developers. Those often show ads and slow the phone down.$tip$,
ARRAY['Files by Google'], now() - interval '1004 minutes'),

('software-tip-android-contacts-backup', 'SOFTWARE', 'Make Sure Your Android Contacts Are Backed Up to Google', 'Android', 'All Android', NULL, '/tips/android-contacts-backup.jpg',
$tip$Contacts saved to the phone or SIM card are lost when the phone breaks. Contacts saved to Google are safe.

1. Check on a computer: open contacts.google.com with your Google account. Are your contacts there?
2. Samsung: Contacts app, menu, Manage contacts, Default storage location. Choose your Google account.
   Other phones: Contacts settings, Default account for new contacts, Google.
3. Move old contacts: Contacts, Manage contacts, Move contacts, from Phone or SIM to Google.
4. Google Contacts app: Fix and manage, Import from SIM, or Export to a file for an extra copy.

On a new phone, sign in with the same Google account and your contacts appear automatically.$tip$,
ARRAY['Google Contacts'], now() - interval '1005 minutes'),

('software-tip-android-sms-backup', 'SOFTWARE', 'Back Up and Move SMS Messages on Android', 'Android', 'All Android', NULL, '/tips/android-sms-backup.jpg',
$tip$SMS often contain mobile money receipts and bank codes worth keeping.

1. Google backup: Settings, Google, Backup. On most phones it includes SMS (and Google Messages shows them on the new phone after restore).
2. Samsung: Smart Switch (phone to phone, or to a PC) copies messages. Samsung Cloud backup also includes them on many models.
3. App option: "SMS Backup and Restore" from the Play Store saves messages to a file, Google Drive or your computer.
4. Set the backup to run automatically every day or week.
5. Moving to a new phone: restore before you start receiving new messages.

Moving from Android to iPhone? The Move to iOS app copies messages during iPhone setup.$tip$,
ARRAY['Google backup', 'Smart Switch'], now() - interval '1006 minutes'),

('software-tip-samsung-battery-protection', 'SOFTWARE', 'Make a Samsung Battery Last Longer with Battery Protection', 'Samsung', 'Galaxy phones', NULL, '/tips/samsung-battery-protection.jpg',
$tip$Charging to 100% every night wears the battery faster. Samsung can stop charging earlier.

1. Open Settings, Battery (or Battery and device care, Battery), More battery settings or Battery protection.
2. Choose an option (names vary by model):
   Basic: charges to 100%, then stops until it drops to 95%.
   Adaptive: holds at 80% overnight and finishes before you usually wake up.
   Maximum: stops at 80% (or 85% on older models).
3. Older Galaxy phones: turn on "Protect battery".

Also avoid heat: don't charge under pillows or in direct sun, and remove thick cases while fast charging.$tip$,
ARRAY['Settings', 'Battery'], now() - interval '1007 minutes'),

('software-tip-samsung-dex', 'SOFTWARE', 'Samsung DeX: Use Your Phone Like a Computer on a TV or Monitor', 'Samsung', 'Galaxy S, Note, Z Fold and Tab', NULL, '/tips/samsung-dex.jpg',
$tip$DeX gives a desktop with windows, taskbar and mouse support on a bigger screen.

1. Check your phone supports DeX (most Galaxy S, Note and Fold phones and many Tab tablets).
2. Wired: connect a USB-C to HDMI adapter to the phone and a TV or monitor. DeX starts automatically.
3. Wireless: swipe down twice, tap DeX, and choose a smart TV that supports screen mirroring.
4. Use a Bluetooth keyboard and mouse, or the phone screen as a touchpad.
5. Great for presentations, typing documents and watching videos on a big screen.

A powered USB-C hub lets you charge the phone and connect keyboard, mouse and HDMI at the same time.$tip$,
ARRAY['Samsung DeX', 'USB-C to HDMI adapter'], now() - interval '1008 minutes'),

('software-tip-samsung-smart-switch', 'SOFTWARE', 'Move Everything to a New Samsung with Smart Switch', 'Samsung', 'Galaxy phones', NULL, '/tips/samsung-smart-switch.jpg',
$tip$1. Install Smart Switch on both phones (it's already on most Galaxy phones: Settings, Accounts and backup, Bring data from old device).
2. Charge both phones and keep them close together.
3. Choose Wireless, or connect them with a USB-C cable for faster transfer.
4. On the new phone choose "Receive data", on the old one "Send data". Pick what to copy: contacts, messages, call logs, photos, apps, settings, home screen.
5. Works from old Samsungs, other Android phones and iPhones.
6. Smart Switch for PC (Windows) can also make a full backup to your computer.

WhatsApp chats copy too on recent versions, but make a WhatsApp backup first to be safe.$tip$,
ARRAY['Smart Switch'], now() - interval '1009 minutes'),

('software-tip-xiaomi-turn-off-ads', 'SOFTWARE', 'Turn Off Ads and Recommendations on Xiaomi, Redmi and POCO', 'Xiaomi', 'MIUI and HyperOS', NULL, '/tips/xiaomi-turn-off-ads.jpg',
$tip$Xiaomi phones show ads in some system apps. Most can be turned off (menu names vary by version).

1. Settings, Passwords and security (or Privacy), Authorization and revocation: turn off "msa" (needs internet, may take a few tries).
2. In each Xiaomi app, open its settings and turn off "Receive recommendations" or "Personalised recommendations": File Manager, Music, Themes, Security, Downloads, Cleaner and the App vault.
3. Settings, Additional settings (or Privacy), Ad services: turn off Personalised ad recommendations.
4. When installing apps, turn off the "Security scan recommendations" pop-up in Security app settings.

The phone works normally after this. You'll just see far fewer pop-ups.$tip$,
ARRAY['Settings', 'Xiaomi apps'], now() - interval '1010 minutes'),

('software-tip-android-app-lock', 'SOFTWARE', 'Lock Individual Apps with a PIN or Fingerprint on Android', 'Android', 'Xiaomi, Tecno, Infinix, Oppo and others', NULL, '/tips/android-app-lock.jpg',
$tip$Many Android brands have a built-in app lock (names vary):

Xiaomi, Redmi, POCO: Settings, Apps, App lock.
Tecno, Infinix, itel: Settings, Security (or Privacy), App lock, or the Phone Master app.
Oppo, Realme, OnePlus: Settings, Privacy, App lock.
Samsung: use Secure Folder (see our Secure Folder tip).
Pixel and Android 15: use Private space (see our Private space tip).

1. Set a lock PIN or pattern (different from your screen lock is safer).
2. Tick the apps to lock: WhatsApp, Gallery, mobile money, banking.

Avoid third-party "App Lock" apps with heavy ads. Many request dangerous permissions.$tip$,
ARRAY['App lock'], now() - interval '1011 minutes'),

('software-tip-android-one-handed-mode', 'SOFTWARE', 'One-Handed Mode on Big Android Phones', 'Android', 'All Android', NULL, '/tips/android-one-handed-mode.jpg',
$tip$1. Samsung: Settings, Advanced features, One-handed mode, turn on. Choose Gesture (swipe down in the centre of the bottom edge) or Button (double tap Home).
2. Pixel and others: Settings, System, Gestures, One-handed mode.
3. The screen slides down so you can reach the top with your thumb. Tap above it to go back.
4. Keyboard: in Gboard or Samsung Keyboard, turn on one-handed keyboard to move keys to one side.
5. Swipe down anywhere on the home screen to open notifications (Samsung: Home screen settings, Swipe down for notification panel).$tip$,
ARRAY['Settings', 'Gestures'], now() - interval '1012 minutes'),

('software-tip-android-live-caption', 'SOFTWARE', 'Live Caption and Live Transcribe: Subtitles for Everything', 'Android', 'Android 10 and newer', NULL, '/tips/android-live-caption.jpg',
$tip$Live Caption adds subtitles to any video, voice note or call on your phone, even with no internet.

1. Press a volume button, then tap the caption icon below the volume slider.
2. Or Settings, Accessibility, Live Caption (Samsung: Accessibility, Hearing enhancements, Live Caption).
3. Captions appear in a box you can move around the screen.
4. Live Transcribe (free app from Google): writes out what people around you say. Helpful for people with hearing loss.

Great for watching videos in a quiet room without sound. Caption languages depend on your phone model.$tip$,
ARRAY['Live Caption', 'Live Transcribe'], now() - interval '1013 minutes'),

('software-tip-android-screen-timeout-aod', 'SOFTWARE', 'Screen Timeout and Always On Display Settings on Android', 'Android', 'All Android', NULL, '/tips/android-screen-timeout-aod.jpg',
$tip$Screen timeout:
1. Settings, Display, Screen timeout.
2. 30 seconds saves battery. 1 or 2 minutes is easier when reading.
3. Samsung "Keep screen on while viewing" (Advanced features, Motions and gestures) stops it turning off while you look at it.

Always On Display (shows time and notifications on a black screen):
1. Samsung: Settings, Lock screen and AOD, Always On Display.
2. Choose Tap to show, Show always, or As scheduled (for example 07:00 to 22:00).
3. Turn it off completely for best battery life.

Others: look under Settings, Display, Lock screen or Ambient display.$tip$,
ARRAY['Settings', 'Display'], now() - interval '1014 minutes'),

('software-tip-android-private-space', 'SOFTWARE', 'Hide Apps in Private Space on Android 15', 'Android', 'Android 15 and newer', NULL, '/tips/android-private-space.jpg',
$tip$Private space is a locked, hidden area for apps you want to keep private.

1. Settings, Security and privacy, Private space (Pixel and many Android 15 phones).
2. Set it up with a separate lock or your screen lock. You can use a separate Google account for extra privacy.
3. Install apps inside it from the Play Store that appears there.
4. It shows at the bottom of the app drawer. Unlock to see the apps. Lock it and they stop running and send no notifications.
5. Hide it completely: the app list doesn't show it until you search "private space".

Samsung phones use Secure Folder instead (see our tip). Remember the lock: if forgotten, the private space must be deleted with its data.$tip$,
ARRAY['Private space'], now() - interval '1015 minutes'),

('software-tip-android-auto-update-apps', 'SOFTWARE', 'Control Automatic App Updates on Android (Save Data)', 'Android', 'All Android', NULL, '/tips/android-auto-update-apps.jpg',
$tip$1. Open the Play Store, tap your profile picture, then Settings, Network preferences.
2. Auto-update apps: choose "Over Wi-Fi only" to protect your bundle.
3. App download preference: "Over Wi-Fi only" or "Ask every time".
4. Update one app manually: profile picture, Manage apps and device, Updates available.
5. Stop one app from updating: open its Play Store page, three dots, untick Enable auto update.

Keep WhatsApp, banking and security apps updated. Old versions stop working and miss security fixes.$tip$,
ARRAY['Play Store'], now() - interval '1016 minutes'),

('software-tip-google-assistant-gemini', 'SOFTWARE', 'Use Google Assistant and Gemini by Voice on Android', 'Android', 'All Android', NULL, '/tips/google-assistant-gemini.jpg',
$tip$1. Hold the power button or say "Hey Google" (set up under Settings, Google, Search, Assistant and Voice, or in the Gemini app).
2. Turn on Voice Match so it responds to your voice.
3. Useful things to ask: "Call John on speaker", "Set an alarm for 6", "Read my messages", "Navigate to Entebbe", "Turn on Wi-Fi", "What's the weather tomorrow".
4. Gemini can also write messages, summarise text and answer questions.
5. Privacy: review or delete your activity at myactivity.google.com.

Samsung phones may open Bixby on the side key. Change it under Settings, Advanced features, Side button.$tip$,
ARRAY['Google Assistant', 'Gemini'], now() - interval '1017 minutes'),

('software-tip-android-notification-history', 'SOFTWARE', 'See Notifications You Dismissed (Notification History)', 'Android', 'Android 11 and newer', NULL, '/tips/android-notification-history.jpg',
$tip$Swiped a notification away by mistake? Android can keep a 24-hour history.

1. Samsung: Settings, Notifications, Advanced settings, Notification history, turn on.
   Pixel and others: Settings, Notifications, Notification history.
2. From now on, dismissed notifications are listed there for 24 hours.
3. Tap one to open the app.

It only shows notifications that arrived after you turned it on. A WhatsApp message that was later deleted may still show here if its notification arrived first.

Turn it on as soon as you get a new phone. It's very useful for missed codes and delivery messages.$tip$,
ARRAY['Settings', 'Notifications'], now() - interval '1018 minutes'),

('software-tip-tecno-infinix-tips', 'SOFTWARE', 'Useful Settings on Tecno, Infinix and itel Phones (HiOS, XOS, itel OS)', 'Tecno', 'Tecno, Infinix, itel', NULL, '/tips/tecno-infinix-tips.jpg',
$tip$Menu names vary by version.

1. Phone Master: clean junk, check battery use and find large files. Avoid the "boost" button every day, it doesn't really help.
2. App twin (or Dual apps): run two WhatsApp accounts on a dual SIM phone. Settings, App twin.
3. Ultra power saving: keeps calls and SMS working with very low battery.
4. Smart panel: a small side bar for quick apps. Turn off in Settings if it gets in the way.
5. Social Turbo (Settings, Special functions): WhatsApp tools like video call beauty and voice changer.
6. Turn off lock screen ads and "Hot apps" folders in their settings or by long-pressing them.

Keep system updates installed: Settings, System update.$tip$,
ARRAY['Phone Master', 'Settings'], now() - interval '1019 minutes')
ON CONFLICT ("id") DO NOTHING;
