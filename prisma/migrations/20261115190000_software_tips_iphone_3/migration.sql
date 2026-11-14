-- One-time content load (no schema change): 20 more iPhone tips, each with its
-- own photo from public/tips (free Pexels photos).
-- Fixed ids + ON CONFLICT DO NOTHING: added once, admin edits never overwritten.

INSERT INTO "RepairGuide" ("id", "category", "title", "brand", "modelName", "videoUrl", "thumbnail", "content", "toolsUsed", "createdAt") VALUES
('software-tip-iphone-siri', 'SOFTWARE', 'Set Up Siri and Type to Siri on iPhone', 'Apple', 'iPhone', NULL, '/tips/iphone-siri.jpg',
$tip$1. Open Settings, Siri (on newer iOS: Apple Intelligence and Siri, or Siri and Search).
2. Turn on "Listen for Siri" (or "Hey Siri") and follow the voice setup.
3. Press and hold the side button to talk to Siri at any time.
4. Type to Siri: Settings, Accessibility, Siri, Type to Siri. Useful in quiet places.
5. Useful requests: "Set an alarm for 6 AM", "Call Mum on speaker", "Turn on the torch", "Remind me to pay the bill at 5".
6. Privacy: turn off "Allow Siri When Locked" so strangers can't use it on the lock screen.

Siri not hearing you? Clean the microphone holes gently with a soft dry brush.$tip$,
ARRAY['Settings', 'Siri'], now() - interval '900 minutes'),

('software-tip-iphone-scan-documents', 'SOFTWARE', 'Scan Documents to PDF with the iPhone Notes App', 'Apple', 'iPhone', NULL, '/tips/iphone-scan-documents.jpg',
$tip$No scanner needed for forms, receipts and ID copies.

1. Open Notes and start a new note.
2. Tap the camera (or paperclip) icon, then Scan Documents.
3. Hold the iPhone over the page. It captures automatically when the page is steady, or tap the shutter.
4. Drag the corners to crop, then Keep Scan. Add more pages the same way, then Save.
5. Tap the scan, then Share, to send it as a PDF by WhatsApp or email, or Save to Files.

The Files app can also scan: open Files, tap the three dots, Scan Documents. Use good light and a dark background for clean edges.$tip$,
ARRAY['Notes', 'Files'], now() - interval '901 minutes'),

('software-tip-iphone-facetime', 'SOFTWARE', 'FaceTime Tips: Calls, Links for Android Users and Data Use', 'Apple', 'iPhone', NULL, '/tips/iphone-facetime.jpg',
$tip$1. Turn on: Settings, FaceTime (iOS 18: Settings, Apps, FaceTime), and sign in with your Apple ID.
2. Call: open FaceTime, tap New FaceTime, type a contact who has an iPhone, iPad or Mac.
3. Android or Windows friends: tap Create Link and send it. They join from a web browser.
4. During a call, tap the screen for options: switch camera, mute, share your screen, or turn on Portrait blur.
5. Data: FaceTime video uses a lot of mobile data. Use Wi-Fi, or turn off FaceTime under Settings, Mobile Data.

Calls not connecting? Check the date and time are automatic, and that both people are online.$tip$,
ARRAY['FaceTime'], now() - interval '902 minutes'),

('software-tip-iphone-imessage', 'SOFTWARE', 'iMessage Not Working? Blue vs Green Messages Explained', 'Apple', 'iPhone', NULL, '/tips/iphone-imessage.jpg',
$tip$Blue bubbles are iMessages (free over internet, between Apple devices). Green bubbles are normal SMS (charged by your network).

1. Settings, Messages (iOS 18: Settings, Apps, Messages): make sure iMessage is on.
2. Send and Receive: your phone number should be ticked.
3. Turn on "Send as Text Message" so messages go as SMS when iMessage fails.
4. Stuck on "Waiting for activation"? Check you have internet and SMS balance, then turn iMessage off and on again.
5. Switched to Android? Turn off iMessage first, or deregister your number at Apple's "Deregister iMessage" page, otherwise iPhone friends' messages won't reach you.$tip$,
ARRAY['Messages', 'Settings'], now() - interval '903 minutes'),

('software-tip-iphone-shortcuts', 'SOFTWARE', 'Automate Your iPhone with the Shortcuts App', 'Apple', 'iPhone', NULL, '/tips/iphone-shortcuts.jpg',
$tip$Shortcuts can do things for you automatically.

1. Open the Shortcuts app (search for it if hidden), then the Automation tab.
2. Tap New Automation (or +) and choose a trigger, for example Battery Level, Time of Day, or Wi-Fi.
3. Add an action. Popular examples:
   When battery falls below 20%: turn on Low Power Mode.
   At 22:00: turn on Do Not Disturb.
   When connected to home Wi-Fi: turn off mobile data.
4. Choose "Run Immediately" so it doesn't ask each time.

The Gallery tab has ready-made shortcuts you can add with one tap.$tip$,
ARRAY['Shortcuts'], now() - interval '904 minutes'),

('software-tip-iphone-translate', 'SOFTWARE', 'Translate Speech, Text and Signs with the iPhone Translate App', 'Apple', 'iPhone', NULL, '/tips/iphone-translate.jpg',
$tip$1. Open the Translate app and choose the two languages.
2. Type or tap the microphone and speak. The translation appears and can be played aloud.
3. Conversation tab: put the phone between two people. It detects who is speaking.
4. Camera tab: point at a menu, sign or label to translate it on the screen.
5. Offline: Settings, Translate (or Apps, Translate), Downloaded Languages. Download the ones you need.

Apple's app supports fewer languages. For Swahili, Luganda and more, use Google Translate (see our Google Translate tip).$tip$,
ARRAY['Translate app'], now() - interval '905 minutes'),

('software-tip-iphone-voice-memos', 'SOFTWARE', 'Record, Trim and Share Audio with Voice Memos on iPhone', 'Apple', 'iPhone', NULL, '/tips/iphone-voice-memos.jpg',
$tip$1. Open Voice Memos and tap the red button to record. Tap again to stop.
2. Tap the recording, then the three dots, Edit Recording, to trim the start or end, or replace a part.
3. Enhance Recording (the magic wand in Edit) reduces background noise.
4. Share as an audio file by WhatsApp, email or AirDrop.
5. Rename recordings so you can find them later. Settings, Voice Memos lets you name them by location automatically.
6. Recordings sync to iCloud if Voice Memos is on in iCloud settings.

Always ask permission before recording people, meetings or calls.$tip$,
ARRAY['Voice Memos'], now() - interval '906 minutes'),

('software-tip-iphone-duplicate-photos', 'SOFTWARE', 'Find and Merge Duplicate Photos on iPhone', 'Apple', 'iPhone (iOS 16 and newer)', NULL, '/tips/iphone-duplicate-photos.jpg',
$tip$WhatsApp and screenshots fill the library with copies. The Photos app can find them.

1. Open Photos, then scroll to Utilities (or Albums, Utilities) and tap Duplicates.
2. Each group shows the copies. Tap Merge to keep the best quality one with all details combined.
3. Or tap Select, then Merge for many at once.
4. Merged extras go to Recently Deleted for 30 days, then free space for real.
5. Stop WhatsApp saving every photo: WhatsApp, Settings, Chats, turn off Save to Photos.

Not seeing Duplicates? It appears only after the iPhone finishes scanning the library, usually overnight while charging.$tip$,
ARRAY['Photos'], now() - interval '907 minutes'),

('software-tip-iphone-offload-apps', 'SOFTWARE', 'Offload Apps on iPhone: Free Space Without Losing Data', 'Apple', 'iPhone', NULL, '/tips/iphone-offload-apps.jpg',
$tip$Offloading removes an app but keeps its documents and data. Reinstall later and everything is back.

1. Settings, General, iPhone Storage. Wait for the list to load.
2. Tap a big app you rarely use, then Offload App. Its icon stays with a small cloud.
3. Tap the icon any time to download it again (needs internet).
4. Automatic: Settings, App Store, turn on Offload Unused Apps.
5. "Delete App" is different: it removes the app and its data.

Don't offload apps you need offline in an emergency, or apps that may be removed from the App Store.$tip$,
ARRAY['iPhone Storage'], now() - interval '908 minutes'),

('software-tip-iphone-lock-hide-apps', 'SOFTWARE', 'Lock or Hide Apps with Face ID on iPhone', 'Apple', 'iPhone (iOS 18 and newer)', NULL, '/tips/iphone-lock-hide-apps.jpg',
$tip$1. Touch and hold the app's icon on the Home Screen.
2. Tap "Require Face ID" (or Touch ID or Passcode).
3. Choose Require Face ID: the app opens only after Face ID. Its content won't show in search or notifications.
4. Or choose "Hide and Require Face ID": the app moves to a locked Hidden folder at the bottom of the App Library.
5. To undo, touch and hold the app again and tap "Don't Require Face ID".

Great for banking, mobile money, gallery and chat apps when someone borrows your phone. Built-in apps like Settings can't be hidden.$tip$,
ARRAY['Face ID', 'App Library'], now() - interval '909 minutes'),

('software-tip-iphone-carrier-lock', 'SOFTWARE', 'Check If an iPhone Is Network Locked (Carrier Lock)', 'Apple', 'iPhone', NULL, '/tips/iphone-carrier-lock.jpg',
$tip$Many iPhones from the USA and other countries are locked to one network and won't work with Ugandan SIMs.

1. Open Settings, General, About.
2. Scroll to Carrier Lock (or Network Provider Lock).
3. "No SIM restrictions" means it's unlocked and works with any network.
4. Anything else means it's locked. Only the original network can unlock it properly.
5. Also test with your own SIM: make a call and use mobile data before paying.

Be careful of cheap "unlocked" iPhones that use a SIM sticker (chip under the SIM). They often lose signal, break after updates and can't use some features.$tip$,
ARRAY['Settings', 'Your SIM card'], now() - interval '910 minutes'),

('software-tip-iphone-airplay', 'SOFTWARE', 'Show Your iPhone on a TV with AirPlay', 'Apple', 'iPhone', NULL, '/tips/iphone-airplay.jpg',
$tip$Works with Apple TV and many newer smart TVs from Samsung, LG, Sony and others that support AirPlay.

1. Connect the iPhone and the TV to the same Wi-Fi.
2. Open Control Centre and tap Screen Mirroring (two rectangles).
3. Choose the TV. Enter the code shown on the TV if asked.
4. Videos only: in YouTube or Photos, tap the AirPlay or cast icon instead, and you can use the phone for other things.
5. To stop: Control Centre, Screen Mirroring, Stop Mirroring.

TV not listed? Check AirPlay is turned on in the TV's settings, and that both are on the same network, not guest Wi-Fi.$tip$,
ARRAY['Control Centre', 'AirPlay'], now() - interval '911 minutes'),

('software-tip-iphone-alarms-sleep', 'SOFTWARE', 'iPhone Alarms That Always Wake You Up', 'Apple', 'iPhone', NULL, '/tips/iphone-alarms-sleep.jpg',
$tip$1. Clock app, Alarms, + to add. Set the time, repeat days, and a loud sound.
2. Alarms ring even in silent mode and Do Not Disturb.
3. Alarm too quiet? Its volume follows the ringer volume. Settings, Sounds and Haptics: raise "Ringtone and Alerts". Turn off "Change with Buttons" so it isn't lowered by accident.
4. Sleep schedule: Clock, Alarms, Change (or the Health app, Sleep) for a regular bedtime and wake-up with a gentle alarm.
5. Snooze is 9 minutes. Turn it off per alarm if you tend to oversleep.

Attention-aware features can lower the alarm when you look at the phone. Turn off in Face ID settings if needed.$tip$,
ARRAY['Clock app'], now() - interval '912 minutes'),

('software-tip-iphone-contacts-duplicates', 'SOFTWARE', 'Merge Duplicate Contacts and Choose Where Contacts Are Saved (iPhone)', 'Apple', 'iPhone', NULL, '/tips/iphone-contacts-duplicates.jpg',
$tip$1. Open Contacts. If duplicates exist, "Duplicates Found" appears at the top. Tap View Duplicates, then Merge All.
2. See which accounts hold contacts: Settings, Contacts (iOS 18: Settings, Apps, Contacts), Accounts.
3. Default Account: choose iCloud or Gmail so new contacts are backed up, not "On My iPhone".
4. Contacts from your old Android phone are in Gmail? Add the Google account and turn on Contacts.
5. Missing contacts? In the Contacts app, tap Lists and choose All Contacts.

Check icloud.com/contacts or contacts.google.com to confirm your contacts are really backed up.$tip$,
ARRAY['Contacts', 'iCloud'], now() - interval '913 minutes'),

('software-tip-iphone-messages-storage', 'SOFTWARE', 'Stop Messages Filling Your iPhone Storage', 'Apple', 'iPhone', NULL, '/tips/iphone-messages-storage.jpg',
$tip$1. Settings, General, iPhone Storage, Messages.
2. Review Large Attachments: swipe left on big videos and photos to delete them.
3. Keep Messages: Settings, Messages (iOS 18: Apps, Messages), Keep Messages. Choose 1 Year or 30 Days to remove old ones automatically.
4. Audio Messages: set them to expire after 2 minutes unless you keep them.
5. Turn on Messages in iCloud (Settings, your name, iCloud) so chats are stored in iCloud and the phone keeps less.

Before setting Keep Messages to 30 days, save any important photos or receipts from chats.$tip$,
ARRAY['iPhone Storage', 'Messages'], now() - interval '914 minutes'),

('software-tip-iphone-restore-icloud', 'SOFTWARE', 'Restore an iPhone from an iCloud Backup', 'Apple', 'iPhone', NULL, '/tips/iphone-restore-icloud.jpg',
$tip$Restoring from iCloud is only offered during setup, on a new or erased iPhone.

1. Check the backup exists: on the old phone or another Apple device, Settings, your name, iCloud, iCloud Backup. Note the date.
2. On the new or erased iPhone, start setup and connect to Wi-Fi.
3. At Transfer Your Apps and Data, choose From iCloud Backup and sign in with the same Apple ID.
4. Choose the newest backup. Keep the phone on Wi-Fi and charging until apps and photos finish downloading.
5. Restoring an iPhone you already use? Back it up first, then Settings, General, Transfer or Reset iPhone, Erase All Content and Settings.

The backup can't be restored to a phone with an older iOS than the backup. Update first if asked.$tip$,
ARRAY['iCloud Backup'], now() - interval '915 minutes'),

('software-tip-iphone-passwords-app', 'SOFTWARE', 'See Saved Passwords and Security Warnings on iPhone', 'Apple', 'iPhone', NULL, '/tips/iphone-passwords-app.jpg',
$tip$1. iOS 18 and newer: open the Passwords app. Older iOS: Settings, Passwords.
2. Unlock with Face ID. Search for a website or app to see its username and password.
3. Wi-Fi tab: see passwords of networks you've joined, and share them with a QR code.
4. Security tab: warnings for reused, weak or leaked passwords. Change those first.
5. Verification codes: the app can store 2-step codes for accounts that support authenticator apps.
6. Passwords sync to your Mac, iPad and even Windows (iCloud for Windows) when iCloud Keychain is on.

Never share screenshots of this app. Anyone could log in as you.$tip$,
ARRAY['Passwords app', 'iCloud Keychain'], now() - interval '916 minutes'),

('software-tip-qr-codes-safely', 'SOFTWARE', 'Scan QR Codes Safely with Your Phone', 'All brands', 'iPhone, Android', NULL, '/tips/qr-codes-safely.jpg',
$tip$1. iPhone: open the Camera and point it at the code. Tap the link that appears. Or add Code Scanner to Control Centre.
2. Android: open the Camera, or use Google Lens, or the QR scanner in quick settings.
3. Check the link before you tap it. Make sure it goes to the real website.
4. Scammers stick fake QR codes over real ones on posters, parking signs and shop counters. Check for a sticker on top.
5. Don't enter PINs or card details on a page opened from a random QR code.
6. Wi-Fi QR codes join the network directly. That's safe when the code comes from the owner.

Paying by QR? Check the shop name shown before confirming.$tip$,
ARRAY['Camera', 'Google Lens'], now() - interval '917 minutes'),

('software-tip-iphone-shared-albums', 'SOFTWARE', 'Share Photos with Family Using iPhone Shared Albums', 'Apple', 'iPhone', NULL, '/tips/iphone-shared-albums.jpg',
$tip$1. Turn on: Settings, Photos (iOS 18: Apps, Photos), Shared Albums.
2. In Photos, open Albums, tap +, New Shared Album. Name it (for example "Wedding 2026").
3. Invite people by their Apple ID email or phone number. Others can use a public website link if you turn it on.
4. Add photos: select them, Share, Add to Shared Album.
5. Everyone invited can add photos, like and comment.

Shared albums don't count against your iCloud storage, but they store smaller copies. Keep the full size originals elsewhere. For Android family, use Google Photos sharing instead.$tip$,
ARRAY['Photos', 'Shared Albums'], now() - interval '918 minutes'),

('software-tip-find-lost-airpods', 'SOFTWARE', 'Find Lost AirPods and Get Alerts Before You Leave Them', 'Apple', 'AirPods, iPhone', NULL, '/tips/find-lost-airpods.jpg',
$tip$1. Open the Find My app, then Devices, and choose your AirPods.
2. The map shows where they were last connected.
3. Play Sound: helps find them under cushions or in a bag (take them out of your ears first).
4. AirPods Pro and newer models show "Find Nearby" with direction and distance.
5. Notify When Left Behind: turn on for the AirPods so the iPhone warns when you walk away from them.
6. Mark as Lost shows your phone number to anyone who connects them.

Find My must be turned on in the AirPods settings before they're lost. Check it today.$tip$,
ARRAY['Find My'], now() - interval '919 minutes')
ON CONFLICT ("id") DO NOTHING;
