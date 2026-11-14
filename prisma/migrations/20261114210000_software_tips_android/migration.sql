-- One-time content load (no schema change): 20 Android Software Tips.
-- Fixed ids + ON CONFLICT DO NOTHING: added once, admin edits never overwritten.

INSERT INTO "RepairGuide" ("id", "category", "title", "brand", "modelName", "videoUrl", "thumbnail", "content", "toolsUsed", "createdAt") VALUES
('software-tip-android-not-charging', 'SOFTWARE', 'Phone Not Charging or Charging Slowly', '', '', NULL, '',
$tip$1. Try a different charger and cable. Most charging problems are a bad cable.
2. Clean the charging port: power off, then gently remove lint with a wooden toothpick. Never use metal or water.
3. Restart the phone. A frozen charging service can stop charging.
4. Start in Safe Mode (see our Safe Mode tip). If it charges there, an app is interfering.
5. Check the battery: if it drains from 100 to 0 in a few hours or the phone switches off at 20 to 30 percent, the battery is worn out.
6. Still not charging? The charging port or charging flex usually needs replacing. We stock them for most models.$tip$,
ARRAY['Charger and cable', 'Toothpick', 'Safe Mode'], now() - interval '20 minutes'),

('software-tip-android-battery-drain', 'SOFTWARE', 'Stop Fast Battery Drain on Android', '', '', NULL, '',
$tip$1. Find the cause: Settings, then Battery, then Battery usage. An app using a lot of battery in the background is the usual culprit.
2. Restrict that app: tap it, then choose "Restricted" or "Optimized" background usage.
3. Lower screen brightness and screen timeout (30 seconds is enough).
4. Turn off what you don't need: Bluetooth, location, hotspot and NFC.
5. Weak network signal drains battery fast. In poor-signal areas, switch to 4G only or use Wi-Fi.
6. Update the phone and apps.
7. If a new phone drains fast after setup, give it 2 to 3 days to finish indexing.
8. A battery older than 2 years, or one that has swollen, needs replacing.$tip$,
ARRAY['Battery settings'], now() - interval '19 minutes'),

('software-tip-android-battery-health', 'SOFTWARE', 'Check Battery Health on an Android Phone', '', '', NULL, '',
$tip$1. Samsung: open the Samsung Members app, then Support, then Phone diagnostics, then Battery status.
2. Many phones show it under Settings, then Battery, then Battery health (or Battery information).
3. Testing menu: on many phones dialling *#*#4636#*#* opens a menu with Battery information.
4. Practical test: charge to 100 percent and use the phone normally. If it can't last most of a day, or it shuts down above 0 percent, the battery is worn.
5. Warning signs that need a battery replacement now: a swollen battery, a back cover lifting, or the screen being pushed up. Stop charging it and bring it in.$tip$,
ARRAY['Samsung Members', 'Battery settings'], now() - interval '18 minutes'),

('software-tip-android-overheating', 'SOFTWARE', 'Fix a Phone That Overheats', '', '', NULL, '',
$tip$1. Remove the case while charging or gaming.
2. Stop using the phone while it charges, especially for games or video calls.
3. Use the original or a good quality charger. Cheap fast chargers often overheat phones.
4. Check Settings, then Battery for an app using a lot of power in the background, and restrict it.
5. Keep it out of direct sun and hot cars.
6. Update the phone. Updates often fix overheating bugs.
7. If it gets hot even when idle, it can be a failing battery or a short on the board. Switch it off and bring it in.$tip$,
ARRAY['Battery settings'], now() - interval '17 minutes'),

('software-tip-android-apps-crashing', 'SOFTWARE', 'Fix Apps That Keep Crashing on Android', '', '', NULL, '',
$tip$1. Force stop the app: Settings, then Apps, choose the app, then Force stop, then open it again.
2. Clear its cache: same screen, then Storage, then Clear cache.
3. Update the app in the Play Store.
4. Update Android System WebView and Google Chrome in the Play Store. Many crashes come from an outdated WebView.
5. Restart the phone.
6. Still crashing? Clear data (this resets the app, so log back in), or uninstall and reinstall it.
7. Many apps crashing at once usually means low storage. Free up space (see our storage tip).$tip$,
ARRAY['Android Settings', 'Google Play Store'], now() - interval '16 minutes'),

('software-tip-android-play-store', 'SOFTWARE', 'Fix Google Play Store Not Downloading Apps', '', '', NULL, '',
$tip$1. Check your connection and free storage space.
2. Set the date and time to automatic: Settings, then System, then Date and time.
3. Clear Play Store cache: Settings, then Apps, then Google Play Store, then Storage, then Clear cache.
4. Do the same for Google Play services (Clear cache only).
5. Remove pending downloads: in the Play Store, tap your profile picture, then Manage apps and device, and cancel stuck downloads.
6. Check the download setting: Play Store, then profile, then Settings, then Network preferences, then App download preference.
7. Still stuck? Remove and add back the Google account (make sure you know the password first).$tip$,
ARRAY['Google Play Store', 'Android Settings'], now() - interval '15 minutes'),

('software-tip-android-touch-problems', 'SOFTWARE', 'Touch Screen Not Responding or Ghost Touch', '', '', NULL, '',
$tip$1. Remove the screen protector and case. A cracked or lifted protector often causes ghost touches.
2. Clean the screen and dry your hands.
3. Restart the phone.
4. Start in Safe Mode. If touch works there, an app is the cause.
5. Unplug the charger: some cheap chargers cause ghost touch while charging.
6. Test the screen: Samsung users can dial *#0*# and tap Touch to draw on the screen and see dead areas.
7. Dead zones or random touches after a drop usually mean the screen needs replacing. Ask us for the price for your model.$tip$,
ARRAY['Safe Mode', 'Samsung test menu'], now() - interval '14 minutes'),

('software-tip-android-no-sound', 'SOFTWARE', 'No Sound, Low Volume or Microphone Problems', '', '', NULL, '',
$tip$1. Check the volume for each type: press a volume button, then the three dots, and raise Media, Ring and Call volumes.
2. Turn off Do Not Disturb.
3. Make sure no Bluetooth headset or speaker is connected.
4. Clean the speaker and microphone holes gently with a soft dry brush.
5. Test the mic: record a voice note. If others can't hear you on calls only, try speakerphone and turn off any noise reduction setting.
6. Restart, then test in Safe Mode.
7. Sound still missing after this usually means the speaker, earpiece or microphone needs replacing.$tip$,
ARRAY['Android Settings', 'Soft brush'], now() - interval '13 minutes'),

('software-tip-android-bluetooth', 'SOFTWARE', 'Fix Bluetooth Pairing Problems', '', '', NULL, '',
$tip$1. Turn Bluetooth off and on, on both devices.
2. Forget the device: Settings, then Connected devices (or Bluetooth), tap the gear next to it, then Forget. Pair again.
3. Put the earbuds or speaker into pairing mode (check its manual, usually holding the button until a light flashes).
4. Charge both devices.
5. Clear Bluetooth cache: Settings, then Apps, show system apps, then Bluetooth, then Storage, then Clear cache.
6. Reset network settings (this also clears all pairings): Settings, then System, then Reset options.$tip$,
ARRAY['Android Settings'], now() - interval '12 minutes'),

('software-tip-android-sim-not-detected', 'SOFTWARE', 'SIM Card Not Detected or "Emergency Calls Only"', '', '', NULL, '',
$tip$1. Restart the phone.
2. Remove the SIM, check for damage, clean the gold contacts with a dry cloth, and reinsert it the right way round.
3. Try the SIM in another phone, and another SIM in this phone, to find which one is faulty.
4. Check the IMEI: dial *#06#. If it's blank or 0, the network data is damaged (common after bad flashing). Bring it in.
5. Network selection: Settings, then Mobile network, then Network operators, then Automatic.
6. If the SIM is old or damaged, your network's service centre can replace it with the same number.
7. Phone dropped or wet? The SIM tray connector on the board may need repair.$tip$,
ARRAY['SIM tool', 'Android Settings'], now() - interval '11 minutes'),

('software-tip-android-random-restarts', 'SOFTWARE', 'Phone Restarts by Itself', '', '', NULL, '',
$tip$1. Update the phone and all apps.
2. Free up storage. Below 1 to 2 GB free, phones can restart.
3. Start in Safe Mode. If it stops restarting, uninstall recently added apps.
4. Check the power button: a stuck button keeps restarting the phone. Press it a few times and listen for a click.
5. Remove the case and SD card.
6. Back up and do a factory reset if it continues.
7. Restarts that continue after a reset usually point to the battery or the board. Bring it in for a check.$tip$,
ARRAY['Safe Mode', 'Android Settings'], now() - interval '10 minutes'),

('software-tip-android-usb-debugging', 'SOFTWARE', 'Turn On Developer Options and USB Debugging', '', '', NULL, '',
$tip$Many PC tools need USB debugging to talk to the phone.

1. Open Settings, then About phone.
2. Tap "Build number" 7 times. On some phones it's under Software information. Enter the screen lock if asked. You'll see "You are now a developer".
3. Go back to Settings, then System, then Developer options.
4. Turn on "USB debugging".
5. Connect the phone to the PC and tap "Allow" on the "Allow USB debugging?" pop-up. Tick "Always allow from this computer" on your own PC.

Turn USB debugging off again when you're done, especially before giving the phone back to a customer.$tip$,
ARRAY['Android Settings', 'USB cable'], now() - interval '9 minutes'),

('software-tip-adb-basics', 'SOFTWARE', 'ADB Basics for Technicians', '', '', NULL, '',
$tip$ADB lets you control an Android phone from a PC.

1. Download "SDK Platform-Tools" from developer.android.com and extract it, for example to C:\platform-tools.
2. Turn on USB debugging on the phone (see our USB debugging tip) and connect it.
3. Open a terminal in that folder and run: adb devices
Accept the prompt on the phone. The phone should be listed as "device".

Useful commands:
adb reboot recovery: restart into recovery
adb reboot bootloader: restart into fastboot
adb install app.apk: install an app from the PC
adb pull /sdcard/DCIM C:\backup: copy photos to the PC
adb shell pm list packages: list installed apps

Only use ADB on phones you own or with the owner's permission.$tip$,
ARRAY['SDK Platform-Tools', 'USB cable'], now() - interval '8 minutes'),

('software-tip-phone-model-specs', 'SOFTWARE', 'Find a Phone''s Exact Model, Android Version and IMEI', '', '', NULL, '',
$tip$You need the exact model before ordering a screen, battery or firmware.

1. Model number: Settings, then About phone. Look for "Model" (e.g. SM-A145F or X6831), not just the marketing name.
2. Android version and security patch: Settings, then About phone, then Software information (or Android version).
3. IMEI: dial *#06#. Dual SIM phones show two IMEIs.
4. Phone won't turn on? The model is printed on the box, under the battery on older phones, or on the SIM tray of some models.
5. Check it matches: the IMEI on the box and in *#06# should be the same. A mismatch can mean a replaced board or a fake.$tip$,
ARRAY['Android Settings'], now() - interval '7 minutes'),

('software-tip-find-my-device', 'SOFTWARE', 'Find, Lock or Erase a Lost Android Phone', '', '', NULL, '',
$tip$Set this up before the phone is lost.

1. Make sure it's on: Settings, then Google, then Find My Device, and turn it on. Keep Location on.
2. Lost phone: on any browser go to google.com/android/find and sign in with the same Google account.
3. You can see its last location, make it ring at full volume (even on silent), lock it with a message and phone number, or erase it.
4. Samsung phones can also use smartthings.samsung.com/find with the Samsung account.
5. Report a stolen phone to the police with the IMEI (from *#06#, or the box), and ask your network to block the SIM.

Erasing removes your data, but the phone stays locked to your Google account (FRP), so a thief can't use it.$tip$,
ARRAY['Google Find My Device', 'Samsung Find'], now() - interval '6 minutes'),

('software-tip-android-adware', 'SOFTWARE', 'Remove Pop-up Ads and Viruses from Android', '', '', NULL, '',
$tip$1. Find the app causing pop-ups: when an ad appears, open Recent apps to see which app it belongs to.
2. Remove recent suspicious apps: cleaners, boosters, free VPNs, flashlight and wallpaper apps are common culprits. Settings, then Apps, then Uninstall.
3. Can't uninstall? Settings, then Security, then Device admin apps, turn it off, then uninstall.
4. Browser notifications: Chrome, then Settings, then Notifications, and block sites you don't recognise.
5. Run Play Protect: Play Store, then profile, then Play Protect, then Scan.
6. Still infected? Use Safe Mode to remove it, or back up and factory reset.

Only install apps from the Google Play Store and keep "Install unknown apps" off.$tip$,
ARRAY['Google Play Protect', 'Safe Mode'], now() - interval '5 minutes'),

('software-tip-recover-deleted-photos', 'SOFTWARE', 'Recover Deleted Photos on Android', '', '', NULL, '',
$tip$Act fast: the longer you use the phone, the less you can recover.

1. Google Photos: open Library, then Trash (or Bin). Deleted items stay there for 60 days if they were backed up.
2. Gallery app: Samsung Gallery has a Recycle bin in its menu (items stay 30 days). Many other galleries have a "Recently deleted" album.
3. Check photos.google.com on a computer with the same Google account. Backed-up photos may still be there.
4. WhatsApp photos: check the WhatsApp Images folder in Files, or ask the sender to resend.
5. Not in any trash or backup? Recovery from the phone itself is rarely possible on modern phones, because storage is encrypted.

Turn on Google Photos backup so this never happens again.$tip$,
ARRAY['Google Photos', 'Gallery'], now() - interval '4 minutes'),

('software-tip-whatsapp-backup-restore', 'SOFTWARE', 'WhatsApp Backup Not Working or Chats Not Restoring', '', '', NULL, '',
$tip$1. Back up: WhatsApp, then Settings, then Chats, then Chat backup. Check the Google account shown is one you can access, then tap Back up.
2. Backup stuck? Use Wi-Fi, charge the phone, update WhatsApp, and make sure the Google account has free Google Drive space.
3. Restoring on a new or reset phone: sign in to the same Google account on the phone first, install WhatsApp, verify the same phone number, and tap Restore.
4. Restore not found? The phone number and Google account must both match the backup, and the backup must be from the last year.
5. No Google backup? WhatsApp also keeps a local backup in Internal storage, then Android, then media, then com.whatsapp, then WhatsApp, then Databases. Copy it before resetting a phone.$tip$,
ARRAY['WhatsApp', 'Google Drive'], now() - interval '3 minutes'),

('software-tip-android-notifications', 'SOFTWARE', 'WhatsApp and App Notifications Not Arriving', '', '', NULL, '',
$tip$Many phones stop apps in the background to save battery, so messages only arrive when you open the app.

1. Allow notifications: Settings, then Apps, choose the app, then Notifications, and turn them on.
2. Turn off battery restrictions: same app page, then Battery, then "Unrestricted".
3. Tecno, Infinix and itel: also open the phone manager or battery settings and allow the app to run in the background and auto-start.
4. Samsung: Settings, then Battery, then Background usage limits, and remove the app from Sleeping apps.
5. Turn off Do Not Disturb and Data saver.
6. Restart the phone.$tip$,
ARRAY['Android Settings'], now() - interval '2 minutes'),

('software-tip-mobile-money-scams', 'SOFTWARE', 'Spot Mobile Money and SMS Scams', '', '', NULL, '',
$tip$1. Never share your PIN or an OTP code with anyone, including someone saying they work for MTN, Airtel or a bank.
2. "I sent you money by mistake, please send it back": check your real balance by dialling your mobile money menu, not the SMS. Fake SMS messages come from normal phone numbers.
3. Prize and promotion messages asking you to pay a fee or dial a code are scams.
4. Don't install apps or "updates" someone sends you a link for. They can take over your phone.
5. Calls asking you to dial a code or approve a transaction: hang up and call the official customer care line yourself.
6. Lost money? Report it to your network's customer care and the police immediately with the transaction ID.$tip$,
ARRAY['Mobile money menu'], now() - interval '1 minute')
ON CONFLICT ("id") DO NOTHING;
