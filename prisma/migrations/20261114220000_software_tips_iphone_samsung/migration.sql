-- One-time content load (no schema change): 20 Software Tips for iPhone,
-- Samsung, flashing and everyday phone tasks.
-- Fixed ids + ON CONFLICT DO NOTHING: added once, admin edits never overwritten.

INSERT INTO "RepairGuide" ("id", "category", "title", "brand", "modelName", "videoUrl", "thumbnail", "content", "toolsUsed", "createdAt") VALUES
('software-tip-iphone-force-restart', 'SOFTWARE', 'Force Restart Any iPhone', 'Apple', 'All iPhones', NULL, '',
$tip$Use this when an iPhone is frozen, black or stuck on the Apple logo. It doesn't erase anything.

iPhone 8 and newer (including SE 2nd and 3rd generation):
Press and release Volume Up, press and release Volume Down, then press and hold the Side button until the Apple logo appears.

iPhone 7 and 7 Plus:
Hold Volume Down and the Side button together until the Apple logo appears.

iPhone 6s, SE (1st generation) and older:
Hold the Home button and the Side (or Top) button together until the Apple logo appears.

If it still won't start, see our iPhone recovery mode tip.$tip$,
ARRAY['iPhone buttons'], now() - interval '40 minutes'),

('software-tip-iphone-recovery-mode', 'SOFTWARE', 'Update or Restore an iPhone with Recovery Mode', 'Apple', 'All iPhones', NULL, '',
$tip$Use this when an iPhone is stuck on the Apple logo or keeps restarting.

1. On a Windows PC install the Apple Devices app (Windows 10 and 11) or iTunes. On a Mac use Finder.
2. Connect the iPhone with a cable.
3. Do the force restart button steps for the model (see our force restart tip), but keep holding the last button past the Apple logo until you see the recovery screen (a computer and cable).
4. On the computer choose "Update" first. This reinstalls iOS and keeps the data.
5. If Update fails, choose "Restore". This erases the iPhone, so only do it when you have a backup or the owner agrees.
6. After a restore, the iPhone asks for the Apple ID that was on it (Activation Lock). The owner needs their Apple ID and password.$tip$,
ARRAY['Apple Devices app or iTunes', 'Lightning or USB-C cable'], now() - interval '39 minutes'),

('software-tip-iphone-backup', 'SOFTWARE', 'Back Up an iPhone (iCloud or Computer)', 'Apple', 'All iPhones', NULL, '',
$tip$1. iCloud: Settings, then your name, then iCloud, then iCloud Backup. Turn it on and tap "Back Up Now" on Wi-Fi. The free 5 GB is often not enough, so check the space needed first.
2. Computer (free, no size limit): connect the iPhone to a PC with the Apple Devices app or iTunes, or a Mac with Finder. Choose "Back up all the data on your iPhone to this computer" and tick "Encrypt local backup" so passwords and health data are included. Click Back Up Now.
3. Photos only: turn on iCloud Photos, or copy the photos to a PC by connecting the cable and opening the iPhone in File Explorer.
4. WhatsApp: WhatsApp, then Settings, then Chats, then Chat Backup, then Back Up Now (uses iCloud).$tip$,
ARRAY['iCloud', 'Apple Devices app or iTunes'], now() - interval '38 minutes'),

('software-tip-iphone-battery-health', 'SOFTWARE', 'Check iPhone Battery Health', 'Apple', 'All iPhones', NULL, '',
$tip$1. Open Settings, then Battery, then Battery Health (on some models Battery Health and Charging).
2. Maximum Capacity: 80 percent or above is normal for a used iPhone. Below 80 percent, iOS usually shows "Service recommended" and a replacement will bring back the battery life.
3. "Peak Performance Capability" messages saying the phone shut down unexpectedly also mean the battery is worn.
4. After a battery replacement by a non-Apple shop, newer iPhones may show "Unknown Part". The battery still works normally.
5. Tips: avoid heat, and turn on Optimized Charging (same screen) to slow battery wear.$tip$,
ARRAY['iPhone Settings'], now() - interval '37 minutes'),

('software-tip-iphone-activation-lock', 'SOFTWARE', 'iPhone Activation Lock: The Right Way to Remove It', 'Apple', 'All iPhones', NULL, '',
$tip$Activation Lock is Apple's anti-theft lock. After an erase, the iPhone asks for the Apple ID and password that were on it.

1. Sign in with the original Apple ID and password. This is the only direct way.
2. Forgot the password? Reset it at iforgot.apple.com.
3. Bought it second hand? Ask the previous owner to sign in to icloud.com/find, choose the device, and select "Remove This Device".
4. You're the original owner but lost access? Apple Support can remove the lock with proof of purchase (receipt showing the serial number).

For shops: never buy or unlock an iPhone with Activation Lock unless the owner can remove it. It is often a stolen phone.$tip$,
ARRAY['Apple ID', 'iCloud'], now() - interval '36 minutes'),

('software-tip-iphone-unavailable', 'SOFTWARE', 'iPhone Says "iPhone Unavailable" or "Security Lockout"', 'Apple', 'All iPhones', NULL, '',
$tip$This appears after too many wrong passcodes. The only fix is erasing the iPhone, so data is lost unless there's a backup.

1. On iOS 15.2 and newer: after the lockout screen appears, tap "Forgot Passcode?" (or "Erase iPhone") at the bottom, then follow the steps and enter the Apple ID password. The phone must be connected to Wi-Fi or mobile data.
2. Older iOS or no network: use recovery mode on a computer and choose Restore (see our recovery mode tip).
3. After erasing, sign in with the same Apple ID to pass Activation Lock, then restore from an iCloud or computer backup.

Tip: use a passcode you'll remember, and keep a backup.$tip$,
ARRAY['Apple ID', 'Recovery mode'], now() - interval '35 minutes'),

('software-tip-iphone-storage', 'SOFTWARE', 'Free Up Storage on an iPhone', 'Apple', 'All iPhones', NULL, '',
$tip$1. See what's using space: Settings, then General, then iPhone Storage.
2. Turn on "Offload Unused Apps" (same screen). It removes apps you don't use but keeps their data.
3. Photos: turn on iCloud Photos with "Optimize iPhone Storage", or copy photos to a PC and delete them from the phone.
4. Empty the "Recently Deleted" album in Photos. Deleted photos still use space for 30 days.
5. WhatsApp: WhatsApp, then Settings, then Storage and Data, then Manage Storage.
6. Messages: Settings, then Messages, then Keep Messages, then 1 Year.
7. Delete downloaded music, podcasts and Netflix downloads you've watched.$tip$,
ARRAY['iPhone Settings', 'iCloud Photos'], now() - interval '34 minutes'),

('software-tip-android-to-iphone', 'SOFTWARE', 'Move from Android to iPhone', 'Apple', 'All iPhones', NULL, '',
$tip$1. Install "Move to iOS" from the Play Store on the Android phone.
2. Start setting up the new iPhone. On the Apps and Data screen choose "Move Data from Android" (the iPhone must be new or erased).
3. Open Move to iOS on Android and enter the code shown on the iPhone.
4. Choose what to move: contacts, messages, photos, videos, calendars and more. Keep both phones plugged in and close together.
5. WhatsApp: tick WhatsApp in the list, then follow the steps on both phones.
6. Paid Android apps don't transfer. Download their iPhone versions from the App Store.$tip$,
ARRAY['Move to iOS app'], now() - interval '33 minutes'),

('software-tip-samsung-members-diagnostics', 'SOFTWARE', 'Test a Samsung Phone with Samsung Members', 'Samsung', 'All Galaxy models', NULL, '',
$tip$Samsung Members has a free full hardware test. Great for checking a used phone before buying or after a repair.

1. Open the Samsung Members app (install it from the Galaxy Store or Play Store if it's missing).
2. Tap Support, then Phone diagnostics.
3. Tap "Test all", or pick single tests: battery status, touch screen, speakers, microphone, cameras, sensors, Wi-Fi, mobile network, charging and more.
4. Follow the instructions for each test. Anything marked failed needs a closer look.

On many Galaxy phones you can also dial *#0*# to open the built-in test menu (touch, display colours, speakers, sensors).$tip$,
ARRAY['Samsung Members'], now() - interval '32 minutes'),

('software-tip-samsung-maintenance-mode', 'SOFTWARE', 'Samsung Maintenance Mode: Keep Your Data Private During Repair', 'Samsung', 'Galaxy (One UI 5 and newer)', NULL, '',
$tip$Maintenance mode lets a technician test and repair the phone without seeing your photos, messages or accounts.

1. Back up the phone first.
2. Settings, then Battery and device care (or Device care), then Maintenance mode, then Turn on.
3. The phone restarts into a clean, separate user. Your data is hidden but not deleted.
4. Hand over the phone without sharing your lock screen code.
5. When you get it back, open Maintenance mode from the notification and turn it off. Enter your lock to go back to your normal phone.

Anything installed or saved during maintenance mode is removed when it's turned off.$tip$,
ARRAY['Samsung Settings'], now() - interval '31 minutes'),

('software-tip-samsung-test-codes', 'SOFTWARE', 'Useful Samsung Codes for Technicians', 'Samsung', 'Most Galaxy models', NULL, '',
$tip$Dial these in the Phone app. Codes vary by model and region, and some carriers disable them.

*#06#: show the IMEI and serial number
*#0*#: hardware test menu (screen colours, touch, speaker, vibration, sensors, cameras)
*#1234#: firmware versions (AP, CP, CSC), useful for choosing the right firmware
*#0228#: battery status
*#7353#: quick test menu on some older models

Codes that change settings or reset the phone are not listed on purpose. A wrong code can erase the phone.$tip$,
ARRAY['Phone app'], now() - interval '30 minutes'),

('software-tip-choose-right-firmware', 'SOFTWARE', 'Choose the Right Firmware Before Flashing', '', '', NULL, '',
$tip$The wrong firmware is the most common reason a flash fails or a phone dies.

1. Match the exact model number from Settings, then About phone, or the box (e.g. SM-A145F, not just "Galaxy A14").
2. Match the region or carrier version (CSC on Samsung). A different region can lose network bands or features.
3. Never flash an older version than the phone already has. Many phones block downgrades, and some brick.
4. Samsung: the 5th character from the end of the build number is the bootloader version (for example A145FXXU3BWK1 is version 3). You can't flash firmware with a lower number.
5. Check the Android version and security patch, and pick the same or newer.
6. Download from trusted sources. Modified firmware can contain malware or remove the IMEI.

Not sure? Send us the model and build number on WhatsApp.$tip$,
ARRAY['Phone Settings'], now() - interval '29 minutes'),

('software-tip-qfil-qualcomm', 'SOFTWARE', 'Flash Qualcomm Phones with QFIL', '', 'Qualcomm models', NULL, '',
$tip$QFIL flashes stock firmware on Qualcomm phones through EDL (9008) mode. Many newer Xiaomi, Oppo, Vivo and Realme phones only allow EDL flashing with an authorized account, so QFIL won't work on them.

1. Install the Qualcomm HS-USB QDLoader 9008 driver and QPST (which includes QFIL).
2. Get the correct stock firmware for EDL. It includes a programmer file (prog_firehose or prog_emmc) plus rawprogram and patch XML files.
3. Put the phone in EDL mode. Common ways: hold both volume keys and connect the cable, or "adb reboot edl" on supported phones. Device Manager should show "Qualcomm HS-USB QDLoader 9008".
4. In QFIL choose Flat Build, browse to the programmer file, then Load XML and select the rawprogram and patch files.
5. Click Download and wait for "Download Succeed".

Back up first. Flashing all partitions can erase user data and, on some phones, the IMEI.$tip$,
ARRAY['QFIL (QPST)', 'Qualcomm QDLoader 9008 Driver', 'Stock Firmware'], now() - interval '28 minutes'),

('software-tip-xiaomi-bootloader-unlock', 'SOFTWARE', 'Unlock a Xiaomi Bootloader the Official Way', 'Xiaomi', 'Xiaomi, Redmi, POCO', NULL, '',
$tip$Unlocking the bootloader erases the phone. Back up first.

1. Sign in to a Mi (Xiaomi) account on the phone and add a SIM card with mobile data.
2. Settings, then About phone, tap MIUI or HyperOS version 7 times to enable Developer options.
3. Settings, then Additional settings, then Developer options: turn on OEM unlocking, then open Mi Unlock status and tap "Add account and device".
4. Newer HyperOS phones may also require you to apply in the Xiaomi Community app first.
5. Wait the required period (often 7 days or more). The phone must stay signed in.
6. Download Mi Unlock from Xiaomi's official site, sign in with the same account, put the phone in Fastboot mode (Volume Down and Power), connect it and click Unlock.

Never pay for "instant unlock" services that use stolen accounts.$tip$,
ARRAY['Mi Unlock', 'Mi Account', 'USB cable'], now() - interval '27 minutes'),

('software-tip-huawei-hisuite', 'SOFTWARE', 'Back Up, Update and Repair Huawei Phones with HiSuite', 'Huawei', 'All Huawei models', NULL, '',
$tip$HiSuite is Huawei's official PC tool.

1. Install HiSuite from consumer.huawei.com on a Windows PC.
2. On the phone, connect the USB cable and choose "Transfer files", then allow HiSuite (it may install a small app on the phone).
3. Backup: click Back up, choose what to save, and set a password.
4. Update: click Update to install the latest official software.
5. System recovery: if the software is broken, HiSuite can reinstall the official software. This can erase data, so back up first if possible.
6. Restore: use Restore to bring a backup back after a reset.$tip$,
ARRAY['HiSuite', 'USB cable'], now() - interval '26 minutes'),

('software-tip-phone-hotspot', 'SOFTWARE', 'Share Your Phone''s Internet with a Hotspot', '', '', NULL, '',
$tip$1. Settings, then Network and internet (or Connections), then Hotspot and tethering, then Wi-Fi hotspot.
2. Set a strong password and use WPA2 or WPA3 security.
3. Turn it on and connect the other device to the hotspot name.
4. For a PC without Wi-Fi: connect the phone with a USB cable and turn on "USB tethering". This is also the easiest way to get internet on a PC before its Wi-Fi driver is installed.
5. Hotspot drains the battery and data fast. Turn it off when you're done and keep an eye on your bundle.$tip$,
ARRAY['Android Settings', 'USB cable'], now() - interval '25 minutes'),

('software-tip-phone-pc-file-transfer', 'SOFTWARE', 'Copy Files Between a Phone and a PC', '', '', NULL, '',
$tip$1. USB cable (fastest for many files): connect the phone, swipe down the notification and choose "File transfer" (not "Charging only"). The phone appears in File Explorer on the PC.
2. Phone not showing? Try another cable (some only charge), unlock the phone, and install the phone's USB driver.
3. Wireless: Google's Quick Share app for Windows lets you send files between Android phones and PCs over Wi-Fi.
4. Cloud: upload to Google Drive or Google Photos on the phone, then download on the PC.
5. iPhone to PC: connect the cable, tap "Trust" on the iPhone, and open the iPhone in File Explorer to copy photos.$tip$,
ARRAY['USB cable', 'Quick Share', 'Google Drive'], now() - interval '24 minutes'),

('software-tip-family-link', 'SOFTWARE', 'Set Up Parental Controls on a Child''s Phone', '', '', NULL, '',
$tip$1. Install Google Family Link on the parent's phone.
2. Create a Google account for the child (or use their existing one) and follow the steps to link it.
3. On the child's phone, sign in with the child's account and accept supervision.
4. From the parent's phone you can approve app downloads, set daily screen time, set a bedtime, see the phone's location, and lock it remotely.
5. Also turn on SafeSearch in Google and Restricted Mode in YouTube, or install YouTube Kids.

For iPhones, use Settings, then Screen Time, then Family.$tip$,
ARRAY['Google Family Link'], now() - interval '23 minutes'),

('software-tip-screenshot-screen-record', 'SOFTWARE', 'Take Screenshots and Record the Screen', '', '', NULL, '',
$tip$Android screenshot: press Power and Volume Down together. Many phones also support a three-finger swipe down.

Android screen recording: swipe down twice to open Quick Settings and tap "Screen recorder" (Android 11 and newer). Add it with the pencil icon if it's missing. Choose whether to record sound.

iPhone screenshot: press the Side button and Volume Up together (or Home and Side on older iPhones).

iPhone screen recording: add Screen Recording in Settings, then Control Center, then open Control Center and tap the record button.

Tip: screen recordings are a great way for customers to show a problem that comes and goes.$tip$,
ARRAY['Quick Settings', 'Control Center'], now() - interval '22 minutes'),

('software-tip-speed-up-old-phone', 'SOFTWARE', 'Make an Old Android Phone Faster', '', '', NULL, '',
$tip$1. Free up storage: keep at least 15 percent free (see our storage tip).
2. Remove apps you don't use, and use "Lite" versions (Facebook Lite, Messenger Lite where available, Google Go).
3. Remove live wallpapers and extra home screen widgets.
4. Speed up animations: turn on Developer options (see our USB debugging tip), then set Window animation scale, Transition animation scale and Animator duration scale to 0.5x.
5. Restart the phone at least once a week.
6. Update apps, but skip big Android updates on very old phones if users report slowdowns.
7. Still slow? Back up and do a factory reset. It makes most old phones feel new again.$tip$,
ARRAY['Developer options', 'Android Settings'], now() - interval '21 minutes')
ON CONFLICT ("id") DO NOTHING;
