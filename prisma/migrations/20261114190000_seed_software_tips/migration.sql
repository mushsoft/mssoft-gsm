-- One-time content load (no schema change): the first Software Tips for
-- /learn-to-repair/software-tips. Fixed ids + ON CONFLICT DO NOTHING, so a
-- tip is only ever added once and later admin edits are never overwritten.
-- Thumbnails are empty: add one per tip in Admin → Repair Guides.

INSERT INTO "RepairGuide" ("id", "category", "title", "brand", "modelName", "videoUrl", "thumbnail", "content", "toolsUsed", "createdAt") VALUES
(
  'software-tip-windows-activation', 'SOFTWARE',
  'How to Check and Fix Windows Activation (Legit Methods)', '', '', NULL, '',
  $tip$1. Check the activation status
Open Settings, then System, then Activation. "Windows is activated with a digital license" means you're done. If it says "Windows is not activated", note the error code shown.

2. Link a digital license to a Microsoft account
Sign in to Windows with a Microsoft account (Settings, then Accounts, then Your info). On an activated PC this links the license to the account, so Windows can re-activate itself after a repair or hardware change.

3. Re-activate after a motherboard or hardware change
Go to Settings, then System, then Activation, and choose Troubleshoot. Select "I changed hardware on this device recently", sign in with the same Microsoft account, pick this PC from the list and choose Activate.

4. Find the original product key (OEM laptops and desktops)
Many branded PCs store the key in the BIOS. Open Command Prompt as administrator and run:
wmic path softwarelicensingservice get OA3xOriginalProductKey
Use that key under Settings, then System, then Activation, then Change product key.

5. Common error codes
0xC004F074: the PC can't reach an activation server. Check the internet connection, date and time, then try again.
0x803F7001: no valid license was found. Enter a genuine product key or buy a license from the Microsoft Store.
0xC004C003: the product key is blocked. You need a different genuine key.

6. Office shows "Unlicensed Product"
Open any Office app, choose File, then Account, and sign in with the Microsoft account that bought Office or Microsoft 365. If it still shows unlicensed, run Quick Repair from Control Panel, then Programs, then Microsoft Office, then Change.

Need help? Message us on WhatsApp and we'll activate it for you with a genuine license.$tip$,
  ARRAY['Windows Settings', 'Microsoft Account', 'Command Prompt'], now() - interval '10 minutes'
),
(
  'software-tip-sp-flash-tool', 'SOFTWARE',
  'Flash Stock Firmware on Tecno, Infinix and itel (SP Flash Tool)', 'Tecno', 'All MediaTek models', NULL, '',
  $tip$Use this to fix bootloops, a stuck logo or software crashes on MediaTek phones (most Tecno, Infinix and itel).

1. Back up first
Flashing can erase everything on the phone. Back up photos, contacts and WhatsApp before you start (see our backup tip).

2. Get the right firmware
Download the stock firmware for the exact model number (Settings, then About phone, or the label under the battery). The wrong firmware can leave the phone dead.

3. Install the drivers
Install the MediaTek VCOM USB driver on your Windows PC, then restart the PC.

4. Load the firmware in SP Flash Tool
Open flash_tool.exe, go to the Download tab, click "Scatter-loading File" and select the MTxxxx_Android_scatter.txt file inside the firmware folder.

5. Choose "Download Only"
Always use "Download Only". Never use "Format All + Download": it erases the NVRAM and the phone can lose its IMEI and network.

6. Flash
Click Download. Power the phone off completely, then connect the USB cable while holding Volume Down (some models need Volume Up, or both). Flashing starts on its own.

7. Finish
Wait for the green tick "Download OK", unplug, and power on. The first boot can take up to 10 minutes.

Not sure about the firmware? Send us the model number on WhatsApp and we'll flash it for you.$tip$,
  ARRAY['SP Flash Tool', 'MediaTek VCOM USB Driver', 'Stock Firmware'], now() - interval '9 minutes'
),
(
  'software-tip-samsung-odin', 'SOFTWARE',
  'Flash Samsung Firmware with Odin', 'Samsung', 'All Galaxy models', NULL, '',
  $tip$Use this to fix bootloops, failed updates or software problems on Samsung Galaxy phones.

1. Get the right firmware
Download the firmware for the exact model (e.g. SM-A145F) and your region. Unzip it: you'll get AP, BL, CP and CSC files.

2. Install the Samsung USB driver on your PC, then open Odin as administrator.

3. Put the phone in Download mode
Power off. On newer Galaxy phones hold Volume Up and Volume Down together and plug in the USB cable. Press Volume Up to continue when the warning appears. Odin should show "Added!!".

4. Load the files
BL into BL, AP into AP, CP into CP.
CSC: use HOME_CSC to keep your data, or CSC for a clean install (erases everything).

5. Check the options
Leave "Auto Reboot" and "F. Reset Time" ticked. Never tick "Re-Partition".

6. Click Start and don't touch the cable until Odin shows "PASS!". The phone restarts on its own.

If Odin shows "FAIL", the firmware is usually older than the phone's current bootloader. Download a newer version.$tip$,
  ARRAY['Odin', 'Samsung USB Driver', 'Stock Firmware'], now() - interval '8 minutes'
),
(
  'software-tip-backup-before-flash', 'SOFTWARE',
  'Back Up a Phone Before Flashing or Resetting', '', '', NULL, '',
  $tip$Flashing, factory reset and FRP work can erase everything. Do these steps first.

1. Write down the IMEI
Dial *#06# and photograph the screen. Useful if the IMEI is ever lost after flashing.

2. Google backup
Settings, then Google, then Backup, then Back up now. This saves contacts, call history, SMS and settings.

3. Photos and videos
Turn on Google Photos backup, or copy the DCIM and Pictures folders to a PC with a USB cable (choose "File transfer" on the phone).

4. WhatsApp
WhatsApp, then Settings, then Chats, then Chat backup, then Back up. Make sure it's linked to the same Google account.

5. Contacts saved on the phone only
Contacts app, then Export to a .vcf file, and copy it to the PC.

6. Note the Google account and password
After a reset the phone asks for the last Google account (FRP lock). Make sure the owner knows the email and password before you continue.$tip$,
  ARRAY['Google Backup', 'WhatsApp Backup', 'PC with USB cable'], now() - interval '7 minutes'
),
(
  'software-tip-frp-right-way', 'SOFTWARE',
  'FRP Lock: Unlocking a Phone the Right Way', '', '', NULL, '',
  $tip$FRP (Factory Reset Protection) is Android's anti-theft lock. After a reset the phone asks for the last Google account that was signed in.

1. Sign in with the previous Google account
This is the only official way. Enter the same email and password that was on the phone before the reset.

2. Forgot the password?
Go to g.co/recover on any device and follow the steps to recover the account. After a password change, wait about 24 to 72 hours before signing in on the reset phone, or Google may block it for security.

3. Remove the phone from the account first (if you still have access)
On another device go to myaccount.google.com, then Security, then Your devices, and sign the phone out. Then reset it.

4. Selling or giving away a phone?
Remove your Google account (Settings, then Accounts) before the factory reset, so the next owner isn't locked out.

For shops: only help unlock phones when the customer can prove ownership (receipt, box with matching IMEI, or the original account). This protects you from handling stolen phones.$tip$,
  ARRAY['Google Account Recovery'], now() - interval '6 minutes'
),
(
  'software-tip-mi-flash', 'SOFTWARE',
  'Flash a Xiaomi, Redmi or POCO Fastboot ROM (Mi Flash Tool)', 'Xiaomi', 'All Xiaomi, Redmi, POCO', NULL, '',
  $tip$Fastboot flashing needs an unlocked bootloader. If the bootloader is locked, the phone needs authorized (EDL) flashing instead. Message us.

1. Download the Fastboot ROM (.tgz) for the exact model and region, then extract it to a short folder path such as C:\rom (no spaces).

2. Put the phone in Fastboot mode
Power off, then hold Volume Down and Power until you see the Fastboot screen. Connect it to the PC.

3. Open Mi Flash Tool, click "Select" and choose the extracted ROM folder. Click "Refresh": the phone should appear.

4. Pick the option at the bottom
"Save user data" keeps the user's files.
"Clean all" erases everything (best for fixing problems).
Avoid "Clean all and lock": if anything goes wrong, a relocked bootloader can leave the phone unbootable.

5. Click Flash and wait for "success". The first boot can take 10 minutes.$tip$,
  ARRAY['Mi Flash Tool', 'Fastboot ROM', 'Xiaomi USB Driver'], now() - interval '5 minutes'
),
(
  'software-tip-usb-drivers', 'SOFTWARE',
  'Install the Right USB Drivers on Windows', '', '', NULL, '',
  $tip$Most "phone not detected" problems in flashing tools are driver problems.

1. Install the driver for the phone's chipset
MediaTek (most Tecno, Infinix, itel): MediaTek VCOM USB driver.
Qualcomm: Qualcomm HS-USB QDLoader 9008 driver.
Samsung: Samsung USB driver.
Xiaomi and most others in Fastboot: Google USB driver.

2. Restart the PC after installing.

3. Check Device Manager
Right-click Start, then Device Manager, then plug in the phone (in the right mode). It should appear under "Ports (COM & LPT)" or "Android Device" without a yellow warning sign.

4. Still not detected?
Try another USB cable (many are charge-only), a USB 2.0 port at the back of the PC, and disable driver signature enforcement if Windows blocks the driver.$tip$,
  ARRAY['Device Manager', 'MediaTek VCOM Driver', 'Qualcomm QDLoader Driver', 'Samsung USB Driver'], now() - interval '4 minutes'
),
(
  'software-tip-boot-modes', 'SOFTWARE',
  'Recovery, Fastboot and Download Mode: Key Combos by Brand', '', '', NULL, '',
  $tip$Most software fixes start in a special boot mode. Power the phone off completely first (hold Power for 10 seconds if it's stuck).

Tecno, Infinix, itel
Recovery: hold Power and Volume Up. When the logo appears, release Power and keep Volume Up held.
Fastboot: hold Power and Volume Down.
Flashing (SP Flash Tool): phone off, hold Volume Down (or Volume Up) and plug in the USB cable.

Samsung
Recovery: plug the phone into a PC or charger, then hold Power and Volume Up.
Download mode (Odin): phone off, hold Volume Up and Volume Down together, then plug in the USB cable.

Xiaomi, Redmi, POCO
Recovery: hold Power and Volume Up.
Fastboot: hold Power and Volume Down.

Google Pixel, Motorola, Nokia
Fastboot (bootloader): hold Power and Volume Down. From there, choose Recovery mode with the volume keys.

Getting around
In recovery and fastboot menus, use Volume Up and Down to move and Power to select. To leave, choose "Reboot system now".

Combos can differ on some models. If one doesn't work, try the other volume key.$tip$,
  ARRAY['Phone buttons', 'USB cable'], now() - interval '3 minutes'
),
(
  'software-tip-fix-bootloop', 'SOFTWARE',
  'Fix a Phone Stuck in a Bootloop', '', '', NULL, '',
  $tip$A bootloop is when the phone keeps restarting or stays on the logo. Try these from the least to the most drastic.

1. Force restart
Hold Power and Volume Down for 15 to 20 seconds until the phone restarts.

2. Charge it
A very low battery can cause restart loops. Charge for at least 30 minutes with the original charger, then try again.

3. Remove the SD card and SIM
A damaged SD card can block the boot. Remove both and restart.

4. Wipe cache (keeps data)
Boot into recovery (see our boot modes tip). Choose "Wipe cache partition" if it's there, then "Reboot system now".

5. Factory reset (erases data)
In recovery choose "Wipe data/factory reset". Only do this when the owner knows their Google account, or the phone will be FRP locked afterwards.

6. Reflash the firmware
If it still loops, flash the stock firmware (see our SP Flash Tool, Odin or Mi Flash tips).

7. Still looping after a reflash?
It's usually hardware: a weak battery, a faulty power button stuck on, or a board fault. Bring it in and we'll diagnose it.$tip$,
  ARRAY['Recovery mode', 'Stock Firmware'], now() - interval '2 minutes'
),
(
  'software-tip-safe-mode', 'SOFTWARE',
  'Use Safe Mode to Find a Bad App', '', '', NULL, '',
  $tip$If a phone is slow, keeps crashing, shows pop-up ads or restarts on its own, an installed app is often the cause. Safe Mode starts Android with only the built-in apps.

1. Start Safe Mode
On most Android phones: press and hold Power until the power menu appears, then press and hold "Power off" until "Reboot to safe mode" appears, and tap OK.
If the menu doesn't offer it: power off, turn on, and hold Volume Down while the phone starts.

2. Test the phone
"Safe mode" shows at the bottom of the screen. Use the phone for a while. If the problem is gone, a downloaded app is causing it.

3. Find and remove the app
Restart normally, then uninstall recently installed apps one at a time (Settings, then Apps), starting with the newest, cleaners, boosters, free VPNs and apps you don't recognise.

4. Can't uninstall an app?
It may be a device admin app. Go to Settings, then Security, then Device admin apps, switch it off, then uninstall it.

5. Leave Safe Mode
Just restart the phone normally.$tip$,
  ARRAY['Safe Mode', 'Android Settings'], now() - interval '1 minute'
),
(
  'software-tip-safe-update', 'SOFTWARE',
  'Update a Phone Safely (and Fix "Update Failed")', '', '', NULL, '',
  $tip$Official updates fix bugs and security problems. A failed or interrupted update is a common cause of bootloops, so prepare properly.

1. Before updating
Charge to at least 50 percent, connect to stable Wi-Fi, and back up the phone (see our backup tip). Free at least 3 to 5 GB of storage.

2. Update
Settings, then System (or About phone), then Software update. Download and install, and don't use or restart the phone while it installs.

3. "Update failed" or "Installation problem"
Restart the phone and try again.
Free more storage space.
Clear the update app's cache: Settings, then Apps, then Software update (or System update), then Storage, then Clear cache.
Switch to a different Wi-Fi network.

4. Rooted or modified phones
Official updates usually fail on phones that are rooted, have a custom recovery or an unlocked bootloader. Flash the full stock firmware instead.

5. Never update from unknown "update" APKs or websites. Only use the phone's built-in Software update.$tip$,
  ARRAY['Software Update', 'Wi-Fi'], now()
)
ON CONFLICT ("id") DO NOTHING;
