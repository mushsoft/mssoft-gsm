-- One-time content load (no schema change): 25 iPhone settings tips, each
-- with a thumbnail from public/tips (free Pexels photos).
-- Fixed ids + ON CONFLICT DO NOTHING: added once, admin edits never overwritten.

INSERT INTO "RepairGuide" ("id", "category", "title", "brand", "modelName", "videoUrl", "thumbnail", "content", "toolsUsed", "createdAt") VALUES
('software-tip-iphone-face-id', 'SOFTWARE', 'Set Up Face ID or Touch ID on iPhone', 'Apple', 'All iPhones', NULL, '/tips/iphone-settings.jpg',
$tip$1. Face ID (iPhone X and newer): Settings, then Face ID and Passcode, enter your passcode, then Set Up Face ID. Move your head slowly in a circle twice.
2. Touch ID (iPhone SE and older models with a Home button): Settings, then Touch ID and Passcode, then Add a Fingerprint. Add a second finger too.
3. Choose what it unlocks: iPhone Unlock, App Store, Apple Pay and Password AutoFill.
4. Face ID with a mask: turn on "Face ID with a Mask" on supported models.
5. Face ID stopped working after a drop or screen repair? The Face ID sensors may be damaged. Bring it in for a check.$tip$,
ARRAY['iPhone Settings'], now() - interval '200 minutes'),

('software-tip-iphone-find-my', 'SOFTWARE', 'Turn On Find My iPhone', 'Apple', 'All iPhones', NULL, '/tips/iphone-settings-icon.jpg',
$tip$Do this the day you get the phone. It's the only way to find a lost iPhone.

1. Settings, then your name at the top, then Find My, then Find My iPhone.
2. Turn on Find My iPhone, Find My network (finds it even when offline) and Send Last Location.
3. Lost it? Go to icloud.com/find on any device, or use the Find My app on another Apple device.
4. You can play a sound, see it on a map, turn on Lost Mode with a message and phone number, or erase it.
5. Find My also turns on Activation Lock, so a thief can't use the phone after erasing it.$tip$,
ARRAY['iPhone Settings', 'iCloud'], now() - interval '199 minutes'),

('software-tip-iphone-low-power-mode', 'SOFTWARE', 'Make an iPhone Battery Last Longer with Low Power Mode', 'Apple', 'All iPhones', NULL, '/tips/phone-charger-table.jpg',
$tip$1. Turn it on: Settings, then Battery, then Low Power Mode. The battery icon turns yellow.
2. Faster: add Low Power Mode to Control Center and tap it from there.
3. It reduces background refresh, mail fetch, visual effects and screen brightness until you charge.
4. It turns off by itself once the phone charges above 80 percent.
5. Other quick wins: lower brightness, set Auto-Lock to 30 seconds (Settings, then Display and Brightness), and turn off Background App Refresh for apps that don't need it (Settings, then General).$tip$,
ARRAY['iPhone Settings', 'Control Center'], now() - interval '198 minutes'),

('software-tip-iphone-charging-limit', 'SOFTWARE', 'Protect an iPhone Battery with Charging Limits', 'Apple', 'All iPhones', NULL, '/tips/charging-port.jpg',
$tip$Keeping a battery at 100 percent all the time wears it out faster.

1. iPhone 15 and newer: Settings, then Battery, then Charging. Choose a limit such as 80 percent. The phone stops there.
2. Older iPhones: Settings, then Battery, then Battery Health and Charging, then turn on Optimized Battery Charging. It learns your routine and finishes charging just before you usually unplug.
3. Avoid charging in a hot car or under a pillow. Heat ages batteries more than anything else.
4. Use a good quality charger and cable. Cheap ones can overheat the phone.$tip$,
ARRAY['iPhone Settings'], now() - interval '197 minutes'),

('software-tip-iphone-dark-mode', 'SOFTWARE', 'Turn On Dark Mode and Night Shift on iPhone', 'Apple', 'All iPhones', NULL, '/tips/iphone-icons.jpg',
$tip$1. Dark Mode: Settings, then Display and Brightness, then Dark. Choose "Automatic" to switch at sunset.
2. Night Shift (warmer colours at night, easier on the eyes): Settings, then Display and Brightness, then Night Shift. Set it to "Sunset to Sunrise".
3. Quick toggle: open Control Center, press and hold the brightness slider, and tap Dark Mode or Night Shift.
4. On iPhones with OLED screens (iPhone X and most newer models), Dark Mode also saves some battery.$tip$,
ARRAY['iPhone Settings', 'Control Center'], now() - interval '196 minutes'),

('software-tip-iphone-passcode', 'SOFTWARE', 'Change Your iPhone Passcode to a Stronger One', 'Apple', 'All iPhones', NULL, '/tips/iphone-black-bg.jpg',
$tip$1. Settings, then Face ID and Passcode (or Touch ID and Passcode), and enter your current passcode.
2. Tap Change Passcode.
3. Tap Passcode Options to choose a 6-digit code, a 4-digit code, or a custom code with letters and numbers (the strongest).
4. Avoid easy codes like 123456, 000000 or your birth year.
5. Forgot it? Too many wrong tries lock the iPhone, and the only fix is erasing it (see our "iPhone Unavailable" tip). Keep a backup.$tip$,
ARRAY['iPhone Settings'], now() - interval '195 minutes'),

('software-tip-iphone-stolen-device-protection', 'SOFTWARE', 'Turn On Stolen Device Protection on iPhone', 'Apple', 'iOS 17.3 and newer', NULL, '/tips/alert-message.jpg',
$tip$Stolen Device Protection stops a thief who learned your passcode from taking over your Apple ID.

1. Make sure Find My iPhone and Face ID or Touch ID are on.
2. Settings, then Face ID and Passcode, then turn on Stolen Device Protection.
3. Away from familiar places like home or work, sensitive actions (saved passwords, turning off Find My, erasing the phone) need Face ID or Touch ID, not just the passcode.
4. Changing your Apple ID password away from home also needs a one-hour wait and a second Face ID check.

This makes a stolen iPhone much harder to misuse, even if someone watched you type your passcode.$tip$,
ARRAY['iPhone Settings', 'Face ID'], now() - interval '194 minutes'),

('software-tip-iphone-screen-time', 'SOFTWARE', 'Use Screen Time to Limit Phone Use on iPhone', 'Apple', 'All iPhones', NULL, '/tips/child-phone.jpg',
$tip$1. Settings, then Screen Time, then turn on App and Website Activity to see how much time you spend in each app.
2. App Limits: set a daily limit for categories like Social or Games.
3. Downtime: schedule hours (for example bedtime) when only allowed apps and calls work.
4. Use a Screen Time passcode different from the phone's passcode so limits can't be changed easily.
5. For a child's iPhone: set it up through Family Sharing so you manage it from your own iPhone.$tip$,
ARRAY['Screen Time'], now() - interval '193 minutes'),

('software-tip-iphone-focus-dnd', 'SOFTWARE', 'Use Focus and Do Not Disturb on iPhone', 'Apple', 'All iPhones', NULL, '/tips/iphone-hand.jpg',
$tip$1. Settings, then Focus, then Do Not Disturb (or Sleep, Work, Personal).
2. Allowed People: choose contacts who can still reach you. Turn on "Allow Repeated Calls" so urgent callers get through on a second try.
3. Allowed Apps: pick apps that can still notify you, such as mobile money or banking.
4. Set a schedule, for example 10 PM to 6 AM every night.
5. Not getting calls or messages? Check that no Focus is on: the moon or other icon at the top of the screen.$tip$,
ARRAY['iPhone Settings'], now() - interval '192 minutes'),

('software-tip-iphone-control-center', 'SOFTWARE', 'Customise Control Center on iPhone', 'Apple', 'All iPhones', NULL, '/tips/iphone-settings-icon.jpg',
$tip$Control Center gives quick access to Wi-Fi, flashlight, screen recording and more.

1. Open it: swipe down from the top-right corner (iPhone X and newer) or up from the bottom (iPhones with a Home button).
2. iOS 18: tap the plus button at the top left, then "Add a Control", and drag controls where you want them.
3. Older iOS: Settings, then Control Center, then add or remove controls with the plus and minus buttons.
4. Useful controls to add: Screen Recording, Low Power Mode, Calculator, QR code scanner and Hearing.
5. Press and hold a control to see more options, for example Wi-Fi networks or flashlight brightness.$tip$,
ARRAY['Control Center'], now() - interval '191 minutes'),

('software-tip-iphone-assistivetouch', 'SOFTWARE', 'Use AssistiveTouch When iPhone Buttons Stop Working', 'Apple', 'All iPhones', NULL, '/tips/iphone-icons.jpg',
$tip$AssistiveTouch puts an on-screen button that can do the work of broken Home, volume or power buttons.

1. Settings, then Accessibility, then Touch, then AssistiveTouch, and turn it on. A grey round button appears.
2. Tap it to reach Home, Notification Center, Control Center, volume, Lock Screen, screenshots and restart.
3. Customize Top Level Menu to choose which actions appear.
4. Turn off the iPhone without the power button: Settings, then General, then Shut Down.

It's a good temporary fix. A broken button can usually be repaired, ask us for the price.$tip$,
ARRAY['Accessibility Settings'], now() - interval '190 minutes'),

('software-tip-iphone-back-tap', 'SOFTWARE', 'Use Back Tap for Quick Shortcuts on iPhone', 'Apple', 'iPhone 8 and newer', NULL, '/tips/iphone-hand.jpg',
$tip$Tap the back of the iPhone two or three times to run an action.

1. Settings, then Accessibility, then Touch, then Back Tap.
2. Choose Double Tap or Triple Tap.
3. Pick an action: Screenshot, Flashlight, Control Center, Lock Screen, Mute, or one of your Shortcuts.
4. Works with most thin cases. Very thick cases may stop it working.

Popular setup: double tap for a screenshot, triple tap for the flashlight.$tip$,
ARRAY['Accessibility Settings'], now() - interval '189 minutes'),

('software-tip-iphone-ringtone-sounds', 'SOFTWARE', 'Change Ringtone, Text Tone and Vibration on iPhone', 'Apple', 'All iPhones', NULL, '/tips/earbuds-hand.jpg',
$tip$1. Settings, then Sounds and Haptics.
2. Ringtone and Text Tone: tap each to choose a sound. You can also choose a vibration pattern there.
3. Ringer volume: drag the "Ringtone and Alert Volume" slider. Turn off "Change with Buttons" if the side buttons keep changing it by accident.
4. Silent mode: flip the switch on the side (orange shows silent). On iPhone 15 Pro and newer, press and hold the Action button.
5. A different ringtone for one person: open their contact, tap Edit, then Ringtone.$tip$,
ARRAY['iPhone Settings'], now() - interval '188 minutes'),

('software-tip-iphone-text-size', 'SOFTWARE', 'Make Text and Icons Bigger on iPhone', 'Apple', 'All iPhones', NULL, '/tips/iphone-settings.jpg',
$tip$Great for parents and anyone who finds the screen hard to read.

1. Settings, then Display and Brightness, then Text Size. Drag the slider.
2. Turn on Bold Text on the same screen.
3. Even bigger text: Settings, then Accessibility, then Display and Text Size, then Larger Text.
4. Bigger icons and everything else: Settings, then Display and Brightness, then Display Zoom, then Larger Text (or Zoomed).
5. Magnifier: add it to Control Center to use the camera as a magnifying glass for small print.$tip$,
ARRAY['iPhone Settings', 'Accessibility'], now() - interval '187 minutes'),

('software-tip-iphone-auto-brightness', 'SOFTWARE', 'iPhone Screen Too Dim or Changing Brightness by Itself', 'Apple', 'All iPhones', NULL, '/tips/iphone-black-bg.jpg',
$tip$1. Auto-Brightness changes brightness with the room light. Turn it off or on in Settings, then Accessibility, then Display and Text Size, then Auto-Brightness.
2. True Tone changes the screen's colour warmth: Settings, then Display and Brightness.
3. Night Shift makes the screen look yellow in the evening. Check its schedule in the same menu.
4. Screen dims when the phone gets hot. Let it cool down.
5. Low Power Mode can lower brightness too.
6. Still too dim at full brightness after a screen replacement? A lower quality replacement screen can be dimmer. We fit good quality screens.$tip$,
ARRAY['iPhone Settings'], now() - interval '186 minutes'),

('software-tip-iphone-icloud-storage', 'SOFTWARE', 'iCloud Storage Full: How to Free It Up', 'Apple', 'All iPhones', NULL, '/tips/iphone-settings-icon.jpg',
$tip$1. See what's using it: Settings, then your name, then iCloud. The bar shows Photos, Backups, Messages and more.
2. Old backups: tap Manage Account Storage (or Manage Storage), then Backups, and delete backups of phones you no longer use.
3. Photos: delete unwanted videos and screenshots, then empty Recently Deleted. Or copy photos to a computer and remove them from iCloud.
4. Choose which apps back up: Settings, then your name, then iCloud, then iCloud Backup, and turn off big apps you don't need backed up.
5. Need more space? iCloud+ plans start small and are paid monthly from the same screen.$tip$,
ARRAY['iCloud'], now() - interval '185 minutes'),

('software-tip-iphone-privacy-tracking', 'SOFTWARE', 'iPhone Privacy Settings Everyone Should Check', 'Apple', 'All iPhones', NULL, '/tips/alert-message-2.jpg',
$tip$1. App tracking: Settings, then Privacy and Security, then Tracking. Turn off "Allow Apps to Request to Track".
2. Location: Privacy and Security, then Location Services. Set apps to "While Using the App" or "Never". Turn off "Precise Location" for apps that don't need it.
3. Camera, Microphone and Photos: check which apps have access in Privacy and Security and remove what you don't recognise.
4. App Privacy Report (same menu): shows how often apps use your data and contact websites.
5. Safety Check: Privacy and Security, then Safety Check, to review who you share your location and data with.$tip$,
ARRAY['iPhone Settings'], now() - interval '184 minutes'),

('software-tip-iphone-share-wifi', 'SOFTWARE', 'Share Your Wi-Fi Password Between iPhones', 'Apple', 'All iPhones', NULL, '/tips/router-yellow.jpg',
$tip$1. Make sure both iPhones have Wi-Fi and Bluetooth on, and each person is saved in the other's contacts.
2. Your iPhone must be unlocked and connected to the Wi-Fi.
3. On the other iPhone, choose your Wi-Fi network in Settings, then Wi-Fi.
4. A pop-up appears on your iPhone: tap "Share Password". The other iPhone connects automatically.
5. iOS 18: the Passwords app shows saved Wi-Fi passwords, and you can show a QR code for others to scan.$tip$,
ARRAY['Wi-Fi', 'Bluetooth'], now() - interval '183 minutes'),

('software-tip-iphone-personal-hotspot', 'SOFTWARE', 'Use iPhone Personal Hotspot', 'Apple', 'All iPhones', NULL, '/tips/power-bank.jpg',
$tip$1. Settings, then Personal Hotspot (or Cellular, then Personal Hotspot).
2. Turn on "Allow Others to Join" and set a Wi-Fi password.
3. On the other device, connect to your iPhone's name.
4. Personal Hotspot missing? Make sure mobile data is on and working. Some carriers need it enabled on the line. Reset Network Settings can also bring it back.
5. Laptop without Wi-Fi: connect the iPhone with a USB cable, tap Trust, and the laptop can use the iPhone's internet.

Hotspot uses a lot of data and battery. Turn it off when done.$tip$,
ARRAY['iPhone Settings'], now() - interval '182 minutes'),

('software-tip-iphone-reset-options', 'SOFTWARE', 'iPhone Reset Options Explained', 'Apple', 'All iPhones', NULL, '/tips/iphone-settings.jpg',
$tip$Settings, then General, then Transfer or Reset iPhone, then Reset. Choose carefully:

Reset All Settings: puts settings back to default (Wi-Fi passwords, wallpaper, notifications). Keeps your photos, apps and data.
Reset Network Settings: forgets Wi-Fi networks, Bluetooth pairings and VPNs. Fixes most Wi-Fi, mobile data and Bluetooth problems.
Reset Keyboard Dictionary: clears learned words.
Reset Home Screen Layout: puts app icons back in the original order.
Reset Location and Privacy: asks apps for permissions again.

"Erase All Content and Settings" (on the previous screen) wipes everything. Only use it after a backup, for example before selling.$tip$,
ARRAY['iPhone Settings'], now() - interval '181 minutes'),

('software-tip-iphone-update-ios', 'SOFTWARE', 'Update iOS Safely', 'Apple', 'All iPhones', NULL, '/tips/app-updates.jpg',
$tip$1. Back up first (see our iPhone backup tip).
2. Connect to Wi-Fi, and charge to at least 50 percent or keep it plugged in.
3. Settings, then General, then Software Update. Tap Update Now or Install Now.
4. Not enough space? Settings, then General, then iPhone Storage. Or update from a computer with the Apple Devices app or iTunes, which needs less space on the phone.
5. Turn on Automatic Updates on the same screen so security fixes install overnight.
6. Update stuck on the Apple logo for over an hour? See our recovery mode tip.$tip$,
ARRAY['Software Update', 'Wi-Fi'], now() - interval '180 minutes'),

('software-tip-apple-id-2fa', 'SOFTWARE', 'Turn On Two-Factor Authentication for Your Apple ID', 'Apple', 'All iPhones', NULL, '/tips/fingerprint-unlock.jpg',
$tip$Two-factor authentication stops anyone who learns your Apple ID password from signing in.

1. Settings, then your name, then Sign-In and Security (or Password and Security).
2. Turn on Two-Factor Authentication and follow the steps.
3. Add a trusted phone number you'll always have, and consider a second one (a family member's).
4. When you sign in on a new device, you'll need a code shown on your iPhone or sent by SMS.
5. Keep your phone number up to date. Losing access to your trusted number makes account recovery slow.$tip$,
ARRAY['Apple ID'], now() - interval '179 minutes'),

('software-tip-iphone-emergency-sos', 'SOFTWARE', 'Set Up Emergency SOS and Medical ID on iPhone', 'Apple', 'All iPhones', NULL, '/tips/alert-message.jpg',
$tip$1. Emergency SOS: Settings, then Emergency SOS. On iPhone 8 and newer, press and hold the Side button and a volume button, then slide Emergency Call. You can also turn on "Call with 5 Button Presses".
2. Emergency contacts: open the Health app, tap your picture, then Medical ID, then Edit, and add emergency contacts. They get a message with your location after an SOS call.
3. Medical ID: add blood type, allergies and medications, and turn on "Show When Locked" so responders can see it from the lock screen.
4. Turn off "Call Quietly" if you want the warning sound.

Practise once (without completing the call) so you know how it works.$tip$,
ARRAY['iPhone Settings', 'Health app'], now() - interval '178 minutes'),

('software-tip-iphone-quick-start', 'SOFTWARE', 'Move Everything to a New iPhone with Quick Start', 'Apple', 'All iPhones', NULL, '/tips/iphone-charging-laptop.jpg',
$tip$1. Update the old iPhone to the latest iOS, and back it up just in case.
2. Turn on the new iPhone and place it next to the old one. Turn on Bluetooth on the old iPhone.
3. A "Set Up New iPhone" screen appears on the old iPhone: tap Continue, then scan the animation on the new iPhone with the old one.
4. Enter the old iPhone's passcode on the new one and follow the steps. Choose "Transfer from iPhone".
5. Keep both phones close and plugged in until it finishes. It can take an hour or more.
6. Before giving away the old iPhone: sign out of your Apple ID and erase it (Settings, then General, then Transfer or Reset iPhone).$tip$,
ARRAY['Quick Start', 'Bluetooth'], now() - interval '177 minutes'),

('software-tip-iphone-check-genuine', 'SOFTWARE', 'Check an iPhone''s Model, IMEI, Warranty and Original Parts', 'Apple', 'All iPhones', NULL, '/tips/iphone-hand.jpg',
$tip$Do this before buying a used iPhone.

1. Settings, then General, then About: shows the model name, model number, serial number and IMEI.
2. Dial *#06# to see the IMEI. It should match About and the box.
3. Warranty: enter the serial number at checkcoverage.apple.com.
4. Parts and Service History (iOS 15.2 and newer, in Settings, then General, then About): shows if the battery, screen or camera was replaced, and whether the part is genuine or "Unknown Part".
5. Battery: check Settings, then Battery, then Battery Health.
6. Make sure Find My is off and the seller has signed out of their Apple ID, or you'll be stuck with Activation Lock.$tip$,
ARRAY['iPhone Settings'], now() - interval '176 minutes')
ON CONFLICT ("id") DO NOTHING;
