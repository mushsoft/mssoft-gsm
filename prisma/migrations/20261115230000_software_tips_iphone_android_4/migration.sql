-- One-time content load (no schema change): 15 more iPhone tips and 20 more
-- Android tips, each with its own photo from public/tips (free Pexels photos).
-- Fixed ids + ON CONFLICT DO NOTHING: added once, admin edits never overwritten.

INSERT INTO "RepairGuide" ("id", "category", "title", "brand", "modelName", "videoUrl", "thumbnail", "content", "toolsUsed", "createdAt") VALUES
('software-tip-iphone-standby', 'SOFTWARE', 'StandBy Mode: Turn a Charging iPhone into a Bedside Clock', 'Apple', 'iPhone (iOS 17 and newer)', NULL, '/tips/iphone-standby.jpg',
$tip$1. Put the iPhone on charge, lock it, and turn it sideways (landscape) so it stands still.
2. StandBy shows a big clock, photos or widgets. Swipe left or right to switch between them, and up or down to change styles.
3. Settings, StandBy: turn it on or off, and turn on Night Mode so the screen turns red and dim in the dark.
4. iPhone Pro models can keep it on all the time. Other models turn the screen off after a while and wake when touched or moved.

A small stand or wireless charging stand works best.$tip$,
ARRAY['StandBy', 'Charger'], now() - interval '1300 minutes'),

('software-tip-iphone-live-voicemail', 'SOFTWARE', 'Live Voicemail: See What Callers Are Saying Before You Answer', 'Apple', 'iPhone (iOS 17 and newer)', NULL, '/tips/iphone-live-voicemail.jpg',
$tip$1. Settings, Phone (iOS 18: Settings, Apps, Phone), Live Voicemail, turn on.
2. When you don't answer, the caller can leave a message and you see it written out live on the screen.
3. Tap the green button to pick up while they're still talking.
4. Listen later in the Phone app, Voicemail.

Availability depends on your region and language. Your network's own voicemail may take over if it's set up, so check with them if it doesn't work.$tip$,
ARRAY['Phone app'], now() - interval '1301 minutes'),

('software-tip-iphone-check-in', 'SOFTWARE', 'Check In: Let Family Know You Got Home Safely (iPhone)', 'Apple', 'iPhone (iOS 17 and newer)', NULL, '/tips/iphone-check-in.jpg',
$tip$1. Open Messages and a chat with a family member who also has an iPhone.
2. Tap +, then More, then Check In. Tap Edit to choose "When I arrive" (pick the place) or "After a timer".
3. Send it. When you arrive, they get a notification automatically.
4. If you don't arrive or don't respond, they're notified and can see your location, battery and signal (based on your Check In settings).
5. End or extend it any time from the chat.

Great for late trips home, boda boda rides and travel between towns.$tip$,
ARRAY['Messages'], now() - interval '1302 minutes'),

('software-tip-iphone-lock-screen', 'SOFTWARE', 'Customise the iPhone Lock Screen: Fonts, Widgets and Photos', 'Apple', 'iPhone (iOS 16 and newer)', NULL, '/tips/iphone-lock-screen.jpg',
$tip$1. Unlock with Face ID but stay on the lock screen, then touch and hold it.
2. Tap Customise, then Lock Screen.
3. Tap the clock to change font and colour. Tap below it to add widgets (battery, weather, calendar).
4. Tap the bottom corners (iOS 18) to change the torch and camera buttons.
5. Tap + to make several lock screens and swipe between them. Each can be linked to a Focus (Work, Sleep).
6. Photo Shuffle changes the wallpaper through the day.

Keep "Show Previews" for notifications on "When Unlocked" for privacy (Settings, Notifications).$tip$,
ARRAY['Lock Screen'], now() - interval '1303 minutes'),

('software-tip-iphone-scheduled-summary', 'SOFTWARE', 'Fewer Interruptions: Scheduled Notification Summary on iPhone', 'Apple', 'iPhone', NULL, '/tips/iphone-scheduled-summary.jpg',
$tip$Instead of buzzing all day, less important apps can send one summary at set times.

1. Settings, Notifications, Scheduled Summary, turn on.
2. Choose the times, for example 08:00 and 18:00.
3. Pick the apps to include: shopping, games, news, social apps.
4. Messages, calls and time-sensitive alerts still arrive straight away.

Also turn off notifications completely for apps you never need to hear from: Settings, Notifications, choose the app.$tip$,
ARRAY['Notifications'], now() - interval '1304 minutes'),

('software-tip-iphone-battery-percentage', 'SOFTWARE', 'Show the Battery Percentage on iPhone', 'Apple', 'iPhone', NULL, '/tips/iphone-battery-percentage.jpg',
$tip$1. iPhones with Face ID (iPhone X and newer, iOS 16 or later): Settings, Battery, turn on Battery Percentage. The number appears inside the battery icon.
2. Any iPhone: swipe down from the top right to open Control Centre and see the exact percentage.
3. iPhone SE and models with a Home button: Settings, Battery, Battery Percentage.
4. Add the Batteries widget to the home screen to see AirPods and Apple Watch too.

The battery icon turns yellow in Low Power Mode. See our Low Power Mode and battery health tips.$tip$,
ARRAY['Settings', 'Battery'], now() - interval '1305 minutes'),

('software-tip-iphone-raise-tap-to-wake', 'SOFTWARE', 'Raise to Wake and Tap to Wake on iPhone', 'Apple', 'iPhone', NULL, '/tips/iphone-raise-tap-to-wake.jpg',
$tip$1. Raise to Wake: Settings, Display and Brightness, Raise to Wake. The screen turns on when you lift the phone.
2. Tap to Wake (Face ID iPhones): Settings, Accessibility, Touch, Tap to Wake. Tap the screen once to wake it.
3. Turn them off if the screen keeps turning on in your pocket or bag and wasting battery.
4. Auto-Lock (Display and Brightness) sets how fast the screen turns off. 30 seconds saves battery.

Screen not waking at all even with the side button? Try a force restart (see our tip).$tip$,
ARRAY['Display settings', 'Accessibility'], now() - interval '1306 minutes'),

('software-tip-iphone-sound-recognition', 'SOFTWARE', 'Sound Recognition: iPhone Alerts for Doorbells, Alarms and Crying Babies', 'Apple', 'iPhone', NULL, '/tips/iphone-sound-recognition.jpg',
$tip$Helpful for people with hearing loss, or when wearing headphones.

1. Settings, Accessibility, Sound Recognition, turn on.
2. Tap Sounds and choose what to listen for: fire and smoke alarms, doorbell, door knock, baby crying, dog barking, water running, and more.
3. The iPhone shows a notification and vibrates when it hears them.
4. Train custom sounds (like your own doorbell or appliance beep) under Custom.

Don't rely on it alone for safety alarms. It's an extra helper.$tip$,
ARRAY['Accessibility'], now() - interval '1307 minutes'),

('software-tip-iphone-background-sounds', 'SOFTWARE', 'Background Sounds: Rain and Ocean Noise to Help You Focus or Sleep (iPhone)', 'Apple', 'iPhone', NULL, '/tips/iphone-background-sounds.jpg',
$tip$1. Settings, Accessibility, Audio and Visual, Background Sounds.
2. Choose a sound: Balanced, Bright or Dark noise, Ocean, Rain or Stream.
3. Set the volume, and whether it keeps playing when other media plays.
4. Quick switch: add Hearing to Control Centre (Settings, Control Centre), then tap the ear icon.
5. "Stop sounds when locked" or a Clock timer ("When Timer Ends: Stop Playing") stops it after you fall asleep.

It works offline and uses no data.$tip$,
ARRAY['Accessibility', 'Control Centre'], now() - interval '1308 minutes'),

('software-tip-iphone-shared-calendar', 'SOFTWARE', 'Share a Calendar with Family or Staff on iPhone', 'Apple', 'iPhone', NULL, '/tips/iphone-shared-calendar.jpg',
$tip$1. Open Calendar, tap Calendars at the bottom.
2. Tap the "i" next to an iCloud calendar (or Add Calendar to make a new one, for example "Shop Rota").
3. Add Person and choose who to share with. Allow editing if they should add events too.
4. Family Sharing members automatically get a "Family" calendar.
5. Mixed iPhone and Android team? Use a Google Calendar instead and add the Google account on the iPhone (Settings, Calendar, Accounts).

Set alerts on important events: open the event, Alert, and choose 1 hour or 1 day before.$tip$,
ARRAY['Calendar', 'iCloud'], now() - interval '1309 minutes'),

('software-tip-iphone-reminders', 'SOFTWARE', 'Never Forget Tasks: iPhone Reminders Tips', 'Apple', 'iPhone', NULL, '/tips/iphone-reminders.jpg',
$tip$1. Open Reminders and tap New Reminder. Tap the calendar icon to set a date and time.
2. Location reminders: tap the location icon to be reminded when you arrive at or leave a place, for example "buy charger" when you reach town.
3. Lists: make separate lists (Shopping, Shop stock, Bills). Share a list with family so everyone can tick items.
4. Repeat: for monthly bills or weekly tasks.
5. Ask Siri: "Remind me to call the supplier at 3 PM".
6. Groceries lists (iOS 17 and newer) sort items into sections automatically.$tip$,
ARRAY['Reminders', 'Siri'], now() - interval '1310 minutes'),

('software-tip-iphone-lock-notes', 'SOFTWARE', 'Lock Private Notes on iPhone', 'Apple', 'iPhone', NULL, '/tips/iphone-lock-notes.jpg',
$tip$1. Open the note in the Notes app, tap the three dots (or share icon), then Lock.
2. Choose to use your iPhone passcode (simplest), or a separate Notes password.
3. Locked notes show only the title. Open them with Face ID, Touch ID or the passcode.
4. Tap the lock icon at the top to lock all open notes again.

Don't store bank PINs or passwords in plain notes. Use the Passwords app for those (see our tip). If you use a separate Notes password and forget it, Apple can't recover locked notes.$tip$,
ARRAY['Notes'], now() - interval '1311 minutes'),

('software-tip-iphone-slide-to-type', 'SOFTWARE', 'Type Faster on iPhone: Slide to Type and Text Shortcuts', 'Apple', 'iPhone', NULL, '/tips/iphone-slide-to-type.jpg',
$tip$1. Slide to Type: instead of tapping, slide your finger from letter to letter and lift at the end of each word. Turn on in Settings, General, Keyboard, Slide to Type.
2. Double tap space: adds a full stop and a space.
3. Touch and hold a letter for accents and special characters.
4. Touch and hold the 123 key and slide to a number, then lift: you return to letters automatically.
5. Dictation: tap the microphone and speak. Say "comma" and "new line".
6. Text Replacement shortcuts (see our keyboard tip).$tip$,
ARRAY['Keyboard'], now() - interval '1312 minutes'),

('software-tip-iphone-find-from-computer', 'SOFTWARE', 'Lost iPhone? Find It from Any Computer at iCloud.com', 'Apple', 'iPhone', NULL, '/tips/iphone-find-from-computer.jpg',
$tip$1. On any computer or a friend's phone, open icloud.com/find in a browser.
2. Sign in with your Apple ID. You can usually skip the two-factor code here because you may not have your phone.
3. Choose your iPhone on the map.
4. Play Sound if it's nearby, Mark as Lost to lock it and show your phone number, or Erase iPhone as a last resort.
5. Report a stolen phone to the police with its IMEI (see our IMEI tip).

Find My must be on before the phone is lost. Check it now: Settings, your name, Find My.$tip$,
ARRAY['iCloud.com', 'Find My'], now() - interval '1313 minutes'),

('software-tip-iphone-night-mode', 'SOFTWARE', 'Take Better Night Photos with iPhone Night Mode', 'Apple', 'iPhone 11 and newer', NULL, '/tips/iphone-night-mode.jpg',
$tip$1. In low light, Night mode turns on by itself: a yellow moon icon with seconds (for example 3s) appears.
2. Hold the iPhone very still until the capture finishes. Lean on a wall or table.
3. Tap the moon icon to make the exposure longer. On a tripod it can go up to 30 seconds.
4. Clean the lens first. Night photos show smudges as glow.
5. Turn off the flash for scenes and buildings. It only lights things very close.
6. Don't zoom in at night: use the main 1x camera for the sharpest result.$tip$,
ARRAY['Camera'], now() - interval '1314 minutes'),

('software-tip-android-circle-to-search', 'SOFTWARE', 'Circle to Search: Look Up Anything on Your Screen', 'Android', 'Samsung Galaxy, Pixel and other newer phones', NULL, '/tips/android-circle-to-search.jpg',
$tip$1. On any screen (a video, chat, photo or website), touch and hold the home button, or the navigation bar at the bottom.
2. Circle, highlight or tap the thing you want: a product, a word, a place, a phone model.
3. Google search results appear at the bottom without leaving your app.
4. Translate the whole screen with the translate button.
5. Not working? Settings, Display (or System), Navigation bar, and turn on Circle to Search.

Available on many newer Samsung, Pixel and other Android phones. Older phones can use Google Lens on a screenshot instead (see our Google Lens tip).$tip$,
ARRAY['Circle to Search'], now() - interval '1315 minutes'),

('software-tip-android-quick-settings', 'SOFTWARE', 'Rearrange Quick Settings on Android for the Buttons You Use', 'Android', 'All Android', NULL, '/tips/android-quick-settings.jpg',
$tip$1. Swipe down twice from the top to open all quick settings.
2. Tap the pencil (Edit) or the three dots, then Edit buttons.
3. Drag the tiles you use most (Wi-Fi, mobile data, torch, hotspot, screen recorder, QR scanner) to the first row.
4. Remove ones you never use.
5. Touch and hold a tile to go straight to its full settings.

Samsung: you can also choose to show brightness and media controls on the panel in Quick panel settings.$tip$,
ARRAY['Quick settings'], now() - interval '1316 minutes'),

('software-tip-samsung-edge-panels', 'SOFTWARE', 'Samsung Edge Panels: Quick Apps from the Side of the Screen', 'Samsung', 'Galaxy phones', NULL, '/tips/samsung-edge-panels.jpg',
$tip$1. Settings, Display, Edge panels, turn on.
2. A small handle appears on the side of the screen. Swipe it inward to open your favourite apps from anywhere.
3. Tap Panels to add more: Tools (compass, ruler), Clipboard, Contacts, Weather.
4. Handle: set its position, size and transparency so it doesn't get in the way.
5. Drag an app from the panel to open it in a split screen or pop-up window.

Turn it off if you keep opening it by accident with a thick case.$tip$,
ARRAY['Edge panels'], now() - interval '1317 minutes'),

('software-tip-samsung-good-lock', 'SOFTWARE', 'Good Lock: Extra Customisation for Samsung Phones', 'Samsung', 'Galaxy (where available)', NULL, '/tips/samsung-good-lock.jpg',
$tip$Good Lock is Samsung's own free app for extra settings. It's in the Galaxy Store in many countries.

1. Open the Galaxy Store, search for Good Lock and install it.
2. Install modules from inside the app. Popular ones:
   LockStar: design your lock screen.
   NavStar: change the navigation bar and gestures.
   QuickStar: change the quick panel and status bar.
   Home Up: more home screen and recent apps options.
   One Hand Operation +: gestures from the screen edges.
3. Each module can be turned off to go back to normal.

Not available in your Galaxy Store? It depends on region. Avoid downloading it from unofficial APK sites.$tip$,
ARRAY['Galaxy Store', 'Good Lock'], now() - interval '1318 minutes'),

('software-tip-find-android-from-computer', 'SOFTWARE', 'Lost Android Phone? Find It from Any Computer', 'Android', 'All Android', NULL, '/tips/find-android-from-computer.jpg',
$tip$1. On a computer or another phone, open google.com/android/find (Find Hub, formerly Find My Device).
2. Sign in with the Google account used on the lost phone.
3. Choose the phone. You see its location if it's on and online.
4. Play sound: rings at full volume even when silent.
5. Secure device: locks it and shows a message and contact number on the screen.
6. Factory reset device: erases everything as a last resort. After that you can no longer locate it.

Samsung phones can also be found at smartthingsfind.samsung.com. Report a stolen phone to the police with the IMEI.$tip$,
ARRAY['Find Hub', 'Web browser'], now() - interval '1319 minutes'),

('software-tip-android-bedtime-mode', 'SOFTWARE', 'Bedtime Mode on Android: Grey Screen and Silence at Night', 'Android', 'All Android', NULL, '/tips/android-bedtime-mode.jpg',
$tip$1. Pixel and many others: Settings, Digital Wellbeing and parental controls, Bedtime mode.
   Samsung: Settings, Modes and Routines, Sleep.
2. Set a schedule, for example 22:30 to 06:00, or turn on while charging at bedtime.
3. Choose options:
   Greyscale: makes the screen black and white so it's less tempting.
   Do Not Disturb: silences notifications (alarms still ring).
   Dark theme and dimmed wallpaper.
4. Allow calls from favourite contacts so family can still reach you.

Use with our sleep and screens tip for better rest.$tip$,
ARRAY['Digital Wellbeing', 'Modes'], now() - interval '1320 minutes'),

('software-tip-android-select-to-speak', 'SOFTWARE', 'Select to Speak: Have Your Phone Read Text Aloud', 'Android', 'All Android', NULL, '/tips/android-select-to-speak.jpg',
$tip$Helpful for people with poor eyesight or difficulty reading, and older parents.

1. Settings, Accessibility, Select to Speak (Samsung: Accessibility, Installed apps, Select to Speak). Turn on.
2. A small person icon appears on the screen (or use the shortcut you chose).
3. Tap it, then tap or drag over the text you want read: a message, a news article, a letter photo.
4. Change voice speed and language: Settings, Accessibility, Text-to-speech output.

Install "Speech Recognition and Synthesis from Google" from the Play Store if no voice is available.$tip$,
ARRAY['Accessibility', 'Text-to-speech'], now() - interval '1321 minutes'),

('software-tip-android-sound-notifications', 'SOFTWARE', 'Sound Notifications: Android Alerts for Alarms, Doorbells and Babies', 'Android', 'All Android', NULL, '/tips/android-sound-notifications.jpg',
$tip$1. Install "Live Transcribe and Notification" from the Play Store if your phone doesn't have it.
2. Settings, Accessibility, Sound Notifications (Samsung: Accessibility, Hearing enhancements, Sound notifications). Turn on.
3. Choose sounds: smoke alarm, siren, doorbell, door knock, baby crying, dog barking, water running, appliance beeps.
4. The phone vibrates, flashes and shows a notification when it hears them.
5. Save your own sounds (like your gate bell) under Custom sounds.

Works without internet. Put the phone where it can hear the sound.$tip$,
ARRAY['Sound Notifications'], now() - interval '1322 minutes'),

('software-tip-android-custom-vibration', 'SOFTWARE', 'Custom Vibration Patterns on Android: Know Who Is Calling Without Looking', 'Android', 'Samsung and others', NULL, '/tips/android-custom-vibration.jpg',
$tip$1. Samsung: Settings, Sounds and vibration, Call vibration pattern and Notification vibration pattern. Choose a pattern, or Create to tap your own.
2. Per contact (Samsung): Contacts, open the person, Edit, View more, Vibration pattern.
3. Per app: Settings, Notifications, App notifications, choose the app and its categories, then sound and vibration.
4. Vibration strength: Settings, Sounds and vibration, Vibration intensity.

Pixel and others have fewer options: Settings, Sound and vibration, Vibration and haptics.$tip$,
ARRAY['Sounds and vibration'], now() - interval '1323 minutes'),

('software-tip-android-contact-ringtone', 'SOFTWARE', 'Set a Different Ringtone for Each Contact on Android', 'Android', 'All Android', NULL, '/tips/android-contact-ringtone.jpg',
$tip$1. Open Contacts and tap the person.
2. Samsung: Edit, View more (or three dots), Ringtone. Others: three dots, Set ringtone.
3. Choose a ringtone, or "Add from phone" (the + icon) to use a song or audio file.
4. Do the same for SMS: in Messages, open the chat, three dots, Notifications or Notification sound.

Your custom ringtone file must stay on the phone. If you delete it, the phone goes back to the default sound. See also our custom ringtone tip.$tip$,
ARRAY['Contacts'], now() - interval '1324 minutes'),

('software-tip-android-answer-end-calls', 'SOFTWARE', 'Answer and End Calls with the Buttons on Android', 'Android', 'All Android', NULL, '/tips/android-answer-end-calls.jpg',
$tip$Easier for older people, cracked screens or when wearing gloves.

1. Samsung: Settings, Accessibility, Interaction and dexterity (or Advanced settings), Answering and ending calls.
   Pixel and others: Settings, Accessibility, Power button ends call, and Phone app settings.
2. Turn on "Press Volume up to answer" and "Press Side key to end calls".
3. Auto answer (Samsung, with headphones or Bluetooth): answers after a few seconds.
4. Quick decline messages: Phone app, Settings, Quick decline messages, write your own (for example "In a meeting, will call back").$tip$,
ARRAY['Accessibility', 'Phone app'], now() - interval '1325 minutes'),

('software-tip-google-keep', 'SOFTWARE', 'Google Keep: Free Notes, Checklists and Reminders That Sync Everywhere', 'Android', 'Android, iPhone, web', NULL, '/tips/google-keep.jpg',
$tip$1. Open Keep (install from the Play Store or App Store) and sign in with Google.
2. New note: type, or tap the checkbox icon for a checklist (stock, shopping, to do).
3. Reminders: tap the bell to get reminded at a time or place.
4. Voice note: tap the microphone. Keep writes out what you say.
5. Photo note: take a photo of a whiteboard or receipt, then three dots, Grab image text.
6. Share a note with someone to edit it together.
7. Everything also appears at keep.google.com on a computer.$tip$,
ARRAY['Google Keep'], now() - interval '1326 minutes'),

('software-tip-google-calendar', 'SOFTWARE', 'Google Calendar: Reminders, Birthdays and Shared Schedules', 'Android', 'Android, iPhone, web', NULL, '/tips/google-calendar.jpg',
$tip$1. Open Google Calendar and tap + to add an event or task.
2. Notifications: in the event, choose when to be reminded (10 minutes, 1 day before). Add more than one.
3. Repeating events: weekly meetings, monthly rent, yearly birthdays.
4. Birthdays from your contacts can show automatically (Settings, Birthdays).
5. Share a calendar with staff or family: on a computer at calendar.google.com, Settings and sharing, Share with specific people.
6. Invite people to an event by adding their email. They get it in their own calendar.

Turn on "Default notifications" so you never forget to set a reminder.$tip$,
ARRAY['Google Calendar'], now() - interval '1327 minutes'),

('software-tip-samsung-notes', 'SOFTWARE', 'Samsung Notes: Handwriting, PDFs and Voice Recording', 'Samsung', 'Galaxy phones and tablets', NULL, '/tips/samsung-notes.jpg',
$tip$1. Open Samsung Notes and tap + for a new note.
2. Write with the S Pen or your finger (pen icon). Tap the text icon to convert handwriting to typed text.
3. Import PDFs (+ then PDF) and write or highlight on them, then share or save.
4. Record audio while writing (in lectures or meetings). Tapping the text later jumps to that moment in the recording.
5. Lock notes: three dots, Lock.
6. Sync to Samsung Cloud, or to Microsoft OneNote and Outlook to see notes on a Windows PC.$tip$,
ARRAY['Samsung Notes', 'S Pen'], now() - interval '1328 minutes'),

('software-tip-android-emergency-alerts', 'SOFTWARE', 'Emergency Alerts on Android: Keep Them On', 'Android', 'All Android', NULL, '/tips/android-emergency-alerts.jpg',
$tip$Phones can receive official alerts about floods, storms, missing children and other emergencies.

1. Samsung: Settings, Safety and emergency, Wireless emergency alerts.
   Pixel and others: Settings, Safety and emergency (or Notifications), Wireless emergency alerts.
2. Keep extreme and severe threat alerts on.
3. Alert reminder and vibration: keep on so you notice them.
4. Test alerts can be turned off.

Alerts depend on your country and network. They come from authorities, not normal SMS, and never ask you to send money or codes.$tip$,
ARRAY['Safety and emergency'], now() - interval '1329 minutes'),

('software-tip-android-hotspot-tips', 'SOFTWARE', 'Android Hotspot Tips: Save Data, Battery and Keep It Private', 'Android', 'All Android', NULL, '/tips/android-hotspot-tips.jpg',
$tip$1. Samsung: Settings, Connections, Mobile Hotspot and Tethering, Mobile Hotspot. Others: Network and internet, Hotspot and tethering.
2. Set a strong password and WPA2 or WPA3 security. Never leave it open.
3. Turn on "Turn off hotspot automatically" when no devices are connected, to save battery.
4. Check connected devices and block any you don't know.
5. Laptops download big updates over hotspots. On Windows, set the connection as metered (see our data tips) before connecting.
6. Set a mobile data warning (see our data limit tip) so the hotspot doesn't finish your bundle.

Keep the phone plugged in for long sessions.$tip$,
ARRAY['Mobile Hotspot'], now() - interval '1330 minutes'),

('software-tip-two-whatsapp-accounts', 'SOFTWARE', 'Use Two WhatsApp Accounts on One Phone', 'Android', 'Dual SIM phones', NULL, '/tips/two-whatsapp-accounts.jpg',
$tip$Option 1: WhatsApp's own feature (Android):
1. Open WhatsApp, Settings, tap the arrow next to your name (or Add account).
2. Verify the second number. Switch accounts from the same place.

Option 2: a second copy of the app:
Samsung: Settings, Advanced features, Dual Messenger, turn on for WhatsApp.
Xiaomi: Settings, Apps, Dual apps. Tecno, Infinix, itel: App twin.

Option 3: WhatsApp Business for your shop number and normal WhatsApp for personal.

Each account needs its own number that can receive the SMS or call to verify. Back up both accounts.$tip$,
ARRAY['WhatsApp', 'Dual Messenger'], now() - interval '1331 minutes'),

('software-tip-android-screen-recorder', 'SOFTWARE', 'Record Your Android Screen with Sound', 'Android', 'Android 11 and newer', NULL, '/tips/android-screen-recorder.jpg',
$tip$1. Swipe down twice and tap Screen recorder (add the tile with Edit if missing, see our quick settings tip).
2. Choose sound:
   None: silent.
   Media sounds (Device audio): records game or video sound.
   Media and mic: also records your voice.
3. Samsung: also choose video quality and show touches, or add a selfie video.
4. Tap Start. Stop from the notification or the red icon.
5. Recordings save to the Gallery (Movies or Screen recordings folder).

Some apps (banking, Netflix) block recording and show a black screen. That's normal.$tip$,
ARRAY['Screen recorder'], now() - interval '1332 minutes'),

('software-tip-android-night-photos', 'SOFTWARE', 'Better Night Photos on Android Phones', 'Android', 'All Android', NULL, '/tips/android-night-photos.jpg',
$tip$1. Use Night mode in the camera (in More on Samsung, or automatic on Pixel and many others).
2. Hold still until the capture finishes. Brace your arms or lean on something.
3. Wipe the lens. Grease causes glowing haze around lights.
4. Tap to focus on the subject and slide the brightness bar down a little to avoid blown-out lights.
5. Use the main 1x camera. Zoom and ultra-wide lenses are weaker at night.
6. Turn the flash off for scenes. Use it only for people close to you.

A cheap phone tripod makes a huge difference for night shots.$tip$,
ARRAY['Camera'], now() - interval '1333 minutes'),

('software-tip-android-pro-mode', 'SOFTWARE', 'Portrait and Pro Mode: More Control Over Phone Photos', 'Android', 'Samsung, Xiaomi, Tecno and others', NULL, '/tips/android-pro-mode.jpg',
$tip$Portrait mode:
1. Choose Portrait in the camera and keep 1 to 2 metres from the person.
2. Adjust background blur before or after taking the photo.

Pro (Manual) mode:
ISO: lower (50 to 200) for clean photos in good light. Higher in the dark adds grain.
Shutter speed: faster (1/250) freezes movement. Slower lets in more light but needs a steady hand.
Focus: manual focus helps for close-ups of small parts.
White balance (WB): fixes yellow or blue colours under indoor lights.
EV: makes the whole photo brighter or darker.

Shoot in RAW (Pro settings) if you plan to edit photos later.$tip$,
ARRAY['Camera', 'Pro mode'], now() - interval '1334 minutes')
ON CONFLICT ("id") DO NOTHING;
