-- One-time content load (no schema change): 25 more tips (iPhone and Android),
-- each with its own photo from public/tips (free Pexels photos).
-- Fixed ids + ON CONFLICT DO NOTHING: added once, admin edits never overwritten.

INSERT INTO "RepairGuide" ("id", "category", "title", "brand", "modelName", "videoUrl", "thumbnail", "content", "toolsUsed", "createdAt") VALUES
('software-tip-iphone-camera-settings', 'SOFTWARE', 'iPhone Camera Settings for Better Photos', 'Apple', 'iPhone', NULL, '/tips/iphone-camera-settings.jpg',
$tip$Open Settings, then Camera (on iOS 18: Settings, Apps, Camera).

1. Grid: turn it on to keep horizons straight and frame photos better.
2. Formats: "High Efficiency" saves space. "Most Compatible" (JPEG) is easier to share with old PCs.
3. Preserve Settings: keep your last mode (Portrait, Video) instead of resetting to Photo.
4. Record Video: 1080p at 30 fps is fine for WhatsApp and saves a lot of space. 4K files are huge.
5. Mirror Front Camera: makes selfies look the way you saw them in the preview.
6. Lens Correction: keep on for the front and ultra wide cameras.

Wipe the lens with a soft cloth before shooting. Most blurry photos are just a greasy lens.$tip$,
ARRAY['Settings', 'Camera'], now() - interval '600 minutes'),

('software-tip-iphone-live-text', 'SOFTWARE', 'Copy Text from Photos with Live Text (iPhone)', 'Apple', 'iPhone XS and newer', NULL, '/tips/iphone-live-text.jpg',
$tip$Live Text reads text in photos and the camera view, so you don't have to type it.

1. Open the Camera and point it at text (a receipt, a sign, a phone number).
2. Tap the text icon in the corner of the frame.
3. Select the words and tap Copy, or tap a phone number to call or a link to open it.
4. In Photos: open a picture with text, touch and hold the words, then Copy or Translate.
5. Not working? Check Settings, General, Language and Region, Live Text is on. It needs iOS 15 or newer.

Great for copying mobile money numbers, Wi-Fi passwords on routers, and account numbers from photos.$tip$,
ARRAY['Camera', 'Photos'], now() - interval '601 minutes'),

('software-tip-iphone-hidden-album', 'SOFTWARE', 'Hide Private Photos on iPhone and Lock the Hidden Album', 'Apple', 'iPhone', NULL, '/tips/iphone-hidden-album.jpg',
$tip$1. In Photos, open a picture (or select several), tap the three dots, then Hide.
2. Hidden photos move to the Hidden album under Utilities, out of your main library.
3. Lock it: Settings, Photos (iOS 18: Settings, Apps, Photos), turn on "Use Face ID" (or Touch ID or Passcode).
4. To hide the album completely, turn off "Show Hidden Album" in the same place.
5. To unhide: open the Hidden album, select the photo, three dots, Unhide.

Hidden photos still sync to iCloud Photos and are included in backups. Anyone who knows your passcode can still open them, so keep it private.$tip$,
ARRAY['Photos', 'Face ID'], now() - interval '602 minutes'),

('software-tip-iphone-keyboard', 'SOFTWARE', 'iPhone Keyboard Tips: Autocorrect, Shortcuts and One-Handed Typing', 'Apple', 'iPhone', NULL, '/tips/iphone-keyboard.jpg',
$tip$Open Settings, General, Keyboard.

1. Text Replacement: add shortcuts, for example "adr" becomes your full address. Great for phone numbers and email.
2. Auto-Correction and Auto-Capitalisation: turn off if they keep changing local names or words.
3. One-handed keyboard: touch and hold the emoji or globe key and pick left or right.
4. Move the cursor: touch and hold the space bar, then slide your finger.
5. Undo typing: shake the iPhone or swipe left with three fingers.
6. Add a language: Keyboards, Add New Keyboard. Switch with the globe key.$tip$,
ARRAY['Settings', 'Keyboard'], now() - interval '603 minutes'),

('software-tip-iphone-wifi-calling', 'SOFTWARE', 'Turn On Wi-Fi Calling on iPhone', 'Apple', 'iPhone', NULL, '/tips/iphone-wifi-calling.jpg',
$tip$Wi-Fi Calling makes normal phone calls over Wi-Fi when the mobile signal is weak, for example inside buildings.

1. Open Settings, Phone (iOS 18: Settings, Apps, Phone), then Wi-Fi Calling.
2. Turn on "Wi-Fi Calling on This iPhone" and confirm your emergency address if asked.
3. When it works, the status bar shows your network name with "Wi-Fi".
4. Calls use your normal number and are billed like normal calls.

Only works if your mobile network supports Wi-Fi Calling for your SIM. If the option is missing, ask your network or update iOS and carrier settings (Settings, General, About).$tip$,
ARRAY['Settings', 'Wi-Fi'], now() - interval '604 minutes'),

('software-tip-iphone-esim', 'SOFTWARE', 'Set Up or Move an eSIM on iPhone', 'Apple', 'iPhone XS and newer', NULL, '/tips/iphone-esim.jpg',
$tip$An eSIM is a digital SIM: no plastic card needed.

1. Ask your network for an eSIM. They give you a QR code or activate it for you.
2. On the iPhone: Settings, Mobile Data (or Cellular), Add eSIM, then scan the QR code. Stay on Wi-Fi.
3. Name the lines (for example "Work" and "Personal") and choose which one is used for data.
4. New iPhone? Use "Transfer from nearby iPhone" during setup, or Add eSIM, then choose the old phone.
5. Erasing the iPhone asks whether to keep or delete the eSIM. Keep it unless you are selling the phone.

Don't delete an eSIM unless you're sure. Getting a new one usually means a visit to the network's shop.$tip$,
ARRAY['Settings', 'eSIM QR code'], now() - interval '605 minutes'),

('software-tip-sim-pin', 'SOFTWARE', 'Lock Your SIM Card with a SIM PIN (iPhone and Android)', 'All brands', 'iPhone, Android', NULL, '/tips/sim-pin.jpg',
$tip$A SIM PIN stops a thief from putting your SIM into another phone and receiving your calls, SMS codes and mobile money messages.

iPhone: Settings, Mobile Data (or Cellular), SIM PIN, turn on.
Android: Settings, Security (or Biometrics and security), Other security settings or More security, Set up SIM card lock (names vary).

1. Enter the current PIN. The default is printed on the SIM pack, or ask your network.
2. Then change it to your own 4 to 8 digit PIN.
3. You'll enter it every time the phone restarts.

Careful: 3 wrong tries locks the SIM and asks for the PUK code. Get the PUK from your network. Wrong PUK tries can block the SIM for good.$tip$,
ARRAY['Settings', 'SIM PIN'], now() - interval '606 minutes'),

('software-tip-iphone-airdrop', 'SOFTWARE', 'Use AirDrop Safely on iPhone', 'Apple', 'iPhone', NULL, '/tips/iphone-airdrop.jpg',
$tip$AirDrop sends photos, videos and files between Apple devices nearby, with no internet and full quality.

1. Turn on Wi-Fi and Bluetooth on both devices.
2. Choose who can send to you: Settings, General, AirDrop.
   Receiving Off: nobody.
   Contacts Only: only people in your contacts (they must be signed in with the number or email you saved).
   Everyone for 10 Minutes: anyone nearby, then it switches back.
3. To send: tap Share, then AirDrop, then the person's device.
4. Bring two iPhones close together (iOS 17 and newer) to share contacts with NameDrop.

Keep it on Contacts Only in public places so strangers can't send you unwanted pictures.$tip$,
ARRAY['AirDrop', 'Settings'], now() - interval '607 minutes'),

('software-tip-iphone-block-callers', 'SOFTWARE', 'Block Callers and Silence Unknown Numbers on iPhone', 'Apple', 'iPhone', NULL, '/tips/iphone-block-callers.jpg',
$tip$1. Block a number: Phone app, Recents, tap the "i" next to the number, then Block this Caller. Blocked numbers can't call, FaceTime or text you.
2. See or remove blocked numbers: Settings, Phone (iOS 18: Settings, Apps, Phone), Blocked Contacts.
3. Silence Unknown Callers: in the same Phone settings. Calls from numbers not in your contacts go straight to voicemail and show in Recents.
4. Block SMS spam: in Messages, open the chat, tap the number, Block this Caller. Also turn on Filter Unknown Senders in Settings, Messages.

Silence Unknown Callers also silences calls from delivery riders and new clients. Turn it on only when spam calls get too much.$tip$,
ARRAY['Phone app', 'Settings'], now() - interval '608 minutes'),

('software-tip-iphone-mail-accounts', 'SOFTWARE', 'Add Gmail or Work Email to the iPhone Mail App', 'Apple', 'iPhone', NULL, '/tips/iphone-mail-accounts.jpg',
$tip$1. Open Settings, Mail (iOS 18: Settings, Apps, Mail), Mail Accounts, Add Account.
2. Choose Google, Microsoft Exchange, Outlook.com or Yahoo, and sign in. Allow access when asked.
3. Pick what to sync: Mail, Contacts, Calendars, Notes.
4. Work email on another provider? Choose Other, Add Mail Account, and enter the server details from your IT person.
5. Remove an account: Mail Accounts, tap it, Delete Account. This only removes it from the phone, not the email itself.

Prefer the Gmail or Outlook app? Download it from the App Store instead. Both work fine.$tip$,
ARRAY['Mail', 'Settings'], now() - interval '609 minutes'),

('software-tip-iphone-safari-privacy', 'SOFTWARE', 'Safari on iPhone: Clear History, Block Pop-ups and Browse Privately', 'Apple', 'iPhone', NULL, '/tips/iphone-safari-privacy.jpg',
$tip$Open Settings, Safari (iOS 18: Settings, Apps, Safari).

1. Clear History and Website Data: removes history, cookies and cached files. Fixes many website loading problems.
2. Block Pop-ups: keep on.
3. Fraudulent Website Warning: keep on. Safari warns before opening known scam pages.
4. Prevent Cross-Site Tracking: keep on.
5. Private Browsing: in Safari, tap the tabs button, then swipe to Private. History isn't saved after you close those tabs.
6. Search engine: choose Google or another in the same settings.

Clearing website data signs you out of websites, so have your passwords ready.$tip$,
ARRAY['Safari', 'Settings'], now() - interval '610 minutes'),

('software-tip-iphone-widgets', 'SOFTWARE', 'Add Widgets and Organise Your iPhone Home Screen', 'Apple', 'iPhone', NULL, '/tips/iphone-widgets.jpg',
$tip$1. Touch and hold an empty part of the Home Screen until the apps jiggle.
2. Tap Edit (or +), then Add Widget. Pick one (Weather, Battery, Calendar, Photos) and a size.
3. Drag it where you want and tap Done.
4. Make a folder: drag one app onto another.
5. Hide whole pages: tap the dots above the dock and untick pages you don't use.
6. Find any app: swipe left past the last page to the App Library.

The Batteries widget shows the charge of your iPhone, AirPods and Apple Watch together.$tip$,
ARRAY['Home Screen'], now() - interval '611 minutes'),

('software-tip-iphone-airpods', 'SOFTWARE', 'Connect and Set Up AirPods with iPhone', 'Apple', 'AirPods, iPhone', NULL, '/tips/iphone-airpods.jpg',
$tip$1. Unlock the iPhone and turn on Bluetooth.
2. Open the AirPods case next to the iPhone with the AirPods inside. Tap Connect on the pop-up.
3. AirPods settings appear at the top of the Settings app when connected: rename them, change what a press or tap does, turn on Automatic Ear Detection.
4. AirPods Pro: run the Ear Tip Fit Test and choose Noise Control modes.
5. Not connecting? Put them in the case, wait 30 seconds, open the lid, then hold the case button until the light flashes white to reset.
6. Lost one? Find My can play a sound on it.

Fake AirPods often connect but show strange names or no settings page. Buy from trusted sellers.$tip$,
ARRAY['Bluetooth', 'AirPods'], now() - interval '612 minutes'),

('software-tip-iphone-icloud-photos', 'SOFTWARE', 'iCloud Photos: How It Works and How to Turn It Off Safely', 'Apple', 'iPhone', NULL, '/tips/iphone-icloud-photos.jpg',
$tip$iCloud Photos keeps the same library on all your Apple devices and icloud.com.

1. Turn on: Settings, your name, iCloud, Photos, Sync this iPhone.
2. "Optimise iPhone Storage" keeps small copies on the phone and full ones in iCloud. Saves a lot of space.
3. Deleting a photo on one device deletes it everywhere (it stays 30 days in Recently Deleted).
4. Free iCloud is only 5 GB. A big library needs a paid plan or another backup.
5. Turning it off: first choose "Download and Keep Originals" and wait for the download to finish, otherwise the iPhone only keeps small copies.
6. Copying photos to a PC: use icloud.com/photos or the iCloud for Windows app.

Before switching phones or Apple IDs, make sure all photos have finished uploading.$tip$,
ARRAY['iCloud', 'Photos'], now() - interval '613 minutes'),

('software-tip-iphone-guided-access', 'SOFTWARE', 'Guided Access: Lock the iPhone to One App', 'Apple', 'iPhone', NULL, '/tips/iphone-guided-access.jpg',
$tip$Guided Access keeps the iPhone in one app. Great when handing your phone to a child, or showing a photo to someone.

1. Settings, Accessibility, Guided Access, turn it on.
2. Passcode Settings: set a Guided Access passcode (and Face ID if you like).
3. Open the app, then triple-click the side button (or Home button).
4. Tap Start. You can also circle parts of the screen to disable them, or turn off touch completely.
5. To end: triple-click again and enter the passcode.

Add a time limit in Options so the session ends by itself.$tip$,
ARRAY['Accessibility', 'Guided Access'], now() - interval '614 minutes'),

('software-tip-iphone-magnifier', 'SOFTWARE', 'Use Your iPhone as a Magnifier', 'Apple', 'iPhone', NULL, '/tips/iphone-magnifier.jpg',
$tip$Read small print, medicine labels, serial numbers and tiny screws.

1. Open the Magnifier app (search for it if it's not on the Home Screen).
2. Use the slider to zoom. Tap the flashlight button for light.
3. Tap the shutter to freeze the image and look closely.
4. Quick open: add Magnifier to Control Centre, or set it as the Accessibility Shortcut (Settings, Accessibility, Accessibility Shortcut) and triple-click the side button.
5. Filters can make text high contrast or inverted for easier reading.

Technicians use it to read IMEI stickers and board markings without a microscope.$tip$,
ARRAY['Magnifier'], now() - interval '615 minutes'),

('software-tip-iphone-medical-id', 'SOFTWARE', 'Set Up Medical ID and Emergency Contacts on iPhone', 'Apple', 'iPhone', NULL, '/tips/iphone-medical-id.jpg',
$tip$Medical ID lets first responders see your health details and emergency contacts without unlocking the phone.

1. Open the Health app, tap your picture, then Medical ID, then Edit (or Get Started).
2. Add blood type, allergies, medicines and conditions.
3. Add Emergency Contacts (they also get a message if you use Emergency SOS).
4. Turn on "Show When Locked".
5. To view it: on the lock screen, tap Emergency, then Medical ID.

Android has a similar feature: Settings, Safety and emergency, Medical information.$tip$,
ARRAY['Health app'], now() - interval '616 minutes'),

('software-tip-iphone-windows-sync', 'SOFTWARE', 'Connect an iPhone to a Windows PC (Apple Devices App)', 'Apple', 'iPhone, Windows', NULL, '/tips/iphone-windows-sync.jpg',
$tip$1. On Windows 10 or 11, install "Apple Devices" from the Microsoft Store (older PCs: iTunes from apple.com).
2. Connect the iPhone with a good cable, unlock it and tap Trust, then enter the passcode.
3. In Apple Devices you can back up the iPhone to the PC, update or restore iOS, and sync music.
4. Copy photos: open File Explorer, click Apple iPhone, then Internal Storage, DCIM. Or use the Photos app's Import.
5. "Encrypt local backup" also saves passwords and health data. Write the backup password down.

Phone not showing? Try another USB port or cable, update Windows, and reinstall Apple Devices.$tip$,
ARRAY['Apple Devices', 'USB cable'], now() - interval '617 minutes'),

('software-tip-iphone-app-data-usage', 'SOFTWARE', 'Stop Apps Using Mobile Data on iPhone', 'Apple', 'iPhone', NULL, '/tips/iphone-app-data-usage.jpg',
$tip$1. Open Settings, Mobile Data (or Cellular).
2. Scroll down to see how much data each app used.
3. Turn off apps that shouldn't use bundles, for example big games, cloud backups and video apps.
4. Low Data Mode: Mobile Data Options, Data Mode, Low Data Mode. Pauses automatic updates and background tasks.
5. Wi-Fi Assist (at the bottom) switches to mobile data when Wi-Fi is weak. Turn it off if your bundle runs out fast.
6. Reset the statistics at the bottom each month to track usage.

Also turn off "App Updates" over mobile data in Settings, App Store.$tip$,
ARRAY['Settings', 'Mobile Data'], now() - interval '618 minutes'),

('software-tip-call-forwarding', 'SOFTWARE', 'Call Forwarding and Call Waiting on iPhone and Android', 'All brands', 'iPhone, Android', NULL, '/tips/call-forwarding.jpg',
$tip$Call forwarding sends calls to another number, for example when one phone is off.

iPhone: Settings, Phone (iOS 18: Settings, Apps, Phone), Call Forwarding.
Android: Phone app, three dots, Settings, Calls or Supplementary services, Call forwarding.

Standard codes that work on most networks (dial, then press Call):
**21*number# forward all calls
**67*number# forward when busy
**61*number# forward when not answered
**62*number# forward when unreachable
##002# cancel all forwarding

Call Waiting (hear a second call while on a call) is in the same settings.

Forwarded calls may be charged. Calls not reaching you? Dial ##002# to remove forwarding someone may have set.$tip$,
ARRAY['Phone app', 'USSD codes'], now() - interval '619 minutes'),

('software-tip-android-developer-options', 'SOFTWARE', 'Turn On Developer Options and Make Android Feel Faster', 'Android', 'All Android', NULL, '/tips/android-developer-options.jpg',
$tip$1. Open Settings, About phone. On Samsung, also tap Software information.
2. Tap Build number 7 times and enter your PIN. You'll see "Developer mode has been turned on".
3. Developer options now appears in Settings (near the bottom, or under System).
4. Speed trick: set Window animation scale, Transition animation scale and Animator duration scale to 0.5x. The phone feels quicker.
5. USB debugging is also here (see our USB debugging tip).

Don't change other options unless you know what they do. To hide the menu, turn off the switch at the top of Developer options.$tip$,
ARRAY['Settings', 'Developer options'], now() - interval '620 minutes'),

('software-tip-android-split-screen', 'SOFTWARE', 'Use Two Apps at Once on Android (Split Screen)', 'Android', 'All Android', NULL, '/tips/android-split-screen.jpg',
$tip$1. Open the first app.
2. Open Recent apps (swipe up and hold, or tap the square button).
3. Tap the app's icon at the top of its preview, then "Open in split screen view" (Samsung) or "Split screen".
4. Pick the second app.
5. Drag the line in the middle to resize. Drag it to the edge to close one app.

Samsung extras: Pop-up view opens an app in a small floating window, and Edge panels give quick access to apps.

Some apps (banking, some games) don't support split screen.$tip$,
ARRAY['Recent apps'], now() - interval '621 minutes'),

('software-tip-android-navigation-gestures', 'SOFTWARE', 'Switch Between Gestures and Buttons on Android', 'Android', 'All Android', NULL, '/tips/android-navigation-gestures.jpg',
$tip$Android can use the three buttons (Back, Home, Recents) or swipe gestures.

Samsung: Settings, Display, Navigation bar.
Pixel and most others: Settings, System, Gestures (or Navigation), System navigation.
Tecno, Infinix and itel: Settings, System navigation or Smart Panel settings.

With gestures:
Swipe up from the bottom: Home
Swipe up and hold: Recent apps
Swipe in from the left or right edge: Back

Back button not working, or screen edge broken? Switch to the other method. A cracked edge often blocks gestures.$tip$,
ARRAY['Settings', 'Navigation bar'], now() - interval '622 minutes'),

('software-tip-android-clear-cache', 'SOFTWARE', 'Clear App Cache and Data the Right Way on Android', 'Android', 'All Android', NULL, '/tips/android-clear-cache.jpg',
$tip$1. Settings, Apps, choose the app, then Storage.
2. Clear cache: deletes temporary files only. Safe. Try this first when an app is slow or acting strange.
3. Clear data (or Clear storage): resets the app like it was just installed. You'll be signed out and lose anything not backed up.
4. Never clear data for WhatsApp, Telegram or games without a backup first. You can lose chats and progress.
5. Clearing the cache of Google Play Store and Google Play services fixes many download problems.

If clearing the cache doesn't help, update the app, then uninstall and reinstall it.$tip$,
ARRAY['Settings', 'Apps'], now() - interval '623 minutes'),

('software-tip-android-memory-card', 'SOFTWARE', 'Use a Memory Card (SD Card) on Android', 'Android', 'Phones with SD slot', NULL, '/tips/android-memory-card.jpg',
$tip$1. Insert the card with the phone off (it shares the SIM tray on most phones).
2. If asked, choose "Portable storage". The card can still be read in a PC or another phone.
3. Save photos to the card: Camera, Settings, Storage location, SD card (on phones that offer it).
4. Move files: open My Files or Files, select photos or videos, then Move to SD card.
5. Before removing: Settings, Storage, SD card, Unmount (or Eject).

Buy cards from trusted sellers. Fake cards show 128 GB but lose files after a few GB. Class 10, U1 or U3 cards are fast enough for video. Keep important photos backed up elsewhere too: cards fail without warning.$tip$,
ARRAY['My Files', 'microSD card'], now() - interval '624 minutes')
ON CONFLICT ("id") DO NOTHING;
